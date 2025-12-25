'use client';

import { motion } from 'framer-motion';

interface ThemeToggleProps {
    theme: 'pink' | 'purple' | 'blue';
    onThemeChange: (theme: 'pink' | 'purple' | 'blue') => void;
}

const themes = {
    pink: {
        name: '💖 Pink',
        colors: {
            primary: '#FFB6C1',
            secondary: '#FFE4E9',
            accent: '#FF69B4',
        }
    },
    purple: {
        name: '💜 Purple',
        colors: {
            primary: '#DDA0DD',
            secondary: '#F3E5F5',
            accent: '#BA55D3',
        }
    },
    blue: {
        name: '💙 Blue',
        colors: {
            primary: '#B0E0E6',
            secondary: '#E0F7FA',
            accent: '#4FC3F7',
        }
    }
};

export default function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                position: 'fixed',
                top: '1rem',
                right: '1rem',
                display: 'flex',
                gap: '0.5rem',
                zIndex: 100,
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '0.5rem',
                borderRadius: '2rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
        >
            {(Object.keys(themes) as Array<keyof typeof themes>).map((t) => (
                <motion.button
                    key={t}
                    onClick={() => onThemeChange(t)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '50%',
                        border: theme === t ? '3px solid #333' : '2px solid transparent',
                        background: themes[t].colors.primary,
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                    }}
                    title={themes[t].name}
                >
                    {t === 'pink' && '💖'}
                    {t === 'purple' && '💜'}
                    {t === 'blue' && '💙'}
                </motion.button>
            ))}
        </motion.div>
    );
}

export { themes };
