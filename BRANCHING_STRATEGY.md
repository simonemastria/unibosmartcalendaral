# 🎯 Strategia di Branching Professionale - Unibo Smart Calendar

## 📊 Overview

Questo documento definisce la strategia di branching per il team di 4 persone che lavorerà sul progetto Unibo Smart Calendar seguendo best practices professionali.

---

## 🌳 Struttura Branch

```
main (produzione - protetto ⛔)
│
├── develop (integrazione principale 🔄)
│   │
│   ├── feature/backend-enhancements (👤 Persona 1)
│   ├── feature/frontend-ui (👤 Persona 2)  
│   ├── feature/pwa-offline (👤 Persona 3)
│   └── feature/testing-cicd (👤 Persona 4)
│
└── hotfix/* (solo per bug critici in produzione)
```

---

## 📋 Branch Totali: **6 Branch**

1. ✅ **`main`** - Produzione (esiste già)
2. 🆕 **`develop`** - Integrazione (da creare subito)
3. 🆕 **`feature/backend-enhancements`** - Persona 1
4. 🆕 **`feature/frontend-ui`** - Persona 2
5. 🆕 **`feature/pwa-offline`** - Persona 3
6. 🆕 **`feature/testing-cicd`** - Persona 4

---

## 👥 Assegnazione Task per Persona

### 🔵 **Persona 1 - Backend & API Enhancements**
**Branch:** `feature/backend-enhancements`

#### **Obiettivo**
Migliorare robustezza, performance e affidabilità del proxy server.

#### **Task List**

- [ ] **Rate Limiting** - Protezione contro spam
- [ ] **Retry Logic** - Exponential backoff per UniBo API
- [ ] **Logging Strutturato** - Winston per logging avanzato
- [ ] **Health Check Endpoint** - `/api/health`
- [ ] **Environment Variables** - Configurazione con `.env`
- [ ] **Error Handling Centralizzato** - Middleware per gestione errori
- [ ] **Request Timeout** - Timeout configurabile
- [ ] **CORS Avanzato** - Whitelist origins

#### **File da Creare/Modificare**
```
server/
├── index.js (modificare)
├── .env (nuovo)
├── middleware/
│   ├── rateLimiter.js (nuovo)
│   └── errorHandler.js (nuovo)
└── utils/
    ├── logger.js (nuovo)
    └── retry.js (nuovo)
```

---

### 🟢 **Persona 2 - Frontend UI/UX**
**Branch:** `feature/frontend-ui`

#### **Obiettivo**
Migliorare esperienza utente e interfaccia grafica.

#### **Task List**

- [ ] **Dark Mode** - Tema scuro/chiaro con Material-UI
- [ ] **Loading Skeletons** - Sostituire spinner con skeleton
- [ ] **Filtri Avanzati** - Filtra per corso, docente, aula, giorno
- [ ] **Conflict Detection** - Rilevamento lezioni sovrapposte
- [ ] **Settings Panel** - Dialog per preferenze utente
- [ ] **Responsive Mobile** - Ottimizzazione per mobile
- [ ] **Cache Invalidation UI** - Bottone refresh manuale
- [ ] **Toast Notifications** - Feedback azioni utente
- [ ] **Search Bar** - Ricerca veloce corsi
- [ ] **Export Calendar** - Download ICS file

#### **File da Creare/Modificare**
```
src/
├── App.js (modificare)
├── theme.js (nuovo)
├── components/
│   ├── FilterPanel.js (nuovo)
│   ├── SettingsDialog.js (nuovo)
│   ├── ConflictBadge.js (nuovo)
│   ├── SearchBar.js (nuovo)
│   └── ThemeToggle.js (nuovo)
└── styles/
    ├── responsive.css (nuovo)
    └── dark-theme.css (nuovo)
```

---

### 🟡 **Persona 3 - PWA & Offline First**
**Branch:** `feature/pwa-offline`

#### **Obiettivo**
Trasformare l'app in PWA completa con supporto offline avanzato.

#### **Task List**

- [ ] **Service Worker** - Cache completa delle risorse
- [ ] **IndexedDB** - Storage locale per dataset grandi
- [ ] **Background Sync** - Aggiornamento automatico cache
- [ ] **Installable PWA** - Manifest completo con icone
- [ ] **Offline Detection** - UI per stato connessione
- [ ] **Push Notifications** - Notifiche per nuove lezioni
- [ ] **Multi-Timetable Support** - Cache per più orari
- [ ] **Cache Strategy** - Network-first con fallback
- [ ] **App Shell** - Caricamento istantaneo
- [ ] **Update Prompt** - Notifica per nuove versioni

