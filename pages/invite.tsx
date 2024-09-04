'use client';
import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import { RiTwitterLine } from 'react-icons/ri';
import { useRouter } from 'next/router';
import styles from '../styles/Invite.module.css'; 

const InvitePage: React.FC = () => {
    const [timer, setTimer] = useState<number | null>(null);
    const [invitedViaSocial, setInvitedViaSocial] = useState(false);
    const router = useRouter();

    useEffect(() => {
        let countdown: NodeJS.Timeout;
        if (timer !== null) {
            countdown = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer && prevTimer > 0) {
                        return prevTimer - 1;
                    } else {
                        clearInterval(countdown);
                        return 0;
                    }
                });
            }, 1000);
        }
        return () => clearInterval(countdown);
    }, [timer]);

    useEffect(() => {
        if (timer === 0) {
            router.push('/home'); // Redirigir a la página de inicio después de que el temporizador termine
        }
    }, [timer, router]);

    const shareText = `¡Únete a mí como miembro de PWR2TP y sé parte del futuro! Conéctate con otros entusiastas y disfruta de beneficios exclusivos.`;

    const handleSocialShare = (platform: string) => {
        setInvitedViaSocial(true); // Marcar como invitado a través de redes sociales
        setTimer(15); // Iniciar temporizador de 15 segundos para compartir en redes sociales
        const url = encodeURIComponent('https://pwr2tp.com'); // Reemplazar con tu URL real

        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(shareText)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/share?url=${url}&text=${encodeURIComponent(shareText)}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${encodeURIComponent(shareText)}`, '_blank');
                break;
            case 'whatsapp':
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
                break;
            case 'telegram':
                window.open(`https://telegram.me/share/url?url=${url}&text=${encodeURIComponent(shareText)}`, '_blank');
                break;
            default:
                break;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Vuelvete Miembro de PWR2TP</h2>
                <p className={styles.description}>
                    Comparte con otros para unirte al futuro y obtén tokens y beneficios adicionales
                </p>
                <div className={styles.icons}>
                    <button onClick={() => handleSocialShare('facebook')} className={styles.iconButton}>
                        <FaFacebookF className={styles.icon} />
                    </button>
                    <button onClick={() => handleSocialShare('twitter')} className={styles.iconButton}>
                        <RiTwitterLine className={styles.icon} />
                    </button>
                    <button onClick={() => handleSocialShare('linkedin')} className={styles.iconButton}>
                        <FaLinkedinIn className={styles.icon} />
                    </button>
                    <button onClick={() => handleSocialShare('whatsapp')} className={styles.iconButton}>
                        <FaWhatsapp className={styles.icon} />
                    </button>
                    <button onClick={() => handleSocialShare('telegram')} className={styles.iconButton}>
                        <FaTelegramPlane className={styles.icon} />
                    </button>
                </div>
                {invitedViaSocial && timer !== null && (
                    <p className={styles.timerText}>Redirigiendo en {timer} segundos...</p>
                )}
            </div>
        </div>
    );
};

export default InvitePage;
