'use client'

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export default function Home() {
  const [address, setAddress] = useState('');

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setAddress(address);
        } catch (err) {
          console.error("User rejected the connection request");
        }
      } else {
        console.error("Ethereum provider is not available");
      }
    };

    connectWallet();
  }, []);

  return (
    <div>
      <h1>Next.js with Ethers.js</h1>
      {address ? <p>Connected: {address}</p> : <p>Not connected</p>}
      
    </div>
  );
}
