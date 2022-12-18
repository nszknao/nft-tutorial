// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import {GitHubContributionDescriptor} from "../../../contracts/GitHubContributionDescriptor.sol";

abstract contract DescriptorHelpers is Test {
    function _populateDescriptor(GitHubContributionDescriptor descriptor)
        internal
    {
        string
            memory filename = "./test/foundry/files/descriptor/palette-data.abi";
        bytes memory content = readFile(filename);
        string[] memory palette = abi.decode(content, (string[]));
        descriptor.addManyColorsToPalette(0, palette);
    }

    function readFile(string memory filepath)
        internal
        returns (bytes memory output)
    {
        string[] memory inputs = new string[](2);
        inputs[0] = "cat";
        inputs[1] = filepath;
        output = vm.ffi(inputs);
    }
}
