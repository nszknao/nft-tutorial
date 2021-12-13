import { KBMarket__factory } from "@/typechain/factories/KBMarket__factory";
import { Web3Provider } from "@ethersproject/providers";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { nftaddress, nftmarketaddress } from "../const/config";
import { MarketItem } from "./useFetchMarketItems";

export const useBuyItem = () => {
  const { library } = useWeb3React<Web3Provider>();

  const buyItem = async (item: MarketItem) => {
    if (library === undefined) return;
    const signer = library.getSigner();
    const market = KBMarket__factory.connect(nftmarketaddress, signer);

    const price = parseUnits(item.price.toString(), "ether");
    const transaction = await market.createMarketSale(
      nftaddress,
      item.tokenId,
      {
        value: price,
      }
    );

    await transaction.wait();
  };

  return { buyItem };
};
