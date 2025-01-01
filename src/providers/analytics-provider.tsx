"use client";

import React, { createContext, useContext, useCallback } from "react";
import { useSession } from "next-auth/react";

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, string | number | boolean>;
}

interface AnalyticsContextType {
  trackEvent: (event: AnalyticsEvent) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType>({
  trackEvent: () => {},
});

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const trackEvent = useCallback(
    (event: AnalyticsEvent) => {
      // Add user data from session if available
      const enrichedData = {
        ...event.properties,
        userId: session?.user?.id,
        timestamp: new Date().toISOString(),
      };

      // Log to console in development
      if (process.env.NODE_ENV === "development") {
        console.log("Analytics Event:", event.name, enrichedData);
      }

      // Here you would typically send this to your analytics service
      // For example: mixpanel.track(event.name, enrichedData);
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
