"use client";
import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-black" />

      {/* Animated gradients */}
      <motion.div
        className="absolute inset-0 opacity-50"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, #3b82f6 0%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, #3b82f6 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, #3b82f6 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, #3b82f6 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, #3b82f6 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 100% 100%, #8b5cf6 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, #8b5cf6 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, #8b5cf6 0%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, #8b5cf6 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, #8b5cf6 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
          delay: 4,
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, #ec4899 0%, transparent 50%)",
            "radial-gradient(circle at 0% 50%, #ec4899 0%, transparent 50%)",
            "radial-gradient(circle at 50% 100%, #ec4899 0%, transparent 50%)",
            "radial-gradient(circle at 100% 50%, #ec4899 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, #ec4899 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
          delay: 2,
        }}
      />

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}
