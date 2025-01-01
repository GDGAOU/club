"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BsArrowUpRight } from "react-icons/bs";

const stats = [
  { label: "Active Members", value: "500+", color: "from-blue-600 to-cyan-500" },
  { label: "Events Hosted", value: "50+", color: "from-purple-600 to-pink-500" },
  { label: "Projects Completed", value: "30+", color: "from-yellow-600 to-red-500" },
  { label: "Success Stories", value: "100+", color: "from-green-600 to-emerald-500" },
];

export function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-20 bg-black overflow-hidden">
      {/* Animated background */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-black to-black"
      />

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Our Impact
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Making a difference in the tech community at Arab Open University.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                duration: 0.8,
                delay: index * 0.2,
              }}
              whileHover={{ scale: 1.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity rounded-xl" />
              <div className="relative p-6 rounded-xl border border-gray-800 bg-black/50 backdrop-blur-sm text-center">
                <motion.div
                  initial={{ rotate: -10 }}
                  whileHover={{ rotate: 0 }}
                  className={`inline-block mb-4 p-3 rounded-lg bg-gradient-to-r ${stat.color}`}
                >
                  <BsArrowUpRight className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-400">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
