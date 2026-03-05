import React from 'react';
import { motion } from 'framer-motion';

interface StarBorderProps {
    children: React.ReactNode;
    color?: string;
    speed?: number;
    thickness?: number;
    /** Tailwind rounded class — 'rounded-full' for pills, 'rounded-2xl' for cards */
    rounded?: string;
    className?: string;
}

/**
 * ReactBits-style animated Star Border.
 *
 * Technique:
 *  - Outer shell: overflow-hidden → clips the large rotating gradient to the card shape.
 *  - Rotating div: centred 200%×200% conic-gradient spinning at `speed` seconds/rev.
 *  - Inner shell: fills the area INSIDE the padding gap (= the border thickness).
 *    Its background covers the gradient everywhere except the thin rim → that rim
 *    is the animated border.
 *
 * The inner shell background is set to the site's dark card colour so it covers
 * the gradient cleanly without relying on CSS inheritance.
 */
const StarBorder: React.FC<StarBorderProps> = ({
    children,
    color = 'hsl(43, 72%, 58%)',
    speed = 5,
    thickness = 1.5,
    rounded = 'rounded-2xl',
    className = '',
}) => {
    return (
        <div
            className={`relative ${rounded} overflow-hidden ${className}`}
            style={{ padding: `${thickness}px` }}
        >
            {/* Rotating conic-gradient — fills the whole shell, clipped by overflow-hidden */}
            <motion.div
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                    top: '50%',
                    left: '50%',
                    width: '200%',
                    height: '200%',
                    translate: '-50% -50%',
                    background: `conic-gradient(
            from 0deg,
            transparent   0%,
            transparent  30%,
            ${color}99   40%,
            ${color}     50%,
            ${color}99   60%,
            transparent  70%,
            transparent 100%
          )`,
                    transformOrigin: 'center center',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
            />

            {/*
        Inner shell: the gradient is only visible in the `thickness`-px rim between
        this div's edge and the outer shell's edge.
        Background matches the site's dark card surface.
      */}
            <div
                className={`relative z-10 ${rounded} overflow-hidden h-full`}
                style={{ background: 'hsl(213, 62%, 8%)' }}
            >
                {children}
            </div>
        </div>
    );
};

export default StarBorder;
