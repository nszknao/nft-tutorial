import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { utils } from "ethers";
import {
  deploySampleERC1155V1,
  deploySampleERC721,
  getSigners,
  upgradeSampleERC1155,
} from "./utils";

use(chaiAsPromised);

describe("SampleERC1155Upgradable", () => {
  it("V2コントラクトでmintしたときに、V1コントラクトでmintしてたトークンが残っている", async () => {
    const { account0: creator, deployer } = await getSigners();

    // Deploy V1 contract
    const nftV1 = await deploySampleERC1155V1(deployer);

    await nftV1.add([1], [utils.parseEther("0.01")], [1000]);
    await nftV1
      .connect(creator)
      .mint(1, 5, { value: utils.parseEther("0.05") });
    expect(await nftV1.balanceOf(creator.address, 1)).to.equal(5);

    // Upgrade to V2 contract
    const nftV2 = await upgradeSampleERC1155(nftV1, deployer);
    expect(await nftV2.balanceOf(creator.address, 1)).to.equal(5);

    // V2コントラクトの呼び出し
    // V1でmint済みのIDは利用できない
    const tx1 = nftV2.add([1], [utils.parseEther("0.02")], [2000], [2]);
    expect(tx1).to.be.rejected;

    // SampleERC721のNFTを一定数以上持っているユーザーのみmintできる
    await nftV2.add([2], [utils.parseEther("0.02")], [2000], [2]);
    const nft = await deploySampleERC721(deployer);
    nftV2.setSampleToken(nft.address);
    await nft.connect(creator).mint();
    const tx2 = nftV2
      .connect(creator)
      .mint(2, 1, { value: utils.parseEther("0.02") });
    expect(tx2).to.be.rejected;
    await nft.connect(creator).mint();
    const tokenIndex = await nft.tokenOfOwnerByIndex(creator.address, 2 - 1);
    expect(tokenIndex).equal(1);
    await nftV2
      .connect(creator)
      .mint(2, 1, { value: utils.parseEther("0.02") });

    // V1コントラクトでaddされたトークンをmintできる
    await nftV2
      .connect(creator)
      .mint(1, 1, { value: utils.parseEther("0.01") });
  });
});
