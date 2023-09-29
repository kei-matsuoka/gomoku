'use client'

import { useState } from 'react';
import { ethers } from 'ethers';
import game from '../../../../artifacts/contracts/GameV2.sol/GameV2.json';

export default function Game() {
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState();
  const [gameContract, setGameContract] = useState();
  const [player1, setPlayer1] = useState();
  const [player2, setPlayer2] = useState();
  const [gameStatus, setGameStatus] = useState();
  const [turn, setTurn] = useState();
  const [board, setBoard] = useState();
  const [gameAddress, setGameAddress] = useState('');

  const gameAbi = game.abi;

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const gameContract = new ethers.Contract(gameAddress, gameAbi, signer);
        setGameContract(gameContract);
        setSigner(signer);
        const address = await signer.getAddress();
        setAddress(address);
      } catch (err) {
        console.error("User rejected the connection request");
      }
    } else {
      console.error("Ethereum provider is not available");
    }
  }

  const getGameContract = async () => {
    const gameContract = new ethers.Contract(gameAddress, gameAbi, signer);
    setPlayer1(await gameContract.player1());
    setPlayer2(await gameContract.player2());
    setGameStatus(await gameContract.state());
    setTurn(await gameContract.turn());
    setBoard(await gameContract.getBoard());
  }

  const placeStone = async (x, y) => {
    const gameContract = new ethers.Contract(gameAddress, gameAbi, signer);
    const tx = await gameContract.placeStone(x, y, address);
    await tx.wait();
    await getGameContract();
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
      <div className='mt-4 ml-4'>
        <label className='text-xl'>ウォレットのアドレス</label>
        <p className='ml-4'>{address}</p>
      </div>
      {/* ゲームのアドレスを入力してボタンを押すとgameContractを取得できるフォーム */}
      <div className='mt-4 ml-4'>
        <label className='text-xl'>ゲームのアドレスを入力してください</label>
        <input
          className='border border-gray-500 rounded ml-4'
          type='text'
          placeholder='0'
          onChange={(e) => setGameAddress(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded ml-4"
          onClick={() => getGameContract()}
        >
          ゲームの情報を取得
        </button>
      </div>
      {/* ゲームの情報を表示する */}
      <div className='mt-4 ml-4'>
        <label className='text-xl'>プレイヤー1</label>
        <p className='ml-4'>{player1}</p>
      </div>
      <div className='mt-4 ml-4'>
        <label className='text-xl'>プレイヤー2</label>
        <p className='ml-4'>{player2}</p>
      </div>
      <div className='mt-4 ml-4'>
        <label className='text-xl'>ゲームの状況</label>
        {/* 2なら対戦中,3なら終了,それ以外はnull */}
        <p className='ml-4'>{gameStatus === 2 && "対戦中"}</p>
        <p className='ml-4'>{gameStatus === 3 && "終了"}</p>
      </div>
      <div className='mt-4 ml-4'>
        <label className='text-xl'>手番</label>
        <p className='ml-4'>{turn}</p>
      </div>
      <div className='mt-4 ml-4'>
        <label className='text-xl'>盤面</label>
        {/* 19*19の配列をboardとして展開し、それぞれはボタンとしてx,yを引数とした関数を実行できる */}
        {board && board.map((row, x) => {
          return (
            <div className='flex bg-yellow-600 w-fit'>
              {row.map((cell, y) => {
                return (
                  <button
                    className='border border-black h-8 w-8'
                    onClick={() => placeStone(x, y)}
                  >
                    {/* cellがplayer1なら"⚫️",player2なら"⚪️",0x000...ならnull */}
                    {cell === player1 && "⚫️"}
                    {cell === player2 && "⚪️"}
                  </button>
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  );
}
