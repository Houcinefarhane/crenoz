# Configuration Resend pour l'envoi d'emails

## 📧 Comment ça fonctionne

**Une seule clé API Resend pour toute l'application** : Tous les emails sont envoyés via la même clé API Resend (`RESEND_API_KEY`), mais chaque email peut être personnalisé avec :
- Le nom et l'email du professionnel comme expéditeur
- Le contenu personnalisé selon le type de rendez-vous
- Les détails spécifiques à chaque réservation

## 🔑 Configuration

### 1. Créer un compte Resend

1. Allez sur [https://resend.com](https://resend.com)
2. Créez un compte gratuit (100 emails/jour)
3. Vérifiez votre domaine ou utilisez le domaine par défaut `onboarding.resend.dev`

### 2. Récupérer votre clé API

1. Dans le dashboard Resend, allez dans **API Keys**
2. Cliquez sur **Create API Key**
3. Donnez un nom (ex: "Crenoz Production")
4. Copiez la clé API (commence par `re_...`)

**Important** : Pour les tests, vous pouvez utiliser le domaine par défaut `onboarding@resend.dev` sans vérification. Pour la production, vous devrez vérifier votre propre domaine.

### 3. Configurer les variables d'environnement

Ajoutez dans votre fichier `.env` :

```env
# Resend API Key (une seule pour toute l'application)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx

# Email expéditeur par défaut (optionnel)
# Si non défini, utilise "onboarding@resend.dev" (domaine de test Resend)
# Pour production, vérifiez votre domaine dans Resend et utilisez votre email
RESEND_FROM_EMAIL=onboarding@resend.dev
```

### 4. Pour Vercel

1. Allez dans **Settings** → **Environment Variables**
2. Ajoutez `RESEND_API_KEY` avec votre clé API
3. **Important** : Ajoutez `RESEND_FROM_EMAIL=onboarding@resend.dev` (domaine de test vérifié)
   - Pour la production, vérifiez votre propre domaine dans Resend et utilisez votre email
4. Cochez : ✅ Production, ✅ Preview, ✅ Development
5. Redéployez votre application

## 📨 Personnalisation des emails

### Email expéditeur par utilisateur

Actuellement, tous les emails sont envoyés depuis `RESEND_FROM_EMAIL` (ou `onboarding@resend.dev` par défaut pour les tests).

**Pour personnaliser l'expéditeur par utilisateur** (futur) :
- Ajouter un champ `emailFrom` dans le modèle `User`
- Utiliser `user.emailFrom` au lieu de `RESEND_FROM_EMAIL` dans `lib/email.ts`

### Domaines vérifiés (Recommandé pour production)

Pour utiliser votre propre domaine (ex: `contact@votre-domaine.com`) :

1. Dans Resend → **Domains**
2. Ajoutez votre domaine
3. Ajoutez les enregistrements DNS fournis
4. Attendez la vérification
5. Utilisez `RESEND_FROM_EMAIL=contact@votre-domaine.com`

## 🎯 Emails envoyés

### 1. Email au professionnel
- **Destinataire** : Email du professionnel (propriétaire du calendrier)
- **Expéditeur** : `RESEND_FROM_EMAIL` ou nom du professionnel
- **Contenu** : Détails de la nouvelle réservation

### 2. Email au client
- **Destinataire** : Email du client (personne qui réserve)
- **Expéditeur** : `RESEND_FROM_EMAIL` ou nom du professionnel
- **Contenu** : Confirmation de réservation avec détails

## 🔒 Sécurité

- ✅ La clé API est stockée dans les variables d'environnement
- ✅ Jamais exposée côté client
- ✅ Utilisée uniquement côté serveur (API routes)
- ✅ Les emails échouent silencieusement si la clé n'est pas configurée (ne bloque pas la réservation)

## 📊 Limites Resend

- **Gratuit** : 100 emails/jour, 3 000 emails/mois
- **Pro** : À partir de $20/mois pour plus d'emails
- **Domaine personnalisé** : Gratuit

## 🐛 Dépannage

### Les emails ne sont pas envoyés

1. Vérifiez que `RESEND_API_KEY` est défini dans `.env`
2. Vérifiez que la clé API est valide dans Resend
3. Consultez les logs serveur pour les erreurs
4. Vérifiez le dashboard Resend → **Logs** pour voir les emails envoyés/échoués

### Emails en spam

- Vérifiez votre domaine dans Resend
- Utilisez un domaine vérifié plutôt que `onboarding.resend.dev`
- Ajoutez SPF/DKIM records fournis par Resend
