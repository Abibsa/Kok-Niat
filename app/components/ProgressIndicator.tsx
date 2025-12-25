'use client';

import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
    currentStep: number;
    totalSteps: number;
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
    return (
        <div className="progress-indicator">
            {Array.from({ length: totalSteps }, (_, i) => (
                <motion.div
                    key={i}
                    className={`progress-dot ${i < currentStep ? 'completed' : i === currentStep ? 'active' : ''
                        }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                />
            ))}
        </div>
    );
}
