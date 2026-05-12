# 🧪 Test Rapide du Système de Commandes

## ✅ Test en 5 Minutes

### **Étape 1: Créer une Commande Test (2 min)**

1. Ouvrez: http://localhost:3000/shop
2. Cliquez sur un produit
3. Sélectionnez taille et couleur
4. Cliquez "Ajouter au Panier"
5. Cliquez sur l'icône panier (en haut à droite)
6. Cliquez "Passer la Commande"
7. Remplissez le formulaire:
   ```
   Prénom: Ahmed
   Nom: Ben Ali
   Email: test@example.com
   Téléphone: 20123456
   Adresse: 123 Avenue Habib Bourguiba
   Ville: Tunis
   Notes: Test de commande
   ```
8. Cliquez "Confirmer la Commande"
9. ✅ Notez le numéro de commande affiché (ex: SHE12345678)

---

### **Étape 2: Vérifier dans l'Admin (2 min)**

1. Ouvrez: http://localhost:3000/admin/login
2. Connectez-vous:
   ```
   Email: admin@shein.tn
   Mot de passe: admin123
   ```
3. Cliquez sur "Gérer les Commandes"
4. ✅ Votre commande test doit apparaître en haut de la liste
5. Vérifiez:
   - ✅ Numéro de commande correct
   - ✅ Nom du client: Ahmed Ben Ali
   - ✅ Statut: En Attente (badge jaune)
   - ✅ Total correct

---

### **Étape 3: Tester les Filtres (1 min)**

**Test 1: Recherche par nom**
1. Dans la barre de recherche, tapez: "Ahmed"
2. ✅ La commande doit apparaître

**Test 2: Filtre par statut**
1. Sélectionnez "En Attente" dans le filtre statut
2. ✅ Seules les commandes en attente s'affichent

**Test 3: Réinitialiser**
1. Cliquez "Réinitialiser les filtres"
2. ✅ Toutes les commandes réapparaissent

---

### **Étape 4: Voir les Détails (30 sec)**

1. Cliquez sur "Voir" pour votre commande test
2. ✅ Vérifiez que le modal s'ouvre
3. ✅ Vérifiez toutes les informations:
   - Informations client
   - Adresse complète
   - Notes
   - Produits commandés avec images
   - Total

---

### **Étape 5: Changer le Statut (30 sec)**

1. Dans le modal, changez le statut:
   - Sélectionnez "Confirmée"
2. ✅ Le statut change immédiatement
3. Fermez le modal
4. ✅ Le badge dans la liste est maintenant bleu

**Testez tous les statuts:**
- En Attente → Jaune 🟡
- Confirmée → Bleu 🔵
- En Préparation → Violet 🟣
- Expédiée → Indigo 🔷
- Livrée → Vert 🟢
- Annulée → Rouge 🔴

---

### **Étape 6: Export CSV (30 sec)**

1. Cliquez sur "Exporter CSV"
2. ✅ Un fichier CSV est téléchargé
3. Ouvrez-le dans Excel ou Google Sheets
4. ✅ Vérifiez que toutes les données sont présentes

---

## 🎯 Résultat Attendu

Si tous les tests passent:
✅ **Le système de commandes fonctionne parfaitement!**

---

## 🐛 Dépannage Rapide

### **Problème: Commande ne s'enregistre pas**
- Vérifiez la console (F12)
- Vérifiez que tous les champs sont remplis
- Essayez de rafraîchir la page

### **Problème: Commande n'apparaît pas dans l'admin**
- Rafraîchissez la page admin
- Vérifiez que vous êtes connecté
- Cliquez sur "Réinitialiser les filtres"

### **Problème: Impossible de changer le statut**
- Vérifiez votre connexion internet
- Reconnectez-vous à l'admin
- Rafraîchissez la page

---

## 📊 Test de Charge (Optionnel)

**Créez 10 commandes test rapidement:**

1. Utilisez différents noms:
   - Ahmed Ben Ali
   - Fatma Trabelsi
   - Mohamed Gharbi
   - Leila Mansour
   - Karim Bouazizi
   - Sonia Hamdi
   - Youssef Mejri
   - Amira Sassi
   - Rami Jebali
   - Nour Khelifi

2. Utilisez différentes villes:
   - Tunis, Sfax, Sousse, Nabeul, Bizerte
   - Ariana, Monastir, Gabès, Kairouan, Mahdia

3. Testez les filtres avec plusieurs commandes:
   - Recherche par ville
   - Filtre par statut
   - Filtre par date

---

## ✅ Checklist Finale

Avant de considérer le système prêt:

- [ ] Commande créée depuis le site
- [ ] Commande visible dans l'admin
- [ ] Tous les détails corrects
- [ ] Filtres fonctionnent
- [ ] Recherche fonctionne
- [ ] Changement de statut fonctionne
- [ ] Export CSV fonctionne
- [ ] Modal de détails s'ouvre
- [ ] Responsive sur mobile
- [ ] Pas d'erreurs dans la console

---

## 🎉 Félicitations!

Si tous les tests passent, votre système de gestion des commandes est **100% opérationnel**!

**Vous êtes prêt à recevoir vos premières vraies commandes!** 🚀

---

**Temps total du test: ~5 minutes**
**Niveau de difficulté: Facile**
**Résultat: Système professionnel et complet!** ✨
