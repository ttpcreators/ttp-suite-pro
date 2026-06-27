import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { initials, avatarStyle, toneColor } from '../utils/helpers.jsx'

// Index aligné sur l'ordre du roster (abonnés/vues de référence par créateur)
const FNUM = [540000, 1200000, 480000, 320000, 210000, 95000, 64000, 175000]

const PLAT_CFG = {
  instagram: { label: 'Instagram', denom: 'Abonnés', metrics: ['Likes moyens', 'Commentaires'], ratios: [0.9, 0.1], formula: '(likes + commentaires) ÷ abonnés × 100', viewBase: false, good: 3, exc: 6 },
  tiktok: { label: 'TikTok', denom: 'Vues moyennes', metrics: ['Likes', 'Commentaires', 'Partages'], ratios: [0.78, 0.08, 0.14], formula: '(likes + commentaires + partages) ÷ vues × 100', viewBase: true, good: 5, exc: 9 },
  youtube: { label: 'YouTube', denom: 'Vues moyennes', metrics: ['Likes', 'Commentaires'], ratios: [0.88, 0.12], formula: '(likes + commentaires) ÷ vues × 100', viewBase: true, good: 4, exc: 8 },
  snapchat: { label: 'Snapchat', denom: 'Vues de story', metrics: ['Captures écran', 'Réponses'], ratios: [0.6, 0.4], formula: '(captures + réponses) ÷ vues × 100', viewBase: true, good: 5, exc: 10 },
}

const platChipStyle = (sel) => ({
  padding: '9px 14px', borderRadius: 11, font: "600 10px 'Inter',sans-serif", cursor: 'pointer',
  ...(sel ? { background: 'var(--text)', color: 'var(--bg)' } : { border: '1px solid var(--hair)', color: 'var(--muted)' }),
})

const creatorChipStyle = (sel) => ({
  display: 'flex', alignItems: 'center', gap: 7, padding: '7px 13px', borderRadius: 20,
  font: "600 10px 'Inter',sans-serif", cursor: 'pointer',
  ...(sel ? { background: 'var(--text)', color: 'var(--bg)' } : { border: '1px solid var(--hair)', color: 'var(--muted)' }),
})

const verdictStyle = (tone) => ({
  padding: '5px 11px', borderRadius: 20, font: "600 9px 'Inter',sans-serif",
  background: toneColor(tone), color: tone === 'signal' ? '#10141A' : '#FFFFFF',
})

const COLS = '2fr 0.9fr 1fr 2fr 0.7fr'

