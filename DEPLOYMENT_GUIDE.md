# 🚀 Guide de Déploiement Gratuit - She in

**Date:** 12 Mai 2026  
**Plateforme:** Vercel (Gratuit)

---

## 🎯 Pourquoi Vercel ?

✅ **100% Gratuit** pour les projets personnels  
✅ **Optimisé pour Next.js** (créé par les mêmes développeurs)  
✅ **Déploiement automatique** depuis GitHub  
✅ **HTTPS gratuit** (certificat SSL)  
✅ **Domaine gratuit** (.vercel.app)  
✅ **Performance optimale** (CDN mondial)  
✅ **Facile à utiliser** (quelques clics)

---

## 📋 Prérequis

Avant de commencer, vous aurez besoin de :

1. ✅ Un compte GitHub (gratuit)
2. ✅ Un compte Vercel (gratuit)
3. ✅ Git installé sur votre ordinateur

---

## 🚀 Étape 1: Préparer le Projet

### **1.1 Créer un fichier .gitignore**

Créez un fichier `.gitignore` à la racine du projet (si pas déjà existant) :

```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

### **1.2 Vérifier package.json**

Assurez-vous que votre `package.json` contient ces scripts :

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

---

## 📦 Étape 2: Créer un Dépôt GitHub

### **2.1 Créer un compte GitHub**

1. Allez sur https://github.com
2. Cliquez "Sign up" (si vous n'avez pas de compte)
3. Suivez les instructions

### **2.2 Créer un nouveau dépôt**

1. Cliquez sur le bouton **"+"** en haut à droite
2. Sélectionnez **"New repository"**
3. Remplissez :
   - **Repository name:** `shein-tunisia` (ou autre nom)
   - **Description:** "She in - Boutique en ligne de mode en Tunisie"
   - **Visibility:** Public (pour Vercel gratuit)
4. **NE cochez PAS** "Initialize with README"
5. Cliquez **"Create repository"**

### **2.3 Initialiser Git localement**

Ouvrez un terminal dans votre dossier projet (`c:\Users\eki\Desktop\sirin`) :

```bash
# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit - She in website"

# Ajouter le dépôt distant (remplacez USERNAME par votre nom d'utilisateur GitHub)
git remote add origin https://github.com/USERNAME/shein-tunisia.git

# Pousser le code
git branch -M main
git push -u origin main
```

**Note:** Remplacez `USERNAME` par votre nom d'utilisateur GitHub réel.

---

## 🌐 Étape 3: Déployer sur Vercel

### **3.1 Créer un compte Vercel**

1. Allez sur https://vercel.com
2. Cliquez **"Sign Up"**
3. Choisissez **"Continue with GitHub"**
4. Autorisez Vercel à accéder à votre GitHub

### **3.2 Importer le projet**

1. Sur le dashboard Vercel, cliquez **"Add New..."**
2. Sélectionnez **"Project"**
3. Cliquez **"Import Git Repository"**
4. Trouvez votre dépôt `shein-tunisia`
5. Cliquez **"Import"**

### **3.3 Configurer le projet**

Vercel détectera automatiquement que c'est un projet Next.js.

**Configuration recommandée :**

- **Framework Preset:** Next.js (détecté automatiquement)
- **Root Directory:** `./` (par défaut)
- **Build Command:** `npm run build` (par défaut)
- **Output Directory:** `.next` (par défaut)
- **Install Command:** `npm install` (par défaut)

**Variables d'environnement :** (Aucune nécessaire pour l'instant)

### **3.4 Déployer**

1. Cliquez **"Deploy"**
2. Attendez 2-3 minutes (Vercel va :
   - Installer les dépendances
   - Builder le projet
   - Déployer sur le CDN)
3. ✅ **Votre site est en ligne !**

---

## 🎉 Étape 4: Accéder à Votre Site

### **4.1 URL Vercel Gratuite**

Vercel vous donnera une URL gratuite :
```
https://shein-tunisia.vercel.app
```

Ou quelque chose comme :
```
https://shein-tunisia-username.vercel.app
```

### **4.2 Tester le Site**

1. Cliquez sur l'URL fournie par Vercel
2. Testez toutes les pages :
   - ✅ Accueil
   - ✅ Boutique
   - ✅ Contact
   - ✅ À Propos
   - ✅ FAQ
   - ✅ Panier
   - ✅ Admin

---

## 🔄 Étape 5: Mises à Jour Automatiques

### **Comment ça marche ?**

Chaque fois que vous poussez du code sur GitHub, Vercel **redéploie automatiquement** !

### **Workflow de mise à jour :**

```bash
# 1. Faites vos modifications dans le code

