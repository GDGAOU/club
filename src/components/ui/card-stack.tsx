"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const CardStack = ({
  items,
  offset = 4,
  scaleFactor = 0.06,
  className,
}: {
  items: any[];
  offset?: number;
  scaleFactor?: number;
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("relative", className)}>
      {items.map((item, idx) => {
        const isHovered = hoveredIndex === idx;

        const offset = idx * 4;
        const scale = 1 - idx * scaleFactor;

        return (
          <div
            key={idx}
            className={cn(
              "absolute inset-0 h-full w-full origin-top transition-all duration-300 ease-out",
              isHovered && "z-10"
            )}
            style={{
              transform: isHovered
                ? "scale(1.1) translateY(-4%)"
                : `translateY(${offset}%) scale(${scale})`,
            }}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};
