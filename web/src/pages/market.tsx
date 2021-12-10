import { MarketTokenStructOutput } from "@/typechain/KBMarket";
import KBMarket from "@/artifacts/contracts/KBMarket.sol/KBMarket.json";
import NFT from "@/artifacts/contracts/NFT.sol/NFT.json";
import { nftaddress, nftmarketaddress } from "@/web/const/config";
import { MarketLayout } from "@/web/layout/market";
import { Box, Button, Flex, Grid, Image } from "@chakra-ui/react";
import { Contract } from "@ethersproject/contracts";
import { JsonRpcProvider } from "@ethersproject/providers";
import { formatUnits, parseUnits } from "@ethersproject/units";
import axios from "axios";
import React, { useCallback, useEffect, useState, VFC } from "react";

type INFT = {
  price: string;
  tokenId: string;
  seller: string;
  owner: string;
  image: string;
  name: string;
  description: string;
};

export const Market: VFC = () => {
  const [nfts, setNfts] = useState<INFT[]>([]);
  const [loading, setLoading] = useState("not loaded");

  const loadNFTs = useCallback(async () => {
    const provider = new JsonRpcProvider();
    const tokenContract = new Contract(nftaddress, NFT.abi, provider);
    const marketContract = new Contract(
      nftmarketaddress,
      KBMarket.abi,
      provider
    );
    const data: MarketTokenStructOutput[] =
      await marketContract.fetchMarketTokens();

    const items = await Promise.all(
      data.map(async (item) => {
        const tokenUri = await tokenContract.functions.tokenURI(item.tokenId);
        const meta = await axios.get(tokenUri);
        console.log(tokenUri);
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

  const buyNFT = async (nft: INFT) => {
    const contract = new Contract(nftmarketaddress, KBMarket.abi);

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
    <MarketLayout>
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
    </MarketLayout>
  );
};
