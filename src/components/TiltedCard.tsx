import React, { useRef, useState, useCallback } from 'react';

interface TiltedCardProps {
    src: string;
    alt: string;
    /** Extra gradient overlay class (e.g. bg-gradient-to-br from-primary/20 to-…) */
    overlayClass?: string;
    /** Max tilt in degrees */
    maxTilt?: number;
    /** Scale on hover */
    scaleOnHover?: number;
    className?: string;
}

/**
 * ReactBits-style Tilted Card.
 * Tracks mouse position inside the card and applies CSS perspective + rotateX/Y.
 * Includes a moving glare highlight that follows the mouse.
 */
const TiltedCard: React.FC<TiltedCardProps> = ({
    src,
    alt,
    overlayClass = '',
    maxTilt = 14,
    scaleOnHover = 1.03,
    className = '',
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState('');
    const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
    const frameRef = useRef<number>(0);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = requestAnimationFrame(() => {
            const card = cardRef.current;
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;  // 0–1
            const y = (e.clientY - rect.top) / rect.height;   // 0–1
            const rotateX = (y - 0.5) * -maxTilt;  // negative: top of card tilts towards viewer
            const rotateY = (x - 0.5) * maxTilt;
            setTransform(
                `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scaleOnHover},${scaleOnHover},${scaleOnHover})`
            );
            setGlare({ x: x * 100, y: y * 100, opacity: 0.18 });
        });
    }, [maxTilt, scaleOnHover]);

    const handleMouseLeave = useCallback(() => {
        cancelAnimationFrame(frameRef.current);
        setTransform('perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)');
        setGlare(prev => ({ ...prev, opacity: 0 }));
    }, []);

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative rounded-2xl overflow-hidden cursor-pointer ${className}`}
            style={{
                transform,
                transition: transform === '' ? 'none'
                    : transform.includes('scale3d(1,') ? 'transform 0.55s cubic-bezier(0.23,1,0.32,1)'
                        : 'transform 0.08s linear',
                willChange: 'transform',
                transformStyle: 'preserve-3d',
                // Standardized, responsive container
                aspectRatio: '4 / 5',
                width: '100%',
                maxWidth: '520px',
                height: 'auto',
                minHeight: '360px',
                background: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.08), rgba(10,15,30,0.92))',
            }}
        >
            {/* Soft blurred backdrop to avoid empty space */}
            <div
                className="absolute inset-0 scale-110 blur-2xl opacity-20"
                style={{
                    backgroundImage: `url(${src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            {/* Actual image */}
            <img
                src={src}
                alt={alt}
                className="relative z-10 w-full h-full object-contain object-center block"
                loading="lazy"
                draggable={false}
            />

            {/* Colour gradient overlay (accent tint passed via prop) */}
            {overlayClass && (
                <div className={`absolute inset-0 bg-gradient-to-br ${overlayClass} opacity-60 pointer-events-none z-10`} />
            )}

            {/* Bottom vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none z-10" />

            {/* Gold border reveal */}
            <div
                className="absolute inset-0 rounded-2xl border border-primary/0 pointer-events-none z-20"
                style={{ transition: 'border-color 0.4s' }}
            />

            {/* Glare highlight — moves with mouse */}
            <div
                className="absolute inset-0 pointer-events-none z-30"
                style={{
                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 65%)`,
                    transition: 'opacity 0.3s',
                    borderRadius: 'inherit',
                }}
            />

            {/* Ambient gold corner glow */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none z-0" />
        </div>
    );
};

export default TiltedCard;
