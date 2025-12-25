'use client';

import { useEffect, useRef } from 'react';

interface SoundEffectsProps {
    enabled: boolean;
}

export default function SoundEffects({ enabled }: SoundEffectsProps) {
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && enabled) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    }, [enabled]);

    const playClickSound = () => {
        if (!enabled || !audioContextRef.current) return;

        const ctx = audioContextRef.current;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
    };

    const playSuccessSound = () => {
        if (!enabled || !audioContextRef.current) return;

        const ctx = audioContextRef.current;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.value = 523.25; // C5
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.3);

        // Second note
        setTimeout(() => {
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();

            osc2.connect(gain2);
            gain2.connect(ctx.destination);

            osc2.frequency.value = 659.25; // E5
            osc2.type = 'sine';

            gain2.gain.setValueAtTime(0.15, ctx.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

            osc2.start(ctx.currentTime);
            osc2.stop(ctx.currentTime + 0.3);
        }, 150);
    };

    // Expose functions globally for easy access
    useEffect(() => {
        if (typeof window !== 'undefined') {
            (window as any).playClickSound = playClickSound;
            (window as any).playSuccessSound = playSuccessSound;
        }
    }, [enabled]);

    return null;
}
