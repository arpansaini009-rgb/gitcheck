import { useMemo, useState } from 'react';
import { daily, recentOrders, revenueByCategory } from './data.js';
import { currency, number, percent } from './format.js';
import { useTheme } from './theme.js';
import StatTile from './components/StatTile.jsx';
import RevenueChart from './components/RevenueChart.jsx';
import CategoryChart from './components/CategoryChart.jsx';
import OrdersTable from './components/OrdersTable.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

const RANGES = [7, 30, 90];

function totals(rows) {
  const t = rows.reduce(
    (acc, r) => ({
      revenue: acc.revenue + r.revenue,
      expenses: acc.expenses + r.expenses,
      orders: acc.orders + r.orders,
      visitors: acc.visitors + r.visitors,
    }),
    { revenue: 0, expenses: 0, orders: 0, visitors: 0 }
  );
  return { ...t, conversion: t.visitors ? t.orders / t.visitors : 0 };
}

// Relative change; null when there is no previous value to compare against.
const change = (curr, prev) => (prev ? (curr - prev) / prev : null);

export default function App() {
  const [range, setRange] = useState(30);
  const { theme, toggle, colors } = useTheme();

  const { current, curr, prev, categories } = useMemo(() => {
    const current = daily.slice(-range);
    const previous = daily.slice(-range * 2, -range);
    return {
      current,
      curr: totals(current),
      prev: totals(previous),
      categories: revenueByCategory(current),
    };
  }, [range]);

  return (
    <>
      <Header />
      <main className="page" id="overview">
        <div className="topbar">
          <h1>Dashboard</h1>
          <div className="controls">
            <div className="segmented" role="group" aria-label="Date range">
              {RANGES.map((r) => (
                <button key={r} className={r === range ? 'active' : ''} aria-pressed={r === range} onClick={() => setRange(r)}>
                  {r}d
                </button>
              ))}
            </div>
            <button className="icon-btn" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
              {theme === 'dark' ? '☀' : '☾'}
            </button>
          </div>
        </div>

        <section className="stats">
          <StatTile label="Revenue" value={currency(curr.revenue)} delta={change(curr.revenue, prev.revenue)} />
          <StatTile label="Expenses" value={currency(curr.expenses)} delta={change(curr.expenses, prev.expenses)} invert />
          <StatTile label="Orders" value={number(curr.orders)} delta={change(curr.orders, prev.orders)} />
          <StatTile label="Conversion" value={percent(curr.conversion)} delta={prev.visitors ? curr.conversion - prev.conversion : null} unit="pp" />
        </section>

        <section className="grid" id="charts">
          <RevenueChart data={current} colors={colors} />
          <CategoryChart data={categories} colors={colors} />
        </section>

        <section id="orders">
          <OrdersTable orders={recentOrders} />
        </section>
      </main>
      <Footer />
    </>
  );
}
