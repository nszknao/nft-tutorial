import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import React, { VFC } from "react";
import { useEagerConnect } from "../hooks/useEagerConnect";
import { injectedConnector } from "../lib/web3";
import useSWR from "swr";

type OpenSeaAsset = {
  asset_contract: {
    address: string;
  };
  token_id: string;
  image_url: string;
  permalink: string;
  name: string | null;
  owner: {
    address: string;
    profile_img_url: string;
  };
  creator: {
    address: string;
    profile_img_url: string;
  };
};

const fetcher = async (url: string, params: Record<string, string>) => {
  const query = new URLSearchParams(params);
  const res = await fetch(
    `https://api.opensea.io/api/v1${url}?${query.toString()}`
  );
  if (!res.ok) return;
  const data = await res.json();
  return data;
};

type Props = {
  account: string;
};

const Contents: VFC<Props> = ({ account }) => {
  const { data } = useSWR<{ assets: OpenSeaAsset[] }>(
    ["/assets", { owner: account }],
    fetcher
  );

  return (
    <div>
      <h1>OpenSea</h1>
      <div>
        {data?.assets.map((asset, idx) => (
          <Image
            key={idx}
            src={asset.image_url}
            alt={`${idx}`}
            w={300}
            h={300}
          />
        ))}
      </div>
    </div>
  );
};

export const NFT: VFC = () => {
  const { account, activate, active, library } = useWeb3React<Web3Provider>();

  useEagerConnect();

  const connect = async () => {
    activate(injectedConnector);
  };

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        padding={4}
        bg="teal.500"
        color="white"
      >
        <Heading as="h1" size="md" letterSpacing="tighter">
          View NFTs
        </Heading>
        <Box>
          {account}
          {!active && <button onClick={connect}>Connect Wallet</button>}
        </Box>
        <button
          onClick={async () => {
            const signer = await library?.provider.request?.({
              method: "eth_sign",
              params: [account, "Sign!!!"],
            });
            console.log(signer);
          }}
        >
          getSigners()
        </button>
      </Flex>

      {account != null && <Contents account={account} />}
    </>
  );
};
