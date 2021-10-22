import { Box, Grid } from "@chakra-ui/layout";
import { Contract } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState, VFC } from "react";
import Color from "src/contracts/Color.json";

export const MintedColors: VFC = () => {
  const [colors, setColors] = useState<string[]>([]);
  const { account, library } = useWeb3React<Web3Provider>();

  useEffect(() => {
    const func = async () => {
      if (account == null) return;
      const contract = new Contract(
        "0x52790Ca9a97c5e3433C2781D942c9C8F3FA6ef21",
        Color.abi,
        library?.getSigner() as any
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
    <Grid templateColumns="repeat(4, 1fr)" gap={6} placeItems="center" mt={4}>
      {colors.map((color, idx) => (
        <Box
          key={idx}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box
            height={150}
            width={150}
            borderRadius="full"
            backgroundColor={color}
          />
          <Box mt={2}>{color}</Box>
        </Box>
      ))}
    </Grid>
  );
};
