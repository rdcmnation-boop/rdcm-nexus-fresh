# 🚀 RDCM Nexus Fresh - Deployment Guide

## Step 1: Create GitHub Repository

Go to https://github.com/new and create a new repo:
- **Name:** `rdcm-nexus-fresh`
- **Public:** Yes
- **Initialize:** No (we have git already)

## Step 2: Push to GitHub

```bash
cd /home/claude/rdcm-nexus-fresh

# Add remote (replace YOUR_USER)
git remote add origin https://github.com/YOUR_USER/rdcm-nexus-fresh.git

# Push
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Netlify (FREE!)

1. Go to https://netlify.com
2. Click "Add new site" → "Connect to Git"
3. Choose GitHub → Select `rdcm-nexus-fresh` repo
4. Deploy settings:
   - **Publish directory:** `public`
   - **Build command:** (leave empty)
5. Click "Deploy site"

**Your site will be live in seconds!** 🎉

## Step 4: Setup Firebase Backend (FREE!)

1. Go to https://firebase.google.com
2. Click "Get Started"
3. Create new project `rdcm-nexus`
4. Create Firestore Database
5. Copy your config to `src/api.js`:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_KEY",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef"
   };
   ```
6. Create Firestore collections:
   - `players` (user data)
   - `games` (game results)
   - `leaderboard` (rankings)

7. Push update:
   ```bash
   git add src/api.js
   git commit -m "Add Firebase config"
   git push
   ```

## Step 5: Test Live Site

Your site is live! Test it:
- Open your Netlify URL
- Test games
- Check balance updates
- Everything should work!

## Adding Features

**Easy! Just edit `src/games.js`:**

```javascript
// Add new game
yourGame: {
  html: `<div class="game-container">...</div>`,
  init: function() { /* Setup */ },
  play: function() { /* Game logic */ }
}
```

Add button in HTML:
```html
<button onclick="switchGame('yourGame')">🎮 Your Game</button>
```

Done! Auto-deploys on push to GitHub.

---

**That's it! You now have:**
- ✅ Free hosting (Netlify)
- ✅ Free backend (Firebase)
- ✅ Auto-deployment
- ✅ Easy game updates
- ✅ AI bots in all games

Let me know if you hit any issues! 🎮
