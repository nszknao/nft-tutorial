import Web3 from "web3";
import { OpenSeaPort, Network } from "opensea-js";

const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io");

export const seaport = new OpenSeaPort(provider, {
  networkName: Network.Main,
});
