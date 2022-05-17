import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ContractAddressOrInstance } from "@openzeppelin/hardhat-upgrades/dist/utils";
import { ethers, upgrades } from "hardhat";
import {
  SampleERC1155__factory as SampleERC1155Factory,
  SampleERC1155V1,
  SampleERC1155V1__factory as SampleERC1155V1Factory,
  SampleERC1155V2,
  SampleERC1155V2__factory as SampleERC1155V2Factory,
  SampleERC721__factory as SampleERC721Factory,
} from "../typechain";

export const getSigners = async () => {
  const [deployer, account0, account1, account2] = await ethers.getSigners();
  return { deployer, account0, account1, account2 };
};

export const deploySampleERC721 = async (deployer?: SignerWithAddress) => {
  const signer = deployer || (await getSigners()).deployer;
  const factory = new SampleERC721Factory(signer);
  const contract = await factory.deploy();
  await contract.deployed();
  return contract;
};

export const deploySampleERC1155 = async (deployer?: SignerWithAddress) => {
  const signer = deployer || (await getSigners()).deployer;
  const factory = new SampleERC1155Factory(signer);
  const contract = await factory.deploy();
  await contract.deployed();
  return contract;
};

export const deploySampleERC1155V1 = async (
  deployer?: SignerWithAddress,
  uri?: string,
  name?: string,
  symbol?: string
) => {
  const signer = deployer || (await getSigners()).deployer;
  const factory = new SampleERC1155V1Factory(signer);
  const contract = await upgrades.deployProxy(
    factory,
    [
      name || "SampleERC1155V1",
      symbol || "SERC1155V1",
      uri || "ipfs://xxx/{id}.json",
    ],
    { initializer: "initialize" }
  );
  await contract.deployed();
  return contract as SampleERC1155V1;
};

export const upgradeSampleERC1155 = async (
  instanceAddress: ContractAddressOrInstance,
  deployer?: SignerWithAddress
) => {
  const signer = deployer || (await getSigners()).deployer;
  const factory = new SampleERC1155V2Factory(signer);
  const contract = await upgrades.upgradeProxy(instanceAddress, factory);
  await contract.deployed();
  return contract as SampleERC1155V2;
};

export const address = (n: number): string => {
  return `0x${n.toString(16).padStart(40, "0")}`;
};
