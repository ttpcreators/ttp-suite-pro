# Audit complet — TTP Suite

_Date : 27 juin 2026 · Version auditée : `main` @ a0333ce_

---

## 1. Vue d'ensemble

| | |
|---|---|
| **Nature** | Application web mono-page (SPA) de gestion d'agence de créateurs |
| **Hébergement** | GitHub Pages — `https://ttpcreators.github.io/ttp-suite-pro/` |
| **Déploiement** | Push sur `main` → déploiement auto (branch/root). Vercel : **déconnecté** (config supprimée) |
| **Stack** | React (UMD, sans build), runtime de templates maison (`dc-runtime`), CSS pur |
| **Base de données** | Supabase (PostgreSQL) — table `creators` + blob d'état dans `module_rows` |
| **Taille livrée** | `index.html` ≈ 410 Ko (tout inline : markup, logique, styles) |
| **Sauvegarde** | Branche `backup-v1` (miroir de `main`) |

**Verdict global :** application **riche et fonctionnelle**, très complète côté fonctionnalités et soignée côté design. Les points à traiter en priorité sont **la sécurité** (auth + accès base) et la **bascule des données de démo vers tes vraies données**.

---

## 2. Architecture

- **Build** : `node build.js` assemble `src/` (template + fonts + styles + app.js) dans `index.html`. Simple et fiable.
- **Logique** : une seule classe `Component` (~1 100 lignes) qui produit un objet `renderVals` consommé par le template. Tout est centralisé — facile à retrouver, mais le fichier devient gros.
- **Sections** : 20 vues agence (Dashboard, Objectifs, Roster, Engagement, Pricing, Briefs, To-do, Documents, Media kit, Messages, Contacts, Planning, Contrats, Facturation, Checklist, Prospection, Alertes, Idées, Debrief, Templates) + portail créateur (Accueil, Briefs, To-do, Idées, Planning, Stats, Documents, Profil, Messages).

---

## 3. Inventaire fonctionnel & état des données

| Section | État | Données |
|---|---|---|
| **Login / rôles** | ✅ Fonctionnel | Agence + créateurs, sessions persistées |
| **Dashboard — finances** | ✅ **Connecté** | CA encaissé, reversé, marge, objectif %, en attente/retard = calculés depuis factures + objectifs |
| **Dashboard — courbes/sparklines** | ⚠️ Illustratif | 7 mini-graphiques (barres/points historiques, courbe de croissance) restent décoratifs |
| **Roster** | ✅ Connecté | Table Supabase `creators`, ajout/suppression persistés |
| **Contacts** | ✅ Connecté | Tes 97 contacts importés ; ajout via fiche complète ; vue liste/cartes ; détail en overlay |
| **Briefs** | ✅ Connecté | Liste + détail, consignes/budget/objectif, partage, validation/terminé |
| **To-do** | ✅ Connecté | Description + priorité (agence **et** portail), filtres, terminées |
| **Facturation** | ✅ Connecté | Totaux calculés depuis les factures réelles |
| **Objectifs** | ✅ Connecté | Édition, mois passés/futurs |
| **Engagement** | ✅ Fonctionnel | Saisie manuelle + formules par plateforme vérifiées |
| **Planning** | ✅ Connecté | Clic sur une date → events du jour ; sélecteur date iOS |
| **Alertes / Notifications** | ✅ Connecté | Dérivées des vraies données, suppression persistée, périmètre par rôle |
| **Messages** | ✅ Connecté | 1 fil/créateur côté agence ; créateur ne voit que ses fils |
| **Idées** | ✅ Connecté | Liste + détail, responsive mobile |
| **Debrief** | ✅ Fonctionnel | Rapport de campagne envoyable à la marque |
| **Pricing / Contrats / Media kit / Templates / Checklist** | ◐ Semi-statique | Outils opérationnels avec des données d'exemple à personnaliser |
| **Dashboard "Provision fiscale / échéances"** | ⚠️ Illustratif | Montants TVA/IS codés en dur (indicatif) |

---

## 4. Persistance & synchronisation

