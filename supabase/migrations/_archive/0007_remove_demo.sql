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
  -- Prospects de démo (pipeline) : repérés par leurs faux contacts.
  delete from public.prospects
   where contact = any(array[
     'Marc Petit','RP — à trouver','Aïcha Benali',
     'Julien Mercier','Camille Roux','Tom Vasseur'
   ]);
  -- To-do / events de démo « agence » qui ne citaient les créateurs que dans leur
  -- texte (creator/who = null) : repérés par leur libellé exact.
  delete from public.todos where text = any(array[
     'Relancer RP Sephora (CAMILLE)','Valider contrat Nike (MALO)',
     'Valider brief créatif Sephora','Choisir tenues shoot Galeries',
     'Stats reel Dior à transmettre'
   ]);
  delete from public.events where title = any(array[
     'Réunion équipe agence','Call découverte HelloFresh',
     'Shoot LÉNA × Galeries Lafayette','Call Nike — négo MALO',
     'Live THÉO — Logitech','Deadline brief Sephora',
     'Tournage reels Dior','Collab JADE × Sephora'
   ]);
end $$;
