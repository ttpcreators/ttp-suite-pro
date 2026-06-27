import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { invStatus, chipStyle, dotStyle } from '../utils/helpers.jsx'

const COLS = '1fr 2.2fr 1.3fr 1fr 1.2fr 1.5fr'

// Génère un document de facture (data-URL HTML) pour aperçu / téléchargement.
function invoiceDataUrl(v, statusLabel) {
  const html =
    '<!doctype html><html><head><meta charset="utf-8"><title>Facture ' + v.ref + '</title></head>' +
    '<body style="font-family:Inter,Arial,sans-serif;max-width:620px;margin:48px auto;color:#181D25;padding:0 24px">' +
    '<div style="display:flex;justify-content:space-between;align-items:flex-start">' +
    '<div><div style="font-size:22px;font-weight:700">TTP Agency</div>' +
    '<div style="color:#9AA6B4;font-size:12px;margin-top:4px">Trust the Process</div></div>' +
    '<div style="text-align:right"><div style="font-size:15px;font-weight:600">FACTURE</div>' +
    '<div style="color:#9AA6B4;font-size:13px;margin-top:4px">#' + v.ref + '</div></div></div>' +
    '<hr style="border:none;border-top:1px solid #EAECEF;margin:28px 0">' +
    '<table style="width:100%;border-collapse:collapse;font-size:13px">' +
    '<tr><td style="color:#9AA6B4;padding:8px 0">Client</td><td style="text-align:right;font-weight:600">' + v.party + '</td></tr>' +
    '<tr><td style="color:#9AA6B4;padding:8px 0">Échéance</td><td style="text-align:right">' + v.date + '</td></tr>' +
    '<tr><td style="color:#9AA6B4;padding:8px 0">Statut</td><td style="text-align:right">' + statusLabel + '</td></tr></table>' +
    '<hr style="border:none;border-top:1px solid #EAECEF;margin:20px 0">' +
    '<div style="display:flex;justify-content:space-between;align-items:center">' +
    '<div style="font-size:14px;font-weight:600">Total</div>' +
    '<div style="font-size:24px;font-weight:700">' + v.amount + '</div></div>' +
    '<p style="margin-top:48px;color:#9AA6B4;font-size:11px">Document généré par TTP Suite — démonstration.</p>' +
    '</body></html>'
  return 'data:text/html;charset=utf-8,' + encodeURIComponent(html)
}

// KPIs en haut (indicatifs, portés du design)
const KPIS = [
  { label: 'FACTURÉ · JUIN', value: '138 400 €' },
  { label: 'ENCAISSÉ', value: '96 700 €', sub: '▲ 70%', subColor: 'var(--signaltext)' },
  { label: 'EN ATTENTE', value: '66 200 €', sub: '5 factures', subColor: 'var(--indigo)' },
  { label: 'EN RETARD', value: '18 000 €', sub: 'à relancer', subColor: 'var(--indigo)' },
]

const actionBtnStyle = {
  width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center',
  borderRadius: 7, cursor: 'pointer', color: 'var(--muted)', font: "600 12px 'Inter',sans-serif",
  border: '1px solid var(--hair)', textDecoration: 'none', boxSizing: 'border-box',
}

const TAX_ROWS = [
  { label: 'TVA collectée (20%)', value: '27 680 €' },
  { label: 'TVA déductible', value: '− 4 120 €' },
]
const CHARGE_ROWS = [
  { label: 'Cotisations URSSAF (est.)', value: '8 900 €' },
  { label: 'Acompte IS', value: '6 400 €' },
]
const DEADLINES = [
  { d: '05', m: 'JUIL', title: 'Cotisations URSSAF', sub: 'Charges sociales · mensuel', tag: 'À VENIR', soon: true },
  { d: '15', m: 'JUIL', title: 'Déclaration TVA — CA3', sub: '23 560 € à reverser', tag: 'À VENIR', soon: true },
  { d: '15', m: 'SEPT', title: '2ᵉ acompte IS', sub: 'Impôt sur les sociétés', tag: 'PLANIFIÉ', soon: false },
  { d: '31', m: 'JANV', title: 'DAS2 — honoraires', sub: 'Reversements créateurs · annuel', tag: 'ANNUEL', soon: false },
]

