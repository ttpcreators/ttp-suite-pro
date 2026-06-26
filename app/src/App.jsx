import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Roster from './pages/Roster.jsx'
import Pricing from './pages/Pricing.jsx'
import GenericPage from './pages/GenericPage.jsx'

const GENERIC = [
  ['objectifs', 'Objectifs'], ['engagement', 'Engagement'], ['briefs', 'Briefs'],
  ['todo', 'To-do'], ['documents', 'Documents'], ['mediakit', 'Media kit'],
  ['messages', 'Messages'], ['contacts', 'Contacts'], ['planning', 'Planning'],
  ['contrats', 'Contrats'], ['facturation', 'Facturation'], ['checklist', 'Checklist'],
  ['prospection', 'Prospection'], ['alertes', 'Alertes'], ['idees', 'Idées'],
  ['debrief', 'Debrief'], ['templates', 'Templates'],
]

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/apercu" replace />} />
        <Route path="apercu" element={<Dashboard />} />
        <Route path="roster" element={<Roster />} />
        <Route path="pricing" element={<Pricing />} />
        {GENERIC.map(([key, title]) => (
          <Route key={key} path={key} element={<GenericPage title={title} />} />
        ))}
        <Route path="*" element={<Navigate to="/apercu" replace />} />
      </Route>
    </Routes>
  )
}
