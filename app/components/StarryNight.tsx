'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

interface StarryNightProps {
    onComplete: () => void;
}

const wishes = [
    "Bahagia Selalu ✨", "Sehat Terus 🌿", "Rezeki Lancar 💰",
    "Mimpi Tercapai 🚀", "Tetap Kuat 💪", "Selalu Disayang 💖",
    "Tidur Nyenyak 😴", "Hari Menyenangkan ☀️", "Banyak Senyum 😊"
];

interface Star {
    id: number;
    x: number;
    y: number;
    text: string;
}

export default function StarryNight({ onComplete }: StarryNightProps) {
    const [stars, setStars] = useState<Star[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const addStar = (e: React.MouseEvent | React.TouchEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        let clientX, clientY;

        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const newStar: Star = {
            id: Date.now(),
            x,
            y,
            text: wishes[Math.floor(Math.random() * wishes.length)]
        };

        setStars([...stars, newStar]);

        if (stars.length + 1 >= 5) {
            setTimeout(onComplete, 3000);
        }
    };

    return (
        <div
            ref={containerRef}
            onClick={addStar}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'radial-gradient(circle at center, #2E1065 0%, #000000 100%)', // Deep Purple Galaxy
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                overflow: 'hidden',
                touchAction: 'none',
                fontFamily: "'Times New Roman', serif"
            }}

        >
            <div style={{
                position: 'absolute',
                top: '2.5rem',
                left: 0,
                right: 0,
                textAlign: 'center',
                color: 'white',
                opacity: 0.7,
                pointerEvents: 'none'
            }}>
                <h2>Ketuk langit untuk harapan... 🌌</h2>
                <p style={{ fontSize: '0.875rem' }}>(Ketuk 5 kali ya)</p>
            </div>

            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{
                        position: 'absolute',
                        left: star.x,
                        top: star.y,
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        pointerEvents: 'none'
                    }}
                >
                    <span style={{ fontSize: '2rem', filter: 'drop-shadow(0 0 10px gold)' }}>🌟</span>
                    <span style={{
                        color: 'white',
                        fontSize: '0.75rem',
                        marginTop: '0.25rem',
                        fontWeight: 'bold',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                        whiteSpace: 'nowrap'
                    }}>
                        {star.text}
                    </span>
                </motion.div>
            ))}

            <motion.div
                style={{
                    position: 'absolute',
                    bottom: '2.5rem',
                    width: '100%',
                    textAlign: 'center',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: stars.length >= 5 ? 1 : 0 }}
            >
                <button
                    onClick={(e) => { e.stopPropagation(); onComplete(); }}
                    style={{
                        backgroundColor: 'white',
                        color: '#111827',
                        padding: '0.5rem 1.5rem',
                        borderRadius: '9999px',
                        fontWeight: 'bold',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                >
                    Lanjut ✨
                </button>
            </motion.div>
        </div>

    );
}
