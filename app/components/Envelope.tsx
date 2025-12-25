'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface EnvelopeProps {
    onOpen: () => void;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
        // Sound play if global function exists
        if (typeof window !== 'undefined' && (window as any).playSuccessSound) {
            (window as any).playSuccessSound();
        }
        setTimeout(() => {
            onOpen();
        }, 1500);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            gap: '2rem'
        }}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                onClick={handleOpen}
                style={{
                    width: '300px',
                    height: '200px',
                    background: '#FFFFFF',
                    borderRadius: '10px',
                    position: 'relative',
                    cursor: 'pointer',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    perspective: '1000px',
                }}
            >
                {/* Envelope Body */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                    background: '#FFE4E9',
                    borderRadius: '10px',
                    zIndex: 1,
                    clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 50%)',
                }} />

                {/* Envelope Flap */}
                <motion.div
                    animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 2 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        width: '100%',
                        height: '100%',
                        background: '#FFB6C1',
                        borderRadius: '10px 10px 0 0',
                        clipPath: 'polygon(0 0, 50% 50%, 100% 0)',
                        transformOrigin: 'top',
                    }}
                />

                {/* Heart Seal */}
                {!isOpen && (
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        style={{
                            position: 'absolute',
                            top: '40%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: '2.5rem',
                            zIndex: 3,
                        }}
                    >
                        💌
                    </motion.div>
                )}

                {/* The Letter inside */}
                <motion.div
                    animate={isOpen ? { y: -100, opacity: 1 } : { y: 0, opacity: 0 }}
                    style={{
                        position: 'absolute',
                        top: '10%',
                        left: '10%',
                        width: '80%',
                        height: '80%',
                        background: 'white',
                        borderRadius: '5px',
                        zIndex: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        textAlign: 'center',
                        padding: '1rem',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                        fontFamily: "'Dancing Script', cursive",
                        color: '#D63384'
                    }}
                >
                    Pesan Rahasia... 💖
                </motion.div>
            </motion.div>

            {!isOpen && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{
                        color: 'var(--color-accent)',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 500,
                        fontSize: '1.1rem',
                        letterSpacing: '0.05em'
                    }}
                >
                    Sebuah pesan tulus untuk seseorang yang spesial... 💌
                </motion.p>
            )}

        </div>
    );
}
