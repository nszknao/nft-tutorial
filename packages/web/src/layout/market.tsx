import { Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode, VFC } from "react";
import { ConnectWallet } from "../components/connect-wallet";

type Props = {
  children: ReactNode;
};

export const MarketLayout: VFC<Props> = ({ children }) => {
  return (
    <div>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        padding={4}
        bg="teal.500"
        color="white"
      >
        <Heading as="h1" size="md" letterSpacing="tighter">
          Kryptobirdz
        </Heading>
        <Link href="/market">
          <a>Main Marketplace</a>
        </Link>
        <Link href="/market/mint-item">
          <a>Mint Tokens</a>
        </Link>
        <Link href="/market/my-nft">
          <a>My NFT</a>
        </Link>
        <Link href="/market/account-dashborad">
          <a>Account Dashboard</a>
        </Link>
        <ConnectWallet />
      </Flex>

      {children}
    </div>
  );
};
