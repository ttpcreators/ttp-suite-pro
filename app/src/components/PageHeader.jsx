export default function PageHeader({ title, crumbs = [], action }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22, gap: 12, flexWrap: 'wrap' }}>
      <div>
        <div style={{ font: "500 46px 'Inter',sans-serif", letterSpacing: '-2px', color: 'var(--text)' }}>{title}</div>
        {crumbs.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 10, font: "500 12px 'Inter',sans-serif", color: 'var(--faint)' }}>
            {crumbs.map((c, i) => (
              <span key={i} style={i === crumbs.length - 1 ? { color: 'var(--text)' } : null}>{i > 0 && <span style={{ margin: '0 9px', color: 'var(--faint)' }}>›</span>}{c}</span>
            ))}
          </div>
        )}
      </div>
      {action}
    </div>
  )
}
