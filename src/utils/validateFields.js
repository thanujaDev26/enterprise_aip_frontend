export function required(value) {
  return value == null || value === '' ? 'Required' : null;
}

export function isNumber(value) {
  return isNaN(Number(value)) ? 'Must be a number' : null;
}
