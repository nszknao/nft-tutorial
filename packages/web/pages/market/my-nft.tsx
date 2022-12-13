import type { NextPage } from "next";
import { useFetchMyNFTs } from "@/web/hooks/useFetchMyNFTs";
import { MarketLayout } from "@/web/layout/market";
import { Box, Grid, Image } from "@chakra-ui/react";

const MyNFTPage: NextPage = () => {
  const { data } = useFetchMyNFTs();

  return (
    <MarketLayout>
      {data !== undefined && data.length === 0 ? (
        <h1>You do not own any NFTs currently :(</h1>
      ) : (
        <Grid>
          {data?.map((nft, index) => (
            <Box key={index} border={1} shadow="md" rounded="md">
              <Image src={nft.image} alt={`image#${index}`} />
              <Box p={4}>
                <p>{nft.description}</p>
                <div>{nft.price} ETH</div>
              </Box>
            </Box>
          ))}
        </Grid>
      )}
    </MarketLayout>
  );
};

export default MyNFTPage;
