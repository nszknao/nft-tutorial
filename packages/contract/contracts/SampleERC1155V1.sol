// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/common/ERC2981Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";

contract SampleERC1155V1 is
    ERC1155Upgradeable,
    ERC2981Upgradeable,
    OwnableUpgradeable
{
    mapping(uint256 => Item) items;

    string public name;
    string public symbol;

    struct Item {
        uint256 price;
        uint256 limitAmount;
        uint256 mintedAmount;
    }

    function initialize() public initializer {
        name = "SampleERC1155";
        symbol = "SERC1155";
        __ERC1155_init("");
        __Ownable_init();
        __ERC2981_init();
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
        override(ERC1155Upgradeable, ERC2981Upgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
