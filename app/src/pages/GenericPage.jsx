import PageHeader from '../components/PageHeader.jsx'

export default function GenericPage({ title, sub }) {
  return (
    <>
      <PageHeader title={title} crumbs={sub ? ['TTP', sub] : []} />
      <div style={{ background: 'var(--surface)', borderRadius: 20, padding: 40, textAlign: 'center', color: 'var(--faint)', font: "400 13px 'Inter',sans-serif" }}>
        Vue « {title} » — migration React en cours.
      </div>
    </>
  )
}
