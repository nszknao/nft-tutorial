const Creature = artifacts.require("./Creature.sol");

contract("Creature", (accounts) => {
  const URI_BASE = "https://creatures-api.opensea.io";
  const CONTRACT_URI = `${URI_BASE}/contract/opensea-creatures`;
  let creature;

  before(async () => {
    creature = await Creature.deployed();
  });

  describe("#constructor()", () => {
    it("should set the contractURI to the supplied value", async () => {
      assert.equal(await creature.contractURI(), CONTRACT_URI);
    });
  });
});
