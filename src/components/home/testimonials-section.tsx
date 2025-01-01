"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { BsQuote, BsArrowLeft, BsArrowRight } from "react-icons/bs";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Computer Science Student",
    text: "GDSC AOU has been instrumental in my growth as a developer. The workshops and mentorship opportunities are incredible!",
    image: "/testimonials/sarah.jpg", // Add these images later
  },
  {
    name: "Ahmed Hassan",
    role: "Software Engineer",
    text: "Being part of GDSC helped me land my dream job. The practical experience and networking opportunities are unmatched.",
    image: "/testimonials/ahmed.jpg",
  },
  {
    name: "Maria Garcia",
    role: "Web Developer",
    text: "The community at GDSC AOU is amazing. I've made great friends and learned so much from the collaborative projects.",
    image: "/testimonials/maria.jpg",
  },
  // Add more testimonials
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={containerRef} className="relative py-20 bg-black overflow-hidden">
      {/* Background effects */}
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
            What Our Members Say
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Hear from our community members about their experience with GDSC AOU.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-black/50 border border-gray-800 flex items-center justify-center text-white pointer-events-auto hover:bg-black/80 transition-colors"
            >
              <BsArrowLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-black/50 border border-gray-800 flex items-center justify-center text-white pointer-events-auto hover:bg-black/80 transition-colors"
            >
              <BsArrowRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Testimonial card */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative p-8 rounded-xl border border-gray-800 bg-black/50 backdrop-blur-sm"
          >
            <div className="absolute -top-6 left-8 text-blue-500 text-6xl opacity-50">
              <BsQuote />
            </div>

            <div className="relative z-10">
              <p className="text-lg text-gray-300 mb-6 italic">
                &ldquo;{testimonials[currentIndex].text}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-800" />
                <div>
                  <h4 className="text-white font-semibold">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-blue-500" : "bg-gray-700"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
