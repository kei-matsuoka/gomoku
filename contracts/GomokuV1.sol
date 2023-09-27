// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "../src/Game.sol";

contract GomokuV1 is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    // GameProxyAddressのidを保持する
    uint256 public gameId;
    // GameProxyAddress一覧を保持する
    mapping(uint256 => address) public games;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers(); // initialize関数が1回しか呼ばれないようにする
    }

    // Proxyコントラクトからこのinitialize関数を呼び出して初期化する
    function initialize() public initializer {
        __Ownable_init(); // deployerをownerに設定する
        __UUPSUpgradeable_init(); // upgrade可能になる
    }

    // ownerのみがimplementationをupgradeできるようにする
    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    // gameを作成する
    function createGame() public {
        address gameAddress = address(new Game(gameId, msg.sender));
        games[gameId] = gameAddress;
        gameId++;
    }
}
