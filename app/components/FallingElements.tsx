'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const COLORS = ['#FFC0CB', '#FFB6C1', '#FF69B4', '#FFF0F5', '#FFE4E1'];

export default function FallingElements() {
    const [elements, setElements] = useState<any[]>([]);

    useEffect(() => {
        const newElements = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // random horizontal position
            delay: Math.random() * 5,
            duration: 5 + Math.random() * 10,
            size: 10 + Math.random() * 20,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            rotate: Math.random() * 360,
        }));
        setElements(newElements);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: -20,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 0,
            overflow: 'hidden'
        }}>
            {elements.map((el) => (
                <motion.div
                    key={el.id}
                    initial={{ y: -50, x: `${el.x}vw`, opacity: 0, rotate: el.rotate }}
                    animate={{
                        y: '110vh',
                        x: `${el.x + (Math.random() * 10 - 5)}vw`,
                        opacity: [0, 1, 1, 0],
                        rotate: el.rotate + 360,
                    }}
                    transition={{
                        duration: el.duration,
                        repeat: Infinity,
                        delay: el.delay,
                        ease: "linear",
                    }}
                    style={{
                        position: 'absolute',
                        color: el.color,
                        fontSize: el.size,
                    }}
                >
                    {Math.random() > 0.5 ? '🌸' : '💖'}
                </motion.div>
            ))}
        </div>
    );
}
