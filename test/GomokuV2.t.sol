// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {GomokuV2} from "../src/GomokuV2.sol";

contract GomokuV2Test is Test {
    GomokuV2 public gomoku;

    function setUp() public {
        gomoku = new GomokuV2();
    }

    function test_createGame() public {
        gomoku.createGame();
        assertEq(gomoku.gameId(), 1);
    }
}
