import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { toneColor } from '../utils/helpers.jsx'

const KPIS = [
  { label: 'CA MENSUEL', value: '88%', sub: '248 600 / 280 000 €', subColor: 'var(--signaltext)', bar: 88, barColor: 'var(--signal)' },
  { label: 'DEALS SIGNÉS', value: '14', sub: '/ 16 visés', subColor: 'var(--muted)', bar: 88, barColor: 'var(--indigo)' },
  { label: 'MARGE AGENCE', value: '22%', sub: 'cible 25%', subColor: 'var(--muted)', bar: 88, barColor: 'var(--cyan)' },
]

export default function Objectifs() {
  const { seed } = useApp()

  const [objForm, setObjForm] = useState(false)
  const [no, setNo] = useState({ name: '', target: '', pct: '' })
  const [customObjs, setCustomObjs] = useState([])

  const addObjective = () => {
    if (!no.name) return
    setCustomObjs((cur) => [...cur, { name: String(no.name).toUpperCase(), target: no.target || '—', pct: Number(no.pct) || 60 }])
    setObjForm(false)
    setNo({ name: '', target: '', pct: '' })
  }

  const objCreators = [
    ...seed.objRaw.map((o) => ({ name: o.name, ca: o.ca, target: o.target, pctLabel: o.pct + '%', pct: o.pct, color: toneColor(o.tone) })),
    ...customObjs.map((o) => ({ name: o.name, ca: '—', target: o.target, pctLabel: o.pct + '%', pct: o.pct, color: toneColor('indigo') })),
  ]

  const inputStyle = { width: '100%', padding: '11px 14px', borderRadius: 11, border: '1px solid var(--hair)', background: 'var(--panel)', color: 'var(--text)', font: "500 12px 'Inter',sans-serif", outline: 'none' }
  const labelStyle = { font: "600 9px 'Inter',sans-serif", letterSpacing: '.8px', color: 'var(--faint)', marginBottom: 6 }

  return (
    <>
      <PageHeader title="Objectifs" crumbs={['Aperçu', 'Juin 2026']}
        action={
          <div onClick={() => setObjForm(true)} style={{ padding: '11px 16px', borderRadius: 13, background: 'var(--signal)', color: 'var(--onsignal)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}>+ OBJECTIF</div>
        } />

      {objForm && (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--hair)', borderRadius: 20, padding: 20, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ font: "600 14px 'Inter',sans-serif", color: 'var(--text)' }}>Nouvel objectif</div>
            <div onClick={() => setObjForm(false)} style={{ font: "600 14px 'Inter',sans-serif", color: 'var(--faint)', cursor: 'pointer' }}>✕</div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: 2, minWidth: 200 }}>
              <div style={labelStyle}>INTITULÉ</div>
              <input value={no.name} onChange={(e) => setNo((s) => ({ ...s, name: e.target.value }))} placeholder="Ex : CA Léna Marchand" style={inputStyle} />
            </div>
            <div style={{ width: 140 }}>
              <div style={labelStyle}>CIBLE</div>
              <input value={no.target} onChange={(e) => setNo((s) => ({ ...s, target: e.target.value }))} placeholder="50 000 €" style={inputStyle} />
            </div>
            <div style={{ width: 120 }}>
              <div style={labelStyle}>PROGRESSION %</div>
              <input value={no.pct} onChange={(e) => setNo((s) => ({ ...s, pct: e.target.value }))} type="number" placeholder="60" style={inputStyle} />
            </div>
            <div onClick={addObjective} style={{ padding: '11px 22px', borderRadius: 11, background: 'var(--signal)', color: 'var(--onsignal)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}>AJOUTER</div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 16 }}>
        {KPIS.map((k, i) => (
          <div key={i} style={{ background: 'var(--surface)', borderRadius: 20, padding: 22 }}>
            <div style={{ font: "600 10px 'Inter',sans-serif", letterSpacing: 1, color: 'var(--faint)' }}>{k.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 12 }}>
              <div style={{ font: "700 34px 'Inter',sans-serif", color: 'var(--text)', letterSpacing: '-1.5px' }}>{k.value}</div>
              <div style={{ font: "500 11px 'Inter',sans-serif", color: k.subColor }}>{k.sub}</div>
            </div>
            <div style={{ height: 8, background: 'var(--rowhover)', borderRadius: 5, marginTop: 14, overflow: 'hidden' }}>
              <div style={{ width: k.bar + '%', height: '100%', background: k.barColor, borderRadius: 5 }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--surface)', borderRadius: 20, padding: 22 }}>
        <div style={{ font: "600 14px 'Inter',sans-serif", color: 'var(--text)', marginBottom: 18 }}>Objectifs par créateur</div>
        {objCreators.map((o, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '9px 0' }}>
            <span style={{ font: "600 12px 'Inter',sans-serif", color: 'var(--text)', letterSpacing: '.3px', width: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.name}</span>
            <span style={{ flex: 1, height: 8, background: 'var(--rowhover)', borderRadius: 5, overflow: 'hidden' }}>
              <span style={{ width: Math.min(o.pct, 100) + '%', height: '100%', borderRadius: 5, background: o.color, display: 'block' }} />
            </span>
            <span style={{ font: "600 12px 'Inter',sans-serif", color: 'var(--text)', width: 48, textAlign: 'right' }}>{o.pctLabel}</span>
            <span style={{ font: "400 11px 'Inter',sans-serif", color: 'var(--faint)', width: 120, textAlign: 'right' }}>{o.ca} / {o.target}</span>
          </div>
        ))}
      </div>
    </>
  )
}
