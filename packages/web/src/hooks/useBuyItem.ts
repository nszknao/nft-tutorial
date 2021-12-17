import { KBMarket__factory } from "@/typechain/factories/KBMarket__factory";
import { Web3Provider } from "@ethersproject/providers";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { chainId } from "../config/chain-id";
import { MARKET_ADDRESS, NFT_ADDRESS } from "../constants/addresses";
import { getSigner } from "../functions/contract";
import { MarketItem } from "./useFetchMarketItems";

export const useBuyItem = () => {
  const { library, account } = useWeb3React<Web3Provider>();

  const buyItem = async (item: MarketItem) => {
    if (library === undefined || account == null) return;
    const signer = getSigner(library, account);
    const market = KBMarket__factory.connect(MARKET_ADDRESS[chainId], signer);

    const price = parseUnits(item.price.toString(), "ether");
    const transaction = await market.createMarketSale(
      NFT_ADDRESS[chainId],
      item.tokenId,
      {
        value: price,
      }
    );

    await transaction.wait();
  };

  return { buyItem };
};
