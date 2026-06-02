import { getWebsiteAnalyticsSnapshot } from "../_lib/websiteAnalyticsServer";

export default async function handler(request: any, response: any) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const snapshot = await getWebsiteAnalyticsSnapshot();
  return response.status(snapshot.available ? 200 : 503).json(snapshot);
}
