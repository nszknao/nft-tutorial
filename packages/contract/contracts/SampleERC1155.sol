// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SampleERC1155 is ERC1155, ERC2981, Ownable {
    mapping(uint256 => uint256) prices;
    mapping(uint256 => uint256) limitAmounts;
    mapping(uint256 => uint256) amountMinted;

    constructor() ERC1155("ipfs://QmQqMF7izNAaU9CY3qV9ZGs4Aksv6ywjx8261khgzQbReW") {}

    function mint(uint256 tokenId, uint256 amount) external payable {
        require(amount >= 1, "You have to mint at least 1 or more at a time");

        require(
            amountMinted[tokenId] + amount <= limitAmounts[tokenId],
            "Limit reached"
        );
        require(msg.value >= prices[tokenId] * amount, "Not enough money");

        amountMinted[tokenId] += amount;
        _mint(msg.sender, tokenId, amount, "");
    }

    function register(
        uint256 tokenId,
        uint256 price,
        uint256 limitAmount
    ) external onlyOwner {
        prices[tokenId] = price;
        limitAmounts[tokenId] = limitAmount;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, ERC2981)
        returns (bool)
    {
        return
            interfaceId == type(IERC2981).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}
