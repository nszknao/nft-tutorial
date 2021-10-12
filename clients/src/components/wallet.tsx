import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import React, { VFC } from "react";

const injectedConnector = new InjectedConnector({
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

const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

const Account: VFC = () => {
  const { chainId, account, activate, active, library, connector } =
    useWeb3React<Web3Provider>();

  const connect = async () => {
    activate(injectedConnector);
  };

  return (
    <div>
      {account}
      {!active && <button onClick={connect}>Connect Wallet</button>}
    </div>
  );
};

export const Wallet: VFC = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Account />
    </Web3ReactProvider>
  );
};
