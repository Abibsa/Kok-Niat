'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface EasterEggProps {
    userName: string;
}

export default function EasterEgg({ userName }: EasterEggProps) {
    const [found, setFound] = useState(false);
    const [showSecret, setShowSecret] = useState(false);

    const handleEasterEggClick = () => {
        if (!found) {
            setFound(true);
            setShowSecret(true);
            setTimeout(() => setShowSecret(false), 5000);
        }
    };

    return (
        <>
            {/* Hidden clickable emoji */}
            <motion.div
                onClick={handleEasterEggClick}
                style={{
                    position: 'fixed',
                    bottom: '1rem',
                    left: '1rem',
                    fontSize: '2rem',
                    cursor: 'pointer',
                    opacity: found ? 0.3 : 0.1,
                    zIndex: 50,
                }}
                whileHover={{ opacity: 0.8, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                title="Psst... ada yang tersembunyi 👀"
            >
                ✨
            </motion.div>

            {/* Secret message */}
            <AnimatePresence>
                {showSecret && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        style={{
                            position: 'fixed',
                            bottom: '5rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%)',
                            color: 'white',
                            padding: '1.5rem 2rem',
                            borderRadius: 'var(--radius-lg)',
                            boxShadow: '0 8px 32px rgba(255, 105, 180, 0.4)',
                            zIndex: 1001,
                            maxWidth: '90%',
                            textAlign: 'center',
                        }}
                    >
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎁</div>
                        <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                            Selamat! Kamu nemu Easter Egg! 🎉
                        </div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                            {userName}, kamu perhatian banget sampai nemu ini 💕
                        </div>
                        <div style={{ fontSize: '0.85rem', marginTop: '0.5rem', fontStyle: 'italic' }}>
                            "Orang yang perhatian selalu menemukan hal-hal kecil yang indah" ✨
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
