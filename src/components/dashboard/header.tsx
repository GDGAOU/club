"use client";

import { MobileNav } from "@/components/dashboard/mobile-nav";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
        </div>
      </div>
    </header>
  );
}
