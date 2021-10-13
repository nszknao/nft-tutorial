import { EtherscanProvider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, VFC } from "react";
import { Header } from "src/components/Header";

export const EtherscanPage: VFC = () => {
  const { account, library } = useWeb3React<EtherscanProvider>();

  useEffect(() => {
    const func = async () => {
      if (account == null) return;
      const txs = await library?.getHistory(account);
      txs?.map((tx) => {
        console.log(tx);
      });
    };
    func();
  }, [account]);

  return (
    <>
      <Header />

      <div>Etherscan Provider</div>
    </>
  );
};
