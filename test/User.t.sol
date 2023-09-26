// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.13;

// import {Test, console2} from "forge-std/Test.sol";
// import {Gomoku} from "../src/Gomoku.sol";
// import {User} from "../src/User.sol";

// contract UserTest is Test {
//     Gomoku public gomoku;
//     User public user;

//     function setUp() public {
//         gomoku = new Gomoku();
//         gomoku.createUser("Kei");
//         user = gomoku.users(address(0x1));
//     }

//     function test_Name() public {
//         assertEq(user.name(), "Kei");
//     }

//     function test_IncrementFightCount() public {
//         console2.log("fightCount", user.fightCount());
//         user.incrementFightCount();
//         assertEq(user.fightCount(), 1);
//     }

//     function test_IncrementWinCount() public {
//         user.incrementWinCount();
//         assertEq(user.winCount(), 1);
//     }

//     function test_IncrementLossCount() public {
//         user.incrementLossCount();
//         assertEq(user.lossCount(), 1);
//     }
// }
