-- Grupo Mindstack · Política de conservación de evaluaciones (12 meses)
-- Ejecutar exclusivamente en Neon de la evaluación empresarial, no en el CRM.
-- No elimina ningún registro en esta migración.
BEGIN;

ALTER TABLE public.evaluaciones
  ADD COLUMN IF NOT EXISTS retener_hasta timestamptz,
  ADD COLUMN IF NOT EXISTS motivo_retencion text;

-- Este índice ayuda a localizar registros vencidos en cada ejecución programada.
CREATE INDEX IF NOT EXISTS idx_evaluaciones_retencion
  ON public.evaluaciones (creado_en, retener_hasta);

COMMENT ON COLUMN public.evaluaciones.retener_hasta IS
  'Excepción justificada de conservación; si está en el futuro, no eliminar antes de esa fecha.';
COMMENT ON COLUMN public.evaluaciones.motivo_retencion IS
  'Motivo documentado de la excepción (por ejemplo, contrato vigente u obligación legal).';

COMMIT;
