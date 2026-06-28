-- TTP Suite — migration 0006 : ISOLATION PAR CRÉATEUR
-- Chaque créateur ne voit QUE ses données ; l'agence voit tout.
-- À exécuter après 0001-0005. Conçu pour ne PAS te verrouiller (ordre sûr).
--
-- ⚠️ Avant de lancer : remplace l'email agence ci-dessous si besoin.

-- ============================================================
-- 1) Le trigger d'inscription lit rôle + créateur depuis les métadonnées du signUp
--    (l'app les envoie via options.data lors de la création d'un accès)
-- ============================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (user_id, role, creator_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'role','creator'),
    nullif(new.raw_user_meta_data->>'creator_name','')
  )
  on conflict (user_id) do update
    set role = excluded.role,
        creator_name = coalesce(excluded.creator_name, public.profiles.creator_name);
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- 2) Politiques sur profiles : chacun lit le sien ; l'agence gère tout
-- ============================================================
alter table public.profiles enable row level security;
drop policy if exists profiles_self   on public.profiles;
drop policy if exists profiles_agency on public.profiles;
create policy profiles_self   on public.profiles for select to authenticated using (user_id = auth.uid());
create policy profiles_agency on public.profiles for all    to authenticated using (public.is_agency()) with check (public.is_agency());

-- ============================================================
-- 3) Marquer le compte AGENCE (fait AVANT d'activer le cloisonnement → pas de lock-out)
--    >>> Remplace l'email si le tien diffère. <<<
-- ============================================================
insert into public.profiles (user_id, role)
  select id, 'agency' from auth.users where email = 'partnerships@ttpcreators.pro'
  on conflict (user_id) do update set role = 'agency';

-- ============================================================
-- 4) Cloisonnement des données : agence = tout ; créateur = seulement les siennes
--    (messages : les annonces sans créateur = creator IS NULL restent visibles de tous)
-- ============================================================
do $$
declare t text;
begin
  foreach t in array array['todos','briefs','ideas'] loop
    execute format('drop policy if exists %I on public.%I;', t||'_auth_all', t);
    execute format('drop policy if exists %I on public.%I;', t||'_scoped',   t);
    execute format($f$create policy %I on public.%I for all to authenticated
      using (public.is_agency() or creator = public.my_creator())
      with check (public.is_agency() or creator = public.my_creator());$f$, t||'_scoped', t);
  end loop;

  drop policy if exists events_auth_all on public.events;
  drop policy if exists events_scoped   on public.events;
  create policy events_scoped on public.events for all to authenticated
    using (public.is_agency() or who = public.my_creator())
    with check (public.is_agency() or who = public.my_creator());

  drop policy if exists messages_auth_all on public.messages;
  drop policy if exists messages_scoped   on public.messages;
  create policy messages_scoped on public.messages for all to authenticated
    using (public.is_agency() or creator = public.my_creator() or creator is null)
    with check (public.is_agency() or creator = public.my_creator());
end $$;

-- ============================================================
-- 5) (Si tu avais déjà créé des comptes créateurs AVANT cette migration)
--    Rattache-les à leur créateur — un bloc par créateur. Décommente + adapte.
-- ============================================================
-- update public.profiles p set role='creator', creator_name='CAMILLE ORSINI'
--   from auth.users u where u.id=p.user_id and u.email='EMAIL_DU_CREATEUR';
