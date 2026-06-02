import { getWebsiteAnalyticsSnapshot } from "../_lib/websiteAnalyticsServer.js";

export default async function handler(request: any, response: any) {
  try {
    if (request.method !== "GET") {
      response.setHeader("Allow", "GET");
      return response.status(405).json({ error: "Method not allowed" });
    }

    const snapshot = await getWebsiteAnalyticsSnapshot();
    return response.status(snapshot.available ? 200 : 503).json(snapshot);
  } catch (error) {
    console.error("[website-analytics] Unhandled admin analytics API error", error);
    return response.status(500).json({
      available: false,
      totalVisitors: 0,
      visitorsToday: 0,
      visitorsThisWeek: 0,
      pageViews: 0,
      topViewedPage: null,
      updatedAt: null,
      error: "Internal server error",
    });
  }
}
