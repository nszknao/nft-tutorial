// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import {PriceConsumerV3} from "../../contracts/test/PriceConsumerV3.sol";

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
