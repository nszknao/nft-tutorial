// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import {APIConsumer} from "../../contracts/test/APIConsumer.sol";

contract APIConsumerTest is Test {
    APIConsumer public consumer;

    function setUp() public {
        console.log(msg.sender);

        consumer = new APIConsumer();
    }
}
