// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Color is ERC721Enumerable {
  string[] public colors;
  mapping(string => bool) _colorExists;

  constructor() ERC721("Color", "COLOR") {}

  function mint(string memory _color) public {
    // Require unique color
    require(!_colorExists[_color]);
    colors.push(_color);
    _mint(msg.sender, colors.length);
    _colorExists[_color] = true;
  }
}
