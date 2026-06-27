# Activer la vraie connexion (Supabase Auth) — guide pas à pas

L'app est **déjà branchée** sur Supabase Auth : dès que les comptes existent, elle
les utilise automatiquement. Tant que tu n'as pas fait les étapes ci-dessous,
elle continue de fonctionner avec la connexion actuelle (aucune coupure).

Il te reste **3 étapes** (≈ 5–10 min), toutes dans le dashboard Supabase.

---

## Étape 1 — Réglages email (une fois)

Supabase → **Authentication → Sign In / Providers → Email**
- Active **Email** comme provider.
- Pour des comptes internes sans boîte mail réelle, **désactive “Confirm email”**
  (sinon Supabase envoie un mail de confirmation à chaque compte).
- ⚠️ Ton projet refuse les emails non valides : utilise de **vrais emails** pour
  les créateurs (le leur), pas des `prenom@ttp.com` fictifs.

## Étape 2 — Créer les comptes

Supabase → **Authentication → Users → Add user** (pour chacun) :
- **Agence** : `marcbouraoui@gmail.com` + ton mot de passe.
- **Chaque créateur** : son vrai email + un mot de passe.
- Coche “Auto Confirm User” si proposé.

Note l'**UID** de chaque utilisateur (colonne dans la liste Users).

## Étape 3 — Lancer le script SQL

Supabase → **SQL Editor** → colle et exécute `migrations/0003_auth.sql`.
Cela : crée la table `profiles`, et **ferme l'accès anonyme** (seuls les comptes
connectés peuvent lire/écrire — fin de l'accès public à la base).

## Étape 4 — Définir les rôles

Toujours dans **SQL Editor**, pour chaque compte (remplace les valeurs) :

```sql
-- Agence (accès complet)
insert into public.profiles (user_id, role)
values ('UID-DE-MARC', 'agency')
on conflict (user_id) do update set role='agency';

-- Un créateur (n'accède qu'à son portail) — creator_name = nom EXACT du roster
insert into public.profiles (user_id, role, creator_name)
values ('UID-DU-CREATEUR', 'creator', 'CAMILLE ORSINI')
on conflict (user_id) do update set role='creator', creator_name='CAMILLE ORSINI';
```

---

## Résultat

- La connexion se fait avec les vrais comptes (mots de passe **plus** dans le code).
- La base n'est **plus accessible anonymement** (uniquement comptes connectés).
- Le rôle (agence / créateur) est lu depuis `profiles` au login.

## Ce qui reste un chantier séparé (optionnel)

L'app stocke aujourd'hui les données de l'agence dans **un espace de travail
partagé** (un seul document). Un cloisonnement *au niveau base* où chaque
créateur ne pourrait techniquement lire que SES lignes nécessite de passer à un
modèle **relationnel** (une table par entité avec `creator_id` + RLS par
`auth.uid()`). C'est la “Tranche 3” — à planifier si tu veux cette garantie
au-delà du filtrage applicatif actuel.
