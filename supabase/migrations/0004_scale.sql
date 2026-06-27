-- TTP Suite — migration 0004 : passage à l'échelle (100+ créateurs)
--
-- Objectif :
--   1) PERFORMANCE — index sur les colonnes de tri / filtrage, pour que les listes
--      restent rapides avec des dizaines de milliers de lignes.
--   2) ISOLATION PAR CRÉATEUR (optionnelle, opt-in) — fonctions + politiques RLS
--      pour que chaque créateur ne voie QUE ses propres lignes, l'agence voyant tout.
--
-- ⚠️ À exécuter APRÈS 0001/0002/0003. Sans risque : n'altère aucune donnée.

-- ============================================================
-- 1. INDEX (lecture rapide à grande échelle)
-- ============================================================
create index if not exists creators_sort_idx  on public.creators (sort_order);
create index if not exists contacts_sort_idx   on public.contacts  (sort_order);
create index if not exists prospects_sort_idx  on public.prospects (sort_order);
create index if not exists invoices_sort_idx   on public.invoices  (sort_order);
create index if not exists todos_creator_idx   on public.todos     (creator);
create index if not exists briefs_creator_idx  on public.briefs    (creator);
create index if not exists ideas_creator_idx   on public.ideas     (creator);
create index if not exists events_who_idx       on public.events    (who);

-- ============================================================
-- 2. HELPERS RÔLE (lisent la table profiles de 0003)
-- ============================================================
create or replace function public.is_agency() returns boolean
  language sql stable security definer as $$
  select coalesce((select p.role = 'agency' from public.profiles p where p.user_id = auth.uid()), false);
$$;

create or replace function public.my_creator() returns text
  language sql stable security definer as $$
  select creator_name from public.profiles where user_id = auth.uid();
$$;

-- ============================================================
-- 3. ISOLATION PAR CRÉATEUR (OPT-IN)
--    Décommente ce bloc UNIQUEMENT après avoir donné le rôle 'agency' au compte
--    agence :  update public.profiles set role='agency' where user_id='<uuid agence>';
--    Sinon, garde 0003 (tout authentifié = accès workspace partagé).
-- ============================================================
-- do $$
-- declare t text;
-- begin
--   foreach t in array array['todos','briefs','ideas','events']
--   loop
--     execute format('drop policy if exists %I on public.%I;', t||'_auth_all', t);
--     execute format('drop policy if exists %I on public.%I;', t||'_scoped', t);
--     execute format($f$create policy %I on public.%I for all to authenticated
--        using (public.is_agency() or creator = public.my_creator())
--        with check (public.is_agency() or creator = public.my_creator());$f$, t||'_scoped', t);
--   end loop;
--   -- events utilise la colonne "who" au lieu de "creator"
--   drop policy if exists events_scoped on public.events;
--   create policy events_scoped on public.events for all to authenticated
--     using (public.is_agency() or who = public.my_creator())
--     with check (public.is_agency() or who = public.my_creator());
-- end $$;
