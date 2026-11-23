# Mindstack · Evaluación Empresarial — puesta en producción

Estado: rama de desarrollo. No fusionar a main ni publicar producción hasta cerrar pruebas.
El CRM interno y su Supabase no se modifican.

## Componentes

- GitHub: Antonio958/mindstack-web, rama feature/evaluacion-empresarial-mvp-20261123.
- Web: Next.js 16 exportado a archivos estáticos y servido por Cloudflare Worker `mindstack-web`.
- API: carpeta worker para Cloudflare Workers.
- BD: Neon PostgreSQL nuevo. Esquema en infra/neon/001_evaluaciones.sql.
- Agenda: https://calendar.app.google/t7YPiSH7QzDKR7JC6 (proporcionado por Mindstack, incorporado como URL por defecto en evaluación).
- Neon: organización Mindstack, proyecto existente Mindstack (odd-silence-54841723), base neondb. Tablas evaluaciones y contactos_evaluacion confirmadas en el esquema público, vacías al verificar.

## 1. Cloudflare Workers — WEB YA CREADA

1. El usuario creó el Worker web actual: https://mindstack-web.luispalmhdz06.workers.dev/ (URL proporcionada por el usuario).
2. La conexión GitHub ya apunta al repo Antonio958/mindstack-web; el despliegue inicial de la rama main apareció correcto en el panel.
3. El despliegue del Worker usa comando `npm run build` y `npx wrangler deploy`.
4. Se añadió `wrangler.jsonc` en la rama de desarrollo, con `name: mindstack-web` y carpeta de assets `./out`, compatible con exportación estática Next.js.
5. La rama `main` es la publicada; la evaluación sigue en `feature/evaluacion-empresarial-mvp-20261123`.
6. Probar en una URL preview de Cloudflare antes de fusionar a main. No modificar el dominio principal ni eliminar Vercel antes de validar.
7. Tras desplegar al Worker, comprobar /, /evaluacion, 404, assets JS/CSS y móviles.
8. La API `mindstack-evaluacion-api` es otro Worker separado. No colocar `DATABASE_URL` en el Worker de la web.

## 2. Neon aislado

1. Ya existe proyecto Neon Mindstack (Free) separado del Supabase del CRM.
2. El usuario ejecutó infra/neon/001_evaluaciones.sql; se verificaron las tablas evaluaciones y contactos_evaluacion. No volver a aplicar el script sin revisar previamente el esquema.
3. Queda pendiente registrar la cadena DATABASE_URL como secreto de Cloudflare Worker, NUNCA en GitHub ni frontend.
4. Probar escritura y respaldo restaurable antes de recopilar información real.
5. Configurar límites y alertas de capacidad.

## 3. API Cloudflare Worker

1. Crear Worker `mindstack-evaluacion-api` desde el repositorio `Antonio958/mindstack-web`, directorio raíz del build `worker`. Mientras esté sin fusionar el PR, seleccionar la rama de producción `feature/evaluacion-empresarial-mvp-20261123` para este Worker API; `main` todavía no tiene la carpeta `worker`.
1a. Comando de compilación `npm install && npm run check`; comando de despliegue `npx wrangler deploy`. Debe servir inicialmente el endpoint `/health`; sin secretos de DB/Turnstile, las escrituras quedan bloqueadas (HTTP 503).
2. Usar worker/wrangler.jsonc; actualizar ALLOWED_ORIGIN al dominio EXACTO de Pages.
3. Configurar secretos: DATABASE_URL, TURNSTILE_SECRET, PRIVACY_VERSION.
4. Configurar Turnstile para dominio público y obtener clave pública.
5. Activar protección antiabuso/rate limiting de Cloudflare y monitoreo de errores.
6. Comprobar GET /health y POST /api/evaluaciones con evaluación de prueba.
7. Confirmar que no existe GET público de datos comerciales y que nunca se exponen secretos.

## 4. Variables de entorno del frontend

En variables de entorno de build del Worker web en Cloudflare configurar:
- NEXT_PUBLIC_DISCOVERY_BOOKING_URL: https://calendar.app.google/t7YPiSH7QzDKR7JC6 (ya existe como valor por defecto en el código, pero configurar explícitamente para producción).
- NEXT_PUBLIC_EVALUACION_API_URL: URL completa HTTPS de API Worker (termina /api/evaluaciones).
- NEXT_PUBLIC_TURNSTILE_SITE_KEY: clave pública de Turnstile.
- NEXT_PUBLIC_AVISO_PRIVACIDAD_URL: aviso real aprobado y accesible.
- NEXT_PUBLIC_AVISO_PRIVACIDAD_VERSION: mismo texto que PRIVACY_VERSION del Worker.

Por seguridad, el formulario voluntario de datos permanece OCULTO si la API, clave Turnstile y aviso no están configurados. El cuestionario y la lectura inicial sí funcionan sin servidor; no transmiten respuestas.

## 5. Agenda de discovery

Crear Google Calendar Appointment Schedule con:
- Duración y disponibilidad del equipo
- Zona horaria America/Mexico_City
- Tiempo mínimo entre reservas
- Reglas de cancelación y confirmación
Copiar enlace público a NEXT_PUBLIC_DISCOVERY_BOOKING_URL y comprobar reserva de prueba.

## 6. Antes del lanzamiento

- Aviso de privacidad válido: responsable, finalidades, derechos y conservación.
- Consentimiento separado para contacto y publicidad; sin casillas premarcadas.
- QA completo de resultados favorables, señales, incertidumbre y fuera de sector.
- Protecciones Turnstile, CORS, controles de acceso y tasa.
- Restauración de respaldo de prueba y retención.
- Integración al CRM mediante API segura posterior, sin conectar cliente público a Supabase.
- Medición de inicios, finalizaciones, citas y discoveries reales.

