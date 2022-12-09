import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { ERC1155Token } from "../typechain";
import { address, deployERC1155Token, getSigners } from "./utils";

describe("ERC1155Token contract", function () {
  let erc1155Token: ERC1155Token;
  let deployer: SignerWithAddress;
  let player: SignerWithAddress;
  let snapshotId: number;

  before(async function () {
    const signers = await getSigners();
    deployer = signers.deployer;
    player = signers.account0;
    erc1155Token = await deployERC1155Token(deployer);
  });

  beforeEach(async () => {
    snapshotId = await ethers.provider.send("evm_snapshot", []);
  });

  afterEach(async () => {
    await ethers.provider.send("evm_revert", [snapshotId]);
  });

  it("should set uri", async () => {
    expect(await erc1155Token.uri(2)).to.equal(
      "https://game.example/api/item/{id}.json"
    );
  });

  it("should have balance", async () => {
    expect(await erc1155Token.balanceOf(deployer.address, 3)).to.equal(
      1000000000
    );
  });

  it("should transfer items to player accounts", async () => {
    await erc1155Token.safeTransferFrom(
      deployer.address,
      player.address,
      2,
      1,
      address(0)
    );
    expect(await erc1155Token.balanceOf(player.address, 2)).to.equal(1);
    expect(await erc1155Token.balanceOf(deployer.address, 2)).to.equal(0);
  });

  // it("should  transfer items to player accounts and get the balance of batches", async () => {
  //   await erc1155Token.safeBatchTransferFrom(
  //     deployer.address,
  //     player.address,
  //     [0, 1, 3, 4],
  //     [50, 100, 1, 1],
  //     address(0)
  //   );
  //   expect(
  //     await erc1155Token.balanceOfBatch(
  //       [
  //         player.address,
  //         player.address,
  //         player.address,
  //         player.address,
  //         player.address,
  //       ],
  //       [0, 1, 2, 3, 4]
  //     )
  //   ).to.equal([
  //     BigNumber.from(50),
  //     BigNumber.from(100),
  //     BigNumber.from(1),
  //     BigNumber.from(1),
  //     BigNumber.from(1),
  //   ]);
  // });
});
