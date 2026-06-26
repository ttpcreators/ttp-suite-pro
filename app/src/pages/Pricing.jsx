import { useApp } from '../context/AppContext.jsx'
import PageHeader from '../components/PageHeader.jsx'

export default function Pricing() {
  const { seed } = useApp()
  return (
    <>
      <PageHeader title="Pricing" crumbs={['Créateurs', 'Grille tarifaire']} />
      <div style={{ background: 'var(--surface)', borderRadius: 20, padding: 8 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12, padding: '12px 16px', font: "600 9px 'Inter',sans-serif", letterSpacing: 1, color: 'var(--faint)' }}>
          <span>FORMAT</span><span style={{ textAlign: 'right' }}>TARIF BASE</span><span style={{ textAlign: 'right' }}>+ EXCLUSIVITÉ</span>
        </div>
        {seed.pricingRaw.map((p, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12, alignItems: 'center', padding: '14px 16px', borderTop: '1px solid var(--hair)' }}>
            <span style={{ font: "500 14px 'Inter',sans-serif", color: 'var(--text)' }}>{p.format}</span>
            <span style={{ font: "600 14px 'Inter',sans-serif", color: 'var(--text)', textAlign: 'right' }}>{p.base}</span>
            <span style={{ font: "600 13px 'Inter',sans-serif", color: 'var(--muted)', textAlign: 'right' }}>{p.excl}</span>
          </div>
        ))}
      </div>
    </>
  )
}