#### **File da Creare/Modificare**
```
public/
├── service-worker.js (nuovo)
├── manifest.json (modificare)
└── icons/ (nuove icone)
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    └── icon-512x512.png
src/
├── serviceWorkerRegistration.js (nuovo)
└── utils/
    ├── indexedDB.js (nuovo)
    └── offlineDetector.js (nuovo)
```

---

### 🟣 **Persona 4 - Testing, CI/CD & Documentation**
**Branch:** `feature/testing-cicd`

#### **Obiettivo**
Implementare testing completo, automazione CI/CD e documentazione.

#### **Task List**

- [ ] **Unit Tests** - Jest per funzioni utils
- [ ] **Component Tests** - React Testing Library
- [ ] **Integration Tests** - Test API endpoints
- [ ] **E2E Tests** - Cypress per user flows
- [ ] **GitHub Actions** - CI/CD pipeline
- [ ] **Test Coverage** - Soglia minima 80%
- [ ] **Linting** - ESLint + Prettier
- [ ] **Pre-commit Hooks** - Husky
- [ ] **Docker Setup** - Dockerfile + docker-compose
- [ ] **API Documentation** - Swagger/OpenAPI
- [ ] **README Migliorato** - Badges, demo, setup guide
- [ ] **Changelog** - Versionamento semantico

#### **File da Creare/Modificare**
```
.github/
└── workflows/
    ├── ci.yml (nuovo)
    ├── deploy.yml (nuovo)
    └── test.yml (nuovo)
tests/
├── unit/
│   ├── utils.test.js (nuovo)
│   └── services.test.js (nuovo)
├── integration/
│   └── api.test.js (nuovo)
└── e2e/
    └── user-flows.spec.js (nuovo)
cypress/
├── fixtures/
├── integration/
└── support/
docs/
├── API.md (nuovo)
├── CONTRIBUTING.md (nuovo)
└── ARCHITECTURE.md (nuovo)
Dockerfile (nuovo)
docker-compose.yml (nuovo)
.eslintrc.json (nuovo)
.prettierrc (nuovo)
.husky/ (nuovo)
CHANGELOG.md (nuovo)
```

---

## 🔄 Workflow Professionale

### **Setup Iniziale (Tutti Insieme - Giorno 1)**

```bash
# 1. Clone del repository
git clone https://github.com/simonemastria/unibosmartcalendaral.git
cd unibosmartcalendaral

# 2. Pull del main aggiornato
git checkout main
git pull origin main

# 3. Creare branch develop
git checkout -b develop
git push -u origin develop

# 4. Proteggere branch su GitHub
# Vai su: Settings → Branches → Add rule
# Proteggi: main e develop
# ☑️ Require pull request reviews (2 approvals)
# ☑️ Require status checks to pass
# ☑️ Include administrators
```

---

### **Inizio Sprint (Ogni Persona)**

```bash
# 1. Sincronizza develop
git checkout develop
git pull origin develop

# 2. Crea il tuo feature branch
# Persona 1:
git checkout -b feature/backend-enhancements

# Persona 2:
git checkout -b feature/frontend-ui

# Persona 3:
git checkout -b feature/pwa-offline

# Persona 4:
git checkout -b feature/testing-cicd

# 3. Push del branch
git push -u origin feature/tuo-nome-branch
```

---

### **Durante lo Sviluppo (Daily)**

```bash
# 1. Lavora sul tuo branch
# Fai modifiche...

# 2. Commit frequenti e descrittivi
git add .
git commit -m "feat: implementa rate limiting per API"

# 3. Push regolare (almeno 1 volta al giorno)
git push origin feature/tuo-nome-branch

# 4. IMPORTANTE: Sincronizza con develop ogni giorno
git checkout develop
git pull origin develop
git checkout feature/tuo-nome-branch
git merge develop

# Se preferisci rebase (più pulito):
git rebase develop

# 5. Risolvi conflitti se necessario
# Testa che tutto funzioni
npm start
```

---

### **Completamento Feature (Fine Task)**

