import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import { ADMIN_BASE_PATH } from "../../src/lib/adminRoute";
import { PUBLIC_WEBSITE_PATHS, isTrackableWebsitePath, type WebsiteAnalyticsSnapshot } from "../../src/lib/websiteAnalytics";

type VercelAnalyticsEvent = {
  schema?: string;
  eventType?: string;
  eventName?: string;
  eventData?: string;
  timestamp?: number;
  projectId?: string;
  ownerId?: string;
  dataSourceName?: string;
  sessionId?: number;
  deviceId?: number;
  origin?: string;
  path?: string;
  route?: string;
  referrer?: string;
  queryParams?: string;
  country?: string;
  region?: string;
  city?: string;
  vercelEnvironment?: string;
  vercelUrl?: string;
};

type RpcSnapshotRow = {
  total_visitors: number | null;
  visitors_today: number | null;
  visitors_this_week: number | null;
  page_views: number | null;
  top_viewed_page: string | null;
  updated_at: string | null;
};

let adminClient: ReturnType<typeof createClient> | null = null;
let adminClientConfig: { url: string; serviceRoleKey: string } | null = null;

const emptySnapshot = (available = false): WebsiteAnalyticsSnapshot => ({
  available,
  totalVisitors: 0,
  visitorsToday: 0,
  visitorsThisWeek: 0,
  pageViews: 0,
  topViewedPage: null,
  updatedAt: null,
});

const readEnv = (name: string) => {
  const rawValue = process.env[name];
  if (!rawValue) return "";

  const trimmed = rawValue.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
};

const isValidTimeZone = (timeZone: string) => {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone }).format(new Date());
    return true;
  } catch {
    return false;
  }
};

const getAnalyticsTimeZone = () => {
  const configuredTimeZone = readEnv("WEBSITE_ANALYTICS_TIMEZONE") || "Asia/Kolkata";
  if (isValidTimeZone(configuredTimeZone)) return configuredTimeZone;

  console.error("[website-analytics] Invalid WEBSITE_ANALYTICS_TIMEZONE value, falling back to Asia/Kolkata", {
    configuredTimeZone,
  });
  return "Asia/Kolkata";
};

const getAdminClient = () => {
  const supabaseUrl = readEnv("VITE_SUPABASE_URL");
  const serviceRoleKey = readEnv("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) return null;

  if (!adminClient || adminClientConfig?.url !== supabaseUrl || adminClientConfig?.serviceRoleKey !== serviceRoleKey) {
    adminClientConfig = { url: supabaseUrl, serviceRoleKey };
    adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }

  return adminClient;
};

const parseOffsetMinutes = (date: Date, timeZone: string) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
    hour: "2-digit",
  }).formatToParts(date);
  const offsetLabel = parts.find((part) => part.type === "timeZoneName")?.value || "GMT+0";
  const match = offsetLabel.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);

  if (!match) return 0;

  const sign = match[1] === "-" ? -1 : 1;
  const hours = Number(match[2] || 0);
  const minutes = Number(match[3] || 0);
  return sign * (hours * 60 + minutes);
};

const getZonedDateParts = (date: Date, timeZone: string) => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).formatToParts(date);

  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  const day = Number(parts.find((part) => part.type === "day")?.value);
  const weekday = parts.find((part) => part.type === "weekday")?.value || "Sun";
  return { year, month, day, weekday };
};

const getTimeZoneMidnight = (year: number, month: number, day: number, timeZone: string) => {
  const noonUtc = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const offsetMinutes = parseOffsetMinutes(noonUtc, timeZone);
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0) - offsetMinutes * 60_000);
};

const getDateRangeBounds = (timeZone: string) => {
  const now = new Date();
  const { year, month, day, weekday } = getZonedDateParts(now, timeZone);
  const todayStart = getTimeZoneMidnight(year, month, day, timeZone);
  const weekdayIndexMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const weekdayIndex = weekdayIndexMap[weekday] ?? 0;
  const weekStart = new Date(todayStart);
  weekStart.setUTCDate(weekStart.getUTCDate() - weekdayIndex);
  return { todayStart, weekStart };
};

const createEventHash = (event: VercelAnalyticsEvent) =>
  crypto
    .createHash("sha1")
    .update(
      [
        event.projectId || "",
        event.ownerId || "",
        event.eventType || "",
        event.eventName || "",
        String(event.timestamp || ""),
        String(event.sessionId || ""),
        String(event.deviceId || ""),
        event.path || "",
      ].join(":")
    )
    .digest("hex");

