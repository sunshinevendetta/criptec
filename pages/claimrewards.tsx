import React, { useState } from 'react';
import { useAddress, useContract, Web3Button, useTokenBalance } from '@thirdweb-dev/react';
import customStyles from "../styles/CustomCard.module.css";
import { TOKEN_CONTRACT_ADDRESS } from "../consts/addresses";
import { useRouter } from 'next/router';

export default function ClaimRewards() {
  const address = useAddress();
  const { contract: tokenContract } = useContract(TOKEN_CONTRACT_ADDRESS);
  const { data: tokenBalance, isLoading: isBalanceLoading } = useTokenBalance(tokenContract, address); // Get the token balance
  const [claimed, setClaimed] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const router = useRouter();

  const handleClaimSuccess = (hash: string) => {
    setClaimed(true);
    setTransactionHash(hash);
    setSuccessMessage("¡Recompensas reclamadas con éxito! Has recibido 50 tokens.");
  };

  const handleInviteClick = () => {
    router.push('/invite');
  };

  const handleOrderAgainClick = () => {
    router.push('/order');
  };

  const handleViewTransaction = () => {
    if (transactionHash) {
      const blockscoutUrl = `https://base-sepolia.blockscout.com/tx/${transactionHash}`;
      window.open(blockscoutUrl, '_blank');
    }
  };

  return (
    <div className={customStyles.customContainer}>
      <h1>Reclama Tus Recompensas</h1>

      {/* Display token balance */}
      <div className={customStyles.balanceContainer}>
        <h3>Tu balance de tokens:</h3>
        {isBalanceLoading ? (
          <p>Cargando...</p>
        ) : (
          <p>{tokenBalance?.displayValue} Tokens</p>
        )}
      </div>
      
      <div className={customStyles.buttonContainer}>
        <Web3Button
          contractAddress={TOKEN_CONTRACT_ADDRESS}
          action={async (contract) => {
            if (address) {
              const tx = await contract.erc20.transfer(address, 50);
              return tx.receipt.transactionHash;
            } else {
              throw new Error("La dirección no está disponible");
            }
          }}
          onSuccess={(hash) => handleClaimSuccess(hash)}
          onError={(error) => console.error("Error al reclamar las recompensas:", error.message)}
          className={`${customStyles.claimButton} ${claimed && customStyles.disabledButton}`}
          isDisabled={claimed}
        >
          {claimed ? "Ya has reclamado 50 tokens de recompensa" : "Reclama 50 tokens de recompensa"}
        </Web3Button>
      </div>

      {successMessage && <p className={customStyles.successMessage}>{successMessage}</p>}

      {transactionHash && (
        <div className={customStyles.transactionLink}>
          <button onClick={handleViewTransaction} className={customStyles.viewButton}>
            Ver transacción en Blockscout
          </button>
        </div>
      )}

      {claimed && (
        <div className={customStyles.additionalActions}>
          <button className={customStyles.orderButton} onClick={handleOrderAgainClick}>
            Pedir Otra Vez
          </button>
          <button className={customStyles.inviteButton} onClick={handleInviteClick}>
            Invitar Amigos para Obtener Más Recompensas
          </button>
        </div>
      )}
    </div>
  );
}
