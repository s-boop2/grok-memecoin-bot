// Market Signals Agent - Full Strategy with Technical Analysis
import { log } from "../../index";

export interface SHOPIUMDecision {
  signal: 'strong_buy' | 'buy' | 'hold' | 'sell' | 'strong_sell';
  technicalScore: number; // 0-1
  volumeAnalysis: string;
  recommendation: string;
  indicators: {
    rsi: number; // 0-100
    macd: 'bullish' | 'neutral' | 'bearish';
    movingAverage: 'above' | 'below' | 'at';
  };
  riskLevel: 'low' | 'medium' | 'high';
}

export interface ChartData {
  price: number;
  volume: number;
  priceChange24h: number; // %
  volumeChange24h: number; // %
  support: number;
  resistance: number;
}

export async function runSHOPIUMCycle(chartData?: ChartData): Promise<SHOPIUMDecision> {
  log('📊 SHOPIUM Agent: Analyzing market signals');
  
  // Default chart data
  const data = chartData || {
    price: 0.0005,
    volume: 1000000,
    priceChange24h: 5,
    volumeChange24h: 20,
    support: 0.00045,
    resistance: 0.00055,
  };

  // Calculate RSI (Relative Strength Index)
  // Simplified: based on price change
  let rsi = 50;
  if (data.priceChange24h > 5) rsi = 65 + (Math.min(data.priceChange24h - 5, 20) / 20) * 35;
  if (data.priceChange24h < -5) rsi = 35 - (Math.min(Math.abs(data.priceChange24h) - 5, 20) / 20) * 35;

  // MACD Signal
  let macd: 'bullish' | 'neutral' | 'bearish' = 'neutral';
  if (data.priceChange24h > 3 && data.volumeChange24h > 10) macd = 'bullish';
  if (data.priceChange24h < -3 && data.volumeChange24h < -10) macd = 'bearish';

  // Moving Average Position
  const averagePrice = (data.support + data.resistance) / 2;
  let movingAverage: 'above' | 'below' | 'at' = 'at';
  if (data.price > averagePrice * 1.02) movingAverage = 'above';
  if (data.price < averagePrice * 0.98) movingAverage = 'below';

  // Calculate technical score (0-1)
  let technicalScore = 0.5;
  if (macd === 'bullish') technicalScore += 0.2;
  if (rsi > 60) technicalScore += 0.1;
  if (data.volumeChange24h > 15) technicalScore += 0.1;
  if (movingAverage === 'above') technicalScore += 0.05;

  technicalScore = Math.min(technicalScore, 1);

  let decision: SHOPIUMDecision;

  // Strong Buy: All signals positive
  if (technicalScore > 0.8 && macd === 'bullish' && rsi > 65) {
    decision = {
      signal: 'strong_buy',
      technicalScore: technicalScore,
      volumeAnalysis: `High volume breakout: ${data.volumeChange24h.toFixed(1)}% increase`,
      recommendation: 'All systems GO - Strong uptrend confirmed',
      indicators: { rsi, macd, movingAverage },
      riskLevel: 'low',
    };
  }
  // Buy: Mostly positive
  else if (technicalScore > 0.65 && macd !== 'bearish') {
    decision = {
      signal: 'buy',
      technicalScore: technicalScore,
      volumeAnalysis: `Moderate volume: ${data.volumeChange24h.toFixed(1)}% change`,
      recommendation: 'Positive signals - Consider entry',
      indicators: { rsi, macd, movingAverage },
      riskLevel: 'medium',
    };
  }
  // Sell: Negative signals
  else if (technicalScore < 0.35 && macd === 'bearish') {
    decision = {
      signal: 'sell',
      technicalScore: technicalScore,
      volumeAnalysis: `Declining volume: ${data.volumeChange24h.toFixed(1)}% change`,
      recommendation: 'Bearish divergence detected',
      indicators: { rsi, macd, movingAverage },
      riskLevel: 'high',
    };
  }
  // Hold: Mixed signals
  else {
    decision = {
      signal: 'hold',
      technicalScore: technicalScore,
      volumeAnalysis: `Mixed signals: Price ${data.priceChange24h > 0 ? '+' : ''}${data.priceChange24h.toFixed(1)}%, Vol ${data.volumeChange24h > 0 ? '+' : ''}${data.volumeChange24h.toFixed(1)}%`,
      recommendation: 'Wait for clear signal',
      indicators: { rsi, macd, movingAverage },
      riskLevel: 'medium',
    };
  }
  
  log(`SHOPIUM Signal: ${decision.signal.toUpperCase()} | RSI: ${rsi.toFixed(0)} | MACD: ${macd}`);
  return decision;
}
