// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract SampleERC1155 is ERC1155, ERC2981, Ownable {
    mapping(uint256 => Item) items;

    string public name;
    string public symbol;

    struct Item {
        uint256 price;
        uint256 limitAmount;
        uint256 mintedAmount;
    }

    constructor() ERC1155("") {
        name = "SampleERC1155";
        symbol = "SERC1155";
    }

    function mint(uint256 tokenId, uint256 amount) external payable {
        require(amount >= 1, "You have to mint at least 1 or more at a time");
        require(_exists(tokenId), "Invalid input");

        Item memory item = items[tokenId];
        require(
            item.mintedAmount + amount <= item.limitAmount,
            "Limit reached"
        );
        require(msg.value >= item.price * amount, "Not enough money");

        item.mintedAmount += amount;
        _mint(msg.sender, tokenId, amount, "");
    }

    function setItem(
        uint256 tokenId,
        uint256 price,
        uint256 limitAmount
    ) external onlyOwner {
        require(!_exists(tokenId), "Invalid input");
        items[tokenId] = Item(price, limitAmount, 0);
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        return items[tokenId].limitAmount != 0;
    }

    function setURI(string memory newuri) external onlyOwner {
        _setURI(newuri);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
