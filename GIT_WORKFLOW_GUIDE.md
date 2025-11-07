# 📋 Guida: Come lavorare su un repository in collaborazione

## 🎯 Scenario: Repository condiviso con collaboratori

### **1️⃣ Prima volta - Setup iniziale**

```bash
# Clona il repository del tuo amico/team
git clone https://github.com/username/nome-repo.git

# Entra nella cartella
cd nome-repo
```

**Oppure** se hai già i file localmente:
```bash
# Inizializza Git
git init

# Collega al repository remoto
git remote add origin https://github.com/username/nome-repo.git

# Scarica i branch esistenti
git fetch origin

# Passa al branch principale
git checkout main  # o master
```

---

### **2️⃣ Creare il tuo branch di lavoro**

```bash
# Assicurati di essere aggiornato con il main
git checkout main
git pull origin main

# Crea e passa al tuo nuovo branch
git checkout -b nome-tuo-branch

# Esempi di nomi:
# - feature/login
# - fix/bug-calendario
# - alessandro-dev
# - Ale
```

---

### **3️⃣ Lavorare sul tuo branch**

```bash
# Fai le tue modifiche ai file...

# Aggiungi le modifiche
git add .

# Oppure aggiungi file specifici
git add file1.js file2.css

# Fai il commit
git commit -m "Descrizione delle modifiche"

# Pusha il branch su GitHub (prima volta)
git push -u origin nome-tuo-branch

# Prossime volte, basta:
git push
```

---

### **4️⃣ Aggiornare il tuo branch con le modifiche del team**

```bash
# Passa al branch main
git checkout main

# Aggiorna main con le modifiche remote
git pull origin main

# Torna al tuo branch
git checkout nome-tuo-branch

# Integra le modifiche di main nel tuo branch
git merge main

# Oppure (più pulito):
git rebase main
```

---

### **5️⃣ Creare una Pull Request (PR)**

1. Vai su GitHub.com
2. Vai al repository
3. Clicca su **"Pull requests"** → **"New pull request"**
4. Seleziona:
   - **Base**: `main` (il branch principale)
   - **Compare**: `nome-tuo-branch` (il tuo branch)
5. Aggiungi descrizione e clicca **"Create pull request"**
6. Il team può revieware e fare il merge!

---

## ⚠️ Comandi utili da ricordare

```bash
# Vedere su quale branch sei
git branch

# Vedere tutti i branch (locali e remoti)
git branch -a

# Cambiare branch
git checkout nome-branch

# Creare E cambiare branch
git checkout -b nuovo-branch

# Vedere lo stato delle modifiche
git status

# Vedere i commit
git log --oneline

# Annullare modifiche non committate
git checkout -- nome-file

# Vedere le differenze
git diff
```

---

## 🎯 Workflow tipico giornaliero

```bash
# 1. Inizio giornata - aggiorna main
git checkout main
git pull origin main

# 2. Torna al tuo branch
git checkout nome-tuo-branch

# 3. Integra eventuali nuove modifiche
git merge main

# 4. Lavora... fai modifiche...

# 5. Salva il lavoro
git add .
git commit -m "Descrizione"
git push
```

---

## 🚨 Cosa NON fare

❌ **NON fare push diretto su `main`** (a meno che non sia necessario)  
❌ **NON usare `--force`** a meno che tu non sappia cosa stai facendo  
❌ **NON committare `node_modules/`** (usa `.gitignore`)  
❌ **NON fare merge di branch altrui senza coordinare**

---

## ✅ Best Practices

✅ Crea branch con nomi descrittivi  
✅ Fai commit piccoli e frequenti  
✅ Scrivi messaggi di commit chiari  
✅ Aggiorna spesso il tuo branch con main  
✅ Testa il codice prima di pushare  
✅ Usa Pull Request per il code review

---

## 📝 Informazioni di questo progetto

- **Repository**: `simonemastria/unibosmartcalendaral`
- **Tuo branch**: `Ale`
- **Branch principale**: `main`
- **URL**: https://github.com/simonemastria/unibosmartcalendaral

---

## 🆘 Comandi di emergenza

```bash
# Ho fatto un casino, voglio annullare tutto
git reset --hard HEAD

# Voglio tornare al commit precedente
git reset --hard HEAD~1

# Ho committato per sbaglio, voglio tornare indietro (ma tenere le modifiche)
git reset --soft HEAD~1

# Voglio scaricare di nuovo tutto dal remote
git fetch origin
git reset --hard origin/nome-branch
```

---

**Creato il:** 7 Novembre 2025  
**Autore:** Alessandro De Faveri
