# Variables d'environnement pour Vercel

## Connection String Neon

Voici votre connection string Neon à ajouter dans Vercel :

```
DATABASE_URL=postgresql://neondb_owner:npg_N8fHdmXtj3Ex@ep-falling-cell-aigaum22.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

## Étapes dans Vercel

1. Allez sur https://vercel.com
2. Ouvrez votre projet `crenoz`
3. Allez dans **Settings** → **Environment Variables**
4. Cliquez sur **Add New** (ou modifiez `DATABASE_URL` si elle existe)
5. Remplissez :
   - **Key** : `DATABASE_URL`
   - **Value** : `postgresql://neondb_owner:npg_N8fHdmXtj3Ex@ep-falling-cell-aigaum22.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
   - Cochez : ✅ Production, ✅ Preview, ✅ Development
6. Cliquez sur **Save**

## NEXTAUTH_SECRET

Ajoutez aussi cette variable :
- **Key** : `NEXTAUTH_SECRET`
- **Value** : `CsM6X26laseiJAgH3gFtFUh0s98re41zU1iYXD76mDY=`
- Cochez : ✅ Production, ✅ Preview, ✅ Development

## NEXTAUTH_URL

Cette variable sera automatiquement définie par Vercel, mais vous pouvez aussi l'ajouter manuellement après le premier déploiement :
- **Key** : `NEXTAUTH_URL`
- **Value** : `https://votre-app.vercel.app` (remplacez par votre URL Vercel)
- Cochez : ✅ Production, ✅ Preview, ✅ Development

## Après configuration

1. Redéployez votre application dans Vercel
2. Les migrations seront appliquées automatiquement grâce au script `vercel-build`
3. Testez la création de compte et la connexion
