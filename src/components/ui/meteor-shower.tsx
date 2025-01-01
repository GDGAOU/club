"use client";
import { motion } from "framer-motion";

export function MeteorShower() {
  const meteors = new Array(20).fill(true);
  return (
    <>
      {meteors.map((_, idx) => (
        <motion.span
          key={idx}
          className={`absolute h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]`}
          style={{
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            animationDelay: Math.random() * 1 + "s",
            animationDuration: Math.random() * 1 + 1 + "s",
          }}
        >
          <motion.span
            className="absolute left-1/2 top-1/2 h-[1px] w-[50px] -translate-x-[70%] -translate-y-1/2 bg-gradient-to-r from-blue-500 to-transparent"
            style={{
              filter: "blur(1px)",
            }}
          />
        </motion.span>
      ))}
    </>
  );
}
