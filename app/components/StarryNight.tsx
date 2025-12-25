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
            className="fixed inset-0 bg-gray-900 cursor-pointer overflow-hidden z-50 flex items-center justify-center"
            style={{ touchAction: 'none' }}
        >
            <div className="absolute top-10 text-white text-center opacity-70 pointer-events-none">
                <h2>Ketuk langit untuk harapan... 🌌</h2>
                <p className="text-sm">(Ketuk 5 kali ya)</p>
            </div>

            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute flex flex-col items-center pointer-events-none"
                    style={{ left: star.x, top: star.y, transform: 'translate(-50%, -50%)' }}
                >
                    <span style={{ fontSize: '2rem', filter: 'drop-shadow(0 0 10px gold)' }}>🌟</span>
                    <span className="text-white text-xs mt-1 font-bold shadow-black drop-shadow-md whitespace-nowrap">
                        {star.text}
                    </span>
                </motion.div>
            ))}

            <motion.div
                className="absolute bottom-10 w-full text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: stars.length >= 5 ? 1 : 0 }}
            >
                <button
                    onClick={(e) => { e.stopPropagation(); onComplete(); }}
                    className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform"
                >
                    Lanjut ✨
                </button>
            </motion.div>
        </div>
    );
}
