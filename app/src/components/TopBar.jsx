import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { Icon } from '../utils/helpers.jsx'

export default function TopBar() {
  const nav = useNavigate()
  const { theme, toggleTheme, photos } = useApp()
  const photo = photos.agency
  return (
    <div className="topbar">
      <div className="search" onClick={() => nav('/roster')}>
        <span style={{ font: "600 13px 'Inter',sans-serif", color: 'var(--faint)' }}>⌕</span>
        <span className="search-txt">Rechercher créateur, marque, facture…</span>
      </div>
      <div className="userpill">
        <div style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 12px 'Inter',sans-serif", background: photo ? `center/cover url(${photo})` : 'var(--signal)', color: photo ? 'transparent' : 'var(--onsignal)' }}>MD</div>
        <div className="usermeta">
          <div style={{ font: "500 12px 'Inter',sans-serif", color: 'var(--text)', lineHeight: 1.2, whiteSpace: 'nowrap' }}>Marc Delaune</div>
          <div style={{ font: "400 10px 'Inter',sans-serif", color: 'var(--faint)', whiteSpace: 'nowrap' }}>Direction · TTP</div>
        </div>
      </div>
      <div className="icon-btn" title="Notifications"><Icon name="alertes" size={16} /></div>
      <div className="icon-btn" onClick={toggleTheme} style={{ font: "600 14px 'Inter',sans-serif" }}>{theme === 'dark' ? '☀' : '☾'}</div>
    </div>
  )
}
