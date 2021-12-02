import { Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Stack mt={8} direction="column">
      <Link passHref href="/ethereum">
        <Button variant="link">ethereum</Button>
      </Link>
      <Link passHref href="/etherscan">
        <Button variant="link">etherscan</Button>
      </Link>
      <Link passHref href="/opensea">
        <Button variant="link">OpenSea API</Button>
      </Link>
    </Stack>
  );
};

export default Home;
