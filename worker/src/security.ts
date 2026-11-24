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
