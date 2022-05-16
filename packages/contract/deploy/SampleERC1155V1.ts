import type { HardhatRuntimeEnvironment } from "hardhat/types";
import type { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("SampleERC1155V1", {
    from: deployer,
    log: true,
    gasPrice: "9000000000",
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      owner: deployer,
      execute: {
        methodName: "initialize",
        args: [
          "SampleERC1155V1",
          "SERC1155V1",
          "https://gateway.pinata.cloud/ipfs/QmerurnG12Kk33fmnpwomZM5Sm5k5GruNnxEdtBrMwnKwZ/{id}.json",
        ],
      },
    },
  });
};

deploy.tags = ["SampleERC1155V1"];

export default deploy;
