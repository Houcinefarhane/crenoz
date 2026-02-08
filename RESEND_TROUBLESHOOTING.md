# 🔍 Dépannage Resend - Emails non reçus

## ✅ Vérifications à faire

### 1. Vérifier la clé API

**Dans Vercel :**
1. Allez dans **Settings** → **Environment Variables**
2. Vérifiez que `RESEND_API_KEY` existe et commence par `re_`
3. Vérifiez qu'elle est activée pour **Production**, **Preview** et **Development**

**Localement :**
```bash
# Vérifier dans .env
cat .env | grep RESEND_API_KEY
```

### 2. Vérifier l'email expéditeur

**Important** : Resend nécessite un email expéditeur vérifié.

**Option 1 : Utiliser le domaine par défaut (pour tests)**
```env
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**Option 2 : Vérifier votre propre domaine**
1. Dans Resend → **Domains**
2. Ajoutez votre domaine
3. Ajoutez les enregistrements DNS fournis
4. Attendez la vérification (peut prendre quelques minutes)
5. Utilisez : `RESEND_FROM_EMAIL=contact@votre-domaine.com`

### 3. Vérifier les logs

**Dans Vercel :**
1. Allez dans **Deployments** → Cliquez sur le dernier déploiement
2. Ouvrez **Runtime Logs**
3. Cherchez les messages avec 📧, ✅ ou ❌

**Messages à chercher :**
- `✅ RESEND_API_KEY configurée` - La clé est bien chargée
- `📧 Envoi email au professionnel:` - Tentative d'envoi
- `✅ Email envoyé avec succès` - Email envoyé
- `❌ Erreur Resend:` - Erreur détaillée

### 4. Vérifier dans Resend Dashboard

1. Allez sur [resend.com](https://resend.com) → **Logs**
2. Vérifiez si les emails apparaissent :
   - ✅ **Sent** : Email envoyé avec succès
   - ❌ **Failed** : Erreur (cliquez pour voir les détails)
   - ⏳ **Pending** : En attente

### 5. Erreurs courantes

#### "Invalid API key"
- La clé API est incorrecte ou expirée
- **Solution** : Régénérez une nouvelle clé dans Resend

#### "Domain not verified"
- L'email expéditeur n'est pas vérifié
- **Solution** : Utilisez `onboarding@resend.dev` pour les tests ou vérifiez votre domaine

#### "Invalid 'from' email address"
- Le format de l'email est incorrect
- **Solution** : Utilisez un format valide comme `name@domain.com`

#### "Rate limit exceeded"
- Vous avez dépassé la limite (100 emails/jour en gratuit)
- **Solution** : Attendez ou passez à un plan supérieur

### 6. Test rapide

Créez une réservation de test et vérifiez les logs :

1. Créez une réservation via l'interface
2. Vérifiez les logs Vercel (Runtime Logs)
3. Vérifiez les logs Resend (Dashboard → Logs)

### 7. Vérifier les spams

- Les emails peuvent être dans les spams
- Vérifiez le dossier spam de votre boîte mail
- Si vous utilisez `onboarding@resend.dev`, certains filtres peuvent bloquer

## 📝 Checklist de débogage

- [ ] `RESEND_API_KEY` est défini dans Vercel
- [ ] `RESEND_FROM_EMAIL` est défini (ou utilise `onboarding@resend.dev`)
- [ ] La clé API commence par `re_`
- [ ] Les logs Vercel montrent des tentatives d'envoi
- [ ] Les logs Resend montrent les emails (sent/failed)
- [ ] Vérifier le dossier spam
- [ ] Le domaine est vérifié (si vous utilisez votre propre domaine)

## 🆘 Besoin d'aide ?

Si le problème persiste :
1. Copiez les logs Vercel (Runtime Logs)
2. Copiez les logs Resend (Dashboard → Logs)
3. Vérifiez que toutes les variables d'environnement sont correctes
