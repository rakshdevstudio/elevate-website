import { parseDrainPayload, persistAnalyticsEvents, verifyDrainSignature } from "../_lib/websiteAnalyticsServer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readRawBody = async (request: any) => {
  const chunks: Buffer[] = [];

  for await (const chunk of request) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks).toString("utf-8");
};

export default async function handler(request: any, response: any) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const rawBody = await readRawBody(request);
  const signature = request.headers["x-vercel-signature"];

  if (!verifyDrainSignature(rawBody, signature)) {
    return response.status(403).json({ code: "invalid_signature", error: "signature didn't match" });
  }

  try {
    const events = parseDrainPayload(rawBody);
    const result = await persistAnalyticsEvents(events);
    return response.status(200).json({ success: true, inserted: result.inserted });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected analytics ingest failure";
    return response.status(500).json({ success: false, error: message });
  }
}
