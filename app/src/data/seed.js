// Données de démonstration TTP Suite (portées depuis l'app d'origine).
// Le Roster réel est chargé depuis Supabase (voir AppContext) ; ces données
// servent de valeurs initiales / repli et pour les vues encore en données fixes.

export const rosterRaw = [
  { name: 'CAMILLE ORSINI', handle: '@camille.o', niche: 'Mode', plat: 'Instagram', followers: '540K', reach: '2,1 M', er: '4,8%', ca: '62 400 €', status: 'live', tone: 'signal', trend: 6 },
  { name: 'THÉO RIVIÈRE', handle: '@theogg', niche: 'Gaming', plat: 'Twitch', followers: '1,2M', reach: '3,4 M', er: '6,1%', ca: '54 100 €', status: 'actif', tone: 'indigo', trend: 3 },
  { name: 'LÉNA MARCHAND', handle: '@lena.mrc', niche: 'Lifestyle', plat: 'Instagram', followers: '480K', reach: '1,6 M', er: '5,2%', ca: '38 900 €', status: 'actif', tone: 'cyan', trend: -2 },
  { name: 'INÈS KABORÉ', handle: '@ines.k', niche: 'Beauté', plat: 'TikTok', followers: '320K', reach: '1,2 M', er: '7,3%', ca: '29 700 €', status: 'actif', tone: 'indigo', trend: 5 },
  { name: 'MALO FONTAINE', handle: '@malo.fit', niche: 'Fitness', plat: 'YouTube', followers: '210K', reach: '780 K', er: '5,9%', ca: '21 300 €', status: 'pause', tone: 'cyan', trend: 1 },
  { name: 'JADE NGUYEN', handle: '@jade.eats', niche: 'Food · UGC', plat: 'UGC', followers: '95K', reach: '410 K', er: '8,1%', ca: '12 800 €', status: 'actif', tone: 'signal', trend: 7 },
  { name: 'SACHA DELAUNAY', handle: '@sacha.tech', niche: 'Tech · UGC', plat: 'UGC', followers: '64K', reach: '280 K', er: '9,4%', ca: '8 600 €', status: 'actif', tone: 'indigo', trend: 4 },
  { name: 'NOÉ BERGER', handle: '@noe.travels', niche: 'Voyage', plat: 'Instagram', followers: '175K', reach: '640 K', er: '4,4%', ca: '15 200 €', status: 'pause', tone: 'cyan', trend: -1 },
]

export const pipeRaw = [
  { label: 'Sephora × CAMILLE', amount: '32k', tone: 'indigo' },
  { label: 'Logitech × THÉO', amount: '27k', tone: 'signal' },
  { label: 'Nike × MALO', amount: '24k', tone: 'cyan' },
]

export const todoRaw = [
  { text: 'Relancer RP Sephora (CAMILLE)', tag: 'AGENCE', due: 'Auj.', creator: null },
  { text: 'Valider contrat Nike (MALO)', tag: 'AGENCE', due: 'Auj.', creator: null },
  { text: 'Valider brief créatif Sephora', tag: 'CAMILLE', due: 'Auj.', creator: 'CAMILLE ORSINI' },
  { text: 'Envoyer factures L’Oréal', tag: 'AGENCE', due: '27/06', creator: null },
  { text: 'Choisir tenues shoot Galeries', tag: 'CAMILLE', due: 'Auj.', creator: 'CAMILLE ORSINI' },
  { text: 'Stats reel Dior à transmettre', tag: 'CAMILLE', due: '28/06', creator: 'CAMILLE ORSINI' },
]

export const ideasRaw = [
  { text: 'GRWM été × Sephora — format reel', creator: 'CAMILLE ORSINI', status: 'Validée', source: 'agency' },
  { text: 'Série coulisses tournage en stories', creator: 'CAMILLE ORSINI', status: 'En cours', source: 'agency' },
  { text: 'Setup gaming 2026 — vidéo longue', creator: 'THÉO RIVIÈRE', status: 'À explorer', source: 'agency' },
  { text: 'Test produit en live + code promo', creator: 'INÈS KABORÉ', status: 'À explorer', source: 'creator' },
  { text: 'Collab croisée gaming × lifestyle', creator: null, status: 'À explorer', source: 'agency' },
]

