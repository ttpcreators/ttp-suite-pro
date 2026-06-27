import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { initials, avatarStyle } from '../utils/helpers.jsx'

const tagStyle = {
  padding: '5px 10px', borderRadius: 20, background: 'var(--rowhover)',
  font: "600 8px 'Inter',sans-serif", letterSpacing: '.5px', color: 'var(--muted)', whiteSpace: 'nowrap',
}

const viewTabs = [['grid', 'Cartes'], ['list', 'Liste']]

export default function Contacts() {
  const { contacts, setContacts, removeFrom } = useApp()
  const [view, setView] = useState('grid')
  const [openContact, setOpenContact] = useState(null)
  const [copied, setCopied] = useState(null)

  const remove = removeFrom(setContacts)

  const del = (e, k) => {
    if (e && e.stopPropagation) e.stopPropagation()
    if (!window.confirm('Supprimer le contact ' + k.brand + ' ?')) return
    if (openContact === k) setOpenContact(null)
    remove(k)
  }

  const copy = (key, val) => () => {
    try { navigator.clipboard && navigator.clipboard.writeText(val) } catch (e) { /* noop */ }
    setCopied(key)
    setTimeout(() => setCopied((c) => (c === key ? null : c)), 1500)
  }

  const oc = openContact
  const grid = view === 'grid'

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
        <div>
          <div style={{ font: "500 46px 'Inter',sans-serif", letterSpacing: '-2px', color: 'var(--text)' }}>Contacts</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 10, font: "500 12px 'Inter',sans-serif", color: 'var(--faint)' }}>
            <span>Agence</span><span>›</span><span style={{ color: 'var(--text)' }}>Carnet marques &amp; RP</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <label style={{ padding: '11px 15px', borderRadius: 13, border: '1px solid var(--hair)', color: 'var(--text)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}>↑ IMPORTER<input type="file" accept=".csv,text/csv" style={{ display: 'none' }} /></label>
          <div style={{ padding: '11px 15px', borderRadius: 13, border: '1px solid var(--hair)', color: 'var(--text)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}>↓ EXPORTER CSV</div>
          <div style={{ padding: '11px 16px', borderRadius: 13, background: 'var(--signal)', color: 'var(--onsignal)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}>+ NOUVEAU</div>
        </div>
      </div>

      {oc && (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--hair)', borderRadius: 20, padding: 24, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
              <div style={avatarStyle(oc.tone, 52)}>{initials(oc.person)}</div>
              <div>
                <div style={{ font: "600 19px 'Inter',sans-serif", color: 'var(--text)' }}>{oc.brand}</div>
                <div style={{ font: "400 12px 'Inter',sans-serif", color: 'var(--muted)', marginTop: 3 }}>{oc.person} · {oc.role}</div>
              </div>
            </div>
            <div onClick={() => setOpenContact(null)} style={{ font: "600 15px 'Inter',sans-serif", color: 'var(--faint)', cursor: 'pointer' }}>✕</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginTop: 20 }}>
            <div style={{ background: 'var(--panel)', borderRadius: 14, padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '.8px', color: 'var(--faint)' }}>EMAIL</div>
                <div onClick={copy('email', oc.email)} style={{ font: "600 8px 'Inter',sans-serif", letterSpacing: '.5px', color: 'var(--signaltext)', cursor: 'pointer', whiteSpace: 'nowrap' }}>⧉ {copied === 'email' ? 'COPIÉ ✓' : 'COPIER'}</div>
              </div>
              <div style={{ font: "500 12px 'Inter',sans-serif", color: 'var(--text)', marginTop: 6, wordBreak: 'break-all' }}>{oc.email}</div>
            </div>
            <div style={{ background: 'var(--panel)', borderRadius: 14, padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '.8px', color: 'var(--faint)' }}>TÉLÉPHONE</div>
                <div onClick={copy('phone', oc.phone)} style={{ font: "600 8px 'Inter',sans-serif", letterSpacing: '.5px', color: 'var(--signaltext)', cursor: 'pointer', whiteSpace: 'nowrap' }}>⧉ {copied === 'phone' ? 'COPIÉ ✓' : 'COPIER'}</div>
              </div>
              <div style={{ font: "500 12px 'Inter',sans-serif", color: 'var(--text)', marginTop: 6 }}>{oc.phone}</div>
            </div>
            <div style={{ background: 'var(--panel)', borderRadius: 14, padding: '14px 16px' }}>
              <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '.8px', color: 'var(--faint)' }}>DERNIER CONTACT</div>
              <div style={{ font: "500 12px 'Inter',sans-serif", color: 'var(--text)', marginTop: 6 }}>{oc.last}</div>
            </div>
            <div style={{ background: 'var(--panel)', borderRadius: 14, padding: '14px 16px' }}>
              <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '.8px', color: 'var(--faint)' }}>HISTORIQUE</div>
              <div style={{ font: "500 12px 'Inter',sans-serif", color: 'var(--text)', marginTop: 6 }}>{oc.deals}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
            <div style={{ padding: '11px 18px', borderRadius: 11, background: 'var(--signal)', color: 'var(--onsignal)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}>ENVOYER UN EMAIL</div>
            <div style={{ padding: '11px 18px', borderRadius: 11, border: '1px solid var(--hair)', color: 'var(--text)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}>APPELER</div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 4, background: 'var(--surface)', borderRadius: 12, padding: 4, marginBottom: 16, width: 'fit-content' }}>
        {viewTabs.map(([k, label]) => (
          <span key={k} onClick={() => setView(k)} style={{ padding: '7px 13px', borderRadius: 9, font: "600 10px 'Inter',sans-serif", cursor: 'pointer', whiteSpace: 'nowrap', ...(view === k ? { background: 'var(--text)', color: 'var(--bg)' } : { color: 'var(--muted)' }) }}>{label}</span>
        ))}
      </div>

      {grid && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {contacts.map((k, i) => (
            <div key={k.brand + i} onClick={() => setOpenContact(k)} style={{ background: 'var(--surface)', borderRadius: 20, padding: 20, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={avatarStyle(k.tone, 44)}>{initials(k.person)}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={tagStyle}>{k.tag}</span>
                  <span onClick={(e) => del(e, k)} title="Supprimer le contact" style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, cursor: 'pointer', color: 'var(--faint)', font: "600 12px 'Inter',sans-serif" }}>✕</span>
                </div>
              </div>
              <div style={{ font: "600 16px 'Inter',sans-serif", color: 'var(--text)', marginTop: 14 }}>{k.brand}</div>
              <div style={{ font: "500 12px 'Inter',sans-serif", color: 'var(--text)', marginTop: 8 }}>{k.person}</div>
              <div style={{ font: "400 11px 'Inter',sans-serif", color: 'var(--faint)', marginTop: 2 }}>{k.role}</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <div style={{ flex: 1, padding: '9px 0', textAlign: 'center', borderRadius: 10, background: 'var(--text)', color: 'var(--bg)', font: "600 10px 'Inter',sans-serif" }}>CONTACTER</div>
                <div style={{ width: 36, padding: '9px 0', textAlign: 'center', borderRadius: 10, border: '1px solid var(--hair)', color: 'var(--text)', font: "600 11px 'Inter',sans-serif" }}>↗</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!grid && (
        <div style={{ background: 'var(--surface)', borderRadius: 20, padding: '8px 20px' }}>
          {contacts.map((k, i) => (
            <div key={k.brand + i} onClick={() => setOpenContact(k)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid var(--hair)', cursor: 'pointer' }}>
              <div style={avatarStyle(k.tone, 38)}>{initials(k.person)}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: "600 13px 'Inter',sans-serif", color: 'var(--text)' }}>{k.brand}</div>
                <div style={{ font: "400 11px 'Inter',sans-serif", color: 'var(--faint)', marginTop: 2 }}>{k.person} · {k.role}</div>
              </div>
              <div style={{ font: "500 11px 'Inter',sans-serif", color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>{k.email || '—'}</div>
              <span style={tagStyle}>{k.tag}</span>
              <span onClick={(e) => del(e, k)} title="Supprimer le contact" style={{ flexShrink: 0, width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, cursor: 'pointer', color: 'var(--faint)', font: "600 12px 'Inter',sans-serif" }}>✕</span>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
