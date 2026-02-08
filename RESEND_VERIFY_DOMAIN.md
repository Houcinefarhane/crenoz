# 🌐 Vérifier un domaine dans Resend

## Le problème

Avec le compte Resend gratuit/test, vous ne pouvez envoyer des emails qu'à votre propre adresse email (`houcinefarhane138@gmail.com`). Pour envoyer à n'importe quelle adresse, vous devez **vérifier un domaine**.

## Solution : Vérifier votre domaine

### Option 1 : Utiliser un domaine que vous possédez

Si vous avez un domaine (ex: `votre-domaine.com`) :

1. **Allez sur [resend.com](https://resend.com) → Domains**
2. Cliquez sur **Add Domain**
3. Entrez votre domaine (ex: `votre-domaine.com`)
4. Resend vous donnera des enregistrements DNS à ajouter :
   - Un enregistrement **TXT** pour la vérification
   - Un enregistrement **SPF**
   - Un enregistrement **DKIM**

5. **Ajoutez ces enregistrements dans votre DNS** (chez votre registrar : GoDaddy, Namecheap, Cloudflare, etc.)
6. **Attendez la vérification** (peut prendre quelques minutes à quelques heures)
7. Une fois vérifié, utilisez dans Vercel :
   ```
   RESEND_FROM_EMAIL=contact@votre-domaine.com
   ```

### Option 2 : Utiliser un sous-domaine (recommandé)

Si vous avez un domaine, vous pouvez créer un sous-domaine spécifique pour les emails :

1. Créez un sous-domaine (ex: `mail.votre-domaine.com` ou `emails.votre-domaine.com`)
2. Vérifiez ce sous-domaine dans Resend
3. Utilisez : `RESEND_FROM_EMAIL=noreply@mail.votre-domaine.com`

### Option 3 : Utiliser un service de domaine gratuit (pour tests)

Si vous n'avez pas de domaine, vous pouvez :

1. **Créer un compte sur un service gratuit** :
   - [Freenom](https://www.freenom.com) - domaines gratuits (.tk, .ml, .ga)
   - [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) - domaines à prix coûtant

2. **Vérifier le domaine dans Resend** comme décrit ci-dessus

## Configuration après vérification

Une fois votre domaine vérifié :

1. **Dans Vercel → Environment Variables** :
   ```
   RESEND_FROM_EMAIL=contact@votre-domaine-verifie.com
   ```

2. **Redéployez** votre application

3. **Testez** avec une nouvelle réservation

## Vérification rapide

Pour vérifier que votre domaine est bien vérifié :

1. Allez sur Resend → **Domains**
2. Vérifiez que votre domaine a un statut **✅ Verified** (vert)
3. Si c'est **⏳ Pending**, attendez encore un peu

## Notes importantes

- ⚠️ **Le domaine doit être complètement vérifié** avant de pouvoir envoyer
- ⚠️ **Les enregistrements DNS** doivent être correctement configurés
- ✅ **Une fois vérifié, vous pouvez envoyer à n'importe quelle adresse**
- ✅ **Les emails depuis un domaine vérifié ont moins de chances d'aller en spam**

## Alternative temporaire (pour tests uniquement)

Si vous voulez tester rapidement sans vérifier de domaine :

1. Utilisez `houcinefarhane138@gmail.com` comme email de destination dans vos tests
2. Les emails fonctionneront uniquement vers cette adresse

**⚠️ Ce n'est pas une solution pour la production !**
