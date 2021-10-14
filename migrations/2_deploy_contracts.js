const Color = artifacts.require("Color");
const Creature = artifacts.require("Creature");

module.exports = function (deployer) {
  const proxyRegistryAddress = "0xE9200A5ec010d833c07293b3f00f27a59395Be0C";
  deployer.deploy(Color);
  deployer.deploy(Creature, proxyRegistryAddress);
};
