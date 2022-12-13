import { useFetchItemsCreated } from "@/web/hooks/useFetchItemsCreated";
import { MarketLayout } from "@/web/layout/market";
import { Box, Grid, Image } from "@chakra-ui/react";
import type { NextPage } from "next";

const AccountDashboardPage: NextPage = () => {
  const { data } = useFetchItemsCreated();

  return (
    <MarketLayout>
      {data !== undefined && data.length === 0 ? (
        <h1>You have not minted any NFTs!</h1>
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

export default AccountDashboardPage;
