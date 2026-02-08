# Crenoz - Solution de prise de rendez-vous moderne

Crenoz est un clone moderne de Calendly, construit avec Next.js 14, TypeScript, Tailwind CSS, shadcn/ui et Framer Motion.

## 🚀 Fonctionnalités

- ✅ Authentification avec NextAuth (Email/Mot de passe)
- ✅ Dashboard professionnel pour gérer les types de rendez-vous
- ✅ Configuration des disponibilités hebdomadaires
- ✅ Page publique de réservation (`/[username]`)
- ✅ Calendrier interactif avec sélection de créneaux
- ✅ Formulaire client pour la réservation
- ✅ Envoi d'emails de confirmation (Resend)
- ✅ Synchronisation avec Google Calendar - À venir

## 🛠️ Stack Technique

- **Framework**: Next.js 14 (App Router)
- **Langage**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Base de données**: PostgreSQL + Prisma
- **Authentification**: NextAuth.js
- **Emails**: Resend
- **Calendar**: Google Calendar API

## 📦 Installation

1. Clonez le repository :
```bash
git clone <repository-url>
cd crenoz
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez les variables d'environnement :
```bash
cp .env.example .env
```

Remplissez les variables dans `.env` :
- `DATABASE_URL` : URL de votre base de données PostgreSQL (voir `SETUP_POSTGRES.md`)
- `NEXTAUTH_SECRET` : Générez une clé secrète (ex: `openssl rand -base64 32`)
- `NEXTAUTH_URL` : URL de votre application (ex: `http://localhost:3000`)
- `RESEND_API_KEY` : Clé API Resend pour l'envoi d'emails (voir `RESEND_SETUP.md`)
- `RESEND_FROM_EMAIL` : Email expéditeur par défaut (optionnel, ex: `noreply@votre-domaine.com`)

**Note** : Google OAuth et Google Calendar sont optionnels pour l'instant.

4. Initialisez la base de données :
```bash
# Le client Prisma est déjà généré
npx prisma generate

# Appliquez la migration (une fois PostgreSQL configuré)
npx prisma migrate deploy
# OU pour le développement :
npx prisma migrate dev
```

**Note** : La migration SQL a déjà été créée dans `prisma/migrations/`. Vous devez configurer votre base de données PostgreSQL et mettre à jour `DATABASE_URL` dans `.env` avant d'appliquer la migration.

5. Lancez le serveur de développement :
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du projet

```
crenoz/
├── app/
│   ├── [username]/          # Page publique de réservation
│   ├── dashboard/            # Dashboard professionnel
│   ├── layout.tsx            # Layout principal
│   ├── page.tsx              # Landing page
│   └── globals.css           # Styles globaux
├── components/
│   └── ui/                   # Composants shadcn/ui
├── lib/
│   └── utils.ts              # Utilitaires
├── prisma/
│   └── schema.prisma         # Schéma Prisma
└── public/                   # Fichiers statiques
```

## 🎨 Design

Le design s'inspire de billiev.com avec :
- Polices modernes et lisibles
- Palette de couleurs bleue élégante
- Animations fluides avec Framer Motion
- Interface mobile-first et responsive

## 📝 Prochaines étapes

- [x] Implémenter l'authentification NextAuth (Email/Mot de passe)
- [ ] Créer le dashboard professionnel complet
- [ ] Développer la page de réservation publique avec calendrier
- [ ] Intégrer l'envoi d'emails avec Resend
- [ ] Ajouter la synchronisation Google Calendar
- [ ] Ajouter Google OAuth (optionnel)

## 📄 Licence

MIT
