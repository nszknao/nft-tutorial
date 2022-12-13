import { KBMarket, SampleERC721 } from "@/typechain/index";
import { utils } from "ethers";
import useSWR from "swr";
import { useMarketContract, useNFTContract } from "./useContract";

type MyNFT = {
  price: string;
  tokenId: string;
  seller: string;
  owner: string;
  image: string;
  name: string;
  description: string;
};

const fetcher = async (market: KBMarket, nft: SampleERC721) => {
  const data = await market.fetchMyNFTs();

  const items = await Promise.all(
    data.map(async (item) => {
      const tokenUri = await nft.tokenURI(item.tokenId);
      const res = await fetch(tokenUri);
      const meta = await res.json();
      const price = utils.formatUnits(item.price.toString(), "ether");
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
};

export const useFetchMyNFTs = () => {
  const market = useMarketContract();
  const nft = useNFTContract(false);

  const { data, mutate } = useSWR<MyNFT[] | undefined>(
    { key: "fetchMyNFTs", market, nft },
    ({ market, nft }) => fetcher(market, nft)
  );

  return { data, mutate };
};
