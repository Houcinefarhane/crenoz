# 🔐 Vérifier un expéditeur dans Brevo (DKIM/DMARC)

## ⚠️ Le problème

Google, Yahoo et Microsoft exigent maintenant que tous les expéditeurs aient :
- ✅ **DKIM** (signature cryptographique)
- ✅ **DMARC** (politique d'authentification)

Sans ces vérifications, les emails peuvent être bloqués ou mis en spam.

## 🎯 Solutions

### Solution 1 : Utiliser l'email par défaut de Brevo (RAPIDE)

Brevo fournit un email expéditeur vérifié par défaut. Pour le trouver :

1. Allez dans Brevo → **Settings** → **Senders & IP**
2. Cherchez un expéditeur avec statut **✅ Verified** (généralement `noreply@sendinblue.com` ou similaire)
3. Utilisez cet email dans Vercel :
   ```
   BREVO_FROM_EMAIL=noreply@sendinblue.com
   ```
4. Redéployez

### Solution 2 : Vérifier votre propre email (RECOMMANDÉ)

#### Étape 1 : Ajouter l'expéditeur dans Brevo

1. Allez dans Brevo → **Settings** → **Senders & IP**
2. Cliquez sur **Add a sender**
3. Entrez votre email : `houcine.farhane@outlook.fr`
4. Cliquez sur **Save**

#### Étape 2 : Vérifier l'email

1. Brevo enverra un email de vérification à `houcine.farhane@outlook.fr`
2. Ouvrez cet email et cliquez sur le lien de vérification
3. L'email sera marqué comme **✅ Verified**

#### Étape 3 : Configurer DKIM/DMARC (si nécessaire)

Si Brevo vous demande de configurer DKIM/DMARC :

1. **Pour un domaine personnalisé** (ex: `votre-domaine.com`) :
   - Brevo vous donnera des enregistrements DNS à ajouter
   - Ajoutez-les dans votre registrar DNS (GoDaddy, Namecheap, Cloudflare, etc.)
   - Attendez la vérification (peut prendre quelques heures)

2. **Pour Outlook/Gmail** :
   - Vous ne pouvez pas configurer DKIM/DMARC directement
   - Utilisez plutôt l'email par défaut de Brevo (Solution 1)

### Solution 3 : Utiliser un email professionnel avec domaine vérifié

Si vous avez un domaine (ex: `votre-domaine.com`) :

1. **Vérifiez le domaine dans Brevo** :
   - Brevo → **Settings** → **Senders & IP** → **Domains**
   - Ajoutez votre domaine
   - Ajoutez les enregistrements DNS fournis
   - Attendez la vérification

2. **Utilisez un email de ce domaine** :
   ```
   BREVO_FROM_EMAIL=contact@votre-domaine.com
   ```

## 🚀 Configuration rapide (recommandé)

**Pour commencer rapidement**, utilisez l'email par défaut de Brevo :

1. Dans Brevo → **Settings** → **Senders & IP**
2. Trouvez l'email avec statut **✅ Verified** (généralement `noreply@sendinblue.com`)
3. Dans Vercel → **Environment Variables** :
   ```
   BREVO_FROM_EMAIL=noreply@sendinblue.com
   ```
4. Redéployez

## 📝 Vérification

Après configuration :

1. Créez une nouvelle réservation
2. Vérifiez les logs Vercel - l'email expéditeur doit être celui configuré
3. Vérifiez dans Brevo → **Statistics** que les emails sont **Delivered**
4. Vérifiez votre boîte mail (et les spams)

## ⚠️ Important

- **Les emails non vérifiés peuvent être bloqués** par Google/Yahoo/Microsoft
- **Utilisez toujours un expéditeur vérifié** pour une meilleure délivrabilité
- **L'email par défaut de Brevo est déjà vérifié** - c'est la solution la plus rapide
