# 🏰 Donjon Mystique

Un jeu d'exploration de donjon développé en React avec Vite, où vous devez naviguer à travers des niveaux remplis d'ennemis, d'obstacles et de trésors pour atteindre la sortie.

![Version](https://img.shields.io/badge/version-0.0.0-blue)
![React](https://img.shields.io/badge/react-19.2.0-61dafb)
![Vite](https://img.shields.io/badge/vite-7.2.4-646cff)

## 📋 Table des matières

- [Description](#-description)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Structure du projet](#-structure-du-projet)
- [Les changements depuis l'oral](#-les-changements-depuis-loral)
- [API](#-api)
- [Gameplay](#-gameplay)
- [License](#-license)

## 🎮 Description

**Donjon Mystique** est un jeu d'aventure au tour par tour où vous incarnez un héros explorant des donjons dangereux. Collectez des armes, combattez des monstres, résolvez des énigmes et survivez pour graver votre nom dans le Hall des Légendes !

## ✨ Fonctionnalités

### Système de jeu
- ⚔️ **Système de combat** - Affrontez différents types d'ennemis avec des armes variées
- 💚 **Barre de vie** - Gérez vos points de vie tout au long de l'aventure
- 🎒 **Inventaire** - Collectez des clés, armes et objets spéciaux
- 🗺️ **Niveaux multiples** - Progressez à travers 4 niveaux uniques
- 🚪 **Portes verrouillées** - Trouvez les clés pour progresser
- 🔥 **Obstacles** - Utilisez les bons outils pour franchir les obstacles

### Interface utilisateur
- 📱 **Design responsive** - Adaptation automatique à toutes les tailles d'écran
- 🎨 **Graphismes améliorés** - Interface moderne avec gradients et animations
- 🌟 **Effets visuels** - Animations fluides et feedback visuel
- 💬 **Système de notifications** - Toasts pour les événements du jeu
- ⏱️ **Chronomètre** - Suivez votre temps de jeu
- 👣 **Compteur de pas** - Comptabilisez vos mouvements

### Progression
- 🏆 **Tableau des scores** - Classement basé sur le temps, les HP et les mouvements
- 💾 **Sauvegarde locale** - Vos scores sont conservés dans le navigateur
- 👤 **Nom de joueur** - Personnalisez votre nom d'aventurier

## 🛠️ Technologies

### Frontend
- **React 19.2.0** - Bibliothèque UI avec React Compiler activé
- **React Router DOM 7.10.1** - Navigation entre les pages
- **Vite 7.2.4** - Build tool ultra-rapide
- **CSS3** - Styles avec gradients et animations modernes

### Outils de développement
- **ESLint** - Linter pour la qualité du code
- **Babel Plugin React Compiler** - Optimisation des performances

### API Backend
- **Node.js avec Express** - Server API REST
- **CORS** - Gestion des requêtes cross-origin
- **Données en mémoire** - Catalogues d'ennemis, armes, obstacles et items

## 📦 Installation

### Prérequis
- Node.js (version 20.19.0 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone <url-du-repo>
cd jeu-react
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur API** (dans un terminal séparé)

Téléchargez le fichier [server.js](#fichier-serverjs) et placez-le à la racine du projet ou dans un dossier `server/`.

Installez les dépendances du serveur :
```bash
npm install express cors
```

Lancez le serveur :
```bash
node server.js
```
Le serveur démarre sur `http://localhost:4000`

4. **Lancer l'application React**
```bash
npm run dev
```
L'application démarre sur `http://localhost:5173`

## 🎯 Utilisation

### Commandes disponibles

```bash
# Lancer en mode développement
npm run dev

# Build pour la production
npm run build

# Linter le code
npm run lint

# Preview du build
npm run preview
```

### Contrôles du jeu

- **Flèches directionnelles** ou **ZQSD** - Déplacer le personnage
- **Clic sur une case adjacente** - Se déplacer vers cette case

## 📁 Structure du projet

```
jeu-react/
├── src/
│   ├── components/          # Composants React réutilisables
│   │   ├── Gameover.jsx     # Écran de défaite
│   │   ├── Grid.jsx         # Grille de jeu
│   │   ├── Hpbar.jsx        # Barre de vie
│   │   ├── StarField.jsx    # Champ d'étoiles animé
│   │   ├── Tile.jsx         # Case individuelle
│   │   └── Toast.jsx        # Notifications
│   │
│   ├── pages/               # Pages principales de l'application
│   │   ├── Game.jsx         # Page de jeu principale
│   │   ├── Gamemenu.jsx     # Menu principal
│   │   ├── Highscores.jsx   # Tableau des scores
│   │   └── UsernameSelection.jsx  # Sélection du nom
│   │
│   ├── hooks/               # Hooks personnalisés React
│   │   ├── useKeyboardMovement.js    # Gestion du clavier
│   │   ├── useResponsiveTileSize.js  # Taille responsive
│   │   ├── useTimer.js               # Chronomètre
│   │   └── useUsernameValidation.js  # Validation du nom
│   │
│   ├── systems/             # Systèmes de jeu
│   │   └── combatSystem.js  # Logique de combat
│   │
│   ├── utils/               # Fonctions utilitaires
│   │   ├── hpHelpers.js           # Gestion des HP
│   │   ├── inventoryHelpers.js    # Gestion de l'inventaire
│   │   ├── itemConfig.js          # Configuration des objets
│   │   ├── levelHelpers.js        # Gestion des niveaux
│   │   ├── movementHelpers.js     # Gestion des déplacements
│   │   ├── scoreHelpers.js        # Calcul des scores
│   │   ├── tileHelpers.js         # Utilitaires pour les tuiles
│   │   ├── timeFormatter.js       # Formatage du temps
│   │   └── toastConfig.js         # Configuration des toasts
│   │
│   ├── styles/              # Fichiers CSS modulaires
│   │   ├── App.css
│   │   ├── Game.css
│   │   ├── Gamemenu.css
│   │   ├── Gameover.css
│   │   ├── Grid.css
│   │   ├── Highscores.css
│   │   ├── Hpbar.css
│   │   ├── Tile.css
│   │   ├── Toast.css
│   │   ├── Usernameselection.css
│   │   └── index.css
│   │
│   ├── App.jsx              # Composant principal avec routing
│   └── main.jsx             # Point d'entrée de l'application
│
├── server/                  # Backend API
│   ├── data/
│   │   ├── levels.json      # Données des niveaux
│   │   └── weapons.json     # Données des armes
│   └── server.js            # Serveur Express
│
├── public/                  # Assets statiques
├── index.html              # Template HTML
├── package.json            # Dépendances et scripts
├── vite.config.js          # Configuration Vite
└── eslint.config.js        # Configuration ESLint
```

## 🆕 Les changements depuis l'oral

### 🎨 Graphismes améliorés
- **Interface modernisée** - Nouvelle identité visuelle avec thème médiéval fantastique
- **Gradients et couleurs** - Palette de couleurs vibrante (violets, dorés, verts)
- **Animations fluides** - Transitions et effets de survol sur tous les éléments
- **Design responsive** - Adaptation automatique à toutes les tailles d'écran
- **Effets visuels** - Ombres, glows, backdrop-filter pour un effet glassmorphism

### ⚔️ Système de combat
- **Combat au tour par tour** - Calcul automatique des dégâts et victoires
- **Types d'ennemis** - Gobelins, Slimes et Orcs avec statistiques différentes
- **Feedback de combat** - Messages détaillés sur les combats (tours, HP perdus)
- **Ennemis bloqués** - Indicateur visuel pour les ennemis imbattables

### 🗡️ Système d'armes
- **3 armes disponibles** - Dague, Épée et Hache de Guerre
- **Puissance progressive** - Chaque arme peut vaincre différents ennemis
- **Collection** - Les armes sont à trouver dans les niveaux
- **Affichage dans l'inventaire** - Icônes et noms des armes

### 🔌 API améliorée (server.js)
- **Serveur Express** - API REST complète
- **Endpoints multiples** :
  - `GET /api/levels` - Liste des niveaux
  - `GET /api/levels/:id` - Détails d'un niveau
  - `GET /api/weapons` - Liste des armes
- **CORS activé** - Communication frontend/backend
- **Données JSON** - Niveaux et armes dans des fichiers séparés

### 🔧 Refactorisation complète
- **Architecture modulaire** - Séparation claire des responsabilités
- **Composants réutilisables** - Code DRY (Don't Repeat Yourself)
- **Helpers utilitaires** - Fonctions pures et testables
- **Systèmes dédiés** - Combat, inventaire, scores séparés

### 🎣 Hooks personnalisés
- **useKeyboardMovement** - Gestion centralisée des contrôles
- **useResponsiveTileSize** - Adaptation automatique de la taille des tuiles
- **useTimer** - Chronomètre avec contrôles (start, stop, reset)
- **useUsernameValidation** - Validation du nom avec feedback

### 🎨 Fichiers CSS modulaires
- **Un fichier CSS par composant** - Maintenance facilitée
- **Classes sémantiques** - Nommage BEM-like cohérent
- **Variables CSS** - Thème centralisé (à implémenter)
- **Responsive design** - Media queries pour mobile/tablette/desktop

## 🎮 Gameplay

### Types de cases

| Icône | Type | Description |
|-------|------|-------------|
| 🟢 | Gobelin | Ennemi faible (nécessite une Dague) |
| 🟣 | Slime | Ennemi moyen (nécessite une Épée) |
| 🔴 | Orc | Ennemi fort (nécessite une Hache) |
| 🔥 | Feu | Obstacle (nécessite un Seau d'Eau) |
| 🪨 | Roche | Obstacle (nécessite une Pioche) |
| 💧 | Eau | Obstacle (nécessite des Bottes Magiques) |
| 🔴🚪 | Porte rouge | Nécessite la clé rouge |
| 🔵🚪 | Porte bleue | Nécessite la clé bleue |
| 🟥 | Clé rouge | Déverrouille les portes rouges |
| 🟦 | Clé bleue | Déverrouille les portes bleues |
| 🗡️ | Dague | Arme pour vaincre les gobelins |
| ⚔️ | Épée | Arme pour vaincre les slimes |
| 🪓 | Hache | Arme pour vaincre les orcs |
| 🏆 | Sortie | Objectif du niveau |

### Système de scoring

Le score final est calculé selon :
- **70% temps** - Plus vous êtes rapide, mieux c'est
- **30% HP** - Conservez vos points de vie

```javascript
Score = (1000 - temps_en_secondes) × 0.7 + HP_finaux × 10 × 0.3
```

### Conseils de jeu

1. 🗺️ **Explorez méthodiquement** - Révélez toutes les cases pour trouver les objets
2. ⚔️ **Collectez les armes** - Vous en aurez besoin pour les ennemis
3. 🗝️ **Trouvez les clés** - Elles sont essentielles pour progresser
4. 💚 **Préservez vos HP** - Évitez les combats inutiles
5. ⏱️ **Soyez rapide** - Le temps compte pour votre score final

## 🔌 API

### Endpoints disponibles

#### Niveaux
```http
GET /api/levels
```
Retourne la liste de tous les niveaux disponibles.

```http
GET /api/levels/:id
```
Retourne les détails d'un niveau spécifique (grille, ennemis, objets, etc.).

#### Armes
```http
GET /api/weapons
```
Retourne la liste de toutes les armes avec leurs caractéristiques.

### Format des données

#### Niveau
```json
{
  "id": 1,
  "name": "Entrée du Donjon",
  "rows": 8,
  "cols": 8,
  "start": { "row": 0, "col": 0 },
  "end": { "row": 7, "col": 7 },
  "grid": [ ... ],
  "enemies": [ ... ],
  "obstacles": [ ... ],
  "items": [ ... ]
}
```

#### Arme
```json
{
  "id": "dagger",
  "name": "Dague",
  "icon": "🗡️",
  "damage": 8,
  "canDefeat": ["goblin"]
}
```

## 📄 License

Ce projet est un projet scolaire sans licence spécifique.

---

## 📥 Fichier server.js

Pour utiliser ce projet, vous devez créer un fichier `server.js` avec le contenu suivant :

```javascript
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let highscores = [
  // Exemple : { id: 1, playerName: "Test", score: 100, levelId: 1, createdAt: "2025-01-01T10:00:00.000Z" }
];

/* -------------------------------------------
   CATALOGUES ENNEMIS / OBSTACLES / ITEMS
-------------------------------------------- */

const enemiesCatalog = [
  { type: "goblin", name: "Gobelin des couloirs", hp: 14, attack: 3, description: "Rapide mais fragile.", icon: "🟢", color: "#10b981" },
  { type: "slime", name: "Slime visqueux", hp: 10, attack: 2, description: "Lent et collant.", icon: "🟣", color: "#a855f7" },
  { type: "orc", name: "Orc brutal", hp: 20, attack: 5, description: "Très dangereux.", icon: "🔴", color: "#ef4444" }
];

const weaponsCatalog = [
  { id: "dagger", name: "Dague", description: "Peut vaincre les slimes", canDefeat: ["slime"], damage: 8, icon: "🗡️" },
  { id: "sword", name: "Épée", description: "Peut vaincre les slimes et gobelins", canDefeat: ["slime", "goblin"], damage: 15, icon: "⚔️" },
  { id: "axe", name: "Hache de guerre", description: "Peut vaincre tous les ennemis", canDefeat: ["slime", "goblin", "orc"], damage: 25, icon: "🪓" }
];

const obstaclesCatalog = [
  { type: "fire", name: "Flammes", requiredItem: "water_bucket", description: "Flammes à éteindre.", icon: "🔥" },
  { type: "rock", name: "Rochers", requiredItem: "pickaxe", description: "Rochers à briser.", icon: "🪨" },
  { type: "water", name: "Eau profonde", requiredItem: "swim_boots", description: "Eau à traverser.", icon: "💧" }
];

const itemsCatalog = [
  { id: "key_red", kind: "key", color: "red", name: "Clé rouge", description: "Ouvre porte rouge", icon: "🟥" },
  { id: "key_blue", kind: "key", color: "blue", name: "Clé bleue", description: "Ouvre porte bleue", icon: "🟦" },
  { id: "water_bucket", kind: "item", name: "Seau d'eau", description: "Éteint le feu", icon: "🪣" },
  { id: "pickaxe", kind: "item", name: "Pioche", description: "Casse les rochers", icon: "⛏️" },
  { id: "swim_boots", kind: "item", name: "Bottes amphibies", description: "Traverse l'eau", icon: "🥾" },
  { id: "dagger", kind: "weapon", name: "Dague", description: "Peut vaincre les slimes", icon: "🗡️" },
  { id: "sword", kind: "weapon", name: "Épée", description: "Peut vaincre les slimes et gobelins", icon: "⚔️" },
  { id: "axe", kind: "weapon", name: "Hache de guerre", description: "Peut vaincre tous les ennemis", icon: "🪓" }
];

/* -------------------------------------------
   NIVEAUX
-------------------------------------------- */

const levels = [
  // NIVEAU 1 - Initiation
  {
    id: 1,
    name: "Initiation",
    description: "Petit niveau pour tests.",
    rows: 6, cols: 6,
    difficulty: "easy",
    hasCombat: false,
    hasKeys: false,
    hasObstacles: false,
    start: { row: 0, col: 0 },
    end: { row: 5, col: 5 },
    grid: [
      ["S","C","C","W","C","C"],
      ["W","W","C","W","C","W"],
      ["C","C","C","C","C","C"],
      ["C","W","W","W","W","C"],
      ["C","C","C","C","C","C"],
      ["W","W","W","C","W","E"]
    ],
    enemies: [],
    obstacles: [],
    items: []
  },

  // NIVEAU 2 - Galerie des gobelins
  {
    id: 2,
    name: "Galerie des gobelins",
    description: "Introduction aux combats et aux clés.",
    rows: 8,
    cols: 8,
    difficulty: "medium",
    hasCombat: true,
    hasKeys: true,
    hasObstacles: false,
    start: { row: 0, col: 0 },
    end: { row: 7, col: 7 },
    grid: [
      ["S","C","C","M:goblin","C","C","W","C"],
      ["W","W","C","W","C","W","C","C"],
      ["C","C","I:dagger","C","C","C","C","W"],
      ["C","W","W","W","W","C","C","C"],
      ["C","C","C","K:red","C","W","M:slime","C"],
      ["W","W","C","W","D:red","C","C","C"],
      ["C","C","C","C","C","C","W","C"],
      ["W","W","W","C","W","C","C","E"]
    ],
    enemies: [
      enemiesCatalog.find(e => e.type === "goblin"),
      enemiesCatalog.find(e => e.type === "slime")
    ],
    obstacles: [],
    items: [
      itemsCatalog.find(i => i.id === "key_red")
    ]
  },

  // NIVEAU 3 - Donjon élémentaire
  {
    id: 3,
    name: "Donjon élémentaire",
    description: "Clés, portes, combats et obstacles.",
    rows: 10,
    cols: 10,
    difficulty: "hard",
    hasCombat: true,
    hasKeys: true,
    hasObstacles: true,
    start: { row: 0, col: 0 },
    end: { row: 9, col: 9 },
    grid: [
      ["S","C","W","K:red","C","M:goblin","C","W","O:fire","C"],
      ["C","W","W","C","D:red","C","C","W","C","C"],
      ["C","C","M:slime","C","C","I:pickaxe","W","C","C","W"],
      ["W","C","W","C","W","C","I:sword","C","M:orc","C"],
      ["C","C","C","C","O:rock","W","C","W","C","C"],
      ["W","W","W","C","C","C","C","W","O:water","C"],
      ["C","C","C","W","C","I:swim_boots","C","W","C","C"],
      ["C","M:slime","C","C","C","C","C","C","C","C"],
      ["C","C","W","C","W","C","C","M:goblin","W","C"],
      ["W","C","C","C","W","C","C","C","W","E"]
    ],
    enemies: enemiesCatalog,
    obstacles: obstaclesCatalog,
    items: itemsCatalog
  },

  // NIVEAU 4 - Labyrinthe Titanesque (20×20)
  {
    id: 4,
    name: "Labyrinthe Titanesque",
    description: "Un immense labyrinthe rempli d'ennemis, clés, portes et obstacles.",
    rows: 20,
    cols: 20,
    difficulty: "extreme",
    hasCombat: true,
    hasKeys: true,
    hasObstacles: true,
    start: { row: 0, col: 0 },
    end: { row: 19, col: 19 },
    grid: [
      ["S","C","C","W","C","M:goblin","C","C","W","C","C","C","O:rock","C","C","W","C","C","C","C"],
      ["W","W","C","W","C","W","C","W","C","C","W","C","C","W","C","C","C","W","M:slime","C"],
      ["C","C","C","C","C","C","C","C","W","C","C","W","C","C","W","C","W","C","C","C"],
      ["C","W","W","W","W","C","W","C","C","C","W","C","C","W","C","W","C","C","W","C"],
      ["C","C","C","C","O:fire","C","C","W","C","W","C","C","I:pickaxe","C","C","C","C","W","C","C"],
      ["W","W","W","C","C","C","C","W","C","O:water","C","W","C","W","C","W","I:axe","W","C","C"],
      ["C","C","C","W","C","I:swim_boots","C","W","C","C","C","C","C","C","W","C","C","C","C","W"],
      ["C","M:slime","C","C","C","C","C","C","C","W","C","C","W","C","C","C","W","C","C","C"],
      ["C","C","W","C","W","C","C","M:goblin","W","C","C","C","W","C","W","C","C","C","W","C"],
      ["W","C","C","C","W","C","C","C","W","C","C","C","C","W","C","C","W","C","C","C"],
      ["C","W","C","C","C","C","W","C","D:red","W","C","C","M:orc","C","C","C","O:fire","C","W","C"],
      ["C","C","C","W","C","C","W","C","C","C","W","C","C","C","W","C","C","C","C","C"],
      ["C","W","C","C","K:red","C","C","W","C","C","C","W","C","W","C","C","W","C","M:goblin","C"],
      ["C","C","C","W","C","W","C","W","C","W","C","C","C","C","C","W","C","C","C","W"],
      ["W","W","C","C","C","C","C","C","C","C","W","C","O:rock","C","W","C","C","W","C","C"],
      ["C","C","C","W","C","M:slime","C","C","W","C","C","C","C","C","C","C","C","C","W","C"],
      ["C","W","C","W","C","C","W","C","C","W","W","W","C","W","C","W","C","C","C","C"],
      ["C","C","C","C","C","C","C","W","C","C","C","C","C","C","C","W","O:water","C","C","C"],
      ["W","C","W","C","I:water_bucket","C","C","C","C","W","C","W","W","C","C","C","C","C","W","C"],
      ["C","C","C","C","W","C","C","C","C","C","C","C","C","W","C","C","C","W","C","E"]
    ],
    enemies: enemiesCatalog,
    obstacles: obstaclesCatalog,
    items: itemsCatalog
  }
];

/* -------------------------------------------
   ROUTES API
-------------------------------------------- */

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "FlipLabyrinth API is running" });
});

app.get("/api/levels", (req, res) => {
  const summary = levels.map(level => ({
    id: level.id,
    name: level.name,
    description: level.description,
    rows: level.rows,
    cols: level.cols,
    difficulty: level.difficulty,
    hasCombat: level.hasCombat,
    hasKeys: level.hasKeys,
    hasObstacles: level.hasObstacles
  }));
  res.json(summary);
});

app.get("/api/levels/:id", (req, res) => {
  const id = Number(req.params.id);
  const level = levels.find(l => l.id === id);
  if (!level) return res.status(404).json({ error: "Level not found" });
  res.json(level);
});

app.get("/api/highscores", (req, res) => {
  const levelId = req.query.levelId ? Number(req.query.levelId) : null;
  const limit = req.query.limit ? Number(req.query.limit) : 10;

  let list = highscores;

  if (levelId) {
    list = list.filter(h => h.levelId === levelId);
  }

  list = list.sort((a, b) => b.score - a.score);

  res.json(list.slice(0, limit));
});

app.post("/api/highscores", (req, res) => {
  const { playerName, score, levelId } = req.body || {};

  if (!playerName || typeof score !== "number" || typeof levelId !== "number") {
    return res.status(400).json({ error: "playerName, score et levelId sont requis" });
  }

  const levelExists = levels.some(l => l.id === levelId);
  if (!levelExists) {
    return res.status(400).json({ error: "levelId invalide" });
  }

  const newEntry = {
    id: highscores.length ? Math.max(...highscores.map(h => h.id)) + 1 : 1,
    playerName: String(playerName).slice(0, 30),
    score,
    levelId,
    createdAt: new Date().toISOString()
  };

  highscores.push(newEntry);

  const perLevel = highscores
    .filter(h => h.levelId === levelId)
    .sort((a, b) => b.score - a.score);

  const toKeep = perLevel.slice(0, 20).map(h => h.id);
  highscores = highscores.filter(
    h => h.levelId !== levelId || toKeep.includes(h.id)
  );

  res.status(201).json(newEntry);
});

app.get("/api/enemies", (req, res) => res.json(enemiesCatalog));
app.get("/api/obstacles", (req, res) => res.json(obstaclesCatalog));
app.get("/api/items", (req, res) => res.json(itemsCatalog));
app.get("/api/weapons", (req, res) => res.json(weaponsCatalog));

app.use((req, res) => res.status(404).json({ error: "Not found" }));

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
```

**Pour utiliser ce fichier :**

1. Copiez le code ci-dessus dans un fichier `server.js`
2. Installez les dépendances : `npm install express cors`
3. Lancez le serveur : `node server.js`

---

🎮 Bon courage, aventurier ! Que votre nom brille dans le Hall des Légendes ! ✨

MARTINEAU Justin
LAMOUCHE Valentin