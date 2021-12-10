import { KBMarket__factory } from "@/typechain/factories/KBMarket__factory";
import { NFT__factory } from "@/typechain/factories/NFT__factory";
import { nftaddress, nftmarketaddress } from "@/web/const/config";
import { JsonRpcProvider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";
import useSWR from "swr";

export type MarketItem = {
  price: string;
  tokenId: string;
  seller: string;
  owner: string;
  image: string;
  name: string;
  description: string;
};

export const useFetchMarketItems = () => {
  const { data, mutate } = useSWR<MarketItem[]>("/", async () => {
    const provider = new JsonRpcProvider();
    const nft = NFT__factory.connect(nftaddress, provider);
    const market = KBMarket__factory.connect(nftmarketaddress, provider);
    const data = await market.fetchMarketTokens();

    const items = Promise.all(
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
