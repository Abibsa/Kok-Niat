'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface MusicPlayerProps {
    isPlaying: boolean;
    onToggle: () => void;
}

export default function MusicPlayer({ isPlaying, onToggle }: MusicPlayerProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [hasInteracted, setHasInteracted] = useState(false);

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    // Daftar lagu romantis yang stabil (Primary & Backups)
    const playlist = [
        "https://archive.org/download/SoftPianoMusicSleepingMusic/Piano%20Romantic%20Music.mp3",
        "https://cdn.pixabay.com/download/audio/2022/03/24/audio_06d649a463.mp3?filename=main-title-romantic-piano-17122.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    ];

    const handleTrackError = () => {
        console.log("Track failed to load, switching to next backup...");
        const nextIndex = (currentTrackIndex + 1) % playlist.length;
        setCurrentTrackIndex(nextIndex);
    };

    // Play/Pause logic based on isPlaying prop
    useEffect(() => {
        if (audioRef.current) {
            // Reload audio source if track changes
            audioRef.current.load();

            if (isPlaying) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        console.log("Waiting for user interaction to start music...");
                    });
                }
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrackIndex]);

    // Handle first interaction to bypass autoplay block
    useEffect(() => {
        const startMusic = () => {
            if (isPlaying && audioRef.current && !hasInteracted) {
                audioRef.current.play().then(() => {
                    setHasInteracted(true);
                    window.removeEventListener('click', startMusic);
                    window.removeEventListener('touchstart', startMusic);
                }).catch(err => console.log("Still blocked:", err));
            }
        };

        if (isPlaying && !hasInteracted) {
            window.addEventListener('click', startMusic);
            window.addEventListener('touchstart', startMusic);
        }

        return () => {
            window.removeEventListener('click', startMusic);
            window.removeEventListener('touchstart', startMusic);
        };
    }, [isPlaying, hasInteracted]);

    return (
        <>
            <audio
                ref={audioRef}
                src={playlist[currentTrackIndex]}
                onError={handleTrackError}
                loop
                preload="auto"
                crossOrigin="anonymous"
            />
            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: '3.5rem',
                    height: '3.5rem',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    boxShadow: '0 4px 16px rgba(255, 105, 180, 0.4)',
                    zIndex: 1000,
                    color: 'white',
                }}
                title={isPlaying ? 'Pause Music' : 'Play Music'}
            >
                <motion.div
                    animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                    {isPlaying ? '🔊' : '🔇'}
                </motion.div>
            </motion.button>
        </>
    );
}
