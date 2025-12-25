'use client';

import { useEffect } from 'react';

interface TypingTextProps {
    text: string;
    speed?: number;
    onComplete?: () => void;
    className?: string;
}

export default function TypingText({ text, speed = 50, onComplete, className = '' }: TypingTextProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onComplete) onComplete();
        }, text.length * speed);

        return () => clearTimeout(timer);
    }, [text, speed, onComplete]);

    return (
        <div className={className}>
            {text.split('').map((char, index) => (
                <span
                    key={index}
                    style={{
                        animation: `fadeIn 0.1s ease-in forwards`,
                        animationDelay: `${index * speed}ms`,
                        opacity: 0,
                    }}
                >
                    {char}
                </span>
            ))}
        </div>
    );
}
