'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import { FaHome, FaTicketAlt, FaBars, FaTimes } from 'react-icons/fa';
import { RiCoinsLine } from 'react-icons/ri'; // Icono actualizado de Tokens
import { BsCardChecklist, BsPersonPlus } from 'react-icons/bs'; // Iconos actualizados de Card y Invite
import { MdQrCodeScanner } from 'react-icons/md'; // Icono actualizado de QR Scanner
import styles from '../styles/Home.module.css';


export default function Header() {
  const address = useAddress();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image src="/logo.webp" alt="Logo de ESCOm Activity" width={128} height={24} className={styles.logoImage} />
        </Link>
        <p className={styles.siteTitle}>Criptec x PWR2TP</p>
      </div>
      <nav className={`${styles.navContainer} ${menuOpen ? styles.open : ''}`}>
        <Link href="/" className={styles.navButton}>
          <FaHome className={styles.icon} />
          Inicio
        </Link>
        <Link href="/tickets" className={styles.navButton}>
          <FaTicketAlt className={styles.icon} />
          Tickets
        </Link>
        <Link href="/claimrewards" className={styles.navButton}>
          <RiCoinsLine className={styles.icon} />
          Tokens
        </Link>
  
        <Link href="/invite" className={styles.navButton} target="_blank" rel="noopener noreferrer">
          <BsPersonPlus className={styles.icon} />
          Invitar
        </Link>
      </nav>
      <button className={styles.menuButton} onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </header>
  );
}
