import type { Answers } from "./motor";

export type ContactoEvaluacion = {
  name: string;
  email: string;
  phone?: string;
};

export type SolicitudEvaluacion = {
  answers: Answers;
  contact: ContactoEvaluacion;
  privacyVersion: string;
  turnstileToken: string;
  source: string;
};

/**
 * Antes de mostrar el formulario, verifica origen CORS, conectividad
 * con Neon y coincidencia con el aviso de privacidad publicado.
 */
export async function comprobarDisponibilidad(
  apiUrl: string,
  privacyVersion: string,
  signal?: AbortSignal
): Promise<boolean> {
  const statusUrl = apiUrl.replace(/\/api\/evaluaciones$/, "/api/estado");
  try {
    const response = await fetch(statusUrl, { signal, cache: "no-store" });
    if (!response.ok) return false;
    const data: unknown = await response.json();
    if (!data || typeof data !== "object") return false;
    const estado = data as Record<string, unknown>;
    return estado.status === "ready" && estado.privacyVersion === privacyVersion;
  } catch {
    return false;
  }
}

/**
 * La información personal nunca se envía sin un clic explícito y
 * consentimiento afirmativo en la interfaz. El backend revalida todo.
 */
export async function compartirEvaluacion(
  apiUrl: string,
  solicitud: SolicitudEvaluacion
): Promise<string> {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...solicitud,
      privacyConsent: true
    })
  });
  const data: unknown = await response.json();
  if (!response.ok || !data || typeof data !== "object" ||
      (data as Record<string, unknown>).ok !== true) {
    throw new Error("No se pudo registrar la evaluación.");
  }
  const reference = (data as Record<string, unknown>).evaluationId;
  if (typeof reference !== "string" || !reference) {
    throw new Error("La API no devolvió una referencia válida.");
  }
  return reference;
}
