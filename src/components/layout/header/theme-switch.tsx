"use client";

import { useTheme } from "@/context/theme-context";
import { motion } from "framer-motion";
import { BsMoon, BsSun } from "react-icons/bs";
import { cn } from "@/utils/cn";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        "flex h-9 w-9 items-center justify-center",
        "rounded-xl text-sm",
        "bg-gray-100 dark:bg-gray-800",
        "text-gray-900 dark:text-gray-100",
        "hover:bg-gray-200 dark:hover:bg-gray-700",
        "transition-all duration-200"
      )}
      onClick={toggleTheme}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: theme === "light" ? 0 : 180 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        {theme === "light" ? <BsSun className="h-4 w-4" /> : <BsMoon className="h-4 w-4" />}
      </motion.div>
    </motion.button>
  );
}
