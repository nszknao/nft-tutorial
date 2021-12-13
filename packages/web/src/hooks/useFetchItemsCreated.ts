import { KBMarket__factory } from "@/typechain/factories/KBMarket__factory";
import { NFT__factory } from "@/typechain/factories/NFT__factory";
import { networkid, nftaddress, nftmarketaddress } from "@/web/const/config";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";

export const useFetchItemsCreated = () => {
  const { library } = useWeb3React<Web3Provider>();

  const { data, mutate } = useSWR("/", async () => {
    if (library === undefined) return;
    const provider = new JsonRpcProvider(undefined, networkid);
    const nft = NFT__factory.connect(nftaddress, provider);

    const signer = provider.getSigner();
    const market = KBMarket__factory.connect(nftmarketaddress, signer);
    const data = await market.fetchItemsCreated();

    const items = await Promise.all(
      data.map(async (item) => {
        const tokenUri = await nft.tokenURI(item.tokenId);
        const res = await fetch(tokenUri);
        const meta = await res.json();
        return {
          price: formatUnits(item.price.toString(), "ether"),
          tokenId: item.tokenId.toNumber(),
          seller: item.seller,
          owner: item.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
          sold: item.sold,
        };
      })
    );

    return items.filter((item) => item.sold);
  });

  return { data, mutate };
};
