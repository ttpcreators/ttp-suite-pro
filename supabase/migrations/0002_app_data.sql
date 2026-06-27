-- TTP Suite — migration 0002 : tables de données applicatives (persistance cross-device)
--
-- Contexte : aujourd'hui l'app persiste les ajouts/suppressions/édits via localStorage
-- (donc « définitif » sur l'appareil/navigateur courant). Pour une persistance partagée
-- entre l'ordinateur et le téléphone (et entre l'espace agence et l'espace créateur),
-- appliquer cette migration puis brancher l'app sur ces tables (voir supabase/README.md).
--
-- La clé publishable (anon) est publique par design : la sécurité repose sur le RLS.
-- Ici on ouvre lecture/écriture à anon (app mono-agence sans auth). Resserrer si besoin.

create extension if not exists "pgcrypto";

-- helper : applique le même RLS « ouvert à anon » à une table
-- (exécuté manuellement par table ci-dessous pour rester lisible)

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  ref text, party text, amount text, date text, status text default 'brouillon',
  sort_order int default 0, created_at timestamptz default now()
);

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  brand text not null, person text, role text, tag text,
  email text, phone text, tone text default 'cyan',
  sort_order int default 0, created_at timestamptz default now()
);

create table if not exists public.prospects (
  id uuid primary key default gen_random_uuid(),
  brand text not null, contact text, value text,
  stage text default 'Prospection', tone text default 'cyan',
  sort_order int default 0, created_at timestamptz default now()
);

create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  text text not null, descr text, tag text, due text,
  creator text, priority text default 'moyenne', source text default 'agency',
  done boolean default false, sort_order int default 0, created_at timestamptz default now()
);

create table if not exists public.briefs (
  id uuid primary key default gen_random_uuid(),
  brand text, creator text, who text, deliverables text, due text,
  status text default 'cours', tone text default 'cyan',
  consignes text, budget text, objectif text, validated boolean default false,
  note text, sort_order int default 0, created_at timestamptz default now()
);

create table if not exists public.ideas (
  id uuid primary key default gen_random_uuid(),
  text text not null, creator text, status text default 'À explorer',
  source text default 'agency', sort_order int default 0, created_at timestamptz default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  day int, time text, title text, type text default 'call', who text,
  sort_order int default 0, created_at timestamptz default now()
);

create table if not exists public.module_rows (
  id uuid primary key default gen_random_uuid(),
  module text not null,           -- checklist | debrief | templates | rosterugc | …
  a text, b text, c text, tone text default 'cyan',
  sort_order int default 0, created_at timestamptz default now()
);

-- RLS : ouvert à anon (lecture + écriture). À restreindre si vous ajoutez de l'auth.
do $$
declare t text;
begin
  foreach t in array array['invoices','contacts','prospects','todos','briefs','ideas','events','module_rows']
  loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('drop policy if exists %I on public.%I;', t||'_anon_all', t);
    execute format('create policy %I on public.%I for all to anon using (true) with check (true);', t||'_anon_all', t);
  end loop;
end $$;
