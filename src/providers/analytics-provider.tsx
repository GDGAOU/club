"use client";

import React, { createContext, useContext, useCallback } from "react";
import { useSession } from "next-auth/react";

interface AnalyticsContextType {
  trackEvent: (eventName: string, eventData?: any) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const trackEvent = useCallback(
    (eventName: string, eventData?: any) => {
      // Add user data from session if available
      const enrichedData = {
        ...eventData,
        userId: session?.user?.id,
        timestamp: new Date().toISOString(),
      };

      // Log to console in development
      if (process.env.NODE_ENV === "development") {
        console.log("Analytics Event:", eventName, enrichedData);
      }

      // Here you would typically send this to your analytics service
      // For example: mixpanel.track(eventName, enrichedData);
    },
    [session]
  );

  return (
    <AnalyticsContext.Provider value={{ trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
}
