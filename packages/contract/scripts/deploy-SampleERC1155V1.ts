import { ethers, upgrades } from "hardhat";

async function main() {
  const SampleERC1155V1 = await ethers.getContractFactory("SampleERC1155V1");

  const mc = await upgrades.deployProxy(SampleERC1155V1);

  await mc.deployed();
  console.log("SampleERC1155V1 deployed to:", mc.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
