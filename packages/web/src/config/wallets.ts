import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { ChainId } from "./chain-id";
import { rpc } from "./rpc";

export const network = new NetworkConnector({
  defaultChainId: ChainId.RINKEBY,
  urls: rpc,
});

const supportedChainIds = Object.values(ChainId) as number[];

export const injected = new InjectedConnector({
  supportedChainIds,
});
