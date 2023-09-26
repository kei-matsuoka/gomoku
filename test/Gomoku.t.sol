// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {Gomoku} from "../src/Gomoku.sol";
import {Game} from "../src/Game.sol";

contract GomokuTest is Test {
    Gomoku public gomoku;
    Game public game;

    function setUp() public {
        gomoku = new Gomoku();
    }

    function test_createGame() public {
        gomoku.createGame();
        assertEq(gomoku.games(1).id(), 1);
    }
}
