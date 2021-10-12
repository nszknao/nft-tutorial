const Color = artifacts.require("./Color.sol");

require("chai").use(require("chai-as-promised")).should();

contract("Color", (accounts) => {
  let contract;

  beforeEach(async () => {
    contract = await Color.new();
  });

  describe("deployment", () => {
    it("deploys successfully", async () => {
      const address = contract.address;
      console.log(address);
      assert.notEqual(address, "");
    });

    it("has a name", async () => {
      const name = await contract.name();
      assert.equal(name, "Color");
    });

    it("has a symbol", async () => {
      const symbol = await contract.symbol();
      assert.equal(symbol, "COLOR");
    });
  });

  describe("minting", () => {
    it("creates a new token", async () => {
      const result = await contract.mint("#EC058F");
      const totalSupply = await contract.totalSupply();
      // SUCCESS
      assert.equal(totalSupply, 1);
      const event = result.logs[0].args;
      assert.equal(event.tokenId.toNumber(), 1, "id is correct");
      assert.equal(
        event.from,
        "0x0000000000000000000000000000000000000000",
        "from is correct"
      );
      assert.equal(event.to, accounts[0], "to is correct");

      // FAILURE: cannnot mint some color twice
      await contract.mint("#EC058F").should.be.rejected;
    });
  });

  describe("indexing", () => {
    it("lists colors", async () => {
      // Mint 3 tokens
      await contract.mint("#5386E4");
      await contract.mint("#FFFFFF");
      await contract.mint("#000000");
      const totalSupply = await contract.totalSupply();

      let results = [];

      for (let i = 0; i < totalSupply; i++) {
        const color = await contract.colors(i);
        results.push(color);
      }

      const expected = ["#5386E4", "#FFFFFF", "#000000"];
      assert.equal(results.join(","), expected.join(","));
    });
  });
});
