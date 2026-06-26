import { useApp } from '../context/AppContext.jsx'
import { dotStyle } from '../utils/helpers.jsx'

export default function Dashboard() {
  const { events, seed } = useApp()
  const rdv = events.slice().sort((a, b) => a.day - b.day).slice(0, 4)
  return (
    <>
      <div style={{ marginBottom: 22 }}>
        <div style={{ font: "500 15px 'Inter',sans-serif", color: 'var(--text)' }}>Hello Marc ✌️</div>
        <div style={{ font: "500 46px 'Inter',sans-serif", letterSpacing: '-2px', color: 'var(--text)', marginTop: 4 }}>Aperçu financier</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 10, font: "500 12px 'Inter',sans-serif", color: 'var(--faint)' }}>
          <span>Accueil</span><span>›</span><span style={{ color: 'var(--text)' }}>Aperçu</span>
        </div>
      </div>
      <div style={{ background: 'var(--surface)', borderRadius: 20, padding: 22, marginBottom: 16 }}>
        <div style={{ font: "600 14px 'Inter',sans-serif", color: 'var(--text)', marginBottom: 14 }}>Prochains rendez-vous</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 12 }}>
          {rdv.map((e, i) => (
            <div key={i} style={{ background: 'var(--panel)', borderRadius: 14, padding: 14, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={dotStyle(seed.eventTypeMap[e.type]?.tone || 'cyan')} />
                <span style={{ font: "600 10px 'Inter',sans-serif", color: 'var(--muted)' }}>{e.day}/06 {e.time}</span>
              </div>
              <div style={{ font: "600 12px 'Inter',sans-serif", color: 'var(--text)', marginTop: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.title}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 16 }}>
        <div style={{ background: 'var(--surface)', borderRadius: 20, padding: 22 }}>
          <div style={{ font: "800 18px 'Inter',sans-serif", fontStyle: 'italic', color: 'var(--text)' }}>TTP·PRO</div>
          <div style={{ font: "400 11px 'Inter',sans-serif", color: 'var(--muted)', marginTop: 14 }}>Compte agence principal</div>
          <div style={{ font: "700 18px 'Inter',sans-serif", color: 'var(--text)', marginTop: 6 }}>•••• 2719</div>
        </div>
        <div style={{ background: 'var(--surface)', borderRadius: 20, padding: 22 }}>
          <div style={{ font: "400 11px 'Inter',sans-serif", color: 'var(--muted)' }}>CA encaissé</div>
          <div style={{ font: "700 26px 'Inter',sans-serif", color: 'var(--text)', marginTop: 6, letterSpacing: '-1px' }}>96 700 €</div>
        </div>
        <div style={{ background: 'var(--surface)', borderRadius: 20, padding: 22 }}>
          <div style={{ font: "400 11px 'Inter',sans-serif", color: 'var(--muted)' }}>Reversé aux créateurs</div>
          <div style={{ font: "700 26px 'Inter',sans-serif", color: 'var(--text)', marginTop: 6, letterSpacing: '-1px' }}>78 540 €</div>
        </div>
      </div>
    </>
  )
}
