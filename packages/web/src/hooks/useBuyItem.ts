import { parseUnits } from "@ethersproject/units";
import { useMarketContract, useNFTContract } from "./useContract";
import { MarketItem } from "./useFetchMarketItems";

export const useBuyItem = () => {
  const market = useMarketContract();
  const nft = useNFTContract(false);

  const buyItem = async (item: MarketItem) => {
    const price = parseUnits(item.price.toString(), "ether");
    const tx = await market.createMarketSale(nft.address, item.tokenId, {
      value: price,
    });

    await tx.wait();
  };

  return { buyItem };
};
