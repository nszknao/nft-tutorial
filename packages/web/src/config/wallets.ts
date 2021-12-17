import { InjectedConnector } from "@web3-react/injected-connector";
import { ChainId } from "./chain-id";

const supportedChainIds = Object.values(ChainId) as number[];

export const injected = new InjectedConnector({
  supportedChainIds,
});
