'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconUsers,
  IconEye,
  IconHeart,
  IconArticle,
  IconCalendarEvent,
  IconTrophy,
  IconArrowUpRight,
  IconStars,
  IconChartBar,
  IconDeviceLaptop,
  IconDeviceMobile,
  IconBrandChrome,
  IconBrandFirefox,
  IconBrandSafari,
  IconMessageCircle,
  IconShare,
} from "@tabler/icons-react";
import { User } from "@prisma/client";

// Types
interface Analytics {
  totalViews: number;
  totalLikes: number;
  totalPosts: number;
  activeUsers: number;
  upcomingEvents: number;
  achievements: number;
  comments: number;
  shares: number;
  engagement: number;
  trending: number;
  deviceStats: {
    desktop: number;
    mobile: number;
  };
  browserStats: {
    chrome: number;
    firefox: number;
    safari: number;
  };
  weeklyGrowth: string;
  monthlyGrowth: string;
}

interface DashboardProps {
  user: User;
  analytics: Analytics;
}

// Animation variants
const fadeInUp = {
  initial: { 
    opacity: 0, 
    y: 20,
    filter: "blur(10px)"
  },
  animate: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(10px)",
    transition: {
      duration: 0.3
    }
  }
};

const scaleIn = {
  initial: { 
    scale: 0.95, 
    opacity: 0,
    filter: "blur(10px)"
  },
  animate: { 
    scale: 1, 
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  exit: {
    scale: 0.95,
    opacity: 0,
    filter: "blur(10px)",
    transition: {
      duration: 0.2
    }
  }
};

const slideIn = {
  initial: {
    x: -20,
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const pulseAnimation = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const progressBarVariant = {
  initial: { width: 0 },
  animate: (width: number) => ({
    width: `${width}%`,
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  })
};

export default function DashboardMain({ user, analytics }: DashboardProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState("week");
  const [isHoveredCard, setIsHoveredCard] = useState<string | null>(null);

  return (
    <main className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-blue-950">
      <div className="relative min-h-screen">
        {/* Background Patterns */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="relative space-y-8 p-8 pb-16">
          {/* Header Section */}
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome back, {user.name}!
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 mt-2">
                Here's what's happening with your GDSC community.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-white dark:bg-neutral-800 rounded-lg p-1 shadow-inner">
                {["week", "month", "year"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedTimeRange(range)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      selectedTimeRange === range
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                New Post
              </motion.button>
            </div>
          </motion.div>

          {/* Analytics Grid */}
          <motion.div 
            variants={staggerContainer}
            className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          >
            {[
              {
                title: "Total Views",
                value: analytics.totalViews.toLocaleString(),
                icon: <IconEye className="h-6 w-6" />,
                color: "blue",
                growth: analytics.weeklyGrowth,
              },
              {
                title: "Total Likes",
                value: analytics.totalLikes.toLocaleString(),
                icon: <IconHeart className="h-6 w-6" />,
                color: "red",
                growth: "+8%",
              },
              {
                title: "Engagement Rate",
                value: `${analytics.engagement}%`,
                icon: <IconChartBar className="h-6 w-6" />,
                color: "green",
                growth: "+15%",
              },
              {
                title: "Active Users",
                value: analytics.activeUsers.toLocaleString(),
                icon: <IconUsers className="h-6 w-6" />,
                color: "purple",
                growth: "+24%",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                variants={scaleIn}
                initial="initial"
                animate="animate"
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setIsHoveredCard(stat.title)}
                onHoverEnd={() => setIsHoveredCard(null)}
                className={`p-6 rounded-xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-lg hover:shadow-xl transition-all ${
                  isHoveredCard === stat.title ? 'transform scale-105' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 bg-${stat.color}-500/10 rounded-lg`}>
                    <div className={`text-${stat.color}-600`}>{stat.icon}</div>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{stat.title}</p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    {stat.growth} <IconArrowUpRight className="h-4 w-4" />
                  </span>
                  <span className="text-xs text-neutral-400">vs last {selectedTimeRange}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Device & Browser Analytics */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {/* Device Distribution */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="p-6 rounded-xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-4">Device Distribution</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconDeviceLaptop className="h-5 w-5 text-blue-600" />
                    <span>Desktop</span>
                  </div>
                  <span className="font-medium">{analytics.deviceStats.desktop}%</span>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${analytics.deviceStats.desktop}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconDeviceMobile className="h-5 w-5 text-purple-600" />
                    <span>Mobile</span>
                  </div>
                  <span className="font-medium">{analytics.deviceStats.mobile}%</span>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${analytics.deviceStats.mobile}%` }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                  />
                </div>
              </div>
            </motion.div>

            {/* Browser Stats */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="p-6 rounded-xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-4">Browser Statistics</h3>
              <div className="space-y-4">
                {[
                  { name: "Chrome", icon: <IconBrandChrome />, value: analytics.browserStats.chrome, color: "emerald" },
                  { name: "Firefox", icon: <IconBrandFirefox />, value: analytics.browserStats.firefox, color: "orange" },
                  { name: "Safari", icon: <IconBrandSafari />, value: analytics.browserStats.safari, color: "blue" },
                ].map((browser) => (
                  <div key={browser.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-${browser.color}-600`}>{browser.icon}</span>
                        <span>{browser.name}</span>
                      </div>
                      <span className="font-medium">{browser.value}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${browser.value}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`bg-${browser.color}-600 h-2 rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Engagement Metrics */}
          <motion.div 
            variants={staggerContainer}
            className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          >
            {[
              {
                title: "Comments",
                value: analytics.comments,
                icon: <IconMessageCircle className="h-6 w-6" />,
                color: "emerald",
              },
              {
                title: "Shares",
                value: analytics.shares,
                icon: <IconShare className="h-6 w-6" />,
                color: "blue",
              },
              {
                title: "Trending Posts",
                value: analytics.trending,
                icon: <IconStars className="h-6 w-6" />,
                color: "yellow",
              },
              {
                title: "Achievements",
                value: analytics.achievements,
                icon: <IconTrophy className="h-6 w-6" />,
                color: "purple",
              },
            ].map((metric, index) => (
              <motion.div
                key={metric.title}
                variants={scaleIn}
                initial="initial"
                animate="animate"
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 bg-${metric.color}-500/10 rounded-lg`}>
                    <div className={`text-${metric.color}-600`}>{metric.icon}</div>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{metric.title}</p>
                    <h3 className="text-2xl font-bold">{metric.value}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