# 2. Ajoutez les fichiers modifiés
git add .

# 3. Créez un commit
git commit -m "Description de vos modifications"

# 4. Poussez sur GitHub
git push

# 5. Vercel redéploie automatiquement (2-3 minutes)
```

---

## 🌍 Étape 6: Domaine Personnalisé (Optionnel)

### **Option 1: Domaine Gratuit Vercel**

Vous avez déjà un domaine gratuit `.vercel.app` !

### **Option 2: Acheter un Domaine Tunisien**

Si vous voulez un domaine comme `shein.tn` :

1. **Acheter le domaine** sur :
   - https://www.tunisiedomaine.com
   - https://www.hostinger.tn
   - Prix : ~50-100 TND/an

2. **Configurer sur Vercel** :
   - Allez dans votre projet Vercel
   - Cliquez "Settings" → "Domains"
   - Ajoutez votre domaine
   - Suivez les instructions DNS

---

## ⚠️ Important: Base de Données

### **Problème Actuel**

Votre site utilise une base de données **in-memory** (stockage temporaire).

**Cela signifie :**
- ❌ Les produits disparaissent après chaque redéploiement
- ❌ Les commandes ne sont pas sauvegardées
- ❌ Les messages de contact sont perdus

### **Solution: Ajouter une Vraie Base de Données**

Vous avez 2 options gratuites :

#### **Option A: MongoDB Atlas (Recommandé)**

**Avantages :**
- ✅ 100% gratuit (512 MB)
- ✅ Facile à utiliser
- ✅ Hébergé dans le cloud
- ✅ Sauvegarde automatique

**Étapes :**
1. Créez un compte sur https://www.mongodb.com/cloud/atlas
2. Créez un cluster gratuit
3. Obtenez la connection string
4. Ajoutez-la dans Vercel (Variables d'environnement)
5. Modifiez `lib/db.ts` pour utiliser MongoDB

#### **Option B: Vercel Postgres**

**Avantages :**
- ✅ Intégré à Vercel
- ✅ Gratuit (256 MB)
- ✅ Configuration facile

**Étapes :**
1. Dans votre projet Vercel, allez dans "Storage"
2. Créez une base Postgres
3. Connectez-la à votre projet
4. Modifiez `lib/db.ts` pour utiliser Postgres

---

## 📊 Étape 7: Monitoring et Analytics

### **Vercel Analytics (Gratuit)**

1. Dans votre projet Vercel
2. Allez dans "Analytics"
3. Activez les analytics
4. Voyez :
   - Nombre de visiteurs
   - Pages les plus visitées
   - Performance du site

### **Google Analytics (Gratuit)**

1. Créez un compte Google Analytics
2. Obtenez votre ID de suivi
3. Ajoutez-le dans votre site Next.js

---

## 🔒 Étape 8: Sécurité

### **Variables d'Environnement**

Pour les informations sensibles (mots de passe admin, clés API) :

1. Dans Vercel, allez dans "Settings" → "Environment Variables"
2. Ajoutez vos variables :
   ```
   ADMIN_PASSWORD=votre_mot_de_passe_sécurisé
   DATABASE_URL=votre_url_de_base_de_données
   ```
3. Redéployez

### **HTTPS**

✅ Vercel active automatiquement HTTPS (gratuit)

---

## 📱 Étape 9: Tester sur Mobile

### **Tester Localement**

1. Trouvez l'IP de votre ordinateur :
   ```bash
   ipconfig
   ```
2. Sur votre téléphone, allez sur :
   ```
   http://VOTRE_IP:3000
   ```

### **Tester en Production**

1. Ouvrez votre site Vercel sur votre téléphone
2. Testez toutes les fonctionnalités
3. Vérifiez le responsive

---

## 🎯 Checklist de Déploiement

### **Avant le Déploiement**
- [ ] Code testé localement
- [ ] Toutes les pages fonctionnent
- [ ] Formulaires validés
- [ ] Images optimisées
- [ ] Pas d'erreurs dans la console

### **Déploiement**
- [ ] Compte GitHub créé
- [ ] Dépôt GitHub créé
- [ ] Code poussé sur GitHub
- [ ] Compte Vercel créé
- [ ] Projet importé sur Vercel
- [ ] Déploiement réussi

### **Après le Déploiement**
- [ ] Site accessible via URL Vercel
- [ ] Toutes les pages testées
- [ ] Formulaires fonctionnent
- [ ] Images chargent correctement
- [ ] Responsive testé sur mobile
- [ ] Performance vérifiée

### **Optionnel**
- [ ] Base de données configurée
- [ ] Domaine personnalisé ajouté
- [ ] Analytics activé
- [ ] Variables d'environnement configurées

---

## 🆘 Dépannage

### **Problème: Build Failed**

**Solution :**
1. Vérifiez les erreurs dans les logs Vercel
2. Testez `npm run build` localement
3. Corrigez les erreurs
4. Poussez le code corrigé

### **Problème: Page 404**

**Solution :**
1. Vérifiez que les fichiers existent dans le dépôt
2. Vérifiez les chemins (case-sensitive)
3. Redéployez

### **Problème: Images ne chargent pas**

**Solution :**
1. Vérifiez que les images sont dans `/public`
2. Utilisez des chemins absolus : `/image.png`
3. Optimisez les images (< 1 MB)

### **Problème: Données perdues**

**Solution :**
1. Configurez une vraie base de données (MongoDB ou Postgres)
2. Migrez les données
3. Testez

---

## 💰 Coûts

### **Gratuit (Plan Hobby)**
- ✅ Bande passante illimitée
- ✅ 100 GB-heures de build
- ✅ Domaine .vercel.app
- ✅ HTTPS automatique
- ✅ Déploiements illimités
- ✅ Parfait pour commencer !

### **Payant (Si besoin plus tard)**
- **Pro:** $20/mois
  - Domaines personnalisés illimités
  - Analytics avancés
  - Support prioritaire

---

## 📚 Ressources

### **Documentation**
- Vercel: https://vercel.com/docs
- Next.js: https://nextjs.org/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com

### **Support**
- Vercel Discord: https://vercel.com/discord
- Next.js Discord: https://nextjs.org/discord

---

## 🎉 Résumé

**En 9 étapes simples :**

1. ✅ Préparer le projet (`.gitignore`, `package.json`)
2. ✅ Créer un dépôt GitHub
3. ✅ Pousser le code sur GitHub
4. ✅ Créer un compte Vercel
5. ✅ Importer le projet depuis GitHub
6. ✅ Déployer (automatique)
7. ✅ Accéder à votre site (URL .vercel.app)
8. ✅ Configurer une base de données (recommandé)
9. ✅ Profiter de votre site en ligne !

**Temps total : 15-30 minutes**

---

## 🚀 Commandes Rapides

```bash
# Initialiser Git
git init
git add .
git commit -m "Initial commit"

# Ajouter GitHub (remplacez USERNAME et REPO)
git remote add origin https://github.com/USERNAME/REPO.git
git branch -M main
git push -u origin main

# Mises à jour futures
git add .
git commit -m "Description des modifications"
git push
```

---

**Votre site sera en ligne en quelques minutes !** 🎉🚀

**URL finale :** `https://votre-projet.vercel.app`

---

**Fait avec 💖 pour She in**  
**Déploiement gratuit et facile ✅**
