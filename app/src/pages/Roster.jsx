import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { initials, avatarStyle, dotStyle, statusLabelOf } from '../utils/helpers.jsx'

const COLS = '2.4fr 1fr 0.9fr 0.8fr 1.1fr 0.9fr 30px'

export default function Roster() {
  const { creators, removeCreator } = useApp()
  const [filter, setFilter] = useState('all')
  const isUgc = (c) => /ugc/i.test(c.niche)
  const rows = creators.filter((c) => (filter === 'all' ? true : filter === 'ugc' ? isUgc(c) : !isUgc(c)))
  const tabs = [['all', 'TOUS'], ['influence', 'INFLUENCE'], ['ugc', 'UGC']]
  const del = (c) => { if (window.confirm('Retirer ' + c.name + ' du roster ?')) removeCreator(c) }
  return (
    <>
      <PageHeader title="Roster" crumbs={['Créateurs', rows.length + ' représentés']}
        action={
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 4, background: 'var(--surface)', borderRadius: 12, padding: 4 }}>
              {tabs.map(([k, l]) => (
                <span key={k} onClick={() => setFilter(k)} style={{ padding: '7px 13px', borderRadius: 9, font: "600 10px 'Inter',sans-serif", cursor: 'pointer', ...(filter === k ? { background: 'var(--text)', color: 'var(--bg)' } : { color: 'var(--muted)' }) }}>{l}</span>
              ))}
            </div>
          </div>
        } />
      <div style={{ background: 'var(--surface)', borderRadius: 20, padding: '8px 8px 6px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: COLS, gap: 12, padding: '12px 16px', font: "600 9px 'Inter',sans-serif", letterSpacing: 1, color: 'var(--faint)' }}>
          <span>CRÉATEUR</span><span>NICHE</span><span style={{ textAlign: 'right' }}>ABONNÉS</span><span style={{ textAlign: 'right' }}>ER</span><span style={{ textAlign: 'right' }}>CA · MOIS</span><span style={{ textAlign: 'right' }}>STATUT</span><span />
        </div>
        {rows.map((c, i) => (
          <div key={c.id || i} style={{ display: 'grid', gridTemplateColumns: COLS, gap: 12, alignItems: 'center', padding: '11px 16px', borderRadius: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, minWidth: 0 }}>
              <div style={avatarStyle(c.tone, 34)}>{initials(c.name)}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ font: "600 13px 'Inter',sans-serif", color: 'var(--text)' }}>{c.name}</div>
                <div style={{ font: "400 10px 'Inter',sans-serif", color: 'var(--faint)' }}>{c.handle}</div>
              </div>
            </div>
            <span style={{ font: "400 12px 'Inter',sans-serif", color: 'var(--muted)' }}>{c.niche}</span>
            <span style={{ font: "600 12px 'Inter',sans-serif", color: 'var(--text)', textAlign: 'right' }}>{c.followers}</span>
            <span style={{ font: "600 12px 'Inter',sans-serif", color: 'var(--text)', textAlign: 'right' }}>{c.er}</span>
            <span style={{ font: "600 12px 'Inter',sans-serif", color: 'var(--text)', textAlign: 'right' }}>{c.ca}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, justifyContent: 'flex-end' }}>
              <span style={dotStyle(c.tone, c.status === 'live')} />
              <span style={{ font: "600 8px 'Inter',sans-serif", letterSpacing: '.6px', color: 'var(--muted)' }}>{statusLabelOf(c.status)}</span>
            </span>
            <span onClick={() => del(c)} title="Retirer du roster" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 8, cursor: 'pointer', color: 'var(--faint)', font: "600 12px 'Inter',sans-serif", justifySelf: 'end' }}>✕</span>
          </div>
        ))}
      </div>
    </>
  )
}
