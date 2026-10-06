export const currency = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export const compactCurrency = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 });

export const number = (n) => n.toLocaleString('en-US');

export const percent = (n) => `${(n * 100).toFixed(1)}%`;

export const shortDate = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

export const dateTime = (d) =>
  d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
