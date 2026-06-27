import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { toneColor } from '../utils/helpers.jsx'

// Méta des canaux : libellé + tone (cf. app.js renderVals _chanMeta)
const CHAN_META = {
  gmail: { label: 'Gmail', tone: 'indigo' },
  linkedin: { label: 'LinkedIn', tone: 'cyan' },
  instagram: { label: 'Instagram', tone: 'signal' },
  tiktok: { label: 'TikTok', tone: 'indigo' },
}

const CHANNEL_TABS = [
  ['tous', 'Tous'],
  ['gmail', 'Gmail'],
  ['linkedin', 'LinkedIn'],
  ['instagram', 'Instagram'],
  ['tiktok', 'TikTok'],
]

// Module « templates » (liste de documents) — cf. app.js modules.templates
const MODULE = {
  title: 'Templates', section: 'Outils', sub: 'Modèles & documents', action: '+ TEMPLATE',
  rows: [
    { a: 'Contrat de représentation', b: 'Document · DOCX', c: 'MODÈLE', tone: 'indigo' },
    { a: 'Brief créatif marque', b: 'Document · Notion', c: 'MODÈLE', tone: 'cyan' },
    { a: 'Devis & grille tarifaire', b: 'Tableur · XLSX', c: 'MODÈLE', tone: 'signal' },
    { a: 'Email de prospection', b: 'Email · texte', c: 'MODÈLE', tone: 'indigo' },
  ],
}

export default function Templates() {
  const { seed } = useApp()

  const dotStyleOf = (tone) => ({ width: 7, height: 7, borderRadius: '50%', flexShrink: 0, background: toneColor(tone) })

  // ----- État local : liste de documents (édition / suppression) -----
  const [rows, setRows] = useState(MODULE.rows)

  const delRow = (e, r) => {
    if (e && e.stopPropagation) e.stopPropagation()
    if (!window.confirm('Supprimer cet élément ?')) return
    setRows((arr) => arr.filter((x) => x !== r))
  }

  const editRow = (e, r) => {
    if (e && e.stopPropagation) e.stopPropagation()
    const na = window.prompt('Titre :', r.a)
    if (na == null) return
    const nb = window.prompt('Sous-titre :', r.b)
    if (nb == null) return
    setRows((arr) => arr.map((x) => (x === r ? { ...x, a: na.trim() || x.a, b: nb.trim() || x.b } : x)))
  }

  // ----- État local : filtre de canal + presse-papier -----
  const [msgChannel, setMsgChannel] = useState('tous')
  const [copied, setCopied] = useState(null)

  const templates = seed.msgTemplatesRaw.filter((m) => (msgChannel === 'tous' ? true : m.channel === msgChannel))

  const copy = (e, m) => {
    if (e && e.stopPropagation) e.stopPropagation()
    try {
      if (navigator.clipboard) navigator.clipboard.writeText(m.body).catch(() => {})
    } catch (_) { /* noop */ }
    const key = 'tpl' + m.title
    setCopied(key)
    setTimeout(() => setCopied((c) => (c === key ? null : c)), 1500)
  }

  return (
    <>
      {/* ============ TEMPLATES (module générique) ============ */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
        <div>
          <div style={{ font: "500 46px 'Inter',sans-serif", letterSpacing: '-2px', color: 'var(--text)' }}>{MODULE.title}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 10, font: "500 12px 'Inter',sans-serif", color: 'var(--faint)' }}>
            <span>{MODULE.section}</span><span>›</span><span style={{ color: 'var(--text)' }}>{MODULE.sub}</span>
          </div>
        </div>
        <div style={{ padding: '11px 16px', borderRadius: 13, background: 'var(--signal)', color: 'var(--onsignal)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}>{MODULE.action}</div>
      </div>

      <div style={{ background: 'var(--surface)', borderRadius: 20, padding: '8px 8px 6px' }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 12, cursor: 'pointer' }}>
            <span style={dotStyleOf(r.tone)} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ font: "600 13px 'Inter',sans-serif", color: 'var(--text)' }}>{r.a}</div>
              <div style={{ font: "400 11px 'Inter',sans-serif", color: 'var(--faint)', marginTop: 2 }}>{r.b}</div>
            </div>
            <span style={{ font: "600 8px 'Inter',sans-serif", letterSpacing: '.6px', color: 'var(--muted)', padding: '5px 10px', borderRadius: 20, background: 'var(--rowhover)', whiteSpace: 'nowrap' }}>{r.c}</span>
            <span onClick={(e) => editRow(e, r)} title="Modifier" style={{ flexShrink: 0, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, cursor: 'pointer', color: 'var(--faint)', font: "600 11px 'Inter',sans-serif" }}>✎</span>
            <span onClick={(e) => delRow(e, r)} title="Supprimer" style={{ flexShrink: 0, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, cursor: 'pointer', color: 'var(--faint)', font: "600 12px 'Inter',sans-serif" }}>✕</span>
          </div>
        ))}
      </div>

      {/* ============ MODÈLES DE MESSAGES ============ */}
      <div style={{ font: "600 14px 'Inter',sans-serif", color: 'var(--text)', margin: '26px 0 12px' }}>Modèles de messages</div>

      <div style={{ display: 'flex', gap: 4, background: 'var(--surface)', borderRadius: 12, padding: 4, marginBottom: 16, width: 'fit-content', flexWrap: 'wrap' }}>
        {CHANNEL_TABS.map(([k, label]) => {
          const active = msgChannel === k
          return (
            <span key={k} onClick={() => setMsgChannel(k)} style={{ padding: '7px 13px', borderRadius: 9, font: "600 10px 'Inter',sans-serif", cursor: 'pointer', whiteSpace: 'nowrap', ...(active ? { background: 'var(--text)', color: 'var(--bg)' } : { color: 'var(--muted)' }) }}>{label}</span>
          )
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {templates.map((m, i) => {
          const cm = CHAN_META[m.channel] || { label: m.channel, tone: 'cyan' }
          const col = toneColor(cm.tone)
          const preview = m.body.length > 140 ? m.body.slice(0, 140) + '…' : m.body
          const isCopied = copied === 'tpl' + m.title
          return (
            <div key={i} style={{ background: 'var(--surface)', borderRadius: 18, padding: 18, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ font: "600 14px 'Inter',sans-serif", color: 'var(--text)' }}>{m.title}</div>
                <span style={{ font: "600 8px 'Inter',sans-serif", letterSpacing: '.5px', padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap', color: col, background: `color-mix(in srgb, ${col} 12%, transparent)` }}>{cm.label}</span>
              </div>
              <div style={{ font: "400 12px 'Inter',sans-serif", color: 'var(--muted)', lineHeight: 1.6, marginTop: 10, whiteSpace: 'pre-wrap', flex: 1 }}>{preview}</div>
              <div onClick={(e) => copy(e, m)} style={{ marginTop: 14, padding: '10px 0', textAlign: 'center', borderRadius: 11, background: 'var(--text)', color: 'var(--bg)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}>⧉ {isCopied ? 'COPIÉ ✓' : 'COPIER'}</div>
            </div>
          )
        })}
      </div>
    </>
  )
}
