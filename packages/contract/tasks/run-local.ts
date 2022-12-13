import { TASK_COMPILE, TASK_NODE } from "hardhat/builtin-tasks/task-names";
import { task } from "hardhat/config";

task(
  "run-local",
  "Start a hardhat node, deploy contracts, and execute setup transactions"
).setAction(async (_, { ethers, run }) => {
  await run(TASK_COMPILE);

  await Promise.race([
    run(TASK_NODE),
    new Promise((resolve) => setTimeout(resolve, 2_000)),
  ]);

  const contracts = await run("deploy-local");

  const { chainId } = await ethers.provider.getNetwork();

  const accounts = {
    "Account #0": {
      Address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "Private Key":
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    },
    "Account #19": {
      Address: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
      "Private Key":
        "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e",
    },
    "Account #18": {
      Address: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
      "Private Key":
        "0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0",
    },
  };

  const [deployer] = await ethers.getSigners();

  console.table(accounts);

  console.log(
    `Contracts deployed to local node at http://localhost:8545 (Chain ID: ${chainId})`
  );
  console.log(`Counter address: ${contracts.Counter.instance.address}`);

  await ethers.provider.send("evm_setIntervalMining", [12_000]);

  await new Promise(() => {
    /* keep node alive until this process is killed */
  });
});
