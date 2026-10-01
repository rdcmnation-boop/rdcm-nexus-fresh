let balance = 5000;
let currentGame = 'mining';

const games = {
  mining: {
    html: `
      <div class="game-container">
        <h2>⛏️ NEXUS MINING</h2>
        <div style="margin: 20px 0;">
          <div class="stat-box">
            <div class="stat-label">Miners</div>
            <div class="stat-value" id="minerCount">1</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">Earned</div>
            <div class="stat-value" id="miningEarned">0</div>
          </div>
        </div>
        <button class="btn" onclick="games.mining.toggle()">▶️ START</button>
        <button class="btn" onclick="games.mining.claim()">💰 CLAIM</button>
        <button class="btn" onclick="games.mining.upgrade()">🚀 UPGRADE (100)</button>
      </div>
    `,
    earned: 0,
    miners: 1,
    mining: false,
    interval: null,
    init: function() {
      document.getElementById('game-content').innerHTML = this.html;
      if (this.interval) clearInterval(this.interval);
    },
    toggle: function() {
      this.mining = !this.mining;
      if (this.mining) {
        this.interval = setInterval(() => {
          this.earned += 0.1 * this.miners;
          document.getElementById('miningEarned').innerText = this.earned.toFixed(2);
        }, 100);
        document.querySelector('.btn').innerText = '⏹️ STOP';
      } else {
        clearInterval(this.interval);
        document.querySelector('.btn').innerText = '▶️ START';
      }
    },
    claim: function() {
      balance += this.earned;
      this.earned = 0;
      updateBalance();
      document.getElementById('miningEarned').innerText = '0';
    },
    upgrade: function() {
      if (this.earned >= 100) {
        this.earned -= 100;
        this.miners += 1;
        document.getElementById('minerCount').innerText = this.miners;
        document.getElementById('miningEarned').innerText = this.earned.toFixed(2);
      }
    }
  },

  blackjack: {
    html: `
      <div class="game-container">
        <h2>♠️ BLACKJACK vs BOT</h2>
        <div style="display: flex; justify-content: space-between; margin: 20px 0;">
          <div style="flex: 1; margin-right: 20px;">
            <p style="color: #00D9FF; margin-bottom: 10px;">DEALER</p>
            <div id="dealerCards"></div>
            <p style="margin-top: 10px;">Score: <span id="dealerScore">0</span></p>
          </div>
          <div style="flex: 1;">
            <p style="color: #FF6B9D; margin-bottom: 10px;">YOU</p>
            <div id="playerCards"></div>
            <p style="margin-top: 10px;">Score: <span id="playerScore">0</span></p>
          </div>
        </div>
        <div id="gameStatus" style="text-align: center; margin: 20px 0; color: #00D9FF;"></div>
        <div style="text-align: center;">
          <button class="btn" onclick="games.blackjack.hit()">HIT</button>
          <button class="btn" onclick="games.blackjack.stand()">STAND</button>
          <button class="btn" onclick="games.blackjack.newGame()">NEW GAME (50)</button>
        </div>
      </div>
    `,
    bet: 50,
    gameActive: false,
    playerCards: [],
    dealerCards: [],
    init: function() {
      document.getElementById('game-content').innerHTML = this.html;
    },
    newGame: function() {
      if (balance < 50) { alert('Need 50 NEXUS!'); return; }
      balance -= 50;
      updateBalance();
      this.gameActive = true;
      this.playerCards = [this.randomCard(), this.randomCard()];
      this.dealerCards = [this.randomCard()];
      this.render();
    },
    hit: function() {
      if (!this.gameActive) return;
      this.playerCards.push(this.randomCard());
      const score = this.getScore(this.playerCards);
      if (score > 21) {
        this.gameActive = false;
        document.getElementById('gameStatus').innerText = '💀 BUST! You lose!';
      }
      this.render();
    },
    stand: function() {
      if (!this.gameActive) return;
      this.gameActive = false;
      while (this.getScore(this.dealerCards) < 17) {
        this.dealerCards.push(this.randomCard());
      }
      const playerScore = this.getScore(this.playerCards);
      const dealerScore = this.getScore(this.dealerCards);
      if (dealerScore > 21) {
        balance += 100;
        document.getElementById('gameStatus').innerText = '🎉 DEALER BUST! You WIN!';
      } else if (playerScore > dealerScore) {
        balance += 100;
        document.getElementById('gameStatus').innerText = '🎉 You WIN!';
      } else if (playerScore === dealerScore) {
        balance += 50;
        document.getElementById('gameStatus').innerText = '⚖️ PUSH!';
      } else {
        document.getElementById('gameStatus').innerText = '💀 Dealer WINS!';
      }
      updateBalance();
      this.render();
    },
    randomCard: function() { return Math.floor(Math.random() * 13) + 1; },
    getScore: function(cards) {
      let score = 0, aces = 0;
      cards.forEach(c => {
        if (c === 1) aces++;
        score += c > 10 ? 10 : c;
      });
      while (score + 10 <= 21 && aces > 0) { score += 10; aces--; }
      return score;
    },
    render: function() {
      document.getElementById('playerCards').innerText = this.playerCards.join(', ');
      document.getElementById('dealerCards').innerText = this.dealerCards.slice(0, 1).join(', ') + ' [?]';
      document.getElementById('playerScore').innerText = this.getScore(this.playerCards);
      document.getElementById('dealerScore').innerText = this.gameActive ? '?' : this.getScore(this.dealerCards);
    }
  },

  crash: {
    html: `
      <div class="game-container">
        <h2>📈 CRASH BOT</h2>
        <div style="text-align: center; margin: 30px 0;">
          <div class="stat-box">
            <div class="stat-label">Multiplier</div>
            <div class="stat-value" id="multiplier">1.00x</div>
          </div>
          <p id="crashMsg" style="margin-top: 20px; color: #FF6B9D;"></p>
        </div>
        <div style="text-align: center;">
          <input type="number" id="betAmount" value="10" min="1" style="padding: 10px; margin: 10px; background: rgba(0,217,255,0.2); border: 1px solid #00D9FF; color: white; border-radius: 5px;">
          <button class="btn" onclick="games.crash.start()">🚀 START (costs bet)</button>
        </div>
      </div>
    `,
    active: false,
    multiplier: 1.0,
    crashPoint: 0,
    interval: null,
    init: function() {
      document.getElementById('game-content').innerHTML = this.html;
    },
    start: function() {
      const bet = parseInt(document.getElementById('betAmount').value);
      if (balance < bet) { alert('Insufficient balance!'); return; }
      balance -= bet;
      updateBalance();
      this.active = true;
      this.multiplier = 1.0;
      this.crashPoint = 1 + Math.random() * 15;
      document.getElementById('crashMsg').innerText = '';
      this.interval = setInterval(() => {
        this.multiplier += 0.05;
        document.getElementById('multiplier').innerText = this.multiplier.toFixed(2) + 'x';
        if (this.multiplier >= this.crashPoint) {
          clearInterval(this.interval);
          this.active = false;
          document.getElementById('crashMsg').innerText = '💥 CRASHED! You lost your bet.';
        }
      }, 100);
    }
  },

  dice: {
    html: `
      <div class="game-container">
        <h2>🎲 DICE vs BOT</h2>
        <div style="display: flex; justify-content: space-around; margin: 30px 0;">
          <div style="text-align: center;">
            <p style="color: #FF6B9D;">YOUR ROLL</p>
            <div style="font-size: 3em;">🎲 <span id="playerDice">-</span></div>
          </div>
          <div style="text-align: center;">
            <p style="color: #00D9FF;">BOT ROLL</p>
            <div style="font-size: 3em;">🎲 <span id="botDice">-</span></div>
          </div>
        </div>
        <p id="diceResult" style="text-align: center; color: #00D9FF; margin: 20px 0;"></p>
        <div style="text-align: center;">
          <button class="btn" onclick="games.dice.roll()">ROLL DICE (10)</button>
        </div>
      </div>
    `,
    init: function() {
      document.getElementById('game-content').innerHTML = this.html;
    },
    roll: function() {
      if (balance < 10) { alert('Need 10 NEXUS!'); return; }
      balance -= 10;
      updateBalance();
      const player = Math.floor(Math.random() * 6) + 1;
      const bot = Math.floor(Math.random() * 6) + 1;
      document.getElementById('playerDice').innerText = player;
      document.getElementById('botDice').innerText = bot;
      if (player > bot) {
        balance += 20;
        document.getElementById('diceResult').innerText = '🎉 You WIN!';
      } else if (bot > player) {
        document.getElementById('diceResult').innerText = '💀 Bot WINS!';
      } else {
        balance += 10;
        document.getElementById('diceResult').innerText = '⚖️ PUSH!';
      }
      updateBalance();
    }
  },

  arena: {
    html: `
      <div class="game-container">
        <h2>⚔️ ARENA BATTLE</h2>
        <p style="color: #00D9FF; margin: 20px 0;">100-player PvP Battle Royale</p>
        <div class="stat-box">
          <div class="stat-label">Entry Fee</div>
          <div class="stat-value">50 NEXUS</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Prize Pool</div>
          <div class="stat-value">500 NEXUS</div>
        </div>
        <div style="margin: 20px 0; text-align: center;">
          <p style="color: #FF6B9D; margin-bottom: 20px;">Real-time 100-player battle with AI bots, shrinking zones, and power-ups!</p>
          <button class="btn" onclick="games.arena.enter()">⚔️ ENTER ARENA</button>
        </div>
      </div>
    `,
    init: function() {
      document.getElementById('game-content').innerHTML = this.html;
    },
    enter: function() {
      if (balance < 50) { alert('Need 50 NEXUS!'); return; }
      balance -= 50;
      updateBalance();
      alert('🎮 Arena battle started! Watch as 100 AI bots fight to the death. Winner gets 500 NEXUS!');
      // Simulate arena - winner earns prize
      setTimeout(() => {
        balance += 500;
        updateBalance();
        alert('🏆 You won the arena! +500 NEXUS!');
      }, 3000);
    }
  }
};

function switchGame(game) {
  if (games[game].interval) clearInterval(games[game].interval);
  currentGame = game;
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  games[game].init();
}

function updateBalance() {
  document.getElementById('balance').innerText = balance.toFixed(0);
}

// Initialize with mining
window.addEventListener('load', () => {
  games.mining.init();
});
