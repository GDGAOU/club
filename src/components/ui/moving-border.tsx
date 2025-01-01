"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MovingBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
  rx?: string;
  ry?: string;
  gradient?: string;
  children?: React.ReactNode;
  containerClassName?: string;
}

type PathOptions = {
  progress: number;
  size: number;
};

export const MovingBorder = ({
  children,
  duration = 2000,
  rx = "30%",
  ry = "30%",
  gradient = "gradient-1",
  className,
  containerClassName,
  ...props
}: MovingBorderProps) => {
  const pathRef = React.useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = React.useState<number>(0);

  React.useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  const path = (progress: number, options: PathOptions) => {
    const size = options.size;
    const width = size;
    const height = size;

    const centerX = width / 2;
    const centerY = height / 2;

    const radiusX = (width * parseFloat(rx)) / 100;
    const radiusY = (height * parseFloat(ry)) / 100;

    return `
      M ${centerX} ${centerY - radiusY}
      A ${radiusX} ${radiusY} 0 1 1 ${centerX} ${centerY + radiusY}
      A ${radiusX} ${radiusY} 0 1 1 ${centerX} ${centerY - radiusY}
    `;
  };

  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <div
        className={cn(
          "relative z-10 p-4 bg-background rounded-lg",
          className
        )}
        {...props}
      >
        {children}
      </div>
      <div className="absolute inset-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            d={path(0, { progress: 0, size: 100 })}
            className={cn(
              "stroke-2 fill-none [stroke-dasharray:_1_1] stroke-primary",
              gradient
            )}
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: pathLength,
              animation: `moving-border ${duration}ms infinite linear`,
            }}
          />
        </svg>
      </div>
    </div>
  );
};
