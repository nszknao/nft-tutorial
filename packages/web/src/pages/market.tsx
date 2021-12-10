import { KBMarket__factory } from "@/typechain/factories/KBMarket__factory";
import { nftaddress, nftmarketaddress } from "@/web/const/config";
import {
  MarketItem,
  useFetchMarketItems,
} from "@/web/hooks/useFetchMarketItems";
import { MarketLayout } from "@/web/layout/market";
import { Box, Button, Flex, Grid, Image } from "@chakra-ui/react";
import { Web3Provider } from "@ethersproject/providers";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { type VFC } from "react";

export const Market: VFC = () => {
  const { data, mutate } = useFetchMarketItems();
  const { library } = useWeb3React<Web3Provider>();

  const buyNFT = async (item: MarketItem) => {
    if (library === undefined) return;
    const signer = library.getSigner();
    const market = KBMarket__factory.connect(nftmarketaddress, signer);

    const price = parseUnits(item.price.toString(), "ether");
    const transaction = await market.createMarketSale(
      nftaddress,
      item.tokenId,
      { value: price }
    );

    await transaction.wait();
    mutate();
  };

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
