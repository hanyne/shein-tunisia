# 📊 Intégration Google Sheets - Guide Complet

## 🎯 Objectif

Exporter automatiquement les commandes vers Google Sheets pour un suivi facile et une analyse des données.

---

## 📋 Méthode 1: Export CSV (Déjà Implémenté) ✅

### **Fonctionnalité Actuelle:**

Dans la page **Gestion des Commandes** (`/admin/orders`), vous avez un bouton **"Exporter CSV"** qui:
- Exporte toutes les commandes filtrées
- Génère un fichier CSV avec toutes les informations
- Peut être importé dans Google Sheets

### **Comment Utiliser:**

1. Allez sur `/admin/orders`
2. Appliquez vos filtres (statut, date, recherche)
3. Cliquez sur "Exporter CSV"
4. Ouvrez Google Sheets
5. Fichier → Importer → Télécharger → Sélectionnez le CSV
6. Vos données sont maintenant dans Google Sheets!

---

## 📋 Méthode 2: Google Sheets API (Automatique)

### **Prérequis:**

1. Compte Google
2. Projet Google Cloud
3. Google Sheets API activée

### **Étapes de Configuration:**

#### 1. Créer un Projet Google Cloud

```
1. Allez sur: https://console.cloud.google.com/
2. Créez un nouveau projet "She in Orders"
3. Activez Google Sheets API
4. Créez des identifiants (Service Account)
5. Téléchargez le fichier JSON des credentials
```

#### 2. Installer les Dépendances

```bash
npm install googleapis
```

#### 3. Créer le Service Google Sheets

Créez `lib/googleSheets.ts`:

```typescript
import { google } from 'googleapis'

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

// Remplacez par vos credentials
const credentials = {
  type: "service_account",
  project_id: "votre-projet-id",
  private_key_id: "votre-key-id",
  private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: "votre-client-id",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
}

export async function appendOrderToSheet(order: any) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    })

    const sheets = google.sheets({ version: 'v4', auth })
    
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    
    const values = [[
      order.orderNumber,
      new Date(order.createdAt).toLocaleDateString('fr-FR'),
      `${order.customerFirstName} ${order.customerLastName}`,
      order.customerEmail,
      order.customerPhone,
      order.address,
      order.city,
      order.total.toFixed(2),
      order.status,
      order.items.length,
    ]]

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Commandes!A:J',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    })

    console.log('✅ Order added to Google Sheets')
    return true
  } catch (error) {
    console.error('❌ Error adding to Google Sheets:', error)
    return false
  }
}
```

#### 4. Mettre à Jour l'API Orders

Dans `app/api/orders/route.ts`, ajoutez:

```typescript
import { appendOrderToSheet } from '@/lib/googleSheets'

// Dans la fonction POST, après la création de la commande:
const order = db.orders.create({...})

// Ajouter à Google Sheets
await appendOrderToSheet(order)

return NextResponse.json(order, { status: 201 })
```

#### 5. Variables d'Environnement

Créez `.env.local`:

```env
GOOGLE_SHEET_ID=votre-spreadsheet-id
GOOGLE_CLIENT_EMAIL=votre-service-account@projet.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nVotre clé privée\n-----END PRIVATE KEY-----\n"
```

#### 6. Créer le Google Sheet

1. Créez un nouveau Google Sheet
2. Nommez la première feuille "Commandes"
3. Ajoutez les en-têtes dans la première ligne:
   ```
   A1: Numéro
   B1: Date
   C1: Client
   D1: Email
   E1: Téléphone
   F1: Adresse
   G1: Ville
   H1: Total (TND)
   I1: Statut
   J1: Nb Articles
   ```
4. Partagez le sheet avec l'email du service account
5. Copiez l'ID du sheet (dans l'URL)

---

## 📋 Méthode 3: Zapier / Make (No-Code)

### **Avantages:**
- Pas de code
- Interface visuelle
- Nombreuses intégrations

