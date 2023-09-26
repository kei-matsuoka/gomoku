// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import "../src/GomokuProxy.sol";

contract GomokuProxyScript is Script {
    address public logic = address(0x1);
    bytes public data = abi.encodeWithSignature("initialize()");

    function run() public {
        vm.startBroadcast();
        new GomokuProxy(logic, data);
        vm.stopBroadcast();
    }
}
