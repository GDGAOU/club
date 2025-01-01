"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Avatar({ src, alt, fallback, className, ...props }: AvatarProps) {
  const [hasError, setHasError] = React.useState(false);

  return (
    <div
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      {src && !hasError ? (
        <AvatarImage
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
        />
      ) : (
        <AvatarFallback>
          <span className="text-sm font-medium">
            {fallback || alt?.charAt(0) || "?"}
          </span>
        </AvatarFallback>
      )}
    </div>
  );
}

export function AvatarImage({ src, alt, className, ...props }: AvatarImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("aspect-square h-full w-full", className)}
      {...props}
    />
  );
}

export function AvatarFallback({
  children,
  className,
  ...props
}: AvatarFallbackProps) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-muted",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
