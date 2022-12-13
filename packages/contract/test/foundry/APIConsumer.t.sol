// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import {Test} from "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import {APIConsumer} from "../../contracts/APIConsumer.sol";

contract APIConsumerTest is Test {
    APIConsumer public consumer;

    function setUp() public {
        console.log(msg.sender);

        consumer = new APIConsumer();
    }

    function testGetLatestPrice() public {
        bytes32 requestId = consumer.requestVolumeData();
        console.logBytes32(requestId);
        // consumer.fulfill(requestId);
    }
}
