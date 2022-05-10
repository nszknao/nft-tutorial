import { ChainId } from "./chain-id";

export const rpc = {
  [ChainId.RINKEBY]: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
};
