// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract SampleERC721 is ERC721Enumerable {
    uint256 private _currentTokenId;

    constructor() ERC721("SampleERC721", "SampleERC721") {}

    /**
     * @notice Mints a single NFT
     */
    function mint() public {
        uint256 newId = _currentTokenId;
        _safeMint(msg.sender, newId);
        _currentTokenId++;
    }
}
