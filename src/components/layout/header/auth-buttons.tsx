"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export const AuthButtons = () => {
  return (
    <div className="hidden space-x-3 md:flex">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link
          href="/login"
          className={cn(
            "rounded-xl px-4 py-2 text-sm font-medium",
            "bg-gray-100 dark:bg-gray-800",
            "text-gray-900 dark:text-gray-100",
            "hover:bg-gray-200 dark:hover:bg-gray-700",
            "transition-all duration-200"
          )}
        >
          Login
        </Link>
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link
          href="/signup"
          className={cn(
            "rounded-xl px-4 py-2 text-sm font-medium",
            "bg-gradient-to-r from-blue-600 to-blue-500",
            "text-white",
            "hover:from-blue-500 hover:to-blue-400",
            "transition-all duration-200",
            "shadow-lg shadow-blue-500/20",
            "border border-blue-600/20"
          )}
        >
          Sign Up
        </Link>
      </motion.div>
    </div>
  );
};
