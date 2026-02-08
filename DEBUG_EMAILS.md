# 🔍 Guide de diagnostic - Emails non reçus

## ✅ Checklist de vérification

### 1. Vérifier les variables d'environnement dans Vercel

1. Allez sur [vercel.com](https://vercel.com) → votre projet
2. **Settings** → **Environment Variables**
3. Vérifiez que ces variables existent :
   - ✅ `RESEND_API_KEY` = `re_...` (commence par `re_`)
   - ✅ `RESEND_FROM_EMAIL` = `onboarding@resend.dev` (ou votre email vérifié)

4. **Important** : Cochez les 3 environnements :
   - ✅ Production
   - ✅ Preview  
   - ✅ Development

5. **Redéployez** après avoir ajouté/modifié les variables

### 2. Vérifier les logs Vercel (Runtime Logs)

1. Allez dans **Deployments** → dernier déploiement
2. Cliquez sur **Runtime Logs**
3. Créez une nouvelle réservation
4. Cherchez ces messages dans les logs :

```
✅ RESEND_API_KEY configurée: re_xxxxx...
📧 Email expéditeur configuré: onboarding@resend.dev
📧 RESEND_FROM_EMAIL env var: onboarding@resend.dev
📧 Envoi email au professionnel: { to: '...', from: '...', ... }
📤 Requête Resend (Pro): { from: '...', to: [...], ... }
✅ Email envoyé au professionnel avec succès: { id: '...' }
```

**Si vous voyez des ❌**, copiez le message d'erreur complet.

### 3. Vérifier dans Resend Dashboard

1. Allez sur [resend.com](https://resend.com) → **Logs**
2. Vérifiez si les emails apparaissent :
   - ✅ **Sent** (vert) = Email envoyé avec succès
   - ❌ **Failed** (rouge) = Erreur (cliquez pour voir les détails)
   - ⏳ **Pending** = En attente

3. Si l'email est **Sent** mais non reçu :
   - Vérifiez le dossier **spam**
   - Vérifiez que l'adresse email de destination est correcte
   - Les emails depuis `onboarding@resend.dev` peuvent être filtrés par certains fournisseurs

### 4. Problèmes courants et solutions

#### ❌ "RESEND_API_KEY non configurée"
**Solution** : Ajoutez `RESEND_API_KEY` dans Vercel Environment Variables

#### ❌ "Domain not verified"
**Solution** : Utilisez `onboarding@resend.dev` dans `RESEND_FROM_EMAIL` (domaine de test vérifié)

#### ❌ "Invalid 'from' email address"
**Solution** : Vérifiez le format de `RESEND_FROM_EMAIL` :
- ✅ Correct : `onboarding@resend.dev`
- ❌ Incorrect : `onboarding@resend.dev <test>` ou autres formats

#### ✅ Email "Sent" dans Resend mais non reçu
**Causes possibles** :
1. **Dossier spam** : Vérifiez le dossier spam/courrier indésirable
2. **Filtres email** : Certains fournisseurs (Gmail, Outlook) filtrent `onboarding@resend.dev`
3. **Email incorrect** : Vérifiez que l'adresse de destination est correcte

**Solution** : 
- Vérifiez le dossier spam
- Utilisez un domaine vérifié pour la production
- Testez avec une autre adresse email

### 5. Test rapide

1. Créez une réservation de test
2. Vérifiez les logs Vercel (Runtime Logs)
3. Vérifiez les logs Resend (Dashboard → Logs)
4. Vérifiez votre boîte mail (et le dossier spam)

### 6. Format correct des variables

Dans Vercel, les variables doivent être exactement :

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**⚠️ Pas d'espaces, pas de guillemets, pas de caractères spéciaux**

### 7. Vérifier que le redéploiement a eu lieu

Après avoir modifié les variables d'environnement :
1. Vercel redéploie automatiquement OU
2. Allez dans **Deployments** → **Redeploy** manuellement
3. Attendez que le déploiement soit terminé
4. Testez à nouveau

## 📝 Informations à fournir si le problème persiste

Si les emails ne fonctionnent toujours pas, fournissez :

1. **Logs Vercel** (Runtime Logs) - copiez les messages avec 📧, ✅, ❌
2. **Logs Resend** (Dashboard → Logs) - capture d'écran ou détails de l'erreur
3. **Variables d'environnement** - confirmez qu'elles sont bien définies (sans montrer la clé API complète)
4. **Email de destination** - pour vérifier qu'il est correct

## 🎯 Solution rapide

Si rien ne fonctionne, essayez cette configuration minimale :

1. Dans Vercel → Environment Variables :
   ```
   RESEND_API_KEY = votre_clé_api_resend
   RESEND_FROM_EMAIL = onboarding@resend.dev
   ```

2. Redéployez

3. Créez une réservation de test

4. Vérifiez les logs Vercel et Resend
