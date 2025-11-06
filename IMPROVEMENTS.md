# 🚀 Miglioramenti Implementati - Unibo Smart Calendar

## 📋 Sommario delle Modifiche

Questo documento descrive i miglioramenti implementati per risolvere i problemi critici dell'applicazione.

---

## ✅ 1. Risoluzione Problema CORS con Proxy Server

### **Problema Originale**
- Il client tentava di fetchare direttamente da `corsi.unibo.it`
- UniBo non ha CORS abilitato → fetch falliva sempre
- L'app mostrava eventi mock invece di dati reali

### **Soluzione Implementata**
**File modificato:** `server/index.js`

- Aggiunto endpoint `/api/fetch-schedule` che fa da proxy
- Il server fetcha i dati da UniBo (nessun problema CORS server-side)
- Ritorna i dati al client

```javascript
app.get('/api/fetch-schedule', async (req, res) => {
  const { url } = req.query;
  const response = await axios.get(url, { timeout: 10000 });
  res.json(response.data);
});
```

### **Benefici**
✅ Dati reali da UniBo invece di mock  
✅ Nessun errore CORS  
✅ Gestione errori robusta con status code appropriati

---

## ✅ 2. Client Aggiornato per Usare il Proxy

### **Problema Originale**
- `src/services/api.js` faceva fetch diretto (falliva per CORS)
- Tentativi di test CORS generavano warning inutili

### **Soluzione Implementata**
**File modificato:** `src/services/api.js`

```javascript
// Prima:
const response = await axios.get(yearUrl.toString());

// Dopo:
const proxyUrl = `http://localhost:3001/api/fetch-schedule?url=${encodeURIComponent(yearUrl.toString())}`;
const response = await axios.get(proxyUrl);
```

### **Modifiche**
- Tutte le chiamate passano attraverso il proxy
- Rimosso codice di test CORS non necessario
- Rimossa generazione eventi mock di fallback

### **Benefici**
✅ Fetch reale dei dati  
✅ Codice più pulito e manutenibile  
✅ Nessun warning in console

---

## ✅ 3. Caching Intelligente con localStorage

### **Problema Originale**
- Fetch ad ogni caricamento pagina
- Nessuna persistenza dei dati
- App inutilizzabile se UniBo è down

### **Soluzione Implementata**
**File modificato:** `src/App.js`

### **Strategia di Caching**
```javascript
1. Controlla cache locale
   └─ Cache valida (<1 ora) E stessi URL?
      ├─ SÌ → Usa cache (immediato)
      └─ NO → Fetch da server

2. Fetch fallito?
   └─ Usa cache anche se vecchia (fallback offline)
```

### **Dettagli Implementazione**
```javascript
const CACHE_KEY = 'cachedScheduleEvents';
const CACHE_DURATION = 60 * 60 * 1000; // 1 ora

// Salva in cache
const cacheData = {
  events: data,
  timestamp: Date.now(),
  timetableUrls: localStorage.getItem('timetableUrls')
};
localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
```

### **Invalidazione Cache**
- Cache scade dopo 1 ora
- Cache invalidata se cambiano gli URL dei timetable
- Cache usata come fallback in caso di errore

### **Benefici**
✅ Caricamento istantaneo da cache  
✅ Riduzione richieste al server  
✅ Funzionamento offline  
✅ Indicatore visuale quando si usa cache

---

## ✅ 4. Error Handling e User Feedback

### **Problema Originale**
- Nessun feedback per errori di rete
- Loading state generico
- Utente non sa cosa sta succedendo

### **Soluzione Implementata**
**File modificato:** `src/App.js`

### **Snackbar Notifications**
```javascript
// Success
setSnackbar({ 
  open: true, 
  message: 'Schedule loaded successfully', 
  severity: 'success' 
});

// Warning (usando cache per fallback)
setSnackbar({ 
  open: true, 
  message: 'Using offline data. Check your connection.', 
  severity: 'warning' 
});

// Error
setSnackbar({ 
  open: true, 
  message: 'Failed to load schedule', 
  severity: 'error' 
});
```

### **Stati Visuali**
- **Loading**: Spinner + messaggio "Loading schedule..."
- **Cache attiva**: Banner blu "📦 Using cached data"
- **Errore con fallback**: Warning + banner informativo
- **Errore fatale**: Messaggio errore rosso

### **Benefici**
✅ Utente sempre informato sullo stato  
✅ Toast non invasivi che scompaiono automaticamente  
✅ Messaggi chiari e actionable  
✅ Indicazione visuale chiara quando si usa cache

---

## ✅ 5. Script Unificati per Avvio Applicazione

### **Problema Originale**
- Due terminali necessari (frontend + backend)
- Processo di avvio complicato
- Facile dimenticare di avviare il server

### **Soluzione Implementata**
**File modificato:** `package.json`

### **Nuovi Script**
```json
{
  "scripts": {
    "start": "concurrently \"npm run server\" \"npm run client\"",
    "client": "react-scripts start",
    "server": "cd server && npm start",
    "dev": "npm start"
  }
}
```

### **Come Funziona**
```bash
# Prima (2 comandi in 2 terminali):
Terminal 1: cd server && npm start
Terminal 2: npm start

