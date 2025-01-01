"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/utils/cn";

const events = [
  {
    title: "Tech Workshop Series",
    date: "Every Saturday",
    description: "Join our weekly technical workshops covering various technologies and programming concepts.",
    image: "/workshop.jpg", // Add these images later
    tags: ["Workshop", "Technical", "Weekly"],
  },
  {
    title: "Hackathon 2024",
    date: "Coming Soon",
    description: "48-hour coding challenge to build innovative solutions for real-world problems.",
    image: "/hackathon.jpg",
    tags: ["Hackathon", "Competition", "Teams"],
  },
  {
    title: "Study Group Sessions",
    date: "Twice a Week",
    description: "Collaborative learning sessions for university courses and technical subjects.",
    image: "/study.jpg",
    tags: ["Study", "Group", "Academic"],
  },
];

export function EventsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-20 bg-black">
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/20 to-black"
      />

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Upcoming Events
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't miss out on our exciting events and opportunities to learn and grow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="group relative"
            >
              <div className={cn(
                "relative p-6 rounded-xl border border-gray-800",
                "bg-black/50 backdrop-blur-sm",
                "hover:border-gray-700 transition-colors",
                "overflow-hidden"
              )}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-blue-400 font-medium">{event.date}</span>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      className="h-2 w-2 rounded-full bg-green-500"
                    />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4">
                    {event.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-500 hover:to-purple-500 transition-all">
            View All Events
          </button>
        </motion.div>
      </div>
    </section>
  );
}
