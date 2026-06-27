import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { initials, avatarStyle } from '../utils/helpers.jsx'

// Réponses automatiques (côté créateur) après envoi d'un message agence
const AUTO_REPLIES = ['Merci, c\'est noté ! 🙏', 'Super, je m\'en occupe.', 'Parfait 👍', 'Reçu, je vous tiens au courant.']

// Clés de conversations affichées dans la boîte de réception agence
const THREAD_KEYS = [0, 1, 3, 4, 5]

export default function Messages() {
  const { seed } = useApp()
  const { aMeta } = seed

  // Store local des messages (initialisé depuis le seed), modifiable à l'envoi
  const [threadMsgs, setThreadMsgs] = useState(() => {
    const init = {}
    Object.keys(seed.msgsRaw).forEach((k) => { init[k] = [...seed.msgsRaw[k]] })
    return init
  })
  const [openThread, setOpenThread] = useState(null) // clé de la conversation ouverte ou null
  const [draft, setDraft] = useState('')

  // Aperçu du dernier message + préfixe ("Vous : " côté agence, "Prénom : " côté créateur)
  const previewOf = (k) => {
    const ms = threadMsgs[k] || []
    const lm = ms[ms.length - 1]
    if (!lm) return '—'
    const w = aMeta[k].creator.split(' ')[0]
    const lcap = w.charAt(0) + w.slice(1).toLowerCase()
    return (lm.from === 'agency' ? 'Vous : ' : lcap + ' : ') + lm.text
  }
  const hasUnreadOf = (k) => {
    const ms = threadMsgs[k] || []
    const lm = ms[ms.length - 1]
    return !!lm && lm.from === 'me'
  }

  const sendMsg = () => {
    if (openThread == null) return
    const d = draft.trim()
    if (!d) return
    setThreadMsgs((cur) => ({ ...cur, [openThread]: [...(cur[openThread] || []), { from: 'agency', text: d }] }))
    setDraft('')
    const at = openThread
    setTimeout(() => {
      const rep = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)]
      setThreadMsgs((cur) => ({ ...cur, [at]: [...(cur[at] || []), { from: 'me', text: rep }] }))
    }, 1300)
  }

  const meta = openThread != null ? aMeta[openThread] : null
  const conv = openThread != null ? (threadMsgs[openThread] || []) : []

  return (
    <>
      <div style={{ marginBottom: 22 }}>
        <div style={{ font: "500 46px 'Inter',sans-serif", letterSpacing: '-2px', color: 'var(--text)' }}>Messages</div>
        <div style={{ font: "400 13px 'Inter',sans-serif", color: 'var(--faint)', marginTop: 6 }}>Boîte de réception · conversations créateurs</div>
      </div>

      {openThread == null && (
        <div style={{ background: 'var(--surface)', borderRadius: 20, padding: '8px 20px', maxWidth: 760 }}>
          {THREAD_KEYS.map((k) => {
            const m = aMeta[k]
            return (
              <div key={k} onClick={() => setOpenThread(k)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid var(--hair)', cursor: 'pointer' }}>
                <div style={avatarStyle(m.tone, 38)}>{initials(m.creator)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ font: "700 13px 'Inter',sans-serif", color: 'var(--text)', letterSpacing: '.3px' }}>{m.creator}</span>
                    <span style={{ font: "500 10px 'Inter',sans-serif", color: 'var(--faint)' }}>{m.campaign}</span>
                  </div>
                  <div style={{ font: "400 11px 'Inter',sans-serif", color: 'var(--muted)', marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{previewOf(k)}</div>
                </div>
                {hasUnreadOf(k) && (
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--signal)', flexShrink: 0, animation: 'ttp-pulse 1.6s infinite' }} />
                )}
              </div>
            )
          })}
        </div>
      )}

      {openThread != null && meta && (
        <>
          <div onClick={() => setOpenThread(null)} style={{ display: 'flex', alignItems: 'center', gap: 7, font: "600 10px 'Inter',sans-serif", color: 'var(--faint)', cursor: 'pointer', marginBottom: 14 }}>← BOÎTE DE RÉCEPTION</div>
          <div style={{ background: 'var(--panel)', borderRadius: 20, padding: 18, minHeight: 420, display: 'flex', flexDirection: 'column', maxWidth: 760 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 14, borderBottom: '1px solid var(--hair)', marginBottom: 16 }}>
              <div style={avatarStyle(meta.tone, 38)}>{initials(meta.creator)}</div>
              <div>
                <div style={{ font: "700 13px 'Inter',sans-serif", color: 'var(--text)', letterSpacing: '.3px' }}>{meta.creator}</div>
                <div style={{ font: "400 11px 'Inter',sans-serif", color: 'var(--faint)' }}>{meta.campaign}</div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              {conv.map((m, i) => {
                const mine = m.from === 'agency'
                return (
                  <div key={i} style={{ display: 'flex', marginBottom: 10, justifyContent: mine ? 'flex-end' : 'flex-start' }}>
                    <div style={{
                      maxWidth: '75%', padding: '11px 15px', borderRadius: 16, font: "400 13px 'Inter',sans-serif", lineHeight: 1.5,
                      ...(mine
                        ? { background: 'var(--signal)', color: 'var(--onsignal)', borderBottomRightRadius: 5 }
                        : { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--hair)', borderBottomLeftRadius: 5 }),
                    }}>{m.text}</div>
                  </div>
                )
              })}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 16, background: 'var(--surface)', borderRadius: 14, padding: '8px 8px 8px 16px' }}>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') sendMsg() }}
                placeholder="Répondre…"
                style={{ flex: 1, border: 'none', background: 'transparent', color: 'var(--text)', font: "400 13px 'Inter',sans-serif", outline: 'none' }}
              />
              <div onClick={sendMsg} style={{ padding: '10px 18px', borderRadius: 10, background: 'var(--signal)', color: 'var(--onsignal)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}>ENVOYER</div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
