require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
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

    compilers: {
      solc: {
        version: "0.8.0",
      },
    },
  },
};
