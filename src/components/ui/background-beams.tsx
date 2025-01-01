"use client";
import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

export function BackgroundBeams() {
  const beamRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const animateBeam = async () => {
      const angle = Math.random() * 360;
      const delay = Math.random() * 5000;
      const duration = Math.random() * 2000 + 1000;
      
      await controls.start({
        opacity: [0, 0.5, 0],
        rotate: angle,
        transition: {
          duration: duration / 1000,
          ease: "easeInOut",
        },
      });

      timeoutId = setTimeout(animateBeam, delay);
    };

    animateBeam();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [controls]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Fixed beams */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-32 rotate-45 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-transparent blur-xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-32 -rotate-45 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-transparent blur-xl" />
      </div>

      {/* Animated beam */}
      <motion.div
        ref={beamRef}
        animate={controls}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-32 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-transparent blur-2xl"
        style={{
          transformOrigin: "center",
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black" />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
