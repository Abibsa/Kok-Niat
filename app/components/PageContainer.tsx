'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageContainerProps {
    children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
    return (
        <motion.div
            className="container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
}
