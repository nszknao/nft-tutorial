import { Box, Flex, Heading } from "@chakra-ui/layout";
import React, { VFC } from "react";
import { Wallet } from "./components/wallet";

export const IndexPage: VFC = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding={4}
      bg="teal.500"
      color="white"
    >
      <Heading as="h1" size="md" letterSpacing="tighter">
        Color Tokens
      </Heading>
      <Box>
        <Wallet />
      </Box>
    </Flex>
  );
};
