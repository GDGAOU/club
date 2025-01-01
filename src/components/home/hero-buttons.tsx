"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

export const HeroButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <Link
          href="/join"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-blue-600 px-8 py-3 text-white transition-transform hover:bg-blue-700"
        >
          <span className="font-semibold">Join GDSC</span>
          <motion.span
            initial={{ x: 0 }}
            animate={{ x: [0, 5, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          >
            <BsArrowRight className="text-lg" />
          </motion.span>
          <motion.div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-blue-400"
            initial={{ x: "100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </Link>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
      >
        <Link
          href="/about"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-slate-300 dark:border-slate-700 px-8 py-3 text-slate-300 transition-transform hover:text-white"
        >
          <span className="font-semibold">Learn More</span>
          <motion.span
            initial={{ x: -100, opacity: 0 }}
            whileHover={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <BsArrowRight className="text-lg" />
          </motion.span>
          <motion.div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-700 to-slate-600"
            initial={{ x: "100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </Link>
      </motion.div>
    </div>
  );
};
