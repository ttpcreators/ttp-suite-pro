import { NavLink } from 'react-router-dom'
import { Icon } from '../utils/helpers.jsx'

export default function BottomBar({ onMenu }) {
  const items = [['apercu', 'Accueil'], ['roster', 'Roster'], ['messages', 'Messages'], ['planning', 'Planning']]
  return (
    <div className="bottombar">
      {items.map(([key, label]) => (
        <NavLink key={key} to={'/' + key} className={({ isActive }) => (isActive ? 'active' : '')}>
          <Icon name={key} /><span>{label}</span>
        </NavLink>
      ))}
      <a onClick={onMenu} style={{ cursor: 'pointer' }}>
        <span style={{ font: "600 18px 'Inter',sans-serif", lineHeight: 1 }}>☰</span><span>Menu</span>
      </a>
    </div>
  )
}
