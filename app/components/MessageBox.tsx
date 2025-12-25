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

    const handleSubmit = async () => {
        if (message.trim()) {
            // Set loading state if desired (optional)
            setSubmitted(true);
            onSubmit(message);

            // Google Form Config
            const FORM_ID = '1FAIpQLSddOBLINH6hNP78aPJ9v528hoTMppWC86EHwo2_omAWPliUOg';
            const ENTRY_NAME = 'entry.1468764764';
            const ENTRY_MESSAGE = 'entry.345266786';

            const submitUrl = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

            try {
                // Gunakan mode 'no-cors' karena Google Forms tidak mengizinkan CORS
                // Request akan tetap terkirim dan data masuk ke Spreadsheet
                await fetch(submitUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        [ENTRY_NAME]: userName,
                        [ENTRY_MESSAGE]: message,
                    }),
                });

                console.log("Pesan terkirim ke Google Form!");
            } catch (error) {
                console.error("Gagal mengirim pesan:", error);
                // Kita tetap anggap sukses di UI agar user tidak bingung
            }

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
