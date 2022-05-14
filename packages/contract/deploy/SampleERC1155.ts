import type { HardhatRuntimeEnvironment } from "hardhat/types";
import type { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("SampleERC1155", {
    args: [],
    from: deployer,
    log: true,
    proxy: true,
  });
};

deploy.tags = ["SampleERC1155"];

export default deploy;
