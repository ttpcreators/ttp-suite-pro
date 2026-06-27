import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { dotStyle } from '../utils/helpers.jsx'

// Statut -> tone (cf. app.js renderVals : /valid/=signal, /cours/=cyan, sinon indigo)
const ideaTone = (s) => (/valid/i.test(s) ? 'signal' : /cours/i.test(s) ? 'cyan' : 'indigo')

const STATUS_CHIPS = ['À explorer', 'En cours', 'Validée']

export default function Idees() {
  const { ideas, setIdeas, creators } = useApp()

  // ----- État local d'UI -----
  const [showForm, setShowForm] = useState(false)
  const [niText, setNiText] = useState('')
  const [niCreator, setNiCreator] = useState(null)
  const [niStatus, setNiStatus] = useState('À explorer')

  // ----- Handlers idée -----
  const del = (e, o) => {
    if (e && e.stopPropagation) e.stopPropagation()
    if (!window.confirm('Supprimer cette idée ?')) return
    setIdeas((arr) => arr.filter((x) => x !== o))
  }

  const edit = (e, o) => {
    if (e && e.stopPropagation) e.stopPropagation()
    const nv = window.prompt("Modifier l'idée :", o.text)
    if (nv == null) return
    const v = nv.trim()
    if (!v) return
    setIdeas((arr) => arr.map((x) => (x === o ? { ...x, text: v } : x)))
  }

  // ----- Ajout depuis le formulaire -----
  const addIdea = () => {
    const t = niText.trim()
    if (!t) return
    setIdeas((arr) => [
      { text: t, creator: niCreator || null, status: niStatus || 'À explorer', source: 'agency' },
      ...arr,
    ])
    setShowForm(false)
    setNiText('')
  }

  const creatorChips = [{ name: 'Toutes', val: null }].concat(
    creators.map((c) => ({ name: c.name.split(' ')[0], val: c.name })),
  )

  return (
    <>
      {/* ============ IDÉES ============ */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
        <div>
          <div style={{ font: "500 46px 'Inter',sans-serif", letterSpacing: '-2px', color: 'var(--text)' }}>Idées</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 10, font: "500 12px 'Inter',sans-serif", color: 'var(--faint)' }}>
            <span>Outils</span><span>›</span><span style={{ color: 'var(--text)' }}>Pipeline créatif · propositions créateurs</span>
          </div>
        </div>
        <div onClick={() => setShowForm((s) => !s)} style={{ padding: '11px 16px', borderRadius: 13, background: 'var(--signal)', color: 'var(--onsignal)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}>+ IDÉE</div>
      </div>

      {showForm && (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--hair)', borderRadius: 20, padding: 20, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ font: "600 14px 'Inter',sans-serif", color: 'var(--text)' }}>Nouvelle idée</div>
            <div onClick={() => setShowForm(false)} style={{ font: "600 14px 'Inter',sans-serif", color: 'var(--faint)', cursor: 'pointer' }}>✕</div>
          </div>
          <input value={niText} onChange={(e) => setNiText(e.target.value)} placeholder="Décris l'idée de contenu…" style={{ width: '100%', padding: '12px 14px', borderRadius: 11, border: '1px solid var(--hair)', background: 'var(--panel)', color: 'var(--text)', font: "500 13px 'Inter',sans-serif", outline: 'none', boxSizing: 'border-box' }} />
          <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '.8px', color: 'var(--faint)', margin: '16px 0 8px' }}>POUR</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {creatorChips.map((c) => {
              const active = niCreator === c.val
              return (
                <div key={c.val || 'toutes'} onClick={() => setNiCreator(c.val)} style={{ padding: '6px 12px', borderRadius: 18, font: "600 9px 'Inter',sans-serif", cursor: 'pointer', ...(active ? { background: 'var(--text)', color: 'var(--bg)' } : { background: 'var(--rowhover)', color: 'var(--muted)' }) }}>{c.name}</div>
              )
            })}
          </div>
          <div style={{ display: 'flex', gap: 18, alignItems: 'flex-end', flexWrap: 'wrap', marginTop: 16 }}>
            <div>
              <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '.8px', color: 'var(--faint)', marginBottom: 8 }}>STATUT</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {STATUS_CHIPS.map((s) => {
                  const active = niStatus === s
                  return (
                    <div key={s} onClick={() => setNiStatus(s)} style={{ padding: '7px 12px', borderRadius: 18, font: "600 9px 'Inter',sans-serif", cursor: 'pointer', ...(active ? { background: 'var(--signal)', color: 'var(--onsignal)' } : { border: '1px solid var(--hair)', color: 'var(--muted)' }) }}>{s}</div>
                  )
                })}
              </div>
            </div>
            <div onClick={addIdea} style={{ marginLeft: 'auto', padding: '11px 22px', borderRadius: 11, background: 'var(--signal)', color: 'var(--onsignal)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}>AJOUTER</div>
          </div>
        </div>
      )}

      <div style={{ background: 'var(--surface)', borderRadius: 20, padding: '8px 20px' }}>
        {ideas.map((o, idx) => {
          const tone = ideaTone(o.status)
          return (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid var(--hair)' }}>
              <span style={dotStyle(tone, false)} />
              <span style={{ flex: 1, minWidth: 0, font: "500 13px 'Inter',sans-serif", color: 'var(--text)' }}>{o.text}</span>
              {o.source === 'creator' && (
                <span style={{ font: "600 8px 'Inter',sans-serif", letterSpacing: '.5px', color: 'var(--signaltext)', background: 'var(--signalsoft)', padding: '3px 8px', borderRadius: 6, whiteSpace: 'nowrap' }}>DU CRÉATEUR</span>
              )}
              <span style={{ font: "600 8px 'Inter',sans-serif", letterSpacing: '.5px', color: 'var(--muted)', padding: '3px 9px', borderRadius: 6, background: 'var(--rowhover)', whiteSpace: 'nowrap' }}>{o.creator || 'Toutes'}</span>
              <span style={{ font: "600 8px 'Inter',sans-serif", letterSpacing: '.5px', padding: '4px 9px', borderRadius: 20, whiteSpace: 'nowrap', color: `var(--${tone})`, background: `color-mix(in srgb, var(--${tone}) 12%, transparent)` }}>{o.status}</span>
              <span onClick={(e) => edit(e, o)} title="Modifier l'idée" style={{ flexShrink: 0, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, cursor: 'pointer', color: 'var(--faint)', font: "600 11px 'Inter',sans-serif" }}>✎</span>
              <span onClick={(e) => del(e, o)} title="Supprimer l'idée" style={{ flexShrink: 0, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, cursor: 'pointer', color: 'var(--faint)', font: "600 12px 'Inter',sans-serif" }}>✕</span>
            </div>
          )
        })}
      </div>
    </>
  )
}
