// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import {GitHubContributionDescriptor} from "../../contracts/GitHubContributionDescriptor.sol";
import {DeployUtils} from "./helpers/DeployUtils.sol";

contract GitHubContributionDescriptorTest is Test, DeployUtils {
    GitHubContributionDescriptor descriptor;

    function setUp() public {
        descriptor = _deployAndPopulateDescriptor();
    }

    function testTokenURIWorks() public {
        string
            memory filename = "./test/foundry/files/descriptor/image-data.abi";
        bytes memory content = readFile(filename);
        bytes memory body = abi.decode(content, (bytes));

        string memory uri = descriptor.tokenURI(0, body);
        console.log(uri);
    }
}