const safeParseJson = (value?: string) => {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export const verifyDrainSignature = (rawBody: string, signatureHeader?: string | string[] | null) => {
  const drainSignatureSecret = readEnv("VERCEL_ANALYTICS_DRAIN_SECRET");
  if (!drainSignatureSecret) return true;
  if (!signatureHeader || Array.isArray(signatureHeader)) return false;

  const expectedSignature = crypto.createHmac("sha1", drainSignatureSecret).update(Buffer.from(rawBody, "utf-8")).digest("hex");
  const providedSignature = Buffer.from(signatureHeader, "utf-8");
  const expectedSignatureBuffer = Buffer.from(expectedSignature, "utf-8");

  if (providedSignature.length !== expectedSignatureBuffer.length) return false;
  return crypto.timingSafeEqual(providedSignature, expectedSignatureBuffer);
};

export const parseDrainPayload = (rawBody: string): VercelAnalyticsEvent[] => {
  const trimmedBody = rawBody.trim();
  if (!trimmedBody) return [];

  if (trimmedBody.startsWith("[")) {
    const payload = JSON.parse(trimmedBody);
    return Array.isArray(payload) ? payload : [];
  }

  if (trimmedBody.startsWith("{")) {
    return [JSON.parse(trimmedBody)];
  }

  return trimmedBody
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
};

export const persistAnalyticsEvents = async (events: VercelAnalyticsEvent[]) => {
  const supabase = getAdminClient();
  if (!supabase) throw new Error("Supabase service role credentials are missing.");
  const expectedProjectId = readEnv("VERCEL_ANALYTICS_PROJECT_ID");
  const expectedOwnerId = readEnv("VERCEL_ANALYTICS_OWNER_ID");

  const rows = events
    .filter((event) => event.eventType === "pageview")
    .filter((event) => event.vercelEnvironment === "production")
    .filter((event) => !expectedProjectId || event.projectId === expectedProjectId)
    .filter((event) => !expectedOwnerId || event.ownerId === expectedOwnerId)
    .filter((event) => isTrackableWebsitePath(event.path || ""))
    .map((event) => ({
      event_hash: createEventHash(event),
      event_type: event.eventType,
      event_name: event.eventName || null,
      event_data: safeParseJson(event.eventData),
      occurred_at: new Date(event.timestamp || Date.now()).toISOString(),
      project_id: event.projectId || null,
      owner_id: event.ownerId || null,
      data_source_name: event.dataSourceName || null,
      session_id: event.sessionId || null,
      device_id: event.deviceId || null,
      origin: event.origin || null,
      path: event.path || null,
      route: event.route || null,
      referrer: event.referrer || null,
      query_params: event.queryParams || null,
      country: event.country || null,
      region: event.region || null,
      city: event.city || null,
      vercel_environment: event.vercelEnvironment || null,
      vercel_url: event.vercelUrl || null,
      raw_event: event,
    }));

  if (rows.length === 0) {
    return { inserted: 0 };
  }

  const { error, data } = await (supabase as any)
    .from("website_analytics_events")
    .upsert(rows, { onConflict: "event_hash", ignoreDuplicates: true })
    .select("id");

  if (error) throw error;
  return { inserted: data?.length || 0 };
};

export const getWebsiteAnalyticsSnapshot = async (): Promise<WebsiteAnalyticsSnapshot> => {
  const supabase = getAdminClient();
  if (!supabase) {
    return emptySnapshot(false);
  }

  const { todayStart, weekStart } = getDateRangeBounds(getAnalyticsTimeZone());
  const { data, error } = await (supabase as any)
    .rpc("get_website_analytics_snapshot", {
      p_public_paths: [...PUBLIC_WEBSITE_PATHS],
      p_today_start: todayStart.toISOString(),
      p_week_start: weekStart.toISOString(),
      p_admin_prefix: ADMIN_BASE_PATH,
    })
    .single();

  if (error) {
    console.error("[website-analytics] Failed to load analytics snapshot from Supabase", error);
    return emptySnapshot(false);
  }

  const row = (data || {}) as RpcSnapshotRow;

  return {
    available: true,
    totalVisitors: row.total_visitors || 0,
    visitorsToday: row.visitors_today || 0,
    visitorsThisWeek: row.visitors_this_week || 0,
    pageViews: row.page_views || 0,
    topViewedPage: row.top_viewed_page || null,
    updatedAt: row.updated_at || null,
  };
};
