'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface MoodBoosterProps {
    onComplete: () => void;
}

const activities = ["Makan Enak 🍜", "Nonton Film 🎬", "Jalan-Jalan 🚶", "Denger Lagu 🎵", "Tidur Nyenyak 😴", "Beli Jajan 🍫"];
const words = ["Kamu Hebat! 💪", "Semangat Terus! 🔥", "Jangan Nyerah! 🌈", "Pasti Bisa! 🚀", "Proud of You! 🌟", "Keep Smiling! 😊"];
const promises = ["Aku Traktir 💸", "Aku Temenin 🤝", "Aku Dengerin 👂", "Aku Support 🛡️", "Aku Hibur 🤡", "Aku Ada 🤗"];

export default function MoodBooster({ onComplete }: MoodBoosterProps) {
    const [spinning, setSpinning] = useState(false);
    const [result, setResult] = useState<string[] | null>(null);

    const spin = () => {
        if (spinning) return;
        setSpinning(true);
        setResult(null);

        // Play spin visualization
        setTimeout(() => {
            const res1 = activities[Math.floor(Math.random() * activities.length)];
            const res2 = words[Math.floor(Math.random() * words.length)];
            const res3 = promises[Math.floor(Math.random() * promises.length)];

            setResult([res1, res2, res3]);
            setSpinning(false);
        }, 2000);
    };

    return (
        <div className="text-center">
            <h2 className="mb-4">🎰 Mood Booster 🎰</h2>
            <p className="mb-4 text-sm text-gray-500">Lagi butuh apa hari ini? Coba putar deh!</p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        style={{
                            width: 'clamp(4.5rem, 28vw, 6.5rem)',
                            height: 'clamp(4.5rem, 28vw, 6.5rem)',
                            background: 'rgba(255, 255, 255, 0.65)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '16px',
                            border: '2px solid rgba(255, 182, 193, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            fontSize: 'clamp(0.7rem, 2.5vw, 0.9rem)',
                            lineHeight: '1.2',
                            fontWeight: 'bold',
                            boxShadow: '0 8px 16px rgba(255, 105, 180, 0.15)',
                            position: 'relative',
                            overflow: 'hidden',
                            padding: '0.25rem'
                        }}
                        animate={spinning ? {
                            y: [0, -5, 0],
                            borderColor: ['#FFB6C1', '#FF69B4', '#FFB6C1']
                        } : {}}
                        transition={{ repeat: spinning ? Infinity : 0, duration: 0.2, delay: i * 0.1 }}
                    >
                        {result ? result[i] : spinning ? "..." : "❓"}
                    </motion.div>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                <button
                    onClick={spin}
                    disabled={spinning}
                    className="btn"
                    style={{
                        position: 'relative',
                        zIndex: 10,
                        width: '100%',
                        background: 'linear-gradient(135deg, #FF69B4 0%, #FFB6C1 100%)',
                        color: 'white',
                        boxShadow: '0 4px 15px rgba(255, 105, 180, 0.4)',
                        border: 'none',
                        padding: '1rem',
                        borderRadius: '999px',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                >
                    {spinning ? "Sedang Mengacak... 🎲" : result ? "Putar Lagi 🔄" : "Putar Keberuntungan! ✨"}
                </button>

                {result && (
                    <button
                        onClick={() => { console.log("Lanjut ke Starry Night"); onComplete(); }}
                        className="btn btn-secondary w-full"
                        style={{ position: 'relative', zIndex: 10 }}
                    >
                        Lanjut ✨
                    </button>
                )}
            </div>
        </div>
    );
}
