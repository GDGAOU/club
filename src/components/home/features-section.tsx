"use client";
import { motion } from "framer-motion";
import { BsCode, BsPeople, BsLightbulb, BsBook } from "react-icons/bs";
import { cn } from "@/utils/cn";

const features = [
  {
    title: "Technical Workshops",
    description: "Learn cutting-edge technologies through hands-on workshops led by industry experts.",
    icon: BsCode,
    color: "from-blue-600 to-cyan-500",
  },
  {
    title: "Community Events",
    description: "Connect with fellow developers and build lasting relationships in our vibrant community.",
    icon: BsPeople,
    color: "from-purple-600 to-pink-500",
  },
  {
    title: "Innovation Projects",
    description: "Work on real-world projects and turn your innovative ideas into reality.",
    icon: BsLightbulb,
    color: "from-yellow-600 to-red-500",
  },
  {
    title: "Study Resources",
    description: "Access curated learning materials and past papers to excel in your studies.",
    icon: BsBook,
    color: "from-green-600 to-emerald-500",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-black">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-25" />
      
      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            What We Offer
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join GDSC AOU and unlock a world of opportunities in technology and innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity rounded-xl" />
              <div className={cn(
                "relative p-6 rounded-xl border border-gray-800",
                "bg-black/50 backdrop-blur-sm",
                "hover:border-gray-700 transition-colors"
              )}>
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                  "bg-gradient-to-r",
                  feature.color
                )}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
