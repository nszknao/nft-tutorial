// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import {ISVGRenderer} from "./ISVGRenderer.sol";

interface IGitHubContributionDescriptor {
    function tokenURI(uint256 tokenId, bytes calldata image)
        external
        view
        returns (string memory);

    function dataURI(uint256 tokenId, bytes calldata image)
        external
        view
        returns (string memory);

    function genericDataURI(
        string calldata name,
        string calldata description,
        bytes calldata image
    ) external view returns (string memory);

    function generateSVGImage(bytes calldata image)
        external
        view
        returns (string memory);
}
