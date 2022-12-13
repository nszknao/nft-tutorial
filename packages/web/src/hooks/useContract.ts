import { useContract, useSigner } from "wagmi";
import {
  KB_MARKET_ABI,
  KB_MARKET_ADDRESS,
  SAMPLE_ERC721_ABI,
  SAMPLE_ERC721_ADDRESS,
} from "../constants/abis";

export const useMarketContract = (withSignerIfPossible = true) => {
  const { data: signer } = useSigner();
  const contract = useContract({
    abi: KB_MARKET_ABI,
    address: KB_MARKET_ADDRESS,
    signerOrProvider: withSignerIfPossible && signer ? signer : undefined,
  });
  return contract;
};

export const useNFTContract = (withSignerIfPossible = true) => {
  const { data: signer } = useSigner();
  const contract = useContract({
    abi: SAMPLE_ERC721_ABI,
    address: SAMPLE_ERC721_ADDRESS,
    signerOrProvider: withSignerIfPossible && signer ? signer : undefined,
  });
  return contract;
};
