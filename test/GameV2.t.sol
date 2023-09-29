// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {GomokuV2} from "../src/GomokuV2.sol";
import {GameV2} from "../src/GameV2.sol";

contract GameV2Test is Test {
    GameV2 public game;

    address public player1 = address(0x1);
    address public player2 = address(0x2);

    function setUp() public {
        game = new GameV2(0, player1);
    }

    function test_Init() public {
        assertEq(game.player1(), player1);
        assertEq(game.turn(), player1);
        assertEq(uint256(game.state()), 0);
    }

    function test_OpenGame() public {
        vm.prank(player2);
        vm.expectRevert("Not player1");
        game.openGame();

        vm.prank(player1);
        game.openGame();
        assertEq(uint256(game.state()), 1);
    }

    function test_SetPlayer2() public {
        vm.prank(player1);
        game.openGame();
        game.setPlayer2(player2);
        assertEq(game.player2(), player2);
        assertEq(game.turn(), player1);
        assertEq(uint256(game.state()), 2);
    }

    function test_PlaceStone() public {
        vm.prank(player1);
        game.openGame();
        game.setPlayer2(player2);
        game.placeStone(0, 0, player1);
        assertEq(game.board(0, 0), player1);
        assertEq(game.turn(), player2);
        game.placeStone(1, 0, player2);
        game.placeStone(0, 1, player1);
        game.placeStone(1, 1, player2);
        game.placeStone(0, 2, player1);
        game.placeStone(1, 2, player2);
        game.placeStone(0, 3, player1);
        game.placeStone(1, 3, player2);
        assertEq(uint256(game.state()), 2);
        game.placeStone(0, 4, player1);
        assertEq(uint256(game.state()), 3);
    }

    function test_GetBoard() public {
        vm.prank(player1);
        game.openGame();
        game.setPlayer2(player2);
        game.placeStone(0, 0, player1);
        assertEq(game.turn(), player2);
        assert(game.getBoard()[0][0] == player1);
        game.placeStone(1, 1, player2);
        assert(game.turn() == player1);
        assert(game.getBoard()[1][1] == player2);
    }
}
