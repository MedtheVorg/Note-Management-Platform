'use client';
// in order to use framer motion we have to make our component a client component
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
export default function Template({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial={{ scale: '98%', opacity: 0.2 }}
            animate={{ scale: '100%', opacity: 1 }}
            transition={{
                ease: 'easeInOut',
                duration: 0.55,
                delayChildren: 4,
            }}
        >
            {children}
        </motion.div>
    );
}