export const briefRaw = [
  { brand: 'Sephora — Collection été', creator: 'CAMILLE ORSINI', deliverables: '3 posts · 1 reel', due: '02/07', status: 'valider', tone: 'indigo', who: 'CAMILLE ORSINI', consignes: 'Mettre en avant la collection été : 3 posts feed (looks complets) + 1 reel tuto make-up. Ton lumineux et naturel, mention @sephorafrance. Validation des visuels 48h avant publication.', budget: '2 200 €', objectif: 'Lancement collection · trafic boutique' },
  { brand: 'Dior Beauty — Gifting', creator: 'CAMILLE ORSINI', deliverables: '2 reels', due: '05/07', status: 'cours', tone: 'cyan', who: 'CAMILLE ORSINI', consignes: '2 reels gifting : déballage produit Dior, première impression spontanée. Mention @diorbeauty + lien en bio. Lumière naturelle.', budget: '1 800 €', objectif: 'Notoriété gamme parfum' },
  { brand: 'Logitech — Setup', creator: 'THÉO RIVIÈRE', deliverables: '1 vidéo · 3 stories', due: '08/07', status: 'cours', tone: 'signal', who: 'THÉO RIVIÈRE', consignes: '1 vidéo YouTube setup gaming (~10 min) + 3 stories teasing. Intégration naturelle du clavier Logitech. Code promo THEO15.', budget: '2 600 €', objectif: 'Ventes · conversion code promo' },
  { brand: 'Nike — Run club', creator: 'MALO FONTAINE', deliverables: '2 reels · 1 post', due: '12/07', status: 'attente', tone: 'indigo', who: 'MALO FONTAINE', consignes: '2 reels running + 1 post engagement autour du Run Club Nike. Énergie, dépassement de soi. Tag @nike + #nikerunclub.', budget: '2 000 €', objectif: 'Communauté · inscriptions Run Club' },
]

export const invoiceRaw = [
  { ref: '2026-084', party: 'Sephora × CAMILLE', amount: '32 000 €', date: '02/07', status: 'attente' },
  { ref: '2026-083', party: 'Logitech × THÉO', amount: '27 500 €', date: '18/06', status: 'payee' },
  { ref: '2026-082', party: 'Galeries Lafayette × LÉNA', amount: '14 500 €', date: '15/06', status: 'payee' },
  { ref: '2026-081', party: "L'Oréal × INÈS", amount: '18 000 €', date: '30/05', status: 'retard' },
  { ref: '2026-080', party: 'Dior Beauty × CAMILLE', amount: '15 900 €', date: '28/06', status: 'attente' },
  { ref: '2026-079', party: 'Nike × MALO', amount: '24 000 €', date: '—', status: 'brouillon' },
]

export const contactRaw = [
  { brand: 'Sephora', person: 'Camille Roux', role: 'Responsable influence', tone: 'indigo', tag: 'Actif', email: 'c.roux@sephora.fr', phone: '+33 6 12 44 88 02', last: '18 juin 2026', deals: '3 deals · 62 000 €' },
  { brand: 'Nike', person: 'Julien Mercier', role: 'Brand partnerships', tone: 'signal', tag: 'Deal en cours', email: 'j.mercier@nike.com', phone: '+33 6 78 21 09 55', last: '24 juin 2026', deals: '1 deal · 24 000 €' },
  { brand: "L'Oréal", person: 'Aïcha Benali', role: 'RP digitale', tone: 'cyan', tag: 'À relancer', email: 'a.benali@loreal.com', phone: '+33 6 33 70 12 41', last: '30 mai 2026', deals: '1 deal · 18 000 €' },
  { brand: 'Logitech', person: 'Tom Vasseur', role: 'Marketing manager', tone: 'indigo', tag: 'Actif', email: 'tom.v@logitech.com', phone: '+33 6 90 55 18 73', last: '12 juin 2026', deals: '2 deals · 55 000 €' },
  { brand: 'Dior Beauty', person: 'Soraya Lefort', role: 'Influence lead', tone: 'signal', tag: 'Gifting', email: 's.lefort@dior.com', phone: '+33 6 24 61 90 30', last: '21 juin 2026', deals: '1 deal · 15 900 €' },
  { brand: 'HelloFresh', person: 'Marc Petit', role: 'Growth', tone: 'cyan', tag: 'Prospection', email: 'm.petit@hellofresh.fr', phone: '+33 6 41 08 27 66', last: 'jamais', deals: 'prospection' },
]

export const objRaw = [
  { name: 'CAMILLE ORSINI', pct: 104, ca: '62 400 €', target: '60 000 €', tone: 'signal' },
  { name: 'THÉO RIVIÈRE', pct: 90, ca: '54 100 €', target: '60 000 €', tone: 'indigo' },
  { name: 'LÉNA MARCHAND', pct: 78, ca: '38 900 €', target: '50 000 €', tone: 'cyan' },
  { name: 'INÈS KABORÉ', pct: 99, ca: '29 700 €', target: '30 000 €', tone: 'indigo' },
]