export default function Facturation() {
  const { invoices, setInvoices, removeFrom } = useApp()
  const removeInvoice = removeFrom(setInvoices)
  const [previewDoc, setPreviewDoc] = useState(null)
  const [copied, setCopied] = useState(null)

  const del = (v) => { if (window.confirm('Supprimer la facture ' + v.ref + ' ?')) removeInvoice(v) }

  const share = (v) => {
    const txt = 'Facture ' + v.ref + ' — ' + v.party + ' — ' + v.amount + ' (échéance ' + v.date + ')'
    if (navigator.share) {
      navigator.share({ title: 'Facture ' + v.ref, text: txt }).catch(() => {})
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(txt)
      setCopied(v.ref)
      setTimeout(() => setCopied((c) => (c === v.ref ? null : c)), 1500)
    } else {
      window.alert(txt)
    }
  }

  return (
    <>
      <PageHeader title="Facturation" crumbs={['Agence', 'Juin 2026']}
        action={
          <div style={{ padding: '11px 16px', borderRadius: 13, background: 'var(--signal)', color: 'var(--onsignal)', font: "600 10px 'Inter',sans-serif", cursor: 'pointer' }}>+ NOUVELLE FACTURE</div>
        } />

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 16 }}>
        {KPIS.map((k) => (
          <div key={k.label} style={{ background: 'var(--surface)', borderRadius: 18, padding: 18 }}>
            <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: 1, color: 'var(--faint)' }}>{k.label}</div>
            <div style={{ font: "700 23px 'Inter',sans-serif", color: 'var(--text)', marginTop: 9, letterSpacing: '-1px', whiteSpace: 'nowrap' }}>{k.value}</div>
            {k.sub && <div style={{ font: "600 10px 'Inter',sans-serif", color: k.subColor, marginTop: 5 }}>{k.sub}</div>}
          </div>
        ))}
      </div>

      {/* Tableau des factures */}
      <div style={{ background: 'var(--surface)', borderRadius: 20, padding: '8px 8px 6px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: COLS, gap: 12, padding: '12px 16px', font: "600 9px 'Inter',sans-serif", letterSpacing: 1, color: 'var(--faint)' }}>
          <span>RÉF.</span>
          <span>MARQUE × CRÉATEUR</span>
          <span style={{ textAlign: 'right' }}>MONTANT</span>
          <span style={{ textAlign: 'center' }}>ÉCHÉANCE</span>
          <span style={{ textAlign: 'right' }}>STATUT</span>
          <span style={{ textAlign: 'right' }}>ACTIONS</span>
        </div>
        {invoices.map((v, i) => {
          const st = invStatus(v.status)
          const url = invoiceDataUrl(v, st.label)
          const filename = 'facture-' + v.ref + '.html'
          return (
            <div key={v.ref || i} style={{ display: 'grid', gridTemplateColumns: COLS, gap: 12, alignItems: 'center', padding: '13px 16px', borderRadius: 12 }}>
              <span style={{ font: "500 11px 'Inter',sans-serif", color: 'var(--faint)' }}>#{v.ref}</span>
              <span style={{ font: "500 12px 'Inter',sans-serif", color: 'var(--text)' }}>{v.party}</span>
              <span style={{ font: "600 13px 'Inter',sans-serif", color: 'var(--text)', textAlign: 'right' }}>{v.amount}</span>
              <span style={{ font: "500 11px 'Inter',sans-serif", color: 'var(--muted)', textAlign: 'center' }}>{v.date}</span>
              <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <span style={chipStyle}><span style={dotStyle(st.tone)} />{st.label}</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                <span onClick={() => setPreviewDoc({ name: 'Facture ' + v.ref, url, filename })} title="Aperçu de la facture" style={actionBtnStyle}>◉</span>
                <a href={url} download={filename} title="Télécharger la facture" style={{ ...actionBtnStyle, font: "600 13px 'Inter',sans-serif" }}>↓</a>
                <span onClick={() => share(v)} title={copied === v.ref ? 'Copié ✓' : 'Partager la facture'} style={actionBtnStyle}>{copied === v.ref ? '✓' : '⤴'}</span>
                <span onClick={() => del(v)} title="Supprimer la facture" style={{ ...actionBtnStyle, color: 'var(--faint)' }}>✕</span>
              </span>
            </div>
          )
        })}
      </div>

      {/* À déclarer & provisionner / Échéances déclaratives */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 16, marginTop: 16 }}>
        <div style={{ background: 'var(--surface)', borderRadius: 20, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
            <div style={{ font: "600 13px 'Inter',sans-serif", color: 'var(--text)' }}>À déclarer &amp; provisionner</div>
            <span style={{ font: "600 8px 'Inter',sans-serif", letterSpacing: '.6px', color: 'var(--faint)', background: 'var(--panel)', padding: '4px 9px', borderRadius: 20 }}>JUIN 2026 · INDICATIF</span>
          </div>
          <div style={{ font: "400 11px 'Inter',sans-serif", color: 'var(--muted)', marginBottom: 16 }}>Estimation à mettre de côté avant les échéances fiscales et sociales.</div>
          {TAX_ROWS.map((r) => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid var(--hair)' }}>
              <span style={{ font: "500 12px 'Inter',sans-serif", color: 'var(--muted)' }}>{r.label}</span>
              <span style={{ font: "600 12px 'Inter',sans-serif", color: 'var(--text)' }}>{r.value}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 14px', margin: '8px 0', borderRadius: 11, background: 'var(--signalsoft)' }}>
            <span style={{ font: "600 12px 'Inter',sans-serif", color: 'var(--signaltext)' }}>TVA à reverser (CA3)</span>
            <span style={{ font: "700 14px 'Inter',sans-serif", color: 'var(--signaltext)' }}>23 560 €</span>
          </div>
          {CHARGE_ROWS.map((r, i) => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', ...(i < CHARGE_ROWS.length - 1 ? { borderBottom: '1px solid var(--hair)' } : {}) }}>
              <span style={{ font: "500 12px 'Inter',sans-serif", color: 'var(--muted)' }}>{r.label}</span>
              <span style={{ font: "600 12px 'Inter',sans-serif", color: 'var(--text)' }}>{r.value}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 16, borderTop: '1px solid var(--hair)' }}>
            <span style={{ font: "600 13px 'Inter',sans-serif", color: 'var(--text)' }}>Total à provisionner</span>
            <span style={{ font: "700 24px 'Inter',sans-serif", color: 'var(--text)', letterSpacing: '-1px' }}>38 860 €</span>
          </div>
        </div>

        <div style={{ background: 'var(--surface)', borderRadius: 20, padding: 24 }}>
          <div style={{ font: "600 13px 'Inter',sans-serif", color: 'var(--text)', marginBottom: 16 }}>Échéances déclaratives</div>
          {DEADLINES.map((e, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '11px 0', ...(i < DEADLINES.length - 1 ? { borderBottom: '1px solid var(--hair)' } : {}) }}>
              <div style={{ width: 46, flexShrink: 0, textAlign: 'center', background: 'var(--panel)', borderRadius: 10, padding: '8px 0' }}>
                <div style={{ font: "700 14px 'Inter',sans-serif", color: 'var(--text)', lineHeight: 1 }}>{e.d}</div>
                <div style={{ font: "600 8px 'Inter',sans-serif", color: 'var(--faint)', marginTop: 2 }}>{e.m}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: "600 12px 'Inter',sans-serif", color: 'var(--text)' }}>{e.title}</div>
                <div style={{ font: "400 10px 'Inter',sans-serif", color: 'var(--faint)', marginTop: 2 }}>{e.sub}</div>
              </div>
              <span style={{ font: "600 8px 'Inter',sans-serif", letterSpacing: '.5px', padding: '4px 9px', borderRadius: 20, whiteSpace: 'nowrap', ...(e.soon ? { color: 'var(--signaltext)', background: 'var(--signalsoft)' } : { color: 'var(--muted)', background: 'var(--panel)' }) }}>{e.tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modale d'aperçu */}
      {previewDoc && (
        <div onClick={() => setPreviewDoc(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(10,12,16,.55)', zIndex: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
          <div onClick={(e) => e.stopPropagation()}
            style={{ width: 'min(880px,92vw)', height: '86vh', background: 'var(--surface)', borderRadius: 18, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 60px rgba(0,0,0,.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: '1px solid var(--hair)' }}>
              <div style={{ font: "600 9px 'Inter',sans-serif", letterSpacing: '.6px', color: 'var(--signaltext)', padding: '5px 10px', borderRadius: 20, background: 'var(--signalsoft)', whiteSpace: 'nowrap' }}>APERÇU</div>
              <div style={{ flex: 1, minWidth: 0, font: "600 13px 'Inter',sans-serif", color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{previewDoc.name}</div>
              <a href={previewDoc.url} target="_blank" rel="noopener"
                style={{ padding: '9px 14px', borderRadius: 10, border: '1px solid var(--hair)', color: 'var(--text)', font: "600 9px 'Inter',sans-serif", textDecoration: 'none', whiteSpace: 'nowrap' }}>↗ OUVRIR DANS UN ONGLET</a>
              <a href={previewDoc.url} download={previewDoc.filename}
                style={{ padding: '9px 14px', borderRadius: 10, background: 'var(--signal)', color: 'var(--onsignal)', font: "600 9px 'Inter',sans-serif", textDecoration: 'none', whiteSpace: 'nowrap' }}>↓ TÉLÉCHARGER</a>
              <div onClick={() => setPreviewDoc(null)} style={{ font: "600 16px 'Inter',sans-serif", color: 'var(--faint)', cursor: 'pointer', padding: '0 4px' }}>✕</div>
            </div>
            <div style={{ flex: 1, background: 'var(--panel)', minHeight: 0 }}>
              <iframe src={previewDoc.url} title={previewDoc.name} style={{ width: '100%', height: '100%', border: 'none', background: '#fff' }} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
