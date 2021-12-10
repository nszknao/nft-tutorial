import { KBMarket__factory } from "@/typechain/factories/KBMarket__factory";
import { NFT__factory } from "@/typechain/factories/NFT__factory";
import { nftaddress, nftmarketaddress } from "@/web/const/config";
import { MarketLayout } from "@/web/layout/market";
import { Box, Button, Image, Input, Textarea } from "@chakra-ui/react";
import { Web3Provider } from "@ethersproject/providers";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import { ChangeEvent, useState, VFC } from "react";

const client = ipfsHttpClient({
  url: "https://ipfs.infura.io:5001/api/v0",
});

export const MintItem: VFC = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  const router = useRouter();
  const { library } = useWeb3React<Web3Provider>();

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const createSale = async (url: string) => {
    if (library === undefined) return;
    const signer = library.getSigner();
    // @ts-ignore
    const nft = NFT__factory.connect(nftaddress, signer);
    let transaction = await nft.mintToken(url);
    const tx = await transaction.wait();
    const event = tx.events?.[0];
    const value = event?.args?.[2];
    const tokenId = value.toString();
    const price = parseUnits(formInput.price, "ether");

    // @ts-ignore
    const market = KBMarket__factory.connect(nftmarketaddress, signer);
    const listingPrice = await market.getListingPrice();

    transaction = await market.makeMarketItem(nftaddress, tokenId, price, {
      value: listingPrice.toString(),
    });
    await transaction.wait();
    router.push("./");
  };

  const createMarket = async () => {
    if (
      !formInput.name ||
      !formInput.description ||
      !formInput.price ||
      !fileUrl
    ) {
      console.log(formInput, fileUrl);
      return;
    }
    // upload to IPFS
    const data = JSON.stringify({
      name: formInput.name,
      description: formInput.description,
      image: fileUrl,
    });

    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  return (
    <MarketLayout>
      <Box>
        <Input
          placeholder="Asset name"
          onChange={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
        />
        <Textarea
          placeholder="Asset description"
          onChange={(e) =>
            updateFormInput({ ...formInput, description: e.target.value })
          }
        />
        <Input
          placeholder="Asset price in ETH"
          onChange={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        />
        <Input type="file" name="Asset" onChange={onChange} />
        {fileUrl && <Image alt="preview image" w="350px" src={fileUrl} />}

        <Button onClick={createMarket}>Mint NFT</Button>
      </Box>
    </MarketLayout>
  );
};
