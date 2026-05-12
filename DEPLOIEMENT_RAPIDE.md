# 🚀 Déploiement Rapide - 3 Étapes

**Temps total:** 15 minutes  
**Coût:** 0 TND (100% gratuit)

---

## 📋 Ce Dont Vous Avez Besoin

- ✅ Un compte GitHub (gratuit)
- ✅ Un compte Vercel (gratuit)
- ✅ Git installé sur votre PC

---

## 🎯 Étape 1: GitHub (5 min)

### **A. Créer un compte**
```
1. Allez sur: https://github.com
2. Cliquez "Sign up"
3. Suivez les instructions
```

### **B. Créer un dépôt**
```
1. Cliquez le "+" en haut à droite
2. Cliquez "New repository"
3. Nom: shein-tunisia
4. Public: ✓
5. Cliquez "Create repository"
```

### **C. Pousser votre code**

Ouvrez un terminal dans `c:\Users\eki\Desktop\sirin` :

```bash
git init
git add .
git commit -m "Site She in - Premier commit"
git remote add origin https://github.com/VOTRE_USERNAME/shein-tunisia.git
git branch -M main
git push -u origin main
```

**⚠️ Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub !**

---

## 🌐 Étape 2: Vercel (5 min)

### **A. Créer un compte**
```
1. Allez sur: https://vercel.com
2. Cliquez "Sign Up"
3. Choisissez "Continue with GitHub"
4. Autorisez Vercel
```

### **B. Importer le projet**
```
1. Cliquez "Add New..." → "Project"
2. Trouvez "shein-tunisia"
3. Cliquez "Import"
```

### **C. Déployer**
```
1. Vercel détecte Next.js automatiquement
2. Cliquez "Deploy"
3. Attendez 2-3 minutes ⏳
```

---

## 🎉 Étape 3: C'est En Ligne ! (5 min)

### **Votre URL**
```
https://shein-tunisia.vercel.app
```

Ou quelque chose comme :
```
https://shein-tunisia-username.vercel.app
```

### **Testez tout**
- ✅ Page d'accueil
- ✅ Boutique
- ✅ Contact
- ✅ Admin (http://votre-url.vercel.app/admin/login)

---

## 🔄 Mises à Jour

Pour mettre à jour votre site :

```bash
# 1. Modifiez votre code

# 2. Sauvegardez et poussez
git add .
git commit -m "Mes modifications"
git push

# 3. Vercel redéploie automatiquement en 2-3 minutes !
```

---

## ⚠️ IMPORTANT: Base de Données

**Problème actuel:**
- Les produits/commandes disparaissent après chaque redéploiement
- Stockage temporaire (in-memory)

**Solution: MongoDB Atlas (Gratuit)**

### **Configuration Rapide**

1. **Créer un compte MongoDB**
   ```
   https://www.mongodb.com/cloud/atlas
   → "Try Free"
   → Créez votre compte
   ```

2. **Créer un cluster**
   ```
   → Choisissez "Free" (M0)
   → Région: Europe (Paris)
   → "Create Cluster"
   ```

3. **Créer un utilisateur**
   ```
   → Username: admin
   → Password: (créez un mot de passe)
   → "Create User"
   ```

4. **Autoriser l'accès**
   ```
   → IP: 0.0.0.0/0
   → "Add Entry"
   ```

5. **Obtenir la connection string**
   ```
   → "Connect"
   → "Connect your application"
   → Copiez la string:
     mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/
   ```

6. **Ajouter dans Vercel**
   ```
   → Votre projet Vercel
   → Settings → Environment Variables
   → Name: MONGODB_URI
   → Value: (collez votre string)
   → Save
   ```

7. **Code à modifier**
   - Je vous fournirai le code pour `lib/mongodb.ts`
   - Vous devrez modifier `lib/db.ts`
   - Puis pousser sur GitHub

---

## 📊 Résumé

### **Ce que vous avez:**
✅ Site en ligne sur Vercel  
✅ HTTPS gratuit (sécurisé)  
✅ Déploiement automatique  
✅ Performance optimale  
✅ 100% gratuit  

### **Ce qu'il faut faire:**
⚠️ Configurer MongoDB (urgent)  
📱 Tester sur mobile  
🎨 Ajouter des produits  
📢 Partager le lien  

---

## 🎯 Commandes Essentielles

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

## 🆘 Problèmes ?

### **Build Failed**
```bash
npm run build  # Testez localement
# Corrigez les erreurs
git add .
git commit -m "Fix"
git push
```

### **Images ne chargent pas**
- Vérifiez: images dans `/public`
- Utilisez: `/image.png` (pas `./image.png`)

### **Données perdues**
- Configurez MongoDB Atlas

---

## 📞 Support

- **Vercel:** https://vercel.com/support
- **MongoDB:** https://docs.atlas.mongodb.com
- **Discord Vercel:** https://vercel.com/discord

---

## 🎉 Félicitations !

**Votre site est en ligne !**

**Partagez:**
```
https://votre-projet.vercel.app
```

**Prochaines étapes:**
1. ⚠️ Configurez MongoDB (important !)
2. 🎨 Ajoutez vos produits
3. 📱 Testez sur mobile
4. 📢 Partagez sur Instagram/Facebook/TikTok
5. 💰 Commencez à vendre !

---

**Fait avec 💖 pour She in**  
**En ligne en 15 minutes 🚀**
