// Mock data, generated deterministically so the dashboard is stable across reloads.
// Replace these helpers with real API calls when a backend is available.

function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seeded(42);
// 180 days so the longest range (90d) still has a full previous period to compare against.
const DAYS = 180;

export const daily = Array.from({ length: DAYS }, (_, i) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - (DAYS - 1 - i));
  const trend = 1 + i / DAYS;
  // Weekly cycle keyed to the real weekday, so the same weekday always peaks.
  const weekly = 1 + 0.15 * Math.sin((date.getDay() / 7) * 2 * Math.PI);
  const revenue = Math.round(4000 * trend * weekly + rand() * 900);
  const expenses = Math.round(revenue * (0.55 + rand() * 0.1));
  const orders = Math.round(revenue / (48 + rand() * 8));
  const visitors = Math.round(orders * (28 + rand() * 6));
  return { date, revenue, expenses, orders, visitors };
});

export const CATEGORIES = ['Electronics', 'Apparel', 'Home', 'Beauty', 'Sports', 'Books'];
const CATEGORY_WEIGHT = [0.31, 0.22, 0.18, 0.12, 0.1, 0.07];

export function revenueByCategory(rows) {
  const total = rows.reduce((sum, r) => sum + r.revenue, 0);
  const split = CATEGORIES.map((name, i) => ({ name, revenue: Math.round(total * CATEGORY_WEIGHT[i]) }));
  // Give any rounding remainder to the largest category so the split sums to the total.
  split[0].revenue += total - split.reduce((sum, c) => sum + c.revenue, 0);
  return split;
}

const CUSTOMERS = ['Ava Patel', 'Liam Chen', 'Noah Kim', 'Mia Garcia', 'Zoe Singh', 'Ethan Brown', 'Isla Rossi', 'Leo Novak'];
const STATUSES = ['Paid', 'Paid', 'Paid', 'Pending', 'Refunded'];

export const recentOrders = Array.from({ length: 8 }, (_, i) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - Math.round(rand() * 60 * 24) - i * 90);
  return {
    customer: CUSTOMERS[i],
    category: CATEGORIES[Math.floor(rand() * CATEGORIES.length)],
    // Same range as the average order value implied by `daily` (revenue / orders ≈ $48–56).
    amount: Math.round(20 + rand() * 64),
    status: STATUSES[Math.floor(rand() * STATUSES.length)],
    date,
  };
})
  .sort((a, b) => b.date - a.date)
  .map((order, i) => ({ id: `#${10420 - i}`, ...order }));
