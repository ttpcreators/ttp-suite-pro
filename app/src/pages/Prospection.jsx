import { useApp } from '../context/AppContext.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { dotStyle } from '../utils/helpers.jsx'

export default function Prospection() {
  const { prospects, setProspects, removeFrom, updateIn, addTo, seed } = useApp()
  const stages = seed.stages

  const removeProspect = removeFrom(setProspects)
  const updateProspect = updateIn(setProspects)
  const addProspect = addTo(setProspects)

  const del = (p) => {
    if (!window.confirm('Supprimer ' + p.brand + ' du pipeline ?')) return
    removeProspect(p)
  }
  const edit = (p) => {
    const nb = window.prompt('Marque :', p.brand)
    if (nb == null) return
    const nv = window.prompt('Montant estimé :', p.value)
    if (nv == null) return
    updateProspect(p, { brand: nb.trim() || p.brand, value: nv.trim() || p.value })
  }
  const addBrand = () => {
    const nb = window.prompt('Marque :', '')
    if (nb == null || !nb.trim()) return
    const nv = window.prompt('Montant estimé :', '')
    if (nv == null) return
    addProspect({ brand: nb.trim(), contact: 'RP — à trouver', value: nv.trim() || '—', stage: stages[0], tone: 'cyan' })
  }

  const cols = stages.map((stg) => ({
    title: stg,
    cards: prospects.filter((p) => p.stage === stg),
  }))

  return (
    <>
      <PageHeader title="Prospection" crumbs={['Outils', 'Pipeline marques']}
        action={
          <div onClick={addBrand} style={{ padding: '11px 16px', borderRadius: 13, background: 'var(--signal)', color: 'var(--onsignal)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}>+ MARQUE</div>
        } />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, alignItems: 'start' }}>
        {cols.map((col) => (
          <div key={col.title}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 6px 12px' }}>
              <span style={{ font: "600 10px 'Inter',sans-serif", letterSpacing: '.8px', color: 'var(--text)' }}>{col.title}</span>
              <span style={{ font: "600 10px 'Inter',sans-serif", color: 'var(--faint)' }}>{col.cards.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.cards.map((c, i) => (
                <div key={c.brand + i} style={{ background: 'var(--surface)', borderRadius: 14, padding: 14, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                      <span style={dotStyle(c.tone)} />
                      <span style={{ font: "600 12px 'Inter',sans-serif", color: 'var(--text)' }}>{c.brand}</span>
                    </div>
                    <span onClick={() => edit(c)} title="Modifier" style={{ flexShrink: 0, width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, cursor: 'pointer', color: 'var(--faint)', font: "600 10px 'Inter',sans-serif" }}>✎</span>
                    <span onClick={() => del(c)} title="Supprimer du pipeline" style={{ flexShrink: 0, width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, cursor: 'pointer', color: 'var(--faint)', font: "600 11px 'Inter',sans-serif" }}>✕</span>
                  </div>
                  <div style={{ font: "400 10px 'Inter',sans-serif", color: 'var(--faint)', marginTop: 6 }}>{c.contact}</div>
                  <div style={{ font: "600 13px 'Inter',sans-serif", color: 'var(--text)', marginTop: 8 }}>{c.value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
