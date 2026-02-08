# Configuration PostgreSQL

## Option 1 : PostgreSQL Local

### Installation (macOS)
```bash
brew install postgresql@14
brew services start postgresql@14
```

### Créer la base de données
```bash
# Se connecter à PostgreSQL
psql postgres

# Créer la base de données
CREATE DATABASE crenoz;

# Créer un utilisateur (optionnel)
CREATE USER crenoz_user WITH PASSWORD 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON DATABASE crenoz TO crenoz_user;

# Quitter
\q
```

### Configurer DATABASE_URL dans .env
```env
DATABASE_URL="postgresql://crenoz_user:votre_mot_de_passe@localhost:5432/crenoz?schema=public"
```

## Option 2 : PostgreSQL avec Docker

```bash
# Lancer PostgreSQL dans Docker
docker run --name crenoz-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=crenoz \
  -p 5432:5432 \
  -d postgres:14

# DATABASE_URL dans .env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/crenoz?schema=public"
```

## Option 3 : Services Cloud

### Supabase (Gratuit)
1. Créer un compte sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet
3. Copier la connection string depuis Settings > Database
4. Utiliser cette URL dans `.env`

### Neon (Gratuit)
1. Créer un compte sur [neon.tech](https://neon.tech)
2. Créer un nouveau projet
3. Copier la connection string
4. Utiliser cette URL dans `.env`

## Appliquer les migrations

Une fois PostgreSQL configuré :

```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate deploy
# OU pour le développement :
npx prisma migrate dev
```

## Vérifier la connexion

```bash
npx prisma studio
```

Cela ouvrira Prisma Studio dans votre navigateur pour visualiser les données.
