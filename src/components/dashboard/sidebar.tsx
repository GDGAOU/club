"use client";

import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import {
  IconHome,
  IconUser,
  IconSettings,
  IconLogout,
  IconChevronDown,
  IconFolder,
  IconBook2,
  IconUsers,
  IconDiscount2,
  IconLayoutDashboard,
  IconCalendar,
  IconBook,
  IconMessage,
  IconShield,
  IconBell,
  IconCode,
  IconMenu2,
  IconNotes,
  IconFileText
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";

interface DashboardSidebarProps {
  userName?: string | null;
  userRole?: string | null;
}

export const DashboardSidebar = ({ userName, userRole }: DashboardSidebarProps) => {
  const isAdmin = userRole === "ADMIN";
  const isCoAdmin = userRole === "CO_ADMIN";
  const isClubMember = userRole === "CLUB_MEMBER";
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const links = [
    
    {
      label: "Overview",
      href: "/dashboard",
      icon: <IconLayoutDashboard className="h-5 w-5" />,
    },
    {
      label: "Blogs",
      href: "/dashboard/blogs",
      icon: <IconNotes className="h-5 w-5" />,
    },
    {
      label: "Papers",
      href: "/dashboard/papers",
      icon: <IconFileText className="h-5 w-5" />,
    },
    {
      label: "Discounts",
      href: "/dashboard/discounts",
      icon: <IconDiscount2 className="h-5 w-5" />,
    },
    {
      label: "GPA Calculator",
      href: "/dashboard/gpa-calculator",
      icon: <IconBook className="h-5 w-5" />,
    },
    ...(isClubMember || isCoAdmin || isAdmin
      ? [
          {
            label: "Team",
            href: "/dashboard/team",
            icon: <IconUsers className="h-5 w-5" />,
          },
        ]
      : []),
    ...(isAdmin || isCoAdmin
      ? [
          {
            label: "Admin Panel",
            href: "/dashboard/admin",
            icon: <IconShield className="h-5 w-5" />,
          },
        ]
      : []),
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-neutral-800 shadow-lg"
        >
          <IconMenu2 className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
        </button>
      )}

      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="flex flex-col h-full overflow-hidden">
          <div className="flex-1 min-h-0 overflow-hidden">
            <AnimatePresence mode="wait">
              {open ? <Logo /> : <LogoIcon />}
            </AnimatePresence>
            <motion.div className="mt-6 flex flex-col gap-1 overflow-y-auto overflow-x-hidden">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="relative mt-auto pt-4"
          >
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-full"
            >
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl",
                  "hover:bg-neutral-100 dark:hover:bg-neutral-800/50",
                  "transition-all duration-200",
                  "group"
                )}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="h-9 w-9 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl relative flex items-center justify-center shadow-lg">
                    {userName?.[0]?.toUpperCase() || "U"}
                  </div>
                </div>
                {open && (
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                      {userName || "User"}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                      {userRole?.toLowerCase().replace("_", " ")}
                    </div>
                  </div>
                )}
                {open && (
                  <motion.div
                    animate={{ rotate: showProfileMenu ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-neutral-400 group-hover:text-neutral-500 dark:text-neutral-500 dark:group-hover:text-neutral-400"
                  >
                    <IconChevronDown className="h-4 w-4" />
                  </motion.div>
                )}
              </div>
            </button>
            <AnimatePresence>
              {showProfileMenu && open && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-full left-0 right-0 mx-2 mb-1 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-xl shadow-lg border border-neutral-200/50 dark:border-neutral-800/50 overflow-hidden"
                >
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-2 px-3 py-2.5 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-colors"
                  >
                    <IconUser className="h-4 w-4" />
                    View Profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-2 px-3 py-2.5 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-colors"
                  >
                    <IconSettings className="h-4 w-4" />
                    Settings
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-colors"
                  >
                    <IconLogout className="h-4 w-4" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </SidebarBody>
      </Sidebar>
    </>
  );
};

export const Logo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15 }}
      className="flex items-center gap-3 px-4 py-5 relative z-20"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-50" />
        <div className="h-9 w-9 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl relative flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg">G</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-semibold text-sm bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          GDSC AOU
        </span>
        <span className="text-[0.65rem] text-neutral-500 dark:text-neutral-400 font-medium">
          Dashboard
        </span>
      </div>
    </motion.div>
  );
};

export const LogoIcon = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15 }}
      className="flex items-center px-4 py-5 relative z-20"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-50" />
        <div className="h-9 w-9 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl relative flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg">G</span>
        </div>
      </div>
    </motion.div>
  );
};