## Compilación y pruebas

- Web: npm ci; npm run build. Salida out.
- Reglas: node --experimental-strip-types --test tests/evaluacion.test.mjs
- Worker: cd worker; npm install; npm run check

Nunca incluir credenciales, registros reales o datos de prospectos en GitHub público.

## Estado de la integración — 23 de noviembre de 2026

- Neon: confirmado. Tablas existentes, 0 filas al comprobar.
- Agenda: enlace incorporado en app/evaluacion/page.tsx. La apertura pública de la agenda debe probarse en navegación incógnita; este enlace NO sincroniza por sí mismo el ID de evaluación con el evento de Calendar.
- Frontend: sólo rama feature; main aún sin los cambios.
- Cloudflare: Worker web existente en https://mindstack-web.luispalmhdz06.workers.dev/ ; primera compilación en main reportada correcta en captura del usuario, pero no se ha verificado acceso externo desde las herramientas de este chat. La configuración de assets de la evaluación está preparada en wrangler.jsonc de la rama feature.
- API: no desplegada; captación con consentimiento y Turnstile bloqueada por ausencia de variables de despliegue.
- Cambiar estado de reserva a sin_solicitar cuando solo se comparten respuestas: ya corregido en Worker.
- El calendario principal reportó previamente zona UTC; verificar disponibilidad de la página de reservas en America/Mexico_City.

## Verificación del deploy actual

URL de Worker web: https://mindstack-web.luispalmhdz06.workers.dev/ . El proyecto se identifica como Worker (no Pages). No crear un nuevo proyecto Pages por ahora. Confirmar en Cloudflare que el Worker sirve los HTML exportados, y revisar los deployments por rama.

## API Worker detectado y preparado

- URL pública confirmada por usuario: https://mindstack-evaluacion-api.luispalmhdz06.workers.dev/
- Comprobar manualmente desde navegador: https://mindstack-evaluacion-api.luispalmhdz06.workers.dev/health
- Sin secretos, `/health` debe devolver HTTP 503 y JSON `{"status":"not_configured","version":"0.1.0"}`. No significa error de deploy, significa que la captación está bloqueada.
- El frontend preview es `https://feature-evaluacion-empresarial-mvp-20261123-mindstack-web.luispalmhdz06.workers.dev`. El Worker admite este origen exacto y el origen de producción con `ALLOWED_PREVIEW_ORIGIN` y `ALLOWED_ORIGIN`.
- Crear widget Cloudflare Turnstile con los dos HOSTNAMES de la web, sin protocolo ni path, NO el de la API:
  - `mindstack-web.luispalmhdz06.workers.dev`
  - `feature-evaluacion-empresarial-mvp-20261123-mindstack-web.luispalmhdz06.workers.dev`
- La site key de Turnstile es pública y se configura durante build como `NEXT_PUBLIC_TURNSTILE_SITE_KEY`. La secret key va SOLO al Worker API como secreto `TURNSTILE_SECRET`.
- Cloudflare Worker API > Settings > Variables and Secrets: `DATABASE_URL` (tipo Secret, URL Neon), `TURNSTILE_SECRET` (tipo Secret), `PRIVACY_VERSION` (texto de versión de aviso aprobado, no activar antes de publicar aviso).
- Frontend web preview > Settings > Builds > Previews Base: `NEXT_PUBLIC_EVALUACION_API_URL=https://mindstack-evaluacion-api.luispalmhdz06.workers.dev/api/evaluaciones`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `NEXT_PUBLIC_AVISO_PRIVACIDAD_URL`, `NEXT_PUBLIC_AVISO_PRIVACIDAD_VERSION`. Estas 4 deben existir para habilitar el envío opcional de contactos; deben coincidir las versiones.
- El enlace de Calendar no garantiza sincronía de cita y evaluación: conectar leads con CRM y confirmación de reservas en otra fase.
- Seguridad: no colocar `DATABASE_URL` en variables de compilación ni en cliente; no enviar la cadena por chat.
- Antes de captar datos reales: aprobar aviso, probar endpoint, límites antiabuso y restauración de respaldos.

## Depuración del fallo 404 en /health (23-nov-2026)

- En la configuración de Cloudflare del Worker `mindstack-evaluacion-api`, el directorio raíz debe ser `worker`.
- La compilación debe ejecutar `npm run build` y el deploy `npx wrangler deploy`. `worker/package.json` define `build`.
- Se detectó que Wrangler estaba leyendo el `wrangler.jsonc` del sitio web desde el nivel superior, lo que fallaba por ausencia de `out` en el build de la API.
- Se creó `worker/wrangler.jsonc` con el nombre de servicio `mindstack-evaluacion-api`, entrypoint `src/index.ts` y dominios exactos; eliminamos `worker/wrangler.toml` para evitar dobles fuentes de configuración.
- GitHub Actions verifica TypeScript, el build de la API y `cd worker && npx wrangler deploy --dry-run --outdir ../.wrangler-api-check`. La primera ejecución tras crear el archivo JSONC terminó correctamente y empaquetó 220.73 KiB.
- `/health` devuelve `{"status":"not_configured", ...}` con HTTP 503 mientras no haya secretos. Es el resultado correcto antes de habilitar captación.
- GitHub Actions dry-run no publica el Worker ni prueba la URL en producción. Se debe confirmar el deploy automático de Cloudflare antes de afirmar que el 404 desapareció.
