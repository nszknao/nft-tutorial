import { task } from "hardhat/config";

task("mint-gh-contribution-nft", "", async (_, { ethers }) => {
  const [deployer] = await ethers.getSigners();

  const nft = (await ethers.getContractFactory("GitHubContributionNFT"))
    .attach("0x9e3b4893886226C09ec9f812bA7CC7C9B35F3bDE")
    .connect(deployer);

  const tx = await nft.mint("nszknao");
  await tx.wait();

  console.log(`minted`);
});
