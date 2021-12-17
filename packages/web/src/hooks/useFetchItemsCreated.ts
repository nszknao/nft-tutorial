import { KBMarket } from "@/typechain/KBMarket";
import { NFT } from "@/typechain/NFT";
import { formatUnits } from "@ethersproject/units";
import useSWR from "swr";
import { useMarketContract, useNFTContract } from "./useContract";

const fetcher = async (market: KBMarket, nft: NFT) => {
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
};

export const useFetchItemsCreated = () => {
  const market = useMarketContract(true);
  const nft = useNFTContract();

  const { data, mutate } = useSWR(
    { key: "fetchItemsCreated", market, nft },
    ({ market, nft }) => fetcher(market, nft)
  );

  return { data, mutate };
};
