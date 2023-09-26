// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import "../src/GomokuV1.sol";

contract GomokuV1Script is Script {
    function run() public {
        vm.startBroadcast();
        new GomokuV1();
        vm.stopBroadcast();
    }
}
