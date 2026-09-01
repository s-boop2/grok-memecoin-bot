# Grok Memecoin Bot 🤖

**Autonomous Solana Memecoin Trading System with 5 AI Agents**

An intelligent bot that autonomously launches memecoins on Pump.fun, monitors community sentiment via X (Twitter), and executes market operations (trades, burns, airdrops) through 5 specialized AI agents inspired by the Grok image.

## 🚀 Key Features

- **Token Deployment** - Launch memecoins on Pump.fun via PumpPortal API
- **Wallet Management** - Secure Solana wallet generation and management
- **Real-time Market Data** - Monitor price, volume, bonding curves
- **Creator Rewards** - Automatic reward claiming from trades
- **Token Burns** - Supply reduction based on AI decisions
- **Buybacks** - Price support using treasury SOL
- **Holder Snapshots** - Track distribution via Helius API
- **Airdrops** - Distribute tokens to active community
- **Community Monitoring** - X (Twitter) sentiment analysis

## 🤖 5 AI Agents

```
╔══════════════════════════════════════════════╗
║  ONE SHARED COMPUTER · YOU APPROVE          ║
║  5 AGENTS · ONE BOT · AUTONOMOUS TRADING    ║
╠══════════════════════════════════════════════╣
║  🎯 MML Agent       - Market Making Logic   ║
║  🔥 CATVIRES        - Community Sentiment   ║
║  📊 SHOPIUM         - Market Signals        ║
║  💰 MOONRAIN        - Rewards Distribution  ║
║  ⚡ Burn/Buyback    - Supply Management    ║
╚══════════════════════════════════════════════╝
```

| Agent | Role | Function |
|-------|------|----------|
| **MML** | Market Making Logic | Deploy tokens, optimize pricing |
| **CATVIRES** | Community Vibe | Monitor X, analyze sentiment |
| **SHOPIUM** | Market Signals | Technical analysis, detect patterns |
| **MOONRAIN** | Rewards Engine | Claim fees, distribute airdrops |
| **Burn/Buyback** | Supply Manager | Execute burns & buybacks |

## 🛠 Tech Stack

- **Runtime:** Node.js 20+
- **Framework:** Express.js  
- **Blockchain:** Solana (@solana/web3.js)
- **Language:** TypeScript
- **Validation:** Zod
- **AI:** OpenAI/Grok API

## 📡 API Endpoints

### Health & Status
```
GET  /api/health       - Health check
GET  /api/dashboard    - Dashboard & agent status
```

### Agent Control  
```
POST /api/agent/run-cycle         - Execute one cycle
GET  /api/agent/status            - All agents status
```

### Wallet & Treasury
```
POST /api/wallet/generate         - Create wallet
GET  /api/wallet/treasury         - Treasury info
```

### Token Operations
```
POST /api/token/deploy            - Launch token
GET  /api/token/active            - Active token
```

### Community
```
GET  /api/x/mentions              - X mentions
POST /api/x/analyze-and-respond   - Analyze sentiment
```

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/s-boop2/grok-memecoin-bot.git
cd grok-memecoin-bot
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your API keys
```

### 3. Start Bot
```bash
npm run dev
# Bot starts on http://localhost:5000
```

### 4. Check Health
```bash
curl http://localhost:5000/api/health
```

### 5. Run Agent Cycle
```bash
curl -X POST http://localhost:5000/api/agent/run-cycle
```

## 📁 Project Structure

```
.
├── server/
│   ├── index.ts                 # Express entry
│   ├── routes.ts                # API routes
│   └── services/
│       └── agents/
│           ├── mml.ts           # Market Making
│           ├── catvires.ts      # Sentiment
│           ├── shopium.ts       # Signals
│           ├── moonrain.ts      # Rewards
│           └── burn-buyback.ts  # Supply
├── shared/
│   └── schema.ts                # TypeScript types
└── README.md
```

## 🔧 Environment Variables

```bash
# Solana
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
HELIUS_API_KEY=your_key

# AI
XAI_API_KEY=your_key
OPENAI_API_KEY=your_key

# Server
PORT=5000
NODE_ENV=development
```

## 🔒 Security

- Private keys encrypted at rest
- API authentication for admin endpoints
- All secrets in environment variables

## 🤝 Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📄 License

MIT

## 🙏 Built For

The Solana community. Inspired by groked.dev.

---

**Made with 🚀 and 🤖**
