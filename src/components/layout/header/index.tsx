"use client";

import { motion } from "framer-motion";
import { NavLinks } from "./nav-links";
import { AuthButtons } from "./auth-buttons";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xl" />
        <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600"
            >
              <span className="text-lg font-bold text-white">G</span>
            </motion.div>
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-xl font-bold text-transparent">
              GDSC AOU
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <NavLinks />
            <AuthButtons />
          </div>
        </nav>
      </motion.div>
    </header>
  );
}
