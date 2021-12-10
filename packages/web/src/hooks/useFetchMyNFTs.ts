import { KBMarket__factory } from "@/typechain/factories/KBMarket__factory";
import { NFT__factory } from "@/typechain/factories/NFT__factory";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { nftaddress, nftmarketaddress } from "../const/config";

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
  const [nfts, setNfts] = useState<MyNFT[]>([]);
  const [loading, setLoading] = useState("not loaded");
  const { library } = useWeb3React<Web3Provider>();

  const loadNFTs = useCallback(async () => {
    if (library === undefined) return;
    const provider = new JsonRpcProvider();
    const nft = NFT__factory.connect(nftaddress, provider);

    const signer = library.getSigner();
    const market = KBMarket__factory.connect(nftmarketaddress, signer);
    const data = await market.fetchMyNFTs();

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

  useEffect(() => {
    loadNFTs();
  }, [loadNFTs]);

  return { nfts, loading, loadNFTs };
};
