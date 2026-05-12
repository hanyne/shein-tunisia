# 🚀 Hébergement Gratuit - Guide Rapide

**Plateforme:** Vercel (100% Gratuit)  
**Temps:** 15 minutes  
**Niveau:** Facile

---

## 🎯 En 3 Étapes Simples

### **Étape 1: GitHub** (5 minutes)
### **Étape 2: Vercel** (5 minutes)
### **Étape 3: En Ligne !** (5 minutes)

---

## 📦 Étape 1: Mettre le Code sur GitHub

### **1.1 Créer un compte GitHub**

1. Allez sur **https://github.com**
2. Cliquez **"Sign up"**
3. Créez votre compte (gratuit)

### **1.2 Créer un nouveau dépôt**

1. Cliquez le bouton **"+"** en haut à droite
2. Cliquez **"New repository"**
3. Remplissez :
   - **Nom:** `shein-tunisia`
   - **Public** (cochez)
4. Cliquez **"Create repository"**

### **1.3 Pousser votre code**

Ouvrez un terminal dans votre dossier projet :

```bash
# Étape 1: Initialiser Git
git init

# Étape 2: Ajouter tous les fichiers
git add .

# Étape 3: Créer le premier commit
git commit -m "Premier commit - Site She in"

# Étape 4: Connecter à GitHub (remplacez USERNAME par votre nom d'utilisateur)
git remote add origin https://github.com/USERNAME/shein-tunisia.git

# Étape 5: Pousser le code
git branch -M main
git push -u origin main
```

**✅ Votre code est maintenant sur GitHub !**

---

## 🌐 Étape 2: Déployer sur Vercel

### **2.1 Créer un compte Vercel**

1. Allez sur **https://vercel.com**
2. Cliquez **"Sign Up"**
3. Choisissez **"Continue with GitHub"**
4. Autorisez Vercel

### **2.2 Importer votre projet**

1. Sur le dashboard Vercel, cliquez **"Add New..."**
2. Cliquez **"Project"**
3. Trouvez votre dépôt **"shein-tunisia"**
4. Cliquez **"Import"**

### **2.3 Déployer**

1. Vercel détecte automatiquement Next.js
2. Cliquez **"Deploy"**
3. Attendez 2-3 minutes ⏳

**✅ Votre site est en ligne !**

---

## 🎉 Étape 3: Accéder à Votre Site

Vercel vous donne une URL gratuite :

```
https://shein-tunisia.vercel.app
```

**Testez votre site :**
- ✅ Accueil
- ✅ Boutique
- ✅ Contact
- ✅ Admin

---

## 🔄 Mises à Jour Automatiques

Chaque fois que vous modifiez le code :

```bash
# 1. Modifiez votre code

# 2. Sauvegardez et poussez
git add .
git commit -m "Mes modifications"
git push

# 3. Vercel redéploie automatiquement !
```

---

## ⚠️ Important: Base de Données

**Problème actuel :**
- Les produits disparaissent après chaque redéploiement
- Les commandes ne sont pas sauvegardées

**Solution : MongoDB Atlas (Gratuit)**

### **Configurer MongoDB Atlas**

1. **Créer un compte**
   - Allez sur https://www.mongodb.com/cloud/atlas
   - Cliquez "Try Free"
   - Créez votre compte

2. **Créer un cluster**
   - Choisissez "Free" (M0)
   - Région: Europe (Paris ou Frankfurt)
   - Cliquez "Create Cluster"

3. **Créer un utilisateur**
   - Username: `admin`
   - Password: (créez un mot de passe fort)
   - Cliquez "Create User"

4. **Autoriser l'accès**
   - IP Address: `0.0.0.0/0` (tous les IPs)
   - Cliquez "Add Entry"

5. **Obtenir la connection string**
   - Cliquez "Connect"
   - Choisissez "Connect your application"
   - Copiez la connection string :
     ```
     mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/
     ```

6. **Ajouter dans Vercel**
   - Dans votre projet Vercel
   - Allez dans "Settings" → "Environment Variables"
   - Ajoutez :
     - **Name:** `MONGODB_URI`
     - **Value:** (collez votre connection string)
   - Cliquez "Save"

7. **Modifier le code**
   - Créez `lib/mongodb.ts` (je vous fournirai le code)
   - Modifiez `lib/db.ts` pour utiliser MongoDB
   - Poussez le code sur GitHub
   - Vercel redéploie automatiquement

---

## 💡 Conseils

### **Domaine Personnalisé**

Si vous voulez `shein.tn` au lieu de `.vercel.app` :

1. Achetez le domaine sur :
   - https://www.tunisiedomaine.com (~50 TND/an)
   - https://www.hostinger.tn (~80 TND/an)

2. Dans Vercel :
   - Settings → Domains
   - Ajoutez votre domaine
   - Suivez les instructions DNS

### **Performance**

Vercel optimise automatiquement :
- ✅ HTTPS (gratuit)
- ✅ CDN mondial
- ✅ Compression
- ✅ Cache intelligent

### **Analytics**

Dans Vercel, activez "Analytics" pour voir :
- Nombre de visiteurs
- Pages populaires
- Performance

---

## 🆘 Problèmes Courants

### **"Build Failed"**

**Solution :**
```bash
# Testez localement
npm run build

# Si erreurs, corrigez-les
# Puis poussez
git add .
git commit -m "Fix build errors"
git push
```

### **"Images ne chargent pas"**

**Solution :**
- Vérifiez que les images sont dans `/public`
- Utilisez `/image.png` (pas `./image.png`)

### **"Données perdues"**

**Solution :**
- Configurez MongoDB Atlas (voir ci-dessus)

---

## 📊 Récapitulatif

### **Ce que vous avez maintenant :**

✅ **Site en ligne** sur `https://votre-projet.vercel.app`  
✅ **HTTPS gratuit** (sécurisé)  
✅ **Déploiement automatique** (push = mise à jour)  
✅ **Performance optimale** (CDN mondial)  
✅ **100% gratuit** (pas de carte bancaire)

### **Ce qu'il faut faire ensuite :**

1. ⚠️ **Configurer MongoDB** (pour sauvegarder les données)
2. 📱 **Tester sur mobile**
3. 🎨 **Ajouter des produits** via l'admin
4. 📢 **Partager le lien** avec vos clients
5. 💰 **Commencer à vendre !**

---

## 🎯 Commandes à Retenir

```bash
# Première fois
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/REPO.git
git branch -M main
git push -u origin main

# Mises à jour
git add .
git commit -m "Description"
git push
```

---

## 📞 Besoin d'Aide ?

### **Documentation**
- Vercel: https://vercel.com/docs
- MongoDB: https://docs.atlas.mongodb.com

### **Support**
- Vercel Support: https://vercel.com/support
- Discord Vercel: https://vercel.com/discord

---

## 🎉 Félicitations !

**Votre site She in est maintenant en ligne !**

**Partagez votre lien :**
```
https://votre-projet.vercel.app
```

**Prochaines étapes :**
1. Configurez MongoDB pour sauvegarder les données
2. Ajoutez vos produits via l'admin
3. Testez tout sur mobile
4. Partagez sur les réseaux sociaux
5. Commencez à vendre !

---

**Fait avec 💖 pour She in**  
**Hébergement gratuit et facile ✅**  
**En ligne en 15 minutes 🚀**
