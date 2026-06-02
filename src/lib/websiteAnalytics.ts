import { ADMIN_BASE_PATH } from "./adminRoute.js";

export const PUBLIC_WEBSITE_PATHS = ["/", "/about", "/products", "/services", "/careers", "/contact"] as const;

const PUBLIC_WEBSITE_PATH_SET = new Set<string>(PUBLIC_WEBSITE_PATHS);

export type WebsiteAnalyticsSnapshot = {
  available: boolean;
  totalVisitors: number;
  visitorsToday: number;
  visitorsThisWeek: number;
  pageViews: number;
  topViewedPage: string | null;
  updatedAt: string | null;
};

const normalizePath = (pathname: string) => {
  if (!pathname) return "/";
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
};

export const isTrackableWebsitePath = (pathname: string) => {
  const normalizedPath = normalizePath(pathname);
  return PUBLIC_WEBSITE_PATH_SET.has(normalizedPath) && !normalizedPath.startsWith(`${ADMIN_BASE_PATH}/`);
};

export const getWebsiteTopPageLabel = (path: string | null) => {
  if (!path) return "No data yet";
  return path === "/" ? "Home" : path.slice(1).replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};
