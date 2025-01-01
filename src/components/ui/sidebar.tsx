"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Sidebar = ({ children, open, setOpen }: SidebarProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [setOpen]);

  return (
    <>
      {isMobile && open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setOpen(false)}
        />
      )}
      <motion.div
        initial={false}
        animate={{
          width: open ? "16rem" : "4.5rem",
          x: isMobile && !open ? "-100%" : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 left-0 z-40 h-full",
          "bg-white/80 dark:bg-neutral-900/80",
          "border-r border-neutral-200 dark:border-neutral-800",
          "backdrop-blur-xl",
          "shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(0,0,0,0.2)]",
          "overflow-hidden"
        )}
      >
        <div className="relative h-full">
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              "absolute right-0 top-[72px] z-50",
              "flex items-center justify-center",
              "h-6 w-6",
              "bg-gradient-to-r from-blue-500 to-purple-500",
              "text-white",
              "shadow-lg shadow-blue-500/20 dark:shadow-blue-500/10",
              "hover:shadow-xl hover:shadow-blue-500/30 dark:hover:shadow-blue-500/20",
              "transition-all duration-200",
              open 
                ? "rounded-l-lg -right-6" 
                : "rounded-r-lg translate-x-0"
            )}
          >
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </motion.div>
          </button>
          {children}
        </div>
      </motion.div>
    </>
  );
};

interface SidebarBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const SidebarBody = ({ children, className }: SidebarBodyProps) => {
  return (
    <div
      className={cn(
        "h-full w-full p-3 flex flex-col",
        "overflow-x-hidden overflow-y-auto",
        "scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700",
        "scrollbar-track-transparent",
        className
      )}
    >
      {children}
    </div>
  );
};

interface SidebarLinkProps {
  link: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    onClick?: () => void;
  };
}

export const SidebarLink = ({ link }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === link.href;

  return (
    <Link href={link.href} onClick={link.onClick}>
      <div
        className={cn(
          "group relative flex items-center gap-4 px-3 py-2.5 rounded-xl",
          "transition-all duration-200",
          "hover:bg-neutral-100 dark:hover:bg-neutral-800/50",
          "min-w-0 w-full",
          isActive && "bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20"
        )}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "transition-colors duration-200 flex-shrink-0",
            isActive 
              ? "text-blue-600 dark:text-blue-400" 
              : "text-neutral-600 dark:text-neutral-400",
            "group-hover:text-blue-600 dark:group-hover:text-blue-400"
          )}
        >
          {link.icon}
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "text-sm font-medium whitespace-pre overflow-hidden text-ellipsis",
              "transition-colors duration-200",
              isActive 
                ? "text-blue-600 dark:text-blue-400" 
                : "text-neutral-700 dark:text-neutral-300",
              "group-hover:text-blue-600 dark:group-hover:text-blue-400"
            )}
          >
            {link.label}
          </motion.span>
        </AnimatePresence>
        {isActive && (
          <motion.div
            layoutId="activeTab"
            className={cn(
              "absolute inset-0 rounded-xl",
              "bg-gradient-to-r from-blue-500/10 to-purple-500/10",
              "dark:from-blue-500/20 dark:to-purple-500/20",
              "-z-10"
            )}
            transition={{ type: "spring", duration: 0.2, bounce: 0.15 }}
          />
        )}
      </div>
    </Link>
  );
};