```bash
# 1. Ultimo sync con develop
git checkout develop
git pull origin develop
git checkout feature/tuo-nome-branch
git merge develop

# 2. Risolvi conflitti
# Testa localmente
npm test  # quando ci saranno i test
npm start # verifica che funzioni

# 3. Push finale
git push origin feature/tuo-nome-branch

# 4. Crea Pull Request su GitHub
# Base: develop
# Compare: feature/tuo-nome-branch
# Usa il template PR (vedi sotto)
```

---

### **Code Review (Tutti)**

**Processo PR:**

1. ✅ Apri PR: `feature/xyz` → `develop`
2. ✅ Compila template PR completo
3. ✅ Assegna almeno 2 reviewer del team
4. ✅ Attendi 2 approvazioni
5. ✅ CI deve essere green (test passati)
6. ✅ Risolvi commenti dei reviewer
7. ✅ Merge (Squash and merge consigliato)
8. ✅ Cancella branch dopo merge

---

### **Release in Produzione (Fine Sprint)**

```bash
# Solo Team Lead o tutti insieme

# 1. Crea release branch
git checkout develop
git pull origin develop
git checkout -b release/v1.0.0

# 2. Bump version in package.json
# Cambia "version": "1.0.0"

# 3. Ultimo testing
npm test
npm run build

# 4. Merge in main
git checkout main
git merge release/v1.0.0
git tag v1.0.0
git push origin main --tags

# 5. Merge in develop (per avere i fix)
git checkout develop
git merge release/v1.0.0
git push origin develop

# 6. Cleanup
git branch -d release/v1.0.0

# 7. Deploy automatico (se configurato) o manuale
```

---

## 📝 Template Pull Request

Ogni PR **deve** seguire questo template:

```markdown
## 📝 Descrizione
[Breve descrizione della feature o fix implementata]

## 🎯 Tipo di Change
- [ ] 🐛 Bug fix
- [ ] ✨ New feature  
- [ ] 💥 Breaking change
- [ ] 📚 Documentation update
- [ ] ♻️ Code refactoring
- [ ] ⚡ Performance improvement

## 🎫 Issue Collegata
Closes #[numero issue]

## ✅ Checklist
- [ ] Il codice compila senza errori
- [ ] Ho testato localmente
- [ ] Ho aggiunto/aggiornato i test (se applicabile)
- [ ] I test passano (`npm test`)
- [ ] Ho aggiornato la documentazione
- [ ] Ho fatto self-review del codice
- [ ] Ho aggiunto commenti in parti complesse
- [ ] Ho seguito le convention del progetto
- [ ] Non ci sono console.log dimenticati

## 🧪 Come Testare
1. [Step 1]
2. [Step 2]
3. [Expected result]

## 📸 Screenshots (se UI)
[Aggiungi screenshot prima/dopo]

## 📊 Test Coverage
- Unit tests: [X]%
- Integration tests: [Y]%
- E2E tests: [Z]%

## 🔍 Note per i Reviewer
[Eventuali note o aree che richiedono particolare attenzione]
```

---

## 🎨 Convention di Commit

Usare **Conventional Commits**:

### **Format**
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### **Types**
- `feat`: Nuova feature
- `fix`: Bug fix
- `docs`: Solo documentazione
- `style`: Formattazione (no logic change)
- `refactor`: Refactoring codice
- `test`: Aggiunta/modifica test
- `chore`: Maintenance (update deps, config)
- `perf`: Performance improvement
- `ci`: CI/CD changes

### **Esempi**
```bash
feat(api): aggiungi rate limiting per proxy server
fix(cache): risolvi invalidazione cache multipla
docs(readme): aggiorna istruzioni installazione
style(app): formatta con prettier
refactor(utils): estrai logica retry in funzione separata
test(api): aggiungi test per endpoint health
chore(deps): aggiorna axios alla v1.6.0
perf(calendar): ottimizza rendering eventi
ci(github): aggiungi workflow per deploy automatico
```

---

## 🗓️ Timeline Suggerita (2 Settimane)

### **Sprint 1 (Settimana 1)**

#### **Giorno 1-2 (Setup)**
- [ ] Tutti: Meeting iniziale
- [ ] Tutti: Setup branch `develop`
- [ ] Tutti: Protezione branch su GitHub
- [ ] Tutti: Familiarizzazione codebase
- [ ] Tutti: Creare feature branch personali
- [ ] Persona 4: Setup CI/CD pipeline base

