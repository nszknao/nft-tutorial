import { Flex, Heading } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { ReactNode, FC } from "react";

type Props = {
  children: ReactNode;
};

export const MarketLayout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Flex as="nav" align="center" padding={4} bg="teal.500" color="white">
        <Link href="/">
          <a>back</a>
        </Link>
        <Heading as="h1" size="md" letterSpacing="tighter" ml={4}>
          Kryptobirdz
        </Heading>
        <Flex align="center" justifyContent="space-between" flex={1} ml="120px">
          <Link href="/market">
            <a>Main Marketplace</a>
          </Link>
          <Link href="/market/mint-item">
            <a>Mint Tokens</a>
          </Link>
          <Link href="/market/my-nft">
            <a>My NFT</a>
          </Link>
          <Link href="/market/account-dashboard">
            <a>Account Dashboard</a>
          </Link>
        </Flex>
        <ConnectButton />
      </Flex>

      {children}
    </div>
  );
};
