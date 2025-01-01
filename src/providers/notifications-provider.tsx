"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";

interface Notification {
  id: string;
  type: string;
  message: string;
  createdAt: string;
  read: boolean;
  metadata?: any;
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  fetchNotifications: () => Promise<void>;
  addNotification: (notification: Omit<Notification, "id" | "read" | "createdAt">) => void;
  clearNotifications: () => void;
}

const NotificationsContext = createContext<NotificationsContextType>({
  notifications: [],
  unreadCount: 0,
  markAsRead: async () => {},
  markAllAsRead: async () => {},
  fetchNotifications: async () => {},
  addNotification: () => {},
  clearNotifications: () => {},
});

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  const fetchNotifications = async () => {
    if (!session?.user) return;

    try {
      const response = await fetch("/api/notifications");
      const data = await response.json();

      if (data.success) {
        setNotifications(data.data);
        setUnreadCount(data.data.filter((n: Notification) => !n.read).length);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markAsRead = async (id: string) => {
    if (!session?.user) return;

    try {
      const response = await fetch("/api/notifications", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notificationIds: [id] }),
      });

      if (response.ok) {
        setNotifications(prev =>
          prev.map(notification =>
            notification.id === id
              ? { ...notification, read: true }
              : notification
          )
        );
        setUnreadCount(prev => prev - 1);
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    if (!session?.user) return;

    try {
      const response = await fetch("/api/notifications", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notificationIds: notifications.map(n => n.id) }),
      });

      if (response.ok) {
        setNotifications(prev =>
          prev.map(notification => ({ ...notification, read: true }))
        );
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const addNotification = useCallback((notification: Omit<Notification, "id" | "read" | "createdAt">) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substring(7),
      read: false,
      createdAt: new Date().toISOString(),
    };

    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  useEffect(() => {
    if (!session?.user) return;

    // Set up SSE connection
    const sse = new EventSource("/api/notifications/sse");

    sse.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === "notification") {
        const notification = data.notification;
        setNotifications(prev => [notification, ...prev]);
        setUnreadCount(prev => prev + 1);

        // Show toast notification
        toast({
          title: notification.type.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
          description: notification.message,
          duration: 5000,
        });
      }
    };

    sse.onerror = (error) => {
      console.error("SSE error:", error);
      sse.close();
    };

    setEventSource(sse);
    fetchNotifications();

    return () => {
      sse.close();
    };
  }, [session]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        fetchNotifications,
        addNotification,
        clearNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
};
