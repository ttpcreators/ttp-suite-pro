import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { initials, avatarStyle, toneColor } from '../utils/helpers.jsx'

// Méta par type de document (libellé, tone, glyphe) — portée depuis app.js
const DOC_TYPE_META = {
  brief: { label: 'Brief', tone: 'indigo', glyph: '✎' },
  mediakit: { label: 'Media kit', tone: 'signal', glyph: '▦' },
  facture: { label: 'Facture', tone: 'cyan', glyph: '⊞' },
  autre: { label: 'Document', tone: 'indigo', glyph: '▤' },
}

const firstName = (n) => (n || '').split(' ')[0]
const tint = (tone, pct) => `color-mix(in srgb, ${toneColor(tone)} ${pct}%, transparent)`
const isImageName = (name, url) =>
  /^data:image/.test(url || '') || /\.(png|jpe?g|gif|webp|svg)$/i.test(name || '')

// URL/nom de fichier téléchargeable pour un document de démonstration
function docFile(d) {
  const tm = DOC_TYPE_META[d.type] || DOC_TYPE_META.autre
  const url = d.url || ('data:text/plain;charset=utf-8,' + encodeURIComponent(
    'TTP — ' + d.name + '\n' + tm.label + '\nDocument de démonstration TTP Suite.'))
  const filename = d.url ? d.name : (d.name.replace(/\.[a-z0-9]+$/i, '') + '.txt')
  return { url, filename }
}

const formatSize = (b) =>
  b < 1024 ? b + ' o' : b < 1048576 ? (b / 1024).toFixed(0) + ' Ko' : (b / 1048576).toFixed(1).replace('.', ',') + ' Mo'

