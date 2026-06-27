# Intégration Supabase — TTP Suite

Migration de l'app d'un prototype (données en dur) vers une vraie base de
données + authentification, **par tranches**.

## Tranche 1 — Roster en données réelles (en cours)

- `migrations/0001_creators.sql` : crée la table `creators` et la remplit avec
  les 8 créateurs initiaux (issus de `rosterRaw` / `rosterInfoRaw`).
- L'app lira le Roster depuis cette table ; ajout / suppression persistés en base.

> ⚠️ Les politiques RLS de cette tranche sont **temporaires et permissives**
> (lecture + écriture anonymes) pour démarrer sans auth. Elles seront
> resserrées à la tranche 2.

## Tranche 2 — Auth (à venir)

- Login agence (Marc) + un compte de connexion par créateur.
- Row Level Security : chaque créateur ne voit/édite que ses données.

## Persistance actuelle — localStorage (déjà active)

En attendant la persistance Supabase complète, **toutes** les modifications
(ajouts, suppressions, édits) des factures, contacts, prospects, todos, briefs,
idées, événements, modules + le thème sont **enregistrées dans le navigateur
(`localStorage`, clé `ttp_state_v1`)**. Conséquence directe : ce qui est
supprimé reste supprimé après un rafraîchissement (sur le même appareil).

Le Roster, lui, est persisté côté **Supabase** (table `creators`) : suppressions
et ajouts y sont définitifs et partagés entre appareils.

## Tranche 3+ — étendre Supabase aux autres entités

- `migrations/0002_app_data.sql` : crée les tables `invoices`, `contacts`,
  `prospects`, `todos`, `briefs`, `ideas`, `events`, `module_rows` (RLS anon
  ouvert, comme la tranche 1). Applique-la dans le **SQL Editor** pour préparer
  la persistance **partagée entre l'ordinateur et le téléphone**. L'étape
  suivante est de brancher l'app sur ces tables (load au montage + insert/delete),
  sur le modèle déjà en place pour `creators` dans `src/app.js`.

---

## Mise en place (à faire une fois)

1. Crée un projet sur **[supabase.com](https://supabase.com)** (offre gratuite).
2. Dans le dashboard → **SQL Editor** → colle le contenu de
   `migrations/0001_creators.sql` → **Run**.
3. Récupère, dans **Project Settings → API** :
   - **Project URL** (`https://xxxx.supabase.co`)
   - **anon public key** (sans risque côté client : la sécurité repose sur la RLS)
4. Transmets ces deux valeurs — elles seront injectées dans l'app
   (`window.__SUPABASE_URL__` / `window.__SUPABASE_ANON_KEY__`).

La clé `anon` est **publique** par design (elle vit dans le front). Ne jamais
exposer la clé `service_role` côté client.
