export default function StatTile({ label, value, delta, invert = false }) {
  // invert: a decrease is the good direction (e.g. expenses)
  const up = delta >= 0;
  const good = invert ? !up : up;
  return (
    <div className="card stat">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className={`stat-delta ${good ? 'good' : 'bad'}`}>
        <span aria-hidden="true">{up ? '▲' : '▼'}</span>
        {Math.abs(delta * 100).toFixed(1)}% <span className="stat-period">vs previous period</span>
      </div>
    </div>
  );
}
