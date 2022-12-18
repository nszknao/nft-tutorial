import { Contract } from "ethers";
import { Libraries } from "hardhat/types";

export type ContractName =
  | "GitHubContributionNFT"
  | "GitHubContributionDescriptor"
  | "MultiPartRLEToSVG";

export enum ChainId {
  mainnet = 1,
  goerli = 5,
}

export type ContractDeployment = {
  args?: (string | number | (() => string))[];
  libraries?: () => Record<string, string>;
  waitForConfirmation?: boolean;
  validateDeployment?: () => void;
};

export interface DeployedContract {
  name: string;
  address: string;
  instance: Contract;
  constructorArguments: (string | number)[];
  libraries?: Libraries;
}
