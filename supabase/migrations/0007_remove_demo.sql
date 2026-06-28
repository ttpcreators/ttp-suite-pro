-- 0007 — Suppression des créateurs de DÉMONSTRATION (et de leurs données liées).
-- À exécuter UNE fois dans Supabase → SQL Editor. Ne touche QU'aux 8 profils de
-- démo livrés avec l'app : tes vrais créateurs, contacts et données sont préservés.
-- (L'app marque déjà ces tables comme « semées » : rien ne sera recréé après.)

do $$
declare demo text[] := array[
  'CAMILLE ORSINI','THÉO RIVIÈRE','LÉNA MARCHAND','INÈS KABORÉ',
  'MALO FONTAINE','JADE NGUYEN','SACHA DELAUNAY','NOÉ BERGER'
];
begin
  delete from public.creators where name = any(demo);
  delete from public.todos    where creator = any(demo);
  delete from public.briefs   where who = any(demo) or creator = any(demo);
  delete from public.ideas    where creator = any(demo);
  delete from public.events   where who = any(demo);
  delete from public.messages where creator = any(demo);
end $$;
