"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAVIGATION_ITEMS } from "@/config/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <div className="md:hidden">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={toggleMenu}
        className="text-gray-700 dark:text-gray-300"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <motion.path
            animate={isOpen ? "open" : "closed"}
            variants={{
              closed: { d: "M4 6h16M4 12h16M4 18h16" },
              open: { d: "M6 18L18 6M6 6l12 12" },
            }}
          />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg"
          >
            <div className="flex h-full flex-col p-6">
              <div className="flex justify-end">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleMenu}
                  className="text-gray-700 dark:text-gray-300"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              <nav className="mt-8 space-y-4">
                {NAVIGATION_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.text}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-4 py-2 text-lg font-medium",
                          isActive
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-300"
                        )}
                        onClick={toggleMenu}
                      >
                        {item.text}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-auto space-y-4">
                <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-lg font-medium text-gray-700 dark:text-gray-300"
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/signup"
                    className="block px-4 py-2 text-lg font-medium text-blue-600 dark:text-blue-400"
                    onClick={toggleMenu}
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
