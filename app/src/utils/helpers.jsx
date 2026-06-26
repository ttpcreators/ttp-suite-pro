// Helpers partagés (portés depuis l'app d'origine), adaptés à React + CSS variables.

// Couleur d'un "tone" via les variables CSS (s'adaptent au thème clair/sombre)
export function toneColor(tone) {
  if (tone === 'amber') return 'var(--indigo)'
  if (tone === 'signal' || tone === 'indigo' || tone === 'cyan') return `var(--${tone})`
  return 'var(--muted)'
}

export function initials(name) {
  return (name || '').split(' ').map((w) => w[0]).slice(0, 2).join('')
}

// Style d'avatar (objet de style JSX)
export function avatarStyle(tone, size = 34) {
  const fg = tone === 'signal' ? '#10141A' : '#FFFFFF'
  return {
    width: size, height: size, borderRadius: size > 40 ? 14 : 9, flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    font: `700 ${size > 44 ? 20 : size > 40 ? 15 : 11}px 'Inter',sans-serif`,
    background: toneColor(tone), color: fg,
  }
}

export function dotStyle(tone, pulse = false) {
  return {
    width: 8, height: 8, borderRadius: '50%', flexShrink: 0, background: toneColor(tone),
    ...(pulse ? { animation: 'ttp-pulse 1.6s infinite' } : {}),
  }
}

export const statusLabelOf = (s) =>
  ({ live: 'LIVE', actif: 'ACTIF', pause: 'PAUSE' }[s] || 'ACTIF')

export const invStatus = (s) =>
  ({ payee: { label: 'PAYÉE', tone: 'signal' }, attente: { label: 'EN ATTENTE', tone: 'indigo' }, retard: { label: 'EN RETARD', tone: 'indigo' }, brouillon: { label: 'BROUILLON', tone: 'cyan' } }[s] || { label: 'BROUILLON', tone: 'cyan' })

export const briefStatus = (s) =>
  ({ valider: { label: 'À VALIDER', tone: 'indigo' }, cours: { label: 'EN COURS', tone: 'cyan' }, attente: { label: 'EN ATTENTE', tone: 'signal' } }[s] || { label: 'EN COURS', tone: 'cyan' })

export const chipStyle = {
  display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px',
  borderRadius: 20, border: '1px solid var(--hair)', font: "600 8px 'Inter',sans-serif",
  letterSpacing: '.6px', color: 'var(--muted)', whiteSpace: 'nowrap',
}

// Jeu d'icônes (paths SVG) porté depuis l'app d'origine
const ICONS = {
  apercu: ['M3 12l9-8 9 8', 'M5 10v10h14V10'],
  objectifs: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18', 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10', 'M12 12h.01'],
  roster: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8', 'M22 21v-2a4 4 0 0 0-3-3.9', 'M16 3.1a4 4 0 0 1 0 7.8'],
  engagement: ['M3 12h4l3 8 4-16 3 8h4'],
  pricing: ['M17 7a6 6 0 1 0 0 10', 'M4 10h9', 'M4 14h9'],
  briefs: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M8 13h8', 'M8 17h5'],
  todo: ['M9 11l3 3 8-8', 'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'],
  documents: ['M3 7a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'],
  mediakit: ['M3 5h18v14H3z', 'M3 16l5-5 4 4 3-3 6 6', 'M8.5 9a1.5 1.5 0 1 0-.001-.001'],
  messages: ['M4 5h16v14H4z', 'M4 7l8 6 8-6'],
  contacts: ['M5 4h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2'],
  planning: ['M4 6h16v15H4z', 'M4 10h16', 'M8 3v4', 'M16 3v4'],
  contrats: ['M8 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6z', 'M14 3v6h6', 'M9 14h6', 'M9 17h4'],
  facturation: ['M4 5h16v15l-3-2-3 2-3-2-3 2z', 'M8 9h8', 'M8 13h5'],
  checklist: ['M9 6h11', 'M9 12h11', 'M9 18h11', 'M4 5.5l1 1 2-2', 'M4 11.5l1 1 2-2', 'M4 17.5l1 1 2-2'],
  prospection: ['M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14', 'M21 21l-4-4'],
  alertes: ['M12 3l9 17H3z', 'M12 9v5', 'M12 17h.01'],
  idees: ['M9 18h6', 'M10 22h4', 'M12 2a7 7 0 0 0-4 12.6c.6.5 1 1.2 1 2.4h6c0-1.2.4-1.9 1-2.4A7 7 0 0 0 12 2'],
  debrief: ['M3 12a9 9 0 1 0 2.6-6.3', 'M3 4v5h5'],
  templates: ['M3 3h8v8H3z', 'M13 3h8v8h-8z', 'M13 13h8v8h-8z', 'M3 13h8v8H3z'],
  accueil: ['M3 12l9-8 9 8', 'M5 10v10h14V10'],
  stats: ['M4 20V4', 'M4 20h16', 'M8 20v-7', 'M13 20V8', 'M18 20v-4'],
  profil: ['M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8', 'M5 21a7 7 0 0 1 14 0'],
}

export function Icon({ name, size = 17 }) {
  const d = ICONS[name] || ['M5 12h14']
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
      {d.map((p, i) => <path key={i} d={p} />)}
    </svg>
  )
}
