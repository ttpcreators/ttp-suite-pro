-- TTP Suite — migration 0001 : table creators (Roster)
-- Source : données initialement codees en dur dans l app (rosterRaw + rosterInfoRaw).

create extension if not exists "pgcrypto";

create table if not exists public.creators (
  id          uuid primary key default gen_random_uuid(),
  sort_order  int  not null default 0,
  name        text not null,
  handle      text,
  niche       text,
  platform    text,
  followers   text,
  reach       text,
  er          text,
  ca          text,
  status      text default 'actif',
  tone        text default 'cyan',
  trend       int  default 0,
  ville       text,
  phone       text,
  email       text,
  address     text,
  siren       text,
  birth       text,
  exclu       boolean default false,
  commission  text,
  created_at  timestamptz default now()
);

alter table public.creators enable row level security;

-- ⚠️ Politiques TEMPORAIRES (avant la mise en place de l auth).
-- Elles seront resserrees a la tranche 2 (login agence + RLS par createur).
drop policy if exists creators_anon_read  on public.creators;
drop policy if exists creators_anon_write on public.creators;
create policy creators_anon_read  on public.creators for select using (true);
create policy creators_anon_write on public.creators for all    using (true) with check (true);

-- Seed initial (8 createurs)
insert into public.creators
  (sort_order, name, handle, niche, platform, followers, reach, er, ca, status, tone, trend, ville, phone, email, address, siren, birth, exclu, commission)
values
  (0, 'CAMILLE ORSINI', '@camille.o', 'Mode', 'Instagram', '540K', '2,1 M', '4,8%', '62 400 €', 'live', 'signal', 6, 'Lyon, France', '+33 6 12 48 90 33', 'camille.orsini@gmail.com', '14 rue de la République, 69002 Lyon', '901 234 567', '12/03/1998', true, '20%'),
  (1, 'THÉO RIVIÈRE', '@theogg', 'Gaming', 'Twitch', '1,2M', '3,4 M', '6,1%', '54 100 €', 'actif', 'indigo', 3, 'Paris, France', '+33 6 70 11 22 84', 'theo.riviere@gmail.com', '8 rue Oberkampf, 75011 Paris', '880 556 102', '24/09/1996', true, '15%'),
  (2, 'LÉNA MARCHAND', '@lena.mrc', 'Lifestyle', 'Instagram', '480K', '1,6 M', '5,2%', '38 900 €', 'actif', 'cyan', -2, 'Bordeaux, France', '+33 6 22 41 09 57', 'lena.marchand@gmail.com', '3 cours de l''Intendance, 33000 Bordeaux', '—', '05/01/2000', false, '18%'),
  (3, 'INÈS KABORÉ', '@ines.k', 'Beauté', 'TikTok', '320K', '1,2 M', '7,3%', '29 700 €', 'actif', 'indigo', 5, null, null, null, null, null, null, false, null),
  (4, 'MALO FONTAINE', '@malo.fit', 'Fitness', 'YouTube', '210K', '780 K', '5,9%', '21 300 €', 'pause', 'cyan', 1, null, null, null, null, null, null, false, null),
  (5, 'JADE NGUYEN', '@jade.eats', 'Food · UGC', 'UGC', '95K', '410 K', '8,1%', '12 800 €', 'actif', 'signal', 7, null, null, null, null, null, null, false, null),
  (6, 'SACHA DELAUNAY', '@sacha.tech', 'Tech · UGC', 'UGC', '64K', '280 K', '9,4%', '8 600 €', 'actif', 'indigo', 4, null, null, null, null, null, null, false, null),
  (7, 'NOÉ BERGER', '@noe.travels', 'Voyage', 'Instagram', '175K', '640 K', '4,4%', '15 200 €', 'pause', 'cyan', -1, null, null, null, null, null, null, false, null);
