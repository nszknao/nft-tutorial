import { task } from "hardhat/config";
import { DeployedContract } from "./types";

const themes = [
  // Themes from GitHub
  ["eeeeee", "9be9a8", "40c463", "30a14e", "216e39"],
  ["eeeeee", "fdf156", "ffc722", "ff9711", "04001b"],
  // Themes from Material design
  ["eeeeee", "ffecb3", "ffd54f", "ffb300", "ff6f00"],
  ["eeeeee", "bbdefb", "64b5f6", "1e88e5", "0d47a1"],
  ["eeeeee", "cfd8dc", "90a4ae", "546e7a", "263238"],
  ["eeeeee", "d7ccc8", "a1887f", "6d4c41", "3e2723"],
  ["eeeeee", "b2ebf2", "4dd0e1", "00acc1", "006064"],
  ["eeeeee", "ffccbc", "ff8a65", "f4511e", "bf360c"],
  ["eeeeee", "d1c4e9", "9575cd", "5e35b1", "311b92"],
  ["eeeeee", "c8e6c9", "81c784", "43a047", "1b5e20"],
  ["eeeeee", "e0e0e0", "9e9e9e", "616161", "212121"],
  ["eeeeee", "c5cae9", "7986cb", "3949ab", "1a237e"],
  ["eeeeee", "b3e5fc", "4fc3f7", "039be5", "01579b"],
  ["eeeeee", "dcedc8", "aed581", "7cb342", "33691e"],
  ["eeeeee", "f0f4c3", "dce775", "c0ca33", "827717"],
  ["eeeeee", "ffe0b2", "ffb74d", "fb8c00", "e65100"],
  ["eeeeee", "f8bbd0", "f06292", "e91e63", "880e4f"],
  ["eeeeee", "e1bee7", "ba68c8", "8e24aa", "4a148c"],
  ["eeeeee", "ffcdd2", "e57373", "e53935", "b71c1c"],
  ["eeeeee", "b2dfdb", "4db6ac", "00897b", "004d40"],
  ["eeeeee", "fff9c4", "fff176", "ffd835", "f57f17"],
  // Theme from Me
  ["eeeeee", "6dc5fb", "f6f68c", "8affa4", "f283d1"],
  ["eeeeee", "eae374", "f9d62e", "fc913a", "ff4e50"],
  ["eeeeee", "fed800", "ff6f01", "fd2f24", "811d5e"],
  // Theme from MoonAntonio
  ["eeeeee", "6bcdff", "00a1f3", "48009a", "4f2266"],
  ["eeeeee", "faafe1", "fb6dcc", "fa3fbc", "ff00ab"],
  ["eeeeee", "d7d7a2", "d4d462", "e0e03f", "ffff00"],
];

interface ContractRow {
  Address: string;
  "Deployment Hash"?: string;
}

task("deploy-and-configure", "Deploy and configure all contracts").setAction(
  async (args, { run, ethers }) => {
    // Deploy the OPTTAG contracts and return deployment information
    const contracts = await run("deploy", args);

    // Verify the contracts on Etherscan
    // await run("verify-etherscan", {
    //   contracts,
    // });

    const [deployer] = await ethers.getSigners();

    for (let i = 0; i < 5; i++) {
      console.log(`Adding palette ${i}...`);
      const tx = await contracts.GitHubContributionDescriptor.instance
        .connect(deployer)
        .addManyColorsToPalette(i, themes[i]);
      await tx.wait();
    }

    console.table(
      Object.values<DeployedContract>(contracts).reduce(
        (acc: Record<string, ContractRow>, contract: DeployedContract) => {
          acc[contract.name] = {
            Address: contract.address,
          };
          if (contract.instance?.deployTransaction) {
            acc[contract.name]["Deployment Hash"] =
              contract.instance.deployTransaction.hash;
          }
          return acc;
        },
        {}
      )
    );
    console.log("Deployment Complete.");
  }
);
