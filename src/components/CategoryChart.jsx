import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { compactCurrency, currency } from '../format.js';

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, revenue } = payload[0].payload;
  return (
    <div className="tooltip">
      <div className="tooltip-title">{name}</div>
      <strong>{currency(revenue)}</strong>
    </div>
  );
}

export default function CategoryChart({ data, colors }) {
  return (
    <div className="card">
      <div className="card-head">
        <h2>Revenue by category</h2>
      </div>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 48, bottom: 0, left: 0 }} barCategoryGap={6}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: colors.muted, fontSize: 12 }}
              axisLine={{ stroke: colors.axis }}
              tickLine={false}
              width={84}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: colors.grid, opacity: 0.5 }} />
            <Bar
              dataKey="revenue"
              fill={colors.series1}
              radius={[0, 4, 4, 0]}
              maxBarSize={22}
              isAnimationActive={false}
              label={{ position: 'right', fill: colors.muted, fontSize: 12, formatter: compactCurrency }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
