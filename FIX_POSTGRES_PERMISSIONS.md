# Résoudre les problèmes de permissions PostgreSQL

## Solution 1 : Utiliser l'utilisateur `postgres` par défaut (Plus simple)

### Étape 1 : Se connecter à PostgreSQL
```bash
psql postgres
```

### Étape 2 : Vérifier que la base de données existe
```sql
\l
```
Vous devriez voir `crenoz` dans la liste.

### Étape 3 : Donner les permissions à l'utilisateur postgres (si nécessaire)
```sql
-- Se connecter à la base crenoz
\c crenoz

-- Donner toutes les permissions au schéma public
GRANT ALL PRIVILEGES ON DATABASE crenoz TO postgres;
GRANT ALL PRIVILEGES ON SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;

-- Quitter
\q
```

### Étape 4 : Mettre à jour DATABASE_URL dans .env
```env
DATABASE_URL="postgresql://postgres@localhost:5432/crenoz?schema=public"
```
Ou si vous avez un mot de passe pour postgres :
```env
DATABASE_URL="postgresql://postgres:votre_mot_de_passe@localhost:5432/crenoz?schema=public"
```

### Étape 5 : Appliquer les migrations
```bash
npx prisma migrate deploy
```

---

## Solution 2 : Créer un nouvel utilisateur avec les bonnes permissions

### Étape 1 : Se connecter à PostgreSQL en tant que postgres
```bash
psql postgres
```

### Étape 2 : Créer l'utilisateur et la base de données
```sql
-- Créer l'utilisateur
CREATE USER crenoz_user WITH PASSWORD 'votre_mot_de_passe_secure';

-- Créer la base de données (si elle n'existe pas)
CREATE DATABASE crenoz OWNER crenoz_user;

-- Donner toutes les permissions
GRANT ALL PRIVILEGES ON DATABASE crenoz TO crenoz_user;

-- Se connecter à la base crenoz
\c crenoz

-- Donner les permissions sur le schéma public
GRANT ALL PRIVILEGES ON SCHEMA public TO crenoz_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO crenoz_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO crenoz_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO crenoz_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO crenoz_user;

-- Quitter
\q
```

### Étape 3 : Mettre à jour DATABASE_URL dans .env
```env
DATABASE_URL="postgresql://crenoz_user:votre_mot_de_passe_secure@localhost:5432/crenoz?schema=public"
```

### Étape 4 : Appliquer les migrations
```bash
npx prisma migrate deploy
```

---

## Solution 3 : Utiliser Docker (Recommandé pour le développement)

Si vous avez des problèmes avec PostgreSQL local, utilisez Docker :

```bash
# Arrêter et supprimer le conteneur existant (si nécessaire)
docker stop crenoz-postgres
docker rm crenoz-postgres

# Lancer PostgreSQL dans Docker
docker run --name crenoz-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=crenoz \
  -p 5432:5432 \
  -d postgres:14

# Mettre à jour DATABASE_URL dans .env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/crenoz?schema=public"

# Appliquer les migrations
npx prisma migrate deploy
```

---

## Vérifier que ça fonctionne

```bash
# Tester la connexion
npx prisma db pull

# Ouvrir Prisma Studio pour voir les tables
npx prisma studio
```
