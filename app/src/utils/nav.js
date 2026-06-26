export const NAV_SECTIONS = [
  { title: 'APERÇU', items: [['apercu', 'Dashboard'], ['objectifs', 'Objectifs']] },
  { title: 'CRÉATEURS', items: [['roster', 'Roster'], ['engagement', 'Engagement'], ['pricing', 'Pricing'], ['briefs', 'Briefs'], ['todo', 'To-do'], ['documents', 'Documents'], ['mediakit', 'Media kit']] },
  { title: 'AGENCE', items: [['messages', 'Messages'], ['contacts', 'Contacts'], ['planning', 'Planning'], ['contrats', 'Contrats'], ['facturation', 'Facturation'], ['checklist', 'Checklist']] },
  { title: 'OUTILS', items: [['prospection', 'Prospection'], ['alertes', 'Alertes'], ['idees', 'Idées'], ['debrief', 'Debrief'], ['templates', 'Templates']] },
]
// clé de vue -> chemin de route
export const path = (key) => '/' + key
