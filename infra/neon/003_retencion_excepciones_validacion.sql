-- Grupo Mindstack · Retención: impedir excepciones sin una justificación.
-- Esta migración no borra ni modifica evaluaciones existentes.
-- Aplicar solo al proyecto Neon de evaluación empresarial, nunca al CRM.
BEGIN;
ALTER TABLE public.evaluaciones
  ADD CONSTRAINT chk_retencion_motivo_documentado
  CHECK (
    retener_hasta IS NULL OR
    (motivo_retencion IS NOT NULL AND char_length(btrim(motivo_retencion)) BETWEEN 5 AND 500)
  );
COMMIT;
