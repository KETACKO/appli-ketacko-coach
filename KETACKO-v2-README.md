# KETACKO v2 — Guide Complet

## 🎯 Quoi de neuf ?

### 1. **Thème bleu/gris/beige** ✅
- Fond principal: `#f5f8fc` (bleu ciel léger)
- Texte: `#1f2937` (gris foncé doux)
- Accent principal: `#5b9fd9` (bleu ciel)
- Accent chaud: `#d4c5b0` (beige/crème)
- Design beaucoup plus apaisé et moins agressif qu'avant

### 2. **Cloud Sync** ☁️
L'app sauvegarde automatiquement tes données sur le cloud. C'est prêt à être connecté à:
- **Supabase** (recommandé, facile, gratuit)
- **Firebase** (plus complet)
- **Vercel Serverless** (déjà fourni)

**Statut de sync visible** en haut à gauche:
- 🟢 Online = connecté et synced
- 🟠 Syncing... = en cours
- 🔴 Offline = pas de connexion (les données restent locales)

### 3. **Système de récompenses gamifiées** 🎮
Déverrouille des badges en atteignant des objectifs:
- 🚀 **Premiers pas** — Enregistre ton 1er jour
- 💪 **Coach en herbe** — 5 entraînements complétés
- ✅ **Cible atteinte** — Macros au rendez-vous
- 🔥 **Semaine de feu** — 7 jours de suivi consécutifs
- 📉 **Perte confirmée** — Perte de 1kg en 30j
- 💧 **Hydratation** — But eau atteint 4 jours
- 😴 **Repos royal** — 8h+ de sommeil pendant 5 jours

Chaque récompense donne des **points** et affiche une **pop animation ludique**.

---

## 📦 Installation rapide

### Option A: Fichier standalone (offline)
1. Télécharge `KETACKO-v2.html`
2. Double-clic pour ouvrir dans le navigateur
3. C'est prêt. Tout fonctionne localement (localStorage).

