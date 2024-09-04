import React, { useState } from 'react';
import { Web3Button, useAddress, useContract, useTokenBalance } from '@thirdweb-dev/react';
import Image from 'next/image';
import styles from "../styles/CustomCard.module.css"; 

const TOKEN_CONTRACT_ADDRESS = '0x527929B3b3884d872D228909965f27B20525b1b3';

const ClaimToken = () => {
  const address = useAddress();
  const { contract } = useContract(TOKEN_CONTRACT_ADDRESS);
  const { data: tokenBalance } = useTokenBalance(contract, address);
  const [successMessage, setSuccessMessage] = useState("");
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const handleClaimSuccess = (hash: string) => {
    setSuccessMessage("¡Tokens reclamados exitosamente! Invita a más amigos para ganar más tokens.");
    setTransactionHash(hash);
  };

  const handleViewTransaction = () => {
    if (transactionHash) {
      const blockscoutUrl = `https://base-sepolia.blockscout.com/tx/${transactionHash}`;
      window.open(blockscoutUrl, '_blank');
    }
  };

  return (
    <div className={styles.customContainer}>
      <div className={styles.glassCard}>
        <div className={styles.nftMediaContainer1}>
          <Image src="/token.png" alt="Imagen del Token" layout="responsive" width={500} height={500} className={styles.nftImage} />
        </div>
        <h2>Balance de Tokens:</h2>
        <p>{tokenBalance?.displayValue}</p>
        <Web3Button
          contractAddress={TOKEN_CONTRACT_ADDRESS}
          action={async (contract) => {
            const tx = await contract.erc20.claim(1000);
            return tx.receipt.transactionHash;
          }}
          onSuccess={(hash) => handleClaimSuccess(hash)}
        >
          Obtener Tokens Gratis
        </Web3Button>

        {successMessage && <p>{successMessage}</p>}

        {transactionHash && (
          <div className={styles.transactionLink}>
            <button onClick={handleViewTransaction} className={styles.viewButton}>
              Ver Transacción en Blockscout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimToken;
