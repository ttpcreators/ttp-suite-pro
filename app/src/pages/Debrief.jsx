import { useApp } from '../context/AppContext.jsx'
import { dotStyle } from '../utils/helpers.jsx'

const chipStyle = {
  font: "600 8px 'Inter',sans-serif", letterSpacing: '.6px', color: 'var(--muted)',
  padding: '5px 10px', borderRadius: 20, background: 'var(--rowhover)', whiteSpace: 'nowrap',
}

const iconBtn = {
  flexShrink: 0, width: 24, height: 24, display: 'flex', alignItems: 'center',
  justifyContent: 'center', borderRadius: 7, cursor: 'pointer', color: 'var(--faint)',
}

export default function Debrief() {
  const { modules, setModules } = useApp()
  const mod = modules.debrief || { title: 'Debrief', section: 'Outils', sub: 'Bilans de campagne', action: '+ DEBRIEF', rows: [] }
  const rows = mod.rows || []

  const updateRows = (fn) =>
    setModules((m) => ({ ...m, debrief: { ...m.debrief, rows: fn(m.debrief.rows) } }))

  const del = (r) => {
    if (!window.confirm('Supprimer cet élément ?')) return
    updateRows((arr) => arr.filter((x) => x !== r))
  }

  const edit = (r) => {
    const na = window.prompt('Titre :', r.a)
    if (na == null) return
    const nb = window.prompt('Sous-titre :', r.b)
    if (nb == null) return
    updateRows((arr) => arr.map((x) => (x === r ? { ...x, a: na.trim() || x.a, b: nb.trim() || x.b } : x)))
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
        <div>
          <div style={{ font: "500 46px 'Inter',sans-serif", letterSpacing: '-2px', color: 'var(--text)' }}>{mod.title}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 10, font: "500 12px 'Inter',sans-serif", color: 'var(--faint)' }}>
            <span>{mod.section}</span>
            <span>›</span>
            <span style={{ color: 'var(--text)' }}>{mod.sub}</span>
          </div>
        </div>
        <div style={{ padding: '11px 16px', borderRadius: 13, background: 'var(--signal)', color: 'var(--onsignal)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}>{mod.action}</div>
      </div>
      <div style={{ background: 'var(--surface)', borderRadius: 20, padding: '8px 8px 6px' }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 12, cursor: 'pointer' }}>
            <span style={dotStyle(r.tone, false)} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ font: "600 13px 'Inter',sans-serif", color: 'var(--text)' }}>{r.a}</div>
              <div style={{ font: "400 11px 'Inter',sans-serif", color: 'var(--faint)', marginTop: 2 }}>{r.b}</div>
            </div>
            <span style={chipStyle}>{r.c}</span>
            <span onClick={() => edit(r)} title="Modifier" style={{ ...iconBtn, font: "600 11px 'Inter',sans-serif" }}>✎</span>
            <span onClick={() => del(r)} title="Supprimer" style={{ ...iconBtn, font: "600 12px 'Inter',sans-serif" }}>✕</span>
          </div>
        ))}
      </div>
    </>
  )
}
