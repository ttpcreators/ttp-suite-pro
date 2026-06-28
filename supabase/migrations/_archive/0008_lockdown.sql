-- TTP Suite — migration 0008 : VERROUILLAGE des tables restées ouvertes
--
-- Contexte : la 0003 (qui devait fermer l'accès anonyme) n'a jamais été lancée,
-- alors que la 0006 l'a été. Résultat : creators / contacts / prospects /
-- invoices / module_rows sont LISIBLES sans être connecté (la clé publique est
-- dans le HTML). Cette migration ferme ça, en cohérence avec l'isolation 0006 :
--   • anonyme           → AUCUN accès
--   • agence            → accès total
--   • créateur connecté → uniquement SA fiche (table creators)
--
-- IMPORTANT : on supprime DYNAMIQUEMENT *toutes* les policies existantes sur ces
-- tables (y compris d'anciennes policies permissives `to public` créées par les
-- assistants Supabase) avant d'en recréer de strictes — sinon une vieille policy
-- ouverte laisse l'accès anonyme actif malgré le RLS.
--
-- ⚠️ À exécuter dans Supabase → SQL Editor APRÈS 0006 (fonctions is_agency() /
--    my_creator() requises). Ordre sûr : on (ré)affirme le rôle agence d'abord.

-- 0) Filet de sécurité : (ré)affirme le rôle agence avant d'activer le verrou.
insert into public.profiles (user_id, role)
  select id, 'agency' from auth.users
   where email in ('partnerships@ttpcreators.pro','marcbouraoui@gmail.com','agence@ttp.com')
  on conflict (user_id) do update set role = 'agency';

-- 1) Purge de TOUTES les policies existantes sur les 5 tables concernées.
do $$
declare r record;
begin
  for r in
    select policyname, tablename from pg_policies
     where schemaname = 'public'
       and tablename in ('creators','contacts','invoices','prospects','module_rows')
  loop
    execute format('drop policy if exists %I on public.%I;', r.policyname, r.tablename);
  end loop;
end $$;

-- 2) RLS activé partout + policies strictes.
alter table public.creators    enable row level security;
alter table public.contacts    enable row level security;
alter table public.invoices    enable row level security;
alter table public.prospects   enable row level security;
alter table public.module_rows enable row level security;

-- CREATORS : agence = tout ; créateur = sa propre fiche.
create policy creators_scoped on public.creators for all to authenticated
  using (public.is_agency() or name = public.my_creator())
  with check (public.is_agency() or name = public.my_creator());

-- Données AGENCE pures : réservées aux comptes agence.
create policy contacts_agency    on public.contacts    for all to authenticated using (public.is_agency()) with check (public.is_agency());
create policy invoices_agency    on public.invoices    for all to authenticated using (public.is_agency()) with check (public.is_agency());
create policy prospects_agency   on public.prospects   for all to authenticated using (public.is_agency()) with check (public.is_agency());
create policy module_rows_agency on public.module_rows for all to authenticated using (public.is_agency()) with check (public.is_agency());

-- 3) Vérif (déconnecté → doit renvoyer 0 ligne) :  select * from public.creators;
