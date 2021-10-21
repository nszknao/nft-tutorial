import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState, VFC } from "react";
import { Header } from "src/components/Header";
import { seaport } from "src/lib/opensea";

export const Opensea: VFC = () => {
  const [assets, setAssets] = useState<string[]>([]);
  const { account } = useWeb3React<Web3Provider>();

  useEffect(() => {
    if (account == null) return;
    const func = async () => {
      const _assets = await seaport.api.getAssets({ owner: account });
      _assets.assets.map((asset) =>
        setAssets((prev) => [...prev, asset.imageUrl])
      );
    };
    func();
  }, [account]);

  return (
    <>
      <Header />

      <div>
        <h1>OpenSea</h1>
        <div>
          {assets.map((asset, idx) => (
            <img key={idx} src={asset} alt={`${idx}`} />
          ))}
        </div>
      </div>
    </>
  );
};
