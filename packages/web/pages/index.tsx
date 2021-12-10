import { Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Stack mt={8} direction="column">
      <Link passHref href="/nft">
        <Button variant="link">View NFTs</Button>
      </Link>
      <Link passHref href="/market">
        <Button variant="link">Go to marketplace</Button>
      </Link>
    </Stack>
  );
};

export default Home;
