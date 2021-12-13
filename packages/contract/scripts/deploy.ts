import { ethers } from "hardhat";

const deploy = async () => {
  const Market = await ethers.getContractFactory("KBMarket");
  const market = await Market.deploy();
  await market.deployed();
  console.log("market contract deployed to:", market.address);

  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(market.address);
  await nft.deployed();
  console.log("NFT contract deployed to:", nft.address);
};

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
