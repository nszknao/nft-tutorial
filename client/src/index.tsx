import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { VFC } from "react";
import { Header } from "./components/Header";
import { MintedColors } from "./components/MintedColors";

export const IndexPage: VFC = () => {
  return (
    <>
      <Header />
      <Container>
        <Box>
          <Heading as="h1">ISSUE TOKEN</Heading>
          <form>
            <FormControl>
              <Input />
            </FormControl>
            <Button mt={4}>MINT</Button>
          </form>
        </Box>

        <MintedColors />
      </Container>
    </>
  );
};
