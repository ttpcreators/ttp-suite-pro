import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { briefStatus, chipStyle, dotStyle } from '../utils/helpers.jsx'

const firstName = (n) => (n || '').split(' ')[0]

export default function Briefs() {
  const { briefs, setBriefs, creators, removeFrom, updateIn, addTo } = useApp()
  const removeBrief = removeFrom(setBriefs)
  const patchBrief = updateIn(setBriefs)
  const addBrief = addTo(setBriefs)

  // État local du formulaire « Nouveau brief »
  const [showForm, setShowForm] = useState(false)
  const [nbBrand, setNbBrand] = useState('')
  const [nbDue, setNbDue] = useState('')
  const [nbDeliv, setNbDeliv] = useState('')
  const [nbCreator, setNbCreator] = useState(0)

  const del = (b) => { if (window.confirm('Supprimer le brief ' + b.brand + ' ?')) removeBrief(b) }
  const edit = (b) => {
    const nv = window.prompt('Modifier les consignes du brief ' + b.brand + ' :', b.consignes || '')
    if (nv == null) return
    patchBrief(b, { consignes: nv })
  }

  const createBrief = () => {
    const br = nbBrand.trim()
    if (!br) return
    const c = creators[nbCreator] || creators[0]
    const nm = c.name
    addBrief({
      brand: br, creator: nm, deliverables: nbDeliv || '—', due: nbDue || '—',
      status: 'attente', tone: c.tone, who: nm,
      consignes: 'Consignes à préciser avec la marque.', budget: '—', objectif: '—',
    }, true)
    setShowForm(false); setNbBrand(''); setNbDeliv(''); setNbDue(''); setNbCreator(0)
  }

  const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: 11, border: '1px solid var(--hair)',
    background: 'var(--panel)', color: 'var(--text)', font: "500 12px 'Inter',sans-serif", outline: 'none', boxSizing: 'border-box',
  }
  const fieldLabel = { font: "600 9px 'Inter',sans-serif", letterSpacing: '.8px', color: 'var(--faint)', marginBottom: 6 }

  return (
    <>
      <PageHeader title="Briefs" crumbs={['Créateurs', 'En cours']}
        action={
          <div onClick={() => setShowForm((v) => !v)} style={{ padding: '11px 16px', borderRadius: 13, background: 'var(--signal)', color: 'var(--onsignal)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}>+ NOUVEAU BRIEF</div>
        } />

      {showForm && (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--hair)', borderRadius: 20, padding: 20, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ font: "600 14px 'Inter',sans-serif", color: 'var(--text)' }}>Nouveau brief</div>
            <div onClick={() => setShowForm(false)} style={{ font: "600 14px 'Inter',sans-serif", color: 'var(--faint)', cursor: 'pointer' }}>✕</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div style={fieldLabel}>MARQUE</div>
              <input value={nbBrand} onChange={(e) => setNbBrand(e.target.value)} placeholder="Ex : Sephora — Collection été" style={inputStyle} />
            </div>
            <div>
              <div style={fieldLabel}>ÉCHÉANCE</div>
              <input value={nbDue} onChange={(e) => setNbDue(e.target.value)} placeholder="08/07" style={inputStyle} />
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <div style={fieldLabel}>LIVRABLES</div>
            <input value={nbDeliv} onChange={(e) => setNbDeliv(e.target.value)} placeholder="3 posts · 1 reel" style={inputStyle} />
          </div>
          <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '.8px', color: 'var(--faint)', margin: '16px 0 8px' }}>CRÉATEUR</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            {creators.map((c, i) => (
              <div key={c.id || i} onClick={() => setNbCreator(i)} style={{ padding: '6px 12px', borderRadius: 18, font: "600 9px 'Inter',sans-serif", cursor: 'pointer', ...(nbCreator === i ? { background: 'var(--text)', color: 'var(--bg)' } : { background: 'var(--rowhover)', color: 'var(--muted)' }) }}>{firstName(c.name)}</div>
            ))}
            <div onClick={createBrief} style={{ marginLeft: 'auto', padding: '11px 22px', borderRadius: 11, background: 'var(--signal)', color: 'var(--onsignal)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}>CRÉER LE BRIEF</div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
        {briefs.map((b, i) => {
          const st = briefStatus(b.status)
          const consignes = b.consignes || 'Consignes à préciser avec la marque.'
          return (
            <div key={b.brand || i} style={{ background: 'var(--surface)', borderRadius: 20, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ font: "600 15px 'Inter',sans-serif", color: 'var(--text)' }}>{b.brand}</div>
                  <div style={{ font: "400 11px 'Inter',sans-serif", color: 'var(--faint)', marginTop: 3 }}>{b.creator} · échéance {b.due}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={chipStyle}><span style={dotStyle(b.tone)} />{st.label}</span>
                  <span onClick={() => edit(b)} title="Modifier les consignes" style={{ flexShrink: 0, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, cursor: 'pointer', color: 'var(--faint)', font: "600 11px 'Inter',sans-serif" }}>✎</span>
                  <span onClick={() => del(b)} title="Supprimer le brief" style={{ flexShrink: 0, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, cursor: 'pointer', color: 'var(--faint)', font: "600 12px 'Inter',sans-serif" }}>✕</span>
                </div>
              </div>
              <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: 1, color: 'var(--faint)', margin: '14px 0 6px' }}>CONSIGNES</div>
              <div style={{ font: "400 12px 'Inter',sans-serif", color: 'var(--muted)', lineHeight: 1.6 }}>{consignes}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
                <div style={{ background: 'var(--panel)', borderRadius: 12, padding: '11px 13px' }}>
                  <div style={{ font: "600 8px 'Inter',sans-serif", letterSpacing: '.6px', color: 'var(--faint)' }}>LIVRABLES</div>
                  <div style={{ font: "600 11px 'Inter',sans-serif", color: 'var(--text)', marginTop: 4 }}>{b.deliverables}</div>
                </div>
                <div style={{ background: 'var(--panel)', borderRadius: 12, padding: '11px 13px' }}>
                  <div style={{ font: "600 8px 'Inter',sans-serif", letterSpacing: '.6px', color: 'var(--faint)' }}>BUDGET</div>
                  <div style={{ font: "600 11px 'Inter',sans-serif", color: 'var(--text)', marginTop: 4 }}>{b.budget || '—'}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
