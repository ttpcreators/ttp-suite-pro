import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'

// ============ CONTRATS (GÉNÉRATEUR) ============
// Migré depuis template.html (section CONTRATS) + app.js (renderVals : ctType, ctCreator,
// ctBrand, ctValue, ctCommission, ctDuration, ctDeliverables, ctExcl, ctBank, customBanks,
// ctUseCompany, ctCoName/Siret/Vat/Addr, showBankForm/nb). Tout l'état d'UI est local.

const labelStyle = { font: "600 9px 'Inter',sans-serif", letterSpacing: '.8px', color: 'var(--faint)' }
const inputStyle = {
  width: '100%', padding: '11px 14px', borderRadius: 11, border: '1px solid var(--hair)',
  background: 'var(--panel)', color: 'var(--text)', font: "500 12px 'Inter',sans-serif", outline: 'none',
  boxSizing: 'border-box',
}

export default function Contrats() {
  const { creators, seed } = useApp()

  // ----- État local du générateur -----
  const [ctType, setCtType] = useState('marque') // 'marque' | 'repr' | 'ugc'
  const [ctCreator, setCtCreator] = useState(0)
  const [ctBrand, setCtBrand] = useState('')
  const [ctValue, setCtValue] = useState('')
  const [ctCommission, setCtCommission] = useState('')
  const [ctDuration, setCtDuration] = useState('')
  const [ctDeliverables, setCtDeliverables] = useState('')
  const [ctExcl, setCtExcl] = useState(false)
  const [ctBank, setCtBank] = useState(0)
  const [customBanks, setCustomBanks] = useState([])
  const [showBankForm, setShowBankForm] = useState(false)
  const [nb, setNb] = useState({ label: '', iban: '', bic: '' })
  const [ctUseCompany, setCtUseCompany] = useState(false)
  const [ctCoName, setCtCoName] = useState('')
  const [ctCoSiret, setCtCoSiret] = useState('')
  const [ctCoVat, setCtCoVat] = useState('')
  const [ctCoAddr, setCtCoAddr] = useState('')

  // ----- View-model (porté de renderVals) -----
  const ctt = ctType
  const ctcr = creators[ctCreator] || creators[0]
  const ctName = ctcr.name
  const ctExclLabel = ctExcl ? 'Oui · 30 jours' : 'Non'
  const allBanks = seed.bankAccounts.concat(customBanks)
  const ctBankSel = allBanks[ctBank] || allBanks[0]
  const coLine = ctUseCompany
    ? (' Facturation via ' + (ctCoName || '[Société]') + (ctCoSiret ? ' (SIRET ' + ctCoSiret + ')' : '') + (ctCoVat ? ', TVA ' + ctCoVat : '') + (ctCoAddr ? ', ' + ctCoAddr : '') + '.')
    : ''

  const ctTitle = ctt === 'marque'
    ? 'Contrat de partenariat commercial'
    : (ctt === 'repr' ? 'Contrat de représentation' : 'Cession de droits — UGC')

  const ctTypeLabel = ctt === 'marque' ? 'MARQUE × CRÉATEUR' : (ctt === 'repr' ? 'AGENCE × CRÉATEUR' : 'CONTRAT UGC')
  const ctIsBrand = ctt !== 'repr'
  const ctIsRepr = ctt === 'repr'

  const payTerms = [
    { l: 'Compte de réception', v: ctBankSel.bank },
    { l: 'IBAN', v: ctBankSel.iban },
    { l: 'Modalités', v: 'Virement · 30 j fin de mois' },
    { l: 'TVA', v: ctUseCompany ? (ctCoVat ? ('Assujettie · ' + ctCoVat) : '20% (autoliquidation UE)') : 'Non assujetti (art. 293 B CGI)' },
  ]

  let ctParties, ctTerms
  if (ctt === 'marque') {
    ctParties = 'ENTRE ' + (ctBrand || '[Annonceur]') + ' (l’Annonceur) ET ' + ctName + ', représenté(e) par TTP Agency (l’Agent).' + coLine
    ctTerms = [
      { l: 'Objet', v: 'Campagne ' + (ctBrand || '—') },
      { l: 'Livrables', v: ctDeliverables || '—' },
      { l: 'Montant', v: ctValue || '—' },
      { l: 'Exclusivité', v: ctExclLabel },
      { l: 'Durée', v: ctDuration || '—' },
      { l: 'Commission TTP', v: '20% du montant' },
    ].concat(payTerms)
  } else if (ctt === 'repr') {
    ctParties = 'ENTRE ' + ctName + ' (le Créateur) ET TTP Agency (l’Agent), pour la gestion de sa carrière.' + coLine
    ctTerms = [
      { l: 'Objet', v: 'Représentation exclusive' },
      { l: 'Commission', v: (ctCommission || '20') + '%' },
      { l: 'Exclusivité', v: ctExclLabel },
      { l: 'Durée', v: ctDuration || '—' },
      { l: 'Périmètre', v: 'Négo · contrats · facturation' },
    ].concat(payTerms)
  } else {
    ctParties = 'ENTRE ' + (ctBrand || '[Client]') + ' (le Client) ET ' + ctName + ' (Créateur UGC), via TTP Agency.' + coLine
    ctTerms = [
      { l: 'Objet', v: 'Contenus UGC pour ' + (ctBrand || '—') },
      { l: 'Livrables', v: ctDeliverables || '—' },
      { l: 'Montant', v: ctValue || '—' },
      { l: 'Cession de droits', v: '12 mois · paid media' },
      { l: 'Exclusivité', v: ctExclLabel },
      { l: 'Durée', v: ctDuration || '—' },
    ].concat(payTerms)
  }

  const ctClauses = [
    { title: 'Art. 1 — Objet', body: 'Le présent contrat définit les conditions de la prestation et les engagements réciproques des parties.' },
    { title: 'Art. 2 — Rémunération & paiement', body: 'Les sommes sont versées par virement sur le compte ' + ctBankSel.bank + ' (IBAN ' + ctBankSel.iban + '), à 30 jours. Tout retard entraîne des pénalités au taux BCE + 10 pts et une indemnité forfaitaire de 40 € (art. L441-10 C. com.).' },
    { title: 'Art. 3 — Propriété intellectuelle', body: 'La cession des droits d’exploitation est limitée aux supports, territoires et durée stipulés. Toute réutilisation hors périmètre fait l’objet d’un avenant.' },
    { title: 'Art. 4 — Données personnelles (RGPD)', body: 'Les parties traitent les données conformément au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique et Libertés. Finalité limitée à l’exécution du contrat.' },
    { title: 'Art. 5 — Transparence publicitaire', body: 'Tout contenu sponsorisé est identifié comme tel (« Publicité » / « Partenariat rémunéré »), conformément aux lignes directrices ARPP et au droit de la consommation UE.' },
    { title: 'Art. 6 — Droit de rétractation', body: 'Conformément à la Directive 2011/83/UE, un délai de rétractation de 14 jours s’applique sauf renonciation expresse pour exécution immédiate.' },
    { title: 'Art. 7 — Confidentialité & résiliation', body: 'Obligation de confidentialité réciproque. Résiliation possible pour manquement grave après mise en demeure restée infructueuse sous 15 jours.' },
    { title: 'Art. 8 — Droit applicable & litiges', body: 'Contrat régi par le droit français. À défaut d’accord amiable (médiation préalable), compétence exclusive des tribunaux de Lyon.' },
  ]

  const typeChips = [['marque', 'Marque × Créateur'], ['repr', 'Représentation'], ['ugc', 'Contrat UGC']]
  const typeChipStyle = (k) => ({
    padding: '10px 15px', borderRadius: 11, font: "600 10px 'Inter',sans-serif", cursor: 'pointer', whiteSpace: 'nowrap',
    ...(k === ctt ? { background: 'var(--text)', color: 'var(--bg)' } : { border: '1px solid var(--hair)', color: 'var(--muted)' }),
  })
  const creatorChipStyle = (i) => ({
    padding: '7px 12px', borderRadius: 18, font: "600 9px 'Inter',sans-serif", cursor: 'pointer',
    ...(i === ctCreator ? { background: 'var(--signal)', color: 'var(--onsignal)' } : { background: 'var(--rowhover)', color: 'var(--muted)' }),
  })
  const bankChipStyle = (i) => ({
    flex: 1, minWidth: 120, padding: '10px 13px', borderRadius: 11, font: "600 9px 'Inter',sans-serif", cursor: 'pointer', lineHeight: 1.4,
    ...(i === ctBank ? { background: 'var(--text)', color: 'var(--bg)' } : { border: '1px solid var(--hair)', color: 'var(--muted)' }),
  })
  const ctExclStyle = {
    display: 'flex', alignItems: 'center', gap: 8, padding: '11px 14px', borderRadius: 11, cursor: 'pointer', font: "600 11px 'Inter',sans-serif",
    ...(ctExcl ? { background: 'var(--signalsoft)', color: 'var(--signaltext)' } : { border: '1px solid var(--hair)', color: 'var(--muted)' }),
  }
  const ctCompanyToggleStyle = {
    padding: '7px 16px', borderRadius: 18, font: "600 9px 'Inter',sans-serif", cursor: 'pointer',
    ...(ctUseCompany ? { background: 'var(--signal)', color: 'var(--onsignal)' } : { border: '1px solid var(--hair)', color: 'var(--muted)' }),
  }

  const addBank = () => {
    if (!nb.label && !nb.iban) return
    const cb = customBanks.concat([{ label: nb.label || 'Nouvelle banque', bank: nb.label || 'Banque', iban: nb.iban || '—', bic: nb.bic || '' }])
    setCustomBanks(cb)
    setCtBank(seed.bankAccounts.length + cb.length - 1)
    setShowBankForm(false)
    setNb({ label: '', iban: '', bic: '' })
  }

  return (
    <>
      <div style={{ marginBottom: 22 }}>
        <div style={{ font: "500 46px 'Inter',sans-serif", letterSpacing: '-2px', color: 'var(--text)' }}>Contrats</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 10, font: "500 12px 'Inter',sans-serif", color: 'var(--faint)' }}>
          <span>Agence</span><span>›</span><span style={{ color: 'var(--text)' }}>Générateur de contrats</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 16, alignItems: 'start' }}>
        {/* ----- Formulaire ----- */}
        <div style={{ background: 'var(--surface)', borderRadius: 20, padding: 22 }}>
          <div style={{ ...labelStyle, marginBottom: 8 }}>TYPE DE CONTRAT</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {typeChips.map(([k, l]) => (
              <div key={k} onClick={() => setCtType(k)} style={typeChipStyle(k)}>{l}</div>
            ))}
          </div>

          <div style={{ ...labelStyle, margin: '18px 0 8px' }}>CRÉATEUR</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {creators.map((c, i) => (
              <div key={c.id || i} onClick={() => setCtCreator(i)} style={creatorChipStyle(i)}>{c.name.split(' ')[0]}</div>
            ))}
          </div>

          {ctIsBrand && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 18 }}>
                <div>
                  <div style={{ ...labelStyle, marginBottom: 6 }}>MARQUE</div>
                  <input value={ctBrand} onChange={(e) => setCtBrand(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <div style={{ ...labelStyle, marginBottom: 6 }}>MONTANT</div>
                  <input value={ctValue} onChange={(e) => setCtValue(e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <div style={{ ...labelStyle, marginBottom: 6 }}>LIVRABLES</div>
                <input value={ctDeliverables} onChange={(e) => setCtDeliverables(e.target.value)} style={inputStyle} />
              </div>
            </>
          )}

          {ctIsRepr && (
            <div style={{ marginTop: 18 }}>
              <div style={{ ...labelStyle, marginBottom: 6 }}>COMMISSION (%)</div>
              <input value={ctCommission} onChange={(e) => setCtCommission(e.target.value)} type="number" style={inputStyle} />
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12, alignItems: 'end' }}>
            <div>
              <div style={{ ...labelStyle, marginBottom: 6 }}>DURÉE</div>
              <input value={ctDuration} onChange={(e) => setCtDuration(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <div style={{ ...labelStyle, marginBottom: 6 }}>EXCLUSIVITÉ</div>
              <div onClick={() => setCtExcl((v) => !v)} style={ctExclStyle}>{ctExclLabel}</div>
            </div>
          </div>

          <div style={{ ...labelStyle, margin: '18px 0 8px' }}>COMPTE DE RÉCEPTION DES VIREMENTS</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {allBanks.map((b, i) => (
              <div key={i} onClick={() => setCtBank(i)} style={bankChipStyle(i)}>
                {b.label}
                <div style={{ font: "500 8px 'Inter',sans-serif", opacity: 0.65, marginTop: 3 }}>{b.iban.slice(0, 14) + '…'}</div>
              </div>
            ))}
          </div>
          <div onClick={() => setShowBankForm((v) => !v)} style={{ display: 'inline-block', marginTop: 10, padding: '8px 13px', borderRadius: 10, border: '1px dashed var(--hair)', color: 'var(--text)', font: "600 9px 'Inter',sans-serif", cursor: 'pointer' }}>+ AJOUTER / CRÉER UNE BANQUE</div>

          {showBankForm && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12, padding: 14, background: 'var(--panel)', borderRadius: 14 }}>
              <div style={{ gridColumn: 'span 2' }}>
                <div style={{ ...labelStyle, marginBottom: 6 }}>NOM DU COMPTE / BANQUE</div>
                <input value={nb.label} onChange={(e) => setNb((s) => ({ ...s, label: e.target.value }))} placeholder="Ex. Compte pro — Revolut" style={{ ...inputStyle, background: 'var(--surface)' }} />
              </div>
              <div>
                <div style={{ ...labelStyle, marginBottom: 6 }}>IBAN</div>
                <input value={nb.iban} onChange={(e) => setNb((s) => ({ ...s, iban: e.target.value }))} placeholder="FR76 …" style={{ ...inputStyle, background: 'var(--surface)' }} />
              </div>
              <div>
                <div style={{ ...labelStyle, marginBottom: 6 }}>BIC</div>
                <input value={nb.bic} onChange={(e) => setNb((s) => ({ ...s, bic: e.target.value }))} placeholder="—" style={{ ...inputStyle, background: 'var(--surface)' }} />
              </div>
              <div onClick={addBank} style={{ gridColumn: 'span 2', textAlign: 'center', padding: '11px 0', borderRadius: 11, background: 'var(--signal)', color: 'var(--onsignal)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}>AJOUTER LE COMPTE</div>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18 }}>
            <div style={labelStyle}>FACTURÉ VIA UNE SOCIÉTÉ</div>
            <div onClick={() => setCtUseCompany((v) => !v)} style={ctCompanyToggleStyle}>{ctUseCompany ? 'OUI' : 'NON'}</div>
          </div>

          {ctUseCompany && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
              <div>
                <div style={{ ...labelStyle, marginBottom: 6 }}>RAISON SOCIALE</div>
                <input value={ctCoName} onChange={(e) => setCtCoName(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <div style={{ ...labelStyle, marginBottom: 6 }}>SIRET</div>
                <input value={ctCoSiret} onChange={(e) => setCtCoSiret(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <div style={{ ...labelStyle, marginBottom: 6 }}>N° TVA INTRACOM.</div>
                <input value={ctCoVat} onChange={(e) => setCtCoVat(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <div style={{ ...labelStyle, marginBottom: 6 }}>ADRESSE SIÈGE</div>
                <input value={ctCoAddr} onChange={(e) => setCtCoAddr(e.target.value)} style={inputStyle} />
              </div>
            </div>
          )}
        </div>

        {/* ----- Aperçu du contrat ----- */}
        <div style={{ background: 'var(--surface)', borderRadius: 20, padding: 30, border: '1px solid var(--hair)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 18, borderBottom: '1px solid var(--hair)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: '#14181E', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/cover.png" alt="TTP" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ font: "700 12px 'Inter',sans-serif", color: 'var(--text)' }}>TTP AGENCY</div>
                <div style={{ font: "400 9px 'Inter',sans-serif", color: 'var(--faint)' }}>Lyon · France</div>
              </div>
            </div>
            <div style={{ font: "600 9px 'Inter',sans-serif", color: 'var(--faint)' }}>RÉF. TTP-2026-091</div>
          </div>

          <div style={{ font: "600 10px 'Inter',sans-serif", letterSpacing: '1px', color: 'var(--signaltext)', marginTop: 22 }}>{ctTypeLabel}</div>
          <div style={{ font: "600 22px 'Inter',sans-serif", color: 'var(--text)', marginTop: 8, letterSpacing: '-0.5px' }}>{ctTitle}</div>
          <div style={{ font: "400 12px 'Inter',sans-serif", color: 'var(--muted)', marginTop: 12, lineHeight: 1.6 }}>{ctParties}</div>

          <div style={{ height: 1, background: 'var(--hair)', margin: '18px 0' }} />

          {ctTerms.map((t, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '9px 0', borderBottom: '1px solid var(--hair)' }}>
              <span style={{ font: "500 12px 'Inter',sans-serif", color: 'var(--muted)' }}>{t.l}</span>
              <span style={{ font: "600 12px 'Inter',sans-serif", color: 'var(--text)', textAlign: 'right' }}>{t.v}</span>
            </div>
          ))}

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 11px', borderRadius: 20, background: 'var(--signalsoft)', marginTop: 18, marginBottom: 10, alignSelf: 'flex-start' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--signal)' }} />
            <span style={{ font: "600 8px 'Inter',sans-serif", letterSpacing: '.5px', color: 'var(--signaltext)' }}>CONFORME RGPD · DIR. 2011/83/UE · DROIT FR</span>
          </div>

          {ctClauses.map((c, i) => (
            <div key={i} style={{ marginBottom: 11 }}>
              <div style={{ font: "600 10px 'Inter',sans-serif", color: 'var(--text)' }}>{c.title}</div>
              <div style={{ font: "400 10px 'Inter',sans-serif", color: 'var(--muted)', marginTop: 3, lineHeight: 1.55 }}>{c.body}</div>
            </div>
          ))}

          <div style={{ display: 'flex', gap: 18, marginTop: 18 }}>
            <div style={{ flex: 1 }}>
              <div style={{ height: 34, borderBottom: '1px solid var(--hair)' }} />
              <div style={{ font: "500 10px 'Inter',sans-serif", color: 'var(--faint)', marginTop: 6 }}>Pour TTP Agency</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ height: 34, borderBottom: '1px solid var(--hair)' }} />
              <div style={{ font: "500 10px 'Inter',sans-serif", color: 'var(--faint)', marginTop: 6 }}>Pour {ctName}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
            <div style={{ flex: 1, padding: '12px 0', textAlign: 'center', borderRadius: 12, background: 'var(--signal)', color: 'var(--onsignal)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}>GÉNÉRER LE PDF</div>
            <div style={{ flex: 1, padding: '12px 0', textAlign: 'center', borderRadius: 12, border: '1px solid var(--hair)', color: 'var(--text)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}>ENVOYER POUR SIGNATURE</div>
          </div>
        </div>
      </div>
    </>
  )
}
