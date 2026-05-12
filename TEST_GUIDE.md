# 🧪 Guide de Test - She in

## ✅ Tests à Effectuer Avant l'Hébergement

---

## 1. 🔐 **Tests d'Authentification Admin**

### Test 1.1: Login Admin
```
1. Aller sur: http://localhost:3000/admin/login
2. Entrer: admin@shein.tn / admin123
3. Cliquer "Se Connecter"
✅ Résultat attendu: Redirection vers le dashboard
```

### Test 1.2: Protection des Routes
```
1. Sans être connecté, essayer d'accéder: http://localhost:3000/admin/dashboard
✅ Résultat attendu: Redirection vers login
```

### Test 1.3: Logout
```
1. Connecté, cliquer sur "Déconnexion"
✅ Résultat attendu: Redirection vers login, session terminée
```

---

## 2. 📦 **Tests de Gestion des Produits**

### Test 2.1: Ajouter un Produit
```
1. Login admin
2. Cliquer "Gérer les Produits"
3. Cliquer "Nouveau Produit"
4. Remplir:
   - Nom: "Test Robe Élégante"
   - Prix: 99.99
   - Catégorie: Robes
   - Description: "Belle robe de test"
5. Upload une image (drag & drop)
6. Sélectionner tailles: S, M, L
7. Sélectionner couleurs: Rose, Blanc
8. Cocher "En stock" et "Nouveau produit"
9. Cliquer "Enregistrer"
✅ Résultat attendu: Produit créé, redirection vers liste
```

### Test 2.2: Voir le Produit sur le Site
```
1. Aller sur: http://localhost:3000/shop
✅ Résultat attendu: Le produit apparaît dans la liste
```

### Test 2.3: Modifier un Produit
```
1. Dans la liste des produits, cliquer ✏️
2. Modifier le prix: 89.99
3. Ajouter une couleur: Noir
4. Cliquer "Enregistrer les Modifications"
✅ Résultat attendu: Modifications sauvegardées
```

### Test 2.4: Supprimer un Produit
```
1. Dans la liste, cliquer 🗑️
2. Confirmer la suppression
✅ Résultat attendu: Produit supprimé de la liste
```

---

## 3. 🛒 **Tests du Panier**

### Test 3.1: Ajouter au Panier
```
1. Aller sur /shop
2. Cliquer sur un produit
3. Sélectionner taille et couleur
4. Cliquer "Ajouter au Panier"
✅ Résultat attendu: Badge panier +1, message de confirmation
```

### Test 3.2: Voir le Panier
```
1. Cliquer sur l'icône panier
✅ Résultat attendu: Produit affiché avec détails
```

### Test 3.3: Modifier Quantité
```
1. Dans le panier, cliquer + et -
✅ Résultat attendu: Quantité change, prix total mis à jour
```

### Test 3.4: Supprimer du Panier
```
1. Cliquer sur l'icône 🗑️
✅ Résultat attendu: Produit retiré du panier
```

---

## 4. 💖 **Tests de la Wishlist**

### Test 4.1: Ajouter à la Wishlist
```
1. Sur une page produit, cliquer ❤️
✅ Résultat attendu: Cœur devient rouge, badge +1
```

### Test 4.2: Voir la Wishlist
```
1. Cliquer sur l'icône ❤️ dans le header
✅ Résultat attendu: Liste des produits favoris
```

### Test 4.3: Retirer de la Wishlist
```
1. Dans la wishlist, cliquer ❤️ rouge
✅ Résultat attendu: Produit retiré
```

---

## 5. 💳 **Tests du Checkout**

### Test 5.1: Validation des Champs
```
1. Aller au checkout avec un produit dans le panier
2. Essayer de soumettre sans remplir
✅ Résultat attendu: Messages d'erreur affichés
```

### Test 5.2: Validation Email
```
1. Entrer un email invalide: "test@"
2. Essayer de soumettre
✅ Résultat attendu: "Email invalide"
```

### Test 5.3: Validation Téléphone
```
1. Entrer un téléphone invalide: "123"
2. Essayer de soumettre
✅ Résultat attendu: "Numéro de téléphone invalide"
```

### Test 5.4: Checkout Complet
```
1. Remplir tous les champs correctement:
   - Prénom: Ahmed
   - Nom: Ben Ali
   - Email: ahmed@test.com
   - Téléphone: 20123456
   - Adresse: 123 Rue de la République
   - Ville: Tunis
2. Cliquer "Confirmer la Commande"
✅ Résultat attendu: Redirection vers page de confirmation
```

---

## 6. 📧 **Tests du Formulaire de Contact**

### Test 6.1: Validation des Champs
```
1. Aller sur /contact
2. Essayer de soumettre sans remplir
✅ Résultat attendu: Messages d'erreur
```

### Test 6.2: Validation Nom
```
1. Entrer un nom trop court: "A"
2. Essayer de soumettre
✅ Résultat attendu: "Le nom doit contenir au moins 2 caractères"
```

### Test 6.3: Validation Message
```
1. Entrer un message trop court: "Test"
2. Essayer de soumettre
✅ Résultat attendu: "Le message doit contenir au moins 10 caractères"
```

### Test 6.4: Envoi Complet
```
1. Remplir tous les champs correctement
2. Cliquer "Envoyer le Message"
✅ Résultat attendu: Message de confirmation
```

---

## 7. 🔍 **Tests de Navigation**

