import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useState, VFC } from "react";
import { Header } from "src/components/Header";
import { MintedColors } from "src/components/MintedColors";

export const IndexPage: VFC = () => {
  const [color, setColor] = useState<HTMLInputElement | null>(null);

  return (
    <>
      <Header />
      <Container>
        <Box>
          <Heading as="h1">Issue Token</Heading>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
            }}
          >
            <FormControl>
              <Input ref={(input) => setColor(input)} />
            </FormControl>
            <Button mt={4}>MINT</Button>
          </form>
        </Box>

        <MintedColors />
      </Container>
    </>
  );
};
