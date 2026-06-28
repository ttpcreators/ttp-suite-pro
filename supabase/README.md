# TTP Suite — Base de données (Supabase)

## 👉 Un seul fichier à utiliser : `SETUP.sql`

Pour (re)mettre la base dans le bon état — schéma **et** sécurité — il suffit de :

1. Ouvrir **Supabase → SQL Editor**
2. Coller **tout** le contenu de [`SETUP.sql`](./SETUP.sql) dans un onglet vide
3. Cliquer **Run** → « Success. No rows returned »
4. Se reconnecter à l'app avec le compte agence **partnerships@ttpcreators.pro**

`SETUP.sql` est **idempotent** : on peut le relancer autant de fois que nécessaire,
il ne casse rien et ne supprime aucune donnée. Il crée les tables manquantes, les
fonctions, le trigger d'inscription, le rôle agence, puis remet la sécurité finale.

### Modèle de sécurité

| Qui | Accès |
|-----|-------|
| Anonyme (non connecté) | **aucun** |
| Agence (`role = 'agency'`) | **tout** |
| Créateur connecté | **uniquement ses propres données** |

## ⚠️ Ne relance JAMAIS les anciennes migrations

Les fichiers `migrations/_archive/0001…0009` sont gardés pour l'historique
uniquement. **Ne les exécute plus.** En particulier `0002_app_data.sql` recrée
des politiques `to anon using(true)` qui **rouvrent l'accès anonyme** à la base.

Si un jour tu dois repartir de zéro ou réparer la sécurité : lance simplement
`SETUP.sql`.

## La clé publique

La clé `publishable` (anon) vit dans le HTML : c'est **normal et sans risque**,
la sécurité repose entièrement sur le RLS ci-dessus. Ne jamais exposer la clé
`service_role` côté client.

## Vérifier que l'anonyme est bien bloqué

En étant **déconnecté**, ces requêtes doivent renvoyer 0 ligne :

```sql
select * from public.creators;
select * from public.contacts;
```
