import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { compactCurrency, currency, shortDate } from '../format.js';

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="tooltip">
      <div className="tooltip-title">{shortDate(payload[0].payload.date)}</div>
      {payload.map((p) => (
        <div key={p.dataKey} className="tooltip-row">
          <span className="swatch" style={{ background: p.stroke }} />
          <span>{p.name}</span>
          <strong>{currency(p.value)}</strong>
        </div>
      ))}
    </div>
  );
}

export default function RevenueChart({ data, colors }) {
  return (
    <div className="card">
      <div className="card-head">
        <h2>Revenue vs expenses</h2>
        <div className="legend">
          <span><i className="swatch" style={{ background: colors.series1 }} />Revenue</span>
          <span><i className="swatch" style={{ background: colors.series2 }} />Expenses</span>
        </div>
      </div>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid stroke={colors.grid} vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={shortDate}
              stroke={colors.axis}
              tick={{ fill: colors.muted, fontSize: 12 }}
              tickLine={false}
              minTickGap={32}
            />
            <YAxis
              tickFormatter={compactCurrency}
              tick={{ fill: colors.muted, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={56}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: colors.axis }} />
            <Line type="monotone" dataKey="revenue" name="Revenue" stroke={colors.series1} strokeWidth={2} dot={false}
              activeDot={{ r: 4, stroke: colors.surface, strokeWidth: 2 }} />
            <Line type="monotone" dataKey="expenses" name="Expenses" stroke={colors.series2} strokeWidth={2} dot={false}
              activeDot={{ r: 4, stroke: colors.surface, strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