### Test 7.1: Menu Principal
```
1. Cliquer sur chaque lien du menu
✅ Résultat attendu: Toutes les pages se chargent
```

### Test 7.2: Logo
```
1. Cliquer sur le logo
✅ Résultat attendu: Retour à la page d'accueil
```

### Test 7.3: Footer
```
1. Cliquer sur tous les liens du footer
✅ Résultat attendu: Toutes les pages se chargent
```

### Test 7.4: Recherche
```
1. Utiliser la barre de recherche
✅ Résultat attendu: Recherche fonctionne
```

---

## 8. 📱 **Tests Responsive**

### Test 8.1: Mobile (320px)
```
1. Ouvrir DevTools (F12)
2. Sélectionner iPhone SE
3. Naviguer sur le site
✅ Résultat attendu: Tout s'affiche correctement
```

### Test 8.2: Tablette (768px)
```
1. Sélectionner iPad
2. Naviguer sur le site
✅ Résultat attendu: Layout adapté
```

### Test 8.3: Desktop (1920px)
```
1. Sélectionner Desktop
2. Naviguer sur le site
✅ Résultat attendu: Layout optimal
```

### Test 8.4: Menu Mobile
```
1. Sur mobile, cliquer sur le menu hamburger
✅ Résultat attendu: Menu s'ouvre en slide
```

---

## 9. 🎨 **Tests Visuels**

### Test 9.1: Logo
```
1. Vérifier que le logo s'affiche dans le header
2. Vérifier que le logo s'affiche dans le footer
✅ Résultat attendu: Logo visible et bien dimensionné
```

### Test 9.2: Images Produits
```
1. Vérifier que toutes les images se chargent
✅ Résultat attendu: Pas d'images cassées
```

### Test 9.3: Animations
```
1. Scroller sur la page d'accueil
✅ Résultat attendu: Animations fluides
```

### Test 9.4: Hover Effects
```
1. Survoler les boutons et cartes
✅ Résultat attendu: Effets de hover visibles
```

---

## 10. 🔒 **Tests de Sécurité**

### Test 10.1: Accès Admin Sans Login
```
1. Sans être connecté, essayer:
   - /admin/dashboard
   - /admin/products
   - /admin/products/new
✅ Résultat attendu: Redirection vers login
```

### Test 10.2: API Protection
```
1. Sans être connecté, essayer:
   - POST /api/products
   - PUT /api/products/1
   - DELETE /api/products/1
✅ Résultat attendu: Erreur 401
```

### Test 10.3: Upload Sans Auth
```
1. Sans être connecté, essayer d'uploader une image
✅ Résultat attendu: Erreur 401
```

---

## 11. ⚡ **Tests de Performance**

### Test 11.1: Temps de Chargement
```
1. Ouvrir DevTools → Network
2. Recharger la page d'accueil
✅ Résultat attendu: < 3 secondes
```

### Test 11.2: Taille des Images
```
1. Vérifier la taille des images uploadées
✅ Résultat attendu: < 2MB par image
```

### Test 11.3: Console Errors
```
1. Ouvrir DevTools → Console
2. Naviguer sur le site
✅ Résultat attendu: Pas d'erreurs rouges
```

---

## 12. 🌐 **Tests Multi-Navigateurs**

### Test 12.1: Chrome
```
1. Tester toutes les fonctionnalités sur Chrome
✅ Résultat attendu: Tout fonctionne
```

### Test 12.2: Firefox
```
1. Tester toutes les fonctionnalités sur Firefox
✅ Résultat attendu: Tout fonctionne
```

### Test 12.3: Safari
```
1. Tester toutes les fonctionnalités sur Safari
✅ Résultat attendu: Tout fonctionne
```

### Test 12.4: Edge
```
1. Tester toutes les fonctionnalités sur Edge
✅ Résultat attendu: Tout fonctionne
```

---

## 📋 **Checklist Finale**

Avant de déployer, vérifier:

### Fonctionnalités:
- [ ] Login admin fonctionne
- [ ] Ajout de produits fonctionne
- [ ] Modification de produits fonctionne
- [ ] Suppression de produits fonctionne
- [ ] Upload d'images fonctionne
- [ ] Panier fonctionne
- [ ] Wishlist fonctionne
- [ ] Checkout fonctionne
- [ ] Formulaire de contact fonctionne

### Validations:
- [ ] Toutes les validations fonctionnent
- [ ] Messages d'erreur clairs
- [ ] Pas de soumission avec erreurs

### Visuel:
- [ ] Logo s'affiche correctement
- [ ] Images se chargent
- [ ] Animations fluides
- [ ] Responsive sur tous les écrans

### Sécurité:
- [ ] Routes admin protégées
- [ ] API protégée
- [ ] Sessions fonctionnent
- [ ] Pas d'erreurs console

### Performance:
- [ ] Chargement rapide
- [ ] Pas d'erreurs
- [ ] Images optimisées

---

## 🎯 **Résultats Attendus**

Si tous les tests passent:
✅ **Le site est prêt pour l'hébergement!**

Si des tests échouent:
❌ **Corriger les problèmes avant de déployer**

---

## 📞 **En Cas de Problème**

1. **Vérifier la console** (F12)
2. **Vérifier les logs serveur**
3. **Tester en mode incognito**
4. **Vider le cache**
5. **Redémarrer le serveur**

---

**Bon tests!** 🧪✨
