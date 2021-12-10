import { KBMarket__factory } from "@/typechain/factories/KBMarket__factory";
import { NFT__factory } from "@/typechain/factories/NFT__factory";
import { JsonRpcProvider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";
import axios from "axios";
import { useCallback, useState } from "react";
import { nftaddress, nftmarketaddress } from "../const/config";

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
  const [nfts, setNfts] = useState<MarketItem[]>([]);
  const [loading, setLoading] = useState("not loaded");

  const loadNFTs = useCallback(async () => {
    const provider = new JsonRpcProvider();
    const nft = NFT__factory.connect(nftaddress, provider);
    const market = KBMarket__factory.connect(nftmarketaddress, provider);
    const data = await market.fetchMarketTokens();

    const items = await Promise.all(
      data.map(async (item) => {
        const tokenUri = await nft.tokenURI(item.tokenId);
        const meta = await axios.get(tokenUri);
        const price = formatUnits(item.price.toString(), "ether");
        return {
          price,
          tokenId: item.tokenId.toString(),
          seller: item.seller,
          owner: item.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
      })
    );
    setNfts(items);
    setLoading("loaded");
  }, []);

  return { nfts, loading, loadNFTs };
};
