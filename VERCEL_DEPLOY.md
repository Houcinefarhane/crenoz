# Déploiement sur Vercel

## Variables d'environnement requises

Pour déployer sur Vercel, vous devez configurer ces variables d'environnement :

### 1. DATABASE_URL (OBLIGATOIRE)
URL de connexion à votre base de données PostgreSQL.

**Options recommandées :**
- **Supabase** (gratuit) : https://supabase.com
- **Neon** (gratuit) : https://neon.tech
- **Vercel Postgres** : Intégré directement avec Vercel

**Format :**
```
postgresql://user:password@host:port/database?schema=public
```

### 2. NEXTAUTH_SECRET (OBLIGATOIRE)
Clé secrète pour NextAuth. Générez-en une avec :
```bash
openssl rand -base64 32
```

### 3. NEXTAUTH_URL (OBLIGATOIRE)
L'URL de votre application Vercel. Vercel la définit automatiquement, mais vous pouvez aussi la définir manuellement :
```
https://votre-app.vercel.app
```

## Étapes de déploiement

### Option 1 : Via l'interface Vercel (Recommandé)

1. **Connecter votre repository GitHub**
   - Allez sur https://vercel.com
   - Cliquez sur "Add New Project"
   - Importez votre repository `Houcinefarhane/crenoz`

2. **Configurer les variables d'environnement**
   - Dans les paramètres du projet, allez dans "Environment Variables"
   - Ajoutez les 3 variables ci-dessus

3. **Déployer**
   - Vercel détectera automatiquement Next.js
   - Le build se lancera automatiquement

### Option 2 : Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Ajouter les variables d'environnement
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL
```

## Configuration Prisma sur Vercel

Vercel exécutera automatiquement `prisma generate` pendant le build, mais vous devez appliquer les migrations :

```bash
# Appliquer les migrations sur la base de production
npx prisma migrate deploy
```

Ou configurez un script dans `package.json` :

```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "vercel-build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

## Base de données recommandée : Supabase

1. Créez un compte sur https://supabase.com
2. Créez un nouveau projet
3. Allez dans Settings > Database
4. Copiez la "Connection string" (URI)
5. Utilisez-la comme `DATABASE_URL` dans Vercel

## Vérification après déploiement

1. Vérifiez que l'application se charge
2. Testez la création de compte
3. Testez la connexion
4. Testez la page de réservation publique

## Troubleshooting

### Erreur de connexion à la base de données
- Vérifiez que `DATABASE_URL` est correctement configuré
- Vérifiez que votre base de données accepte les connexions depuis Vercel (IP whitelist)

### Erreur NextAuth
- Vérifiez que `NEXTAUTH_SECRET` est défini
- Vérifiez que `NEXTAUTH_URL` correspond à votre URL Vercel

### Erreur Prisma
- Vérifiez que les migrations sont appliquées : `npx prisma migrate deploy`
- Vérifiez que `prisma generate` s'exécute pendant le build
