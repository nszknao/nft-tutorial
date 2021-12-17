import { useBuyItem } from "@/web/hooks/useBuyItem";
import { useFetchMarketItems } from "@/web/hooks/useFetchMarketItems";
import { MarketLayout } from "@/web/layout/market";
import { Box, Button, Flex, Grid, Image } from "@chakra-ui/react";
import { type VFC } from "react";

export const Market: VFC = () => {
  const { data, mutate } = useFetchMarketItems();
  const { buyItem } = useBuyItem();

  return (
    <MarketLayout>
      {data !== undefined && data.length === 0 ? (
        <h1>No NFTs in marketplace</h1>
      ) : (
        <Flex>
          <Box px={4}></Box>
          <Grid>
            {data?.map((nft, index) => (
              <Box key={index} border={1} shadow="md" rounded="md">
                <Image src={nft.image} alt={`image#${index}`} />
                <Box p={4}>
                  <div>{nft.name}</div>
                  <p>{nft.description}</p>
                  <div>{nft.price} ETH</div>
                  <div>Owner: {nft.owner}</div>
                  <div>Seller: {nft.seller}</div>
                  <Button
                    onClick={() => {
                      buyItem(nft);
                      mutate();
                    }}
                  >
                    Buy
                  </Button>
                </Box>
              </Box>
            ))}
          </Grid>
        </Flex>
      )}
    </MarketLayout>
  );
};
