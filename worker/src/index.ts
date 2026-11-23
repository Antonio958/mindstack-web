import { neon } from "@neondatabase/serverless";
import { QUESTIONS, VERSION, complete, evaluate, type Answers } from "../../lib/evaluacion/motor";
import { PRIVACY_VERSION as APPROVED_PRIVACY_VERSION } from "../../lib/evaluacion/config";

type Env = {
  DATABASE_URL: string;
  TURNSTILE_SECRET: string;
  PRIVACY_VERSION: string;
  ALLOWED_ORIGIN: string;
  ALLOWED_PREVIEW_ORIGIN?: string;
  PUBLIC_API_RATE_LIMITER: { limit: (opts: { key: string }) => Promise<{ success: boolean }> };
};
const headers = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};
function response(body: object, status=200, origin?: string) {
  return new Response(JSON.stringify(body), {
    status, headers: {...headers, ...(origin ? {"Access-Control-Allow-Origin":origin,"Vary":"Origin"} : {})}
  });
}
function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}
function asText(v: unknown, max: number): string {
  return typeof v === "string" && v.length <= max ? v.trim() : "";
}
function checkedAnswers(v: unknown): Answers | null {
  if (!isRecord(v)) return null;
  const result: Answers = {};
  for (const q of QUESTIONS) {
    if (typeof v[q.id] === "string" && q.choices.some(c => c.value === v[q.id]))
      result[q.id] = v[q.id] as string;
  }
  if (Object.keys(v).some(k => !QUESTIONS.some(q => q.id === k))) return null;
  return result.sector !== "other" && complete(result) ? result : null;
}
async function verifyTurnstile(token: string, secret: string, ip: string | null, expectedHostname: string) {
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  const answer = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method:"POST",body:form
  });
  if (!answer.ok) return false;
  const data: unknown = await answer.json();
  return isRecord(data) && data.success === true && data.hostname === expectedHostname;
}
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const configured = Boolean(
      env.DATABASE_URL && env.TURNSTILE_SECRET &&
      env.PRIVACY_VERSION === APPROVED_PRIVACY_VERSION &&
      env.ALLOWED_ORIGIN && !env.ALLOWED_ORIGIN.includes("replace-with")
    );
    if (url.pathname === "/health" && request.method === "GET") {
      return response({status: configured ? "ready" : "not_configured", version: VERSION},
        configured ? 200 : 503);
    }

    const origin = request.headers.get("Origin");
    // Los dos orígenes de web autorizados no habilitan acceso público de lectura de datos.
    const allowed = [env.ALLOWED_ORIGIN, env.ALLOWED_PREVIEW_ORIGIN].filter(Boolean);
    if (url.pathname === "/api/estado" && request.method === "GET") {
      if (!origin || !allowed.includes(origin))
        return response({error:"Origen no autorizado"},403);
      // Límite aproximado por origen de red; antes de consumir Neon.
      const statusLimit = await env.PUBLIC_API_RATE_LIMITER.limit({
        key: "evaluacion:" + (request.headers.get("CF-Connecting-IP") || "unknown")
      });
      if (!statusLimit.success) return response({error:"Demasiadas solicitudes"},429,origin);
      if (!configured)
        return response({status:"not_configured"},503,origin);
      try {
        // Además de verificar secrets, comprueba conectividad real con Neon.
        const sql = neon(env.DATABASE_URL);
        await sql`select 1 as conectado`;
        return response({status:"ready",privacyVersion:env.PRIVACY_VERSION},200,origin);
      } catch {
        return response({status:"unavailable"},503,origin);
      }
    }
    if (url.pathname !== "/api/evaluaciones") return response({error:"No encontrado"},404);
    if (!origin || !allowed.includes(origin)) return response({error:"Origen no autorizado"},403);
    if (!configured) return response({error:"Servicio no configurado"},503,origin);
    if (request.method === "OPTIONS")
      return new Response(null,{status:204,headers:{
        "Access-Control-Allow-Origin":origin,
        "Access-Control-Allow-Methods":"POST, OPTIONS",
        "Access-Control-Allow-Headers":"Content-Type",
        "Access-Control-Max-Age":"3600",Vary:"Origin"
      }});
    if (request.method !== "POST") return response({error:"Método no admitido"},405,origin);
    const submitLimit = await env.PUBLIC_API_RATE_LIMITER.limit({
      key: "evaluacion:" + (request.headers.get("CF-Connecting-IP") || "unknown")
    });
    if (!submitLimit.success) return response({error:"Demasiadas solicitudes"},429,origin);
    if (!(request.headers.get("Content-Type") || "").startsWith("application/json"))
      return response({error:"Tipo de contenido incorrecto"},415,origin);
    if (Number(request.headers.get("Content-Length") || 0) > 16000)
      return response({error:"Solicitud demasiado grande"},413,origin);
    let payload: unknown;
    try {
      const raw=await request.text();
      if(raw.length>16000) return response({error:"Solicitud demasiado grande"},413,origin);
      payload=JSON.parse(raw);
    } catch {return response({error:"JSON incorrecto"},400,origin);}
    if(!isRecord(payload)) return response({error:"Solicitud incorrecta"},400,origin);
    const a=checkedAnswers(payload.answers);
    const person=payload.contact;
    const consent=payload.privacyConsent === true;
    const version=asText(payload.privacyVersion,60);
    const token=asText(payload.turnstileToken,2500);
    if(!a || !isRecord(person) || !consent || version !== env.PRIVACY_VERSION)
      return response({error:"Respuestas o consentimiento incompletos"},400,origin);
    const name=asText(person.name,120);
    const email=asText(person.email,254);
    const phone=asText(person.phone,32) || null;
    if(name.length<2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !token)
      return response({error:"Datos de contacto incorrectos"},400,origin);
    const verified=await verifyTurnstile(token,env.TURNSTILE_SECRET,
      request.headers.get("CF-Connecting-IP"),new URL(origin).hostname);
    if(!verified) return response({error:"Verificación antiabuso fallida"},403,origin);
    const result=evaluate(a);
    if(result.status==="outside_scope") return response({error:"Sector fuera de alcance"},400,origin);
    const source=asText(payload.source,80) || null;
    try {
      const sql=neon(env.DATABASE_URL);
      const rows=await sql`
        with nueva as (
          insert into public.evaluaciones
            (version_cuestionario,sector,rol_declarante,respuestas,tipo_resultado,
             hallazgos_json,fortalezas_json,incertidumbres_json,origen)
          values
            (${VERSION}, ${a.sector}, ${a.role},
             ${JSON.stringify(a)}::jsonb, ${result.status},
             ${JSON.stringify(result.findings)}::jsonb,
             ${JSON.stringify(result.strengths)}::jsonb,
             ${JSON.stringify(result.unknowns)}::jsonb, ${source})
          returning id
        )
        insert into public.contactos_evaluacion
          (evaluacion_id,nombre,correo,telefono,consentimiento_contacto_en,
           version_aviso_privacidad,estado_reserva)
        select id, ${name}, ${email}, ${phone},now(),
               ${env.PRIVACY_VERSION},'sin_solicitar'
        from nueva returning evaluacion_id
      `;
      return response({ok:true,evaluationId:rows[0]?.evaluacion_id,status:result.status},201,origin);
    } catch {
      return response({error:"No se pudo guardar la solicitud"},503,origin);
    }
  },
  async scheduled(_controller: unknown, env: Env): Promise<void> {
    if (!env.DATABASE_URL) throw new Error("No se puede ejecutar retención sin DATABASE_URL");
    const sql = neon(env.DATABASE_URL);
    // ON DELETE CASCADE suprime también el contacto asociado; nunca expone PII en logs.
    // Una excepción contractual/legal sólo se conserva hasta retener_hasta.
    const rows = await sql`
      with vencidas as (
        delete from public.evaluaciones
        where creado_en < now() - interval '12 months'
          and (retener_hasta is null or retener_hasta <= now())
        returning id
      )
      select count(*)::int as eliminadas from vencidas
    `;
    console.log("Evaluaciones vencidas suprimidas:", rows[0]?.eliminadas ?? 0);
  }
};
