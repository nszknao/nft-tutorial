import { task } from "hardhat/config";

task("mint-gh-contribution-nft", "", async (_, { ethers }) => {
  const [deployer] = await ethers.getSigners();

  const nft = (await ethers.getContractFactory("GitHubContributionNFT"))
    .attach("0xBB5b0B9902bA23255CD1438bf5E1a2BeBBf8aAAC")
    .connect(deployer);

  // const tx = await nft.mint("nszknao");
  // await tx.wait();
  const uri = await nft.tokenURI(0);
  console.log(uri);

  console.log(`minted`);
});
