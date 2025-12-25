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

            <div className="flex justify-center gap-2 mb-6">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="bg-white p-4 rounded-lg shadow-md border-2 border-pink-200 w-24 h-24 flex items-center justify-center text-center text-xs font-bold"
                        animate={spinning ? { y: [0, -10, 0] } : {}}
                        transition={{ repeat: spinning ? Infinity : 0, duration: 0.2, delay: i * 0.1 }}
                    >
                        {result ? result[i] : spinning ? "..." : "❓"}
                    </motion.div>
                ))}
            </div>

            <div className="flex flex-col gap-3">
                <button
                    onClick={spin}
                    disabled={spinning}
                    className="btn btn-primary w-full"
                >
                    {spinning ? "Memutar..." : result ? "Putar Lagi 🔄" : "Putar Sekarang! 🎲"}
                </button>

                {result && (
                    <button
                        onClick={onComplete}
                        className="btn btn-secondary w-full"
                    >
                        Lanjut ✨
                    </button>
                )}
            </div>
        </div>
    );
}
