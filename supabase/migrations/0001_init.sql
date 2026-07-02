-- Schema inicial da plataforma pessoal de acompanhamento da parceria syn.Be
-- Tabelas prefixadas com synbe_ porque o projeto Supabase é compartilhado com outros apps do usuário.

create extension if not exists "pgcrypto";

create type synbe_initiative_category as enum (
  'produto',
  'gtm_clientes',
  'investidores',
  'ciencia_credibilidade',
  'parcerias',
  'operacao'
);

create type synbe_initiative_status as enum (
  'ideia',
  'proposta',
  'em_andamento',
  'concluida',
  'descartada'
);

create type synbe_initiative_priority as enum ('alta', 'media', 'baixa');

create table synbe_initiatives (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  category synbe_initiative_category not null,
  status synbe_initiative_status not null default 'ideia',
  priority synbe_initiative_priority not null default 'media',
  impact_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table synbe_research_notes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null default '',
  category text not null,
  source_url text,
  created_at timestamptz not null default now()
);

create table synbe_competitors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text,
  positioning text,
  funding text,
  notes text,
  created_at timestamptz not null default now()
);

-- RLS habilitado sem policies: apenas o service_role (usado pelo backend) acessa as tabelas.
-- Ferramenta de uso pessoal, sem chave anon exposta ao frontend.
alter table synbe_initiatives enable row level security;
alter table synbe_research_notes enable row level security;
alter table synbe_competitors enable row level security;
