# TTP Suite — note de reprise (lue automatiquement par Claude Code)

> Si tu es un nouveau Claude (ou un dev) qui ouvre ce dépôt : ce fichier te donne
> tout le contexte pour continuer le projet. Lis-le en entier avant de modifier.

## C'est quoi
TTP Suite : application web de gestion d'une **agence de créateurs** (roster,
engagement, pricing, briefs, to-do, planning, facturation, documents, messages,
prospection…) avec un **espace agence** et un **portail par créateur**.
Propriétaire : agence **TTP CREATORS** (compte `partnerships@ttpcreators.pro`).
En ligne : https://ttpcreators.github.io/ttp-suite-pro/

## Stack & build (IMPORTANT)
- **Pas de framework de build.** Moteur de template maison `dc-runtime` (React sous
  le capot, vendoré dans `assets/`). Attributs : `{{ }}`, `sc-if`, `sc-for`,
  `oninput`, `onchange`, `onclick`, `style-hover`.
- Sources dans **`src/`** :
  - `src/template.html` — le markup (vues agence + portail créateur)
  - `src/app.js` — TOUTE la logique (un gros `renderVals()` qui renvoie les bindings)
  - `src/styles.css`, `src/fonts.css`, `src/index.shell.html` (coquille HTML)
- **Build : `node build.js`** → assemble `src/*` en **`index.html`** (le fichier déployé).
  ⚠️ **Ne JAMAIS éditer `index.html` à la main** : il est généré. Édite `src/` puis rebuild.
- **Déploiement : GitHub Pages.** Un `git push` sur `main` redéploie automatiquement.
- `window.__BUILD__` contient l'horodatage du build (utile pour vérifier la version chargée).

## Supabase (base de données)
- Projet `ttp-suite-pro`, URL et **clé publique** (`sb_publishable_…`) en dur dans
  `src/index.shell.html` — **c'est public par design**, la sécurité passe par la RLS.
  Ne JAMAIS exposer la clé `service_role`.
- **Schéma + sécurité = un seul script : `supabase/SETUP.sql`** (idempotent).
  À relancer dans Supabase → SQL Editor après tout changement de schéma.
- Modèle RLS : **anonyme = rien**, **agence = tout**, **créateur = uniquement ses données**
  (fonctions `is_agency()`, `my_creator()` ; identité par NOM via `profiles.creator_name`).
- Tables : creators, contacts, prospects, invoices, todos, briefs, ideas, events,
  messages, profiles, module_rows, documents. Buckets Storage : `documents` (privé),
  `avatars` (public).

## Conventions / pièges à connaître
- **Identité par NOM** (`state.creatorName`), pas par index — un index de roster peut
  devenir périmé après suppression. Les sélections par index ont un repli `_EMPTY_CR`.
- **Persistance triple** : localStorage (`ttp_state_v1`) + tables Supabase par entité +
  blob agence (`module_rows.__app_state__`, agence uniquement).
- **`_guardAgencyCache`** : en mode créateur, NE PAS écraser le cache agence (sinon perte
  de données quand agence et créateur partagent un navigateur). Ne pas casser ce garde-fou.
- Champs date/heure : écouter **`oninput` ET `onchange`** (Safari ne déclenche que `change`).
- Évènements planning : stockent une **date complète** (`events.date` YYYY-MM-DD), pas juste un jour.
- Bouton **↻ Rafraîchir** (barre du haut) recharge la dernière version (anti-cache).

## Tests
Tests headless Playwright écrits au cas par cas (hors dépôt, dans un scratchpad).
Pattern : serveur statique local + mock des requêtes `supabase.co` + `chromium`.
Avant de pousser : `node build.js` et vérifier qu'aucune page ne plante.

## État actuel (juin 2026)
Tout fonctionne et est testé : roster, engagement (vrais abonnés), pricing, briefs,
to-do (filtre par créateur), planning (dates multi-mois + édition), facturation
connectée (CA/commission/portail), documents (Storage), photos (avatars),
accès créateurs (signup Supabase), **suivi d'abonnés par plateforme** (cumul +
évolution mensuelle, page Stats du portail), bouton rafraîchir, responsive mobile.

## À faire / idées en attente (non urgent)
- **Calendrier Gmail** ↔ Planning : faisable ; le sens Google→app nécessite une
  Edge Function Supabase. Options A (.ics, simple) / B (Google Identity, recommandé) / C (2 sens complet).
- **Sidebar** : l'utilisateur aime un design de sidebar React/shadcn (sous-menus,
  repli, recherche ⌘K) — à reproduire dans le moteur dc-runtime (pas de React app à part).
- **Supabase egress** : un AUTRE projet de l'org (`partnerships@…pro's Project`) a
  consommé ~20 Go ; surveiller que l'org ne bride pas `ttp-suite-pro` (quota partagé).
  Solution propre : transférer `ttp-suite-pro` dans sa propre organisation.

## Boucle de travail type
1. Édite `src/template.html` / `src/app.js` / `src/styles.css`
2. `node build.js`
3. Vérifie (Live Server sur `index.html`, ou test headless)
4. `git commit` + `git push` sur `main` → déploiement auto
</content>
