# Mindstack — seguridad operativa

## Alcance
Web pública y API de evaluación, no CRM ni datos de proyectos de clientes.
Cambios de este PR: encabezados en assets, CSP compatible con exportación estática, límite de 16 KB reales por solicitud, errores controlados de Turnstile, auditoría npm y pruebas de regresión. La CSP permite scripts inline por compatibilidad con Next export; migrar a hashes generados por build después de pruebas. No autoriza eval ni hosts arbitrarios.

## Antes de integrar
- Confirmar preview y pruebas de encabezados, navegación, imágenes y evaluación.
- El preview de seguridad no tiene permiso para guardar prospectos en producción. Pruebas de UI simulan readiness y bloquean POST; no equivalen a Turnstile real.
- Confirmar npm audit, resolver hallazgos altos/críticos aplicables; no usar npm audit fix --force.
- Mantener aclaraciones de los resultados hipotéticos; las tres leyendas sobre fotos se retiran. Fotos de Unsplash (referencias originales en app/page.tsx); verificar condiciones de licencia de cada recurso.

## Neon: transición independiente, sin cambios automáticos
1. Probar 003_permisos_minimos_PREPARACION.sql en rama aislada con datos sintéticos, no copiar PII innecesaria.
2. Crear login de aplicación independiente, otorgar grupo restringido y verificar que no hereda privilegios de propietario. Probar inserción, referencia devuelta, retención, y denegación de lectura de correo/nombre.
3. Configurar DATABASE_URL como secreto de Worker (TLS); no incluir en chat, commits ni frontend. Mantener posibilidad de revertir hasta validar registro y cron. No revocar credenciales antiguas sin verificar otros usos.
4. Separar retención y futuro acceso comercial en roles independientes. Revisar RLS para bandeja autenticada. Proteger rama de producción según plan.
5. Revisar conectividad pública con credenciales y opciones de red del plan. No bloquear IPs de Workers sin ruta compatible.
6. Probar recuperación en rama independiente; registrar RPO y RTO, retención real y procedimiento de restauración. No afirmar respaldo suficiente sin prueba.

## Cuentas y monitoreo
- MFA/passkeys y recuperación segura: Cloudflare, GitHub, Neon, correo institucional. Revisar colaboradores y tokens; permisos mínimos.
- Proteger main con PR, revisiones y checks obligatorios cuando el plan lo permita; no bloquear recuperación.
- Activar Dependabot, secret scanning/push protection y análisis estático si disponibles. Revisar historial sin imprimir secretos. Si se detecta una clave real, revocar/rotar de manera coordinada.
- Cloudflare: observar 4xx/5xx, volumen anómalo y resultado Turnstile; evitar logs de cuerpos o PII. Alertas internas y responsable de seguimiento. No asumir WAF personalizado de dominio en workers.dev.
- Tras lanzamiento, comprobar origen permitido, rechazo de origen no autorizado, límites y formulario con una evaluación de prueba consentida; verificar referencia y almacenamiento.

## Incidente
Responsable designado: contener, conservar evidencia sin divulgar PII, rotar credenciales afectadas, evaluar alcance y obligaciones legales, restaurar versión segura, verificar y documentar. No borrar evidencia. Mantener canal de comunicación interno.

## Costos
Priorizar herramientas disponibles y no activar funciones pagadas sin autorización. Las capacidades de alertas, restauración y protección de ramas pueden depender del plan.
