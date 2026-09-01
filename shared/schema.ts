import { z } from "zod";

// Agent Names
export const AgentNameEnum = z.enum([
  "mml",
  "catvires",
  "shopium",
  "moonrain",
  "burn-buyback",
]);
export type AgentName = z.infer<typeof AgentNameEnum>;

// Wallet
export const WalletSchema = z.object({
  id: z.string(),
  publicKey: z.string(),
  type: z.enum(["treasury", "standard", "pool"]),
  label: z.string().optional(),
  createdAt: z.date(),
});
export type Wallet = z.infer<typeof WalletSchema>;

// Token
export const TokenSchema = z.object({
  id: z.string(),
  mint: z.string(),
  name: z.string(),
  symbol: z.string(),
  status: z.enum(["active", "graduated", "failed"]),
  createdAt: z.date(),
});
export type Token = z.infer<typeof TokenSchema>;

// Agent Decision
export const AgentDecisionSchema = z.object({
  id: z.string(),
  agentName: AgentNameEnum,
  decision: z.string(),
  reasoning: z.string(),
  timestamp: z.date(),
  executed: z.boolean(),
});
export type AgentDecision = z.infer<typeof AgentDecisionSchema>;
