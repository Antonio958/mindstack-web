-- PREPARACION. No ejecutar automáticamente.
-- Probar en rama aislada de Neon. Crear login dedicado con secreto mediante
-- consola segura; no guardar contraseñas en Git ni en logs.
BEGIN;
CREATE ROLE mindstack_evaluacion_runtime NOLOGIN NOINHERIT NOCREATEDB NOCREATEROLE NOBYPASSRLS;
GRANT USAGE ON SCHEMA public TO mindstack_evaluacion_runtime;
GRANT INSERT (version_cuestionario,sector,rol_declarante,respuestas,tipo_resultado,hallazgos_json,fortalezas_json,incertidumbres_json,origen)
  ON public.evaluaciones TO mindstack_evaluacion_runtime;
GRANT SELECT (id,creado_en,retener_hasta), DELETE ON public.evaluaciones TO mindstack_evaluacion_runtime;
GRANT INSERT (evaluacion_id,nombre,correo,telefono,consentimiento_contacto_en,version_aviso_privacidad,estado_reserva),
  SELECT (evaluacion_id) ON public.contactos_evaluacion TO mindstack_evaluacion_runtime;
-- DELETE is temporarily required by the existing scheduled retention handler.
-- Next phase: split retention into a dedicated worker/role.
-- Grant this group to a dedicated LOGIN role with INHERIT, without owner
-- membership. Verify effective privileges and run insert/retention tests.
-- Never grant broad SELECT on prospect tables to the web runtime.
COMMIT;
