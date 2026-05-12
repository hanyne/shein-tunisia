# 🔐 She in - Guide d'Administration

## 📋 Table des Matières
1. [Connexion Admin](#connexion-admin)
2. [Tableau de Bord](#tableau-de-bord)
3. [Gestion des Produits](#gestion-des-produits)
4. [Ajouter un Produit](#ajouter-un-produit)
5. [Modifier un Produit](#modifier-un-produit)
6. [Supprimer un Produit](#supprimer-un-produit)
7. [Sécurité](#sécurité)

---

## 🔑 Connexion Admin

### Accès au Panneau d'Administration

**URL:** `http://localhost:3000/admin/login`

### Identifiants par Défaut

```
Email: admin@shein.tn
Mot de passe: admin123
```

⚠️ **Important:** Changez ces identifiants en production!

---

## 📊 Tableau de Bord

Après connexion, vous accédez au tableau de bord principal qui affiche:

- **Statistiques en temps réel:**
  - Nombre total de produits
  - Nombre de commandes
  - Revenus totaux
  - Nombre de clients

- **Actions Rapides:**
  - Gérer les Produits
  - Gérer les Commandes
  - Gérer les Clients

**URL:** `http://localhost:3000/admin/dashboard`

---

## 🛍️ Gestion des Produits

### Vue d'Ensemble

La page de gestion des produits affiche tous les produits dans un tableau avec:
- Image du produit
- Nom
- Catégorie
- Prix
- Statut du stock
- Actions (Modifier/Supprimer)

**URL:** `http://localhost:3000/admin/products`

---

## ➕ Ajouter un Produit

### Étapes:

1. Cliquez sur **"Nouveau Produit"** dans la page de gestion des produits
2. Remplissez le formulaire:

#### Champs Obligatoires:

**Nom du Produit**
- Exemple: `Robe Fleurie Élégante`

**Prix (TND)**
- Exemple: `89.99`
- Format: Nombre décimal

**Catégorie**
- Options disponibles:
  - Robes
  - Sacs
  - Chaussures
  - Accessoires
  - Maquillage
  - Ensembles

**Description**
- Description détaillée du produit
- Exemple: `Magnifique robe fleurie parfaite pour toutes les occasions. Fabriquée avec des matériaux de haute qualité.`

**URLs des Images**
- Entrez les URLs des images séparées par des virgules
- Exemple: `https://example.com/image1.jpg, https://example.com/image2.jpg`
- Vous pouvez utiliser des images de:
  - Unsplash: `https://images.unsplash.com/...`
  - Votre propre serveur
  - Services d'hébergement d'images

**Tailles**
- Séparées par des virgules
- Exemple: `XS,S,M,L,XL`
- Pour les sacs/accessoires: `Unique`

**Couleurs**
- Séparées par des virgules
- Exemple: `Rose,Blanc,Noir,Beige`

#### Options:

☑️ **En stock** - Le produit est disponible à la vente

☑️ **Nouveau produit** - Affiche le badge "NOUVEAU" sur le produit

☑️ **Best-seller** - Affiche le badge "BEST-SELLER" et apparaît dans la section Best-Sellers

3. Cliquez sur **"Enregistrer le Produit"**

**URL:** `http://localhost:3000/admin/products/new`

---

## ✏️ Modifier un Produit

### Étapes:

1. Dans la page de gestion des produits, cliquez sur l'icône **✏️ (Modifier)**
2. Modifiez les champs souhaités
3. Cliquez sur **"Enregistrer les Modifications"**

**URL:** `http://localhost:3000/admin/products/edit/[id]`

---

## 🗑️ Supprimer un Produit

### Étapes:

1. Dans la page de gestion des produits, cliquez sur l'icône **🗑️ (Supprimer)**
2. Confirmez la suppression dans la boîte de dialogue
3. Le produit sera supprimé immédiatement

⚠️ **Attention:** Cette action est irréversible!

---

## 🔒 Sécurité

### Fonctionnalités de Sécurité Implémentées:

1. **Authentification Requise**
   - Toutes les routes admin nécessitent une connexion
   - Session sécurisée avec cookies HttpOnly

2. **Protection des API**
   - Les endpoints de création/modification/suppression vérifient l'authentification
   - Retourne une erreur 401 si non authentifié

3. **Session Expiration**
   - Les sessions expirent après 24 heures
   - Reconnexion automatique requise

### Déconnexion

Cliquez sur le bouton **"Déconnexion"** dans le header du dashboard

---

## 🎯 Conseils et Bonnes Pratiques

### Images de Produits:

1. **Qualité:** Utilisez des images haute résolution (minimum 800x800px)
2. **Format:** JPG ou PNG
3. **Taille:** Optimisez les images pour le web (< 500KB par image)
4. **Nombre:** Ajoutez 2-4 images par produit pour montrer différents angles

### Description de Produits:

1. **Détails:** Incluez les matériaux, dimensions, caractéristiques
2. **Longueur:** 2-3 phrases minimum
3. **Mots-clés:** Utilisez des termes que les clients recherchent

### Prix:

1. **Cohérence:** Vérifiez les prix du marché
2. **Format:** Utilisez toujours 2 décimales (89.99 et non 89.9)

### Catégories:

1. **Précision:** Choisissez la catégorie la plus appropriée
2. **Cohérence:** Utilisez toujours les mêmes catégories

### Stock:

1. **Mise à jour:** Décochez "En stock" quand un produit est épuisé
2. **Réactivation:** Recochez quand le stock est réapprovisionné

---

## 📱 Affichage sur le Site

### Où Apparaissent les Produits:

1. **Page Boutique** (`/shop`)
   - Tous les produits avec filtres

2. **Page d'Accueil** (`/`)
   - **Nouveautés:** Produits marqués "Nouveau produit"
   - **Best-Sellers:** Produits marqués "Best-seller"

3. **Page Catégorie**
   - Filtrés par catégorie

4. **Page Produit** (`/product/[id]`)
   - Page détaillée avec toutes les informations

---

## 🆘 Dépannage

### Problème: Je ne peux pas me connecter

**Solution:**
- Vérifiez vos identifiants
- Assurez-vous d'utiliser: `admin@shein.tn` / `admin123`
- Videz le cache de votre navigateur

### Problème: Les images ne s'affichent pas

**Solution:**
- Vérifiez que les URLs sont correctes et accessibles
- Assurez-vous que les URLs commencent par `http://` ou `https://`
- Testez l'URL dans votre navigateur

### Problème: Le produit n'apparaît pas sur le site

**Solution:**
- Vérifiez que "En stock" est coché
- Actualisez la page du site (F5)
- Vérifiez la catégorie du produit

---

## 🚀 Prochaines Fonctionnalités

- Gestion des commandes
- Gestion des clients
- Statistiques avancées
- Upload d'images direct
- Gestion du stock avec quantités
- Notifications par email
- Export de données

---

## 📞 Support

Pour toute question ou problème:
- Email: contact@shein.tn
- Téléphone: +216 XX XXX XXX

---

**Fait avec 💖 par l'équipe She in**
