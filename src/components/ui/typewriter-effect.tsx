"use client";

import { cn } from "@/utils/cn";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          opacity: 1,
        },
        {
          duration: 0.1,
          delay: stagger(0.1),
        }
      );
    }
  }, [isInView, animate]);

  const renderWords = words.map((word, idx) => {
    return (
      <motion.span key={`word-${idx}`} className="inline-block">
        {word.text.split("").map((char, charIdx) => (
          <motion.span
            initial={{ opacity: 0 }}
            key={`char-${charIdx}`}
            className={cn(`dark:text-white`, word.className)}
          >
            {char}
          </motion.span>
        ))}
        &nbsp;
      </motion.span>
    );
  });

  return (
    <motion.div ref={scope} className="inline">
      <div
        className={cn(
          "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
          className
        )}
      >
        {renderWords}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className={cn(
            "inline-block h-[1em] w-[2px] bg-blue-500 dark:bg-blue-400 ml-1",
            cursorClassName
          )}
        />
      </div>
    </motion.div>
  );
};
