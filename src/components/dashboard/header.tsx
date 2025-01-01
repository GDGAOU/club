"use client";

import { NotificationsDropdown } from "@/components/notifications/notifications-dropdown";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { Button } from "@/components/ui/button";
import { IconBell } from "@tabler/icons-react";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <NotificationsDropdown />
        </div>
      </div>
    </header>
  );
}
