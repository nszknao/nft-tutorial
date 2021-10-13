import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
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

export const Wallet: VFC = () => {
  const { account, activate, active } = useWeb3React<Web3Provider>();

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
