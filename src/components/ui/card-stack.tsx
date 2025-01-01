"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardStackProps {
  items: React.ReactNode[];
  className?: string;
}

export const CardStack = ({ items, className }: CardStackProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("relative", className)}>
      {items.map((item, idx) => {
        return (
          <motion.div
            key={idx}
            className="absolute inset-0 h-full w-full"
            style={{
              transformOrigin: "50% 0%",
            }}
            animate={{
              rotateZ: idx === hoveredIndex ? "0deg" : `${5 * (idx - items.length / 2)}deg`,
              y: idx === hoveredIndex ? -20 : 0,
              scale: 1 - idx * 0.05,
              zIndex: items.length - idx,
            }}
            onHoverStart={() => setHoveredIndex(idx)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            {item}
          </motion.div>
        );
      })}
    </div>
  );
};
