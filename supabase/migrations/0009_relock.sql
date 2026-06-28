-- TTP Suite — migration 0009 : RE-VERROUILLAGE DÉFINITIF
--
-- Pourquoi : relancer 0002 recrée des policies « to anon using(true) » qui
-- rouvrent l'accès anonyme (lecture + écriture) sur la plupart des tables, et
-- écrase l'isolation par créateur de 0006. Cette migration remet tout d'aplomb
-- de façon IDEMPOTENTE et insensible aux noms d'anciennes policies :
--   1) (ré)affirme le rôle agence,
--   2) supprime TOUTES les policies existantes sur les tables applicatives,
--   3) recrée le modèle final : anonyme = rien ; agence = tout ;
--      créateur = uniquement ses données.
--
-- ⚠️ Lance UNIQUEMENT ce bloc (ne relance jamais 0002). Requiert is_agency() /
--    my_creator() (créées en 0004/0006). Ordre sûr : rôle agence d'abord.

-- 1) Rôle agence (anti-lockout)
insert into public.profiles (user_id, role)
  select id, 'agency' from auth.users
   where email in ('partnerships@ttpcreators.pro','marcbouraoui@gmail.com','agence@ttp.com')
  on conflict (user_id) do update set role = 'agency';

-- 2) Purge de TOUTES les policies + RLS ON, sur toutes les tables applicatives
do $$
declare r record; t text;
declare tables text[] := array[
  'creators','contacts','invoices','prospects','module_rows',
  'todos','briefs','ideas','events','messages','profiles'
];
begin
  for r in
    select policyname, tablename from pg_policies
     where schemaname='public' and tablename = any(tables)
  loop
    execute format('drop policy if exists %I on public.%I;', r.policyname, r.tablename);
  end loop;
  foreach t in array tables loop
    execute format('alter table public.%I enable row level security;', t);
  end loop;
end $$;

-- 3) Policies finales

-- CREATORS : agence = tout ; créateur = sa propre fiche
create policy creators_scoped on public.creators for all to authenticated
  using (public.is_agency() or name = public.my_creator())
  with check (public.is_agency() or name = public.my_creator());

-- Données AGENCE pures : agence seulement
create policy contacts_agency    on public.contacts    for all to authenticated using (public.is_agency()) with check (public.is_agency());
create policy invoices_agency    on public.invoices    for all to authenticated using (public.is_agency()) with check (public.is_agency());
create policy prospects_agency   on public.prospects   for all to authenticated using (public.is_agency()) with check (public.is_agency());
create policy module_rows_agency on public.module_rows for all to authenticated using (public.is_agency()) with check (public.is_agency());

-- Données par CRÉATEUR : agence = tout ; créateur = uniquement les siennes
create policy todos_scoped  on public.todos  for all to authenticated
  using (public.is_agency() or creator = public.my_creator())
  with check (public.is_agency() or creator = public.my_creator());
create policy briefs_scoped on public.briefs for all to authenticated
  using (public.is_agency() or creator = public.my_creator())
  with check (public.is_agency() or creator = public.my_creator());
create policy ideas_scoped  on public.ideas  for all to authenticated
  using (public.is_agency() or creator = public.my_creator())
  with check (public.is_agency() or creator = public.my_creator());
create policy events_scoped on public.events for all to authenticated
  using (public.is_agency() or who = public.my_creator())
  with check (public.is_agency() or who = public.my_creator());

-- MESSAGES : agence = tout ; créateur = les siens + les annonces (creator NULL)
create policy messages_scoped on public.messages for all to authenticated
  using (public.is_agency() or creator = public.my_creator() or creator is null)
  with check (public.is_agency() or creator = public.my_creator());

-- PROFILES : chacun lit le sien ; l'agence gère tout
create policy profiles_self   on public.profiles for select to authenticated using (user_id = auth.uid());
create policy profiles_agency on public.profiles for all    to authenticated using (public.is_agency()) with check (public.is_agency());

-- 4) Vérif (déconnecté → 0 ligne) :  select * from public.creators;
