// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract GameV2 {
    uint256 public id; //初期化時に設定
    // gameの状態
    enum State {
        None,
        Opening,
        Playing,
        Finished
    }
    State public state;
    // 19*19のboardにUserを格納する 0-18
    address[19][19] public board;
    // 現在の手番
    address public turn;
    // player1 gameOwner
    address public player1;
    // player2
    address public player2;

    // 初期化でGame作成者をplayer1にする&turnをplayer1にする&stateをNoneにする
    constructor(uint256 _id, address _player1) {
        id = _id;
        player1 = _player1;
        turn = player1;
        state = State.None;
    }

    // player1だけがnoneからopeningにできる
    function openGame() public {
        // player1であることを確認
        require(msg.sender == player1, "Not player1");
        // stateがNoneであることを確認
        require(state == State.None, "Game is not None");
        state = State.Opening;
    }

    // player2を設定する&stateをPlayingにする
    function setPlayer2(address _player2) public {
        // stateがOpeningであることを確認
        require(state == State.Opening, "Game is not Opening");
        // player2が設定されていないことを確認
        require(player2 == address(0), "Player2 is already set");
        // player1は設定できないことを確認
        require(_player2 != player1, "Player1 cannot be Player2");
        player2 = _player2;
        state = State.Playing;
    }

    // boardに碁石を置く
    function placeStone(uint8 _x, uint8 _y, address _player) public {
        // play中じゃ無ければrevert
        require(state == State.Playing, "Game is not playing");
        // 自分のturnじゃ無ければrevert
        require(turn == _player, "Not your turn");
        // 座標が碁盤の範囲内じゃ無ければrevert
        require(_x < 19 && _y < 19, "Invalid coordinates");
        // 既に石が置かれていたらrevert
        require(board[_x][_y] == address(0), "Cell is already occupied");
        // 指定のboardにaddressを格納
        board[_x][_y] = _player;
        // judgeで勝敗が決まっているか確認
        if (judge(_player)) {
            // 勝敗が決まっていたらstateをFinishedにする
            state = State.Finished;
        } else {
            // 勝敗が決まっていなかったらturnを切り替える
            if (turn == player1) {
                turn = player2;
            } else {
                turn = player1;
            }
        }
    }

    // 19*19の碁盤内で5つ連続で石が置かれているかを確認する
    function judge(address player) internal view returns (bool) {
        for (uint8 x = 0; x < 19; x++) {
            for (uint8 y = 0; y < 19; y++) {
                if (board[x][y] == player) {
                    if (
                        checkDirection(x, y, 1, 0, player) || // 右横
                        checkDirection(x, y, 0, 1, player) || // 下縦
                        checkDirection(x, y, 1, 1, player) || // 右斜下 \
                        checkDirection(x, y, 1, -1, player) // 右斜上 /
                    ) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    // 自分の石が5つ連続で置かれているかを確認する
    function checkDirection(
        uint8 x,
        uint8 y,
        int8 dx,
        int8 dy,
        address player
    ) internal view returns (bool) {
        uint8 count = 1; // 1つ目の自分の石をカウント
        for (int8 step = 1; step <= 4; step++) {
            int8 nx = int8(x) + step * dx;
            int8 ny = int8(y) + step * dy;
            if (
                nx < 0 ||
                nx > 18 ||
                ny < 0 ||
                ny > 18 ||
                board[uint8(nx)][uint8(ny)] != player
            ) {
                break;
            }
            count++;
        }
        return count == 5;
    }

    // 盤に全て石が置かれているか確認する
    function isBoardFull() public view returns (bool) {
        for (uint8 x = 0; x < 19; x++) {
            for (uint8 y = 0; y < 19; y++) {
                if (board[x][y] == address(0)) {
                    return false;
                }
            }
        }
        return true;
    }

    // boardを返す
    function getBoard() public view returns (address[19][19] memory) {
        return board;
    }
}
