import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { SampleERC1155__factory as SampleERC1155Factory } from "../typechain";

export const getSigners = async () => {
  const [deployer, account0, account1, account2] = await ethers.getSigners();
  return { deployer, account0, account1, account2 };
};

export const deploySampleERC1155 = async (deployer?: SignerWithAddress) => {
  const signer = deployer || (await getSigners()).deployer;
  const factory = new SampleERC1155Factory(signer);
  return factory.deploy();
};

export const address = (n: number): string => {
  return `0x${n.toString(16).padStart(40, "0")}`;
};
