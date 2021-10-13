import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import React, { VFC } from "react";

const injectedConnector = new InjectedConnector({
  // ref: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md
  supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan,
    1337, // Ganache
  ],
});

export const Header: VFC = () => {
  const { account, activate, active } = useWeb3React<Web3Provider>();

  const connect = async () => {
    activate(injectedConnector);
  };

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
        {account}
        {!active && <button onClick={connect}>Connect Wallet</button>}
      </Box>
    </Flex>
  );
};