# Dopo (1 comando):
npm start
```

### **Dipendenza Aggiunta**
```json
"concurrently": "^8.2.2"
```

### **Benefici**
✅ Un solo comando per avviare tutto  
✅ Output colorato dei due server nello stesso terminale  
✅ Facile per nuovi sviluppatori  
✅ Riduce errori di configurazione

---

## 📊 Riepilogo Modifiche ai File

| File | Righe Modificate | Tipo Modifica |
|------|------------------|---------------|
| `server/index.js` | ~150 | Completa riscrittura - Proxy CORS |
| `src/services/api.js` | ~30 | Aggiornamento chiamate API |
| `src/App.js` | ~100 | Cache + Error handling + UI |
| `package.json` | ~5 | Script + dipendenze |

---

## 🧪 Come Testare le Migliorie

### **1. Test Proxy CORS**
```bash
# Avvia il server
cd server && npm start

# In un altro terminale/browser
curl "http://localhost:3001/api/fetch-schedule?url=https://corsi.unibo.it/2cycle/DigitalTransformationManagement/timetable/@@orario_reale_json"
```
**Risultato atteso:** JSON con gli eventi

### **2. Test Caching**
```javascript
// 1. Apri app e carica dati
// 2. Apri DevTools → Application → Local Storage
// 3. Verifica presenza di "cachedScheduleEvents"
// 4. Ricarica pagina → dovrebbe caricare istantaneamente
// 5. Aspetta >1 ora → dovrebbe ri-fetchare
```

### **3. Test Offline Mode**
```javascript
// 1. Carica l'app con dati
// 2. Ferma il server (Ctrl+C)
// 3. Ricarica pagina
// Risultato: Dovrebbe mostrare dati cached con warning
```

### **4. Test Avvio Unificato**
```bash
npm install  # Installa concurrently
npm start    # Avvia frontend + backend insieme
```

---

## 🎯 Risultati Ottenuti

### **Prima**
❌ CORS errors in console  
❌ Solo eventi mock  
❌ Re-fetch ad ogni reload  
❌ Nessun feedback su errori  
❌ Due comandi per avviare  

### **Dopo**
✅ Dati reali da UniBo  
✅ Caching intelligente (1 ora)  
✅ Fallback offline  
✅ Toast notifications  
✅ Un solo comando di avvio  

---

## 🚀 Prossimi Passi Suggeriti

### **Priorità Media**
1. **Service Worker** per PWA offline completa
2. **Refresh automatico** quando cache scade (background)
3. **Retry logic** con exponential backoff
4. **Unit tests** per caching e proxy

### **Priorità Bassa**
5. **Dark mode** per UX migliore
6. **Push notifications** per reminder lezioni
7. **Export PDF** oltre a ICS
8. **Conflict detection** per orari sovrapposti

---

## 📝 Note per l'Esame

### **Punti da Sottolineare**
1. **Problema CORS risolto** con architettura proxy
2. **Performance migliorata** con caching strategico
3. **UX superiore** con feedback continuo
4. **Developer Experience** migliorata con script unificati

### **Decisioni Architetturali**
- **Perché proxy server?** UniBo non ha CORS → necessario backend
- **Perché localStorage?** Persistenza semplice e veloce per piccoli dataset
- **Perché 1 ora di cache?** Bilanciamento tra freshness e performance
- **Perché concurrently?** Semplifica setup per deployment

---

## 🐛 Bug Conosciuti e Limitazioni

1. **Server deve essere su localhost:3001** (non configurabile)
2. **Cache non sincronizza tra tab** diverse
3. **localStorage limitato** a ~5-10MB (sufficiente per questo caso)
4. **Nessuna invalidazione** manuale della cache (solo refresh page)

---

## 🔗 Riferimenti Tecnici

- [CORS MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Material-UI Snackbar](https://mui.com/material-ui/react-snackbar/)
- [Concurrently npm](https://www.npmjs.com/package/concurrently)

---

**Data modifiche:** Ottobre 2025  
**Autore modifiche:** GitHub Copilot Assistant  
**Branch:** LaMia
