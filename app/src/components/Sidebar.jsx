import { NavLink } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { Icon } from '../utils/helpers.jsx'
import { NAV_SECTIONS, path } from '../utils/nav.js'

export default function Sidebar({ onNavigate }) {
  const { todos, briefs, ideas } = useApp()
  const badges = {
    roster: useApp().creators.length,
    briefs: briefs.length,
    todo: todos.length,
    messages: 2,
    idees: ideas.filter((x) => x && x.source === 'creator').length,
  }
  return (
    <div className="sidebar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '14px 8px' }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: '#14181E', overflow: 'hidden', flexShrink: 0 }}>
          <img src="/cover.png" alt="TTP" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div>
          <div style={{ font: "700 15px 'Inter',sans-serif", color: 'var(--text)' }}>TTP</div>
          <div style={{ font: "400 11px 'Inter',sans-serif", color: 'var(--faint)' }}>Trust the Process</div>
        </div>
      </div>
      <div className="sidebar-nav">
        {NAV_SECTIONS.map((sec) => (
          <div key={sec.title}>
            <div className="nav-section-title">{sec.title}</div>
            {sec.items.map(([key, label]) => (
              <NavLink key={key} to={path(key)} onClick={onNavigate}
                className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
                <Icon name={key} />
                <span className="lbl">{label}</span>
                {badges[key] > 0 && <span className="nav-badge">{badges[key]}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
