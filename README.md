# TTP Suite

Web app « TTP Suite » — plateforme de gestion d'agence de créateurs
(dashboard financier, roster, engagement, pricing, briefs, contrats,
facturation, prospection, planning, etc.).

## Structure du code (sources dans `src/`)

Le code est organisé en **fichiers sources** assemblés en `index.html` par un
petit build (`node build.js`). On édite les sources, pas `index.html`.

```
.
├── src/
│   ├── app.js              # Logique de l'app : la classe Component (état, données, handlers)
│   ├── template.html       # Markup de l'UI (toutes les vues, syntaxe sc-for / sc-if / {{ }})
│   ├── styles.css          # CSS de base + responsive (mobile)  ← édité pour le mobile
│   ├── fonts.css           # @font-face de la police Inter
│   └── index.shell.html    # Squelette du document <head> + <body>
├── build.js                # Assemble src/ → index.html (à l'octet près)
├── index.html              # Artefact généré et déployé (ne pas éditer à la main)
├── assets/
│   ├── dc-runtime.js                # Runtime de rendu (parse le template + React)
│   ├── react.production.min.js      # React 18.3.1 (vendu localement)
│   ├── react-dom.production.min.js  # ReactDOM 18.3.1 (vendu localement)
│   ├── supabase.js                  # Client Supabase (vendu localement)
│   ├── cover.png                    # Logo / favicon
│   └── fonts/inter-*.woff2          # Police Inter (7 sous-ensembles)
├── supabase/               # Schéma + migrations SQL (table creators, …)
├── build.js · package.json · vercel.json · netlify.toml
```

## Workflow de développement

```bash
# 1) éditer les sources dans src/ (app.js, template.html, styles.css)
# 2) régénérer index.html :
node build.js          # ou : npm run build
# 3) prévisualiser :
npm start              # http://localhost:3000
```

> `index.html` est régénéré par `build.js` et **commité** (c'est ce que Vercel
> sert en statique). Toujours rebuild après une modif des sources.

## Architecture

- **`src/app.js`** : une classe `Component` (logique, état réactif via `setState`,
  données, handlers CRUD). JavaScript pur, aucune transpilation nécessaire.
- **`src/template.html`** : le markup déclaratif, rendu par `assets/dc-runtime.js`
  (moteur de templates : `sc-for`, `sc-if`, interpolations `{{ }}`) monté avec React.
- **`src/styles.css`** : styles globaux + media queries mobile (`@media (max-width: …)`).
- React / ReactDOM / Supabase sont **vendus localement** (aucune dépendance CDN
  à l'exécution).

## Données — Supabase

Le Roster lit la table `creators` (voir `supabase/`). Config (URL + clé
publishable) injectée dans le `<head>`. La clé `anon`/publishable est publique
par design ; la sécurité repose sur les politiques RLS.

## Déploiement

Site statique : déployez la racine du dépôt.
- **Vercel** : connecté au dépôt GitHub (branche `main`), redéploiement auto à
  chaque push. `index.html` est l'artefact servi (déjà commité).
- **Netlify / GitHub Pages / Cloudflare / S3 / Nginx** : servir le dossier tel quel.
