'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface JourneyRecapProps {
    userName: string;
    answers: Record<number, string>;
    onClose: () => void;
}

const recapComments: Record<number, Record<string, string>> = {
    1: {
        'Kopi ☕': 'Ternyata kamu suka kopi ya! Berarti kita bisa ngopi bareng nih 😊☕',
        'Teh 🍵': 'Tim teh! Kalem dan menenangkan, sama kayak vibes kamu 🍃',
    },
    2: {
        'Hujan 🌧️': 'Suka hujan? Romantis banget! Cocok nih dengerin hujan sambil ngobrol 🌧️💭',
        'Matahari ☀️': 'Cerah kayak matahari! Pasti bikin hari orang lain jadi lebih baik ☀️✨',
    },
    3: {
        'Tidur 😴': 'Istirahat itu penting! Semoga tidurmu selalu nyenyak ya 😴💤',
        'Nonton 📺': 'Nonton apa biasanya? Kapan-kapan bisa rekomendasi film nih 📺🍿',
        'Dengerin musik 🎵': 'Music lover! Pasti punya playlist yang bagus ya 🎵🎧',
    },
};

export default function JourneyRecap({ userName, answers, onClose }: JourneyRecapProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '1rem',
            }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="card"
                style={{
                    maxWidth: '500px',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📖</div>
                    <h2 style={{ fontFamily: "serif", fontStyle: "italic" }}>Jurnal Memori {userName}... 💖</h2>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
                        Setiap jawabanmu adalah sepenggal cerita yang indah...
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {Object.entries(answers).map(([questionId, answer]) => {
                        const qId = parseInt(questionId);
                        if (qId === 99) return null; // Skip absurd question

                        const comment = recapComments[qId]?.[answer] || 'Pilihan yang menarik, seperti kamu... 😊';

                        return (
                            <motion.div
                                key={questionId}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: parseInt(questionId) * 0.2 }}
                                style={{
                                    padding: '1rem',
                                    background: 'var(--color-secondary)',
                                    borderRadius: 'var(--radius-md)',
                                    borderLeft: '4px solid var(--color-primary)',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                                }}
                            >
                                <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-accent)', fontFamily: "serif" }}>
                                    {answer}
                                </div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                                    "{comment}"
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    style={{
                        marginTop: '2rem',
                        padding: '1rem',
                        background: 'linear-gradient(135deg, #FFF0F5 0%, #E6E6FA 100%)',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'center',
                    }}
                >
                    <p style={{ fontWeight: 500, color: 'var(--color-accent)' }}>
                        Terima kasih sudah berbagi duniamu sama aku, {userName}. 💕
                    </p>
                </motion.div>


                <button
                    className="btn btn-primary mt-3"
                    onClick={onClose}
                    style={{ width: '100%' }}
                >
                    Tutup 💖
                </button>
            </motion.div>
        </motion.div>
    );
}
