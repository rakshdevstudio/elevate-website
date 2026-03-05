import React, { ReactElement, useEffect, useMemo, useState, useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

export interface AnimatedListProps {
    className?: string;
    children: React.ReactNode;
    delay?: number;
}

export const AnimatedList = React.memo(
    ({ className = "", children, delay = 150 }: AnimatedListProps) => {
        const [index, setIndex] = useState(0);
        const childrenArray = useMemo(
            () => React.Children.toArray(children),
            [children]
        );
        const ref = useRef<HTMLDivElement>(null);
        const isInView = useInView(ref, { once: true, margin: "-100px" });

        useEffect(() => {
            // Only start the staggered animation if the list is in view
            if (isInView && index < childrenArray.length - 1) {
                const timeout = setTimeout(() => {
                    setIndex((prevIndex) => prevIndex + 1);
                }, delay);

                return () => clearTimeout(timeout);
            }
        }, [index, delay, childrenArray.length, isInView]);

        const itemsToShow = useMemo(() => {
            // In a notification feed, you'd slice(0, index + 1).reverse()
            // Since this is an FAQ, we just show them top-to-bottom sequentially
            const result = childrenArray.slice(0, index + 1);
            return result;
        }, [index, childrenArray]);

        return (
            <div ref={ref} className={`flex flex-col gap-4 ${className}`}>
                <AnimatePresence>
                    {itemsToShow.map((item, i) => (
                        <AnimatedListItem key={(item as ReactElement).key || i}>
                            {item}
                        </AnimatedListItem>
                    ))}
                </AnimatePresence>
            </div>
        );
    }
);

AnimatedList.displayName = "AnimatedList";

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
    const animations = {
        initial: { scale: 0.9, opacity: 0, y: 20 },
        animate: { scale: 1, opacity: 1, y: 0, originY: 0 },
        exit: { scale: 0.9, opacity: 0, y: 20 },
        transition: { type: "spring" as const, stiffness: 350, damping: 30 },
    };

    return (
        <motion.div {...animations} layout className="w-full">
            {children}
        </motion.div>
    );
}
