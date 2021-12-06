import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";

export const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

export const injectedConnector = new InjectedConnector({
  // ref: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md
  supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan,
    1337, // Ganache
  ],
});
