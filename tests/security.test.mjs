import test from "node:test";
import assert from "node:assert/strict";
import { MAX_REQUEST_BYTES, PayloadTooLarge, readBoundedJson, classifyTurnstile } from "../worker/src/security.ts";
import { EVALUACION_API_URL, MIGRATION_ORIGINS, evaluationApiForHostname } from "../lib/evaluacion/config.ts";

const request = (body, headers = {}) => new Request("https://example.test", {method:"POST",body,headers});
test("JSON válido se procesa", async () => {
  assert.deepEqual(await readBoundedJson(request('{"a":1}')), {a:1});
});
test("límite exacto en bytes", async () => {
  const body='"'+"a".repeat(MAX_REQUEST_BYTES-2)+'"';
  assert.equal((await readBoundedJson(request(body))).length,MAX_REQUEST_BYTES-2);
});
test("rechaza cuerpo excesivo sin Content-Length", async () => {
  await assert.rejects(readBoundedJson(request('"'+ "a".repeat(MAX_REQUEST_BYTES)+'"')),PayloadTooLarge);
});
test("rechaza bytes UTF-8 excesivos aunque haya menos caracteres", async () => {
  await assert.rejects(readBoundedJson(request('"'+ "é".repeat(9000)+'"')),PayloadTooLarge);
});
test("rechaza longitud declarada excesiva", async () => {
  await assert.rejects(readBoundedJson(request('{}',{"Content-Length":"16001"})),PayloadTooLarge);
});
test("rechaza JSON inválido", async () => {
  await assert.rejects(readBoundedJson(request('{')),SyntaxError);
});
test("rechaza UTF-8 inválido", async () => {
  await assert.rejects(readBoundedJson(request(new Uint8Array([0xff]))),TypeError);
});
test("cuerpo por fragmentos se limita y cancela", async () => {
  let cancelled=false;
  const stream=new ReadableStream({pull(c){c.enqueue(new Uint8Array(10000).fill(65));},cancel(){cancelled=true;}});
  const req=new Request("https://example.test",{method:"POST",body:stream,duplex:"half"});
  await assert.rejects(readBoundedJson(req),PayloadTooLarge);
  assert.equal(cancelled,true);
});
test("dominios nuevos exactos, sin referencias a la cuenta anterior", () => {
  assert.equal(EVALUACION_API_URL,"https://mindstack-evaluacion-api.grupomindstack.workers.dev/api/evaluaciones");
  assert.equal(MIGRATION_ORIGINS.length,2);
  assert.ok(MIGRATION_ORIGINS.every(o=>o.endsWith(".grupomindstack.workers.dev")));
  assert.equal(evaluationApiForHostname("mindstack-web.grupomindstack.workers.dev"),EVALUACION_API_URL);
  assert.equal(evaluationApiForHostname("mindstack-web.grupomindstack.workers.dev.example.test","fallback"),"fallback");
});

test("Turnstile exige éxito y hostname exacto", () => {
  const host = "mindstack-web.grupomindstack.workers.dev";
  assert.equal(classifyTurnstile({success:true,hostname:host},host),"ok");
  assert.equal(classifyTurnstile({success:true,hostname:host+".example.test"},host),"TS03");
  assert.equal(classifyTurnstile({success:true},host),"TS03");
  assert.equal(classifyTurnstile({success:false,hostname:host},host),"TS05");
});
test("Turnstile clasifica rechazos sin devolver campos arbitrarios", () => {
  const host="mindstack-web.grupomindstack.workers.dev";
  for (const [error,code] of [["invalid-input-secret","TS01"],["missing-input-secret","TS01"],["timeout-or-duplicate","TS02"],["invalid-input-response","TS04"],["missing-input-response","TS04"],["internal-error","TS05"],["unknown","TS05"]]) {
    assert.equal(classifyTurnstile({success:false,"error-codes":[error]},host),code);
  }
  assert.equal(classifyTurnstile(null,host),"TS05");
});
