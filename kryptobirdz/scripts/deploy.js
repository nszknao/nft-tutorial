const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const Market = await hre.ethers.getContractFactory("KBMarket");
  const market = await Market.deploy("Hello, Hardhat!");
  await market.deployed();
  console.log("market deployed to:", market.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
