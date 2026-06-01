import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ADMIN_BASE_PATH } from "@/lib/adminRoute";

const PUBLIC_TITLE = "X Elevators Pvt. Ltd. | Premium Lift & Elevator Solutions";
const PUBLIC_DESCRIPTION =
  "X Elevators Pvt. Ltd. delivers premium residential and commercial elevator solutions with modern engineering, luxury cabin designs, safety standards, and reliable service.";

const upsertMeta = (selector: string, attrs: Record<string, string>) => {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

const upsertLink = (selector: string, attrs: Record<string, string>) => {
  let element = document.head.querySelector(selector) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

const SeoManager = () => {
  const location = useLocation();

  useEffect(() => {
    const isAdminRoute = location.pathname.startsWith(ADMIN_BASE_PATH);
    const canonicalUrl = `${window.location.origin}${location.pathname}${location.search}`;
    const robots = isAdminRoute ? "noindex, nofollow" : "index, follow";

    document.title = PUBLIC_TITLE;

    upsertMeta('meta[name="description"]', { name: "description", content: PUBLIC_DESCRIPTION });
    upsertMeta('meta[name="robots"]', { name: "robots", content: robots });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: PUBLIC_TITLE });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: PUBLIC_DESCRIPTION });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: `${window.location.origin}/favicon.png` });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "X Elevators Pvt. Ltd." });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: PUBLIC_TITLE });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: PUBLIC_DESCRIPTION });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: `${window.location.origin}/favicon.png` });
    upsertLink('link[rel="canonical"]', { rel: "canonical", href: canonicalUrl });
  }, [location.pathname, location.search]);

  return null;
};

export default SeoManager;
