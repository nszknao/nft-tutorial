require("dotenv").config();
const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  contracts_build_directory: path.join(__dirname, "../../client/src/contracts"),

  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    staging: {
      provider: () => {
        const mnemonic = process.env["MNEMONIC"];
        const projectId = process.env["INFURA_PROJECT_ID"];
        return new HDWalletProvider(
          mnemonic,
          `https://goerli.infura.io/v3/${projectId}`
        );
      },
      network_id: "*",
    },
    test: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
  },

  compilers: {
    solc: {
      optimizer: {
        enable: true,
        runs: 200,
      },
      version: "^0.8.0",
    },
  },
};
