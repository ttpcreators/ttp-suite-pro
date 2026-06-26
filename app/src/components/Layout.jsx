import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import TopBar from './TopBar.jsx'
import BottomBar from './BottomBar.jsx'
import './Layout.css'

export default function Layout() {
  const [navOpen, setNavOpen] = useState(false)
  return (
    <div className={'shell' + (navOpen ? ' nav-open' : '')}>
      <div className="backdrop" onClick={() => setNavOpen(false)} />
      <div className="shell-inner">
        <Sidebar onNavigate={() => setNavOpen(false)} />
        <div className="main">
          <TopBar />
          <div className="content"><Outlet /></div>
        </div>
      </div>
      <BottomBar onMenu={() => setNavOpen(true)} />
    </div>
  )
}
