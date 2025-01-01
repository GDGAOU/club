"use client";
import { motion } from "framer-motion";
import { HeroButtons } from "./hero-buttons";

export const WelcomeHero = () => {
  return (
    <div className="relative flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-slate-900 px-4 py-24">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center"
      >
        <h1 className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-4xl font-bold text-transparent sm:text-7xl">
          Welcome To GDSC Club AOU
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base text-slate-300">
          Join us in our journey of learning, innovation, and community building.
          Discover opportunities, connect with peers, and grow together.
        </p>
        <HeroButtons />
      </motion.div>
    </div>
  );
};
