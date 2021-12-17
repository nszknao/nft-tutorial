import { KBMarket__factory } from "@/typechain/factories/KBMarket__factory";
import { NFT__factory } from "@/typechain/factories/NFT__factory";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import { chainId } from "../config/chain-id";
import { MARKET_ADDRESS, NFT_ADDRESS } from "../constants/addresses";
import { getProviderOrSigner } from "../functions/contract";

export const useMarketContract = (withSignerIfPossible = false) => {
  const { account, library } = useWeb3React<Web3Provider>();
  return useMemo(() => {
    const provider = getProviderOrSigner(
      library,
      withSignerIfPossible && account ? account : undefined
    );
    return KBMarket__factory.connect(MARKET_ADDRESS[chainId], provider);
  }, [account, library, withSignerIfPossible]);
};

export const useNFTContract = (withSignerIfPossible = false) => {
  const { account, library } = useWeb3React<Web3Provider>();
  return useMemo(() => {
    const provider = getProviderOrSigner(
      library,
      withSignerIfPossible && account ? account : undefined
    );
    return NFT__factory.connect(NFT_ADDRESS[chainId], provider);
  }, [account, library, withSignerIfPossible]);
};
