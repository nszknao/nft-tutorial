import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Contract } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState, VFC } from "react";
import { Wallet } from "./components/wallet";
import Color from "src/contracts/Color.json";

export const IndexPage: VFC = () => {
  const [colors, setColors] = useState<string[]>([]);
  const { account, library } = useWeb3React<Web3Provider>();

  useEffect(() => {
    const func = async () => {
      if (account == null) return;
      const contract = new Contract(
        "0x52790Ca9a97c5e3433C2781D942c9C8F3FA6ef21",
        Color.abi,
        library?.getSigner()
      );
      const totalSupply = await contract.totalSupply();
      for (let i = 0; i < totalSupply; i++) {
        const color = await contract.colors(i);
        setColors((prev) => [...prev, color]);
      }
    };
    func();
  }, [account]);

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
          Color Tokens
        </Heading>
        <Box>
          <Wallet />
        </Box>
      </Flex>

      <div>{colors.map((color) => color)}</div>
    </>
  );
};