export default function Documents() {
  const { creators, seed } = useApp()

  // État local de la vue
  const [docCreator, setDocCreator] = useState(0)
  const [docType, setDocType] = useState('brief')
  // Magasin de documents (initialisé depuis seed.docsRaw), mutable localement
  const [docs, setDocs] = useState(() => seed.docsRaw)
  const [previewDoc, setPreviewDoc] = useState(null)

  const docCreatorName = firstName((creators[docCreator] || creators[0]).name)
  const agencyDocs = docs[docCreator] || []

  const addDoc = (e) => {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    const url = URL.createObjectURL(f)
    setDocs((b) => {
      const cur = { ...b }
      const list = (cur[docCreator] || []).slice()
      list.unshift({ name: f.name, type: docType, date: 'ajouté auj.', size: formatSize(f.size), url, external: true })
      cur[docCreator] = list
      return cur
    })
    e.target.value = ''
  }

  const removeDoc = (idx) => {
    setDocs((b) => {
      const cur = { ...b }
      cur[docCreator] = (cur[docCreator] || []).filter((_, j) => j !== idx)
      return cur
    })
  }

  return (
    <>
      {/* En-tête */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ font: "500 46px 'Inter',sans-serif", letterSpacing: '-2px', color: 'var(--text)' }}>Documents</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 10, font: "500 12px 'Inter',sans-serif", color: 'var(--faint)' }}>
          <span>Créateurs</span><span>›</span><span style={{ color: 'var(--text)' }}>Partage de fichiers</span>
        </div>
      </div>

      {/* Destinataire : chips créateurs */}
      <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '.8px', color: 'var(--faint)', marginBottom: 10 }}>DESTINATAIRE</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
        {creators.map((c, i) => (
          <div key={c.id || i} onClick={() => setDocCreator(i)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '5px 14px 5px 5px', borderRadius: 30,
              cursor: 'pointer', font: "600 11px 'Inter',sans-serif", letterSpacing: '.3px',
              ...(i === docCreator
                ? { background: 'var(--text)', color: 'var(--bg)' }
                : { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--hair)' }),
            }}>
            <div style={avatarStyle(c.tone, 24)}>{initials(c.name)}</div>
            {firstName(c.name)}
          </div>
        ))}
      </div>

      {/* Zone d'ajout */}
      <div style={{ background: 'var(--surface)', border: '1px dashed var(--hair)', borderRadius: 20, padding: 20, marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ font: "600 14px 'Inter',sans-serif", color: 'var(--text)' }}>Ajouter un document pour {docCreatorName}</div>
          <div style={{ font: "400 11px 'Inter',sans-serif", color: 'var(--muted)', marginTop: 4 }}>Brief, media kit, facture… le créateur pourra le télécharger depuis son portail.</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
            {Object.keys(DOC_TYPE_META).map((k) => (
              <div key={k} onClick={() => setDocType(k)}
                style={{
                  padding: '7px 13px', borderRadius: 18, font: "600 9px 'Inter',sans-serif", letterSpacing: '.4px', cursor: 'pointer',
                  ...(k === docType
                    ? { background: 'var(--signalsoft)', color: 'var(--signaltext)' }
                    : { background: 'var(--panel)', color: 'var(--muted)' }),
                }}>
                {DOC_TYPE_META[k].label}
              </div>
            ))}
          </div>
        </div>
        <label style={{ padding: '12px 20px', borderRadius: 13, background: 'var(--signal)', color: 'var(--onsignal)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer', whiteSpace: 'nowrap' }}>
          + AJOUTER UN FICHIER
          <input type="file" onChange={addDoc} style={{ display: 'none' }} />
        </label>
      </div>

      {/* Liste des documents */}
      {agencyDocs.length === 0 && (
        <div style={{ background: 'var(--surface)', borderRadius: 20, padding: 40, textAlign: 'center', font: "400 12px 'Inter',sans-serif", color: 'var(--faint)' }}>
          Aucun document pour {docCreatorName}. Ajoutez-en un ci-dessus.
        </div>
      )}
      <div style={{ background: 'var(--surface)', borderRadius: 20, padding: '8px 20px' }}>
        {agencyDocs.map((d, idx) => {
          const tm = DOC_TYPE_META[d.type] || DOC_TYPE_META.autre
          const { url, filename } = docFile(d)
          const meta = [d.size, d.date].filter(Boolean).join(' · ')
          const hex = toneColor(tm.tone)
          return (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid var(--hair)' }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 16px 'Inter',sans-serif", background: tint(tm.tone, 13), color: hex }}>{tm.glyph}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: "600 13px 'Inter',sans-serif", color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</div>
                <div style={{ font: "400 10px 'Inter',sans-serif", color: 'var(--faint)', marginTop: 2 }}>{meta}</div>
              </div>
              <span style={{ font: "600 8px 'Inter',sans-serif", letterSpacing: '.6px', padding: '4px 9px', borderRadius: 20, whiteSpace: 'nowrap', color: hex, background: tint(tm.tone, 9) }}>{tm.label}</span>
              <div onClick={() => setPreviewDoc({ name: d.name, url, filename, isImage: isImageName(d.name, url) })}
                style={{ padding: '9px 12px', borderRadius: 10, border: '1px solid var(--hair)', color: 'var(--text)', font: "600 9px 'Inter',sans-serif", cursor: 'pointer', whiteSpace: 'nowrap' }}>◉ COUP D'ŒIL</div>
              <a href={url} download={filename}
                style={{ padding: '9px 14px', borderRadius: 10, border: '1px solid var(--hair)', color: 'var(--text)', font: "600 9px 'Inter',sans-serif", cursor: 'pointer', textDecoration: 'none', whiteSpace: 'nowrap' }}>↓ TÉLÉCHARGER</a>
              <div onClick={() => removeDoc(idx)} style={{ font: "600 13px 'Inter',sans-serif", color: 'var(--faint)', cursor: 'pointer' }}>✕</div>
            </div>
          )
        })}
      </div>

      {/* Modale d'aperçu */}
      {previewDoc && (
        <div onClick={() => setPreviewDoc(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(10,12,16,.55)', zIndex: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
          <div onClick={(e) => e.stopPropagation()}
            style={{ width: 'min(880px,92vw)', height: '86vh', background: 'var(--surface)', borderRadius: 18, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 60px rgba(0,0,0,.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: '1px solid var(--hair)' }}>
              <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '.6px', color: 'var(--signaltext)', padding: '5px 10px', borderRadius: 20, background: 'var(--signalsoft)', whiteSpace: 'nowrap' }}>COUP D'ŒIL</div>
              <div style={{ flex: 1, minWidth: 0, font: "600 13px 'Inter',sans-serif", color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{previewDoc.name}</div>
              <a href={previewDoc.url} target="_blank" rel="noopener"
                style={{ padding: '9px 14px', borderRadius: 10, border: '1px solid var(--hair)', color: 'var(--text)', font: "600 9px 'Inter',sans-serif", textDecoration: 'none', whiteSpace: 'nowrap' }}>↗ OUVRIR DANS UN ONGLET</a>
              <a href={previewDoc.url} download={previewDoc.name}
                style={{ padding: '9px 14px', borderRadius: 10, background: 'var(--signal)', color: 'var(--onsignal)', font: "600 9px 'Inter',sans-serif", textDecoration: 'none', whiteSpace: 'nowrap' }}>↓ TÉLÉCHARGER</a>
              <div onClick={() => setPreviewDoc(null)} style={{ font: "600 16px 'Inter',sans-serif", color: 'var(--faint)', cursor: 'pointer', padding: '0 4px' }}>✕</div>
            </div>
            <div style={{ flex: 1, background: 'var(--panel)', minHeight: 0 }}>
              {previewDoc.isImage ? (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                  <img src={previewDoc.url} alt={previewDoc.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 8 }} />
                </div>
              ) : (
                <iframe src={previewDoc.url} title={previewDoc.name} style={{ width: '100%', height: '100%', border: 'none', background: '#fff' }} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
