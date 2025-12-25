'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface MessageBoxProps {
    userName: string;
    onSubmit: (message: string) => void;
    onClose: () => void;
}

export default function MessageBox({ userName, onSubmit, onClose }: MessageBoxProps) {
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (message.trim()) {
            onSubmit(message);
            setSubmitted(true);
            setTimeout(() => {
                onClose();
            }, 3000);
        }
    };

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
                style={{ maxWidth: '500px', width: '100%' }}
            >
                {!submitted ? (
                    <>
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💌</div>
                            <h3>Mau bales pesan nggak, {userName}? 😊</h3>
                            <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                Tulis apa aja yang ada di pikiran kamu...
                            </p>
                        </div>

                        <textarea
                            className="input"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Ketik pesan kamu di sini..."
                            rows={5}
                            style={{
                                resize: 'vertical',
                                minHeight: '120px',
                                fontFamily: 'Inter, sans-serif',
                            }}
                            autoFocus
                        />

                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                            <button
                                className="btn btn-secondary"
                                onClick={onClose}
                                style={{ flex: 1 }}
                            >
                                Nanti aja
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleSubmit}
                                disabled={!message.trim()}
                                style={{ flex: 1 }}
                            >
                                Kirim 💌
                            </button>
                        </div>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ textAlign: 'center' }}
                    >
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✨</div>
                        <h3 style={{ marginBottom: '0.5rem' }}>Makasih ya, {userName}! 💖</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            Pesan kamu udah tersimpan dengan baik 😊
                        </p>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}
