import {
  JsonRpcProvider,
  JsonRpcSigner,
  Web3Provider,
} from "@ethersproject/providers";
import { chainId } from "../config/chain-id";
import { rpc } from "../config/rpc";

export const getSigner = (
  library: Web3Provider,
  account: string
): JsonRpcSigner => {
  return library.getSigner(account).connectUnchecked();
};

export const getProviderOrSigner = (
  library?: Web3Provider,
  account?: string | null
): JsonRpcProvider | JsonRpcSigner => {
  return account && library
    ? getSigner(library, account)
    : new JsonRpcProvider(rpc[chainId], chainId);
};
