import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Objectifs from './pages/Objectifs.jsx'
import Roster from './pages/Roster.jsx'
import Engagement from './pages/Engagement.jsx'
import Pricing from './pages/Pricing.jsx'
import Briefs from './pages/Briefs.jsx'
import Todo from './pages/Todo.jsx'
import Documents from './pages/Documents.jsx'
import MediaKit from './pages/MediaKit.jsx'
import Messages from './pages/Messages.jsx'
import Contacts from './pages/Contacts.jsx'
import Planning from './pages/Planning.jsx'
import Contrats from './pages/Contrats.jsx'
import Facturation from './pages/Facturation.jsx'
import Checklist from './pages/Checklist.jsx'
import Prospection from './pages/Prospection.jsx'
import Alertes from './pages/Alertes.jsx'
import Idees from './pages/Idees.jsx'
import Debrief from './pages/Debrief.jsx'
import Templates from './pages/Templates.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/apercu" replace />} />
        <Route path="apercu" element={<Dashboard />} />
        <Route path="objectifs" element={<Objectifs />} />
        <Route path="roster" element={<Roster />} />
        <Route path="engagement" element={<Engagement />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="briefs" element={<Briefs />} />
        <Route path="todo" element={<Todo />} />
        <Route path="documents" element={<Documents />} />
        <Route path="mediakit" element={<MediaKit />} />
        <Route path="messages" element={<Messages />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="planning" element={<Planning />} />
        <Route path="contrats" element={<Contrats />} />
        <Route path="facturation" element={<Facturation />} />
        <Route path="checklist" element={<Checklist />} />
        <Route path="prospection" element={<Prospection />} />
        <Route path="alertes" element={<Alertes />} />
        <Route path="idees" element={<Idees />} />
        <Route path="debrief" element={<Debrief />} />
        <Route path="templates" element={<Templates />} />
        <Route path="*" element={<Navigate to="/apercu" replace />} />
      </Route>
    </Routes>
  )
}
