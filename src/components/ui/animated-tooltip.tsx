"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export const AnimatedTooltip = ({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </div>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2"
        >
          <div className="rounded-md bg-gray-800 px-4 py-2">
            <span className="text-sm text-gray-200">{text}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};
