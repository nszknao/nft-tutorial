// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import {Test} from "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import {PriceConsumerV3} from "../../contracts/PriceConsumerV3.sol";

contract PriceConsumerV3Test is Test {
    PriceConsumerV3 public consumer;

    function setUp() public {
        consumer = new PriceConsumerV3();
    }

    function testGetLatestPrice() public view {
        int256 price = consumer.getLatestPrice();
        console.logInt(price);
    }
}
