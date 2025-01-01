"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroButtons } from "./hero-buttons";
import { TypewriterEffect } from "../ui/typewriter-effect";
import { BsChevronDown, BsArrowRight } from "react-icons/bs";
import { useRef } from "react";
import { BackgroundBeams } from "../ui/background-beams";

const mainTitle = [
  {
    text: "Welcome",
    className: "bg-gradient-to-br from-blue-400 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient",
  },
  {
    text: "to",
    className: "bg-gradient-to-r from-white/90 to-white/60 bg-clip-text text-transparent",
  },
  {
    text: "GDSC",
    className: "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient",
  },
  {
    text: "AOU",
    className: "bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-gradient",
  },
];

const subTitle = [
  {
    text: "Google",
    className: "bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent",
  },
  {
    text: "Developer",
    className: "bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent",
  },
  {
    text: "Student",
    className: "bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent",
  },
  {
    text: "Clubs",
    className: "bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent",
  },
];

const description = (
  <p className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-clip-text text-transparent">
    Join us in our journey of learning, innovation, and community building at the Arab Open University. 
    Together, we'll explore technology, develop skills, and create amazing projects.
  </p>
);

const stats = [
  { 
    label: "Members", 
    value: "500+",
    gradient: "from-blue-400 via-blue-500 to-purple-500"
  },
  { 
    label: "Events", 
    value: "50+",
    gradient: "from-purple-400 via-pink-500 to-red-500"
  },
  { 
    label: "Projects", 
    value: "30+",
    gradient: "from-red-400 via-orange-500 to-yellow-500"
  },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[100vh] w-full overflow-hidden bg-black flex flex-col items-center justify-center px-4 sm:px-6"
    >
      {/* Background */}
      <BackgroundBeams />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Main Title */}
        <div className="mb-4">
          <div className="relative">
            <TypewriterEffect 
              words={mainTitle} 
              className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight" 
            />
            <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl -z-10" />
          </div>
        </div>

        {/* Subtitle */}
        <div className="mb-8">
          <TypewriterEffect 
            words={subTitle} 
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide"
          />
        </div>
        
        {/* Description */}
        <div className="mx-auto max-w-xl text-base sm:text-lg text-gray-300 mb-12 leading-relaxed backdrop-blur-sm bg-black/30 p-4 rounded-xl border border-white/5">
          {description}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors group hover:bg-white/10 duration-300"
            >
              <div className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4">
          <HeroButtons />
        </div>

        {/* Learn more link */}
        <a
          href="#features"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mt-8 transition-colors group"
        >
          <span>Learn more</span>
          <BsArrowRight className="group-hover:text-blue-400 transition-colors" />
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-sm text-gray-400">Scroll to explore</span>
        <BsChevronDown className="w-5 h-5 text-gray-400 animate-bounce" />
      </div>
    </div>
  );
}
