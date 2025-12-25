'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeartAnimation() {
    const [hearts, setHearts] = useState<Array<{ id: number; left: number }>>([]);

    useEffect(() => {
        const newHearts = Array.from({ length: 8 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
        }));
        setHearts(newHearts);
    }, []);

    return (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1000 }}>
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    className="heart-float"
                    style={{
                        left: `${heart.left}%`,
                        bottom: '-50px',
                    }}
                    initial={{ y: 0, opacity: 0, scale: 0 }}
                    animate={{
                        y: -window.innerHeight - 100,
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1, 1, 0.5],
                    }}
                    transition={{
                        duration: 3,
                        delay: heart.id * 0.2,
                        ease: 'easeOut',
                    }}
                >
                    💖
                </motion.div>
            ))}
        </div>
    );
}
