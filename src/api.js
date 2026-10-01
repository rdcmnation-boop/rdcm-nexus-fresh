// Firebase Configuration (Replace with your Firebase config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// API Functions - Easy to Update!

const api = {
  // Save player data
  savePlayer: async (userId, data) => {
    try {
      const response = await fetch('/api/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...data })
      });
      return await response.json();
    } catch (error) {
      console.error('Save error:', error);
    }
  },

  // Get leaderboard
  getLeaderboard: async () => {
    try {
      const response = await fetch('/api/leaderboard');
      return await response.json();
    } catch (error) {
      console.error('Leaderboard error:', error);
      return [];
    }
  },

  // Record game result
  recordGame: async (userId, game, result) => {
    try {
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, game, result, timestamp: new Date() })
      });
      return await response.json();
    } catch (error) {
      console.error('Game record error:', error);
    }
  },

  // Get user stats
  getUserStats: async (userId) => {
    try {
      const response = await fetch(`/api/stats/${userId}`);
      return await response.json();
    } catch (error) {
      console.error('Stats error:', error);
      return {};
    }
  }
};

// Initialize API (called on page load)
function initAPI() {
  console.log('API ready for Firebase/Backend connection');
  // Backend will be added easily here
}

window.addEventListener('load', initAPI);
