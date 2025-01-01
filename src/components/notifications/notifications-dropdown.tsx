"use client";

import { useNotifications } from "@/providers/notifications-provider";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";

export function NotificationsDropdown() {
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    if (unreadCount > 0) {
      markAsRead(notifications.filter(n => !n.read).map(n => n.id));
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "expiring_soon":
        return "⚠️";
      case "new_discount":
        return "🆕";
      case "status_change":
        return "📝";
      case "new_like":
        return "❤️";
      case "new_comment":
        return "💬";
      default:
        return "📢";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={handleOpen}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
            {unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-md border bg-popover shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-4">
            <h2 className="text-sm font-medium">Notifications</h2>
          </div>
          <div className="border-t" />
          <div className="max-h-[400px] overflow-y-auto p-2">
            {notifications.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No notifications
              </p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`mb-2 rounded-md p-3 text-sm ${
                    !notification.read ? "bg-accent" : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p>{notification.message}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {format(new Date(notification.createdAt), "PPp")}
                      </p>
                    </div>
                    <div className="text-xl">
                      {getNotificationIcon(notification.type)}
                    </div>
                    {!notification.read && (
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
