"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

type MixBlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten"
  | "color-dodge"
  | "color-burn"
  | "hard-light"
  | "soft-light"
  | "difference"
  | "exclusion"
  | "hue"
  | "saturation"
  | "color"
  | "luminosity";

interface BackgroundGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: MixBlendMode;
  children?: React.ReactNode;
  interactive?: boolean;
  containerClassName?: string;
}

export const BackgroundGradient = ({
  className,
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  pointerColor = "140, 100, 255",
  size = "80%",
  blendingValue = "hard-light",
  children,
  interactive = true,
  containerClassName,
  ...props
}: BackgroundGradientProps) => {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactiveRef.current) return;
    const rect = interactiveRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPosition({ x, y });
  };

  useEffect(() => {
    if (!interactive) return;
    const updateMousePosition = (e: MouseEvent) => {
      if (!interactiveRef.current) return;
      const rect = interactiveRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCursorPosition({ x, y });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [interactive]);

  const { x, y } = cursorPosition;

  return (
    <div
      className={cn("relative overflow-hidden", containerClassName)}
      style={{
        background: `linear-gradient(${gradientBackgroundStart}, ${gradientBackgroundEnd})`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={interactiveRef}
      {...props}
    >
      <div
        className={cn(
          "relative z-10 w-full backdrop-blur-[100px] bg-transparent",
          className
        )}
      >
        {children}
      </div>
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(${size} circle at 0% 0%, rgba(${firstColor}, ${
            isHovered ? "0.8" : "0.4"
          }) 0%, transparent 100%),
            radial-gradient(${size} circle at 50% 0%, rgba(${secondColor}, ${
            isHovered ? "0.8" : "0.4"
          }) 0%, transparent 100%),
            radial-gradient(${size} circle at 100% 0%, rgba(${thirdColor}, ${
            isHovered ? "0.8" : "0.4"
          }) 0%, transparent 100%),
            radial-gradient(${size} circle at ${x}px ${y}px, rgba(${pointerColor}, ${
            isHovered ? "0.8" : "0.4"
          }) 0%, transparent 100%)
          `,
          mixBlendMode: blendingValue,
        }}
      />
    </div>
  );
};
