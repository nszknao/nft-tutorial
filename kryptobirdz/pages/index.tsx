import { Box, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function Home() {
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
        <Link href="/">
          <a>Main Marketplace</a>
        </Link>
        <Link href="/my-nfts">
          <a>My NFTs</a>
        </Link>
        <Link href="/account-dashborad">
          <a>Account Dashboard</a>
        </Link>
      </Flex>
    </div>
  );
}
