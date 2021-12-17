import { We3ReactManager } from "@/web/components/Web3ReactManager/Web3ReactManager";
import { getLibrary } from "@/web/functions/getLibrary";
import { ChakraProvider } from "@chakra-ui/react";
import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <We3ReactManager>
        <ChakraProvider resetCSS>
          <Component {...pageProps} />
        </ChakraProvider>
      </We3ReactManager>
    </Web3ReactProvider>
  );
}
export default MyApp;
