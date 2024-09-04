'use client';
import React, { useState, useEffect } from 'react';
import {
  ConnectWallet,
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useContractMetadata,
  useNFTBalance,
} from '@thirdweb-dev/react';
import { useRouter } from 'next/router';
import { NFT_CONTRACT_ADDRESS } from '../consts/addresses';
import styles from '../styles/Home.module.css';
import { NextPage } from 'next';
import ThreeScene from '../components/3dlogo'; 

const Home: NextPage = () => {
  const address = useAddress();
  const router = useRouter();
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);

  const { contract } = useContract(NFT_CONTRACT_ADDRESS);
  const { data: contractMetadata } = useContractMetadata(contract);
  const { data: nftBalance } = useNFTBalance(contract, address, 1); 

  useEffect(() => {
    if (nftBalance && nftBalance.gt(0)) {
      setHasClaimedNFT(true);
    }
  }, [nftBalance]);

  const handleClaimSuccess = () => {
    alert('¡Felicidades! NFT reclamado. Ahora reclama tus tokens gratis.');
    router.push('/nfts');
  };

  return (
    <div className={styles.container}>
      {address ? (
        <div className={styles.nftClaim}>
          <MediaRenderer
            src={contractMetadata?.image}
            width="auto"
            height="60%"
            style={{
              borderRadius: '20px',
              marginTop: '150px',
              maxWidth: '200px',
            }}
          />
          <h1 className={styles.centeredText}>{contractMetadata?.name}</h1>
          {hasClaimedNFT ? (
            <button
              className={styles.redirectButton}
              onClick={() => router.push('/nfts')}
            >
              Obtener Tokens
            </button>
          ) : (
            <Web3Button
              contractAddress={NFT_CONTRACT_ADDRESS}
              action={(contract) => contract.erc1155.claim(1, 1)}
              onSuccess={handleClaimSuccess}
            >
              Obtener Medalla
            </Web3Button>
          )}
        </div>
      ) : (
        <div className={styles.fullScreenCenter}>
          <div className={styles.customLogoContainer}>
            <ThreeScene /> 
          </div>
          <ConnectWallet btnTitle="Iniciar Sesión" />
        </div>
      )}
    </div>
  );
};

export default Home;
