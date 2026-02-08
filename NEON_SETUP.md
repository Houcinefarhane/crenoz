# Configuration Neon avec Vercel

## Étapes rapides

### 1. Configurer DATABASE_URL dans Vercel

1. Allez sur https://vercel.com
2. Ouvrez votre projet `crenoz`
3. Allez dans **Settings** → **Environment Variables**
4. Cliquez sur **Add New** ou modifiez `DATABASE_URL` existant
5. Collez votre connection string Neon (elle ressemble à) :
   ```
   postgresql://user:password@ep-xxxxx.region.aws.neon.tech/neondb?sslmode=require
   ```
6. Cochez les 3 environnements : **Production**, **Preview**, **Development**
7. Cliquez sur **Save**

### 2. Appliquer les migrations dans Neon

**Option A : Via Prisma (Recommandé)**

Dans votre terminal local :
```bash
cd /Users/houcinefarhane/crenoz

# Définir temporairement la DATABASE_URL de Neon
export DATABASE_URL="votre-connection-string-neon"

# Appliquer les migrations
npx prisma migrate deploy
```

**Option B : Via SQL Editor de Neon**

1. Allez sur https://console.neon.tech
2. Ouvrez votre projet
3. Cliquez sur **SQL Editor**
4. Créez une nouvelle query
5. Copiez-collez le contenu du fichier `SUPABASE_SQL.sql` (ou `prisma/migrations/20260208175936_init/migration.sql`)
6. Cliquez sur **Run**

### 3. Redéployer sur Vercel

1. Dans Vercel, allez dans **Deployments**
2. Cliquez sur les 3 points (⋯) du dernier déploiement
3. Cliquez sur **Redeploy**
4. Attendez que le déploiement se termine

### 4. Vérifier que ça fonctionne

1. Ouvrez votre URL Vercel
2. Testez la création de compte
3. Testez la connexion
4. Testez la création d'un type de RDV

## Vérification rapide

Pour vérifier que la base de données est bien connectée, vous pouvez utiliser Prisma Studio :

```bash
# Définir la DATABASE_URL
export DATABASE_URL="votre-connection-string-neon"

# Ouvrir Prisma Studio
npx prisma studio
```

Cela ouvrira une interface pour voir vos tables et données.
