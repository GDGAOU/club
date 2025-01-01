"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { NAVIGATION_ITEMS } from "@/config/navigation";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

export const NavLinks = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();

  return (
    <div className="hidden space-x-1 md:flex">
      {NAVIGATION_ITEMS.map((item, idx) => {
        const isActive = pathname === item.href;
        
        return (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link
              href={item.href}
              className="relative px-3 py-2"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className={cn(
                "relative z-10 text-sm font-medium transition-colors",
                isActive 
                  ? "text-blue-600 dark:text-blue-400" 
                  : "text-gray-600 dark:text-gray-300"
              )}>
                {item.text}
              </span>
              {(hoveredIndex === idx || isActive) && (
                <motion.div
                  className="absolute inset-0 -z-0 rounded-xl bg-blue-100/50 dark:bg-blue-900/20"
                  layoutId="navbar"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};
