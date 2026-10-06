import { currency, dateTime } from '../format.js';

const STATUS_ICON = { Paid: '✓', Pending: '•', Refunded: '↺' };

export default function OrdersTable({ orders }) {
  return (
    <div className="card">
      <div className="card-head">
        <h2>Recent orders</h2>
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
            {orders.map((o) => (
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
