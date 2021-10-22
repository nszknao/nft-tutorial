import { InfuraProvider } from "@ethersproject/providers";
import { OpenSeaPort, Network } from "opensea-js";

const provider = new InfuraProvider();

export const seaport = new OpenSeaPort(provider, {
  networkName: Network.Main,
});
