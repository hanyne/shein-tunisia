# 🛍️ She in - Boutique en Ligne de Mode

**Site e-commerce moderne pour l'importation de produits de mode en Tunisie**

---

## 🎯 À Propos

She in est une boutique en ligne spécialisée dans l'importation de produits de mode tendance depuis les plus grandes plateformes internationales (SHEIN, Zalando, etc.) vers la Tunisie.

**Caractéristiques:**
- ✅ Design moderne et élégant
- ✅ 100% responsive (mobile, tablette, desktop)
- ✅ Interface en français
- ✅ Filtres avancés fonctionnels
- ✅ Panel admin complet
- ✅ Sécurité implémentée

---

## 🚀 Démarrage Rapide

### **Installation**

```bash
# Cloner le projet
git clone https://github.com/USERNAME/shein-tunisia.git

# Installer les dépendances
cd shein-tunisia
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur http://localhost:3000

### **Build de Production**

```bash
npm run build
npm start
```

---

## 📁 Structure du Projet

```
shein-tunisia/
├── app/                      # Pages Next.js
│   ├── page.tsx             # Page d'accueil
│   ├── shop/                # Boutique
│   ├── contact/             # Contact
│   ├── about/               # À propos
│   ├── cart/                # Panier
│   ├── checkout/            # Checkout
│   ├── admin/               # Panel admin
│   └── api/                 # API routes
├── components/              # Composants React
│   ├── layout/              # Header, Footer
│   ├── home/                # Sections page d'accueil
│   ├── products/            # ProductCard
│   └── admin/               # Composants admin
├── lib/                     # Utilitaires
│   ├── db.ts               # Base de données
│   ├── auth.ts             # Authentification
│   └── security.ts         # Sécurité
├── store/                   # Zustand stores
│   ├── useCartStore.ts     # Panier
│   └── useWishlistStore.ts # Wishlist
└── public/                  # Fichiers statiques
    └── logo.png            # Logo
```

---

## 🎨 Fonctionnalités

### **Pages Publiques**
- 🏠 **Accueil** - Hero section, nouveautés, best-sellers
- 🛍️ **Boutique** - Filtres avancés, tri, vue grille/liste
- 👗 **Produit** - Détails, tailles, couleurs, avis
- 🛒 **Panier** - Gestion des articles
- ❤️ **Wishlist** - Liste de souhaits
- 💳 **Checkout** - Formulaire de commande
- 📧 **Contact** - Formulaire avec coordonnées
- ℹ️ **À Propos** - Histoire et valeurs
- ❓ **FAQ** - Questions fréquentes
- 📦 **Suivi** - Suivi de commande

### **Panel Admin**
- 🔐 **Login** - Authentification sécurisée
- 📊 **Dashboard** - Statistiques
- 📦 **Produits** - CRUD complet
- 🛒 **Commandes** - Gestion avec filtres
- 💬 **Messages** - Gestion des contacts
- ⚙️ **Paramètres** - Changement de mot de passe

### **Filtres Boutique**
- 🔍 Recherche par texte
- 📂 Catégories (7 catégories)
- 📏 Tailles (multi-sélection)
- 🎨 Couleurs (aperçu visuel)
- 💰 Prix (slider 0-500 TND)
- ⚡ Filtres rapides (nouveautés, stock)
- ⭐ Tri (vedette, prix, date, nom)

### **Sécurité**
- 🔒 Rate limiting
- ✅ Validation des entrées
- 🧹 Sanitization
- 👥 RBAC (Role-Based Access Control)
- 📝 Logging

---

## 🛠️ Technologies

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **State:** Zustand
- **Icons:** React Icons
- **Deployment:** Vercel

---

## 📞 Coordonnées

**Adresse:**  
Rue Habib Thamer, Korba  
En face Merry House Make Up  
Nabeul, Tunisie

**Téléphone:** +216 26 316 003  
**Email:** contact@shein.tn

**Réseaux Sociaux:**
- Instagram
- Facebook
- TikTok

---

## 🚀 Déploiement

### **Hébergement Gratuit sur Vercel**

Suivez le guide détaillé dans `HEBERGEMENT_GRATUIT.md`

**En résumé:**
1. Créez un compte GitHub
2. Poussez le code sur GitHub
3. Créez un compte Vercel
4. Importez le projet depuis GitHub
5. Déployez (automatique)

**Temps:** 15 minutes  
**Coût:** 0 TND (100% gratuit)

---

## ⚠️ Important: Base de Données

Le projet utilise actuellement un stockage **in-memory** (temporaire).

**Pour la production, configurez MongoDB Atlas:**
1. Créez un compte sur https://www.mongodb.com/cloud/atlas
2. Créez un cluster gratuit (512 MB)
3. Obtenez la connection string
4. Ajoutez-la dans Vercel (Environment Variables)
5. Modifiez `lib/db.ts` pour utiliser MongoDB

**Guide complet:** Voir `HEBERGEMENT_GRATUIT.md`

---

## 🔐 Identifiants Admin

**Email:** admin@shein.tn  
**Mot de passe:** admin123

⚠️ **Changez ce mot de passe en production !**

---

## 📚 Documentation

### **Guides Disponibles:**
- `HEBERGEMENT_GRATUIT.md` - Déploiement rapide (15 min)
- `DEPLOYMENT_GUIDE.md` - Guide complet de déploiement
- `DEPLOIEMENT_RAPIDE.md` - Guide visuel en 3 étapes
- `CORRECTIONS_BUILD.md` - Corrections des erreurs
- `SHOP_PAGE_IMPROVEMENTS.md` - Améliorations boutique
- `CONTACT_PAGE_IMPROVEMENTS.md` - Améliorations contact
- `SITE_EN_FRANCAIS.md` - Vérification français
- `PRET_POUR_DEPLOIEMENT.md` - Checklist finale

---

## 🐛 Dépannage

### **Erreur de Build**
```bash
# Nettoyer le cache
Remove-Item -Recurse -Force .next

# Rebuilder
npm run build
```

### **Erreur de Dépendances**
```bash
# Réinstaller
Remove-Item -Recurse -Force node_modules
npm install
```

### **Port 3000 Occupé**
```bash
# Changer le port
npm run dev -- -p 3001
```

---

## 📊 Statistiques

- **Pages:** 25+
- **Composants:** 20+
- **API Routes:** 15+
- **Lignes de Code:** 10,000+
- **Fonctionnalités:** 50+

---

## 🎯 Roadmap

### **Version Actuelle (v1.0)**
- ✅ Site complet et fonctionnel
- ✅ Design moderne
- ✅ Filtres avancés
- ✅ Admin complet
- ✅ Sécurité de base

### **Prochaines Versions**
- [ ] Intégration MongoDB
- [ ] Paiement en ligne (Stripe, PayPal)
- [ ] Notifications email
- [ ] Multi-langue (arabe, anglais)
- [ ] Programme de fidélité
- [ ] Codes promo
- [ ] Avis clients
- [ ] Chat en direct

---

## 🤝 Contribution

Ce projet est privé et développé pour She in.

---

## 📄 Licence

Tous droits réservés © 2024 She in

---

## 💖 Fait avec

- ❤️ Passion pour la mode
- ☕ Beaucoup de café
- 🎨 Design moderne
- 🚀 Technologies de pointe

---

## 📞 Support

Pour toute question ou assistance :
- **Email:** contact@shein.tn
- **Téléphone:** +216 26 316 003

---

**She in - La mode à portée de clic** 🛍️✨
