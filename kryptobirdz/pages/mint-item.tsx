import { Box, Button, Image, Input, Textarea } from "@chakra-ui/react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import React, { useState, VFC } from "react";
import Web3Modal from "web3modal";
import KBMarket from "../artifacts/contracts/KBMarket.sol/KBMarket.json";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import { nftaddress, nftmarketaddress } from "../config";

const client = ipfsHttpClient({
  url: "https://ipfs.infura.io:5001/api/v0",
});

const MintItem: VFC = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  const router = useRouter();

  const onChange = async (e) => {
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
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const nftContract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await nftContract.mintToken(url);
    const tx = await transaction.wait();
    const event = tx.events[0];
    const value = event.args[2];
    const tokenId = value.toString();
    const price = ethers.utils.parseUnits(formInput.price, "ether");

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      KBMarket.abi,
      signer
    );
    let listingPrice = await marketContract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await marketContract.makeMarketItem(
      nftaddress,
      tokenId,
      price,
      { value: listingPrice }
    );
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
  );
};

export default MintItem;