#### **Giorno 3-7 (Sviluppo)**
- [ ] Persona 1: Backend improvements (rate limiting, retry logic)
- [ ] Persona 2: Dark mode + filtri base
- [ ] Persona 3: Service worker + cache strategy
- [ ] Persona 4: Unit tests + GitHub Actions
- [ ] Daily standup (15 min ogni giorno)

### **Sprint 2 (Settimana 2)**

#### **Giorno 8-10 (Completamento)**
- [ ] Tutti: Completare feature assegnate
- [ ] Tutti: Sync con develop
- [ ] Daily standup + pair programming se necessario

#### **Giorno 11-12 (Code Review)**
- [ ] Tutti: Aprire PR
- [ ] Tutti: Review reciproche (2 approve per PR)
- [ ] Tutti: Fix issues da review

#### **Giorno 13 (Integration)**
- [ ] Merge tutte le PR in develop
- [ ] Testing integrato dell'app completa
- [ ] Fix bug di integrazione

#### **Giorno 14 (Release)**
- [ ] Creare release branch
- [ ] Merge in main
- [ ] Deploy in produzione
- [ ] Demo finale + retrospettiva

---

## 🛠️ Tools e Setup

### **Package da Installare**

```bash
# Backend (Persona 1)
cd server
npm install express-rate-limit winston dotenv

# Testing (Persona 4)
npm install --save-dev jest @testing-library/react @testing-library/jest-dom cypress eslint prettier husky

# PWA (Persona 3)
npm install workbox-webpack-plugin workbox-window
```

---

### **File di Configurazione**

#### **.github/workflows/ci.yml** (Persona 4)
```yaml
name: CI

on:
  push:
    branches: [ develop, main ]
  pull_request:
    branches: [ develop, main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run linter
      run: npm run lint
      
    - name: Run tests
      run: npm test -- --coverage
      
    - name: Build
      run: npm run build
```

#### **.eslintrc.json**
```json
{
  "extends": ["react-app", "react-app/jest"],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error",
    "semi": ["error", "always"],
    "quotes": ["error", "single"]
  }
}
```

#### **.prettierrc**
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

---

## 📊 Metriche di Successo

Alla fine del progetto, dovreste avere:

✅ **4 feature branch** mergiati in develop  
✅ **1 release** in main con tag v1.0.0  
✅ **12+ Pull Request** con review approvate  
✅ **80%+ test coverage**  
✅ **0 linting errors**  
✅ **CI pipeline green**  
✅ **Documentazione completa**  
✅ **Demo funzionante** in produzione  
✅ **PWA installabile** su mobile

---

## 🆘 Troubleshooting

### **Problema: Conflitti di merge**
```bash
# Opzione 1: Merge
git merge develop
# Risolvi conflitti manualmente
git add .
git commit -m "fix: risolvi conflitti con develop"

# Opzione 2: Rebase (più pulito)
git rebase develop
# Risolvi conflitti
git add .
git rebase --continue
```

### **Problema: Ho committato nel branch sbagliato**
```bash
# Sposta ultimo commit in altro branch
git log # trova SHA del commit
git checkout branch-giusto
git cherry-pick <SHA>
git checkout branch-sbagliato
git reset --hard HEAD~1
```

### **Problema: Voglio annullare tutto**
```bash
# Annulla modifiche non committate
git checkout -- .

# Torna all'ultimo commit
git reset --hard HEAD

# Torna a 2 commit fa
git reset --hard HEAD~2
```

---

## 📚 Risorse Utili

- **Git Flow**: https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow
- **Conventional Commits**: https://www.conventionalcommits.org/
- **GitHub Flow**: https://docs.github.com/en/get-started/quickstart/github-flow
- **Jest**: https://jestjs.io/
- **Cypress**: https://www.cypress.io/
- **PWA**: https://web.dev/progressive-web-apps/

---

## 🎯 Quick Reference

```bash
# Comandi più usati

# Vedere branch
git branch -a

# Cambiare branch
git checkout nome-branch

# Creare nuovo branch
git checkout -b nuovo-branch

# Aggiornare da develop
git pull origin develop

# Salvare lavoro
git add .
git commit -m "tipo: descrizione"
git push

# Sincronizzare
git fetch origin
git merge origin/develop

# Vedere stato
git status
git log --oneline --graph
```

---

**Creato il:** 7 Novembre 2025  
**Team:** 4 Persone  
**Progetto:** Unibo Smart Calendar  
**Repository:** https://github.com/simonemastria/unibosmartcalendaral

---

**Buon lavoro team! 🚀**
