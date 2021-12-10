import { useFetchMyNFTs } from "@/web/hooks/useFetchMyNFTs";
import { MarketLayout } from "@/web/layout/market";
import { Box, Grid, Image } from "@chakra-ui/react";
import { VFC } from "react";

export const MyNFT: VFC = () => {
  const { data } = useFetchMyNFTs();

  if (data !== undefined && data.length === 0) {
    return <h1>You do not own any NFTs currently :(</h1>;
  }

  return (
    <MarketLayout>
      <Grid>
        {data?.map((nft, index) => (
          <Box key={index} border={1} shadow="md" rounded="md">
            <Image src={nft.image} alt={`image#${index}`} />
            <Box p={4}>
              <p>{nft.description}</p>
              <div>{nft.price} ETH</div>
              {/* <Button onClick={() => buyNFT(nft)}>Buy</Button> */}
            </Box>
          </Box>
        ))}
      </Grid>
    </MarketLayout>
  );
};
