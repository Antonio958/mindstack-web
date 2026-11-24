export const MAX_REQUEST_BYTES = 16000;
export class PayloadTooLarge extends Error {}
export async function readBoundedJson(request: Request): Promise<unknown> {
  const length = request.headers.get("Content-Length");
  if (length !== null && (!/^\d+$/.test(length) || Number(length) > MAX_REQUEST_BYTES)) throw new PayloadTooLarge();
  if (!request.body) throw new SyntaxError("Missing body");
  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", {fatal:true});
  let bytes = 0;
  let text = "";
  try {
    for (;;) {
      const {done,value} = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_REQUEST_BYTES) throw new PayloadTooLarge();
      text += decoder.decode(value, {stream:true});
    }
    text += decoder.decode();
    return JSON.parse(text);
  } catch (error) {
    void reader.cancel().catch(() => {});
    throw error;
  } finally {
    reader.releaseLock();
  }
}

/** Fixed diagnostic categories only. Never log raw Siteverify payloads, tokens or secrets. */
export type VerificationResult = "ok" | "TS01" | "TS02" | "TS03" | "TS04" | "TS05";
export function classifyTurnstile(data: unknown, expectedHostname: string): VerificationResult {
  if (!data || typeof data !== "object" || Array.isArray(data)) return "TS05";
  const value = data as Record<string, unknown>;
  if (value.success === true) return value.hostname === expectedHostname ? "ok" : "TS03";
  const codes = Array.isArray(value["error-codes"]) ? value["error-codes"] : [];
  if (codes.includes("invalid-input-secret") || codes.includes("missing-input-secret")) return "TS01";
  if (codes.includes("timeout-or-duplicate")) return "TS02";
  if (codes.includes("invalid-input-response") || codes.includes("missing-input-response")) return "TS04";
  return "TS05";
}
