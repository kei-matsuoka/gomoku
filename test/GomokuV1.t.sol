// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {GomokuV1} from "../src/GomokuV1.sol";

contract GomokuV1Test is Test {
    GomokuV1 public gomoku;

    function setUp() public {
        gomoku = new GomokuV1();
    }

    function test_createGame() public {
        gomoku.createGame();
        assertEq(gomoku.gameId(), 1);
    }
}
