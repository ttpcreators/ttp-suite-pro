import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import { toneColor } from '../utils/helpers.jsx'

// Étapes d'onboarding créateur (portées depuis modules.checklist de l'app d'origine).
const STEPS = [
  { a: 'Signer contrat de représentation', b: 'Étape 1 · juridique', c: 'FAIT', tone: 'signal', done: true },
  { a: 'Créer fiche créateur + médias', b: 'Étape 2 · roster', c: 'FAIT', tone: 'signal', done: true },
  { a: 'Définir grille tarifaire', b: 'Étape 3 · pricing', c: 'EN COURS', tone: 'indigo', done: false },
  { a: 'Connecter comptes & stats', b: 'Étape 4 · engagement', c: 'À FAIRE', tone: 'cyan', done: false },
]

export default function Checklist() {
  const [steps, setSteps] = useState(STEPS)

  const toggle = (i) =>
    setSteps((arr) => arr.map((s, j) => (j === i ? { ...s, done: !s.done } : s)))

  const remove = (i) => {
    if (!window.confirm('Supprimer cet élément ?')) return
    setSteps((arr) => arr.filter((_, j) => j !== i))
  }

  const edit = (i) => {
    setSteps((arr) => {
      const r = arr[i]
      const na = window.prompt('Titre :', r.a)
      if (na == null) return arr
      const nb = window.prompt('Sous-titre :', r.b)
      if (nb == null) return arr
      return arr.map((s, j) => (j === i ? { ...s, a: na.trim() || s.a, b: nb.trim() || s.b } : s))
    })
  }

  const add = () => {
    const na = window.prompt('Titre de l’étape :')
    if (!na || !na.trim()) return
    setSteps((arr) => [...arr, { a: na.trim(), b: 'Étape ' + (arr.length + 1), c: 'À FAIRE', tone: 'cyan', done: false }])
  }

  const doneCount = steps.filter((s) => s.done).length

  return (
    <>
      <PageHeader
        title="Checklist"
        crumbs={['Agence', 'Onboarding créateur']}
        action={
          <div
            onClick={add}
            style={{ padding: '11px 16px', borderRadius: 13, background: 'var(--signal)', color: 'var(--onsignal)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}
          >
            + ÉTAPE
          </div>
        }
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14, font: "500 12px 'Inter',sans-serif", color: 'var(--faint)' }}>
        <span>{doneCount} / {steps.length} étapes complétées</span>
      </div>

      <div style={{ background: 'var(--surface)', borderRadius: 20, padding: '8px 8px 6px' }}>
        {steps.map((r, i) => {
          const label = r.done ? 'FAIT' : r.c
          return (
            <div
              key={i}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 12, cursor: 'pointer' }}
            >
              <span
                onClick={() => toggle(i)}
                title={r.done ? 'Marquer à faire' : 'Marquer fait'}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  flexShrink: 0,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  font: "700 10px 'Inter',sans-serif",
                  color: '#fff',
                  background: r.done ? toneColor('signal') : 'transparent',
                  border: r.done ? 'none' : '1.5px solid ' + toneColor(r.tone),
                }}
              >
                {r.done ? '✓' : ''}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    font: "600 13px 'Inter',sans-serif",
                    color: 'var(--text)',
                    textDecoration: r.done ? 'line-through' : 'none',
                    opacity: r.done ? 0.55 : 1,
                  }}
                >
                  {r.a}
                </div>
                <div style={{ font: "400 11px 'Inter',sans-serif", color: 'var(--faint)', marginTop: 2 }}>{r.b}</div>
              </div>
              <span style={{ font: "600 8px 'Inter',sans-serif", letterSpacing: '.6px', color: 'var(--muted)', padding: '5px 10px', borderRadius: 20, background: 'var(--rowhover)', whiteSpace: 'nowrap' }}>
                {label}
              </span>
              <span
                onClick={() => edit(i)}
                title="Modifier"
                style={{ flexShrink: 0, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, cursor: 'pointer', color: 'var(--faint)', font: "600 11px 'Inter',sans-serif" }}
              >
                ✎
              </span>
              <span
                onClick={() => remove(i)}
                title="Supprimer"
                style={{ flexShrink: 0, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, cursor: 'pointer', color: 'var(--faint)', font: "600 12px 'Inter',sans-serif" }}
              >
                ✕
              </span>
            </div>
          )
        })}
      </div>
    </>
  )
}