export const pricingRaw = [
  { format: 'Post Instagram', base: '4 500 €', excl: '+ 30%' },
  { format: 'Reel', base: '6 800 €', excl: '+ 35%' },
  { format: 'Story (x3)', base: '2 400 €', excl: '+ 20%' },
  { format: 'UGC vidéo', base: '1 800 €', excl: '+ 25%' },
  { format: 'YouTube intégration', base: '9 500 €', excl: '+ 40%' },
  { format: 'Pack mensuel', base: '18 000 €', excl: 'sur devis' },
]

export const mediaKitRaw = {
  0: { bio: 'Camille — voix mode & beauté de référence à Lyon. Contenus éditoriaux léchés, audience féminine ultra-engagée et fort taux de conversion sur le luxe accessible.', age: '25–34 ans', agePct: '61%', gender: 'Femmes 78% · Hommes 22%', geo: ['Paris', 'Lyon', 'Genève'], brands: ['Sephora', 'Dior Beauty', 'Sézane', 'Galeries Lafayette'], formats: [{ label: 'Reel Instagram', price: '2 200 €' }, { label: 'Story (×3)', price: '850 €' }, { label: 'Post feed', price: '1 500 €' }, { label: 'Pack campagne', price: '5 500 €' }] },
  1: { bio: 'Théo — créateur gaming & tech, communauté Twitch fidèle et hyper réactive. Idéal pour lancements produit, setups et placements longue durée.', age: '18–24 ans', agePct: '54%', gender: 'Hommes 71% · Femmes 29%', geo: ['Paris', 'Lille', 'Montréal'], brands: ['Logitech', 'Nvidia', 'Red Bull'], formats: [{ label: 'Live sponsorisé', price: '3 000 €' }, { label: 'Vidéo YouTube', price: '2 600 €' }, { label: 'Short', price: '900 €' }, { label: 'Pack stream', price: '7 000 €' }] },
  3: { bio: 'Inès — beauté & skincare sur TikTok, formats courts viraux et démonstrations produit à très fort taux d’engagement.', age: '18–24 ans', agePct: '63%', gender: 'Femmes 84% · Hommes 16%', geo: ['Paris', 'Marseille', 'Abidjan'], brands: ['L’Oréal', 'Garnier', 'The Ordinary'], formats: [{ label: 'Vidéo TikTok', price: '1 400 €' }, { label: 'UGC', price: '700 €' }, { label: 'Story', price: '500 €' }, { label: 'Pack 3 vidéos', price: '3 600 €' }] },
  5: { bio: 'Jade — food & UGC, contenus authentiques pensés pour la performance paid. Excellente conteuse produit.', age: '25–34 ans', agePct: '58%', gender: 'Femmes 66% · Hommes 34%', geo: ['Lyon', 'Paris', 'Bruxelles'], brands: ['HelloFresh', 'Picard', 'Maille'], formats: [{ label: 'Vidéo UGC', price: '650 €' }, { label: 'Pack 3 UGC', price: '1 700 €' }, { label: 'Reel', price: '1 100 €' }, { label: 'Droits paid 6 mois', price: '+40%' }] },
}

export const prospectRaw = [
  { brand: 'HelloFresh', contact: 'Marc Petit', value: '~6 500 €', stage: 'Prospection', tone: 'cyan' },
  { brand: 'Asphalte', contact: 'RP — à trouver', value: '~9 000 €', stage: 'Prospection', tone: 'cyan' },
  { brand: "L'Oréal", contact: 'Aïcha Benali', value: '18 000 €', stage: 'Contact', tone: 'indigo' },
  { brand: 'Nike', contact: 'Julien Mercier', value: '24 000 €', stage: 'Négociation', tone: 'indigo' },
  { brand: 'Sephora', contact: 'Camille Roux', value: '32 000 €', stage: 'Négociation', tone: 'signal' },
  { brand: 'Logitech', contact: 'Tom Vasseur', value: '27 500 €', stage: 'Signé', tone: 'signal' },
]

export const stages = ['Prospection', 'Contact', 'Négociation', 'Signé']

