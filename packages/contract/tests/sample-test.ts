import { ethers } from "hardhat";

import type { KBMarket } from "@/typechain/KBMarket";
import type { NFT } from "@/typechain/NFT";

describe("KBMarket", function () {
  it("Should mint and trade NFTs. ", async function () {
    const Market = await ethers.getContractFactory("KBMarket");
    const market = <KBMarket>await Market.deploy();
    await market.deployed();
    const marketAddress = market.address;

    const NFT = await ethers.getContractFactory("NFT");
    const nft = <NFT>await NFT.deploy(marketAddress);
    await nft.deployed();
    const nftContractAddress = nft.address;

    const listingPrice = await market.getListingPrice();
    const auctionPrice = ethers.utils.parseUnits("100", "ether");

    await nft.mintToken("https-t1");
    await nft.mintToken("https-t2");

    await market.makeMarketItem(nftContractAddress, 1, auctionPrice, {
      value: listingPrice,
    });
    await market.makeMarketItem(nftContractAddress, 2, auctionPrice, {
      value: listingPrice,
    });

    const [, buyerAddress] = await ethers.getSigners();
    await market
      .connect(buyerAddress)
      .createMarketSale(nftContractAddress, 1, { value: auctionPrice });

    const items_ = await market.fetchMarketTokens();
    const items = await Promise.all(
      items_.map(async (item) => {
        const tokenURI = await nft.tokenURI(item.tokenId);
        return {
          price: item.price.toString(),
          tokenId: item.tokenId.toString(),
          seller: item.seller,
          owner: item.owner,
          tokenURI,
        };
      })
    );

    console.log("items", items);
  });
});
