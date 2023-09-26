// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {Gomoku} from "../src/Gomoku.sol";
import {Game} from "../src/Game.sol";

contract GameTest is Test {
    Gomoku public gomoku;
    Game public game;

    address public player1 = address(0x1);
    address public player2 = address(0x2);

    function setUp() public {
        game = gomoku.games(1);
    }

    function test_Player1() public {
        assertEq(game.player1(), player1);
    }

    function test_InitTurn() public {
        assertEq(game.turn(), player1);
    }

    function test_InitState() public {
        assertEq(uint256(game.state()), 0);
    }

    function test_Player2() public {
        game.setPlayer2(player2);
        assertEq(game.player2(), player2);
        assertEq(uint256(game.state()), 1);
    }

    function test_ChangeTurn() public {
        game.setPlayer2(player2);
        assertEq(game.turn(), player1);
        game.changeTurn();
        assertEq(game.turn(), player2);
    }

    function test_Judge() public {
        game.setPlayer2(player2);
        game.placeStone(0, 0, player1);
        game.placeStone(1, 0, player2);
        game.placeStone(0, 1, player1);
        game.placeStone(1, 1, player2);
        game.placeStone(0, 2, player1);
        game.placeStone(1, 2, player2);
        game.placeStone(0, 3, player1);
        game.placeStone(1, 3, player2);
        assertEq(uint256(game.state()), 1);
        game.placeStone(0, 4, player1);
        assertEq(uint256(game.state()), 2);
    }

    function test_PlaceStone() public {
        game.setPlayer2(player2);
        game.placeStone(0, 0, player1);
        assertEq(game.board(0, 0), player1);
        assertEq(game.turn(), player2);
    }

    function test_GetBoard() public {
        game.setPlayer2(player2);
        game.placeStone(0, 0, player1);
        assertEq(game.turn(), player2);
        assert(game.getBoard()[0][0] == player1);
        game.placeStone(1, 1, player2);
        assert(game.turn() == player1);
        assert(game.getBoard()[1][1] == player2);
    }
}
