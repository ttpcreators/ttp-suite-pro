-- TTP Suite — migration 0003 : authentification réelle + verrouillage des accès
--
-- Objectif (priorité sécurité de l'audit) :
--   1) Brancher l'app sur la vraie authentification Supabase (comptes email + mot de passe).
--   2) Fermer l'accès ANONYME ouvert : seules les sessions AUTHENTIFIÉES peuvent lire/écrire.
--   3) Table `profiles` : associe chaque compte à un rôle (agence / créateur).
--
-- ⚠️ À exécuter dans Supabase → SQL Editor APRÈS avoir créé les comptes (voir README).
--    Tant que ce script n'est pas lancé, l'app continue de fonctionner en mode actuel.

-- ============================================================
-- 1. PROFILES : rôle de chaque utilisateur authentifié
-- ============================================================
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'creator',        -- 'agency' | 'creator'
  creator_name text,                            -- nom exact du créateur (si role='creator')
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
drop policy if exists profiles_self on public.profiles;
-- chacun lit son propre profil (pour connaître son rôle au login)
create policy profiles_self on public.profiles
  for select to authenticated using (user_id = auth.uid());

-- ============================================================
-- 2. VERROUILLAGE : authentifié uniquement (plus d'accès anonyme)
--    Workspace agence partagé : tout utilisateur connecté accède au plan de
--    travail de l'agence. (Cloisonnement par créateur = chantier relationnel
--    ultérieur — voir README, "Tranche 3".)
-- ============================================================
do $$
declare t text;
begin
  foreach t in array array['invoices','contacts','prospects','todos','briefs','ideas','events','module_rows','creators']
  loop
    execute format('alter table public.%I enable row level security;', t);
    -- retire l'ancienne politique anonyme ouverte
    execute format('drop policy if exists %I on public.%I;', t||'_anon_all', t);
    execute format('drop policy if exists %I on public.%I;', t||'_auth_all', t);
    -- nouvelle politique : lecture + écriture pour les comptes connectés seulement
    execute format('create policy %I on public.%I for all to authenticated using (true) with check (true);', t||'_auth_all', t);
  end loop;
end $$;

-- ============================================================
-- 3. (Optionnel) création automatique d'un profil vide à l'inscription
--    Pratique si tu crées les comptes via l'API ; sinon, insère les profils
--    à la main (voir README, étape 3).
-- ============================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (user_id, role)
  values (new.id, 'creator')
  on conflict (user_id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