export const eventsRaw = [
  { day: 26, time: '10:00', title: 'Shoot LÉNA × Galeries Lafayette', type: 'shoot', who: 'LÉNA MARCHAND' },
  { day: 26, time: '14:30', title: 'Call Nike — négo MALO', type: 'call', who: 'MALO FONTAINE' },
  { day: 26, time: '17:00', title: 'Live THÉO — Logitech', type: 'collab', who: 'THÉO RIVIÈRE' },
  { day: 27, time: '11:00', title: 'Deadline brief Sephora', type: 'deadline', who: 'CAMILLE ORSINI' },
  { day: 30, time: '14:00', title: 'Tournage reels Dior', type: 'shoot', who: 'CAMILLE ORSINI' },
  { day: 18, time: '09:30', title: 'Réunion équipe agence', type: 'reunion', who: null },
  { day: 23, time: '15:00', title: 'Call découverte HelloFresh', type: 'call', who: null },
  { day: 12, time: '16:00', title: 'Collab JADE × Sephora', type: 'collab', who: 'JADE NGUYEN' },
]

export const eventTypeMap = {
  call: { label: 'Call', tone: 'indigo' }, reunion: { label: 'Réunion', tone: 'cyan' },
  collab: { label: 'Collab', tone: 'signal' }, shoot: { label: 'Shoot', tone: 'indigo' },
  event: { label: 'Event', tone: 'signal' }, voyage: { label: 'Voyage', tone: 'cyan' },
  deadline: { label: 'Deadline', tone: 'cyan' },
}

export const msgsRaw = {
  0: [{ from: 'agency', text: 'Salut Camille ! On a reçu les concepts Sephora.' }, { from: 'agency', text: 'On valide les 3 idées de reels ?' }],
  1: [{ from: 'me', text: "Reçu, je m'en occupe ce soir." }, { from: 'agency', text: 'Parfait, merci 🙌' }],
  2: [{ from: 'agency', text: 'Réunion créateurs vendredi 15h en visio. Présence souhaitée !' }],
  3: [{ from: 'me', text: 'Salut ! Le sponso Logitech est prêt, je poste quand ?' }],
  4: [{ from: 'me', text: "J'ai envoyé les rushs UGC Sephora ✅" }, { from: 'agency', text: 'Nickel, on regarde ça.' }],
  5: [{ from: 'me', text: "Question sur le brief L'Oréal : combien de stories ?" }],
}

export const aMeta = {
  0: { creator: 'CAMILLE ORSINI', campaign: 'Sephora — Collection été', tone: 'indigo' },
  1: { creator: 'CAMILLE ORSINI', campaign: 'Dior Beauty — Gifting', tone: 'signal' },
  3: { creator: 'THÉO RIVIÈRE', campaign: 'Logitech — Sponso', tone: 'cyan' },
  4: { creator: 'JADE NGUYEN', campaign: 'Sephora UGC', tone: 'signal' },
  5: { creator: 'INÈS KABORÉ', campaign: "L'Oréal — Soin", tone: 'indigo' },
}

export const docsRaw = {
  0: [{ name: 'Brief Sephora — Collection été.pdf', type: 'brief', date: '24/06/2026', size: '248 Ko' }, { name: 'Media kit Camille 2026.pdf', type: 'mediakit', date: '01/06/2026', size: '3,2 Mo' }, { name: 'Facture #2026-084.pdf', type: 'facture', date: '02/07/2026', size: '96 Ko' }],
  1: [{ name: 'Media kit Théo 2026.pdf', type: 'mediakit', date: '12/06/2026', size: '4,1 Mo' }],
  3: [{ name: 'Brief Sephora UGC.pdf', type: 'brief', date: '20/06/2026', size: '180 Ko' }],
}

export const bankAccounts = [
  { label: 'Compte courant — Qonto', bank: 'Qonto', iban: 'FR76 1695 8000 0112 3456 7890 219', bic: 'QNTOFRP1XXX' },
  { label: 'Compte pro — BNP Paribas', bank: 'BNP Paribas', iban: 'FR76 3000 4002 8800 0123 4567 891', bic: 'BNPAFRPPXXX' },
  { label: 'Compte séquestre', bank: 'Crédit Mutuel', iban: 'FR76 1027 8060 0100 0204 5670 155', bic: 'CMCIFR2AXXX' },
]

