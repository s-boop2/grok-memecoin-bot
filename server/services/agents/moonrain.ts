// Rewards Distribution Agent - Full Strategy
import { log } from "../../index";

export interface MOONRAINDecision {
  action: 'claim' | 'hold' | 'distribute' | 'reinvest';
  estimatedRewards: number;
  distributionPlan?: {
    holders: number;
    amountPerHolder: number;
    totalToDistribute: number;
  };
  reinvestPlan?: {
    liquidityIncrease: number;
    burnAmount: number;
  };
  reasoning: string;
  roi?: number; // Return on investment %
}

export interface RewardMetrics {
  pendingRewards: number;
  totalHolders: number;
  averageHoldingTime: number; // days
  treasurySize: number; // SOL
  tradingVolume24h: number;
}

export async function runMOONRAINCycle(metrics?: RewardMetrics): Promise<MOONRAINDecision> {
  log('💰 MOONRAIN Agent: Processing rewards distribution');
  
  // Default metrics
  const data = metrics || {
    pendingRewards: 2.5,
    totalHolders: 150,
    averageHoldingTime: 14,
    treasurySize: 10,
    tradingVolume24h: 50000,
  };

  let decision: MOONRAINDecision;

  // Strategy 1: Large rewards pending - claim and distribute
  if (data.pendingRewards > 1.0 && data.totalHolders > 100) {
    const amountPerHolder = (data.pendingRewards * 0.8) / data.totalHolders; // Keep 20% for operations
    decision = {
      action: 'distribute',
      estimatedRewards: data.pendingRewards,
      distributionPlan: {
        holders: data.totalHolders,
        amountPerHolder: amountPerHolder,
        totalToDistribute: data.pendingRewards * 0.8,
      },
      reasoning: `Significant rewards accumulated (${data.pendingRewards.toFixed(2)} SOL) - time to distribute to ${data.totalHolders} holders`,
      roi: (data.pendingRewards / data.treasurySize) * 100,
    };
  }
  // Strategy 2: Moderate rewards - reinvest for growth
  else if (data.pendingRewards > 0.5 && data.treasurySize < 20) {
    decision = {
      action: 'reinvest',
      estimatedRewards: data.pendingRewards,
      reinvestPlan: {
        liquidityIncrease: data.pendingRewards * 0.7, // 70% to liquidity
        burnAmount: data.pendingRewards * 0.2, // 20% burn (reduce supply)
      },
      reasoning: `Medium rewards (${data.pendingRewards.toFixed(2)} SOL) - reinvest to grow treasury and reduce supply pressure`,
      roi: (data.pendingRewards / data.treasurySize) * 100,
    };
  }
  // Strategy 3: Small rewards or treasury too small - hold
  else if (data.pendingRewards < 0.5 || data.treasurySize < 5) {
    decision = {
      action: 'hold',
      estimatedRewards: data.pendingRewards,
      reasoning: `Rewards insufficient for distribution (${data.pendingRewards.toFixed(2)} SOL) - accumulate for next cycle`,
      roi: 0,
    };
  }
  // Strategy 4: Claim when high volume
  else if (data.tradingVolume24h > 100000) {
    decision = {
      action: 'claim',
      estimatedRewards: data.pendingRewards,
      reasoning: `High trading volume (${data.tradingVolume24h.toLocaleString()} SOL) - claim rewards from fees`,
      roi: (data.pendingRewards / data.treasurySize) * 100,
    };
  }
  else {
    decision = {
      action: 'hold',
      estimatedRewards: data.pendingRewards,
      reasoning: 'Awaiting optimal conditions for reward claim and distribution',
      roi: 0,
    };
  }
  
  log(`MOONRAIN: ${decision.action.toUpperCase()} | Pending: ${data.pendingRewards.toFixed(2)} SOL | ROI: ${decision.roi?.toFixed(1)}%`);
  return decision;
}
