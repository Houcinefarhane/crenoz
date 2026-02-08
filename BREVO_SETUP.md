# 📧 Configuration Brevo pour l'envoi d'emails

## 🎯 Avantages de Brevo

- ✅ **Pas besoin de vérifier un domaine** - Vous pouvez envoyer immédiatement
- ✅ **300 emails/jour gratuits** (vs 100 pour Resend)
- ✅ **API simple** - Pas de restrictions sur les destinataires
- ✅ **Bonne délivrabilité** - Service fiable

## 🔑 Configuration

### 1. Créer un compte Brevo

1. Allez sur [https://www.brevo.com](https://www.brevo.com)
2. Créez un compte gratuit
3. Vérifiez votre email

### 2. Récupérer votre clé API

1. Dans le dashboard Brevo, allez dans **Settings** → **SMTP & API**
2. Cliquez sur **API Keys**
3. Cliquez sur **Generate a new API key**
4. Donnez un nom (ex: "Crenoz Production")
5. Copiez la clé API (commence par `xkeysib-...`)

### 3. Configurer les variables d'environnement

**⚠️ IMPORTANT** : Google/Yahoo/Microsoft exigent maintenant DKIM/DMARC. Vous devez utiliser un email expéditeur vérifié dans Brevo.

**Localement (.env) :**
```env
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BREVO_FROM_EMAIL=noreply@sendinblue.com
```

**Dans Vercel :**
1. Allez dans **Settings** → **Environment Variables**
2. Ajoutez `BREVO_API_KEY` avec votre clé API
3. **Ajoutez `BREVO_FROM_EMAIL`** avec un email vérifié dans Brevo :
   - Option 1 : Utilisez l'email par défaut de Brevo (`noreply@sendinblue.com`)
   - Option 2 : Vérifiez votre propre email dans Brevo (voir `BREVO_VERIFY_SENDER.md`)
4. Cochez : ✅ Production, ✅ Preview, ✅ Development
5. **Redéployez** votre application

**Note** : Si `BREVO_FROM_EMAIL` n'est pas défini, le code utilisera `noreply@sendinblue.com` par défaut.

## 📨 Emails envoyés

### 1. Email au professionnel
- **Destinataire** : Email du professionnel (propriétaire du calendrier)
- **Expéditeur** : `BREVO_FROM_EMAIL` ou email du professionnel
- **Contenu** : Détails de la nouvelle réservation

### 2. Email au client
- **Destinataire** : Email du client (personne qui réserve)
- **Expéditeur** : `BREVO_FROM_EMAIL` ou email du professionnel
- **Contenu** : Confirmation de réservation avec détails

## 🔒 Sécurité

- ✅ La clé API est stockée dans les variables d'environnement
- ✅ Jamais exposée côté client
- ✅ Utilisée uniquement côté serveur (API routes)
- ✅ Les emails échouent silencieusement si la clé n'est pas configurée (ne bloque pas la réservation)

## 📊 Limites Brevo

- **Gratuit** : 300 emails/jour, 9 000 emails/mois
- **Lite** : À partir de 25€/mois pour plus d'emails
- **Pas de limite sur les destinataires** (contrairement à Resend en mode test)

## 🐛 Dépannage

### Les emails ne sont pas envoyés

1. Vérifiez que `BREVO_API_KEY` est défini dans `.env` ou Vercel
2. Vérifiez que la clé API est valide dans Brevo
3. Consultez les logs serveur pour les erreurs
4. Vérifiez le dashboard Brevo → **Statistics** pour voir les emails envoyés

### Emails en spam

- Brevo a une bonne délivrabilité
- Vérifiez votre dossier spam si nécessaire
- Pour améliorer la délivrabilité, vous pouvez vérifier votre domaine dans Brevo (optionnel)

## ✅ Migration depuis Resend

Si vous migrez depuis Resend :

1. Remplacez `RESEND_API_KEY` par `BREVO_API_KEY` dans Vercel
2. (Optionnel) Remplacez `RESEND_FROM_EMAIL` par `BREVO_FROM_EMAIL`
3. Redéployez
4. Testez avec une nouvelle réservation

**Note** : Le code a déjà été migré vers Brevo, il suffit de configurer la clé API.
