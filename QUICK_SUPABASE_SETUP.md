# Configuration rapide Supabase pour Vercel

## Étapes rapides (5 minutes)

### 1. Créer un compte Supabase
1. Allez sur https://supabase.com
2. Cliquez sur "Start your project"
3. Connectez-vous avec GitHub

### 2. Créer un nouveau projet
1. Cliquez sur "New Project"
2. Choisissez une organisation
3. Remplissez :
   - **Name** : `crenoz` (ou autre nom)
   - **Database Password** : Choisissez un mot de passe fort (notez-le !)
   - **Region** : Choisissez la région la plus proche
4. Cliquez sur "Create new project"
5. Attendez 2-3 minutes que le projet soit créé

### 3. Récupérer la connection string
1. Dans votre projet Supabase, allez dans **Settings** (icône engrenage en bas à gauche)
2. Cliquez sur **Database**
3. Faites défiler jusqu'à **Connection string**
4. Sélectionnez **URI** (pas Session mode)
5. Copiez la connection string qui ressemble à :
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
6. Remplacez `[YOUR-PASSWORD]` par le mot de passe que vous avez créé

### 4. Configurer dans Vercel
1. Allez sur https://vercel.com
2. Ouvrez votre projet `crenoz`
3. Allez dans **Settings** → **Environment Variables**
4. Ajoutez/modifiez `DATABASE_URL` avec la connection string de Supabase
5. Sélectionnez **Production**, **Preview**, et **Development**
6. Cliquez sur **Save**

### 5. Appliquer les migrations
1. Dans votre terminal local, connectez-vous à Supabase :
```bash
# Récupérez votre connection string depuis Supabase
export DATABASE_URL="postgresql://postgres:votre_mot_de_passe@db.xxxxx.supabase.co:5432/postgres"

# Appliquez les migrations
npx prisma migrate deploy
```

OU utilisez le SQL Editor de Supabase :
1. Dans Supabase, allez dans **SQL Editor**
2. Créez une nouvelle query
3. Copiez-collez le contenu de `prisma/migrations/20260208175936_init/migration.sql`
4. Exécutez la query

### 6. Redéployer sur Vercel
1. Dans Vercel, allez dans **Deployments**
2. Cliquez sur les 3 points du dernier déploiement
3. Cliquez sur **Redeploy**

## Vérification

Une fois configuré, testez :
- La création de compte
- La connexion
- La création d'un type de RDV

## Alternative : Neon (plus simple)

Si Supabase est trop complexe, utilisez Neon :
1. Allez sur https://neon.tech
2. Créez un compte
3. Créez un projet
4. Copiez la connection string
5. Utilisez-la dans Vercel

Neon est plus simple car il n'y a pas besoin de remplacer le mot de passe dans l'URL.
