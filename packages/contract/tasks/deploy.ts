import { task } from "hardhat/config";
import promptjs from "prompt";
import { ContractDeployment, ContractName, DeployedContract } from "./types";

task("deploy", "Deploy").setAction(async (args, { ethers }) => {
  const deployment: Record<ContractName, DeployedContract> = {} as Record<
    ContractName,
    DeployedContract
  >;
  const contracts: Record<ContractName, ContractDeployment> = {
    MultiPartRLEToSVG: {},
    NFTDescriptor: {},
    GitHubContributionDescriptor: {
      libraries: () => ({
        NFTDescriptor: deployment.NFTDescriptor.address,
      }),
    },
    GitHubContributionNFT: {
      args: [
        "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
        "0xCC79157eb46F5624204f47AB42b3906cAA40eaB7",
        "0x7da2702f37fd48e5b1b9a5715e3509b600000000000000000000000000000000",
        () => deployment.GitHubContributionDescriptor.address,
      ],
    },
  };

  let gasPrice = await ethers.provider.getGasPrice();

  for (const [name, contract] of Object.entries(contracts)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const factory = await ethers.getContractFactory(name, {
      libraries: contract?.libraries?.(),
    });

    const deploymentGas = await factory.signer.estimateGas(
      factory.getDeployTransaction(
        ...(contract.args?.map((a) => (typeof a === "function" ? a() : a)) ??
          []),
        {
          gasPrice,
        }
      )
    );
    const deploymentCost = deploymentGas.mul(gasPrice);

    console.log(
      `Estimated cost to deploy ${name}: ${ethers.utils.formatUnits(
        deploymentCost,
        "ether"
      )} ETH`
    );

    if (!args.autoDeploy) {
      const result = await promptjs.get([
        {
          properties: {
            confirm: {
              pattern: /^(DEPLOY|SKIP|EXIT)$/,
              description:
                'Type "DEPLOY" to confirm, "SKIP" to skip this contract, or "EXIT" to exit.',
            },
          },
        },
      ]);
      if (result.confirm === "SKIP") {
        console.log(`Skipping ${name} deployment...`);
        continue;
      }
      if (result.confirm === "EXIT") {
        console.log("Exiting...");
        return;
      }
    }
    console.log(`Deploying ${name}...`);

    const deployedContract = await factory.deploy(
      ...(contract.args?.map((a) => (typeof a === "function" ? a() : a)) ?? []),
      { gasPrice }
    );

    if (contract.waitForConfirmation) {
      await deployedContract.deployed();
    }

    deployment[name as ContractName] = {
      name,
      instance: deployedContract,
      address: deployedContract.address,
      constructorArguments:
        contract.args?.map((a) => (typeof a === "function" ? a() : a)) ?? [],
      libraries: contract?.libraries?.() ?? {},
    };

    contract.validateDeployment?.();

    console.log(`${name} contract deployed to ${deployedContract.address}`);
  }

  return deployment;
});
