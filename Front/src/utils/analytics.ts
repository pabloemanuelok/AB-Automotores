const ANALYTICS_KEY = "ab_analytics";

export interface AnalyticsData {
  wsp: number;
  contacto: number;
  consignaciones: number;
  financiacion: number;
  pageviews: number;
}

const defaultAnalytics: AnalyticsData = {
  wsp: 0,
  contacto: 0,
  consignaciones: 0,
  financiacion: 0,
  pageviews: 0,
};

export function getAnalytics(): AnalyticsData {
  if (typeof window === "undefined") return { ...defaultAnalytics };
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    if (!raw) return { ...defaultAnalytics };
    return { ...defaultAnalytics, ...JSON.parse(raw) };
  } catch {
    return { ...defaultAnalytics };
  }
}

export function trackEvent(key: keyof AnalyticsData): void {
  if (typeof window === "undefined") return;
  try {
    const current = getAnalytics();
    current[key] = (current[key] ?? 0) + 1;
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(current));
  } catch {
    // silently fail
  }
}

export function resetAnalytics(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify({ ...defaultAnalytics }));
}
