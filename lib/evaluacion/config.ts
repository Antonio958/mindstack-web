/** Configuración pública compartida por la web, el aviso y el Worker de evaluación.
 * No introducir secretos en este archivo.
 */
export const PRIVACY_VERSION = "2026-11-23-v2";
export const PRIVACY_PATH = "/aviso-de-privacidad/";
export const EVALUACION_API_URL = "https://mindstack-evaluacion-api.grupomindstack.workers.dev/api/evaluaciones";
export const TURNSTILE_SITE_KEY = "0x4AAAAAAGPUHIprbjhv5LWX";

/** Durante la transición se selecciona la API únicamente por un hostname institucional conocido. */
export const NEW_ACCOUNT_SUBDOMAIN = "grupomindstack.workers.dev";
export const MIGRATION_ORIGINS = [
  "https://mindstack-web.grupomindstack.workers.dev",
  "https://feature-evaluacion-empresarial-mvp-20261123-mindstack-web.grupomindstack.workers.dev",
] as const;

export function evaluationApiForHostname(hostname: string, fallback = EVALUACION_API_URL): string {
  if (MIGRATION_ORIGINS.some(origin => origin === "https://" + hostname) && hostname.endsWith("." + NEW_ACCOUNT_SUBDOMAIN)) {
    return "https://mindstack-evaluacion-api.grupomindstack.workers.dev/api/evaluaciones";
  }
  return fallback;
}
