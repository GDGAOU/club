"use client";

import { Button } from "@/components/ui/button";
import { IconMenu2 } from "@tabler/icons-react";

export function MobileNav() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden"
      aria-label="Toggle Menu"
    >
      <IconMenu2 className="h-4 w-4" />
    </Button>
  );
}
