import { useMemo, useState } from 'react';
import { currency, dateTime } from '../format.js';

const STATUS_ICON = { Paid: '✓', Pending: '•', Refunded: '↺' };

const ALL = 'all';
const HOUR = 60 * 60 * 1000;

const DATE_OPTIONS = [
  { value: ALL, label: 'Any time' },
  { value: '6', label: 'Last 6 hours' },
  { value: '12', label: 'Last 12 hours' },
  { value: '24', label: 'Last 24 hours' },
];

const AMOUNT_OPTIONS = [
  { value: ALL, label: 'Any amount', test: () => true },
  { value: 'low', label: 'Under $40', test: (a) => a < 40 },
  { value: 'mid', label: '$40 – $60', test: (a) => a >= 40 && a <= 60 },
  { value: 'high', label: 'Over $60', test: (a) => a > 60 },
];

const unique = (orders, key) => [...new Set(orders.map((o) => o[key]))].sort();

function Dropdown({ label, value, onChange, options }) {
  return (
    <label className="dropdown">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} aria-label={label}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function OrdersTable({ orders }) {
  const [customer, setCustomer] = useState(ALL);
  const [category, setCategory] = useState(ALL);
  const [status, setStatus] = useState(ALL);
  const [since, setSince] = useState(ALL);
  const [amount, setAmount] = useState(ALL);

  const toOptions = (values, allLabel) => [{ value: ALL, label: allLabel }, ...values.map((v) => ({ value: v, label: v }))];

  const filtered = useMemo(() => {
    const amountTest = AMOUNT_OPTIONS.find((o) => o.value === amount).test;
    const cutoff = since === ALL ? null : Date.now() - Number(since) * HOUR;
    return orders.filter(
      (o) =>
        (customer === ALL || o.customer === customer) &&
        (category === ALL || o.category === category) &&
        (status === ALL || o.status === status) &&
        (cutoff === null || o.date.getTime() >= cutoff) &&
        amountTest(o.amount)
    );
  }, [orders, customer, category, status, since, amount]);

  return (
    <div className="card">
      <div className="card-head">
        <h2>Recent orders</h2>
        <div className="filters">
          <Dropdown label="Customer" value={customer} onChange={setCustomer} options={toOptions(unique(orders, 'customer'), 'All customers')} />
          <Dropdown label="Category" value={category} onChange={setCategory} options={toOptions(unique(orders, 'category'), 'All categories')} />
          <Dropdown label="Status" value={status} onChange={setStatus} options={toOptions(unique(orders, 'status'), 'All statuses')} />
          <Dropdown label="Date" value={since} onChange={setSince} options={DATE_OPTIONS} />
          <Dropdown label="Amount" value={amount} onChange={setAmount} options={AMOUNT_OPTIONS} />
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Category</th>
              <th>Date</th>
              <th>Status</th>
              <th className="num">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id}>
                <td className="muted">{o.id}</td>
                <td>{o.customer}</td>
                <td>{o.category}</td>
                <td className="muted">{dateTime(o.date)}</td>
                <td>
                  <span className={`status status-${o.status.toLowerCase()}`}>
                    <span aria-hidden="true">{STATUS_ICON[o.status]}</span> {o.status}
                  </span>
                </td>
                <td className="num">{currency(o.amount)}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="muted empty">
                  No orders match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
