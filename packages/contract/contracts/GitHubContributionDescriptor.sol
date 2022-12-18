// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {IGitHubContributionDescriptor} from "./interfaces/IGitHubContributionDescriptor.sol";
import {NFTDescriptor} from "./libs/NFTDescriptor.sol";

contract GitHubContributionDescriptor is
    IGitHubContributionDescriptor,
    Ownable
{
    using Strings for uint256;

    // prettier-ignore
    // https://creativecommons.org/publicdomain/zero/1.0/legalcode.txt
    bytes32 constant COPYRIGHT_CC0_1_0_UNIVERSAL_LICENSE = 0xa2010f343487d3f7618affe54f789f5487602331c0a8d03f49e9a7c547cf0499;

    mapping(uint8 => string[]) public palettes;

    function addManyColorsToPalette(
        uint8 paletteIndex,
        string[] calldata newColors
    ) external onlyOwner {
        require(
            palettes[paletteIndex].length + newColors.length <= 256,
            "Palettes can only hold 256 colors"
        );
        for (uint256 i = 0; i < newColors.length; i++) {
            _addColorToPalette(paletteIndex, newColors[i]);
        }
    }

    function addColorToPalette(uint8 _paletteIndex, string calldata _color)
        external
        onlyOwner
    {
        require(
            palettes[_paletteIndex].length <= 255,
            "Palettes can only hold 256 colors"
        );
        _addColorToPalette(_paletteIndex, _color);
    }

    function tokenURI(uint256 tokenId, bytes calldata image)
        external
        view
        override
        returns (string memory)
    {
        return dataURI(tokenId, image);
    }

    function dataURI(uint256 tokenId, bytes calldata image)
        public
        view
        override
        returns (string memory)
    {
        string memory name = string(
            abi.encodePacked("GitHubContributionNFT ", tokenId.toString())
        );
        string memory description = string(
            abi.encodePacked("GitHub Contribution NFT")
        );

        return genericDataURI(name, description, image);
    }

    function genericDataURI(
        string memory name,
        string memory description,
        bytes calldata image
    ) public view override returns (string memory) {
        NFTDescriptor.TokenURIParams memory params = NFTDescriptor
            .TokenURIParams({
                name: name,
                description: description,
                parts: _getPartsForSeed(image),
                background: "ffffff"
            });

        return NFTDescriptor.constructTokenURI(params, palettes);
    }

    function _getPartsForSeed(bytes calldata image)
        internal
        pure
        returns (bytes[] memory)
    {
        bytes[] memory parts = new bytes[](1);
        parts[0] = image;
        return parts;
    }

    function _addColorToPalette(uint8 _paletteIndex, string calldata _color)
        internal
    {
        palettes[_paletteIndex].push(_color);
    }
}
