export function formatCurrency(value, currency = 'USD') {
  if (value == null) return '-';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
}
