'use client';

import { useEffect, useState } from 'react';

interface TypingTextProps {
    text: string;
    speed?: number;
    onComplete?: () => void;
    className?: string;
}

export default function TypingText({ text, speed = 50, onComplete, className = '' }: TypingTextProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);
            return () => clearTimeout(timer);
        } else if (onComplete && currentIndex === text.length) {
            const completeTimer = setTimeout(onComplete, 100);
            return () => clearTimeout(completeTimer);
        }
    }, [currentIndex, text, speed, onComplete]);

    // Reset when text changes
    useEffect(() => {
        setDisplayedText('');
        setCurrentIndex(0);
    }, [text]);

    return (
        <div
            className={`typing-text ${className}`}
            style={{
                color: '#333',
                fontSize: '1.25rem',
                fontWeight: '500',
                lineHeight: '1.6',
                minHeight: '2rem'
            }}
        >
            {displayedText}
            {currentIndex < text.length && <span style={{ opacity: 0.5 }}>|</span>}
        </div>
    );
}
