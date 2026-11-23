# Mindstack · Evaluación Empresarial — puesta en producción

Estado: rama de desarrollo. No fusionar a main ni publicar producción hasta cerrar pruebas.
El CRM interno y su Supabase no se modifican.

## Componentes

- GitHub: Antonio958/mindstack-web, rama feature/evaluacion-empresarial-mvp-20261123.
- Web: Next.js 16 estático para Cloudflare Pages.
- API: carpeta worker para Cloudflare Workers.
- BD: Neon PostgreSQL nuevo. Esquema en infra/neon/001_evaluaciones.sql.
- Agenda: enlace de reserva de Google Calendar pendiente.

## 1. Cuenta Cloudflare

1. Abrir https://dash.cloudflare.com/sign-up e ingresar o crear cuenta.
2. Workers & Pages > Create > Pages > Connect to Git.
3. Autorizar acceso al repositorio Antonio958/mindstack-web.
4. Crear sitio Pages mindstack-web, producción futura desde main.
5. Construcción: Next.js (Static HTML Export), comando npm run build, salida out, Node 22.
6. Activar vista Preview para rama feature/evaluacion-empresarial-mvp-20261123.
7. Verificar homepage y /evaluacion en escritorio y móvil.
8. Mantener Vercel actual hasta validar el nuevo sitio; NO eliminarlo prematuramente.

## 2. Neon aislado

1. Crear un proyecto independiente llamado mindstack-evaluacion en plan gratuito.
2. Aplicar archivo infra/neon/001_evaluaciones.sql en el editor SQL de Neon.
3. Guardar la conexión DATABASE_URL como secreto del Worker, NUNCA en GitHub ni frontend.
4. Probar escritura, lectura administrativa y respaldo restaurable.
5. Configurar límites y alertas de capacidad.

## 3. API Cloudflare Worker

1. Crear Worker mindstack-evaluacion-api desde el mismo repositorio, directorio worker.
2. Usar worker/wrangler.toml; actualizar ALLOWED_ORIGIN al dominio EXACTO de Pages.
3. Configurar secretos: DATABASE_URL, TURNSTILE_SECRET, PRIVACY_VERSION.
4. Configurar Turnstile para dominio público y obtener clave pública.
5. Activar protección antiabuso/rate limiting de Cloudflare y monitoreo de errores.
6. Comprobar GET /health y POST /api/evaluaciones con evaluación de prueba.
7. Confirmar que no existe GET público de datos comerciales y que nunca se exponen secretos.

## 4. Variables de entorno del frontend

En Cloudflare Pages configurar:
- NEXT_PUBLIC_DISCOVERY_BOOKING_URL: enlace real de reservas de Google Calendar.
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