### **Configuration Zapier:**

1. **Créez un Zap:**
   - Trigger: Webhook (catch hook)
   - Action: Google Sheets (Create Spreadsheet Row)

2. **Dans votre code, ajoutez:**

```typescript
// app/api/orders/route.ts
const order = db.orders.create({...})

// Envoyer à Zapier
await fetch('https://hooks.zapier.com/hooks/catch/VOTRE_WEBHOOK_ID/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(order),
})
```

3. **Mappez les champs dans Zapier**

---

## 📊 Structure Recommandée du Google Sheet

### **Feuille 1: Commandes**
```
| Numéro | Date | Client | Email | Téléphone | Ville | Total | Statut | Articles |
```

### **Feuille 2: Statistiques**
```
Formules automatiques:
- Total Commandes: =COUNTA(Commandes!A:A)-1
- Revenu Total: =SUM(Commandes!G:G)
- Commandes En Attente: =COUNTIF(Commandes!H:H,"pending")
- Commandes Livrées: =COUNTIF(Commandes!H:H,"delivered")
```

### **Feuille 3: Graphiques**
- Graphique des ventes par jour
- Graphique des statuts
- Graphique des villes

---

## 🔄 Synchronisation Bidirectionnelle

Pour mettre à jour le statut depuis Google Sheets:

1. **Créez un Google Apps Script:**

```javascript
function onEdit(e) {
  const sheet = e.source.getActiveSheet()
  const range = e.range
  
  // Si la colonne du statut est modifiée
  if (range.getColumn() === 8) { // Colonne H (Statut)
    const row = range.getRow()
    const orderNumber = sheet.getRange(row, 1).getValue()
    const newStatus = range.getValue()
    
    // Appeler votre API
    const url = 'https://votre-site.com/api/orders/update-status'
    const payload = {
      orderNumber: orderNumber,
      status: newStatus
    }
    
    UrlFetchApp.fetch(url, {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify(payload)
    })
  }
}
```

2. **Créez l'endpoint API:**

```typescript
// app/api/orders/update-status/route.ts
export async function POST(request: NextRequest) {
  const { orderNumber, status } = await request.json()
  
  const order = db.orders.getByOrderNumber(orderNumber)
  if (order) {
    db.orders.update(order.id, { status })
    return NextResponse.json({ success: true })
  }
  
  return NextResponse.json({ error: 'Order not found' }, { status: 404 })
}
```

---

## 📱 Notifications

### **Recevoir une notification à chaque nouvelle commande:**

1. **Google Sheets + Apps Script:**

```javascript
function sendEmailNotification(orderData) {
  const email = 'admin@shein.tn'
  const subject = `Nouvelle commande: ${orderData.orderNumber}`
  const body = `
    Nouvelle commande reçue!
    
    Client: ${orderData.client}
    Total: ${orderData.total} TND
    Ville: ${orderData.ville}
    
    Voir dans le dashboard: https://votre-site.com/admin/orders
  `
  
  MailApp.sendEmail(email, subject, body)
}
```

2. **Ou utilisez Zapier:**
   - Trigger: New Row in Google Sheets
   - Action: Send Email / SMS / Slack notification

---

## 🎯 Recommandation

**Pour commencer rapidement:**
1. ✅ Utilisez l'export CSV (déjà implémenté)
2. Importez manuellement dans Google Sheets
3. Créez des formules et graphiques

**Pour l'automatisation:**
1. Utilisez Zapier (plus simple, pas de code)
2. Ou implémentez Google Sheets API (plus de contrôle)

---

## 📞 Support

Pour toute question sur l'intégration Google Sheets:
- Documentation Google Sheets API: https://developers.google.com/sheets/api
- Documentation Zapier: https://zapier.com/apps/google-sheets/integrations

---

**Bon succès avec votre gestion des commandes!** 📊✨
