require("@nomiclabs/hardhat-waffle");
const fs = require("fs");

const keyData = fs.readFileSync("./p-key.txt", {
  encoding: "utf8",
  flag: "r",
});
const projectId = "cec29c153c8f4de5849a5a99d88965e6";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${projectId}`,
      accounts: [keyData],
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${projectId}`,
      accounts: [keyData],
    },
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
};
