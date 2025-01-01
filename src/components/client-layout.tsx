'use client';

import { Inter } from "next/font/google";
import { ThemeToggle } from "./theme-toggle";

const inter = Inter({ subsets: ['latin'] });

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <body className={`${inter.className} min-h-screen bg-background font-sans antialiased`}>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      {children}
    </body>
  );
}
