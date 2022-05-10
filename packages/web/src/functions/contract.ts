import {
  JsonRpcProvider,
  JsonRpcSigner,
  Web3Provider,
} from "@ethersproject/providers";
import { chainId } from "../config/chain-id";
import { rpc } from "../config/rpc";

export const getSigner = (account: string): JsonRpcSigner => {
  const provider = new JsonRpcProvider(rpc[chainId], chainId);
  return provider.getSigner(account).connectUnchecked();
};

export const getProviderOrSigner = (
  library?: Web3Provider,
  account?: string | null
): JsonRpcProvider | JsonRpcSigner => {
  return account && library
    ? library.getSigner(account)
    : // ? getSigner(account)
      new JsonRpcProvider(rpc[chainId], chainId);
};
