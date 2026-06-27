import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { toneColor } from '../utils/helpers.jsx'
import { eventTypeMap } from '../data/seed.js'

const WEEKDAYS = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM']
const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
const DOW_FR = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM']

// Décoration d'un événement (couleur du point selon le type)
function eventDeco(e) {
  const t = eventTypeMap[e.type] || eventTypeMap.call
  return {
    tone: t.tone,
    typeLabel: t.label,
    dotStyle: { width: 6, height: 6, borderRadius: '50%', flexShrink: 0, background: toneColor(t.tone) },
    chipStyle: {
      display: 'flex', alignItems: 'center', gap: 5, minWidth: 0, maxWidth: '100%', overflow: 'hidden',
      font: "600 9px 'Inter',sans-serif", color: 'var(--text)', background: 'var(--rowhover)', borderRadius: 6, padding: '3px 6px',
    },
    label: (e.time ? e.time + ' ' : '') + e.title,
  }
}

export default function Planning() {
  const { events, setEvents, removeFrom } = useApp()
  // Navigation mois — état local. On démarre sur Juin 2026 (le mois des données).
  const [cursor, setCursor] = useState({ year: 2026, month: 5 }) // month 0-indexé
  const removeEvent = removeFrom(setEvents)

  const { year, month } = cursor
  const isJune2026 = year === 2026 && month === 5
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDow = new Date(year, month, 1).getDay() // 0 = dimanche
  const lead = (firstDow + 6) % 7 // grille commençant le lundi
  const today = isJune2026 ? 26 : -1 // "aujourd'hui" symbolique sur le mois de données

  // Les événements sont rattachés à un jour ; on ne les affiche que sur le mois de référence (Juin 2026)
  const monthEvents = isJune2026 ? events : []

  const totalCells = Math.ceil((lead + daysInMonth) / 7) * 7
  const cells = []
  for (let i = 0; i < totalCells; i++) {
    const day = i - lead + 1
    const hasDay = day >= 1 && day <= daysInMonth
    const dayEvents = hasDay ? monthEvents.filter((e) => Number(e.day) === day).map(eventDeco) : []
    const isToday = day === today
    cells.push({
      key: i,
      day: hasDay ? day : '',
      hasDay,
      isToday,
      chips: dayEvents.slice(0, 2),
      hasMore: dayEvents.length > 2,
      moreLabel: '+' + (dayEvents.length - 2),
    })
  }

  const prevMonth = () => setCursor(({ year, month }) => (month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 }))
  const nextMonth = () => setCursor(({ year, month }) => (month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 }))

  // Liste "Prochains jours" : à partir du 26 sur le mois de référence
  const upcoming = isJune2026
    ? monthEvents
        .filter((e) => Number(e.day) >= 26)
        .slice()
        .sort((a, b) => a.day - b.day)
        .slice(0, 6)
        .map((e) => {
          const d = eventDeco(e)
          return {
            ev: e,
            day: e.day,
            dow: DOW_FR[new Date(year, month, Number(e.day)).getDay()],
            time: e.time,
            title: e.title,
            dotStyle: d.dotStyle,
            typeLabel: d.typeLabel,
          }
        })
    : []

  const navBtnStyle = {
    width: 38, height: 38, borderRadius: 11, background: 'var(--surface)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    font: "600 13px 'Inter',sans-serif", color: 'var(--text)', cursor: 'pointer',
  }

  return (
    <>
      <PageHeader
        title="Planning"
        crumbs={['Agence', MONTHS[month] + ' ' + year]}
        action={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div onClick={prevMonth} style={navBtnStyle}>‹</div>
              <div onClick={nextMonth} style={navBtnStyle}>›</div>
            </div>
            <div style={{ padding: '11px 16px', borderRadius: 13, background: 'var(--signal)', color: 'var(--onsignal)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}>+ ÉVÉNEMENT</div>
          </div>
        }
      />

      {/* Calendrier mensuel */}
      <div style={{ background: 'var(--surface)', borderRadius: 20, padding: '18px 18px 10px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,minmax(0,1fr))', gap: 6, marginBottom: 8 }}>
          {WEEKDAYS.map((w) => (
            <div key={w} style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: 1, color: 'var(--faint)', textAlign: 'center', padding: '4px 0' }}>{w}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,minmax(0,1fr))', gap: 6 }}>
          {cells.map((c) => (
            <div
              key={c.key}
              style={{
                minHeight: 88, minWidth: 0, overflow: 'hidden', borderRadius: 12, padding: 8,
                cursor: c.hasDay ? 'pointer' : 'default',
                background: c.hasDay ? (c.isToday ? 'var(--signalsoft)' : 'var(--panel)') : 'transparent',
                ...(c.isToday ? { border: '1px solid var(--signal)' } : {}),
              }}
            >
              {c.hasDay && (
                <>
                  <div style={{ font: "600 12px 'Inter',sans-serif", color: c.isToday ? 'var(--signaltext)' : 'var(--text)' }}>{c.day}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 5, minWidth: 0 }}>
                    {c.chips.map((e, j) => (
                      <div key={j} style={e.chipStyle}>
                        <span style={e.dotStyle} />
                        <span style={{ minWidth: 0, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.label}</span>
                      </div>
                    ))}
                  </div>
                  {c.hasMore && (
                    <div style={{ font: "600 8px 'Inter',sans-serif", color: 'var(--faint)', marginTop: 3 }}>{c.moreLabel}</div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Prochains jours */}
      <div style={{ background: 'var(--surface)', borderRadius: 20, padding: '6px 22px 14px', marginTop: 16 }}>
        <div style={{ font: "600 14px 'Inter',sans-serif", color: 'var(--text)', padding: '14px 0 4px' }}>Prochains jours</div>
        {upcoming.map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '13px 0', borderTop: '1px solid var(--hair)' }}>
            <div style={{ width: 46, flexShrink: 0, textAlign: 'center', background: 'var(--rowhover)', borderRadius: 10, padding: '6px 0', color: 'var(--text)' }}>
              <div style={{ font: "700 15px 'Inter',sans-serif", lineHeight: 1 }}>{a.day}</div>
              <div style={{ font: "600 8px 'Inter',sans-serif", marginTop: 2, opacity: 0.7 }}>{a.dow}</div>
            </div>
            <div style={{ font: "600 12px 'Inter',sans-serif", color: 'var(--muted)', width: 46 }}>{a.time}</div>
            <span style={a.dotStyle} />
            <div style={{ flex: 1, font: "500 13px 'Inter',sans-serif", color: 'var(--text)' }}>{a.title}</div>
            <span style={{ font: "600 8px 'Inter',sans-serif", letterSpacing: '.5px', color: 'var(--muted)', padding: '4px 9px', borderRadius: 6, background: 'var(--rowhover)' }}>{a.typeLabel}</span>
            <span
              onClick={() => { if (window.confirm('Supprimer cet événement ?')) removeEvent(a.ev) }}
              title="Supprimer l'événement"
              style={{ flexShrink: 0, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, cursor: 'pointer', color: 'var(--faint)', font: "600 12px 'Inter',sans-serif" }}
            >✕</span>
          </div>
        ))}
      </div>
    </>
  )
}
