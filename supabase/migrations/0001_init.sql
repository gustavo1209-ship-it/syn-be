-- Schema inicial da plataforma pessoal de acompanhamento da parceria syn.Be

create extension if not exists "pgcrypto";

create type initiative_category as enum (
  'produto',
  'gtm_clientes',
  'investidores',
  'ciencia_credibilidade',
  'parcerias',
  'operacao'
);

create type initiative_status as enum (
  'ideia',
  'proposta',
  'em_andamento',
  'concluida',
  'descartada'
);

create type initiative_priority as enum ('alta', 'media', 'baixa');

create table initiatives (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  category initiative_category not null,
  status initiative_status not null default 'ideia',
  priority initiative_priority not null default 'media',
  impact_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table research_notes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null default '',
  category text not null,
  source_url text,
  created_at timestamptz not null default now()
);

create table competitors (
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
alter table initiatives enable row level security;
alter table research_notes enable row level security;
alter table competitors enable row level security;
