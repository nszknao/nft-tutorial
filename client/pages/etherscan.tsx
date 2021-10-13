import { EtherscanProvider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import type { NextPage } from "next";
import { EtherscanPage } from "src/etherscan";

const getLibrary = (provider: any) => {
  const library = new EtherscanProvider(1);
  library.pollingInterval = 12000;
  return library;
};

const Home: NextPage = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <EtherscanPage />
    </Web3ReactProvider>
  );
};

export default Home;