export const rosterInfoRaw = {
  0: { ville: 'Lyon, France', phone: '+33 6 12 48 90 33', email: 'camille.orsini@gmail.com', address: '14 rue de la République, 69002 Lyon', siren: '901 234 567', birth: '12/03/1998', exclu: true, commission: '20%' },
  1: { ville: 'Paris, France', phone: '+33 6 70 11 22 84', email: 'theo.riviere@gmail.com', address: '8 rue Oberkampf, 75011 Paris', siren: '880 556 102', birth: '24/09/1996', exclu: true, commission: '15%' },
  2: { ville: 'Bordeaux, France', phone: '+33 6 22 41 09 57', email: 'lena.marchand@gmail.com', address: "3 cours de l'Intendance, 33000 Bordeaux", siren: '—', birth: '05/01/2000', exclu: false, commission: '18%' },
}

export const msgTemplatesRaw = [
  { channel: 'gmail', title: 'Proposition de collaboration', body: "Bonjour [Prénom],\n\nJe suis [Votre nom] de l'agence TTP, qui accompagne des créateurs comme [Créateur] (audience [X]K, ER [X]%).\n\nNous pensons que [Créateur] correspondrait parfaitement à l'univers de [Marque] pour une campagne [format]. Seriez-vous disponible pour un appel cette semaine ?\n\nBien à vous,\n[Votre nom] — TTP Agency" },
  { channel: 'gmail', title: 'Relance facture impayée', body: "Bonjour [Prénom],\n\nSauf erreur de notre part, la facture #[Réf] d'un montant de [Montant] (échéance le [Date]) reste en attente de règlement.\n\nPourriez-vous nous indiquer une date de paiement ? Je reste disponible pour tout justificatif.\n\nMerci d'avance,\n[Votre nom] — TTP Agency" },
  { channel: 'gmail', title: 'Envoi du media kit', body: "Bonjour [Prénom],\n\nComme convenu, vous trouverez ci-joint le media kit de [Créateur] : statistiques d'audience, formats proposés et exemples de collaborations passées.\n\nN'hésitez pas si vous souhaitez un devis personnalisé.\n\nBelle journée,\n[Votre nom] — TTP Agency" },
  { channel: 'linkedin', title: 'Demande de connexion (marque)', body: "Bonjour [Prénom], je gère les partenariats créateurs chez TTP Agency. Nous travaillons avec des profils qui pourraient coller à vos campagnes [secteur]. Au plaisir d'échanger !" },
  { channel: 'linkedin', title: 'Pitch partenariat', body: "Bonjour [Prénom],\n\nMerci pour votre connexion ! Je représente [Créateur], spécialisé(e) en [niche] avec une communauté très engagée. Une collaboration avec [Marque] aurait beaucoup de sens. Êtes-vous la bonne personne pour en discuter, ou pourriez-vous m'orienter ?\n\nMerci !" },
  { channel: 'instagram', title: 'DM première approche', body: "Hello [Marque] 👋 Je gère les collabs de [Créateur] chez TTP. On adore ce que vous faites ! Une idée de collaboration nous trotte en tête — on vous envoie ça par mail ?" },
  { channel: 'instagram', title: 'Négociation tarif', body: "Merci pour votre retour ! Pour ce format ([livrables]), notre tarif est de [Montant]. Il inclut [droits/exclusivité]. On peut ajuster selon le volume — dites-moi ce qui colle à votre budget 🙌" },
  { channel: 'tiktok', title: 'DM collab UGC', body: "Salut ! 👋 [Créateur] crée du contenu UGC qui performe (ER [X]%). On serait ravis de produire des vidéos pour [Marque]. Je vous envoie un exemple + nos tarifs UGC ?" },
]

export const modulesRaw = {
  debrief: { title: 'Debrief', section: 'Outils', sub: 'Bilans de campagne', action: '+ DEBRIEF', rows: [
    { a: 'Sephora — Collection printemps', b: 'CAMILLE · 2,4 M reach', c: 'ROI 4,1×', tone: 'signal' },
    { a: 'Logitech — Setup', b: 'THÉO · 1,8 M reach', c: 'ROI 3,2×', tone: 'indigo' },
    { a: 'Galeries Lafayette', b: 'LÉNA · 980 K reach', c: 'ROI 2,7×', tone: 'cyan' },
  ] },
  alertes: { title: 'Alertes', section: 'Outils', sub: 'Notifications & rappels', action: '+ ALERTE', rows: [
    { a: 'NOÉ sans activité depuis 24 j', b: 'Dernier post le 02/06', c: 'CRÉATEUR', tone: 'cyan' },
    { a: 'Facture L’Oréal en retard', b: 'Échéance 30/05 dépassée', c: 'FACTURE', tone: 'indigo' },
    { a: 'Brief Sephora à valider', b: 'Deadline 27/06', c: 'BRIEF', tone: 'signal' },
  ] },
}
