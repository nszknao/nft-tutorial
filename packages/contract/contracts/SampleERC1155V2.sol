// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/common/ERC2981Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721EnumerableUpgradeable.sol";

contract SampleERC1155V2 is
    ERC1155Upgradeable,
    ERC2981Upgradeable,
    OwnableUpgradeable
{
    // SampleERC1155V1に加えて、クエスト用を追加する

    // NFT name
    string public name;

    // NFT symbol
    string public symbol;

    // Mapping from token ID to token existence
    mapping(uint256 => bool) private exists;

    // Mapping from token ID to token supply
    mapping(uint256 => uint256) private tokenSupply;

    // Mapping from token ID to token price
    mapping(uint256 => uint256) public prices;

    // Mapping from token ID to token quantity
    mapping(uint256 => uint256) public maxTokenSupply;

    function initialize(
        string memory _name,
        string memory _symbol,
        string memory _uri
    ) public initializer {
        name = _name;
        symbol = _symbol;
        __ERC1155_init(_uri);
        __Ownable_init();
        __ERC2981_init();
    }

    /**
     * @notice Mints a desired quantity of a single NFT ID
     */
    function mint(uint256 id, uint256 quantity) external payable {
        require(quantity >= 1, "You have to mint at least 1 or more at a time");
        require(exists[id], "ID does not exist");

        require(
            tokenSupply[id] + quantity <= maxTokenSupply[id],
            "Maximum supply exceeded"
        );
        require(msg.value >= prices[id] * quantity, "Not enough money");

        _mint(msg.sender, id, quantity, "");
    }

    /**
     * @notice Batch Mints desired quantities of different NFT IDs
     */
    function mintBatch(uint256[] calldata ids, uint256[] calldata quantities)
        external
        payable
    {
        require(ids.length == quantities.length, "Mismatched array lengths");

        for (uint256 i = 0; i < ids.length; i++) {
            require(exists[ids[i]], "ID does not exist");
            require(
                tokenSupply[ids[i]] + quantities[i] <= maxTokenSupply[ids[i]],
                "Maximum supply exceeded"
            );
            require(
                msg.value >= prices[ids[i]] * quantities[i],
                "Not enough money"
            );
        }

        _mintBatch(msg.sender, ids, quantities, "");
    }

    /**
     * @dev Adds a new NFT and initializes crafting params
     */
    function add(
        uint256[] calldata ids,
        uint256[] calldata _prices,
        uint256[] calldata _maxSupply
    ) external onlyOwner {
        require(
            ids.length == _prices.length && ids.length == _maxSupply.length,
            "Mismatched array lengths"
        );

        for (uint256 i = 0; i < ids.length; i++) {
            uint256 newId = ids[i];
            require(!exists[newId], "ID already exists");
            require(newId != 0, "Invalid ID");

            exists[newId] = true;
            prices[newId] = _prices[i];
            maxTokenSupply[newId] = _maxSupply[i];
        }
    }

    /**
     * @dev Function to set the URI for all NFT IDs
     */
    function setURI(string memory newuri) external onlyOwner {
        _setURI(newuri);
    }

    /**
     * @notice Maps the rarity classes and Volt costs
     * for use in crafting
     */
    function updateCraftingParameters(
        uint256[] calldata ids,
        uint256[] calldata _prices,
        uint256[] calldata _maxSupply
    ) external onlyOwner {
        require(
            ids.length == _prices.length && ids.length == _maxSupply.length,
            "Mismatched array lengths"
        );

        for (uint256 i = 0; i < ids.length; i++) {
            require(exists[ids[i]], "ID does not exist");

            prices[ids[i]] = _prices[i];
            maxTokenSupply[ids[i]] = _maxSupply[i];
        }
    }

    /**
     * @dev Returns the total quantity for a token ID
     */
    function totalSupply(uint256 id) external view returns (uint256) {
        return tokenSupply[id];
    }

    /**
     * @dev Returns the total price for a token ID
     */
    function price(uint256 id) external view returns (uint256) {
        return prices[id];
    }

    /**
     * @dev Returns the max supply for a token ID
     */
    function maxSupply(uint256 id) external view returns (uint256) {
        return maxTokenSupply[id];
    }

    /**
     * @dev See {IERC165-supportsInterface}
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155Upgradeable, ERC2981Upgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @dev Internal override function for minting an NFT
     */
    function _mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) internal override {
        super._mint(account, id, amount, data);

        tokenSupply[id] += amount;
    }

    /**
     * @dev Internal override function for batch minting NFTs
     */
    function _mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override {
        super._mintBatch(to, ids, amounts, data);

        for (uint256 i = 0; i < ids.length; i++) {
            tokenSupply[ids[i]] += amounts[i];
        }
    }
}
