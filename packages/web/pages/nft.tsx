import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Flex, Heading, Image } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FC } from "react";
import { useAssets } from "@/web/lib/opensea";

const NFTPage: NextPage = () => {
  const { address } = useAccount();

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

        <ConnectButton />

        {/* <button
          onClick={async () => {
            const signer = await library?.provider.request?.({
              method: "eth_sign",
              params: [account, "Sign!!!"],
            });
            console.log(signer);
          }}
        >
          getSigners()
        </button> */}
      </Flex>

      {address && <Contents account={address} />}
    </>
  );
};

const Contents: FC<{
  account: string;
}> = ({ account }) => {
  const { data } = useAssets({ owner: account });

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

export default NFTPage;
