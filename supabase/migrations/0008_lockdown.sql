-- TTP Suite — migration 0008 : VERROUILLAGE des tables restées ouvertes
--
-- Contexte : la 0003 (qui devait fermer l'accès anonyme) n'a jamais été lancée,
-- alors que la 0006 l'a été. Résultat : creators / contacts / prospects /
-- invoices / module_rows sont LISIBLES sans être connecté (la clé publique est
-- dans le HTML). Cette migration ferme ça, en cohérence avec l'isolation 0006 :
--   • anonyme           → AUCUN accès
--   • agence            → accès total
--   • créateur connecté → uniquement SA fiche (table creators) ; pas d'accès aux
--                         données agence (contacts / factures / prospects / blob)
--
-- ⚠️ À exécuter dans Supabase → SQL Editor APRÈS 0006 (les fonctions is_agency()
--    et my_creator() doivent exister, et le compte agence doit avoir le rôle
--    'agency'). Ordre sûr : on (ré)affirme le rôle agence d'abord → pas de lock-out.

-- 0) Filet de sécurité : (ré)affirme le rôle agence avant d'activer le verrou.
insert into public.profiles (user_id, role)
  select id, 'agency' from auth.users
   where email in ('partnerships@ttpcreators.pro','marcbouraoui@gmail.com','agence@ttp.com')
  on conflict (user_id) do update set role = 'agency';

-- 1) CREATORS : agence = tout ; créateur = uniquement sa propre fiche.
alter table public.creators enable row level security;
drop policy if exists creators_anon_all   on public.creators;
drop policy if exists creators_anon_read   on public.creators;
drop policy if exists creators_anon_write  on public.creators;
drop policy if exists creators_auth_all    on public.creators;
drop policy if exists creators_scoped      on public.creators;
create policy creators_scoped on public.creators for all to authenticated
  using (public.is_agency() or name = public.my_creator())
  with check (public.is_agency() or name = public.my_creator());

-- 2) Données AGENCE pures (contacts, factures, prospects, blob d'état) :
--    réservées aux comptes agence. Anonyme et créateurs n'y ont pas accès.
do $$
declare t text;
begin
  foreach t in array array['contacts','invoices','prospects','module_rows']
  loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('drop policy if exists %I on public.%I;', t||'_anon_all',  t);
    execute format('drop policy if exists %I on public.%I;', t||'_anon_read', t);
    execute format('drop policy if exists %I on public.%I;', t||'_anon_write',t);
    execute format('drop policy if exists %I on public.%I;', t||'_auth_all',  t);
    execute format('drop policy if exists %I on public.%I;', t||'_agency',    t);
    execute format($f$create policy %I on public.%I for all to authenticated
      using (public.is_agency()) with check (public.is_agency());$f$, t||'_agency', t);
  end loop;
end $$;

-- 3) Vérif rapide (doit renvoyer 0 ligne en anonyme) :
--    select * from public.creators;   -- en étant déconnecté → vide
