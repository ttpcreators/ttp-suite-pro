import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { initials, avatarStyle } from '../utils/helpers.jsx'

export default function MediaKit() {
  const { creators, seed } = useApp()
  const [mkCreator, setMkCreator] = useState(0)

  const ci = mkCreator != null && mkCreator < creators.length ? mkCreator : 0
  const c = creators[ci]
  const mkSeed = seed.mediaKitRaw[ci] || {}
  const fn = c.name.split(' ')[0]

  const gender = mkSeed.gender || 'Femmes 70% · Hommes 30%'
  const femM = /(\d+)%/.exec(gender)
  const fem = femM ? Number(femM[1]) : 65

  const mk = {
    name: c.name,
    fn,
    handle: c.handle,
    niche: c.niche,
    plat: c.plat,
    bio: mkSeed.bio || (fn + ', créateur ' + c.niche.toLowerCase() + ' représenté(e) par TTP Agency. Contenus premium, audience engagée et collaborations à forte conversion.'),
    age: mkSeed.age || '18–34 ans',
    agePct: mkSeed.agePct || '64%',
    gender,
  }
  const mkStats = [
    { label: 'ABONNÉS', value: c.followers },
    { label: 'ENGAGEMENT', value: c.er },
    { label: 'REACH / MOIS', value: c.reach },
    { label: 'PLATEFORME', value: c.plat },
  ]
  const mkGeo = mkSeed.geo || ['Paris', 'Lyon', 'Bruxelles']
  const mkBrands = mkSeed.brands || ['Sephora', 'Dior', 'L’Oréal']
  const mkFormats = mkSeed.formats || [
    { label: 'Reel Instagram', price: '1 800 €' },
    { label: 'Story (×3)', price: '700 €' },
    { label: 'Post feed', price: '1 200 €' },
    { label: 'Vidéo UGC', price: '650 €' },
  ]

  return (
    <>
      <PageHeader title="Media kit" crumbs={['Créateurs', 'Présentation aux marques']}
        action={
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ padding: '11px 16px', borderRadius: 13, border: '1px solid var(--hair)', color: 'var(--text)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}>↗ ENVOYER VERS CANVA</div>
            <div style={{ padding: '11px 16px', borderRadius: 13, background: 'var(--signal)', color: 'var(--onsignal)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}>↓ GÉNÉRER LE PDF</div>
          </div>
        } />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {creators.map((cc, i) => (
          <div key={cc.id || i} onClick={() => setMkCreator(i)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '5px 14px 5px 5px', borderRadius: 30, cursor: 'pointer', font: "600 11px 'Inter',sans-serif",
              ...(i === ci
                ? { background: 'var(--text)', color: 'var(--bg)' }
                : { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--hair)' }),
            }}>
            <div style={avatarStyle(cc.tone, 24)}>{initials(cc.name)}</div>
            {cc.name.split(' ')[0]}
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--hair)', borderRadius: 22, padding: 34, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={avatarStyle(c.tone, 76)}>{initials(c.name)}</div>
            <div>
              <div style={{ font: "500 34px 'Inter',sans-serif", letterSpacing: '-1px', color: 'var(--text)' }}>{mk.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
                <span style={{ font: "500 13px 'Inter',sans-serif", color: 'var(--muted)' }}>{mk.handle}</span>
                <span style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '.6px', color: 'var(--signaltext)', background: 'var(--signalsoft)', padding: '4px 10px', borderRadius: 20 }}>{mk.niche}</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: '#14181E', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/cover.png" alt="TTP" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ font: "700 12px 'Inter',sans-serif", color: 'var(--text)' }}>TTP AGENCY</span>
            </div>
            <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '1.4px', color: 'var(--faint)', marginTop: 8 }}>MEDIA KIT · 2026</div>
          </div>
        </div>

        <div style={{ font: "400 13px 'Inter',sans-serif", color: 'var(--muted)', lineHeight: 1.6, marginTop: 18, maxWidth: 680 }}>{mk.bio}</div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 14, marginTop: 24 }}>
          {mkStats.map((s, i) => (
            <div key={i} style={{ background: 'var(--panel)', borderRadius: 16, padding: 18 }}>
              <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '.8px', color: 'var(--faint)' }}>{s.label}</div>
              <div style={{ font: "700 26px 'Inter',sans-serif", color: 'var(--text)', marginTop: 8, letterSpacing: '-1px' }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
          <div style={{ background: 'var(--panel)', borderRadius: 16, padding: 22 }}>
            <div style={{ font: "600 12px 'Inter',sans-serif", color: 'var(--text)', marginBottom: 16 }}>Audience</div>
            <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '.6px', color: 'var(--faint)', marginBottom: 7 }}>RÉPARTITION</div>
            <div style={{ display: 'flex', height: 10, borderRadius: 6, overflow: 'hidden', background: 'var(--hair)' }}>
              <div style={{ width: fem + '%', background: 'var(--signal)' }} />
              <div style={{ width: (100 - fem) + '%', background: 'var(--muted)' }} />
            </div>
            <div style={{ font: "500 11px 'Inter',sans-serif", color: 'var(--muted)', marginTop: 8 }}>{mk.gender}</div>
            <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '.6px', color: 'var(--faint)', margin: '16px 0 6px' }}>ÂGE DOMINANT</div>
            <div style={{ font: "600 14px 'Inter',sans-serif", color: 'var(--text)' }}>{mk.age} · {mk.agePct}</div>
            <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '.6px', color: 'var(--faint)', margin: '16px 0 8px' }}>TOP LOCALISATIONS</div>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              {mkGeo.map((g, i) => (
                <span key={i} style={{ font: "600 10px 'Inter',sans-serif", color: 'var(--text)', background: 'var(--surface)', border: '1px solid var(--hair)', padding: '6px 12px', borderRadius: 20 }}>{g}</span>
              ))}
            </div>
          </div>
          <div style={{ background: 'var(--panel)', borderRadius: 16, padding: 22 }}>
            <div style={{ font: "600 12px 'Inter',sans-serif", color: 'var(--text)', marginBottom: 10 }}>Formats &amp; tarifs</div>
            {mkFormats.map((f, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--hair)' }}>
                <span style={{ font: "500 12px 'Inter',sans-serif", color: 'var(--text)' }}>{f.label}</span>
                <span style={{ font: "700 13px 'Inter',sans-serif", color: 'var(--text)' }}>{f.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 16, background: 'var(--panel)', borderRadius: 16, padding: 22 }}>
          <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '.6px', color: 'var(--faint)', marginBottom: 10 }}>ILS ONT COLLABORÉ AVEC {mk.fn}</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {mkBrands.map((b, i) => (
              <span key={i} style={{ font: "600 12px 'Inter',sans-serif", color: 'var(--text)', background: 'var(--surface)', border: '1px solid var(--hair)', padding: '9px 16px', borderRadius: 11 }}>{b}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 22, paddingTop: 18, borderTop: '1px solid var(--hair)', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ font: "500 11px 'Inter',sans-serif", color: 'var(--faint)' }}>Contact agence · Marc Delaune — direction@ttp-agency.fr · Lyon, France</div>
          <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '.6px', color: 'var(--signaltext)' }}>TRUST THE PROCESS</div>
        </div>
      </div>
    </>
  )
}