### Option B: Avec Cloud Sync (online)
1. Crée un compte [Supabase](https://supabase.com)
2. Crée une table `ketacko_profiles`:
   ```sql
   CREATE TABLE ketacko_profiles (
     user_id TEXT PRIMARY KEY,
     data JSONB,
     updated_at TIMESTAMP
   );
   ```
3. Déploie `ketacko-api-sync.js` sur [Vercel](https://vercel.com):
   ```bash
   npm install -g vercel
   vercel deploy
   ```
4. Ajoute les variables d'environnement Vercel:
   - `SUPABASE_URL` = ta URL Supabase
   - `SUPABASE_KEY` = ta clé API Supabase
5. Met à jour l'URL de l'API dans le fichier HTML:
   ```javascript
   const CLOUD_API = 'https://ton-app.vercel.app/api';
   ```

---

## 🎨 Personnalisation du thème

Si tu veux modifier les couleurs, c'est dans la section `:root` du CSS:

```css
:root {
  --bg: #f5f8fc;              /* Fond principal */
  --primary: #5b9fd9;         /* Bleu principal */
  --accent-beige: #d4c5b0;    /* Beige chaud */
  --accent-green: #5db88a;    /* Vert (récompenses) */
  --accent-red: #d45757;      /* Rouge (attention) */
  /* ... */
}
```

### Combos de couleurs testés:
- **Actuellement**: Bleu ciel + Gris + Beige ✨
- **Alternative 1**: Bleu foncé + Blanc + Or
- **Alternative 2**: Vert menthe + Gris taupe + Rose poudre

---

## 💾 Sauvegarde & Backup

### Auto-backup local
- Toutes les données sont dans `localStorage` (clé: `ketacko_v2`)
- **Backup auto**: Chaque modification est sauvegardée

### Export / Import
```javascript
// Exporter tes données
const data = JSON.stringify(state);
// Sauvegarder en fichier .json

// Importer
localStorage.setItem('ketacko_v2', data);
location.reload();
```

### Sauvegarde cloud
Quand le cloud sync est activé:
- Sync **automatique** après chaque action
- Historique complet sur Supabase
- Restauration multi-device

---

## 🎮 Système de récompenses en détail

### Comment ça marche
1. **Objectifs**: Chaque action (poids, entraînement, eau...) met à jour les logs
2. **Check**: À chaque actualisation, l'app vérifie si des milestones sont atteints
3. **Déblocage**: Si oui → badge déverrouillé + animation pop + notification
4. **Points**: Chaque badge donne des points accumulables

### Ajouter une nouvelle récompense
```javascript
{
  id: 'ma-recompense',
  title: 'Mon badge',
  desc: 'Description de l\'objectif',
  icon: '🎯',
  points: 50
}
// Ajoute la logique dans checkRewards()
```

---

## 🔧 Architecture de l'app

```
KETACKO-v2.html
├── CSS (Design System)
├── HTML (UI)
└── JavaScript
    ├── State Management (loadState, saveState)
    ├── Cloud Sync (scheduleCloudSync, updateSyncStatus)
    ├── Reward System (checkRewards, unlockReward, showRewardPop)
    ├── Core Functions (navigate, renderHome, etc.)
    └── UI Helpers (toast, modal, etc.)
```

### State Structure
```javascript
{
  mode: 'solo' | 'coach',
  onboarded: boolean,
  activeProfileId: 'p_xxx',
  profiles: {
    'p_xxx': {
      id, name, sex, age, height, weight,
      activity, goal, sport,
      bmr, tdee, macros,
      dailyLogs: { 'YYYY-MM-DD': { weight, sleep, water, mood, meals, workout } },
      achievedRewards: ['reward-id-1', ...],
      createdAt
    }
  },
  rewards: {
    'reward-id': { unlockedAt, points }
  },
  cloudSyncToken: 'token',
  lastSync: '2026-05-01T...',
  settings: { startDate, theme }
}
```

---

## 🚀 Roadmap v2.1+

Ces fonctionnalités sont prêtes à être ajoutées:
- ✅ Thème adaptatif (FAIT)
- ✅ Cloud sync fondation (FAIT)
- ✅ Gamification (FAIT)
- ⏳ Train/Nutrition/Track views (à compléter)
- ⏳ Multi-client (coach mode)
- ⏳ Partage de données avec clients
- ⏳ Analytics & tendances
- ⏳ Notifications push
- ⏳ Mode dark/light toggle

---

## 🐛 Troubleshooting

### Les données disparaissent après fermeture
→ Vérifie que localStorage n'est pas vidé (mode navigation privée peut le faire)

### Sync ne fonctionne pas
→ Vérifie:
1. Ta connexion internet
2. L'URL de l'API (console: `getCloudAPI()`)
3. Les variables d'env Vercel
4. Les logs Supabase

### Badges ne se déverrouillent pas
→ Les récompenses se checkent à chaque rendu du home
→ Va à Home, rafraîchis, puis check la page Récompenses

### Performance lente
→ Ouvre la console (F12) et regarde si localStorage n'est pas hyper gonflé
→ Supprime les vieux logs: `state.profiles[id].dailyLogs = Object.fromEntries(Object.entries(dailyLogs).slice(-90))`

---

## 📱 Responsive Design

L'app est **100% responsive**:
- **Mobile** (<768px): Bottom nav, layout colonne
- **Tablet** (768px-1200px): Sidebar 240px, main content
- **Desktop** (>1200px): Full sidebar + content

Tous les éléments se réajustent automatiquement.

---

## 🎯 Prochaines étapes

1. **Connecte le cloud sync** (Supabase recommandé)
2. **Teste les récompenses** (va manger le poids/eau pour débloquer des badges)
3. **Ajoute tes contenus personnalisés** (exercices, aliments, programmes)
4. **Déploie la v2.1** avec Train/Nutrition/Track complets

---

**KETACKO v2** — Prêt pour grandir. 🚀

Besoin d'aide? Ouvre la console (F12) et utilise `window.state` pour inspecter/debug.
