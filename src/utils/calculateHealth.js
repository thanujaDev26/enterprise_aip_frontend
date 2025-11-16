export function calculateHealthIndex(metrics = {}) {
  const vals = Object.values(metrics).filter((v) => typeof v === 'number');
  if (!vals.length) return 0;
  const sum = vals.reduce((s, v) => s + v, 0);
  return Math.round(sum / vals.length);
}
