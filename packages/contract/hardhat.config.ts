import dotenv from "dotenv";

import "tsconfig-paths/lib/register";

import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";

import { HardhatUserConfig } from "hardhat/types";

dotenv.config();

const accounts =
  process.env.WALLET_PRIVATE_KEY !== undefined
    ? [process.env.WALLET_PRIVATE_KEY]
    : [];

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    artifacts: "./artifacts",
    cache: "./cache",
    tests: "./tests",
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
    alwaysGenerateOverloads: false,
  },
};

export default config;
