# TTP Suite

Web app statique « TTP Suite » — plateforme de gestion d'agence de créateurs
(dashboard financier, roster, engagement, pricing, briefs, contrats, etc.).

L'interface et l'organisation interne sont **identiques** au design d'origine
exporté depuis Claude. Le bundle auto-extractible a été décompressé en un site
statique standard, prêt au déploiement.

## Structure

```
.
├── index.html                       # Page de l'app (template + métadonnées)
├── assets/
│   ├── dc-runtime.js                # Runtime de rendu (parse le template + React)
│   ├── react.production.min.js      # React 18.3.1 (vendu localement)
│   ├── react-dom.production.min.js  # ReactDOM 18.3.1 (vendu localement)
│   ├── cover.png                    # Image utilisée par l'app + favicon
│   └── fonts/inter-*.woff2          # Police Inter (7 sous-ensembles)
├── netlify.toml                     # Déploiement Netlify
├── vercel.json                      # Déploiement Vercel
└── package.json                     # Script de serveur local
```

Aucune étape de build n'est nécessaire : c'est un site 100 % statique.
Toutes les dépendances (React, polices, images) sont **embarquées localement**,
donc l'app fonctionne sans aucun appel à un CDN externe.

## Lancer en local

```bash
npm start          # sert le dossier (par défaut http://localhost:3000)
```

ou avec n'importe quel serveur statique :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

> Ouvrir `index.html` directement via `file://` fonctionne aussi pour un aperçu,
> mais un serveur HTTP est recommandé (et requis pour le déploiement).

## Déploiement

L'app étant statique, déployez la racine du dépôt sur n'importe quel hébergeur :

- **Netlify** : glisser-déposer le dossier, ou connecter le dépôt
  (config dans `netlify.toml`, dossier publié = racine).
- **Vercel** : `vercel` (config dans `vercel.json`, aucun build).
- **GitHub Pages** : activer Pages sur la branche, dossier racine.
- **Cloudflare Pages / S3 / Nginx** : servir le dossier tel quel.

## Détails techniques

- Le rendu est assuré par `dc-runtime.js`, qui lit le template `<x-dc>` contenu
  dans `index.html` et le monte avec React. La logique applicative se trouve
  dans le bloc `<script type="text/x-dc" data-dc-script>` (JavaScript pur,
  aucune transpilation Babel nécessaire).
- React et ReactDOM sont chargés avant le runtime ; celui-ci détecte
  `window.React` et n'effectue donc aucune requête vers unpkg.
