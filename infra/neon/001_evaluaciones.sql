-- Mindstack · BD independiente para Evaluación Empresarial (Neon PostgreSQL)
-- Sólo ejecutar en el proyecto Neon NUEVO. Nunca en Supabase del CRM.
-- Aplicar después de revisar aviso de privacidad, retención y acceso.
begin;

create extension if not exists pgcrypto;

create table if not exists public.evaluaciones (
  id uuid primary key default gen_random_uuid(),
  version_cuestionario text not null,
  sector text not null check (sector in ('restaurant', 'group')),
  rol_declarante text not null check (rol_declarante in ('owner', 'director', 'manager', 'other')),
  respuestas jsonb not null check (jsonb_typeof(respuestas) = 'object'),
  tipo_resultado text not null check (tipo_resultado in ('signals', 'uncertain', 'favorable')),
  hallazgos_json jsonb not null default '[]'::jsonb check (jsonb_typeof(hallazgos_json) = 'array'),
  fortalezas_json jsonb not null default '[]'::jsonb check (jsonb_typeof(fortalezas_json) = 'array'),
  incertidumbres_json jsonb not null default '[]'::jsonb check (jsonb_typeof(incertidumbres_json) = 'array'),
  origen text,
  creado_en timestamptz not null default now(),
  fecha_archivo timestamptz
);

create index if not exists idx_evaluaciones_creado
  on public.evaluaciones (creado_en desc);
create index if not exists idx_evaluaciones_tipo
  on public.evaluaciones (tipo_resultado, creado_en desc);

create table if not exists public.contactos_evaluacion (
  id uuid primary key default gen_random_uuid(),
  evaluacion_id uuid not null references public.evaluaciones(id) on delete cascade,
  nombre text not null check (char_length(nombre) between 2 and 120),
  correo text not null check (char_length(correo) between 5 and 254),
  telefono text check (telefono is null or char_length(telefono) <= 32),
  consentimiento_contacto_en timestamptz not null,
  version_aviso_privacidad text not null,
  consentimiento_marketing boolean not null default false,
  estado_reserva text not null default 'sin_solicitar'
    check (estado_reserva in ('sin_solicitar', 'solicitada', 'reservada', 'cancelada')),
  calendario_id text,
  creado_en timestamptz not null default now(),
  constraint uq_contacto_evaluacion unique (evaluacion_id)
);
create index if not exists idx_contactos_evaluacion_creado
  on public.contactos_evaluacion (creado_en desc);

-- Usuario aplicacion DB con permisos minimos; crear credenciales separadas
-- en Neon cuando configuremos despliegue. No exponer DATABASE_URL en frontend.
-- Las tablas no deben tener acceso directo publico ni API sin autenticar.
commit;