- **localStorage** (`ttp_state_v1`) : sauvegarde immédiate (anti-rebond 350 ms + flush à la fermeture). ✅
- **Supabase** (cross-device) : un **blob JSON unique** dans `module_rows (module='__app_state__')`. Au démarrage l'app charge le cloud, puis re-synchronise à chaque modif. ✅
- **31 clés persistées** (factures, contacts, briefs, todos, idées, events, objectifs, checklist, messages, coordonnées créateurs, session…).
- **Local uniquement** (jamais dans le cloud partagé) : photos, et les clés de session (`authed`, `authRole`, `space`, `creatorId`).

> ⚠️ **Limite structurelle importante** : l'état est **un seul document partagé**. Il n'y a pas d'isolation par utilisateur côté base — l'agence et tous les créateurs lisent/écrivent le **même** blob. La séparation agence/créateur est **uniquement visuelle** (filtrage à l'affichage), pas une vraie cloison de données.

---

## 5. Sécurité — points à traiter (priorité haute)

1. **Authentification côté client uniquement.** Les mots de passe (agence + créateurs, dérivés du prénom) sont **dans le code livré** (`index.html`). N'importe qui qui ouvre le code source peut se connecter. → Convient pour une démo/usage interne, **pas** pour des données sensibles publiques.
2. **Clé Supabase publique + RLS ouvert.** La clé `anon` est dans le bundle (normal) **mais** les politiques RLS autorisent lecture **et écriture** anonymes sur toutes les tables. Donc quiconque a l'URL peut lire/modifier/supprimer toutes les données via l'API.
3. **Pas d'isolation des données** entre rôles (cf. §4).

**Recommandation** : si l'app doit contenir de vraies données confidentielles (contacts, factures, contrats), migrer vers **Supabase Auth** (vrais comptes) + **RLS par utilisateur** (chaque créateur ne lit que ses lignes). C'est le chantier n°1 pour passer de "démo crédible" à "outil de production".

---

## 6. Responsive mobile

✅ Très bon niveau global :
- Sidebar → tiroir, barre de navigation flottante (pilule 4 icônes + menu)
- Tableaux → cartes empilées (`m-row` / `data-l`)
- Roster en vue liste, calendrier compacté, home créateur en blocs carrés
- Login en écran empilé, contacts/idées/briefs en listes tappables

Points mineurs : quelques formulaires denses (contrats, pricing) restent un peu serrés sur très petit écran.

---

## 7. Performance

- **+** Pas de framework lourd, un seul fichier, rendu rapide.
- **−** `index.html` ≈ 410 Ko non minifié (React + tout le markup inline). Acceptable mais optimisable (minification, ou sortir React en CDN avec cache).
- **−** Toutes les vues sont rendues dans un seul gros arbre conditionnel (pas de lazy-loading) — sans impact perceptible à cette taille.

---

## 8. Qualité / maintenance

- **+** Code centralisé, cohérent, conventions stables.
- **◐** 19 `window.prompt/confirm` subsistent pour certaines éditions rapides (fonctionnel, mais moins élégant que les fiches dédiées).
- **−** Pas de tests unitaires dans le dépôt (validation faite via un harnais Playwright externe — 21/21 verts).
- **−** `src/app.js` (1 100 lignes) gagnerait à être découpé si l'app continue de grossir.

---

## 9. Accessibilité / SEO

- Favicon, titre, meta description, theme-color : ✅
- Contrastes corrects, thème clair/sombre.
- ◐ Peu d'attributs ARIA / `alt` ; navigation surtout à la souris/tactile. À renforcer si public large.

---

## 10. Recommandations priorisées

**P1 — Sécurité (avant usage réel avec vraies données)**
1. Supabase Auth + RLS par utilisateur (vraie isolation agence/créateurs).
2. Retirer les identifiants du bundle une fois l'Auth en place.

**P2 — Données réelles**
3. Remplacer les dernières données d'exemple (pricing, contrats, media kit, provisions fiscales) par tes vraies valeurs.
4. Rendre les sparklines/historiques du dashboard dynamiques (ou les retirer).

**P3 — Finition**
5. Remplacer les `prompt()` restants par des fiches in-app.
6. Minifier le livrable ; envisager de découper `app.js`.
7. Ajouter quelques tests automatisés au dépôt.

---

## 11. Conclusion

TTP Suite est une application **complète, cohérente et agréable**, avec une vraie persistance cross-device et, désormais, des chiffres de dashboard **connectés aux données réelles**. Le principal écart à combler pour un usage professionnel n'est pas fonctionnel mais **sécuritaire** : authentification et cloisonnement des données. Tout le reste est en place et opérationnel.
