import { type Server } from "http";
import { type Express } from "express";
import { log } from "./index";
import { runMMLCycle } from "./services/agents/mml";
import { runCATVIRESCycle } from "./services/agents/catvires";
import { runSHOPIUMCycle } from "./services/agents/shopium";
import { runMOONRAINCycle } from "./services/agents/moonrain";
import { runBurnBuybackCycle } from "./services/agents/burn-buyback";

export async function registerRoutes(httpServer: Server, app: Express) {
  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date() });
  });

  // Dashboard
  app.get("/api/dashboard", (req, res) => {
    res.json({
      botName: "Grok Memecoin Bot",
      version: "1.0.0",
      agents: [
        { name: "mml", status: "active", role: "Market Making Logic" },
        { name: "catvires", status: "active", role: "Community Sentiment" },
        { name: "shopium", status: "active", role: "Market Signals" },
        { name: "moonrain", status: "active", role: "Rewards Distribution" },
        { name: "burn-buyback", status: "active", role: "Supply Management" },
      ],
      treasuryBalance: { sol: 0, tokens: [] },
      activeToken: null,
      uptime: process.uptime(),
    });
  });

  // Wallet Routes
  app.post("/api/wallet/generate", (req, res) => {
    res.json({
      success: true,
      wallet: {
        publicKey: "11111111111111111111111111111111",
        type: req.body.type || "standard",
        label: req.body.label,
      },
    });
  });

  app.get("/api/wallet/treasury", (req, res) => {
    res.json({
      publicKey: "11111111111111111111111111111111",
      type: "treasury",
      balance: { sol: 0, tokens: [] },
    });
  });

  // Agent Status
  app.get("/api/agent/status", (req, res) => {
    res.json({
      agents: [
        { name: "mml", status: "active", lastCycle: new Date() },
        { name: "catvires", status: "active", lastCycle: new Date() },
        { name: "shopium", status: "active", lastCycle: new Date() },
        { name: "moonrain", status: "active", lastCycle: new Date() },
        { name: "burn-buyback", status: "active", lastCycle: new Date() },
      ],
    });
  });

  // Run Full Agent Cycle
  app.post("/api/agent/run-cycle", async (req, res) => {
    log("🔄 Running full agent cycle");
    try {
      const mmlDecision = await runMMLCycle();
      const catviresSentiment = await runCATVIRESCycle();
      const shopiumSignal = await runSHOPIUMCycle();
      const moonrainRewards = await runMOONRAINCycle();
      const burnBuybackDecision = await runBurnBuybackCycle();

      res.json({
        success: true,
        cycle: {
          timestamp: new Date(),
          agentsRun: 5,
          decisions: [
            { agent: "mml", decision: mmlDecision.action, confidence: mmlDecision.confidence },
            { agent: "catvires", sentiment: catviresSentiment.sentiment },
            { agent: "shopium", signal: shopiumSignal.signal },
            { agent: "moonrain", action: moonrainRewards.action },
            { agent: "burn-buyback", action: burnBuybackDecision.action },
          ],
        },
      });
    } catch (error) {
      log(`❌ Error in agent cycle: ${error}`);
      res.status(500).json({ error: "Agent cycle failed" });
    }
  });

  // Token Routes
  app.post("/api/token/deploy", (req, res) => {
    log(`📤 Deploying token: ${req.body.name}`);
    res.json({
      success: true,
      token: {
        mint: "11111111111111111111111111111111",
        name: req.body.name,
        symbol: req.body.symbol,
        status: "deploying",
      },
    });
  });

  app.get("/api/token/active", (req, res) => {
    res.json({
      token: null,
      message: "No active token",
    });
  });

  // Activity Routes
  app.get("/api/activity", (req, res) => {
    res.json({
      activities: [
        {
          type: "bot_start",
          timestamp: new Date(),
          message: "Grok Bot initialized with 5 agents",
        },
      ],
    });
  });

  // Community Routes
  app.get("/api/x/mentions", (req, res) => {
    res.json({
      mentions: [],
      query: req.query.query,
      totalResults: 0,
    });
  });

  log("✅ Routes registered");
}
