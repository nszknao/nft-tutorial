// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import {GitHubContributionDescriptor} from "../../../contracts/GitHubContributionDescriptor.sol";
import {DescriptorHelpers} from "./DescriptorHelpers.sol";

abstract contract DeployUtils is Test, DescriptorHelpers {
    function _deployAndPopulateDescriptor()
        internal
        returns (GitHubContributionDescriptor)
    {
        GitHubContributionDescriptor descriptor = new GitHubContributionDescriptor();
        _populateDescriptor(descriptor);
        return descriptor;
    }
}
