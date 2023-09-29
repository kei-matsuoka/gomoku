'use client'

import { useState } from 'react';
import { ethers } from 'ethers';
import gomokuV1 from '../../../artifacts/contracts/GomokuV1.sol/GomokuV1.json';
import game from '../../../artifacts/contracts/Game.sol/Game.json';

export default function Home() {
  const [signer, setSigner] = useState(null);
  const [gomokuV1Contract, setGomokuV1Contract] = useState(null);
  const [address, setAddress] = useState('');
  const [games, setGames] = useState([]);
  const [player1s, setPlayer1s] = useState([]);
  const [player2s, setPlayer2s] = useState([]);
  const [gameStatuses, setGameStatuses] = useState([]);

  const gomokuV1Abi = gomokuV1.abi;
  const gameAbi = game.abi;
  const erc1967ProxyAddress = '0x9B754E4ed74F5109E28C3B07379534e1aAE4d5B6';

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setSigner(signer);
        const gomokuV1Contract = new ethers.Contract(erc1967ProxyAddress, gomokuV1Abi, signer);
        setGomokuV1Contract(gomokuV1Contract);
        const address = await signer.getAddress();
        setAddress(address);
      } catch (err) {
        console.error("User rejected the connection request");
      }
    } else {
      console.error("Ethereum provider is not available");
    }
  }

  const createGame = async () => {
    const tx = await gomokuV1Contract.createGame();
    await tx.wait();
    console.log("tx:", tx);
    await getGames();
  }

  const getGames = async () => {
      const games = await gomokuV1Contract.getGames();
      setGames(games);
      // gamesの数だけgameコントラクトのインスタンスを作成し、それぞれでplayer1を取得する
      for (let i = 0; i < games.length; i++) {
        const gameContract = new ethers.Contract(games[i], gameAbi, signer);
        const player1 = await gameContract.player1();
        setPlayer1s(player1s => [...player1s, player1]);
        const player2 = await gameContract.player2();
        setPlayer2s(player2s => [...player2s, player2]);
        const gameStatus = await gameContract.state();
        setGameStatuses(gameStatuses => [...gameStatuses, gameStatus]);
      }
  }

  const openGame = async (gameAddress) => {
    const gameContract = new ethers.Contract(gameAddress, gameAbi, signer);
    const tx = await gameContract.openGame(); // msg.senderがplayer1なら募集中にする
    await tx.wait();
    console.log("tx:", tx);
    await getGames();
  }

  const joinGame = async (gameAddress) => {
    const gameContract = new ethers.Contract(gameAddress, gameAbi, signer);
    const tx = await gameContract.setPlayer2(address);
    await tx.wait();
    console.log("tx:", tx);
    await getGames();
  }

  return (
    <>
      <h1 className='text-2xl mt-4 ml-4'>五目並べ</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4 ml-4"
        onClick={connectWallet}
      >
        ウォレットに接続
      </button>

      {/* createGameボタン */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4 ml-4"
        onClick={createGame}
      >
        ゲームを作成
      </button>

      {/* getGamesボタン */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4 ml-4"
        onClick={getGames}
      >
        ゲーム一覧を取得
      </button>

      {address ? <p className='mt-4 ml-4'>接続中: {address}</p> : <p className='mt-4 ml-4'>未接続</p>}

      {/* gamesからGame一覧を表示 */}
      {games.map((game, i) => {
        return (
          <>
          {/* gamestatusが0なら非表示 */}
          {gameStatuses[i] !== 0 &&
            <div key={i} className='bg-slate-100 p-4 m-4 rounded-md'>
              <div className='text-lg'>Game: {game}</div>
              {/* gamestatusが1ならplayer募集中、2なら対戦中、3なら終了、0かつaddress一致なら公開ボタン */}
              {gameStatuses[i] === 1 && <p>status: 対戦者募集中！</p>}
              {gameStatuses[i] === 2 && <p>status: 対戦中</p>}
              {gameStatuses[i] === 3 && <p>status: 終了</p>}
              {player1s[i] ? <p>player1: {player1s[i]}</p> : <p>player1: 未定</p>}
              {/* player2が0x0000000000000000000000000000000000000000なら非表示 */}
              {player2s[i] !== '0x0000000000000000000000000000000000000000' && <p>player2: {player2s[i]}</p>}
              {/* 対戦するボタンを表示 */}
              {gameStatuses[i] === 1 && address !== player1s[i] &&
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-2"
                onClick={() => joinGame(game)}
              >
                対戦する
              </button>}
            </div>
          }
          {/* statusが0でaddressが一致するなら表示 */}
          {gameStatuses[i] === 0 && address === player1s[i] &&
            <div key={i} className='bg-slate-100 p-4 m-4 rounded-md'>
              <div className='text-lg'>Game: {game}</div>
              {player1s[i] ? <p>player1: {player1s[i]}</p> : <p>player1: 未定</p>}
              {gameStatuses[i] === 0 && address === player1s[i] && <button
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                onClick={() => openGame(game)}
              >
                公開する
              </button>}
            </div>
          }
          </>
        );
      })}
    </>
  );
}
