# RDCM NATION - Nexus Gaming Hub 3036

Simple, clean gaming platform - easy to update games and connect backend!

## 🎮 Games Included
- ⛏️ **Mining** - Passive income with upgradeable miners
- ♠️ **Blackjack** - Play vs AI dealer bot
- 📈 **Crash** - Race against the multiplier
- 🎲 **Dice** - Roll vs AI bot
- ⚔️ **Arena** - 100-player battle royale

## 🚀 Quick Start

### Deploy to Netlify (Free!)
1. Push code to GitHub
2. Connect to Netlify at `netlify.com`
3. Choose repo → Auto-deploy on every push

### Setup Backend (Firebase - Free!)
1. Go to `firebase.google.com`
2. Create new project
3. Copy config to `src/api.js`
4. Set up Firestore collections:
   - `players` - User data
   - `games` - Game results
   - `leaderboard` - Rankings

## 📝 Easy Game Updates

Each game in `src/games.js` is super simple to modify:

```javascript
crash: {
  html: `<div>Your HTML</div>`,
  init: function() { /* Load game */ },
  start: function() { /* Game logic */ },
  // Add more functions as needed
}
```

## 🤖 Adding AI Bots

All games already include AI bots:
- **Blackjack Dealer** - Hits on <17
- **Dice Bot** - Random rolls
- **Crash Bot** - Random crash point
- **Arena Bots** - 100 AI players

## 💰 Backend API (Easy Connection!)

```javascript
// Save player
api.savePlayer(userId, { balance: 5000 });

// Get leaderboard
api.getLeaderboard();

// Record game
api.recordGame(userId, 'blackjack', { won: true });

// Get stats
api.getUserStats(userId);
```

## 🎯 Next Steps
1. Deploy frontend to Netlify
2. Set up Firebase backend
3. Update `firebaseConfig` in `src/api.js`
4. Start adding features!

---
**Built for RDCM Nation by Claude AI**
