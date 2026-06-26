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

## Tranche 3+ — étendre aux autres entités

Briefs, contrats, événements/planning, todos, messages, factures…

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
