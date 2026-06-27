import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'

// Priorité -> tone (cf. app.js renderVals : haute=indigo, basse=signal, sinon cyan)
const priorityTone = (p) => (p === 'haute' ? 'indigo' : p === 'basse' ? 'signal' : 'cyan')

const FILTER_TABS = [
  ['todo', 'À faire'],
  ['done', 'Terminées'],
  ['all', 'Toutes'],
]

const PRIORITY_CHIPS = [
  ['haute', 'Haute', 'indigo'],
  ['moyenne', 'Moyenne', 'cyan'],
  ['basse', 'Basse', 'signal'],
]

export default function Todo() {
  const { todos, setTodos, doneSet, setDoneSet, creators } = useApp()

  // ----- État local d'UI -----
  const [filter, setFilter] = useState('todo')
  const [showForm, setShowForm] = useState(false)
  const [ntText, setNtText] = useState('')
  const [ntDesc, setNtDesc] = useState('')
  const [ntCreator, setNtCreator] = useState(null)
  const [ntPriority, setNtPriority] = useState('moyenne')
  const [ntDue, setNtDue] = useState('')

  // ----- Handlers tâche -----
  const toggle = (i) => setDoneSet((d) => ({ ...d, [i]: !d[i] }))

  const del = (e, i) => {
    if (e && e.stopPropagation) e.stopPropagation()
    if (!window.confirm('Supprimer cette tâche ?')) return
    setTodos((arr) => arr.filter((_, k) => k !== i))
    setDoneSet((od) => {
      const nd = {}
      Object.keys(od).forEach((kk) => {
        const k = +kk
        if (k < i) nd[k] = od[k]
        else if (k > i) nd[k - 1] = od[k]
      })
      return nd
    })
  }

  const edit = (e, i, t) => {
    if (e && e.stopPropagation) e.stopPropagation()
    const nv = window.prompt('Modifier la tâche :', t.text)
    if (nv == null) return
    const v = nv.trim()
    if (!v) return
    setTodos((arr) => arr.map((x, k) => (k === i ? { ...x, text: v } : x)))
  }

  // ----- Ajout depuis le formulaire -----
  const addTodo = () => {
    const txt = ntText.trim()
    if (!txt) return
    setTodos((arr) => [
      ...arr,
      {
        text: txt,
        desc: ntDesc || '',
        tag: ntCreator ? 'CRÉATEUR' : 'AGENCE',
        due: ntDue || '—',
        creator: ntCreator,
        priority: ntPriority || 'moyenne',
        source: 'agency',
      },
    ])
    setShowForm(false)
    setNtText('')
    setNtDesc('')
    setNtDue('')
  }

  // ----- Liste filtrée (conserve l'index original pour doneSet / del / edit) -----
  const rows = todos
    .map((t, i) => ({ t, i, done: !!doneSet[i] }))
    .filter((x) => (filter === 'all' ? true : filter === 'done' ? x.done : !x.done))

  const creatorChips = [{ name: 'Agence', val: null }].concat(
    creators.map((c) => ({ name: c.name.split(' ')[0], val: c.name })),
  )

  return (
    <>
      {/* ============ TODO ============ */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
        <div>
          <div style={{ font: "500 46px 'Inter',sans-serif", letterSpacing: '-2px', color: 'var(--text)' }}>À faire</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 10, font: "500 12px 'Inter',sans-serif", color: 'var(--faint)' }}>
            <span>Créateurs</span><span>›</span><span style={{ color: 'var(--text)' }}>Tâches agence &amp; créateurs</span>
          </div>
        </div>
        <div onClick={() => setShowForm(true)} style={{ padding: '11px 16px', borderRadius: 13, background: 'var(--signal)', color: 'var(--onsignal)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}>+ TÂCHE</div>
      </div>

      {showForm && (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--hair)', borderRadius: 20, padding: 20, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ font: "600 14px 'Inter',sans-serif", color: 'var(--text)' }}>Nouvelle tâche</div>
            <div onClick={() => setShowForm(false)} style={{ font: "600 14px 'Inter',sans-serif", color: 'var(--faint)', cursor: 'pointer' }}>✕</div>
          </div>
          <input value={ntText} onChange={(e) => setNtText(e.target.value)} placeholder="Intitulé de la tâche…" style={{ width: '100%', padding: '12px 14px', borderRadius: 11, border: '1px solid var(--hair)', background: 'var(--panel)', color: 'var(--text)', font: "500 13px 'Inter',sans-serif", outline: 'none', boxSizing: 'border-box' }} />
          <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '.8px', color: 'var(--faint)', margin: '14px 0 8px' }}>DESCRIPTION (optionnel)</div>
          <textarea value={ntDesc} onChange={(e) => setNtDesc(e.target.value)} placeholder="Ajouter des précisions, un contexte…" style={{ width: '100%', minHeight: 54, resize: 'vertical', padding: '11px 13px', borderRadius: 11, border: '1px solid var(--hair)', background: 'var(--panel)', color: 'var(--text)', font: "400 12px 'Inter',sans-serif", outline: 'none', boxSizing: 'border-box' }} />
          <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '.8px', color: 'var(--faint)', margin: '16px 0 8px' }}>POUR</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {creatorChips.map((c) => {
              const active = ntCreator === c.val
              return (
                <div key={c.val || 'agence'} onClick={() => setNtCreator(c.val)} style={{ padding: '6px 12px', borderRadius: 18, font: "600 9px 'Inter',sans-serif", cursor: 'pointer', ...(active ? { background: 'var(--text)', color: 'var(--bg)' } : { background: 'var(--rowhover)', color: 'var(--muted)' }) }}>{c.name}</div>
              )
            })}
          </div>
          <div style={{ display: 'flex', gap: 18, alignItems: 'flex-end', flexWrap: 'wrap', marginTop: 16 }}>
            <div>
              <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '.8px', color: 'var(--faint)', marginBottom: 8 }}>PRIORITÉ</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {PRIORITY_CHIPS.map(([key, label, tone]) => {
                  const active = ntPriority === key
                  return (
                    <div key={key} onClick={() => setNtPriority(key)} style={{ padding: '7px 12px', borderRadius: 18, font: "600 9px 'Inter',sans-serif", cursor: 'pointer', ...(active ? { background: `var(--${tone})`, color: '#fff' } : { border: '1px solid var(--hair)', color: 'var(--muted)' }) }}>{label}</div>
                  )
                })}
              </div>
            </div>
            <div style={{ width: 130 }}>
              <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '.8px', color: 'var(--faint)', marginBottom: 8 }}>ÉCHÉANCE</div>
              <input value={ntDue} onChange={(e) => setNtDue(e.target.value)} placeholder="02/07" style={{ width: '100%', padding: '10px 13px', borderRadius: 11, border: '1px solid var(--hair)', background: 'var(--panel)', color: 'var(--text)', font: "500 12px 'Inter',sans-serif", outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div onClick={addTodo} style={{ marginLeft: 'auto', padding: '11px 22px', borderRadius: 11, background: 'var(--signal)', color: 'var(--onsignal)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}>AJOUTER</div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 4, background: 'var(--surface)', borderRadius: 12, padding: 4, marginBottom: 12, width: 'fit-content' }}>
        {FILTER_TABS.map(([key, label]) => (
          <span key={key} onClick={() => setFilter(key)} style={{ padding: '7px 13px', borderRadius: 9, font: "600 10px 'Inter',sans-serif", cursor: 'pointer', whiteSpace: 'nowrap', ...(filter === key ? { background: 'var(--text)', color: 'var(--bg)' } : { color: 'var(--muted)' }) }}>{label}</span>
        ))}
      </div>

      <div style={{ background: 'var(--surface)', borderRadius: 20, padding: '18px 22px' }}>
        {rows.map(({ t, i, done }) => {
          const tone = priorityTone(t.priority)
          return (
            <div key={i} onClick={() => toggle(i)} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 0', borderBottom: '1px solid var(--hair)', cursor: 'pointer' }}>
              <span style={{ width: 16, height: 16, borderRadius: 5, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 9px 'Inter',sans-serif", ...(done ? { background: 'var(--signal)', color: 'var(--onsignal)' } : { border: '1.5px solid var(--faint)', color: 'transparent' }) }}>{done ? '✓' : ''}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ flex: 1, font: "400 13px 'Inter',sans-serif", ...(done ? { color: 'var(--faint)', textDecoration: 'line-through' } : { color: 'var(--text)' }) }}>{t.text}</span>
                {t.desc && (
                  <div style={{ font: "400 11px 'Inter',sans-serif", color: 'var(--faint)', marginTop: 2, lineHeight: 1.4 }}>{t.desc}</div>
                )}
              </div>
              {t.source === 'creator' && (
                <span style={{ font: "600 8px 'Inter',sans-serif", letterSpacing: '.5px', color: 'var(--signaltext)', background: 'var(--signalsoft)', padding: '3px 8px', borderRadius: 6, whiteSpace: 'nowrap' }}>DU CRÉATEUR</span>
              )}
              <span style={{ font: "600 8px 'Inter',sans-serif", letterSpacing: '.5px', color: 'var(--muted)', padding: '3px 8px', borderRadius: 6, background: 'var(--rowhover)', whiteSpace: 'nowrap' }}>{t.creator || 'Agence'}</span>
              {t.priority && (
                <span style={{ font: "600 8px 'Inter',sans-serif", letterSpacing: '.5px', padding: '3px 8px', borderRadius: 6, color: `var(--${tone})`, background: `color-mix(in srgb, var(--${tone}) 12%, transparent)` }}>{t.priority.toUpperCase()}</span>
              )}
              <span style={{ font: "500 10px 'Inter',sans-serif", color: 'var(--faint)', width: 50, textAlign: 'right', flexShrink: 0 }}>{t.due}</span>
              <span onClick={(e) => edit(e, i, t)} title="Modifier la tâche" style={{ flexShrink: 0, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, cursor: 'pointer', color: 'var(--faint)', font: "600 11px 'Inter',sans-serif" }}>✎</span>
              <span onClick={(e) => del(e, i)} title="Supprimer la tâche" style={{ flexShrink: 0, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, cursor: 'pointer', color: 'var(--faint)', font: "600 12px 'Inter',sans-serif" }}>✕</span>
            </div>
          )
        })}
      </div>
    </>
  )
}