export default function Engagement() {
  const { creators, theme } = useApp()
  const dark = theme === 'dark'

  // ----- État local du calculateur -----
  const [platform, setPlatform] = useState('instagram')
  const [creatorIdx, setCreatorIdx] = useState(0)
  const [base, setBase] = useState('')        // dénominateur (abonnés / vues)
  const [m0, setM0] = useState('')
  const [m1, setM1] = useState('')
  const [m2, setM2] = useState('')
  const mState = [m0, m1, m2]
  const setMetric = [setM0, setM1, setM2]

  const reset = () => { setBase(''); setM0(''); setM1(''); setM2('') }
  const pickPlatform = (k) => { setPlatform(k); reset() }
  const pickCreator = (i) => { setCreatorIdx(i); reset() }

  const cfg = PLAT_CFG[platform]
  const eci = creatorIdx < creators.length ? creatorIdx : 0
  const ecr = creators[eci]
  const ecErf = parseFloat(String(ecr.er).replace(',', '.'))

  const baseDefault = cfg.viewBase ? Math.round((FNUM[eci] || 0) * 0.35) : (FNUM[eci] || 0)
  const totalInter = baseDefault * ecErf / 100
  const metricDefaults = cfg.ratios.map((r) => Math.round(totalInter * r))
  const baseVal = (base !== '' && base != null) ? Number(base) : baseDefault
  const mVals = cfg.metrics.map((lab, i) => (mState[i] !== '' && mState[i] != null) ? Number(mState[i]) : metricDefaults[i])
  const interSum = mVals.reduce((a, b) => a + b, 0)
  const erCalc = baseVal > 0 ? interSum / baseVal * 100 : 0

  let verdict = 'Faible', evTone = 'cyan'
  if (erCalc >= cfg.exc) { verdict = 'Excellent'; evTone = 'signal' }
  else if (erCalc >= cfg.good) { verdict = 'Bon'; evTone = 'signal' }
  else if (erCalc >= cfg.good * 0.6) { verdict = 'Correct'; evTone = 'indigo' }

  const engInputs = [{ label: cfg.denom, value: String(baseVal), onChange: (e) => setBase(e.target.value) }]
    .concat(cfg.metrics.map((lab, i) => ({ label: lab, value: String(mVals[i]), onChange: (e) => setMetric[i](e.target.value) })))

  // ----- Table de performances -----
  const greenText = dark ? '#70FC8E' : '#16A34A'
  const redish = dark ? '#A8B0BA' : '#8590A1'
  const rows = creators.map((c) => {
    const b = Math.round(parseFloat(String(c.er).replace(',', '.')))
    const spark = [40, 55, 48, 62, 58, 72, 66, 80, 76, 90].map((v) => Math.min(100, v * (0.7 + b / 12)))
    return {
      name: c.name, er: c.er, reach: c.reach, tone: c.tone, spark,
      trend: (c.trend > 0 ? '+' : '') + c.trend + ' pt',
      trendColor: c.trend >= 0 ? greenText : redish,
    }
  })

  return (
    <>
      <PageHeader title="Engagement" crumbs={['Créateurs', 'Performances']} />

      {/* ====== Calculateur ====== */}
      <div style={{ background: 'var(--surface)', borderRadius: 20, padding: 22, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ font: "600 14px 'Inter',sans-serif", color: 'var(--text)' }}>Calculateur de taux d'engagement</div>
          <div style={{ font: "500 10px 'Inter',sans-serif", color: 'var(--signaltext)', background: 'var(--signalsoft)', padding: '5px 11px', borderRadius: 20 }}>{cfg.formula}</div>
        </div>

        <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '.8px', color: 'var(--faint)', marginBottom: 8 }}>PLATEFORME</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {Object.keys(PLAT_CFG).map((k) => (
            <div key={k} onClick={() => pickPlatform(k)} style={platChipStyle(k === platform)}>{PLAT_CFG[k].label}</div>
          ))}
        </div>

        <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '.8px', color: 'var(--faint)', marginBottom: 8 }}>CRÉATEUR</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
          {creators.map((c, i) => (
            <div key={c.id || i} onClick={() => pickCreator(i)} style={creatorChipStyle(i === eci)}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', flexShrink: 0, background: toneColor(c.tone) }} />
              {c.name.split(' ')[0]}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
          {engInputs.map((f, i) => (
            <div key={i} style={{ flex: 1, minWidth: 130 }}>
              <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '.8px', color: 'var(--faint)', marginBottom: 6 }}>{f.label}</div>
              <input value={f.value} onChange={f.onChange} type="number"
                style={{ width: '100%', padding: '12px 14px', borderRadius: 11, border: '1px solid var(--hair)', background: 'var(--panel)', color: 'var(--text)', font: "600 14px 'Inter',sans-serif", outline: 'none', boxSizing: 'border-box' }} />
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--text)', borderRadius: 14, padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--bg)', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '.8px', color: 'var(--faint)' }}>TAUX D'ENGAGEMENT · {cfg.label}</div>
            <div style={{ font: "400 10px 'Inter',sans-serif", color: 'var(--faint)', marginTop: 4 }}>{cfg.formula}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <div style={{ font: "700 34px 'Inter',sans-serif", letterSpacing: '-1.5px' }}>{erCalc.toFixed(1).replace('.', ',')}%</div>
            <span style={verdictStyle(evTone)}>{verdict}</span>
          </div>
        </div>
      </div>

      {/* ====== Stats ====== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 16 }}>
        <div style={{ background: 'var(--surface)', borderRadius: 18, padding: 18 }}>
          <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: 1, color: 'var(--faint)' }}>ER MOYEN</div>
          <div style={{ font: "700 24px 'Inter',sans-serif", color: 'var(--text)', marginTop: 9, letterSpacing: '-1px' }}>5,9%</div>
          <div style={{ font: "600 10px 'Inter',sans-serif", color: 'var(--signaltext)', marginTop: 5 }}>▲ +0,4 pt</div>
        </div>
        <div style={{ background: 'var(--surface)', borderRadius: 18, padding: 18 }}>
          <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: 1, color: 'var(--faint)' }}>REACH CUMULÉ</div>
          <div style={{ font: "700 24px 'Inter',sans-serif", color: 'var(--text)', marginTop: 9, letterSpacing: '-1px' }}>8,4 M</div>
          <div style={{ font: "600 10px 'Inter',sans-serif", color: 'var(--muted)', marginTop: 5 }}>30 derniers jours</div>
        </div>
        <div style={{ background: 'var(--surface)', borderRadius: 18, padding: 18 }}>
          <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: 1, color: 'var(--faint)' }}>MEILLEUR ER</div>
          <div style={{ font: "700 24px 'Inter',sans-serif", color: 'var(--text)', marginTop: 9, letterSpacing: '-1px' }}>9,4%</div>
          <div style={{ font: "600 10px 'Inter',sans-serif", color: 'var(--muted)', marginTop: 5 }}>SACHA DELAUNAY</div>
        </div>
      </div>

      {/* ====== Table performances ====== */}
      <div style={{ background: 'var(--surface)', borderRadius: 20, padding: '8px 8px 6px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: COLS, gap: 12, padding: '12px 16px', font: "600 9px 'Inter',sans-serif", letterSpacing: 1, color: 'var(--faint)' }}>
          <span>CRÉATEUR</span><span style={{ textAlign: 'right' }}>ER</span><span style={{ textAlign: 'right' }}>REACH</span><span>TENDANCE</span><span style={{ textAlign: 'right' }}>△</span>
        </div>
        {rows.map((c, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: COLS, gap: 12, alignItems: 'center', padding: '11px 16px', borderRadius: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
              <div style={avatarStyle(c.tone, 30)}>{initials(c.name)}</div>
              <span style={{ font: "600 12px 'Inter',sans-serif", color: 'var(--text)', letterSpacing: '.3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
            </div>
            <span style={{ font: "600 12px 'Inter',sans-serif", color: 'var(--text)', textAlign: 'right' }}>{c.er}</span>
            <span style={{ font: "500 12px 'Inter',sans-serif", color: 'var(--muted)', textAlign: 'right' }}>{c.reach}</span>
            <span style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 24 }}>
              {c.spark.map((v, j) => (
                <span key={j} style={{ flex: 1, minWidth: 3, height: v + '%', borderRadius: 3, background: toneColor(c.tone) }} />
              ))}
            </span>
            <span style={{ font: "600 11px 'Inter',sans-serif", textAlign: 'right', color: c.trendColor }}>{c.trend}</span>
          </div>
        ))}
      </div>
    </>
  )
}
