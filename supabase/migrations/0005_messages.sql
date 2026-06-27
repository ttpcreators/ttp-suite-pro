-- TTP Suite — migration 0005 : messages (1 ligne par message)
--
-- Remplace le stockage des conversations dans le blob JSON partagé par une vraie
-- table, pour passer à l'échelle (historique illimité, isolation par créateur).
-- À exécuter après 0001-0004.

create extension if not exists "pgcrypto";

create table if not exists public.messages (
  id          uuid primary key default gen_random_uuid(),
  thread_key  text not null,                 -- 0,1,2… (campagnes/broadcast) ou 'cdm:NOM'
  sender      text not null default 'me',     -- 'me' (créateur) | 'agency'
  body        text not null,
  creator     text,                           -- nom du créateur rattaché au fil
  sort_order  int default 0,
  created_at  timestamptz default now()
);

create index if not exists messages_thread_idx  on public.messages (thread_key, created_at);
create index if not exists messages_creator_idx on public.messages (creator);

alter table public.messages enable row level security;

-- RLS : par défaut, tout utilisateur authentifié (workspace partagé), comme 0003.
drop policy if exists messages_auth_all on public.messages;
create policy messages_auth_all on public.messages for all to authenticated
  using (true) with check (true);

-- ISOLATION PAR CRÉATEUR (opt-in) — décommente après avoir donné le rôle agence
-- (voir 0004). L'agence voit tout ; un créateur ne voit que ses fils.
-- drop policy if exists messages_auth_all on public.messages;
-- drop policy if exists messages_scoped  on public.messages;
-- create policy messages_scoped on public.messages for all to authenticated
--   using (public.is_agency() or creator = public.my_creator())
--   with check (public.is_agency() or creator = public.my_creator());
