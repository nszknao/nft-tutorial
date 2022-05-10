import { KBMarket__factory, NFT__factory } from "@/typechain/index";
import { type Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import { chainId } from "../config/chain-id";
import { MARKET_ADDRESS, NFT_ADDRESS } from "../constants/addresses";
import { getProviderOrSigner } from "../functions/contract";

export const useMarketContract = (withSignerIfPossible = true) => {
  const { account, library } = useWeb3React<Web3Provider>();
  return useMemo(() => {
    const provider = getProviderOrSigner(
      library,
      withSignerIfPossible && account ? account : undefined
    );
    return KBMarket__factory.connect(MARKET_ADDRESS[chainId], provider);
  }, [account, library, withSignerIfPossible]);
};

export const useNFTContract = (withSignerIfPossible = true) => {
  const { account, library } = useWeb3React<Web3Provider>();
  return useMemo(() => {
    const provider = getProviderOrSigner(
      library,
      withSignerIfPossible && account ? account : undefined
    );
    return NFT__factory.connect(NFT_ADDRESS[chainId], provider);
  }, [account, library, withSignerIfPossible]);
};
