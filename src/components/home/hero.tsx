"use client";

import { TypewriterEffect } from "../ui/typewriter-effect";
import { BackgroundBeams } from "../ui/background-beams";

export function Hero() {
  const words = [
    {
      text: "Welcome",
      className: "text-white"
    },
    {
      text: "to",
      className: "text-white"
    },
    {
      text: "GDG",
      className: "text-blue-500 dark:text-blue-500"
    },
    {
      text: "Arab",
      className: "text-white"
    },
    {
      text: "Open",
      className: "text-white"
    },
    {
      text: "University",
      className: "text-white"
    }
  ];

  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-center font-sans font-bold text-white">
          <TypewriterEffect words={words} />
        </h1>
        <p className="text-neutral-300 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Let&apos;s build something amazing together.
        </p>
      </div>
      <BackgroundBeams />
    </div>
  );
}
