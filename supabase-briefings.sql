-- Execute this script once in Supabase > SQL Editor.
-- The application accesses this table only from the server with SERVICE_ROLE.

create table if not exists public.briefings (
  id uuid primary key,
  created_at timestamptz not null default now(),
  locale text not null check (locale in ('pt-BR', 'en')),
  name text not null,
  role text,
  role_other text,
  business_name text,
  has_name boolean not null,
  segment text not null,
  stage text not null,
  primary_need text not null,
  naming_status text,
  existing_logo text,
  rebranding_reasons text[],
  website_type text,
  motivation text not null,
  desired_change text,
  references_text text,
  timeline text not null,
  specific_date date,
  email text not null,
  phone text,
  preferred_channel text not null,
  business_profile text,
  raw_data jsonb not null default '{}'::jsonb
);

create index if not exists briefings_created_at_idx
  on public.briefings (created_at desc);

-- RLS protects the table from direct browser access. The server-side service
-- role used by the application bypasses RLS, so no public policy is needed.
alter table public.briefings enable row level security;
