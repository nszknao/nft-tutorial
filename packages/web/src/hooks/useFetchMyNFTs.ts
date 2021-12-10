import { KBMarket__factory } from "@/typechain/factories/KBMarket__factory";
import { NFT__factory } from "@/typechain/factories/NFT__factory";
import { nftaddress, nftmarketaddress } from "@/web/const/config";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";

type MyNFT = {
  price: string;
  tokenId: string;
  seller: string;
  owner: string;
  image: string;
  name: string;
  description: string;
};

export const useFetchMyNFTs = () => {
  const { library } = useWeb3React<Web3Provider>();

  const { data, mutate } = useSWR<MyNFT[] | undefined>("/", async () => {
    if (library === undefined) return;
    const provider = new JsonRpcProvider();
    const nft = NFT__factory.connect(nftaddress, provider);

    const signer = library.getSigner();
    const market = KBMarket__factory.connect(nftmarketaddress, signer);
    const data = await market.fetchMyNFTs();

    const items = await Promise.all(
      data.map(async (item) => {
        const tokenUri = await nft.tokenURI(item.tokenId);
        const res = await fetch(tokenUri);
        const meta = await res.json();
        const price = formatUnits(item.price.toString(), "ether");
        return {
          price,
          tokenId: item.tokenId.toString(),
          seller: item.seller,
          owner: item.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };
      })
    );
    return items;
  });

  return { data, mutate };
};
