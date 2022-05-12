// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SampleERC721 is ERC721 {
    uint256 private _currentTokenId;

    constructor() ERC721("SampleERC721", "SampleERC721") {}

    function mintToken() public returns (uint256) {
        uint256 tokenId = _currentTokenId;
        _mint(msg.sender, tokenId);
        _currentTokenId++;
        return tokenId;
    }
}
