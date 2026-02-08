# 🔍 Dépannage Brevo - Emails envoyés mais non reçus

## ✅ Votre situation

Les logs Vercel montrent que les emails sont **envoyés avec succès** :
```
✅ Email envoyé via Brevo avec succès: { messageId: '<202602081847.80718777533@smtp-relay.mailin.fr>' }
```

Mais vous ne recevez pas les emails. Voici comment diagnostiquer :

## 🔍 Étapes de diagnostic

### 1. Vérifier dans le dashboard Brevo

1. Allez sur [brevo.com](https://www.brevo.com) → **Statistics** ou **Email** → **Campaigns**
2. Cherchez les emails envoyés avec les messageId de vos logs
3. Vérifiez le statut :
   - ✅ **Delivered** = Email livré (vérifiez les spams)
   - ⏳ **Pending** = En attente de livraison
   - ❌ **Bounced** = Email rejeté (adresse invalide)
   - ❌ **Blocked** = Email bloqué (spam)

### 2. Vérifier les spams

**C'est la cause la plus fréquente !**

- ✅ Vérifiez le dossier **spam/courrier indésirable**
- ✅ Vérifiez les **filtres** de votre boîte mail
- ✅ Cherchez "Crenoz" ou "Houcine Farhane" dans votre boîte mail

### 3. Vérifier l'email expéditeur

Dans vos logs, l'email expéditeur est : `houcine.farhane@outlook.fr`

**Problème potentiel** : Si cet email n'est pas vérifié dans Brevo, certains fournisseurs peuvent le filtrer.

**Solution** :
1. Allez dans Brevo → **Settings** → **Senders & IP**
2. Vérifiez si `houcine.farhane@outlook.fr` est dans la liste
3. Si non, ajoutez-le et vérifiez-le (Brevo enverra un email de vérification)

### 4. Utiliser un email expéditeur vérifié

Pour améliorer la délivrabilité :

1. **Dans Brevo** → **Settings** → **Senders & IP** → **Add a sender**
2. Ajoutez votre email : `houcine.farhane@outlook.fr`
3. Brevo enverra un email de vérification à cette adresse
4. Cliquez sur le lien de vérification
5. Une fois vérifié, utilisez-le dans Vercel :
   ```
   BREVO_FROM_EMAIL=houcine.farhane@outlook.fr
   ```

### 5. Vérifier les logs détaillés Brevo

1. Allez dans Brevo → **Statistics** → **Email**
2. Cliquez sur un email envoyé
3. Vérifiez les détails :
   - **Status** : Delivered, Bounced, Blocked, etc.
   - **Opens** : Si l'email a été ouvert
   - **Clicks** : Si des liens ont été cliqués

### 6. Délai de livraison

Les emails peuvent prendre **quelques minutes** à arriver, surtout :
- Si c'est la première fois que vous envoyez depuis cet expéditeur
- Si le fournisseur email (Outlook, Gmail) filtre les nouveaux expéditeurs

**Attendez 5-10 minutes** avant de considérer que l'email est perdu.

## 🎯 Solutions rapides

### Solution 1 : Vérifier l'expéditeur dans Brevo

1. Brevo → **Settings** → **Senders & IP**
2. Ajoutez `houcine.farhane@outlook.fr`
3. Vérifiez-le via l'email de confirmation
4. Redéployez (les emails utiliseront automatiquement cet expéditeur vérifié)

### Solution 2 : Utiliser un autre email expéditeur

Si vous avez un autre email (Gmail, etc.) :

1. Ajoutez-le dans Brevo → **Senders & IP**
2. Vérifiez-le
3. Dans Vercel, ajoutez :
   ```
   BREVO_FROM_EMAIL=votre-autre-email@gmail.com
   ```
4. Redéployez

### Solution 3 : Vérifier les spams régulièrement

- Les emails peuvent être filtrés même s'ils sont "Delivered"
- Vérifiez régulièrement le dossier spam
- Ajoutez l'expéditeur à vos contacts pour éviter le filtrage futur

## 📊 Vérification du statut

Pour chaque email envoyé, vous pouvez vérifier :

1. **Dans Brevo Dashboard** :
   - Status = Delivered → Vérifiez les spams
   - Status = Bounced → Email invalide ou rejeté
   - Status = Blocked → Filtre anti-spam

2. **Dans vos logs Vercel** :
   - `messageId` présent = Email accepté par Brevo
   - Pas d'erreur = Email traité correctement

## 🆘 Si rien ne fonctionne

1. **Vérifiez que l'email de destination est correct** dans les logs
2. **Testez avec un autre email** (Gmail, etc.)
3. **Vérifiez les spams** de tous vos comptes email
4. **Attendez 10-15 minutes** (délai de livraison possible)
5. **Contactez le support Brevo** si les emails sont "Delivered" mais non reçus

## 💡 Bonnes pratiques

- ✅ **Vérifiez toujours l'expéditeur** dans Brevo
- ✅ **Utilisez un email professionnel** comme expéditeur
- ✅ **Vérifiez les spams** systématiquement
- ✅ **Ajoutez l'expéditeur à vos contacts** pour éviter le filtrage
