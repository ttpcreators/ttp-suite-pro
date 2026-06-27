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
| 1 | Schéma d'échelle (index + isolation opt-in) + couche `_db` + 1ʳᵉ entité branchée (**prospects**) | ✅ (cette étape) |
| 2 | Brancher contacts + invoices sur leurs tables | ⏳ |
| 3 | Brancher todos / briefs / ideas / events (avec isolation par créateur) | ⏳ |
| 4 | Messages en table (1 ligne par message, fil agence↔créateur) | ⏳ |
| 5 | Retrait du blob `module_rows` une fois toutes les entités migrées | ⏳ |

À chaque étape l'app reste utilisable ; le repli local garantit zéro coupure.

## Activer l'isolation par créateur (étape 3)
1. Donner le rôle agence au compte agence :
   `update public.profiles set role='agency' where user_id='<uuid>';`
2. Décommenter le bloc opt-in de `0004_scale.sql` et l'exécuter.
