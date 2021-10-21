import { Contract } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState, VFC } from "react";
import { Header } from "src/components/Header";
import useSWR from "swr";

const fetcher = async (query: string) => {
  const res = await fetch(
    `https://api.etherscan.io/api?${query}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_APIKEY}`
  );
  if (!res.ok) return;
  const data = await res.json();
  if (data.status !== "1") return;
  return data.result;
};

type TokenProps = {
  contractAddress: string;
  tokenID: number;
};

const Token: React.VFC<TokenProps> = ({ contractAddress, tokenID }) => {
  const [tokenURIs, setTokenURIs] = useState<string[]>([]);
  const { library } = useWeb3React<Web3Provider>();
  const query = new URLSearchParams({
    module: "contract",
    action: "getabi",
    address: contractAddress,
  });
  const { data } = useSWR(query.toString(), fetcher);

  useEffect(() => {
    const func = async () => {
      let abi = "";
      try {
        abi = JSON.parse(data);
      } catch (error) {}
      if (abi === "") return;
      const contract = new Contract(contractAddress, abi, library?.getSigner());
      const _tokenURI: string = await contract.tokenURI(tokenID);
      setTokenURIs((prev) => [...new Set([...prev, _tokenURI])]);
    };
    func();
  }, [data]);

  return (
    <div>
      {tokenURIs.map((uri: string, idx) => (
        <div key={idx}>{uri}</div>
      ))}
    </div>
  );
};

const Transactions: React.VFC = () => {
  const { account } = useWeb3React<Web3Provider>();
  const query = new URLSearchParams({
    module: "account",
    action: "tokennfttx",
    address: account ?? "",
  });
  const { data } = useSWR(query.toString(), fetcher);

  return (
    data?.map((tx: any, idx: number) => (
      <Token
        key={idx}
        contractAddress={tx.contractAddress}
        tokenID={parseInt(tx.tokenID)}
      />
    )) ?? null
  );
};

export const EtherscanPage: VFC = () => {
  return (
    <>
      <Header />

      <div>
        <div>Etherscan Provider</div>
        <Transactions />
      </div>
    </>
  );
};
