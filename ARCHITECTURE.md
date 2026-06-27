# TTP Suite — Architecture & migration vers l'échelle (100+ créateurs)

## Où on en est

L'app est **déjà 100% en code** : `src/app.js` (logique) + `src/template.html`
(vue) sont compilés par `build.js` en un seul `index.html` servi par GitHub Pages.
Le « HTML » n'est pas figé : c'est la couche d'affichage de l'application.

Le vrai point limitant pour 100+ créateurs n'est pas le HTML mais la **persistance**.

### Avant (ne passe pas à l'échelle)
- Données dans `localStorage` + **un seul gros blob JSON partagé** dans Supabase
  (`module_rows.__app_state__`).
- Problèmes : aucune isolation par créateur, chaque session télécharge les
  données de tout le monde, conflits d'écriture, blob qui grossit sans limite.

### Cible (scalable)
- **Une table Supabase par entité** (déjà créées en 0002) : `creators`,
  `contacts`, `prospects`, `invoices`, `todos`, `briefs`, `ideas`, `events`.
- **Auth réelle** (0003) + **isolation par créateur via RLS** (0004, opt-in) :
  l'agence voit tout, chaque créateur ne voit que ses lignes.
- **Index** pour des listes rapides à grande échelle (0004).
- Le `localStorage` ne sert plus que de cache hors-ligne.

## Couche d'accès aux données (`_db`)

`src/app.js` expose un petit module `_db` (wrappers `list/insert/update/remove`
au-dessus du client Supabase) avec **repli automatique** : si Supabase est
indisponible (ou la session non authentifiée), le module concerné retombe sur
le comportement local actuel. Aucune régression possible.

Chaque entité migrée suit le même patron :
1. au démarrage, `list()` la table ; si vide au tout premier lancement, on la
   sème depuis les données d'amorçage, puis on lit la table ;
2. les actions (ajout / édition / suppression) écrivent dans la table
   **et** mettent à jour le cache local.

## Feuille de route (par étapes)

| Étape | Contenu | État |
|------|---------|------|
| 0 | Tables + auth + lockdown RLS (0001-0003) | ✅ |
| 1 | Schéma d'échelle (index + isolation opt-in) + couche `_db` + **prospects** | ✅ |
| 2 | **contacts + invoices** sur leurs tables | ✅ |
| 3 | **todos / briefs / ideas / events** (isolation par créateur via 0004) | ✅ |
| 4 | **messages** en table (0005, 1 ligne par message) | ✅ |
| 5 | Blob `module_rows` réduit aux réglages — plus aucune entité métier dedans | ✅ |

À chaque étape l'app reste utilisable ; le repli local garantit zéro coupure.

## Étape 5 — état du blob `module_rows`

Les **9 entités métier** vivent désormais dans des tables Supabase :
`creators, prospects, contacts, invoices, todos, briefs, ideas, events, messages`.
Elles sont **retirées du blob** (et un ancien blob est nettoyé au chargement pour
ne pas réécraser les tables).

Le blob ne sert plus qu'à de la **configuration / préférences légères** (faible
volume, pas de conflit multi-utilisateur) :
- thème, photos, drapeaux d'UI (notifs/alertes lues, tâches cochées, briefs
  validés), notes de brief ;
- configuration : objectifs du mois, grille pricing, media kit, historique des
  devis, checklists, comptes d'accès (`accessAccounts`), méta des conversations
  (`customConvos` / `deletedConvos`).

Ces éléments pourront être déplacés en tables ultérieurement si besoin, mais ne
sont pas un frein à l'échelle (volume faible, périmètre agence).

## Activer l'isolation par créateur (étape 3)
1. Donner le rôle agence au compte agence :
   `update public.profiles set role='agency' where user_id='<uuid>';`
2. Décommenter le bloc opt-in de `0004_scale.sql` et l'exécuter.
