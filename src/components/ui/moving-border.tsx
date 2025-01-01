"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const Button = ({
  borderRadius = "1.75rem",
  className,
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration = 2000,
  ...otherProps
}: {
  borderRadius?: string;
  className?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  [key: string]: any;
}) => {
  return (
    <Component
      className={cn(
        "bg-transparent relative text-xl h-12 w-40 p-[1px] overflow-hidden ",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(var(--moving-border-angle, 0deg), var(--brand-primary), var(--brand-secondary))",
          borderRadius: `calc(${borderRadius} * 0.96)`,
          animation: `gradient-rotate ${duration}ms linear infinite`,
        }}
      />
      <div
        className={cn(
          "relative bg-neutral-950 text-white flex items-center justify-center w-full h-full text-sm font-medium",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
};

export const MovingBorder = ({
  children,
  duration = 2000,
  containerClassName,
  borderClassName,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  containerClassName?: string;
  borderClassName?: string;
  [key: string]: any;
}) => {
  return (
    <div
      className={cn("relative p-[1px] overflow-hidden", containerClassName)}
      {...otherProps}
    >
      <div
        className={cn("absolute inset-0", borderClassName)}
        style={{
          background:
            "linear-gradient(var(--moving-border-angle, 0deg), var(--brand-primary), var(--brand-secondary))",
          animation: `gradient-rotate ${duration}ms linear infinite`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
};
