'use client';

import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { useState } from 'react';

interface ShareButtonProps {
    userName: string;
}

export default function ShareButton({ userName }: ShareButtonProps) {
    const [isSharing, setIsSharing] = useState(false);

    const handleScreenshot = async () => {
        setIsSharing(true);
        try {
            const element = document.body;
            const canvas = await html2canvas(element, {
                backgroundColor: '#FFFBFC',
                scale: 2,
            });

            canvas.toBlob((blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.download = `kok-niat-${userName}-${Date.now()}.png`;
                    link.href = url;
                    link.click();
                    URL.revokeObjectURL(url);
                }
            });
        } catch (error) {
            console.error('Screenshot failed:', error);
        } finally {
            setTimeout(() => setIsSharing(false), 1000);
        }
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScreenshot}
            disabled={isSharing}
            style={{
                background: 'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary-light) 100%)',
                border: '2px solid var(--color-primary)',
                padding: '0.75rem 1.5rem',
                borderRadius: 'var(--radius-full)',
                cursor: isSharing ? 'not-allowed' : 'pointer',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                opacity: isSharing ? 0.6 : 1,
                transition: 'all 0.3s ease',
            }}
        >
            {isSharing ? '📸 Saving...' : '📸 Save Moment'}
        </motion.button>
    );
}
