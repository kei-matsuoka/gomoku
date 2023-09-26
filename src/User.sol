// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract User {
    address public id;  //初期化時に設定
    string public name; //初期化時に設定
    uint256 public fightCount; //0
    uint256 public winCount; //0
    uint256 public lossCount; //0

    constructor(address _id, string memory _name) {
        id = _id;
        name = _name;
    }

    // publicにしてはいけないので後で修正
    function incrementFightCount() public {
        fightCount++;
    }

    // publicにしてはいけないので後で修正
    function incrementWinCount() public {
        winCount++;
    }

    // publicにしてはいけないので後で修正
    function incrementLossCount() public {
        lossCount++;
    }
}
