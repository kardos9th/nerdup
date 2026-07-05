import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export interface AnalyticsSnapshot {
  totalViews: number;
  uniqueSessions: number;
  paths: Record<string, number>;
  lastVisit: string | null;
}

const ANALYTICS_KEY = "nerdup:analytics";
const SESSION_KEY = "nerdup:session-id";

export const readAnalytics = (): AnalyticsSnapshot => {
  if (typeof window === "undefined") {
    return { totalViews: 0, uniqueSessions: 0, paths: {}, lastVisit: null };
  }

  try {
    const stored = window.localStorage.getItem(ANALYTICS_KEY);
    return stored ? JSON.parse(stored) : { totalViews: 0, uniqueSessions: 0, paths: {}, lastVisit: null };
  } catch {
    return { totalViews: 0, uniqueSessions: 0, paths: {}, lastVisit: null };
  }
};

export const useAnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const analytics = readAnalytics();
    const hasSession = window.sessionStorage.getItem(SESSION_KEY);

    if (!hasSession) {
      window.sessionStorage.setItem(SESSION_KEY, `${Date.now()}`);
      analytics.uniqueSessions += 1;
    }

    analytics.totalViews += 1;
    analytics.paths[location.pathname] = (analytics.paths[location.pathname] || 0) + 1;
    analytics.lastVisit = new Date().toISOString();
    window.localStorage.setItem(ANALYTICS_KEY, JSON.stringify(analytics));
  }, [location.pathname]);
};
