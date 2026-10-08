// delta is a fraction (0.05 = 5%). unit "%" shows relative change; "pp" shows percentage points.
export default function StatTile({ label, value, delta, unit = '%', invert = false }) {
  const rounded = delta == null ? null : Math.round(delta * 1000) / 10;
  const flat = rounded === 0;
  const up = rounded > 0;
  // invert: a decrease is the good direction (e.g. expenses)
  const tone = rounded == null || flat ? 'neutral' : up !== invert ? 'good' : 'bad';

  return (
    <div className="card stat">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className={`stat-delta ${tone}`}>
        {rounded == null ? (
          <span>No previous data</span>
        ) : (
          <>
            <span aria-hidden="true">{flat ? '–' : up ? '▲' : '▼'}</span>
            {Math.abs(rounded).toFixed(1)}
            {unit === 'pp' ? ' pp' : '%'} <span className="stat-period">vs previous period</span>
          </>
        )}
      </div>
    </div>
  );
}
