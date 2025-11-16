export function weightedScore({ risk = 0, health = 0, roi = 0, util = 0 }, weights = { risk:0.4, health:0.2, roi:0.3, util:0.1 }) {
  const score = (weights.risk * (1 - risk) 
    + weights.health * health
    + weights.roi * roi
    + weights.util * util);
  return score;
}
