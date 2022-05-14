import {
  KBMarket__factory,
  KBMarket,
  SampleERC721__factory,
  SampleERC721,
} from "@/typechain/index";
import { useContract, useSigner } from "wagmi";
import { chainId } from "../config/chain-id";
import { MARKET_ADDRESS, NFT_ADDRESS } from "../constants/addresses";

export const useMarketContract = (withSignerIfPossible = true) => {
  const { data: signer } = useSigner();
  const contract = useContract<KBMarket>({
    addressOrName: MARKET_ADDRESS[chainId],
    contractInterface: KBMarket__factory.abi,
    signerOrProvider: withSignerIfPossible && signer ? signer : undefined,
  });
  return contract;
};

export const useNFTContract = (withSignerIfPossible = true) => {
  const { data: signer } = useSigner();
  const contract = useContract<SampleERC721>({
    addressOrName: NFT_ADDRESS[chainId],
    contractInterface: SampleERC721__factory.abi,
    signerOrProvider: withSignerIfPossible && signer ? signer : undefined,
  });
  return contract;
};
