import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import * as seed from '../data/seed'

const AppContext = createContext(null)
export const useApp = () => useContext(AppContext)

function mapCreator(r) {
  return { id: r.id, name: r.name, handle: r.handle, niche: r.niche, plat: r.platform, followers: r.followers, reach: r.reach, er: r.er, ca: r.ca, status: r.status, tone: r.tone, trend: r.trend }
}

export function AppProvider({ children }) {
  // ----- Thème -----
  const [theme, setTheme] = useState('light')
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme) }, [theme])
  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])

  // ----- Données (mutables, state-backed) -----
  const [creators, setCreators] = useState(seed.rosterRaw)
  const [creatorInfo, setCreatorInfo] = useState(seed.rosterInfoRaw)
  const [todos, setTodos] = useState(seed.todoRaw)
  const [doneSet, setDoneSet] = useState({})
  const [ideas, setIdeas] = useState(seed.ideasRaw)
  const [briefs, setBriefs] = useState(seed.briefRaw)
  const [invoices, setInvoices] = useState(seed.invoiceRaw)
  const [contacts, setContacts] = useState(seed.contactRaw)
  const [prospects, setProspects] = useState(seed.prospectRaw)
  const [events, setEvents] = useState(seed.eventsRaw)
  const [modules, setModules] = useState(seed.modulesRaw)
  const [photos, setPhotos] = useState({})

  // ----- Chargement du Roster depuis Supabase -----
  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        const { data, error } = await supabase.from('creators').select('*').order('sort_order')
        if (error) { console.warn('[supabase] load creators:', error.message); return }
        if (active && data && data.length) {
          setCreators(data.map(mapCreator))
          const info = {}
          data.forEach((r, i) => { info[i] = { ville: r.ville, phone: r.phone, email: r.email, address: r.address, siren: r.siren, birth: r.birth, exclu: !!r.exclu, commission: r.commission } })
          setCreatorInfo(info)
        }
      } catch (e) { console.warn('[supabase] load creators failed', e) }
    })()
    return () => { active = false }
  }, [])

  // ----- Helpers CRUD génériques (suppression / mise à jour par identité) -----
  const removeFrom = (setter) => (item) => setter((arr) => arr.filter((x) => x !== item))
  const updateIn = (setter) => (item, patch) => setter((arr) => arr.map((x) => (x === item ? { ...x, ...patch } : x)))
  const addTo = (setter) => (item, atStart) => setter((arr) => (atStart ? [item, ...arr] : [...arr, item]))

  // Roster : suppression persistée en base (par id), repli local sinon
  const removeCreator = useCallback((c) => {
    setCreators((arr) => arr.filter((x) => x !== c))
    if (c.id) supabase.from('creators').delete().eq('id', c.id).then(({ error }) => { if (error) console.warn('[supabase] delete', error.message) })
  }, [])
  const addCreator = useCallback((nc) => {
    setCreators((arr) => [...arr, nc])
    supabase.from('creators').insert({ sort_order: 99, name: nc.name, handle: nc.handle, niche: nc.niche, platform: nc.plat, followers: nc.followers, reach: nc.reach, er: nc.er, ca: nc.ca, status: nc.status, tone: nc.tone, trend: nc.trend }).select().then(({ data, error }) => { if (error) console.warn('[supabase] insert', error.message); else if (data && data[0]) nc.id = data[0].id })
  }, [])

  const value = useMemo(() => ({
    theme, toggleTheme,
    // données + setters
    creators, setCreators, creatorInfo, removeCreator, addCreator,
    todos, setTodos, doneSet, setDoneSet,
    ideas, setIdeas, briefs, setBriefs, invoices, setInvoices,
    contacts, setContacts, prospects, setProspects, events, setEvents,
    modules, setModules, photos, setPhotos,
    // helpers CRUD
    removeFrom, updateIn, addTo,
    // données statiques
    seed,
  }), [theme, toggleTheme, creators, creatorInfo, removeCreator, addCreator, todos, doneSet, ideas, briefs, invoices, contacts, prospects, events, modules, photos])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
