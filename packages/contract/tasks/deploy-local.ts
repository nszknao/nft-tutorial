import { Contract as EthersContract } from "ethers";
import { task } from "hardhat/config";
import { ContractName } from "./types";

export type LocalContractName = ContractName;

type Contract = {
  args?: (string | number | (() => string | undefined))[];
  instance?: EthersContract;
  libraries?: () => Record<string, string>;
  waitForConfirmation?: boolean;
};

task("deploy-local", "Deploy contracts to hardhat").setAction(
  async (_, { ethers }) => {
    const { chainId } = await ethers.provider.getNetwork();
    if (chainId !== 31337) {
      console.log(`Invalid chain id. Expected 31337. Got: ${chainId}.`);
      return;
    }

    const [, signer, royaltyReceiver] = await ethers.getSigners();

    const contracts: Record<LocalContractName, Contract> = {
      Counter: {},
    };

    for (const [name, contract] of Object.entries(contracts)) {
      const factory = await ethers.getContractFactory(name, {
        libraries: contract?.libraries?.(),
      });

      // Notice: Initializable contracts containing constructors cannot be upgrades.deployProxy
      const deployedContract = await factory.deploy(
        ...(contract.args?.map((a) => (typeof a === "function" ? a() : a)) ??
          [])
      );

      if (contract.waitForConfirmation) {
        await deployedContract.deployed();
      }

      contracts[name as LocalContractName].instance = deployedContract;

      console.log(`${name} contract deployed to ${deployedContract.address}`);
    }

    return contracts;
  }
);
