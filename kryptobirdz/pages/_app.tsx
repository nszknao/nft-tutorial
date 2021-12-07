import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
