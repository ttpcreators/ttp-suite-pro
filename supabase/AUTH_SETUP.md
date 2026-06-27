# Activer la vraie connexion (Supabase Auth) — 2 étapes

L'app est **déjà branchée** sur Supabase Auth. Dès que les comptes existent, elle
les utilise automatiquement. Tant que tu n'as pas fini, elle garde la connexion
actuelle (aucune coupure).

Le rôle est déterminé **automatiquement** :
- l'email **`marcbouraoui@gmail.com`** (ou `agence@ttp.com`) → **espace agence** ;
- tout autre email → **espace créateur**, rattaché au créateur du **Roster qui
  porte ce même email** (champ Email de la fiche créateur).

➡️ Donc, **pas de SQL de rôles à écrire** : il suffit que l'email de connexion du
créateur soit aussi renseigné dans sa fiche Roster.

---

## Étape 1 — Régler l'email & créer les comptes (dashboard Supabase)

1. **Authentication → Sign In / Providers → Email** : active Email et
   **désactive “Confirm email”** (sinon un mail de confirmation part à chaque
   compte).
2. **Authentication → Users → Add user** (coche “Auto Confirm User”) :
   - Agence : `marcbouraoui@gmail.com` + ton mot de passe.
   - Chaque créateur : **son vrai email** + un mot de passe.
   ⚠️ Supabase refuse les emails fictifs : utilise de vrais emails.
3. Dans l'app (espace agence → **Roster → fiche du créateur → Email**), mets
   **le même email** que celui du compte Supabase. (Souvent déjà le cas.)

## Étape 2 — Fermer l'accès anonyme à la base (SQL, une fois)

Supabase → **SQL Editor** → colle/exécute **`migrations/0003_auth.sql`**.
Cela réserve la lecture/écriture de la base aux **comptes connectés** (fin de
l'accès public anonyme). La table `profiles` est créée mais **optionnelle**
(le rôle vient des emails, cf. ci-dessus).

---

## Résultat

- Connexion par vrais comptes (mots de passe **hors du code**).
- Base **non accessible anonymement**.
- Rôle agence/créateur déterminé automatiquement par l'email.

> Cloisonnement « base » par créateur (chaque créateur ne peut techniquement
> lire que ses lignes) = chantier relationnel séparé — voir README. Aujourd'hui :
> espace agence partagé + filtrage applicatif par rôle.
