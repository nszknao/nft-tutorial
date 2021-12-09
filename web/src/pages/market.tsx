import { MarketTokenStructOutput } from "@/typechain/KBMarket";
import KBMarket from "@/artifacts/contracts/KBMarket.sol/KBMarket.json";
import NFT from "@/artifacts/contracts/NFT.sol/NFT.json";
import { Box, Button, Flex, Grid, Heading, Image } from "@chakra-ui/react";
import { Contract } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import Link from "next/link";
import React, { useCallback, useEffect, useState, VFC } from "react";
import { nftaddress, nftmarketaddress } from "../../config";

export const Market: VFC = () => {
  const { library } = useWeb3React<Web3Provider>();

  const [nfts, setNfts] = useState<MarketTokenStructOutput[]>([]);
  const [loading, setLoading] = useState("not loaded");

  const loadNFTs = useCallback(async () => {
    // const provider = new JsonRpcProvider();
    const tokenContract = new Contract(nftaddress, NFT.abi);
    const marketContract = new Contract(nftmarketaddress, KBMarket.abi);
    const data: MarketTokenStructOutput[] =
      await marketContract.fetchMarketTokens();

    const items = await Promise.all(
      data.map(async (item) => {
        const tokenUri = await tokenContract.tokenURI(item.tokenId);
        const meta = await axios.get(tokenUri);
        const price = formatUnits(item.price.toString(), "ether");
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
  }, []);

  const buyNFT = async (nft) => {
    const signer = library?.getSigner();
    const contract = new Contract(nftmarketaddress, KBMarket.abi, signer);

    const price = parseUnits(nft.price.toString(), "ether");
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
                <Image src={nft.image} alt={`image#${index}`} />
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
};
