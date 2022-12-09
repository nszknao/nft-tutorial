import { type SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { utils } from "ethers";
import { ethers } from "hardhat";
import { SampleERC1155 } from "../typechain";
import { deploySampleERC1155, getSigners } from "./utils";

use(chaiAsPromised);

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

    await nft.setItem(1, utils.parseEther("0.01"), 1000);
    await nft.connect(creator).mint(1, 5, { value: utils.parseEther("0.05") });
    expect(await nft.balanceOf(creator.address, 1)).to.equal(5);

    // Unregistered items cannot be minted
    const tx = nft
      .connect(creator)
      .mint(2, 3, { value: utils.parseEther("0.06") });
    expect(tx).to.be.rejected;

    const uri = await nft.uri(1);
    console.log(uri);
  });

  it("0以下の数量をミント", async () => {
    //
  });
});
