import { Box, Button, Flex, Grid, Heading, Image } from "@chakra-ui/react";
import axios from "axios";
import { ethers } from "ethers";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import KBMarket from "../artifacts/contracts/KBMarket.sol/KBMarket.json";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import { nftaddress, nftmarketaddress } from "../config";

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState("not loaded");

  const loadNFTs = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      KBMarket.abi,
      provider
    );
    const data = await marketContract.fetchMarketTokens();

    const items = await Promise.all(
      data.map(async (item) => {
        const tokenUri = await tokenContract.tokenURI(item.tokenId);
        const meta = await axios.get(tokenUri);
        const price = ethers.utils.formatUnits(item.price.toString(), "ether");
        return {
          price,
          tokenId: item.tokenId.toString(),
          seller: item.seller,
          owner: item.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
      })
    );
    setNfts(items);
    setLoading("loaded");
  };

  const buyNFT = async (nft) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      nftmarketaddress,
      KBMarket.abi,
      signer
    );

    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(
      nftaddress,
      nft.tokenId,
      { value: price }
    );

    await transaction.wait();
    loadNFTs();
  };

  useEffect(() => {
    loadNFTs();
  }, [loadNFTs]);

  return (
    <div>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        padding={4}
        bg="teal.500"
        color="white"
      >
        <Heading as="h1" size="md" letterSpacing="tighter">
          Kryptobirdz
        </Heading>
        <Link href="/">
          <a>Main Marketplace</a>
        </Link>
        <Link href="/mint-item">
          <a>Mint Tokens</a>
        </Link>
        <Link href="/my-nfts">
          <a>My NFTs</a>
        </Link>
        <Link href="/account-dashborad">
          <a>Account Dashboard</a>
        </Link>
      </Flex>

      {loading === "loaded" && !nfts.length ? (
        <h1>No NFTs in marketplace</h1>
      ) : (
        <Flex>
          <Box px={4}></Box>
          <Grid>
            {nfts.map((nft, index) => (
              <Box key={index} border={1} shadow="md" rounded="md">
                <Image src={nft.image} />
                <Box p={4}>
                  <p>{nft.description}</p>
                  <div>{nft.price} ETH</div>
                  <Button onClick={() => buyNFT(nft)}>Buy</Button>
                </Box>
              </Box>
            ))}
          </Grid>
        </Flex>
      )}
    </div>
  );
}
