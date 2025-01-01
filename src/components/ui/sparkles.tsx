"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const random = (min: number, max: number) => Math.random() * (max - min) + min;

interface Sparkle {
  id: number;
  createdAt: number;
  color: string;
  size: number;
  style: {
    top: string;
    left: string;
    zIndex: number;
  };
}

const useRandomInterval = (callback: () => void, minDelay: number, maxDelay: number) => {
  useEffect(() => {
    let timeoutId: number | null = null;
    let isEnabled = true;

    const tick = () => {
      if (!isEnabled) return;
      const nextTickAt = random(minDelay, maxDelay);
      timeoutId = window.setTimeout(() => {
        callback();
        tick();
      }, nextTickAt);
    };

    tick();

    return () => {
      isEnabled = false;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [callback, minDelay, maxDelay]);
};

export const Sparkles = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const colors = ["#FFC700", "#FF0099", "#00FF47", "#00E0FF", "#FF0000"];

  useRandomInterval(
    () => {
      const sparkle = {
        id: Date.now(),
        createdAt: Date.now(),
        color: colors[Math.floor(Math.random() * colors.length)],
        size: random(10, 20),
        style: {
          top: random(0, 100) + "%",
          left: random(0, 100) + "%",
          zIndex: 2,
        },
      };
      const now = Date.now();
      setSparkles(sparkles => [...sparkles, sparkle].filter(s => now - s.createdAt < 750));
    },
    50,
    500
  );

  return (
    <>
      {sparkles.map(sparkle => (
        <motion.span
          key={sparkle.id}
          className="absolute pointer-events-none"
          initial={{ scale: 0, rotate: random(-30, 30) }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          style={{
            ...sparkle.style,
            width: sparkle.size,
            height: sparkle.size,
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 160 160" fill="none">
            <path
              d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
              fill={sparkle.color}
            />
          </svg>
        </motion.span>
      ))}
    </>
  );
}
