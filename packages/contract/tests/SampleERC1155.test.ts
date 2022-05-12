import { type SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { utils } from "ethers";
import { ethers } from "hardhat";
import { SampleERC1155 } from "../typechain";
import { deploySampleERC1155, getSigners } from "./utils";

describe("SampleERC1155", () => {
  let nft: SampleERC1155;
  let deployer: SignerWithAddress;
  let snapshotId: number;

  before(async function () {
    const signers = await getSigners();
    deployer = signers.deployer;
    nft = await deploySampleERC1155(deployer);
  });

  beforeEach(async () => {
    snapshotId = await ethers.provider.send("evm_snapshot", []);
  });

  afterEach(async () => {
    await ethers.provider.send("evm_revert", [snapshotId]);
  });

  it("should emit a mint log on mint", async () => {
    const { account0: creator } = await getSigners();

    await nft.register(1, 0, 100);
    await nft.connect(creator).mint(1, 1);

    await nft.register(2, utils.parseEther("0.02"), 200);
    await nft.connect(creator).mint(2, 3, { value: utils.parseEther("0.06") });

    expect(await nft.balanceOf(creator.address, 1)).to.equal(1);
    expect(await nft.balanceOf(creator.address, 2)).to.equal(3);
  });
});
