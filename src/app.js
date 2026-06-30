
class Component extends DCLogic {
  state = { theme:'light', space:'agency', view:'apercu', creatorId:null, creatorName:null, portalTab:'accueil', authed:false, authRole:null, loginTab:'agency', loginEmail:'', loginPwd:'', loginError:'', showEventForm:false, editingEvent:null, ne:{day:26,time:'',title:'',type:'call',date:''}, events:null, doneSet:null, openContact:null, objForm:false, no:{name:'',target:'',pct:''}, engCreator:0, engPlatform:'instagram', engBase:'', engM0:'', engM1:'', engM2:'', priceCreator:0, priceFormat:'reel', ctType:'marque', ctCreator:0, ctBrand:'Sephora', ctValue:'32 000 €', ctCommission:'20', ctDuration:'12 mois', ctDeliverables:'3 posts · 1 reel', ctExcl:true, photos:{}, copied:null, rosterDetail:null, openThread:null, draft:'', threadMsgs:null };

  // Roster vierge par défaut : l'agence ajoute ses propres créateurs (aucun profil
  // de démonstration). Les créateurs réels vivent dans la table Supabase `creators`.
  rosterRaw = [];
  // Anciens créateurs de démonstration livrés avec l'app — purgés une seule fois du
  // cache local (voir _applySeeds) pour que personne ne les voie réapparaître.
  _demoCreatorNames = ['CAMILLE ORSINI','THÉO RIVIÈRE','LÉNA MARCHAND','INÈS KABORÉ','MALO FONTAINE','JADE NGUYEN','SACHA DELAUNAY','NOÉ BERGER'];
  // Contacts (fictifs) des prospects de démonstration — sert à ne purger QUE ces
  // lignes du pipeline, en préservant les vrais prospects ajoutés par l'agence.
  _demoProspectContacts = ['Marc Petit','RP — à trouver','Aïcha Benali','Julien Mercier','Camille Roux','Tom Vasseur'];
  pipeRaw = [];
  todoRaw = [];
  ideasRaw = [];
  briefRaw = [];
  invoiceRaw = [];
  contactRaw = [
    {brand:'Gisèle Paris', person:'Emma Sarallaih', role:'Account Manager', tone:'indigo', tag:'Agence RP', email:'emma.s@gisele-paris.fr', phone:'06 30 74 72 15', last:'jamais', deals:'Prospection'},
    {brand:'Aroma zone', person:'Jennifer Garcia', role:'Influence Manager', tone:'signal', tag:'Marque', email:'jennifer.garcia@aroma-zone.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Von Dutch France', person:'Maureen Ruiz', role:'Influence Manager', tone:'signal', tag:'Marque', email:'maureen@textiss.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Agence Monet', person:'Melchior Buteaux', role:'Influence Manager', tone:'indigo', tag:'Agence RP', email:'m.bulteau@monet-rp.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Epycure', person:'Julie Castel', role:'Influence Manager', tone:'signal', tag:'Marque', email:'julie@epycure.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Burning Bar', person:'Lola Goncalves', role:'Influence Manager', tone:'signal', tag:'Marque', email:'lola@burningbar.fr', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Rooftop Eylau Paris', person:'Camille Kuijper', role:'Manager', tone:'cyan', tag:'Autre', email:'camillek@pascalevenot.fr', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Samatch', person:'Samy Carmona', role:'Co founder', tone:'indigo', tag:'Agence RP', email:'samatchvibes@gmail.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Zmirov', person:'Constance Godeau', role:'Influence Manager', tone:'indigo', tag:'Agence RP', email:'constance.godeau@zmirov.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Agence Melchior', person:'Louna Courivaud', role:'Consultante Influence', tone:'indigo', tag:'Agence RP', email:'louna.courivaud@agencemelchior.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Publicactif', person:'Clément Ragot', role:'Chef de projet digital', tone:'indigo', tag:'Agence RP', email:'clement@publicactif.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Jin', person:'Chloé Nabais', role:'Consultante Senior Relations Presse', tone:'indigo', tag:'Agence RP', email:'cnabais@jin.fr', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Babylone', person:'Emma Bruneau', role:'PR Consultant', tone:'indigo', tag:'Agence RP', email:'Emma.bruneau@babylone.fr', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Legal Place', person:'Margaux Masneri-Briere', role:'Head of Influence', tone:'signal', tag:'Marque', email:'margaux.masneri-briere@legalplace.fr', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Sephora', person:'Netty Baciu', role:'Head of Paid Influence', tone:'signal', tag:'Marque', email:'nbaciu@sephora.fr', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Emma Lab', person:'Carla Villanueva', role:'Consultante en Influence', tone:'indigo', tag:'Agence RP', email:'carla.villanuevabianco@emma-lab.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Livy', person:'Laura Lefebvre', role:'Responsable production & communication', tone:'signal', tag:'Marque', email:'laura.lefebvre@li-vy.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Boomerang Agency', person:'Thanina Medjber', role:'Senior Project Manager', tone:'indigo', tag:'Agence RP', email:'thanina@boomerang-agency.fr', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Publicis', person:'Annaël Rota Graziosi', role:'PR & Influence Marketing chez Publicis Consultants', tone:'indigo', tag:'Agence RP', email:'annael.rotagraziosi@publicisconsultants.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Oden', person:'Paloma Roussel', role:'Chef de Projet Influence', tone:'signal', tag:'Marque', email:'paloma@oden.fr', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Burga', person:'Igne Rukstelyte', role:'Chef de projet Inlfuence', tone:'signal', tag:'Marque', email:'igne.rukstelyte@burga.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Webedia Creator', person:'Jade Chanroux', role:'Talent Manager', tone:'indigo', tag:'Agence RP', email:'jade.chanroux@webedia-group.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Nice Work', person:'Romane Borrot', role:'Account influence', tone:'cyan', tag:'Presse', email:'romane@nicework.fr', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'JW Marriott CANNES', person:'Andréa Jan', role:'Communication & Marketing assistant', tone:'cyan', tag:'Autre', email:'asst.marketing@jwmarriottcannes.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'AGENTLY.', person:'Valentin Bonifacy', role:'Chargé de clientèle', tone:'indigo', tag:'Agence RP', email:'valentin@agently.team', phone:'0628391831', last:'jamais', deals:'Prospection'},
    {brand:'Revolvr', person:'Lea Akapko', role:'Cheffe de projet', tone:'indigo', tag:'Agence RP', email:'lea.a@revolvr.fr', phone:'0652552633', last:'jamais', deals:'Prospection'},
    {brand:'18H08', person:'Raphaelle Braconnier', role:'Chef de projet influence / partenariats', tone:'indigo', tag:'Agence RP', email:'Raphaelle.braconnier@18h08.fr', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Rosa Paris', person:'Chiara Cauchi', role:'Social Media Manager Junior', tone:'indigo', tag:'Agence RP', email:'chiara.cauchi@rosaparis.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'The source', person:'Bryan Oudoux', role:'Head of Social Media & Influence', tone:'indigo', tag:'Agence RP', email:'', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Agence Socialy', person:'Laurie Lemarrec', role:'Social Media Manager', tone:'indigo', tag:'Agence RP', email:'laurie.lemarrec@socialy.fr', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Leroymerlin', person:'Pauline Carion', role:'Responsable Relations presse et Influence', tone:'signal', tag:'Marque', email:'influence@leroymerlin.fr', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'NiceWork', person:'Andréa Baiar', role:'Cheffe de projet Influence', tone:'cyan', tag:'Presse', email:'andrea@nicework.fr', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Ykone', person:'Laetitia R', role:'Influence Manager', tone:'indigo', tag:'Agence RP', email:'laetitiar@ykone.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'North', person:'Anae Biennier', role:'Junior Account Executive', tone:'indigo', tag:'Agence RP', email:'anae.biennier@lvld.fr', phone:'+33 7 68 26 73 24', last:'jamais', deals:'Prospection'},
    {brand:'BYD', person:'Lucia Rabou', role:'Responsable Marketing', tone:'signal', tag:'Marque', email:'marketing.byd@groupe-maurin.com', phone:'0689027477', last:'jamais', deals:'Prospection'},
    {brand:'studio_madygood', person:'MAGALI BOCQUET-DUMONT', role:'Social Media Manager', tone:'indigo', tag:'Freelance', email:'magali@madygood.com', phone:'+33 6 65 19 04 47', last:'jamais', deals:'Prospection'},
    {brand:'Rore Active', person:'Lea Basquin', role:'Assistante Cheffe de Projet Influence', tone:'signal', tag:'Marque', email:'lea.basquin@roreactive.com', phone:'anais.nevoret@roreactive.com', last:'jamais', deals:'Prospection'},
    {brand:'Gold Influence', person:'Ambre Mommers', role:'Talent Manager', tone:'indigo', tag:'Agence RP', email:'ambre.mommers@goldeninfluence.com', phone:'+33 6 64 45 71 07', last:'jamais', deals:'Prospection'},
    {brand:'Motel Rocks', person:'Jennifer Brookes', role:'INFLUENCER OUTREACH ASSISTANT', tone:'signal', tag:'Marque', email:'jennifer.brookes@motelrocks.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Superdry', person:'Holly Stevens', role:'Creator Relationships Assistant', tone:'signal', tag:'Marque', email:'holly.stevens@superdry.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Tanke Agency', person:'Antoine Joubert', role:'Account Manager & Chef de Projet', tone:'indigo', tag:'Agence RP', email:'antoine@tanke.fr', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Tank Agency', person:'Clarisse Ningler', role:'Cheffe de Projet Micro Influence', tone:'indigo', tag:'Agence RP', email:'clarisse@tanke.fr', phone:'+33 1 84 25 06 01', last:'jamais', deals:'Prospection'},
    {brand:'Migos Media', person:'Miguel Pacios Keklik', role:'Global Influencer Management', tone:'indigo', tag:'Agence RP', email:'miguel.pacios@migosmedia.com', phone:'+33 6 52 11 47 62', last:'jamais', deals:'Prospection'},
    {brand:'Soon', person:'Juliette Dussauge', role:'Freelance events', tone:'indigo', tag:'Freelance', email:'', phone:'+33 6 23 49 96 67', last:'jamais', deals:'Lifestyle'},
    {brand:'Novoma', person:'Marine Steiner', role:'Cheffe projets influence', tone:'signal', tag:'Marque', email:'marinesteiner.consulting@gmail.com', phone:'+34 627 28 08 34', last:'jamais', deals:'Soin'},
    {brand:'KINDAI', person:'Justine Couturier', role:'influence manager', tone:'indigo', tag:'Agence RP', email:'justine.couturier@kindai.fr', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'DOUBLE 2', person:'William Brianchon', role:'responsable influence', tone:'indigo', tag:'Agence RP', email:'W.brianchon@double2.fr', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'LUCIEN PAGES', person:'Charline Constantzer', role:'pr junior', tone:'indigo', tag:'Agence RP', email:'ccostantzer@lucienpages.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'OBVIOUSLY', person:'Estelle', role:'Head of Client Success and Operations', tone:'indigo', tag:'Agence RP', email:'estelle@obvious.ly', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'DRESSCODE AGENCY', person:'Loïs Lecompte', role:'Chargée de Relations Presse et Publiques', tone:'indigo', tag:'Agence RP', email:'lois@dresscodepress.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'ZMIROV', person:'Lidwine Pierrot', role:'Directrice de Clientèle', tone:'indigo', tag:'Agence RP', email:'lidwine.perriot@zmirov.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'DLX', person:'Giulia Presti', role:'pr manager', tone:'indigo', tag:'Agence RP', email:'giulia@dlx.co', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'MAGNA PRESSE', person:'Emilie Charpentier', role:'Directrice Artistique & Social Media Manager', tone:'indigo', tag:'Agence RP', email:'echarpentier@magnapresse.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'AGENCE MELCHIOR', person:'Flora Despiney', role:'Chef de projet influence senior', tone:'indigo', tag:'Agence RP', email:'Flora@agencemelchior.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'ASAP COMMUNICATION', person:'Justine Laroza', role:'Consultante RP et Influence', tone:'indigo', tag:'Agence RP', email:'justine.laroza@asap-com.fr', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'AGENCE MELCHIOR', person:'Flavie Cuenca', role:'Consultante PR Junior pôle Gastronomie', tone:'indigo', tag:'Agence RP', email:'flavie@agencemelchior.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'JOURNEY STUDIO', person:'Fara Mendy', role:'Responsable Opérationnel & Stratégie Influence', tone:'indigo', tag:'Agence RP', email:'fara@journey-studio.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'MIROIR', person:'Laëtitia Guedes', role:'', tone:'indigo', tag:'Freelance', email:'l.guedes@miroirinfluence.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'REECH', person:'Lucie De Pierrepont', role:'Influence Project Manager', tone:'indigo', tag:'Agence RP', email:'Lucie.dp@reech.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'Gangsteres', person:'Margaux Clech', role:'Social Media Manager', tone:'indigo', tag:'Agence RP', email:'margaux@gangsteres.com', phone:'+33 7 78 68 39 11', last:'jamais', deals:'Prospection'},
    {brand:'Gust !', person:'Quentin Gimenez', role:'Account manager influence', tone:'indigo', tag:'Agence RP', email:'quentingimenez@agencegust.com', phone:'', last:'jamais', deals:'Prospection'},
    {brand:'AGENCE UTOPIA', person:'Luna', role:'Cheffe de Projet influence', tone:'indigo', tag:'Agence RP', email:'luna@theutopia.fr', phone:'', last:'jamais', deals:'Mode'},
    {brand:'AGENCE UTOPIA', person:'Camille', role:'Influence responsable & image de marque', tone:'indigo', tag:'Agence RP', email:'camille@theutopia.fr', phone:'', last:'jamais', deals:'Mode'},
    {brand:'WOO', person:'Pauline Bourgogne', role:'Cheffe de projet influence middle chez WOO', tone:'indigo', tag:'Agence RP', email:'pauline.bourgogne@woo.paris', phone:'', last:'jamais', deals:'Lifestyle'},
    {brand:'KOSBIOTIC', person:'Anaïs Allet', role:'Cheffe de projets Influence', tone:'signal', tag:'Marque', email:'anais.allet@kosbiotic.com', phone:'', last:'jamais', deals:'Soin'},
    {brand:'WOO', person:'Margaux Madec', role:'Cheffe de projet Influence & Some - WOO', tone:'indigo', tag:'Agence RP', email:'Margaux.madec@woo.paris', phone:'', last:'jamais', deals:'Mode'},
    {brand:'The Lyfe Influence', person:'Lea Sahli', role:'cheffe de projet influence', tone:'indigo', tag:'Agence RP', email:'lea@the-lyfe.com', phone:'', last:'jamais', deals:'Mode'},
    {brand:'L\'Oréal', person:'Yaëlle Harroch', role:'Communication, PR & Social Media', tone:'signal', tag:'Marque', email:'yaelle.harroch@loreal.com', phone:'', last:'jamais', deals:'Beauté'},
    {brand:'Woo', person:'Juliette Robert', role:'Chef de projet influence', tone:'indigo', tag:'Agence RP', email:'juliette.robert@woo.paris', phone:'', last:'jamais', deals:'Mode'},
    {brand:'Agence pépites', person:'Aurélie Michel', role:'Chargée de relations presse et influence', tone:'indigo', tag:'Agence RP', email:'Aurélie.pepites@gmail.com', phone:'', last:'jamais', deals:'Mode'},
    {brand:'RécitPR', person:'Laura Piasek', role:'Communications & PR Specialist', tone:'cyan', tag:'Presse', email:'laura.piasek@gmail.com', phone:'', last:'jamais', deals:'Mode'},
    {brand:'Kosbiotic', person:'Sophia Todorovic', role:'Spécialiste Casting UGC & Influence', tone:'signal', tag:'Marque', email:'sophia.todorovic@kosbiotic.com', phone:'07 82 14 94 89', last:'jamais', deals:'Mode'},
    {brand:'Walking Pad', person:'Abby Guo', role:'Influence', tone:'signal', tag:'Marque', email:'abby.guo@kingsmith.com', phone:'', last:'jamais', deals:'Sport'},
    {brand:'14Septembre', person:'Estelle Agnel', role:'Consultante RP & Influence', tone:'indigo', tag:'Agence RP', email:'estelleagnel@14septembre.com', phone:'+33 6 12 29 58 30', last:'jamais', deals:'Autre'},
    {brand:'Agently', person:'Leopold Vacher', role:'Chef de projet', tone:'indigo', tag:'Agence RP', email:'leopold@agently.team', phone:'0643254034', last:'jamais', deals:'Lifestyle'},
    {brand:'Agently', person:'Charlotte P', role:'Cheffe de projets', tone:'indigo', tag:'Agence RP', email:'charlotte@agently.team', phone:'', last:'jamais', deals:'Lifestyle'},
    {brand:'AGILES RP', person:'Elyse Scheidt', role:'', tone:'indigo', tag:'Agence RP', email:'elyse@agiles-rp.com', phone:'', last:'jamais', deals:'Autre'},
    {brand:'Agiles RP', person:'Elyse', role:'Co founder', tone:'indigo', tag:'Agence RP', email:'elyse@agiles-rp.com', phone:'', last:'jamais', deals:'Tech'},
    {brand:'Reach Paris', person:'Chloe Selles', role:'Influence', tone:'indigo', tag:'Agence RP', email:'chloe.selles@reach.paris', phone:'', last:'jamais', deals:'Lifestyle'},
    {brand:'Cosy Island', person:'Jennie W', role:'Social & Influencer Marketing Specialist', tone:'signal', tag:'Marque', email:'partner@cosyisland.co', phone:'', last:'jamais', deals:'Mode'},
    {brand:'Digital Bang Bang', person:'Céline Manin', role:'Cheffe projets Influence', tone:'indigo', tag:'Agence RP', email:'influences@digitalbangbang.com', phone:'', last:'jamais', deals:'Mode'},
    {brand:'NEBBIA GROUP', person:'Tomáš Gerát', role:'Influencer Manager', tone:'signal', tag:'Marque', email:'tomas.gerat@nebbia.fitness', phone:'', last:'jamais', deals:'Sport'},
    {brand:'Kleva', person:'Badara', role:'Founder', tone:'signal', tag:'Marque', email:'collab@feelkleva.com', phone:'', last:'jamais', deals:'Soin'},
    {brand:'Atelier Jabri', person:'Sarah KPIN', role:'PR & Influence Manager', tone:'indigo', tag:'Agence RP', email:'sarah@atelierjabri.com', phone:'+33 6 46 60 07 71', last:'jamais', deals:'Lifestyle'},
    {brand:'Cupshe', person:'Dolores', role:'Influencer Relation Team', tone:'signal', tag:'Marque', email:'dolores@cupshe.com', phone:'', last:'jamais', deals:'Mode'},
    {brand:'Tesla', person:'Ambre Seidlinger', role:'Communications Specialist Tesla', tone:'signal', tag:'Marque', email:'aseidlinger@tesla.com', phone:'', last:'jamais', deals:'Tech'},
    {brand:'Primelis', person:'Romane Duigou', role:'Consultante Influence Senior', tone:'indigo', tag:'Agence RP', email:'Romane.duigou@primelis.com', phone:'', last:'jamais', deals:'Lifestyle'},
    {brand:'Edelman', person:'Camille Rabel', role:'Influence Strategist', tone:'indigo', tag:'Agence RP', email:'camille.rabel@edelman.com', phone:'', last:'jamais', deals:'Lifestyle'},
    {brand:'Nsi', person:'Pierre Bellagamba', role:'Directeur de comptes | Social Media & Influence', tone:'indigo', tag:'Agence RP', email:'pierre.bellagamba@nsi-adit.com', phone:'', last:'jamais', deals:'Lifestyle'},
    {brand:'North', person:'Cecile Grange', role:'Attachée de presse et influence', tone:'indigo', tag:'Agence RP', email:'cecile.grange@lvld.fr', phone:'', last:'jamais', deals:'Lifestyle'},
    {brand:'VM Consulting', person:'Vincent Molinès', role:'Communication & Marketing Consultant', tone:'indigo', tag:'Agence RP', email:'vincent@vmconsulting-rp.com', phone:'', last:'jamais', deals:'Tech'},
    {brand:'Japhy', person:'Lucie Prevot', role:'Influence Sales Manager', tone:'indigo', tag:'Agence RP', email:'influence@japhy.fr', phone:'', last:'jamais', deals:'Lifestyle'},
    {brand:'L\'epicerie Agency', person:'Thierry Heems', role:'Influence & Communications', tone:'indigo', tag:'Agence RP', email:'thierry@lepicerie.agency', phone:'', last:'jamais', deals:'Food'},
    {brand:'Decouvertes Dmc', person:'Emma José', role:'Digital Marketing Manager', tone:'indigo', tag:'Agence RP', email:'emmajo@decouvertesdmc.com', phone:'', last:'jamais', deals:'Autre'},
    {brand:'JNPR', person:'Lorna', role:'Consultante en Marketing d\'Influence', tone:'signal', tag:'Marque', email:'lorna@jnprspirits.com', phone:'0)6 82 54 20 96', last:'jamais', deals:'Food'},
    {brand:'Falconeri', person:'Falconeri', role:'', tone:'signal', tag:'Marque', email:'hello@falconeri.com', phone:'', last:'jamais', deals:'Mode'},
    {brand:'Disney +', person:'Nissrine Dama', role:'Influence manager', tone:'cyan', tag:'Autre', email:'nissrine.dama.-ND@disney.com', phone:'', last:'jamais', deals:'Lifestyle'},
  ];
  objRaw = [];
  pricingRaw = [
    {format:'Post Instagram', base:'4 500 €', excl:'+ 30%'},
    {format:'Reel', base:'6 800 €', excl:'+ 35%'},
    {format:'Story (x3)', base:'2 400 €', excl:'+ 20%'},
    {format:'UGC vidéo', base:'1 800 €', excl:'+ 25%'},
    {format:'YouTube intégration', base:'9 500 €', excl:'+ 40%'},
    {format:'Pack mensuel', base:'18 000 €', excl:'sur devis'},
  ];
  prospectRaw = [];
  eventsRaw = [];
  msgsRaw = {};
  // Rich campaign debriefs — a polished report you can send to the brand.
  debriefRaw = [];
  eventTypeMap = { call:{label:'Call', tone:'indigo'}, reunion:{label:'Réunion', tone:'cyan'}, collab:{label:'Collab', tone:'signal'}, shoot:{label:'Shoot', tone:'indigo'}, event:{label:'Event', tone:'signal'}, voyage:{label:'Voyage', tone:'cyan'}, deadline:{label:'Deadline', tone:'cyan'} };

  docsRaw = {};
  bankAccounts = [ {label:'Compte courant — Qonto', bank:'Qonto', iban:'FR76 1695 8000 0112 3456 7890 219', bic:'QNTOFRP1XXX'}, {label:'Compte pro — BNP Paribas', bank:'BNP Paribas', iban:'FR76 3000 4002 8800 0123 4567 891', bic:'BNPAFRPPXXX'}, {label:'Compte séquestre', bank:'Crédit Mutuel', iban:'FR76 1027 8060 0100 0204 5670 155', bic:'CMCIFR2AXXX'} ];
  rosterInfoRaw = {};

  mediaKitRaw = {};

  toneHex(tone, dark){
    return ({ signal:'#70FC8E', indigo: dark?'#5B82F8':'#3765F6', cyan: dark?'#9AA6B4':'#8590A1', amber: dark?'#5B82F8':'#3765F6' })[tone] || (dark?'#6E6E6E':'#8A8A85');
  }
  initials(name){ return String(name||'').split(' ').filter(w=>w.length).map(w => w[0]).slice(0,2).join('').toUpperCase(); }
  // Coche animée (effet « draw-in » inspiré du checkbox Radix) : la coche se dessine
  // toute seule quand la tâche passe à « terminée ». Le binding {{ }} accepte un élément React.
  _check(){ return React.createElement('svg',{className:'ttp-check',viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:3.4,strokeLinecap:'round',strokeLinejoin:'round'}, React.createElement('path',{d:'M4.5 12.75l6 6 9-13.5'})); }
  // Effet « décodage » (type EncryptedText) : à sa PREMIÈRE apparition, un élément
  // marqué [data-enc] voit son texte se révéler en se désembrouillant. Une seule fois
  // par clé/session (sinon l'app, qui se redessine souvent, le rejouerait sans cesse).
  // Le vrai texte est rendu normalement → repli propre si le JS ne tourne pas.
  _runEncrypt(){
    var els = document.querySelectorAll('[data-enc]');
    for(var i=0;i<els.length;i++){
      var el=els[i]; var key=el.getAttribute('data-enc');
      if(!key || this._encSeen[key]) continue;
      var real=el.textContent;
      if(!real || !real.trim()) continue;
      this._encSeen[key]=true;
      this._encAnimate(el, real);
    }
  }
  _encAnimate(el, real){
    var pool='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#%&@$';
    var txt=String(real); var n=txt.length; var per=2; var frame=0;
    var isL=function(c){ return /[a-zA-ZÀ-ÿ0-9]/.test(c); };
    function step(){
      var revealed=Math.floor(frame/per); var out='';
      for(var i=0;i<n;i++){ var c=txt[i]; out += (i<revealed || !isL(c)) ? c : pool[Math.floor(Math.random()*pool.length)]; }
      el.textContent=out; frame++;
      if(revealed<=n) setTimeout(step, 26); else el.textContent=txt;
    }
    step();
  }
  dots(n, pct, fill, empty, size){ const s=size||8; const o=[]; for(let i=0;i<n;i++){ o.push({style:'width:'+s+'px;height:'+s+'px;border-radius:50%;background:'+(((i*37+11)%100)<pct?fill:empty)+';'}); } return o; }
  bars(h, color, w){ return h.map(v => ({ style:'flex:1;min-width:'+(w||3)+'px;height:'+v+'%;border-radius:3px;background:'+color+';' })); }
  avatarStyle(tone, dark, s){ const bg=this.toneHex(tone,dark); const fg=tone==='signal'?'#10141A':'#FFFFFF'; s=s||34; return 'width:'+s+'px;height:'+s+'px;border-radius:'+(s>40?14:9)+'px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font:700 '+(s>44?20:(s>40?15:11))+'px \'Inter\',sans-serif;background:'+bg+';color:'+fg+';'; }
  // per-creator photo, keyed by name so the Roster (agency) and the creator's
  // own portal edit the SAME photo and it shows everywhere the creator appears.
  creatorPhoto(name){ const local=(this.state.photos||{})['cre:'+name]; if(local) return local; const c=(this.rosterRaw||[]).find(x=>x&&x.name===name); return (c&&c.photoUrl)||''; }
  // Upload d'une photo de profil créateur vers le bucket public `avatars` + sauvegarde
  // de l'URL sur la fiche `creators` (visible partout, cross-device, agence↔créateur).
  async _uploadCreatorPhoto(name, file){
    if(!this._sb||!name) return; const row=(this.rosterRaw||[]).find(c=>c&&c.name===name); if(!row||!row.id) return;
    try{
      const ext=(String(file.name).match(/\.[a-z0-9]+$/i)||['.jpg'])[0];
      const slug=String(name).toLowerCase().replace(/[^a-z0-9]+/gi,'_').replace(/^_+|_+$/g,'')||'creator';
      const path=slug+'/'+Date.now()+ext;
      const up=await this._sb.storage.from('avatars').upload(path, file, {upsert:true, contentType:file.type||'image/jpeg'});
      if(up.error){ console.warn('[avatar] upload', up.error.message); return; }
      const pub=this._sb.storage.from('avatars').getPublicUrl(path); const url=pub&&pub.data&&pub.data.publicUrl; if(!url) return;
      row.photoUrl=url; this.setState({rosterData:this.rosterRaw.slice()});
      await this._sb.from('creators').update({photo_url:url}).eq('id', row.id);
    }catch(e){ console.warn('[avatar] failed', e); }
  }
  avatarFor(name, tone, dark, s){ const base=this.avatarStyle(tone,dark,s); const p=this.creatorPhoto(name); return p ? base+'background-image:url('+p+');background-size:cover;background-position:center;color:transparent;' : base; }
  // keys that hold real data (not transient UI) — these survive a refresh
  _persistKeys(){ return ['theme','deletedRoster','rosterData','rosterEdited','seededTables','deletedDebriefs','debriefData','invoiceData','contactsData','prospectData','moduleRows','briefItems','todoItems','doneSet','ideasData','events','dismissedAlerts','dismissedNotifs','photos','briefVal','briefDone','briefNotes','customObjs','objByMonth','checklistDone','checklistHidden','checklistCustom','collabs','threadMsgs','msgsData','rosterInfo','contactsSeedV','pricingData','mediaKitData','priceHistory','docs','customBanks','accessAccounts','customConvos','deletedConvos','authed','authRole','space','creatorId','creatorName','portalTab','demoWiped','demoProspWiped']; }
  // session/auth keys stay device-local (never synced to the shared cloud blob)
  _slugName(name){ try{ return (name||'').split(' ')[0].toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]/g,''); }catch(_){ return (name||'').split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g,''); } }
  _creatorCreds(name){ const u=this._slugName(name); return { email:u+'@ttp.com', pwd:u }; }
  // override setState so every data change is mirrored to localStorage
  setState(update, cb){ super.setState(update, ()=>{ try{ this._persist(); }catch(e){} if(cb) cb(); }); }
  // keys synced to Supabase (cross-device). Roster lives in the `creators`
  // table, photos stay device-local (kept out of the shared blob).
  // prospectData vit dans sa propre table Supabase (étape 1 de la migration) →
  // on l'exclut du blob partagé pour ne pas le dupliquer.
  _cloudKeys(){ const local={deletedRoster:1,rosterEdited:1,rosterData:1,prospectData:1,contactsData:1,invoiceData:1,todoItems:1,briefItems:1,ideasData:1,events:1,threadMsgs:1,photos:1,authed:1,authRole:1,space:1,creatorId:1,creatorName:1,portalTab:1}; return this._persistKeys().filter(k=> !local[k]); }
  _persist(){
    // debounce: rapid setStates (e.g. typing) shouldn't each serialize/sync
    clearTimeout(this._persistT);
    this._persistT = setTimeout(()=>{ this._persistNow(); }, 350);
  }
  // Clés de DONNÉES appartenant à l'AGENCE (vue complète). La vue d'un créateur
  // (RLS) n'en est qu'un SOUS-ENSEMBLE — on ne doit JAMAIS la laisser écraser le
  // cache local de l'agence quand les deux partagent le même navigateur. En mode
  // créateur, on reconduit la valeur déjà stockée pour ces clés (préservation).
  _AGENCY_CACHE_KEYS = ['rosterData','rosterInfo','prospectData','contactsData','invoiceData','todoItems','briefItems','ideasData','events','threadMsgs','docs'];
  _guardAgencyCache(out){
    try{
      if(this.state.space!=='creator') return;
      let prev={}; try{ prev=JSON.parse(localStorage.getItem('ttp_state_v1')||'{}'); }catch(_){}
      this._AGENCY_CACHE_KEYS.forEach(k=>{ if(prev[k]!==undefined) out[k]=prev[k]; else delete out[k]; });
    }catch(_){}
  }
  _persistNow(){
    const out = {};
    this._persistKeys().forEach(k=>{ const v=this.state[k]; if (v!==undefined && v!==null) out[k]=v; });
    this._guardAgencyCache(out);
    if (typeof localStorage !== 'undefined') {
      try { localStorage.setItem('ttp_state_v1', JSON.stringify(out)); }
      catch(e){ try{ const o2=Object.assign({},out); delete o2.photos; localStorage.setItem('ttp_state_v1', JSON.stringify(o2)); }catch(_){} }
    }
    this._syncCloud(out);
  }
  _syncCloud(out){
    if (!this._sb || !this._cloudReady) return; // wait until initial cloud load knows the row id
    // Le blob d'état partagé (__app_state__) appartient à l'AGENCE. Un créateur ne
    // doit ni l'écrire ni l'écraser : ses données passent par les tables cloisonnées
    // (todos/briefs/idées/events/messages) et sa fiche creators. (RLS le bloquerait
    // de toute façon → on évite juste des 401 inutiles.)
    if (this.state.authRole === 'creator') return;
    const cloud = {}; this._cloudKeys().forEach(k=>{ if (out[k]!==undefined) cloud[k]=out[k]; });
    let json; try { json = JSON.stringify(cloud); } catch(_){ return; }
    try {
      if (this._cloudRowId){
        this._sb.from('module_rows').update({a:json}).eq('id', this._cloudRowId).then(({error})=>{ if(error) console.warn('[cloud] update:', error.message); });
      } else if (!this._cloudInserting){
        this._cloudInserting = true;
        this._sb.from('module_rows').insert({module:'__app_state__', a:json}).select('id').then(({data,error})=>{ this._cloudInserting=false; if(error){ console.warn('[cloud] insert:', error.message); return; } if(data&&data[0]) this._cloudRowId=data[0].id; });
      }
    } catch(e){ console.warn('[cloud] sync failed', e); }
  }
  async _loadCloudState(){
    // idem _loadAllData : le blob agence est protégé par RLS — inutile (et source de
    // 401 + egress) de le charger/synchroniser tant qu'aucune session réelle n'existe.
    if (!this._sb || !this._authReal) return;
    try {
      const { data, error } = await this._sb.from('module_rows').select('id,a').eq('module','__app_state__').order('created_at',{ascending:false}).limit(1);
      if (error){ console.warn('[cloud] load:', error.message); this._cloudReady=true; return; }
      if (data && data[0]){ this._cloudRowId = data[0].id; let o=null; try{ o=JSON.parse(data[0].a); }catch(_){} if (o && typeof o==='object'){
        // LOCAL-FIRST roster: if THIS device edited the roster (add/delete), never let
        // an older cloud snapshot resurrect deleted creators or drop added ones.
        // Otherwise (no local edit) take the cloud roster so it syncs across devices.
        // entities backed by their own tables are no longer owned by the blob:
        // strip them from an older snapshot so it can't override the table data.
        ['rosterData','prospectData','contactsData','invoiceData','todoItems','briefItems','ideasData','events','threadMsgs'].forEach(k=>{ delete o[k]; });
        this.setState(o); this._hydrateRoster(o);
      } }
    } catch(e){ console.warn('[cloud] load failed', e); }
    finally { this._cloudReady = true; try{ this._applySeeds(); }catch(e){} try{ this._pushRosterInfoToTable(); }catch(_){} this._persistNow(); } // apply forced seeds, then flush to cloud
  }
  // One-time forced seeds: when the bundled seed version changes, override the
  // saved (possibly stale) data once so everyone gets the new defaults. Bump the
  // version string to push a new seed. Runs after restore AND after cloud load.
  _applySeeds(){
    const V = 'contacts-csv-2026-06-27d';
    // skip the forced local seed when contacts are served by their Supabase table
    if (!this._contactsTable && this.state.contactsSeedV !== V){
      this.setState({ contactsData: this.contactRaw.slice(), contactsSeedV: V });
    }
    // ROSTER = persisted array (single source of truth). Migrate any old
    // index-based deletions (deletedRoster) into the array ONCE: actually remove
    // those creators, snapshot to rosterData, then drop the fragile index map.
    // This makes deletions durable and prevents deleted creators from reappearing.
    try{
      const dr=this.state.deletedRoster||{};
      const set=new Set(Object.keys(dr).filter(k=>dr[k]).map(Number));
      if(set.size){ this.rosterRaw=this.rosterRaw.filter((_,i)=>!set.has(i)); this.setState({ rosterData:this.rosterRaw.slice(), rosterEdited:true, deletedRoster:{} }); }
    }catch(e){}
    // Migration : rosterInfo était indexé par POSITION (0,1,2…). On rattache chaque
    // bloc de coordonnées au NOM du créateur, pour qu'une suppression ne décale plus
    // les infos (téléphone/email/réseaux affichés sur le mauvais créateur).
    try{
      const ri=this.state.rosterInfo;
      if(ri && Object.keys(ri).some(k=>/^\d+$/.test(k))){
        const nri={};
        Object.keys(ri).forEach(k=>{ if(/^\d+$/.test(k)){ const nm=(this.rosterRaw[+k]||{}).name; if(nm) nri[nm]=Object.assign({}, nri[nm]||{}, ri[k]); } else { nri[k]=Object.assign({}, ri[k], nri[k]||{}); } });
        this.setState({ rosterInfo:nri });
      }
    }catch(e){}
    // Migration : documents indexés par POSITION → indexés par NOM de créateur.
    try{
      const dk=this.state.docs;
      if(dk && Object.keys(dk).some(k=>/^\d+$/.test(k))){
        const nd={};
        Object.keys(dk).forEach(k=>{ if(/^\d+$/.test(k)){ const nm=(this.rosterRaw[+k]||{}).name; if(nm) nd[nm]=(nd[nm]||[]).concat(dk[k]||[]); } else { nd[k]=(nd[k]||[]).concat(dk[k]||[]); } });
        this.setState({ docs:nd });
      }
    }catch(e){}
    // Purge UNIQUE des anciens créateurs de démonstration (Camille, Théo, Léna…)
    // et de toutes les données qui leur étaient rattachées : l'utilisateur ne les a
    // jamais ajoutés. On ne touche QUE ce qui correspond à ces noms — les créateurs
    // et données réels de l'agence sont préservés. Ne s'exécute qu'une seule fois.
    try{
      if(!this.state.demoWiped){
        const DEMO=new Set(this._demoCreatorNames||[]);
        const isDemo=(nm)=>DEMO.has(String(nm||'').trim());
        const upd={ demoWiped:true };
        if(Array.isArray(this.rosterRaw)&&this.rosterRaw.length) this.rosterRaw=this.rosterRaw.filter(c=>!isDemo(c&&c.name));
        if(Array.isArray(this.state.rosterData)) upd.rosterData=this.state.rosterData.filter(c=>!isDemo(c&&c.name));
        if(this.state.rosterInfo){ const ri2=Object.assign({},this.state.rosterInfo); Object.keys(ri2).forEach(k=>{ if(isDemo(k)) delete ri2[k]; }); upd.rosterInfo=ri2; }
        if(Array.isArray(this.state.briefItems)) upd.briefItems=this.state.briefItems.filter(b=>!isDemo(b&&(b.who||b.creator)));
        if(Array.isArray(this.state.todoItems)) upd.todoItems=this.state.todoItems.filter(t=>!isDemo(t&&t.creator));
        if(Array.isArray(this.state.ideasData)) upd.ideasData=this.state.ideasData.filter(x=>!isDemo(x&&x.creator));
        if(Array.isArray(this.state.events)) upd.events=this.state.events.filter(e=>!isDemo(e&&e.who));
        if(Array.isArray(this.state.debriefData)) upd.debriefData=this.state.debriefData.filter(d=>!isDemo(d&&d.creator));
        this.setState(upd);
      }
    }catch(e){}
    // Purge UNIQUE des prospects de démonstration (HelloFresh, Nike, Sephora…) du
    // cache local : on ne retire QUE les lignes dont le contact est un faux contact
    // de démo — les vrais prospects ajoutés par l'agence sont conservés.
    try{
      if(!this.state.demoProspWiped){
        const DC=new Set(this._demoProspectContacts||[]);
        const upd2={ demoProspWiped:true };
        if(Array.isArray(this.state.prospectData)) upd2.prospectData=this.state.prospectData.filter(p=>!DC.has(String((p&&p.contact)||'').trim()));
        this.setState(upd2);
      }
    }catch(e){}
  }
  // effective contact list — fall back to the bundled seed when the stored list
  // is missing OR empty (an empty [] must never hide the seeded contacts)
  _contacts(){ const d=this.state.contactsData; return (Array.isArray(d)&&d.length)?d:this.contactRaw; }
  // génère un vrai document imprimable / PDF (via iframe -> dialogue d'impression "Enregistrer en PDF")
  _openPrint(title, body){
    try{
      const ifr=document.createElement('iframe');
      ifr.setAttribute('aria-hidden','true');
      ifr.style.cssText='position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
      document.body.appendChild(ifr);
      const doc=ifr.contentWindow.document;
      const css='*{box-sizing:border-box}body{font-family:Inter,Helvetica,Arial,sans-serif;color:#181D25;max-width:760px;margin:36px auto;padding:0 28px;line-height:1.6}h1{font-size:26px;letter-spacing:-1px;margin:0 0 4px}.brand{font:700 12px Inter,sans-serif;letter-spacing:1px;color:#16A34A}h2{font-size:12px;margin:20px 0 4px}p{font-size:13px;color:#333;margin:5px 0;white-space:pre-wrap}.muted{color:#888;font-size:12px;margin:0 0 8px}.row{display:flex;justify-content:space-between;gap:16px;border-bottom:1px solid #eee;padding:8px 0;font-size:13px}.row b{font-weight:600}hr{border:none;border-top:1px solid #eee;margin:18px 0}.sign{display:flex;justify-content:space-between;gap:24px;margin-top:34px}.sign div{flex:1;border-top:1px solid #181D25;padding-top:6px;font-size:11px;color:#888}';
      doc.open();
      doc.write('<!doctype html><html><head><meta charset="utf-8"><title>'+title+'</title><style>'+css+'</style></head><body><div class="brand">TTP AGENCY</div>'+body+'</body></html>');
      doc.close();
      ifr.contentWindow.focus();
      setTimeout(()=>{ try{ ifr.contentWindow.print(); }catch(e){} setTimeout(()=>{ try{ ifr.remove(); }catch(_){} }, 1500); }, 350);
    }catch(e){ try{ alert('Impossible de générer le PDF.'); }catch(_){} }
  }
  // PDF rendu IDENTIQUE à l'aperçu : on clone le bloc visible ([data-print]) tel quel
  // dans une iframe d'impression, en thème clair fixe, pour que le PDF ressemble
  // exactement à ce qui est affiché à l'écran.
  _printPreview(title, sel){
    try{
      const src=document.querySelector('[data-print="'+sel+'"]');
      if(!src){ this._openPrint(title, '<p>Aperçu indisponible.</p>'); return; }
      const clone=src.cloneNode(true);
      // 1) fige la valeur courante des champs (textarea/input) en texte statique,
      //    sinon ils s'impriment vides (outerHTML ne sérialise pas la saisie).
      const sf=src.querySelectorAll('textarea,input'), cf=clone.querySelectorAll('textarea,input');
      sf.forEach((f,i)=>{ const c=cf[i]; if(!c)return; const val=(f.value||f.getAttribute('placeholder')||'').trim(); const d=document.createElement('div'); d.textContent=val; d.setAttribute('style',(f.getAttribute('style')||'')+';border:none;background:transparent;'); if(c.parentNode) c.parentNode.replaceChild(d,c); });
      // 2) retire les éléments interactifs marqués [data-noprint] (boutons d'action).
      clone.querySelectorAll('[data-noprint]').forEach(n=>{ if(n.parentNode) n.parentNode.removeChild(n); });
      const ifr=document.createElement('iframe');
      ifr.setAttribute('aria-hidden','true');
      ifr.style.cssText='position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
      document.body.appendChild(ifr);
      const doc=ifr.contentWindow.document;
      const vars=':root{--bg:#FAFAFA;--panel:#F4F4F5;--surface:#FFFFFF;--text:#18181B;--muted:#52525B;--faint:#A1A1AA;--hair:#E4E4E7;--rowhover:#F4F4F5;--signal:#16A34A;--signaltext:#15803D;--signalsoft:#F0FDF4;--indigo:#6366F1;--amber:#F59E0B;--cyan:#71717A;--onsignal:#FFFFFF;}';
      const css='*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}body{margin:0;background:#fff;font-family:Inter,Helvetica,Arial,sans-serif}.print-wrap{max-width:820px;margin:22px auto;padding:0 16px}@media print{.print-wrap{margin:0;padding:0;max-width:none}}';
      doc.open();
      doc.write('<!doctype html><html><head><meta charset="utf-8"><title>'+title+'</title><base href="'+location.href+'"><style>'+vars+css+'</style></head><body><div class="print-wrap">'+clone.outerHTML+'</div></body></html>');
      doc.close();
      ifr.contentWindow.focus();
      setTimeout(()=>{ try{ ifr.contentWindow.print(); }catch(e){} setTimeout(()=>{ try{ ifr.remove(); }catch(_){} }, 1800); }, 450);
    }catch(e){ try{ alert('Impossible de générer le PDF.'); }catch(_){} }
  }
  _contactsFrom(s){ const d=s.contactsData; return (Array.isArray(d)&&d.length)?d:this.contactRaw; }
  _restore(){
    if (typeof localStorage === 'undefined') return;
    try {
      const raw = localStorage.getItem('ttp_state_v1');
      if (!raw) return;
      const o = JSON.parse(raw);
      if (o && typeof o === 'object') { this._restoring = true; this.setState(o); this._restoring = false; this._hydrateRoster(o); }
    } catch(e){ console.warn('[persist] restore failed', e); }
  }
  componentDidMount(){
    try { this._restore(); } catch(e){ console.warn('[persist] restore', e); }
    // flush pending state to localStorage immediately on close/refresh/tab-hide
    try {
      const flush=()=>{ try{ clearTimeout(this._persistT); const out={}; this._persistKeys().forEach(k=>{ const v=this.state[k]; if(v!==undefined&&v!==null) out[k]=v; }); this._guardAgencyCache(out); localStorage.setItem('ttp_state_v1', JSON.stringify(out)); }catch(_){} };
      window.addEventListener('beforeunload', flush);
      window.addEventListener('pagehide', flush);
      document.addEventListener('visibilitychange', ()=>{ if(document.visibilityState==='hidden') flush(); });
    } catch(e){}
    try {
      if (window.supabase && window.__SB_URL__ && window.__SB_KEY__) {
        this._sb = window.supabase.createClient(window.__SB_URL__, window.__SB_KEY__);
        // Au rafraîchissement, supabase-js restaure la session de façon asynchrone.
        // On écoute l'état d'auth : dès qu'une session est (re)connue, on bascule en
        // "Base connectée" et on recharge les données AVEC la session authentifiée.
        try{ this._sb.auth.onAuthStateChange((event, session)=>{ try{ const real=!!(session && session.user); if(real && !this._authReal){ this._authReal=true; this._cloudReady=false; this._cloudRowId=null; this._loadAllData(); this._loadCloudState(); this.setState({}); } else if(!real && this._authReal){ this._authReal=false; this.setState({}); } }catch(_){} }); }catch(_){}
        this._loadAllData();
        this._loadCloudState();
      }
    } catch(e){ console.warn('[supabase] init failed', e); }
    // apply forced seeds against the restored (localStorage) state right away;
    // _loadCloudState re-applies after the cloud snapshot lands so a stale cloud
    // copy can't bring the old data back.
    try{ this._applySeeds(); }catch(e){}
    // Démarre l'effet de décodage des accueils (Hello …) : vérifie périodiquement
    // l'apparition d'un élément [data-enc] et l'anime une seule fois.
    try{ this._encSeen=this._encSeen||{}; this._encTimer=setInterval(()=>{ try{ this._runEncrypt(); }catch(_){} }, 300); }catch(_){}
  }
  _mapCreator(r){ return { id:r.id, name:r.name, handle:r.handle, niche:r.niche, plat:r.platform, followers:r.followers, reach:r.reach, er:r.er, ca:r.ca, status:r.status, tone:r.tone, trend:r.trend, stats:r.stats||null, statsHistory:r.stats_history||[], followersHistory:r.followers_history||[], photoUrl:r.photo_url||'' }; }
  // re-hydrate the in-memory roster from the persisted state (localStorage / cloud
  // blob). Without this, a refresh resets rosterRaw to the bundled seed and any
  // creator the user added is lost. rosterData is the durable source of truth.
  _hydrateRoster(o){ try{ if (o && Array.isArray(o.rosterData) && o.rosterData.length){ this.rosterRaw = o.rosterData.slice(); } }catch(e){} }
  // Identité ROBUSTE du créateur connecté / prévisualisé : résolue par NOM (et non
  // par index de tableau, qui se décale quand le roster est rechargé/réordonné/édité).
  // Repli sur l'index puis le premier créateur. Évite d'afficher/écrire sur le mauvais.
  _meCreator(){ try{ const nm=this.state.creatorName; if(nm){ const c=(this.rosterRaw||[]).find(x=>x&&x.name===nm); if(c) return c; } const ci=this.state.creatorId; if(ci!=null && this.rosterRaw[ci]) return this.rosterRaw[ci]; return this.rosterRaw[0]||null; }catch(e){ return this.rosterRaw[0]||null; } }
  async _loadCreators(){
    // CROSS-DEVICE source of truth = la table `creators`. Quand on est authentifié,
    // on charge TOUJOURS depuis la table (un créateur ajouté sur un autre appareil
    // apparaît partout). rosterData ne sert que de cache local hors-ligne.
    // On capture le cache LOCAL avant d'écraser : il peut contenir des créateurs
    // ajoutés hors-connexion (insertion refusée à l'époque) qu'on ne veut PAS perdre.
    const localRoster = Array.isArray(this.rosterRaw) ? this.rosterRaw.slice() : [];
    const DEMO = new Set(this._demoCreatorNames||[]);
    // créateurs présents en local mais JAMAIS enregistrés en base => pas d'id.
    // (un créateur supprimé volontairement avait un id : on ne le ressuscite pas.)
    const rec = this._recoveredNames || (this._recoveredNames=new Set());
    const _creatorMode = this.state.space==='creator' || this.state.authRole==='creator';
    const orphansOf = (tableNames)=> _creatorMode ? [] : localRoster.filter(c=> c && !c.id && c.name && String(c.name).trim() && !DEMO.has(String(c.name).trim()) && !tableNames.has(String(c.name).trim()) && !rec.has(String(c.name).trim()));
    const orphanRow = (c,i)=>({ sort_order:i, name:c.name, handle:c.handle||'@', niche:c.niche||'Lifestyle', platform:c.plat||'Instagram', followers:c.followers||'0', reach:c.reach||'0', er:c.er||'0%', ca:c.ca||'0 €', status:c.status||'actif', tone:c.tone||'cyan', trend:c.trend||0 });
    const _recoverToast=(n)=>{ try{ const m=n+' créateur(s) récupéré(s) ✓'; this.setState({toast:m}); setTimeout(()=>this.setState(s=> s.toast===m ? {toast:null} : {}), 3000); }catch(_){} };
    let data, error;
    try { ({ data, error } = await this._sb.from('creators').select('*').order('sort_order')); }
    catch(e){ console.warn('[supabase] load creators failed', e); return; }
    if (error) { console.warn('[supabase] load creators:', error.message); return; }
    if (data && data.length) {
      let mapped = data.map(r=>this._mapCreator(r));
      this.rosterInfoRaw = {};
      data.forEach((r)=>{ this.rosterInfoRaw[r.name] = { ville:r.ville, phone:r.phone, email:r.email, address:r.address, siren:r.siren, birth:r.birth, exclu:!!r.exclu, commission:r.commission }; });
      // RÉCUPÉRATION : ré-insère les créateurs locaux jamais sauvegardés au lieu de
      // les écraser. Évite la perte silencieuse de créateurs ajoutés hors-connexion.
      try{
        const tableNames = new Set(mapped.map(c=>String(c.name||'').trim()));
        const orphans = orphansOf(tableNames);
        if(orphans.length){
          const { data:ins, error:e2 } = await this._sb.from('creators').insert(orphans.map((c,k)=>orphanRow(c, mapped.length+k))).select();
          if(!e2 && ins && ins.length){ mapped = mapped.concat(ins.map(x=>this._mapCreator(x))); console.warn('[creators] récupéré '+ins.length+' créateur(s) non sauvegardé(s)'); _recoverToast(ins.length); }
          else if(e2){ console.warn('[creators] recover insert:', e2.message); }
        }
      }catch(_){}
      this.rosterRaw = mapped;
      this._markSeeded('creators');
      this.setState({ deletedRoster:{}, creatorsLoaded:true, rosterData:this.rosterRaw.slice() });
      try{ this._pushRosterInfoToTable(); }catch(_){}
      return;
    }
    // table vide : on récupère d'abord les créateurs locaux non sauvegardés (orphelins).
    try{
      const orphans = orphansOf(new Set());
      if(orphans.length){
        const { data:ins, error:e2 } = await this._sb.from('creators').insert(orphans.map((c,k)=>orphanRow(c,k))).select();
        if(!e2 && ins && ins.length){ this.rosterRaw=ins.map(x=>this._mapCreator(x)); this._markSeeded('creators'); this.setState({ deletedRoster:{}, creatorsLoaded:true, rosterData:this.rosterRaw.slice() }); _recoverToast(ins.length); return; }
      }
    }catch(_){}
    // si déjà semée (tout supprimé) on respecte le vide ; sinon on sème.
    if (this.state.seededTables && this.state.seededTables.creators) return;
    const seed=this.rosterRaw.map((c,i)=>({ sort_order:i, name:c.name, handle:c.handle, niche:c.niche, platform:c.plat, followers:c.followers, reach:c.reach, er:c.er, ca:c.ca, status:c.status, tone:c.tone, trend:c.trend }));
    const r=await this._seedTable('creators','creators',seed);
    if(r.status==='seeded'){ this.rosterRaw=r.data.map(x=>this._mapCreator(x)); this.setState({ rosterData:this.rosterRaw.slice(), creatorsLoaded:true }); }
  }
  // Charge (ou sème) toutes les entités depuis Supabase. Appelé au démarrage ET
  // après une connexion Supabase réelle — car le seed/écriture exige une session
  // authentifiée (RLS), impossible avec le client anonyme du tout premier chargement.
  // N'interroge les tables QUE lorsqu'une vraie session existe : sans authentification
  // la RLS ne renvoie rien, donc un chargement anonyme = requêtes inutiles (egress).
  // Évite la passe anonyme redondante au démarrage avant la restauration de session.
  _loadAllData(){ if(!this._authReal) return; try{ this._loadCreators(); this._loadProspects(); this._loadContacts(); this._loadInvoices(); this._loadTodos(); this._loadBriefs(); this._loadIdeas(); this._loadEvents(); this._loadMessages(); this._loadDocs(); }catch(e){} }
  // ===== DOCUMENTS (fichiers réels via Supabase Storage, repli local sinon) =====
  // Charge la liste depuis la table `documents` + génère des URLs signées (1 h)
  // pour la prévisualisation / le téléchargement. Indexé par NOM de créateur.
  async _loadDocs(){
    const rows = await this._dbList('documents');
    if(rows===null) return; // Supabase indispo → garde le comportement local
    this._docsTable = true;
    const byName = {};
    for(const r of rows){
      let url='';
      try{ const s=await this._sb.storage.from('documents').createSignedUrl(r.path, 3600); url=(s&&s.data&&s.data.signedUrl)||''; }catch(_){}
      const d={ id:r.id, name:r.name, type:r.type||'autre', size:r.size||'', date:r.created_at?('ajouté '+new Date(r.created_at).toLocaleDateString('fr-FR')):'', url, path:r.path, _ts:r.created_at?Date.parse(r.created_at):0 };
      (byName[r.creator]=byName[r.creator]||[]).push(d);
    }
    Object.keys(byName).forEach(k=>byName[k].sort((a,b)=>(b._ts||0)-(a._ts||0))); // récents d'abord
    this.setState({ docs: byName });
  }
  // Ajoute un document pour un créateur (par NOM) : upload Storage + ligne table.
  // Repli : si Supabase indisponible, garde l'aperçu local (URL blob de session).
  async _addDocFor(name, file, type){
    const fm=(b)=>b<1024?b+' o':(b<1048576?(b/1024).toFixed(0)+' Ko':(b/1048576).toFixed(1).replace('.',',')+' Mo');
    const sizeStr=fm(file.size);
    const entry={ name:file.name, type, date:'ajouté auj.', size:sizeStr, url:URL.createObjectURL(file) };
    const b0=this.state.docs||this.docsRaw; const cur=Object.assign({},b0); const list=(cur[name]||[]).slice(); list.unshift(entry); cur[name]=list; this.setState({docs:cur});
    if(!this._sb){ return; }
    try{
      const slug=String(name).toLowerCase().replace(/[^a-z0-9]+/gi,'_').replace(/^_+|_+$/g,'')||'agence';
      const safe=String(file.name).replace(/[^a-zA-Z0-9._-]/g,'_');
      const path=slug+'/'+Date.now()+'-'+safe;
      const up=await this._sb.storage.from('documents').upload(path, file, {upsert:false, contentType:file.type||'application/octet-stream'});
      if(up.error){ console.warn('[docs] upload:', up.error.message); toast('Upload impossible (Storage)'); return; }
      const ins=await this._dbInsert('documents',{ creator:name, name:file.name, type, size:sizeStr, path, sort_order:0 });
      if(ins&&ins.id){ entry.id=ins.id; entry.path=path; this._docsTable=true; try{ const s=await this._sb.storage.from('documents').createSignedUrl(path,3600); if(s&&s.data&&s.data.signedUrl) entry.url=s.data.signedUrl; }catch(_){} this.setState({}); toast('Document ajouté ✓'); }
    }catch(e){ console.warn('[docs] add failed', e); }
  }
  // Supprime un document : binaire Storage + ligne table.
  async _deleteDoc(doc){ try{ if(doc&&doc.path) await this._sb.storage.from('documents').remove([doc.path]); }catch(_){} if(doc&&doc.id) this._dbDelete('documents', doc.id); }
  // Enregistre les coordonnées d'UN créateur dans sa ligne `creators` (colonnes
  // dédiées) — c'est le canal cloisonné (RLS) qui permet à chaque créateur de voir
  // SES infos et à l'agence de voir celles de tous. Appelé au « Enregistrer ».
  async _saveCreatorInfo(name){
    if(!this._sb || !name) return;
    const row=(this.rosterRaw||[]).find(c=>c && c.name===name); if(!row || !row.id) return;
    const m=Object.assign({}, this.rosterInfoRaw[name]||{}, (this.state.rosterInfo&&this.state.rosterInfo[name])||{});
    const patch={ ville:m.ville||null, phone:m.phone||null, email:m.email||null, address:m.address||null, siren:m.siren||null, birth:m.birth||null, exclu:!!m.exclu, commission:m.commission||null };
    try{ await this._sb.from('creators').update(patch).eq('id', row.id); }catch(e){ console.warn('[creators] save info', e); }
  }
  // Migration douce (agence) : recopie UNE fois les coordonnées stockées dans le
  // blob (rosterInfo) vers les colonnes de la table `creators`, pour que chaque
  // créateur les retrouve dans sa fiche. Non destructif : ne remplit que les
  // champs non vides, ne remet jamais à null.
  _pushRosterInfoToTable(){
    if(!this._sb || this.state.authRole!=='agency' || this._riPushed) return;
    const ri=this.state.rosterInfo||{}; const names=Object.keys(ri); if(!names.length) return;
    this._riPushed=true;
    names.forEach(nm=>{ const row=(this.rosterRaw||[]).find(c=>c&&c.name===nm); if(!row||!row.id) return;
      const m=ri[nm]||{}; const patch={};
      ['ville','phone','email','address','siren','birth','commission'].forEach(k=>{ if(m[k]!=null && String(m[k]).trim()!=='') patch[k]=m[k]; });
      if(m.exclu!=null) patch.exclu=!!m.exclu;
      if(Object.keys(patch).length){ try{ this._sb.from('creators').update(patch).eq('id', row.id).then(()=>{}); }catch(_){} }
    });
  }
  // ===== Couche d'accès aux données (scalable) — wrappers Supabase avec repli =====
  // Chaque méthode renvoie null si Supabase est indisponible / la requête échoue,
  // ce qui laisse le module concerné retomber sur le comportement local (zéro régression).
  async _dbList(table){ if(!this._sb) return null; try{ const {data,error}=await this._sb.from(table).select('*').order('sort_order',{ascending:true}); if(error){ console.warn('[db] list '+table+':',error.message); return null; } return data||[]; }catch(e){ console.warn('[db] list '+table,e); return null; } }
  async _dbInsert(table,row){ if(!this._sb) return null; try{ const {data,error}=await this._sb.from(table).insert(row).select(); if(error){ console.warn('[db] insert '+table+':',error.message); return null; } return (data&&data[0])||null; }catch(e){ return null; } }
  async _dbUpdate(table,id,patch){ if(!this._sb||!id) return; try{ const {error}=await this._sb.from(table).update(patch).eq('id',id); if(error){ console.warn('[db] update '+table+':',error.message); if(patch && Object.prototype.hasOwnProperty.call(patch,'date')){ const p2=Object.assign({},patch); delete p2.date; try{ await this._sb.from(table).update(p2).eq('id',id); }catch(_){} } } }catch(e){} }
  async _dbDelete(table,id){ if(!this._sb||!id) return; try{ const {error}=await this._sb.from(table).delete().eq('id',id); if(error) console.warn('[db] delete '+table+':',error.message); }catch(e){} }
  // Insert + liaison de l'id à l'item local, ROBUSTE à une suppression intervenue AVANT
  // la réponse réseau : si l'item a été marqué `_del` entre-temps (par son handler de
  // suppression, faute d'id à supprimer), on supprime aussitôt la ligne tout juste créée —
  // sinon elle "ressusciterait" au prochain chargement (item zombie). Sinon on lie l'id.
  _linkInsert(table,row,item){ if(!this._sb) return; try{ this._dbInsert(table,row).then(r=>{ if(r&&r.id){ if(item&&item._del){ this._dbDelete(table, r.id); } else if(item){ item.id=r.id; this.setState({}); } } }); }catch(_){} }
  // Sème une table UNE SEULE FOIS. Si l'utilisateur a tout supprimé (table vide
  // mais déjà semée), on NE re-sème PAS. Renvoie {status:'seeded'|'skip'|'fail'}.
  _markSeeded(entity){ if(!(this.state.seededTables && this.state.seededTables[entity])) this.setState(s=>({ seededTables:Object.assign({},s.seededTables||{},{[entity]:true}) })); }
  async _seedTable(entity, table, seedRows){
    if(this.state.seededTables && this.state.seededTables[entity]) return {status:'skip'};
    try{ const {data,error}=await this._sb.from(table).insert(seedRows).select(); if(error) return {status:'fail'}; this.setState(s=>({ seededTables:Object.assign({},s.seededTables||{},{[entity]:true}) })); return {status:'seeded', data:data||[]}; }catch(e){ return {status:'fail'}; }
  }
  // Première entité branchée sur sa table : PROSPECTS (pipeline marques).
  async _loadProspects(){
    const rows = await this._dbList('prospects');
    if(rows===null) return; // Supabase indisponible → repli local
    const map=(r)=>({ id:r.id, brand:r.brand, contact:r.contact||'', value:r.value||'—', stage:r.stage||'Prospection', tone:r.tone||'cyan' });
    if(rows.length){ this._prospectsTable=true; this._markSeeded('prospects'); this.setState({ prospectData: rows.map(map) }); return; }
    const seed=this.prospectRaw.map((p,i)=>({ brand:p.brand, contact:p.contact, value:p.value, stage:p.stage, tone:p.tone, sort_order:i }));
    const r=await this._seedTable('prospects','prospects',seed);
    if(r.status==='seeded'){ this._prospectsTable=true; this.setState({ prospectData: r.data.map(map) }); }
    else if(r.status==='skip'){ this._prospectsTable=true; this.setState({ prospectData: [] }); }
  }
  async _loadContacts(){
    const rows = await this._dbList('contacts');
    if(rows===null) return;
    const map=(r)=>({ id:r.id, brand:r.brand, person:r.person||'', role:r.role||'', tag:r.tag||'Autre', email:r.email||'', phone:r.phone||'', tone:r.tone||'cyan', last:'jamais', deals:'—' });
    if(rows.length){ this._contactsTable=true; this._markSeeded('contacts'); this.setState({ contactsData: rows.map(map) }); return; }
    const seed=this._contacts().map((c,i)=>({ brand:c.brand, person:c.person, role:c.role, tag:c.tag, email:c.email||'', phone:c.phone||'', tone:c.tone||'cyan', sort_order:i }));
    const r=await this._seedTable('contacts','contacts',seed);
    if(r.status==='seeded'){ this._contactsTable=true; this.setState({ contactsData: r.data.map(map) }); }
    else if(r.status==='skip'){ this._contactsTable=true; this.setState({ contactsData: [] }); }
  }
  async _loadInvoices(){
    const rows = await this._dbList('invoices');
    if(rows===null) return;
    const map=(r)=>({ id:r.id, ref:r.ref, party:r.party, amount:r.amount, date:r.date, status:r.status||'brouillon', creator:r.creator||'' });
    if(rows.length){ this._invoicesTable=true; this._markSeeded('invoices'); this.setState({ invoiceData: rows.map(map) }); return; }
    const seed=this.invoiceRaw.map((v,i)=>({ ref:v.ref, party:v.party, amount:v.amount, date:v.date, status:v.status, sort_order:i }));
    const r=await this._seedTable('invoices','invoices',seed);
    if(r.status==='seeded'){ this._invoicesTable=true; this.setState({ invoiceData: r.data.map(map) }); }
    else if(r.status==='skip'){ this._invoicesTable=true; this.setState({ invoiceData: [] }); }
  }
  async _loadTodos(){
    const rows = await this._dbList('todos'); if(rows===null) return;
    const map=(r)=>({ id:r.id, text:r.text, desc:r.descr||'', tag:r.tag||'', due:r.due||'—', creator:r.creator||null, priority:r.priority||'moyenne', source:r.source||'agency', done:!!r.done });
    // En mode table, le statut "terminé" vit dans la colonne `done` ; l'ancien
    // doneSet par index n'a plus de sens et fausserait le filtrage → on le purge.
    if(rows.length){ this._todosTable=true; this._markSeeded('todos'); this.setState({ todoItems: rows.map(map), doneSet:{} }); return; }
    const seed=this.todoRaw.map((t,i)=>({ text:t.text, descr:t.desc||'', tag:t.tag, due:t.due, creator:t.creator||null, priority:t.priority||'moyenne', source:t.source||'agency', sort_order:i }));
    const r=await this._seedTable('todos','todos',seed);
    if(r.status==='seeded'){ this._todosTable=true; this.setState({ todoItems:r.data.map(map), doneSet:{} }); }
    else if(r.status==='skip'){ this._todosTable=true; this.setState({ todoItems:[], doneSet:{} }); }
  }
  async _loadBriefs(){
    const rows = await this._dbList('briefs'); if(rows===null) return;
    const map=(r)=>({ id:r.id, brand:r.brand, creator:r.creator, who:r.who||r.creator, deliverables:r.deliverables||'', due:r.due||'', status:r.status||'cours', tone:r.tone||'cyan', consignes:r.consignes||'', budget:r.budget||'', objectif:r.objectif||'' });
    if(rows.length){ this._briefsTable=true; this._markSeeded('briefs'); this.setState({ briefItems: rows.map(map) }); return; }
    const seed=this.briefRaw.map((b,i)=>({ brand:b.brand, creator:b.creator, who:b.who, deliverables:b.deliverables, due:b.due, status:b.status, tone:b.tone, consignes:b.consignes, budget:b.budget, objectif:b.objectif, sort_order:i }));
    const r=await this._seedTable('briefs','briefs',seed);
    if(r.status==='seeded'){ this._briefsTable=true; this.setState({ briefItems:r.data.map(map) }); }
    else if(r.status==='skip'){ this._briefsTable=true; this.setState({ briefItems:[] }); }
  }
  async _loadIdeas(){
    const rows = await this._dbList('ideas'); if(rows===null) return;
    const map=(r)=>({ id:r.id, text:r.text, creator:r.creator||null, status:r.status||'À explorer', source:r.source||'agency' });
    if(rows.length){ this._ideasTable=true; this._markSeeded('ideas'); this.setState({ ideasData: rows.map(map) }); return; }
    const seed=this.ideasRaw.map((x,i)=>({ text:x.text, creator:x.creator, status:x.status, source:x.source, sort_order:i }));
    const r=await this._seedTable('ideas','ideas',seed);
    if(r.status==='seeded'){ this._ideasTable=true; this.setState({ ideasData:r.data.map(map) }); }
    else if(r.status==='skip'){ this._ideasTable=true; this.setState({ ideasData:[] }); }
  }
  async _loadEvents(){
    const rows = await this._dbList('events'); if(rows===null) return;
    const map=(r)=>({ id:r.id, day:r.day, date:r.date||null, time:r.time||'—', title:r.title, type:r.type||'call', who:r.who||null });
    if(rows.length){ this._eventsTable=true; this._markSeeded('events'); this.setState({ events: rows.map(map) }); return; }
    const seed=this.eventsRaw.map((e,i)=>({ day:e.day, time:e.time, title:e.title, type:e.type, who:e.who, sort_order:i }));
    const r=await this._seedTable('events','events',seed);
    if(r.status==='seeded'){ this._eventsTable=true; this.setState({ events:r.data.map(map) }); }
    else if(r.status==='skip'){ this._eventsTable=true; this.setState({ events:[] }); }
  }
  async _loadMessages(){
    const rows = await this._dbList('messages'); if(rows===null) return;
    const group=(arr)=>{ const o={}; arr.forEach(r=>{ const k=r.thread_key; (o[k]=o[k]||[]).push({from:r.sender, text:r.body, id:r.id}); }); return o; };
    if(rows.length){ this._messagesTable=true; this._markSeeded('messages'); this.setState({ threadMsgs: group(rows) }); return; }
    const seed=[]; Object.keys(this.msgsRaw).forEach(k=>{ this.msgsRaw[k].forEach((m,i)=>{ seed.push({ thread_key:String(k), sender:m.from, body:m.text, sort_order:i }); }); });
    const r=await this._seedTable('messages','messages',seed);
    if(r.status==='seeded'){ this._messagesTable=true; this.setState({ threadMsgs: group(r.data) }); }
    else if(r.status==='skip'){ this._messagesTable=true; this.setState({ threadMsgs: {} }); }
  }
  icon(name){ const M=(typeof window!=='undefined'&&window.__APPICONS__)||{}; const d=M[name]||M.documents||['M3.5 2h8a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 2 11.5v-8A1.5 1.5 0 0 1 3.5 2Z']; return React.createElement('svg',{width:16,height:16,viewBox:'0 0 15 15',fill:'currentColor',style:{display:'block'}}, d.map((p,i)=>React.createElement('path',{key:i,d:p,fillRule:'evenodd',clipRule:'evenodd'}))); }
  // Icône d'ACTION (boutons de ligne / topbar) — vraie icône Radix au lieu d'un glyphe.
  _ic(name, sz){ const M=(typeof window!=='undefined'&&window.__APPICONS__)||{}; const d=M[name]; if(!d) return ''; const s=sz||14; return React.createElement('svg',{width:s,height:s,viewBox:'0 0 15 15',fill:'currentColor',style:{display:'block'}}, d.map((p,i)=>React.createElement('path',{key:i,d:p,fillRule:'evenodd',clipRule:'evenodd'}))); }
  // Style de badge de priorité, coloré par urgence (rouge = haute, ambre = moyenne, gris = basse).
  _prioStyle(p, dark){ var m = p==='haute' ? (dark?['#F87171','#3A1414']:['#DC2626','#FEF2F2']) : p==='basse' ? (dark?['#A1A1AA','#27272A']:['#52525B','#F4F4F5']) : (dark?['#FBBF24','#332810']:['#B45309','#FFFBEB']); return "font:600 9px 'Inter',sans-serif;letter-spacing:.4px;padding:3px 8px;border-radius:6px;white-space:nowrap;color:"+m[0]+";background:"+m[1]+";"; }
  navItem(key, icon, label){ const active=this.state.view===key; const col=active?'var(--bg)':'var(--muted)'; const _bc={roster:this.rosterRaw.filter((_,i)=>!(this.state.deletedRoster||{})[i]).length, briefs:(this.state.briefItems||this.briefRaw).filter(b=>!((this.state.briefDone||{})[b.brand])).length, todo:(this.state.todoItems||this.todoRaw).filter((t,i)=> this._todosTable ? !t.done : !((this.state.doneSet||{})[i])).length, messages:0, idees:(this.state.ideasData||this.ideasRaw).filter(x=>x&&x.source==='creator').length}; const _b=_bc[key]||0; return { icon:this.icon(key), label, active, hasBadge:_b>0, badge:String(_b), badgeStyle:'min-width:18px;height:17px;padding:0 5px;border-radius:9px;display:flex;align-items:center;justify-content:center;font:700 9px \'Inter\',sans-serif;'+(active?'background:var(--bg);color:var(--text);':'background:var(--rowhover);color:var(--muted);'), itemStyle:'display:flex;align-items:center;gap:12px;padding:10px 16px;border-radius:13px;cursor:pointer;margin-bottom:3px;'+(active?'background:var(--text);':''), iconStyle:"font:600 14px 'Inter',sans-serif;color:"+col, labelStyle:"flex:1;font:500 13px 'Inter',sans-serif;color:"+col, go:()=>this.setState({view:key, rosterDetail:null, mobileNav:false}) }; }
  pNavItem(key, icon, label){ const active=this.state.portalTab===key; const col=active?'var(--bg)':'var(--muted)'; return { icon:this.icon(key), label, itemStyle:'display:flex;align-items:center;gap:12px;padding:11px 16px;border-radius:13px;cursor:pointer;margin-bottom:3px;'+(active?'background:var(--text);':''), iconStyle:"font:600 14px 'Inter',sans-serif;color:"+col, labelStyle:"flex:1;font:500 13px 'Inter',sans-serif;color:"+col, go:()=>this.setState({portalTab:key, mobileNav:false}) }; }
  invStatus(s){ return ({ payee:{label:'PAYÉE',tone:'signal'}, attente:{label:'EN ATTENTE',tone:'indigo'}, retard:{label:'EN RETARD',tone:'indigo'}, brouillon:{label:'BROUILLON',tone:'cyan'} })[s] || {label:'BROUILLON',tone:'cyan'}; }
  briefStatus(s){ return ({ valider:{label:'À VALIDER',tone:'indigo'}, cours:{label:'EN COURS',tone:'cyan'}, attente:{label:'EN ATTENTE',tone:'signal'} })[s] || {label:'EN COURS',tone:'cyan'}; }
  chip(label, dark){ return "display:inline-flex;align-items:center;gap:6px;padding:3px 9px;border-radius:6px;border:1px solid var(--hair);font:600 10px 'Inter',sans-serif;letter-spacing:.2px;color:var(--muted);white-space:nowrap;"; }

  msgTemplatesRaw = [
    {channel:'gmail', title:'Proposition de collaboration', body:"Bonjour [Prénom],\n\nJe suis [Votre nom] de l'agence TTP, qui accompagne des créateurs comme [Créateur] (audience [X]K, ER [X]%).\n\nNous pensons que [Créateur] correspondrait parfaitement à l'univers de [Marque] pour une campagne [format]. Seriez-vous disponible pour un appel cette semaine ?\n\nBien à vous,\n[Votre nom] — TTP Agency"},
    {channel:'gmail', title:'Relance facture impayée', body:"Bonjour [Prénom],\n\nSauf erreur de notre part, la facture #[Réf] d'un montant de [Montant] (échéance le [Date]) reste en attente de règlement.\n\nPourriez-vous nous indiquer une date de paiement ? Je reste disponible pour tout justificatif.\n\nMerci d'avance,\n[Votre nom] — TTP Agency"},
    {channel:'gmail', title:'Envoi du media kit', body:"Bonjour [Prénom],\n\nComme convenu, vous trouverez ci-joint le media kit de [Créateur] : statistiques d'audience, formats proposés et exemples de collaborations passées.\n\nN'hésitez pas si vous souhaitez un devis personnalisé.\n\nBelle journée,\n[Votre nom] — TTP Agency"},
    {channel:'linkedin', title:'Demande de connexion (marque)', body:"Bonjour [Prénom], je gère les partenariats créateurs chez TTP Agency. Nous travaillons avec des profils qui pourraient coller à vos campagnes [secteur]. Au plaisir d'échanger !"},
    {channel:'linkedin', title:'Pitch partenariat', body:"Bonjour [Prénom],\n\nMerci pour votre connexion ! Je représente [Créateur], spécialisé(e) en [niche] avec une communauté très engagée. Une collaboration avec [Marque] aurait beaucoup de sens. Êtes-vous la bonne personne pour en discuter, ou pourriez-vous m'orienter ?\n\nMerci !"},
    {channel:'instagram', title:'DM première approche', body:"Hello [Marque] 👋 Je gère les collabs de [Créateur] chez TTP. On adore ce que vous faites ! Une idée de collaboration nous trotte en tête — on vous envoie ça par mail ?"},
    {channel:'instagram', title:'Négociation tarif', body:"Merci pour votre retour ! Pour ce format ([livrables]), notre tarif est de [Montant]. Il inclut [droits/exclusivité]. On peut ajuster selon le volume — dites-moi ce qui colle à votre budget 🙌"},
    {channel:'tiktok', title:'DM collab UGC', body:"Salut ! 👋 [Créateur] crée du contenu UGC qui performe (ER [X]%). On serait ravis de produire des vidéos pour [Marque]. Je vous envoie un exemple + nos tarifs UGC ?"},
  ];

  // Cadrage d'une collaboration marque × créateur, façon talent manager :
  // chaque phase a des étapes attribuées à l'Agence ou au Créateur.
  checklistTemplate = [
    { phase:'1 · Cadrage & accord', items:[
      {t:'Brief marque reçu et clarifié', who:'Agence'},
      {t:'Tarif, livrables & exclusivité négociés', who:'Agence'},
      {t:'Créateur informé et OK sur le deal', who:'Créateur'},
      {t:'Contrat / bon de commande signé', who:'Agence'},
    ]},
    { phase:'2 · Préparation créative', items:[
      {t:'Brief créatif transmis au créateur', who:'Agence'},
      {t:'Concept / script proposé', who:'Créateur'},
      {t:'Concept validé par la marque', who:'Agence'},
      {t:'Date de tournage planifiée', who:'Créateur'},
      {t:'Produits / accès reçus', who:'Créateur'},
    ]},
    { phase:'3 · Production', items:[
      {t:'Contenu tourné', who:'Créateur'},
      {t:'Montage / retouches finalisés', who:'Créateur'},
      {t:'Mentions légales & #ad / collaboration ajoutées', who:'Créateur'},
    ]},
    { phase:'4 · Validation', items:[
      {t:'Contenu envoyé à l’agence', who:'Créateur'},
      {t:'Validation interne agence', who:'Agence'},
      {t:'Validation finale de la marque', who:'Agence'},
      {t:'Retours / modifications intégrés', who:'Créateur'},
    ]},
    { phase:'5 · Publication', items:[
      {t:'Date & heure de publication confirmées', who:'Agence'},
      {t:'Contenu publié', who:'Créateur'},
      {t:'Lien / preuve de publication envoyé', who:'Créateur'},
    ]},
    { phase:'6 · Bilan & paiement', items:[
      {t:'Statistiques récupérées (reach, ER, clics)', who:'Créateur'},
      {t:'Reporting envoyé à la marque', who:'Agence'},
      {t:'Facture émise', who:'Agence'},
      {t:'Paiement reçu & créateur payé', who:'Agence'},
    ]},
  ];
  modules = {
    rosterugc: { title:'Roster UGC', section:'Créateurs', sub:'Créateurs UGC', action:'+ CRÉATEUR UGC', rows:[
      {a:'JADE NGUYEN', b:'Food · 9 deals ce mois', c:'8,1% ER', tone:'signal'},
      {a:'SACHA DELAUNAY', b:'Tech · 11 deals ce mois', c:'9,4% ER', tone:'indigo'},
      {a:'LISA MOREAU', b:'Beauté · 6 deals ce mois', c:'7,6% ER', tone:'cyan'},
      {a:'YANIS COHEN', b:'Lifestyle · 4 deals ce mois', c:'6,9% ER', tone:'indigo'},
    ]},
    checklist: { title:'Checklist', section:'Agence', sub:'Onboarding créateur', action:'+ ÉTAPE', rows:[
      {a:'Signer contrat de représentation', b:'Étape 1 · juridique', c:'FAIT', tone:'signal'},
      {a:'Créer fiche créateur + médias', b:'Étape 2 · roster', c:'FAIT', tone:'signal'},
      {a:'Définir grille tarifaire', b:'Étape 3 · pricing', c:'EN COURS', tone:'indigo'},
      {a:'Connecter comptes & stats', b:'Étape 4 · engagement', c:'À FAIRE', tone:'cyan'},
    ]},
    idees: { title:'Idées de contenu', section:'Outils', sub:'Pipeline créatif', action:'+ IDÉE', rows:[
      {a:'GRWM été × Sephora', b:'CAMILLE · format reel', c:'VALIDÉE', tone:'signal'},
      {a:'Setup gaming 2026', b:'THÉO · YouTube long', c:'BROUILLON', tone:'cyan'},
      {a:'Routine running matinale', b:'MALO · 3 stories', c:'À DISCUTER', tone:'indigo'},
      {a:'Unboxing Dior Beauty', b:'CAMILLE · reel', c:'PLANIFIÉE', tone:'indigo'},
    ]},
    debrief: { title:'Debrief', section:'Outils', sub:'Bilans de campagne', action:'+ DEBRIEF', rows:[
      {a:'Sephora — Collection printemps', b:'CAMILLE · 2,4 M reach', c:'ROI 4,1×', tone:'signal'},
      {a:'Logitech — Setup', b:'THÉO · 1,8 M reach', c:'ROI 3,2×', tone:'indigo'},
      {a:'Galeries Lafayette', b:'LÉNA · 980 K reach', c:'ROI 2,7×', tone:'cyan'},
    ]},
    templates: { title:'Templates', section:'Outils', sub:'Modèles & documents', action:'+ TEMPLATE', rows:[
      {a:'Contrat de représentation', b:'Document · DOCX', c:'MODÈLE', tone:'indigo'},
      {a:'Brief créatif marque', b:'Document · Notion', c:'MODÈLE', tone:'cyan'},
      {a:'Devis & grille tarifaire', b:'Tableur · XLSX', c:'MODÈLE', tone:'signal'},
      {a:'Email de prospection', b:'Email · texte', c:'MODÈLE', tone:'indigo'},
    ]},
  };

  renderVals(){
    const dark = this.state.theme === 'dark';
    // Roster vide (l'agence n'a encore ajouté aucun créateur) : objet créateur
    // neutre pour qu'aucune vue qui suppose « au moins un créateur » ne plante.
    const _EMPTY_CR = { name:'', handle:'', niche:'', plat:'', followers:'—', reach:'—', er:'—', ca:'—', tone:'cyan', status:'', trend:0, id:null };
    const _crAt = (i)=> (i!=null && this.rosterRaw[i]) || _EMPTY_CR;
    const _hasRoster = (this.rosterRaw||[]).length>0;
    const mobileNav = !!this.state.mobileNav;
    const navOpenCls = mobileNav ? ' nav-open' : '';
    const openMobileNav = () => this.setState({mobileNav:true});
    const closeMobileNav = () => this.setState({mobileNav:false});
    // lightweight toast for confirmations / export actions
    const toast = (msg) => { this.setState({toast:msg}); setTimeout(()=>this.setState(s=> s.toast===msg ? {toast:null} : {}), 2200); };
    const _bbStyle = (key) => "flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:7px 2px;cursor:pointer;color:"+(this.state.view===key?'var(--text)':'var(--faint)')+";font:600 9px 'Inter',sans-serif";
    const _bbMk = (key,label,extra) => ({ icon:this.icon(key), iconTxt:'', label, cls:'bn-item'+(this.state.view===key?' bn-active':''), style:_bbStyle(key), tap:()=>this.setState(Object.assign({view:key, mobileNav:false}, extra||{})) });
    const _menuItem = { icon:'', iconTxt:'⋯', label:'Plus', cls:'bn-item bn-menu'+(this.state.mobileNav?' bn-active':''), style:"flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:7px 2px;cursor:pointer;color:var(--faint);font:600 9px 'Inter',sans-serif", tap:openMobileNav };
    // Barre du bas mobile (agence) = vues les plus quotidiennes : Aperçu, À faire,
    // Roster, Messages. Le reste reste accessible via « Plus ».
    const bottomNav = [ _bbMk('apercu','Aperçu'), _bbMk('todo','À faire'), _bbMk('roster','Roster',{rosterDetail:null}), _bbMk('facturation','Facturation'), _menuItem ];
    const _pbMk = (key,label) => ({ icon:this.icon(key), iconTxt:'', label, cls:'bn-item'+(this.state.portalTab===key?' bn-active':''), style:"flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:7px 2px;cursor:pointer;color:"+(this.state.portalTab===key?'var(--text)':'var(--faint)')+";font:600 9px 'Inter',sans-serif", tap:()=>this.setState({portalTab:key, mobileNav:false}) });
    // Barre du bas mobile (créateur) = ce qu'il consulte le plus : Accueil, Briefs,
    // Planning, Documents. Messages reste accessible via « Plus ».
    const portalBottomNav = [ _pbMk('accueil','Accueil'), _pbMk('briefs','Briefs'), _pbMk('planning','Planning'), _pbMk('documents','Documents'), _menuItem ];
    const themeVars = dark
      ? '--bg:#09090B;--panel:#18181B;--surface:#18181B;--text:#FAFAFA;--muted:#A1A1AA;--faint:#71717A;--hair:#27272A;--rowhover:#27272A;--signal:#16A34A;--signaltext:#4ADE80;--signalsoft:#052E16;--indigo:#818CF8;--amber:#FBBF24;--cyan:#A1A1AA;--onsignal:#FFFFFF;'
      : '--bg:#FAFAFA;--panel:#F4F4F5;--surface:#FFFFFF;--text:#18181B;--muted:#52525B;--faint:#A1A1AA;--hair:#E4E4E7;--rowhover:#F4F4F5;--signal:#16A34A;--signaltext:#15803D;--signalsoft:#F0FDF4;--indigo:#6366F1;--amber:#F59E0B;--cyan:#71717A;--onsignal:#FFFFFF;';

    const sig = this.toneHex('signal', dark);
    const empty = dark ? '#232323' : '#E2E5EA';
    const greenText = dark ? '#70FC8E' : '#16A34A';
    const redish = dark ? '#A8B0BA' : '#8590A1';

    const goRoster=()=>this.setState({view:'roster'}), goFacturation=()=>this.setState({view:'facturation'}),
      goObjectifs=()=>this.setState({view:'objectifs'}), goContacts=()=>this.setState({view:'contacts'}),
      goPlanning=()=>this.setState({view:'planning'}), goBriefs=()=>this.setState({view:'briefs'}),
      goTodo=()=>this.setState({view:'todo'}), goProspection=()=>this.setState({view:'prospection'}),
      goEngagement=()=>this.setState({view:'engagement'}), goRosterUgc=()=>this.setState({view:'rosterugc'});

    const statusLabelOf = (s) => ({ live:'LIVE', actif:'ACTIF', pause:'PAUSE' })[s] || 'ACTIF';
    const dotS = (tone, pulse) => 'width:7px;height:7px;border-radius:50%;flex-shrink:0;background:'+this.toneHex(tone,dark)+';'+(pulse?'animation:ttp-pulse 1.6s infinite;':'');

    // ---- to-do (toggle) ----
    const done = this.state.doneSet || {};
    const _todoTableMode = !!this._todosTable;
    const mkTodo = (t, i) => {
      // table mode: "done" is a per-row property (stable). local mode: index-based doneSet.
      const isDone = _todoTableMode ? !!t.done : !!done[i];
      return {
        done: isDone,
        text: t.text, tag: t.tag||'', due: t.due||'', desc: t.desc||'', hasDesc: !!t.desc, creator: t.creator||null, creatorLabel: t.creator||'Agence', fromCreator: t.source==='creator', hasPriority: !!t.priority, priorityLabel: t.priority?t.priority.toUpperCase():'', priorityStyle: this._prioStyle(t.priority, dark),
        check: isDone ? this._check() : '',
        boxStyle: 'width:16px;height:16px;border-radius:5px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font:700 9px \'Inter\',sans-serif;'+(isDone?'background:var(--signal);color:var(--onsignal);':'border:1.5px solid var(--faint);color:transparent;'),
        textStyle: "flex:1;font:400 13px 'Inter',sans-serif;"+(isDone?'color:var(--faint);text-decoration:line-through;':'color:var(--text);'),
        tagStyle: "font:600 8px 'Inter',sans-serif;letter-spacing:.5px;color:var(--muted);padding:3px 8px;border-radius:6px;background:var(--rowhover);",
        open: (e) => { if(e&&e.stopPropagation)e.stopPropagation(); this.setState({ todoOpen:t }); },
        toggle: (e) => { if(e&&e.stopPropagation)e.stopPropagation(); if(_todoTableMode){ const nv=!t.done; if(t.id) this._dbUpdate('todos', t.id, {done:nv}); this.setState(s=>({ todoItems:(s.todoItems||this.todoRaw).map(x=> x===t ? Object.assign({},x,{done:nv}) : x) })); } else { const nv=!(this.state.doneSet && this.state.doneSet[i]); this.setState(s => ({ doneSet: Object.assign({}, s.doneSet, { [i]: nv }) })); } },
        del: (e) => { if(e&&e.stopPropagation)e.stopPropagation(); if(!window.confirm('Supprimer cette tâche ?'))return; if(this._todosTable){ if(t.id) this._dbDelete('todos', t.id); else t._del=true; } this.setState(s=>{ const items=(s.todoItems||this.todoRaw).slice(); items.splice(i,1); const od=s.doneSet||{}; const nd={}; Object.keys(od).forEach(kk=>{ const k=+kk; if(k<i) nd[k]=od[k]; else if(k>i) nd[k-1]=od[k]; }); return { todoItems:items, doneSet:nd }; }); },
        edit: (e) => { if(e&&e.stopPropagation)e.stopPropagation(); const nv=window.prompt('Modifier la tâche :', t.text); if(nv==null)return; const v=nv.trim(); if(!v)return; if(this._todosTable && t.id) this._dbUpdate('todos', t.id, {text:v}); this.setState(s=>{ const arr=(s.todoItems||this.todoRaw).slice(); arr[i]=Object.assign({},arr[i],{text:v}); return { todoItems:arr }; }); },
      };
    };
    const todoItems = this.state.todoItems || this.todoRaw;
    const todoFilter = this.state.todoFilter || 'todo';
    // _done doit suivre la MÊME logique que mkTodo : en mode table = t.done,
    // sinon doneSet[i]. (Sinon un vieux doneSet par index marque à tort les
    // nouvelles tâches comme terminées.)
    const _allTodos = todoItems.map((t,i)=>{ const o=mkTodo(t,i); o._done=!!o.done; return o; });
    // filtre par créateur (null = tous, '__agency__' = tâches agence sans créateur)
    const todoCreatorFilter = this.state.todoCreatorFilter===undefined ? null : this.state.todoCreatorFilter;
    const _todosByStatus = _allTodos.filter(x=> todoFilter==='all' ? true : (todoFilter==='done' ? x._done : !x._done));
    const todos = _todosByStatus.filter(x=> todoCreatorFilter==null ? true : (todoCreatorFilter==='__agency__' ? !x.creator : x.creator===todoCreatorFilter));
    const todoFilterTabs = [['todo','À faire'],['done','Terminées'],['all','Toutes']].map(p=>({ label:p[1], style:"padding:7px 13px;border-radius:9px;font:600 10px 'Inter',sans-serif;cursor:pointer;white-space:nowrap;"+(todoFilter===p[0]?'background:var(--text);color:var(--bg);':'color:var(--muted);'), pick:(()=>{const k=p[0];return ()=>this.setState({todoFilter:k});})() }));
    // Détail d'une tâche (clic sur la ligne) : titre + description + méta + actions.
    const _toItem = this.state.todoOpen;
    let todoDetail=null;
    if(_toItem){ const _i=todoItems.indexOf(_toItem); const o=_i>=0?mkTodo(_toItem,_i):null;
      if(o){ todoDetail={ text:o.text, hasDesc:o.hasDesc, noDesc:!o.hasDesc, desc:o.desc||'', creatorLabel:o.creatorLabel, fromCreator:o.fromCreator, hasPriority:o.hasPriority, priorityLabel:o.priorityLabel, priorityStyle:o.priorityStyle, due:o.due||'—', done:o.done, statusLabel:o.done?'Terminée':'À faire', toggleLabel:o.done?'Rouvrir':'Marquer terminée', toggle:()=>{ o.toggle(); this.setState(s=>({ todoOpen: s.todoOpen })); }, edit:(e)=>{ o.edit(e); }, del:(e)=>{ o.del(e); this.setState({todoOpen:null}); } }; }
    }
    const todoDetailOpen = todoDetail!=null;
    const closeTodoDetail = ()=>this.setState({todoOpen:null});
    // puces de filtre créateur : Tous · Agence · chaque créateur (avec compteur "à faire")
    const _todoCount=(val)=> _allTodos.filter(x=> !x._done && (val==null?true:(val==='__agency__'?!x.creator:x.creator===val))).length;
    const _mkTodoCF=(label,val)=>({ label, count:_todoCount(val), style:'display:flex;align-items:center;gap:6px;padding:7px 13px;border-radius:20px;font:600 10px \'Inter\',sans-serif;cursor:pointer;white-space:nowrap;'+(todoCreatorFilter===val?'background:var(--text);color:var(--bg);':'background:var(--surface);border:1px solid var(--hair);color:var(--muted);'), pick:(()=>{const v=val;return ()=>this.setState({todoCreatorFilter:v});})() });
    const todoCreatorTabs = [_mkTodoCF('Tous',null), _mkTodoCF('Agence','__agency__')].concat(this.rosterRaw.filter((_,i)=>!(this.state.deletedRoster||{})[i]).map(c=>_mkTodoCF(c.name.split(' ')[0], c.name)));
    const ntPr = this.state.ntPriority||'moyenne';
    const ntCreatorChips = [{name:'Agence',val:null}].concat(this.rosterRaw.map(c=>({name:c.name.split(' ')[0],val:c.name}))).map(o=>({ name:o.name, style:'padding:6px 12px;border-radius:18px;font:600 9px \'Inter\',sans-serif;cursor:pointer;'+(((this.state.ntCreator===undefined?null:this.state.ntCreator))===o.val?'background:var(--text);color:var(--bg);':'background:var(--rowhover);color:var(--muted);'), pick:(()=>{const v=o.val;return ()=>this.setState({ntCreator:v});})() }));
    const ntPriorityChips = [['haute','Haute','indigo'],['moyenne','Moyenne','cyan'],['basse','Basse','signal']].map(p=>({ label:p[1], style:'padding:7px 12px;border-radius:18px;font:600 9px \'Inter\',sans-serif;cursor:pointer;'+(ntPr===p[0]?'background:'+this.toneHex(p[2],dark)+';color:#fff;':'border:1px solid var(--hair);color:var(--muted);'), pick:(()=>{const k=p[0];return ()=>this.setState({ntPriority:k});})() }));
    const ideasItems = this.state.ideasData || this.ideasRaw;
    const ideaTone = (s)=>/valid|termin/i.test(s)?'signal':(/cours/i.test(s)?'cyan':'indigo');
    const _mkIdea = (o,i)=>({ text:o.text, creatorLabel:o.creator||'Toutes', creator:o.creator||'Toutes', status:o.status, source:o.source==='creator'?'Proposée par le créateur':'Ajoutée par l’agence', fromCreator:o.source==='creator', dotStyle:dotS(ideaTone(o.status),false), statusStyle:"font:600 8px 'Inter',sans-serif;letter-spacing:.5px;padding:4px 9px;border-radius:20px;white-space:nowrap;color:"+this.toneHex(ideaTone(o.status),dark)+";background:"+this.toneHex(ideaTone(o.status),dark)+"18;", open:(()=>{const k=i;return ()=>this.setState({ideaOpen:k});})(), del:(e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); if(!window.confirm('Supprimer cette idée ?'))return; if(this._ideasTable){ if(o.id) this._dbDelete('ideas', o.id); else o._del=true; } this.setState(s=>({ ideasData:(s.ideasData||this.ideasRaw).filter(x=>x!==o), ideaOpen:null })); }, edit:(e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); const nv=window.prompt("Modifier l'idée :", o.text); if(nv==null)return; const v=nv.trim(); if(!v)return; if(this._ideasTable && o.id) this._dbUpdate('ideas', o.id, {text:v}); this.setState(s=>({ ideasData:(s.ideasData||this.ideasRaw).map(x=> x===o ? Object.assign({},x,{text:v}) : x) })); } });
    const ideas = ideasItems.map(_mkIdea);
    const _ideaOpenIdx = this.state.ideaOpen;
    const ideaOpenObj = (_ideaOpenIdx!=null && ideasItems[_ideaOpenIdx]) ? _mkIdea(ideasItems[_ideaOpenIdx], _ideaOpenIdx) : null;
    const ideaDetailOpen = ideaOpenObj!=null;
    const closeIdea = ()=>this.setState({ideaOpen:null});
    // ===== DEBRIEF (clickable campaign report to send to the brand) =====
    // base effective : liste personnalisée si elle existe, sinon le seed moins les supprimés
    const _dbBase = this.state.debriefData || this.debriefRaw.filter((_,i)=>!(this.state.deletedDebriefs||{})[i]);
    const _dbCommit = (s)=> (s.debriefData || this.debriefRaw.filter((_,i)=>!(s.deletedDebriefs||{})[i]));
    const _mkDebrief = (o,i)=>({ brand:o.brand, creator:o.creator, period:o.period, deliverables:o.deliverables, budget:o.budget, revenue:o.revenue, roi:o.roi, summary:o.summary,
      dotStyle:dotS(o.tone||'cyan',false), roiChipStyle:"font:600 9px 'Inter',sans-serif;letter-spacing:.5px;color:"+this.toneHex(o.tone||'cyan',dark)+";background:"+this.toneHex(o.tone||'cyan',dark)+"18;padding:5px 11px;border-radius:20px;white-space:nowrap;",
      kpis:o.kpis||[], highlights:o.highlights||[],
      open:(()=>{const k=i;return ()=>this.setState({debriefOpen:k});})(),
      del:(()=>{const k=i,nm=o.brand;return (e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); if(!window.confirm('Supprimer le debrief « '+nm+' » ?'))return; this.setState(s=>({ debriefData:_dbCommit(s).filter((_,j)=>j!==k), debriefOpen:(s.debriefOpen===k?null:s.debriefOpen) })); };})() });
    const debriefList = _dbBase.map(_mkDebrief);
    const _dbOpenIdx = this.state.debriefOpen;
    let debriefOpenObj = null;
    if(_dbOpenIdx!=null && _dbBase[_dbOpenIdx]){ const o=_dbBase[_dbOpenIdx]; const d=_mkDebrief(o,_dbOpenIdx); const _ok=o.kpis||[], _oh=o.highlights||[];
      const shareText='DEBRIEF DE CAMPAGNE — '+o.brand+'\nCréateur : '+o.creator+'\nPériode : '+o.period+'\nLivrables : '+(o.deliverables||'')+'\n\nRÉSULTATS :\n'+_ok.map(k=>'· '+k.l+' : '+k.v).join('\n')+'\n\nInvestissement : '+o.budget+'  |  CA généré : '+o.revenue+'  |  ROI : '+o.roi+'\n\nSYNTHÈSE :\n'+(o.summary||'')+'\n\nPOINTS FORTS :\n'+_oh.map(h=>'· '+h).join('\n')+'\n\n— TTP Agency';
      debriefOpenObj=Object.assign({}, d, {
        share:()=>{ try{ if(navigator.share){ navigator.share({title:'Debrief '+o.brand, text:shareText}).catch(()=>{}); return; } }catch(_){} try{ if(navigator.clipboard){ navigator.clipboard.writeText(shareText).catch(()=>{}); } }catch(_){} toast('Debrief copié — prêt à envoyer'); },
        shareEmail:()=>{ window.location.href='mailto:?subject='+encodeURIComponent('Debrief de campagne — '+o.brand)+'&body='+encodeURIComponent(shareText); },
      }); }
    const debriefDetailOpen = debriefOpenObj!=null;
    const closeDebrief = ()=>this.setState({debriefOpen:null});
    const niCreatorChips = [{name:'Toutes',val:null}].concat(this.rosterRaw.map(c=>({name:c.name.split(' ')[0],val:c.name}))).map(o=>({ name:o.name, style:'padding:6px 12px;border-radius:18px;font:600 9px \'Inter\',sans-serif;cursor:pointer;'+(((this.state.niCreator===undefined?null:this.state.niCreator))===o.val?'background:var(--text);color:var(--bg);':'background:var(--rowhover);color:var(--muted);'), pick:(()=>{const v=o.val;return ()=>this.setState({niCreator:v});})() }));
    const niStatusChips = ['\u00c0 explorer','En cours','Valid\u00e9e'].map(s=>({ label:s, style:'padding:7px 12px;border-radius:18px;font:600 9px \'Inter\',sans-serif;cursor:pointer;'+((this.state.niStatus||'\u00c0 explorer')===s?'background:var(--signal);color:var(--onsignal);':'border:1px solid var(--hair);color:var(--muted);'), pick:(()=>{const k=s;return ()=>this.setState({niStatus:k});})() }));
    const _meCr=this._meCreator()||_EMPTY_CR;
    const myCreatorName = (_meCr&&_meCr.name)?_meCr.name:null;
    const _ideaCycle=['À faire','En cours','Terminée'];
    const myIdeas = ideasItems.map((o,idx)=>({o,idx})).filter(x=>x.o.creator===myCreatorName).map(x=>{ const cur=x.o.status||'À faire'; const ni=_ideaCycle.indexOf(cur); const next=_ideaCycle[(ni+1)%_ideaCycle.length]; return { text:x.o.text, status:cur, fromCreator:x.o.source==='creator', dotStyle:dotS(ideaTone(cur),false), statusStyle:"font:600 8px 'Inter',sans-serif;letter-spacing:.5px;padding:5px 11px;border-radius:20px;white-space:nowrap;cursor:pointer;color:"+this.toneHex(ideaTone(cur),dark)+";background:"+this.toneHex(ideaTone(cur),dark)+"18;", cycleStatus:(()=>{const obj=x.o;return ()=>{ if(this._ideasTable && obj.id) this._dbUpdate('ideas', obj.id, {status:next}); this.setState(s=>({ ideasData:(s.ideasData||this.ideasRaw).map(z=> z===obj ? Object.assign({},z,{status:next}) : z) })); };})() }; });

    // ---- events / calendar ----
    const events = this.state.events || this.eventsRaw;
    const eventDeco = (e) => { const t=this.eventTypeMap[e.type]||this.eventTypeMap.call; return { dotStyle:'width:6px;height:6px;border-radius:50%;flex-shrink:0;background:'+this.toneHex(t.tone,dark)+';', chipStyle:"display:flex;align-items:center;gap:5px;min-width:0;max-width:100%;overflow:hidden;font:600 9px 'Inter',sans-serif;color:var(--text);background:var(--rowhover);border-radius:6px;padding:3px 6px;", label:(e.time?e.time+' ':'')+e.title, time:e.time, title:e.title, tone:t.tone }; };
    const _moNames=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
    const _now = new Date();                              // date réelle du jour
    const _todayY=_now.getFullYear(), _todayMo=_now.getMonth(), _todayDay=_now.getDate();
    const calOffset = this.state.calOffset||0;            // 0 = mois courant réel
    const _calD = new Date(_todayY, _todayMo + calOffset, 1);
    const _calY = _calD.getFullYear(), _calM = _calD.getMonth();
    const calLabel = _moNames[_calM] + ' ' + _calY;
    const _daysIn = new Date(_calY, _calM + 1, 0).getDate();
    const _showEv = calOffset === 0;                       // (conservé pour le surlignage "aujourd'hui")
    // Date effective d'un événement : sa date complète YYYY-MM-DD si présente, sinon
    // (anciens événements ne stockant qu'un n° de jour) rattaché au mois réel courant.
    const _evDate = (e)=>{ if(e && e.date && /^\d{4}-\d{2}-\d{2}$/.test(e.date)) return e.date; const d=Number(e&&e.day)||1; return String(_todayY)+'-'+String(_todayMo+1).padStart(2,'0')+'-'+String(d).padStart(2,'0'); };
    const _todayStr = String(_todayY)+'-'+String(_todayMo+1).padStart(2,'0')+'-'+String(_todayDay).padStart(2,'0');
    const prevMonth = () => this.setState(s=>({ calOffset:(s.calOffset||0)-1 }));
    const nextMonth = () => this.setState(s=>({ calOffset:(s.calOffset||0)+1 }));
    const firstDow = _calD.getDay(); // 0 Sun
    const lead = (firstDow + 6) % 7; // Monday-first
    const cells = [];
    const totalCells = Math.ceil((lead + _daysIn) / 7) * 7;
    for (let i = 0; i < totalCells; i++){
      const day = i - lead + 1;
      const has = day >= 1 && day <= _daysIn;
      const _cellDate = has ? (String(_calY)+'-'+String(_calM+1).padStart(2,'0')+'-'+String(day).padStart(2,'0')) : '';
      const dayEvents = has ? events.filter(e => _evDate(e) === _cellDate).map(eventDeco) : [];
      const isToday = _showEv && day === _todayDay;
      const _sel = has && _cellDate === this.state.planSelDate;
      cells.push({
        day: has ? day : '', hasDay: has, isToday,
        chips: dayEvents.slice(0,2),
        hasMore: dayEvents.length > 2,
        moreLabel: '+' + (dayEvents.length - 2),
        cellStyle: 'min-height:88px;min-width:0;overflow:hidden;border-radius:12px;padding:8px;cursor:'+(has?'pointer':'default')+';'+(has?('background:'+(isToday?'var(--signalsoft)':'var(--panel)')+';'):'background:transparent;')+(_sel?'border:2px solid var(--text);':(isToday?'border:1px solid var(--signal);':'border:2px solid transparent;')),
        numStyle: 'font:600 12px \'Inter\',sans-serif;color:'+(isToday?'var(--signaltext)':'var(--text)')+';',
        select: has ? (()=>{ const _d=day, _ds=_cellDate; return () => this.setState(s => ({ planSelDay:_d, planSelDate:_ds, showEventForm:false, ne: Object.assign({}, s.ne, { day:_d, date:_ds }) })); })() : (()=>{}),
        selected: has && _cellDate===this.state.planSelDate,
      });
    }
    const eventTypes = Object.keys(this.eventTypeMap).map(k => { const t=this.eventTypeMap[k]; const sel=this.state.ne.type===k; return { label:t.label, dotStyle:'width:7px;height:7px;border-radius:50%;background:'+this.toneHex(t.tone,dark)+';', chipStyle:'display:flex;align-items:center;gap:6px;padding:8px 12px;border-radius:20px;font:600 10px \'Inter\',sans-serif;cursor:pointer;'+(sel?'background:var(--text);color:var(--bg);':'border:1px solid var(--hair);color:var(--muted);'), pick:()=>this.setState(s=>({ne:Object.assign({},s.ne,{type:k})})) }; });

    // ---- roster / engagement ----
    const rf = this.state.rosterFilter||'all';
    const rosterAll = this.rosterRaw.map((c,i) => ({ name:c.name, handle:c.handle, niche:c.niche, isUgc:/ugc/i.test(c.niche), followers:c.followers, er:c.er, ca:c.ca, initials:this.initials(c.name), avatarStyle:this.avatarFor(c.name,c.tone,dark,34), statusLabel:statusLabelOf(c.status), dotStyle:dotS(c.tone, c.status==='live'), open:(()=>{const ii=i;return ()=>this.setState({rosterDetail:ii});})(), del:(()=>{const ii=i, nm=c.name, cid=c.id;return (e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); if(window.confirm('Retirer '+nm+' du roster ?')){ this.rosterRaw=this.rosterRaw.filter((_,j)=>j!==ii); this.setState({ rosterData:this.rosterRaw.slice(), rosterEdited:true, rosterDetail:null }); toast('Créateur retiré ✓'); if(this._sb && cid){ this._sb.from('creators').delete().eq('id', cid).then(({error})=>{ if(error) console.warn('[supabase] delete:', error.message); }); } } };})() })).filter((_,i)=>!(this.state.deletedRoster||{})[i]);
    const q = (this.state.topSearch||'').trim().toLowerCase();
    const _match = (...parts) => !q || parts.join(' ').toLowerCase().includes(q);
    const roster = rosterAll.filter(c=> rf==='all'?true:(rf==='ugc'?c.isUgc:!c.isUgc)).filter(c=> _match(c.name,c.handle,c.niche));
    const rosterTab=(k,label)=>({ label, style:'padding:7px 13px;border-radius:9px;font:600 10px \'Inter\',sans-serif;cursor:pointer;'+(rf===k?'background:var(--text);color:var(--bg);':'color:var(--muted);'), pick:(()=>{const kk=k;return ()=>this.setState({rosterFilter:kk, rosterDetail:null});})() });
    const rosterTabs=[rosterTab('all','TOUS'),rosterTab('influence','INFLUENCE'),rosterTab('ugc','UGC')];
    const rosterCount = roster.length+' '+(rf==='ugc'?'UGC':(rf==='influence'?'influence':'représentés'));
    const engagement = this.rosterRaw.map((c,i)=>({c,i})).filter(x=>!(this.state.deletedRoster||{})[x.i]).map(({c,i}) => { const base=Math.round(parseFloat(c.er)); const spark=this.bars([40,55,48,62,58,72,66,80,76,90].map(v=>v*(0.7+base/12)).map(v=>Math.min(100,v)), this.toneHex(c.tone,dark), 3); return { name:c.name, er:c.er, reach:c.reach, initials:this.initials(c.name), avatarStyle:this.avatarFor(c.name,c.tone,dark,30), spark, trend:(c.trend>0?'+':'')+c.trend+' pt', trendColor: c.trend>=0?greenText:redish, open:(()=>{const nm=c.name;return ()=>this.setState({engDetail:nm});})(), del:(()=>{const ii=i,nm=c.name,cid=c.id;return (e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); if(!window.confirm('Retirer '+nm+' du roster ? La ligne disparaîtra de l\'engagement.'))return; this.rosterRaw=this.rosterRaw.filter((_,j)=>j!==ii); this.setState({ rosterData:this.rosterRaw.slice(), rosterEdited:true, rosterDetail:null }); toast('Créateur retiré ✓'); if(this._sb && cid){ this._sb.from('creators').delete().eq('id', cid).then(({error})=>{ if(error) console.warn('[supabase] delete:', error.message); }); } };})() }; });

    // ----- Détail engagement d'un créateur (clic sur un nom) : stats complètes + historique -----
    const _edFmtN = (n)=>String(Math.round(Number(n)||0)).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
    const _moNamesH=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
    const _monthLabel=(h)=>{ if(h&&h.savedAtTs){ const d=new Date(h.savedAtTs); if(!isNaN(d.getTime())) return (_moNamesH[d.getMonth()]||'')+' '+d.getFullYear(); } const s=String((h&&h.savedAt)||''); const m=s.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/); return m?((_moNamesH[(+m[2])-1]||'')+' '+m[3]):'Autres mesures'; };
    // Groupe une liste de mesures par MOIS (l'agence fait les stats chaque mois).
    const _groupByMonth=(list)=>{ const grp=[], idx={}; (list||[]).forEach(h=>{ const ml=_monthLabel(h); if(idx[ml]==null){ idx[ml]=grp.length; grp.push({month:ml, entries:[]}); } grp[idx[ml]].entries.push({ er:h.er||'—', platform:h.platformLabel||'', verdict:h.verdict||'', date:h.savedAt||'', detail:h.detail||'', followers:(h.followers?(h.followers+' abonnés'):'') }); }); return grp; };
    const _edName = this.state.engDetail;
    let engDetailObj = null;
    if(_edName){ const c=this.rosterRaw.find(x=>x&&x.name===_edName);
      if(c){ const st=c.stats||null; const hist=(c.statsHistory||[]);
        engDetailObj = {
          name:c.name, initials:this.initials(c.name), avatarStyle:this.avatarFor(c.name,c.tone,dark,40),
          hasStats:!!(st&&st.metrics), er:(st?st.er:'—'), platform:(st?st.platformLabel:'—'), verdict:(st?st.verdict:''), followers:((st&&st.followers)?st.followers:((c.followers&&c.followers!=='0')?c.followers:'—')),
          savedAt:(st&&st.savedAt?('Mis à jour le '+st.savedAt):'Aucune mesure enregistrée'), detail:(st?st.detail:''),
          rows:(st&&st.metrics?[{label:st.baseLabel,value:_edFmtN(st.base)}].concat(st.metrics.map(m=>({label:m.label,value:_edFmtN(m.value)}))):[]),
          historyMonths: _groupByMonth(hist),
          hasHistory: hist.length>0, noStats:!(st&&st.metrics)
        };
      }
    }
    const engDetailOpen = engDetailObj!=null;
    const closeEngDetail = ()=>this.setState({engDetail:null});
    const topCreators = this.rosterRaw.slice(0,4).map((c,i)=>({ name:c.name, ca:c.ca, rank:String(i+1).padStart(2,'0'), dotStyle:dotS(c.tone, c.status==='live'), open:goRoster }));
    const _aq = (this.state.activitySearch||'').trim().toLowerCase();
    const pipeline = this.pipeRaw.filter(p=> !_aq || (p.label+' '+p.amount).toLowerCase().includes(_aq)).map(p=>({ label:p.label, amount:p.amount, dotStyle:dotS(p.tone,false) }));
    const _invDoc = (v,stl)=>{ const html='<!doctype html><html><head><meta charset="utf-8"><title>Facture '+v.ref+'</title></head><body style="font-family:Inter,Arial,sans-serif;max-width:620px;margin:48px auto;color:#181D25;padding:0 24px"><div style="display:flex;justify-content:space-between;align-items:flex-start"><div><div style="font-size:22px;font-weight:700">TTP Agency</div><div style="color:#9AA6B4;font-size:12px;margin-top:4px">Trust the Process</div></div><div style="text-align:right"><div style="font-size:15px;font-weight:600">FACTURE</div><div style="color:#9AA6B4;font-size:13px;margin-top:4px">#'+v.ref+'</div></div></div><hr style="border:none;border-top:1px solid #EAECEF;margin:28px 0"><table style="width:100%;border-collapse:collapse;font-size:13px"><tr><td style="color:#9AA6B4;padding:8px 0">Client</td><td style="text-align:right;font-weight:600">'+v.party+'</td></tr><tr><td style="color:#9AA6B4;padding:8px 0">Échéance</td><td style="text-align:right">'+v.date+'</td></tr><tr><td style="color:#9AA6B4;padding:8px 0">Statut</td><td style="text-align:right">'+stl+'</td></tr></table><hr style="border:none;border-top:1px solid #EAECEF;margin:20px 0"><div style="display:flex;justify-content:space-between;align-items:center"><div style="font-size:14px;font-weight:600">Total</div><div style="font-size:24px;font-weight:700">'+v.amount+'</div></div><p style="margin-top:48px;color:#9AA6B4;font-size:11px">Document généré par TTP Suite — démonstration.</p></body></html>'; return 'data:text/html;charset=utf-8,'+encodeURIComponent(html); };
    const invoices = (this.state.invoiceData||this.invoiceRaw).filter(v=> _match(v.ref,v.party,v.amount)).map(v=>{ const st=this.invStatus(v.status); const url=_invDoc(v,st.label); const filename='facture-'+v.ref+'.html'; return { ref:v.ref, party:v.party, amount:v.amount, date:v.date, creator:v.creator||'', statusLabel:st.label, dotStyle:dotS(st.tone,false), chipStyle:this.chip(), url, filename, _hit:_match(v.ref,v.party,v.amount), open:(()=>{const u=url,fn=filename,rf=v.ref;return ()=>this.setState({previewDoc:{name:'Facture '+rf,url:u,filename:fn,isImage:false}});})(), share:(e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); const txt='Facture '+v.ref+' — '+v.party+' — '+v.amount+' (échéance '+v.date+')'; if(navigator.share){navigator.share({title:'Facture '+v.ref, text:txt}).catch(()=>{});}else if(navigator.clipboard){navigator.clipboard.writeText(txt); this.setState({copied:'inv'+v.ref}); setTimeout(()=>this.setState(s=>s.copied==='inv'+v.ref?{copied:null}:{}),1500);}else{alert(txt);} }, shareLabel:(this.state.copied==='inv'+v.ref?'COPIÉ ✓':'PARTAGER'), cycleStatus:(e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); const order=['brouillon','attente','payee','retard']; const ns=order[(order.indexOf(v.status)+1)%order.length]; if(this._invoicesTable && v.id) this._dbUpdate('invoices', v.id, {status:ns}); this.setState(s=>({ invoiceData:(s.invoiceData||this.invoiceRaw).map(x=> x===v?Object.assign({},x,{status:ns}):x) })); toast('Statut : '+this.invStatus(ns).label); }, edit:(e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); const parts=String(v.party||'').split(' × '); const brand=parts[0]||v.party||''; const fn=(parts[1]||'').trim(); const ci= v.creator ? this.rosterRaw.findIndex(c=>c.name===v.creator) : this.rosterRaw.findIndex(c=>c.name.split(' ')[0]===fn); this.setState({ showInvoiceForm:true, editingInvoice:v, niFacBrand:brand, niFacAmount:String(v.amount||'').replace(/[^0-9]/g,''), niFacDue:(v.date&&v.date!=='—'?v.date:''), niFacCreator:(ci>=0?ci:null), niFacStatus:v.status }); }, del:(e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); if(!window.confirm('Supprimer la facture '+v.ref+' ?'))return; if(this._invoicesTable && v.id) this._dbDelete('invoices', v.id); this.setState(s=>({ invoiceData:(s.invoiceData||this.invoiceRaw).filter(x=>x!==v) })); } }; });
    const cbase = this._contacts();
    const contactsView = this.state.contactsView || 'list';
    const contactsGrid = contactsView === 'grid', contactsList = contactsView === 'list';
    const contactsViewTabs = [['list','Liste'],['grid','Cartes']].map(p=>({ label:p[1], style:"padding:7px 13px;border-radius:9px;font:600 10px 'Inter',sans-serif;cursor:pointer;white-space:nowrap;"+(contactsView===p[0]?'background:var(--text);color:var(--bg);':'color:var(--muted);'), pick:(()=>{const k=p[0];return ()=>this.setState({contactsView:k});})() }));
    // filtre par type (Marque, Agence RP, Presse…) pour retrouver vite un contact
    const cTag = this.state.contactTag || 'all';
    const _cTags=[]; cbase.forEach(k=>{ const t=(k.tag||'Autre').trim()||'Autre'; if(_cTags.indexOf(t)<0)_cTags.push(t); }); _cTags.sort();
    const _cTagCount=(t)=>cbase.filter(k=>((k.tag||'Autre').trim()||'Autre')===t).length;
    const contactTagTabs = [['all','Tous',cbase.length]].concat(_cTags.map(t=>[t,t,_cTagCount(t)])).map(p=>({ label:p[1], count:String(p[2]), style:"display:inline-flex;align-items:center;gap:6px;padding:7px 13px;border-radius:20px;font:600 10px 'Inter',sans-serif;cursor:pointer;white-space:nowrap;"+(cTag===p[0]?'background:var(--text);color:var(--bg);':'border:1px solid var(--hair);color:var(--muted);'), countStyle:"font:600 9px 'Inter',sans-serif;opacity:.6", pick:(()=>{const k=p[0];return ()=>this.setState({contactTag:k});})() }));
    const contacts = cbase.map((k,i)=>({ brand:k.brand, person:k.person, role:k.role, tag:k.tag, email:k.email||'', phone:k.phone||'—', initials:this.initials(k.person), avatarStyle:this.avatarStyle(k.tone,dark,44), avatarStyleSm:this.avatarStyle(k.tone,dark,38), tagStyle:"padding:5px 10px;border-radius:20px;background:var(--rowhover);font:600 8px 'Inter',sans-serif;letter-spacing:.5px;color:var(--muted);white-space:nowrap;", open:()=>this.setState({openContact:i}), del:(()=>{const ii=i,nm=k.brand,kid=k.id;return (e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); if(!window.confirm('Supprimer le contact '+nm+' ?'))return; if(this._contactsTable && kid) this._dbDelete('contacts', kid); this.setState(s=>{ const base=(this._contactsFrom(s)).slice(); base.splice(ii,1); return { contactsData:base, openContact:(s.openContact===ii?null:s.openContact) }; }); };})() })).filter(k=> (cTag==='all'||((k.tag||'Autre').trim()||'Autre')===cTag) && _match(k.brand,k.person,k.role,k.tag));
    // ---- Objectifs par mois (édition / suppression / navigation) ----
    const _objMo=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
    const objOffset = this.state.objOffset||0;
    const _objD = new Date(_todayY, _todayMo+objOffset, 1);
    const objMonthLabel = _objMo[_objD.getMonth()]+' '+_objD.getFullYear();
    const _objSeed0 = this.objRaw.map(o=>({name:o.name,ca:o.ca,target:o.target,pct:o.pct,tone:o.tone})).concat((this.state.customObjs||[]).map(o=>({name:String(o.name).toUpperCase(),ca:o.ca||'—',target:o.target,pct:o.pct,tone:'indigo'})));
    const _omAll = this.state.objByMonth||{};
    const _objList = (_omAll[objOffset]!==undefined) ? _omAll[objOffset] : (objOffset===0 ? _objSeed0 : []);
    const _writeObj = (list)=> this.setState(s=>({ objByMonth: Object.assign({}, s.objByMonth, {[objOffset]: list}) }));
    const _curObjList = ()=>{ const a=this.state.objByMonth; const off=this.state.objOffset||0; return (a&&a[off]!==undefined)?a[off].slice():(off===0?_objSeed0.slice():[]); };
    const objCreators = _objList.map((o,idx)=>({ name:o.name, ca:o.ca||'—', target:o.target||'—', pctLabel:(o.pct||0)+'%', barStyle:'width:'+Math.min(o.pct||0,100)+'%;height:100%;border-radius:5px;background:'+this.toneHex(o.tone||'indigo',dark)+';',
      edit:(()=>{const i=idx;return ()=>{ const cur=_curObjList(); const o2=cur[i]; if(!o2)return; const nt=window.prompt('Objectif / cible pour '+o2.name+' :', o2.target||''); if(nt==null)return; const np=window.prompt('Avancement (%) :', String(o2.pct||0)); if(np==null)return; const nc=window.prompt('Réalisé (€) :', o2.ca||''); cur[i]=Object.assign({},o2,{target:nt.trim()||o2.target, pct:Number(np)||0, ca:(nc==null?o2.ca:(nc.trim()||o2.ca))}); _writeObj(cur); };})(),
      del:(()=>{const i=idx;return ()=>{ if(!window.confirm('Supprimer cet objectif ?'))return; const cur=_curObjList(); cur.splice(i,1); _writeObj(cur); };})() }));
    const prevObjMonth=()=>this.setState(s=>({objOffset:(s.objOffset||0)-1}));
    const nextObjMonth=()=>this.setState(s=>({objOffset:(s.objOffset||0)+1}));
    const _pricingArr = this.state.pricingData || this.pricingRaw;
    const _priceEdit = (i,field)=>(e)=>{ const v=e.target.value; this.setState(s=>{ const arr=(s.pricingData||this.pricingRaw).map(x=>Object.assign({},x)); if(arr[i]) arr[i][field]=v; return {pricingData:arr}; }); };
    const pricing = _pricingArr.map((p,i)=>({ format:p.format, base:p.base, excl:p.excl, onBase:_priceEdit(i,'base'), onExcl:_priceEdit(i,'excl') }));
    const briefItems = this.state.briefItems || this.briefRaw;
    const mkBrief = (b)=>{ const bval=!!(this.state.briefVal||{})[b.brand]; const bdone=!!(this.state.briefDone||{})[b.brand]; const st=this.briefStatus(b.status); const note=(this.state.briefNotes||{})[b.brand]||''; return { brand:b.brand, creator:b.creator, creatorFirst:(b.creator||'').split(' ')[0], deliverables:b.deliverables, due:b.due, consignes:b.consignes||'Consignes à préciser avec la marque.', budget:b.budget||'—', objectif:b.objectif||'—', done:bdone, open:(()=>{const k=b.brand;return ()=>this.setState({briefOpen:k});})(), statusLabel:bdone?'TERMINÉ':(bval?'VALIDÉ':st.label), dotStyle:dotS(bdone?'signal':(bval?'signal':b.tone),false), chipStyle:this.chip(), completeLabel:bdone?'Rouvrir':'Terminer', complete:(()=>{const k=b.brand;return (e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); this.setState(s=>({briefDone:Object.assign({},s.briefDone,{[k]:!(s.briefDone&&s.briefDone[k])})})); };})(), validated:bval, validateLabel:bval?'VALIDÉ ✓':'VALIDER', validateStyle:'flex:1; padding:10px 0; text-align:center; border-radius:11px; font:600 10px \'Inter\',sans-serif; cursor:pointer;'+(bval?'background:var(--signalsoft);color:var(--signaltext);':'background:var(--signal);color:var(--onsignal);'), validate:(()=>{const k=b.brand;return ()=>this.setState(s=>({briefVal:Object.assign({},s.briefVal,{[k]:true})}));})(), noteValue:note, hasNote:!!note, onNote:(()=>{const k=b.brand;return (e)=>{const v=e.target.value;this.setState(s=>({briefNotes:Object.assign({},s.briefNotes,{[k]:v})}));};})(), del:(e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); if(!window.confirm('Supprimer le brief '+b.brand+' ?'))return; if(this._briefsTable){ if(b.id) this._dbDelete('briefs', b.id); else b._del=true; } this.setState(s=>({ briefItems:(s.briefItems||this.briefRaw).filter(x=>x!==b) })); }, edit:(e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); const ci=this.rosterRaw.findIndex(c=>c.name===b.who); this.setState({ showBriefForm:true, editBrief:b.brand, briefOpen:null, view:'briefs', nbBrand:b.brand, nbDeliv:b.deliverables||'', nbDue:b.due||'', nbConsignes:b.consignes||'', nbBudget:(b.budget&&b.budget!=='—')?b.budget:'', nbObjectif:(b.objectif&&b.objectif!=='—')?b.objectif:'', nbCreator:(ci>=0?ci:0) }); } }; };
    const briefFilter = this.state.briefFilter || 'cours';
    const _briefMatch = (bm)=> briefFilter==='all' ? true : (briefFilter==='done' ? bm.done : !bm.done);
    const briefFilterTabs = [['cours','En cours'],['done','Terminés'],['all','Tous']].map(p=>({ label:p[1], style:"padding:7px 13px;border-radius:9px;font:600 10px 'Inter',sans-serif;cursor:pointer;white-space:nowrap;"+(briefFilter===p[0]?'background:var(--text);color:var(--bg);':'color:var(--muted);'), pick:(()=>{const k=p[0];return ()=>this.setState({briefFilter:k});})() }));
    const briefs = briefItems.map(mkBrief).filter(_briefMatch);
    const briefPreview = briefs.slice(0,3);
    // brief list rows (compact) + opened detail with share
    const briefRows = briefs.map(b=>({ brand:b.brand, creator:b.creator, due:b.due, statusLabel:b.statusLabel, dotStyle:b.dotStyle, open:b.open, del:b.del }));
    const _briefOpenKey = this.state.briefOpen;
    let briefOpenObj = null;
    if(_briefOpenKey!=null){ const raw=briefItems.find(b=>b.brand===_briefOpenKey); if(raw){ const bo=mkBrief(raw); const shareText='BRIEF — '+bo.brand+'\nCréateur : '+(bo.creator||'—')+'\nÉchéance : '+bo.due+'\nLivrables : '+bo.deliverables+'\nBudget : '+bo.budget+'\nObjectif : '+bo.objectif+'\n\nConsignes :\n'+bo.consignes+'\n\n— TTP Agency'; briefOpenObj=Object.assign({}, bo, {
      share:()=>{ try{ if(navigator.share){ navigator.share({title:'Brief '+bo.brand, text:shareText}).catch(()=>{}); return; } }catch(_){} try{ if(navigator.clipboard){ navigator.clipboard.writeText(shareText).catch(()=>{}); } }catch(_){} toast('Brief copié — prêt à partager'); },
      shareEmail:()=>{ window.location.href='mailto:?subject='+encodeURIComponent('Brief — '+bo.brand)+'&body='+encodeURIComponent(shareText); },
    }); } }
    const briefDetailOpen = briefOpenObj!=null;
    const closeBriefDetail = ()=>this.setState({briefOpen:null});
    const rdvPreview = events.filter(e=>_evDate(e)>=_todayStr).sort((a,b)=>_evDate(a).localeCompare(_evDate(b))).slice(0,4).map(e=>{ const d=eventDeco(e); const ed=_evDate(e); const _p=ed.split('-'); return { when:(ed===_todayStr?"Auj. ":(Number(_p[2])+'/'+_p[1]+' '))+e.time, title:e.title, dotStyle:d.dotStyle }; });

    // prospection columns
    const stages = ['Prospection','Contact','Négociation','Signé'];
    const prospectCols = stages.map(stg => { const cards=(this.state.prospectData||this.prospectRaw).filter(p=>p.stage===stg).map(p=>({ brand:p.brand, contact:p.contact, value:p.value, dotStyle:dotS(p.tone,false), del:(e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); if(!window.confirm('Supprimer '+p.brand+' du pipeline ?'))return; if(this._prospectsTable && p.id) this._dbDelete('prospects', p.id); this.setState(s=>({ prospectData:(s.prospectData||this.prospectRaw).filter(x=>x!==p) })); }, edit:(e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); const nb=window.prompt('Marque :', p.brand); if(nb==null)return; const nv=window.prompt('Montant estimé :', p.value); if(nv==null)return; const patch={brand:(nb.trim()||p.brand), value:(nv.trim()||p.value)}; if(this._prospectsTable && p.id) this._dbUpdate('prospects', p.id, patch); this.setState(s=>({ prospectData:(s.prospectData||this.prospectRaw).map(x=> x===p ? Object.assign({},x,patch) : x) })); } })); return { title:stg, count:cards.length, cards }; });

    // generic module
    // ---- Checklist PAR COLLABORATION (talent manager) ----
    const _clDone=this.state.checklistDone||{}, _clHid=this.state.checklistHidden||{}, _clCus=this.state.checklistCustom||{};
    const _whoStyle=(who)=>{ const t=(who==='Créateur')?'indigo':'signal'; const hex=this.toneHex(t,dark); return "font:600 8px 'Inter',sans-serif;letter-spacing:.5px;padding:4px 9px;border-radius:20px;white-space:nowrap;color:"+hex+";background:"+hex+"18;"; };
    const _collabSeed=[ {brand:'Sephora',creator:'CAMILLE ORSINI',tone:'indigo'}, {brand:'Nike',creator:'MALO FONTAINE',tone:'signal'}, {brand:'Logitech',creator:'THÉO RIVIÈRE',tone:'cyan'}, {brand:'Dior Beauty',creator:'CAMILLE ORSINI',tone:'indigo'} ];
    const _collabs = this.state.collabs || _collabSeed;
    const collabOpen = this.state.openCollab || null;
    const _stepsForCollab=(cid)=>{ let tot=0,ok=0; const phases=this.checklistTemplate.map((ph,pi)=>{ const ckey=cid+'#'+pi; const all=ph.items.concat(_clCus[ckey]||[]); const items=all.map(it=>({it,id:cid+'#'+pi+'|'+it.t})).filter(x=>!_clHid[x.id]).map(x=>{ const done=!!_clDone[x.id]; tot++; if(done)ok++; return {
        text:x.it.t, who:x.it.who, whoStyle:_whoStyle(x.it.who), done, check:done?this._check():'',
        boxStyle:'width:18px;height:18px;border-radius:6px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font:700 10px \'Inter\',sans-serif;'+(done?'background:var(--signal);color:var(--onsignal);':'border:1.5px solid var(--faint);color:transparent;'),
        textStyle:"flex:1;font:500 13px 'Inter',sans-serif;"+(done?'color:var(--faint);text-decoration:line-through;':'color:var(--text);'),
        toggle:(()=>{const k=x.id;return ()=>this.setState(s=>({checklistDone:Object.assign({},s.checklistDone,{[k]:!(s.checklistDone&&s.checklistDone[k])})}));})(),
        del:(()=>{const k=x.id;return (e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); this.setState(s=>({checklistHidden:Object.assign({},s.checklistHidden,{[k]:true})})); };})()
      };}); const pok=items.filter(i=>i.done).length; const ppct=items.length?Math.round(pok/items.length*100):0; return { phase:ph.phase, progress:pok+'/'+items.length, pct:ppct, barStyle:'width:'+ppct+'%;height:100%;border-radius:5px;background:var(--signal);', items,
        add:(()=>{const key=ckey;return ()=>{ const t=window.prompt('Nouvelle étape :',''); if(t==null||!t.trim())return; const who=window.confirm('Étape côté CRÉATEUR ?  (OK = Créateur · Annuler = Agence)')?'Créateur':'Agence'; this.setState(s=>{ const cc=Object.assign({},s.checklistCustom); cc[key]=(cc[key]||[]).concat([{t:t.trim(),who}]); return {checklistCustom:cc}; }); };})() }; }); return {phases,ok,tot}; };
    const collabList = _collabs.map((c,idx)=>{ const cid=c.brand+' × '+(c.creator||''); const r=_stepsForCollab(cid); const pct=r.tot?Math.round(r.ok/r.tot*100):0; const fn=(c.creator||'').split(' ')[0]; const fnc=fn?fn.charAt(0)+fn.slice(1).toLowerCase():''; return {
      id:cid, label:c.brand+(fnc?' × '+fnc:''), initials:this.creatorPhoto(c.creator)?'':this.initials(c.creator||c.brand), avatarStyle:this.avatarFor(c.creator,c.tone||'cyan',dark,40), progress:r.ok+' / '+r.tot+' étapes', pctLabel:pct+'%', barStyle:'width:'+pct+'%;height:100%;border-radius:5px;background:'+(pct===100?'var(--signal)':'var(--indigo)')+';',
      open:(()=>{const k=cid;return ()=>this.setState({openCollab:k});})(),
      del:(()=>{const i=idx,nm=c.brand;return (e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); if(!window.confirm('Supprimer la collaboration '+nm+' ?'))return; this.setState(s=>{ const base=(s.collabs||_collabSeed).slice(); base.splice(i,1); return {collabs:base}; }); };})() }; });
    const _openR = collabOpen ? _stepsForCollab(collabOpen) : {phases:[],ok:0,tot:0};
    const checklistPhases = _openR.phases;
    const _opPct = _openR.tot?Math.round(_openR.ok/_openR.tot*100):0;
    const checklistPct = _opPct+'%';
    const checklistProgress = _openR.ok+' / '+_openR.tot+' étapes';
    const checklistBar = 'width:'+_opPct+'%;height:100%;border-radius:6px;background:var(--signal);';
    const checklistInDeal = !!collabOpen;
    const openCollabLabel = collabOpen || '';
    const backToCollabs = ()=>this.setState({openCollab:null});
    const addCollab = ()=>{ const brand=window.prompt('Marque :',''); if(brand==null||!brand.trim())return; const creator=(window.prompt('Créateur (nom complet) :','')||'').trim().toUpperCase(); this.setState(s=>({ collabs:(s.collabs||_collabSeed).concat([{brand:brand.trim(),creator,tone:'indigo'}]), openCollab:brand.trim()+' × '+creator })); };
    const resetChecklist = ()=>{ if(!collabOpen)return; if(!window.confirm('Réinitialiser la checklist de cette collaboration ?'))return; const pref=collabOpen+'#'; this.setState(s=>{ const nd=Object.assign({},s.checklistDone), nh=Object.assign({},s.checklistHidden), nc=Object.assign({},s.checklistCustom); Object.keys(nd).forEach(k=>{if(k.indexOf(pref)===0)delete nd[k];}); Object.keys(nh).forEach(k=>{if(k.indexOf(pref)===0)delete nh[k];}); Object.keys(nc).forEach(k=>{if(k.indexOf(pref)===0)delete nc[k];}); return {checklistDone:nd,checklistHidden:nh,checklistCustom:nc}; }); };
    const mod = (this.modules[this.state.view]) ? (() => { const view=this.state.view; const m=this.modules[view]; const baseRows=(this.state.moduleRows&&this.state.moduleRows[view])||m.rows; return Object.assign({}, m, { rows: baseRows.map(r=>({ a:r.a, b:r.b, c:r.c, dotStyle:dotS(r.tone,false), chipStyle:"font:600 8px 'Inter',sans-serif;letter-spacing:.6px;color:var(--muted);padding:5px 10px;border-radius:20px;background:var(--rowhover);white-space:nowrap;", del:(e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); if(!window.confirm('Supprimer cet élément ?'))return; this.setState(s=>{ const mr=Object.assign({}, s.moduleRows); mr[view]=baseRows.filter(x=>x!==r); return { moduleRows:mr }; }); }, edit:(e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); const na=window.prompt('Titre :', r.a); if(na==null)return; const nb=window.prompt('Sous-titre :', r.b); if(nb==null)return; this.setState(s=>{ const mr=Object.assign({}, s.moduleRows); mr[view]=baseRows.map(x=> x===r ? Object.assign({},x,{a:(na.trim()||x.a), b:(nb.trim()||x.b)}) : x); return { moduleRows:mr }; }); } })) }); })() : { title:'', section:'', sub:'', action:'', rows:[] };
    const vTemplatesMsg = this.state.view==='templates';
    const msgChannel = this.state.msgChannel || 'tous';
    const _chanMeta = { gmail:{label:'Gmail', tone:'indigo'}, linkedin:{label:'LinkedIn', tone:'cyan'}, instagram:{label:'Instagram', tone:'signal'}, tiktok:{label:'TikTok', tone:'indigo'} };
    const msgChannelTabs = [['tous','Tous'],['gmail','Gmail'],['linkedin','LinkedIn'],['instagram','Instagram'],['tiktok','TikTok']].map(p=>({ label:p[1], style:"padding:7px 13px;border-radius:9px;font:600 10px 'Inter',sans-serif;cursor:pointer;white-space:nowrap;"+(msgChannel===p[0]?'background:var(--text);color:var(--bg);':'color:var(--muted);'), pick:(()=>{const k=p[0];return ()=>this.setState({msgChannel:k});})() }));
    const msgTemplatesList = this.msgTemplatesRaw.filter(m=> msgChannel==='tous'?true:m.channel===msgChannel).map(m=>{ const cm=_chanMeta[m.channel]||{label:m.channel,tone:'cyan'}; const hex=this.toneHex(cm.tone,dark); const copied=this.state.copied==='tpl'+m.title; return { title:m.title, channelLabel:cm.label, body:m.body, preview:(m.body.length>140?m.body.slice(0,140)+'…':m.body), chanStyle:"font:600 8px 'Inter',sans-serif;letter-spacing:.5px;padding:4px 10px;border-radius:20px;white-space:nowrap;color:"+hex+";background:"+hex+"18;", copyLabel:copied?'COPIÉ ✓':'COPIER', copy:(()=>{const b=m.body,t=m.title;return (e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); try{ if(navigator.clipboard){navigator.clipboard.writeText(b).catch(()=>{});} }catch(_){} this.setState({copied:'tpl'+t}); setTimeout(()=>this.setState(s=>s.copied==='tpl'+t?{copied:null}:{}),1500); };})() }; });

    // ---- creator portal (me) ----
    const ci = this.state.creatorId;
    const cr = this._meCreator() || _EMPTY_CR;
    // un événement peut concerner plusieurs créateurs (who = "Nom A, Nom B").
    const _eventConcerns=(e,nm)=> !!nm && String((e&&e.who)||'').split(',').map(s=>s.trim()).indexOf(nm)>=0;
    const myEvents = events.filter(e => _eventConcerns(e, cr.name));
    // N'affiche QUE les events du créateur (jamais ceux des autres en repli).
    const myAgenda = myEvents.slice().sort((a,b)=>_evDate(a).localeCompare(_evDate(b))).map(e => { const d=eventDeco(e); return { day:(Number(_evDate(e).split('-')[2])||e.day), time:e.time, title:e.title, dotStyle:d.dotStyle, dayBoxStyle:'width:46px;flex-shrink:0;text-align:center;background:var(--rowhover);border-radius:10px;padding:6px 0;color:var(--text);', edit:(ev)=>{ if(ev&&ev.stopPropagation)ev.stopPropagation(); const date=_evDate(e); this.setState({ showEventForm:true, editingEvent:e, ne:{ day:Number(date.split('-')[2])||e.day, date:date, time:(e.time&&e.time!=='—'?e.time:''), title:e.title, type:e.type||'call' } }); }, del:(ev)=>{ if(ev&&ev.stopPropagation)ev.stopPropagation(); if(!window.confirm('Supprimer cet événement ?'))return; if(this._eventsTable){ if(e.id) this._dbDelete('events', e.id); else e._del=true; } this.setState(s=>({ events:(s.events||this.eventsRaw).filter(x=>x!==e) })); } }; });
    const pTodoFilter = this.state.pTodoFilter || 'todo';
    const pTodoFilterTabs = [['todo','À faire'],['done','Terminées'],['all','Toutes']].map(p=>({ label:p[1], style:"padding:7px 13px;border-radius:9px;font:600 10px 'Inter',sans-serif;cursor:pointer;white-space:nowrap;"+(pTodoFilter===p[0]?'background:var(--text);color:var(--bg);':'color:var(--muted);'), pick:(()=>{const k=p[0];return ()=>this.setState({pTodoFilter:k});})() }));
    const myTodosArr = todoItems.map((t,i)=>({t,i})).filter(x => x.t.creator === cr.name);
    const myTodos = myTodosArr.map(x => mkTodo(x.t, x.i)).filter(tm=> pTodoFilter==='all' ? true : (pTodoFilter==='done' ? tm.done : !tm.done));
    const myBriefsArr = briefItems.filter(b => b.who === cr.name);
    // Uniquement les briefs du créateur (pas de repli sur ceux des autres).
    const myBriefs = myBriefsArr.map(mkBrief).filter(_briefMatch);
    const nextEv = myAgenda[0] || {};
    const me = {
      name: cr.name, first: (s=>s.charAt(0)+s.slice(1).toLowerCase())(cr.name.split(' ')[0]), initials: this.initials(cr.name), handle: cr.handle, niche: cr.niche, plat: cr.plat,
      followers: cr.followers, er: cr.er, reach: cr.reach, ca: cr.ca,
      briefsCount: String(myBriefsArr.length), todoCount: String(myTodosArr.length),
      nextRdv: nextEv.title || 'Aucun RDV à venir', nextRdvMeta: nextEv.title ? ((nextEv.time?nextEv.time+' · ':'')+'Jour '+(nextEv.day||'—')) : '—', hasNextRdv: !!nextEv.title,
      avatarStyle: this.avatarFor(cr.name, cr.tone, dark, 40), bigAvatarStyle: this.avatarFor(cr.name, cr.tone, dark, 72),
    };
    const mePhoto = this.creatorPhoto(cr.name);
    me.avatarInner = mePhoto ? '' : me.initials;
    // Stats détaillées poussées par l'agence (calculateur d'engagement) → portail.
    const _myStats = cr && cr.stats ? cr.stats : null;
    const _sfmt = (n)=>String(Math.round(Number(n)||0)).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
    const myStatsHasDetail = !!(_myStats && _myStats.metrics && _myStats.metrics.length);
    const myStatsRows = myStatsHasDetail
      ? [{label:_myStats.baseLabel, value:_sfmt(_myStats.base)}].concat(_myStats.metrics.map(m=>({label:m.label, value:_sfmt(m.value)})))
      : [];
    // Mes factures (créateur) : ses factures liées, depuis la table cloisonnée.
    const _invMe = this.state.invoiceData||this.invoiceRaw;
    // Rattachement FIABLE des factures au créateur connecté :
    //  1) champ `creator` (nom complet, rempli à la création) → match exact, sans ambiguïté ;
    //  2) à défaut (anciennes factures sans `creator`), repli sur le PRÉNOM extrait de `party`
    //     — mais SEULEMENT si ce prénom est unique dans le roster, pour ne jamais montrer une
    //     facture à un homonyme. Comparaison insensible à la casse et aux accents.
    const _normFn = (s)=>String(s||'').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
    const _meFirst = _normFn((cr.name||'').split(' ')[0]);
    const _meFirstUnique = !!_meFirst && this.rosterRaw.filter(c=>c && _normFn((c.name||'').split(' ')[0])===_meFirst).length===1;
    const myInvoices = _invMe.filter(v=>{
      if(v.creator) return v.creator===cr.name;
      if(!_meFirstUnique) return false;
      const pf=_normFn(String(v.party||'').split(' × ')[1]||'');
      return !!pf && pf===_meFirst;
    }).map(v=>{ const st=this.invStatus(v.status); return { ref:v.ref, party:v.party, amount:v.amount, date:v.date, statusLabel:st.label, dotStyle:dotS(st.tone,false), chipStyle:this.chip() }; });
    const myInvoicesHas = myInvoices.length>0;
    const _myStatsHist = (cr && cr.statsHistory) ? cr.statsHistory : [];
    const myStatsHistoryMonths = _groupByMonth(_myStatsHist);
    const myStatsHasHistory = _myStatsHist.length>0;
    // ---- Suivi des abonnés PAR PLATEFORME (cumul + évolution mensuelle) ----
    const _FPLATS = [['ig','Instagram'],['tt','TikTok'],['yt','YouTube'],['tw','Twitch'],['sc','Snapchat']];
    const _platName = {ig:'Instagram',tt:'TikTok',yt:'YouTube',tw:'Twitch',sc:'Snapchat'};
    const _fmtFollBig = (n)=>{ n=Number(n)||0; return n>=1e6?((n/1e6).toFixed(n>=1e7?0:1).replace(/\.0$/,'').replace('.',',')+'M'):(n>=1e4?(Math.round(n/1e3)+'K'):String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,' ')); };
    const _mf = this.state.mf || {};
    const _mfN = (k)=> Number(String(_mf[k]||'').replace(/[^0-9]/g,''))||0;
    const _follTotal = _FPLATS.reduce((a,p)=> a+_mfN(p[0]), 0);
    const myFollInputs = _FPLATS.map(p=>({ label:p[1], value:String(_mf[p[0]]||''), onInput:(()=>{const kk=p[0];return (e)=>{const v=e.target.value;this.setState(s=>({mf:Object.assign({},s.mf,{[kk]:v})}));};})() }));
    const _follHist = (cr && cr.followersHistory) ? cr.followersHistory.slice() : [];
    const myFollHasHistory = _follHist.length>0;
    const myFollHistory = _follHist.map((h,i)=>{ const prev=_follHist[i+1]; const d=prev?(h.total-prev.total):null; const br=Object.keys(h.plats||{}).map(k=>(_platName[k]||k)+' '+_fmtFollBig(h.plats[k])).join(' · '); return { total:_fmtFollBig(h.total), breakdown:br||'—', date:h.date||'', delta:(d==null?'—':(d>=0?('+'+_fmtFollBig(d)):('-'+_fmtFollBig(-d)))), deltaStyle:'color:'+(d==null?'var(--faint)':(d>=0?'var(--signaltext)':'#E5484D')) }; });
    const myFollTotalLabel = _fmtFollBig(_follTotal>0 ? _follTotal : (myFollHasHistory?_follHist[0].total:0));
    const myFollDeltaLabel = (myFollHistory[0] && myFollHistory[0].delta!=='—') ? ('vs mois préc. '+myFollHistory[0].delta) : 'Premier relevé';
    const saveFollowers = ()=>{
      if(_follTotal<=0){ toast('Renseigne au moins une plateforme'); return; }
      const crr=this._meCreator(); const idx=crr?this.rosterRaw.findIndex(c=>c.name===crr.name):-1;
      if(idx<0){ toast('Créateur introuvable'); return; }
      const plats={}; _FPLATS.forEach(p=>{ const n=_mfN(p[0]); if(n>0) plats[p[0]]=n; });
      const snap={ savedAtTs:Date.now(), date:new Date().toLocaleDateString('fr-FR'), plats, total:_follTotal };
      const prev=(this.rosterRaw[idx].followersHistory)||[];
      const newHist=[snap].concat(prev).slice(0,36);
      const totalStr=_fmtFollBig(_follTotal);
      this.rosterRaw[idx]=Object.assign({},this.rosterRaw[idx],{followersHistory:newHist, followers:totalStr});
      this.setState({ rosterData:this.rosterRaw.slice(), rosterEdited:true, mf:{} });
      const row=this.rosterRaw[idx];
      if(this._sb && row && row.id){ this._sb.from('creators').update({followers_history:newHist, followers:totalStr}).eq('id',row.id).then(({error})=>{ if(error){ console.warn('[foll] save', error.message); try{ this._sb.from('creators').update({followers:totalStr}).eq('id',row.id).then(()=>{}); }catch(_){} } }); }
      try{ this._persistNow(); }catch(_){}
      toast('Abonnés enregistrés ✓ — total '+totalStr);
    };
    const agencyPhoto = (this.state.photos||{}).agency || '';
    const agencyAvatarStyle = "width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;font:700 12px 'Inter',sans-serif;position:relative;" + (agencyPhoto ? 'background-image:url('+agencyPhoto+');background-size:cover;background-position:center;color:transparent;' : 'background:var(--signal);color:var(--onsignal);');
    const mkPhoto = (key)=>(e)=>{ const f=e.target.files&&e.target.files[0]; if(!f)return; const r=new FileReader(); r.onload=()=>this.setState(s=>({photos:Object.assign({},s.photos,{[key]:r.result})})); r.readAsDataURL(f); if(key.indexOf('cre:')===0){ try{ this._uploadCreatorPhoto(key.slice(4), f); }catch(_){} } };
    const loginCreators = this.rosterRaw.map((c,i)=>({i,c})).filter(x=>!(this.state.deletedRoster||{})[x.i]).map(({c,i})=>({ name:c.name, niche:c.niche, handle:c.handle, followers:c.followers, er:c.er, initials:this.creatorPhoto(c.name)?'':this.initials(c.name), avatarStyle:this.avatarFor(c.name,c.tone,dark,52), dotStyle:dotS(c.tone,c.status==='live'), login:(()=>{const ii=i, nm=c.name;return ()=>this.setState({creatorId:ii, creatorName:nm, portalTab:'accueil'});})() }));
    // creator's own editable coordinates — shared with the agency roster detail
    // (same rosterInfo store, keyed by creator index) so the agency sees updates.
    const _meKey = (cr && cr.name) || '';   // coordonnées rattachées au CRÉATEUR (par nom), pas à l'index
    const mkMeInfo=(field)=>(e)=>{ const v=e.target.value; this.setState(s=>{ const ri=Object.assign({},s.rosterInfo); ri[_meKey]=Object.assign({}, this.rosterInfoRaw[_meKey]||{}, ri[_meKey]||{}, {[field]:v}); return {rosterInfo:ri}; }); };
    const meInfoBase=Object.assign({ville:'',phone:'',email:'',address:'',siren:'',birth:''}, this.rosterInfoRaw[_meKey]||{}, (this.state.rosterInfo&&this.state.rosterInfo[_meKey])||{});
    const meInfoFields=[ {label:'Téléphone',value:meInfoBase.phone,onInput:mkMeInfo('phone'),placeholder:'+33 6 …'}, {label:'Email',value:meInfoBase.email,onInput:mkMeInfo('email'),placeholder:'prenom@email.com'}, {label:'Ville / Pays',value:meInfoBase.ville,onInput:mkMeInfo('ville'),placeholder:'Lyon, France'}, {label:'Adresse postale',value:meInfoBase.address,onInput:mkMeInfo('address'),placeholder:'Rue, code postal, ville'}, {label:'SIREN / SIRET',value:meInfoBase.siren,onInput:mkMeInfo('siren'),placeholder:'123 456 789'}, {label:'Date de naissance',value:meInfoBase.birth,onInput:mkMeInfo('birth'),placeholder:'JJ/MM/AAAA'} ];

    // ===== ENGAGEMENT CALCULATOR =====
    // Nombre d'abonnés RÉEL du créateur sélectionné (lu sur sa fiche roster) —
    // connecte Engagement & Pricing aux vraies données, plus de chiffres bidons.
    const _folNum = (c)=>{ let s=String((c&&c.followers)||'').trim().toLowerCase().replace(/\s/g,'').replace(',','.'); const m=s.match(/^([0-9.]+)([km]?)/); if(!m) return 0; let n=parseFloat(m[1])||0; if(m[2]==='k') n*=1e3; else if(m[2]==='m') n*=1e6; return Math.round(n); };
    const engCustom = this.state.engCreator === 'autre';
    const eci = engCustom ? -1 : (this.state.engCreator || 0);
    const ecr = engCustom ? null : this.rosterRaw[eci];
    const ecErf = ecr ? (parseFloat(String(ecr.er).replace(',','.'))||0) : 0;
    // Per-platform engagement formulas. Each platform has its OWN denominator
    // (followers vs. views) and its OWN set of interactions — because an ER is
    // only meaningful relative to the right base. Sources: standard influencer
    // marketing benchmarks (2024-2026).
    const platCfg = {
      instagram:{label:'Instagram', denom:'Impressions 30j', metrics:['Likes moyens','Commentaires','Partages','Enregistrements'], ratios:[0.82,0.07,0.06,0.05], formula:'(likes + commentaires + partages + enregistrements) ÷ impressions × 100', viewBase:true, good:3, exc:6},
      tiktok:{label:'TikTok', denom:'Vues moyennes', metrics:['Likes','Commentaires','Partages'], ratios:[0.78,0.08,0.14], formula:'(likes + commentaires + partages) ÷ vues × 100', viewBase:true, good:5, exc:9},
      youtube:{label:'YouTube', denom:'Vues moyennes', metrics:['Likes','Commentaires','Partages'], ratios:[0.86,0.10,0.04], formula:'(likes + commentaires + partages) ÷ vues × 100', viewBase:true, good:4, exc:8},
      twitch:{label:'Twitch', denom:'Spectateurs moyens', metrics:['Messages chat','Nouveaux abonnés','Bits / dons'], ratios:[0.8,0.12,0.08], formula:'(messages + abonnés + dons) ÷ spectateurs × 100', viewBase:true, good:8, exc:15},
      snapchat:{label:'Snapchat', denom:'Vues de story', metrics:['Captures écran','Réponses'], ratios:[0.6,0.4], formula:'(captures + réponses) ÷ vues × 100', viewBase:true, good:5, exc:10},
    };
    const pl = this.state.engPlatform || 'instagram'; const cfg = platCfg[pl];
    const baseDefault = engCustom ? 0 : (cfg.viewBase ? Math.round(_folNum(ecr)*0.35) : _folNum(ecr));
    const totalInter = baseDefault*ecErf/100;
    const metricDefaults = cfg.ratios.map(r=>Math.round(totalInter*r));
    const engReset = { engBase:'', engM0:'', engM1:'', engM2:'', engM3:'', engFollowers:'' };
    // Les champs partent VIDES (à 0) : on saisit soi-même. Les chiffres du roster
    // ne servent que d'indication (placeholder), ils ne pré-remplissent rien.
    const baseVal = (this.state.engBase!==''&&this.state.engBase!=null) ? Number(this.state.engBase)||0 : 0;
    const mState = cfg.metrics.map((_,i)=> this.state['engM'+i]);
    const mVals = cfg.metrics.map((lab,i)=> (mState[i]!==''&&mState[i]!=null) ? Number(mState[i])||0 : 0);
    const interSum = mVals.reduce((a,b)=>a+(isFinite(b)?b:0),0);
    const erCalc = baseVal>0 ? interSum/baseVal*100 : 0;
    let engVerdict='Faible', evTone='cyan';
    if(erCalc>=cfg.exc){engVerdict='Excellent';evTone='signal';} else if(erCalc>=cfg.good){engVerdict='Bon';evTone='signal';} else if(erCalc>=cfg.good*0.6){engVerdict='Correct';evTone='indigo';}
    const _fmtN = (n)=>String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
    const _val=(st)=>(st!==''&&st!=null)?String(st):'';
    const _ph=(n)=> (n>0?String(Math.round(n)):'0');
    // live formula with the actual numbers plugged in
    const engCalcDetail = baseVal>0 ? ('('+mVals.map(_fmtN).join(' + ')+') ÷ '+_fmtN(baseVal)+' × 100') : 'Renseigne les chiffres pour calculer le taux';
    const engInputs = [{label:cfg.denom, value:_val(this.state.engBase), placeholder:_ph(baseDefault), onInput:(e)=>{const v=e.target.value;this.setState({engBase:v});}}].concat(cfg.metrics.map((lab,i)=>({label:lab, value:_val(mState[i]), placeholder:_ph(metricDefaults[i]), onInput:(()=>{const k='engM'+i; return (e)=>{const v=e.target.value;this.setState({[k]:v});};})()})));
    const engPlatforms = Object.keys(platCfg).map(k=>({ label:platCfg[k].label, style:'padding:9px 14px;border-radius:11px;font:600 10px \'Inter\',sans-serif;cursor:pointer;'+(k===pl?'background:var(--text);color:var(--bg);':'border:1px solid var(--hair);color:var(--muted);'), pick:(()=>{const kk=k;return ()=>this.setState(Object.assign({engPlatform:kk}, engReset));})() }));
    const engChips = this.rosterRaw.map((c,i)=>({ name:c.name.split(' ')[0], dotStyle:dotS(c.tone,false), style:'display:flex;align-items:center;gap:7px;padding:7px 13px;border-radius:20px;font:600 10px \'Inter\',sans-serif;cursor:pointer;'+(i===eci?'background:var(--text);color:var(--bg);':'border:1px solid var(--hair);color:var(--muted);'), pick:(()=>{const ii=i;return ()=>this.setState(Object.assign({engCreator:ii}, engReset));})() }));
    engChips.push({ name:'+ Autre', dotStyle:'width:7px;height:7px;border-radius:50%;background:var(--faint);', style:'display:flex;align-items:center;gap:7px;padding:7px 13px;border-radius:20px;font:600 10px \'Inter\',sans-serif;cursor:pointer;'+(engCustom?'background:var(--text);color:var(--bg);':'border:1px dashed var(--hair);color:var(--muted);'), pick:()=>this.setState(Object.assign({engCreator:'autre'}, engReset)) });
    // Enregistrer les stats saisies sur la fiche du créateur → visibles sur SON portail.
    const engSaveLabel = engCustom ? 'ENREGISTRER' : ('✓ ENREGISTRER POUR '+(ecr?ecr.name.split(' ')[0]:'…'));
    const engSaveHint = engCustom ? 'Choisis un créateur du roster pour enregistrer' : 'Envoyé sur le portail du créateur';
    const engSave = ()=>{
      if(engCustom || !ecr){ toast('Sélectionne un créateur du roster'); return; }
      if(!(baseVal>0) || !(interSum>0)){ toast('Renseigne d’abord les chiffres'); return; }
      const erStr = erCalc.toFixed(1).replace('.',',')+'%';
      // Abonnés (suivi) : enregistré avec la mesure mais N'entre PAS dans le calcul d'ER.
      const _folRaw=String(this.state.engFollowers||'').replace(/[^0-9]/g,''); const _folN=_folRaw?Number(_folRaw):null;
      const _fmtFol=(n)=> n>=1e6?((n/1e6).toFixed(1).replace(/\.0$/,'').replace('.',',')+'M') : (n>=1e3?(Math.round(n/1e3)+'K') : String(n));
      const folStr=_folN!=null?_fmtFol(_folN):null;
      const statsObj = { platform:pl, platformLabel:cfg.label, base:baseVal, baseLabel:cfg.denom, metrics:cfg.metrics.map((lab,i)=>({label:lab, value:mVals[i]})), er:erStr, verdict:engVerdict, formula:cfg.formula, detail:engCalcDetail, followers:folStr, followersN:_folN, savedAt:new Date().toLocaleDateString('fr-FR'), savedAtTs:Date.now() };
      const _prevHist = (this.rosterRaw[eci]&&this.rosterRaw[eci].statsHistory)||[];
      const _newHist = [statsObj].concat(_prevHist).slice(0,30);   // garde l'historique (30 dernières mesures)
      const _patch = { er:erStr, stats:statsObj, statsHistory:_newHist };
      if(folStr) _patch.followers = folStr;   // met aussi à jour le nombre d'abonnés affiché
      this.rosterRaw[eci] = Object.assign({}, this.rosterRaw[eci], _patch);
      this.setState({ rosterData:this.rosterRaw.slice(), rosterEdited:true });
      const row=this.rosterRaw[eci];
      if(this._sb && row && row.id){ const _dbp={ er:erStr, stats:statsObj, stats_history:_newHist }; if(folStr) _dbp.followers=folStr; try{ this._sb.from('creators').update(_dbp).eq('id', row.id).then(({error})=>{ if(error) console.warn('[eng] save', error.message); }); }catch(_){} }
      try{ this._persistNow(); }catch(_){}
      toast('Stats enregistrées et envoyées à '+ecr.name.split(' ')[0]+' ✓');
    };
    // ===== ENGAGEMENT — synthèse réelle (cartes ER moyen / Reach / Meilleur ER) =====
    const _erNum = (s)=>parseFloat(String(s||'').replace(',','.'))||0;
    const _reachNum = (s)=>{ const m=String(s||'').trim().match(/([\d.,]+)\s*([MK])?/i); if(!m) return 0; let n=parseFloat(m[1].replace(/\s/g,'').replace(',','.'))||0; const u=(m[2]||'').toUpperCase(); if(u==='M')n*=1e6; else if(u==='K')n*=1e3; return n; };
    const _rosterStats = this.rosterRaw.filter((_,i)=>!(this.state.deletedRoster||{})[i]);
    const _ers = _rosterStats.map(c=>_erNum(c.er)).filter(n=>n>0);
    const engAvgEr = _ers.length ? (_ers.reduce((a,b)=>a+b,0)/_ers.length).toFixed(1).replace('.',',')+'%' : '—';
    const _reachSum = _rosterStats.reduce((a,c)=>a+_reachNum(c.reach),0);
    const engReachCumul = _reachSum>=1e6 ? (_reachSum/1e6).toFixed(1).replace('.',',')+' M' : (_reachSum>=1e3 ? Math.round(_reachSum/1e3)+' K' : (_reachSum?String(_reachSum):'—'));
    let _bestEr=null; _rosterStats.forEach(c=>{ const n=_erNum(c.er); if(n>0 && (!_bestEr || n>_bestEr.n)) _bestEr={n, name:c.name, er:c.er}; });
    const engBestEr = _bestEr ? _bestEr.er : '—';
    const engBestErName = _bestEr ? _bestEr.name : '—';
    // ===== PRICING CALCULATOR =====
    const fmtEur = (n)=>String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,' ')+' €';
    const pCustom = this.state.priceCreator==='autre';
    const pci = pCustom ? -1 : (this.state.priceCreator||0);
    const pcr = pCustom ? null : (this.rosterRaw[pci]||_EMPTY_CR);
    const pFollowers = pCustom ? (Number(String(this.state.priceFollowers||'').replace(/[^0-9]/g,''))||0) : _folNum(this.rosterRaw[pci]);
    const pErf = pCustom ? (Number(String(this.state.priceER||'').replace(',','.').replace(/[^0-9.]/g,''))||0) : (parseFloat(String(pcr.er).replace(',','.'))||0);
    const rateMap = {post:9,reel:13,story:5,ugc:4,youtube:18}; const fmtLabel = {post:'Post Instagram',reel:'Reel',story:'Story (×3)',ugc:'UGC vidéo',youtube:'YouTube intégration'};
    const pErMult = Math.max(0.6, 0.85 + (isFinite(pErf)?pErf:0)/12);
    const _unit = (f)=> Math.round(pFollowers/1000*rateMap[f]*pErMult/100)*100;
    const pQty = this.state.priceQty || {};
    const priceLines = Object.keys(rateMap).filter(f=>(pQty[f]||0)>0).map(f=>{ const u=_unit(f); const q=pQty[f]; return { label:fmtLabel[f], qty:q, qtyLabel:q+' × '+fmtEur(u), line:fmtEur(u*q), lineN:u*q }; });
    const pSubtotal = priceLines.reduce((a,l)=>a+l.lineN,0);
    const pExcl = !!this.state.priceExcl;
    const pTotal = Math.round(pSubtotal*(pExcl?1.30:1));
    const pMin = Math.round(pTotal*0.80/100)*100;            // plancher à proposer
    const priceCreatorName = pCustom ? (this.state.priceCustomName||'Créateur externe') : pcr.name;
    const _kf=(n)=> n>=1000000?((n/1000000).toFixed(1).replace('.',',')+'M'):(n>=1000?Math.round(n/1000)+'K':String(n));
    const priceMeta = (pFollowers?(_kf(pFollowers)+' abonnés'):'—')+' · ER '+(isFinite(pErf)?String(pErf).replace('.',','):'0')+'%';
    const priceChips = this.rosterRaw.map((c,i)=>({c,i})).filter(x=>!(this.state.deletedRoster||{})[x.i]).map(({c,i})=>({ name:c.name.split(' ')[0], style:'padding:6px 11px;border-radius:18px;font:600 9px \'Inter\',sans-serif;cursor:pointer;'+(i===pci?'background:var(--signal);color:var(--onsignal);':'background:rgba(255,255,255,.12);color:var(--bg);'), pick:(()=>{const k=i;return ()=>this.setState({priceCreator:k});})() }));
    priceChips.push({ name:'+ Autre', style:'padding:6px 11px;border-radius:18px;font:600 9px \'Inter\',sans-serif;cursor:pointer;'+(pCustom?'background:var(--signal);color:var(--onsignal);':'border:1px dashed rgba(255,255,255,.35);color:var(--bg);'), pick:()=>this.setState({priceCreator:'autre'}) });
    const priceFormatSteppers = Object.keys(rateMap).map(f=>({ key:f, label:fmtLabel[f], unit:fmtEur(_unit(f)), qty:String(pQty[f]||0), hasQty:(pQty[f]||0)>0, dec:(()=>{const k=f;return ()=>this.setState(s=>{const q=Object.assign({},s.priceQty); q[k]=Math.max(0,(q[k]||0)-1); return {priceQty:q};});})(), inc:(()=>{const k=f;return ()=>this.setState(s=>{const q=Object.assign({},s.priceQty); q[k]=(q[k]||0)+1; return {priceQty:q};});})() }));
    const priceExclToggle = ()=>this.setState(s=>({priceExcl:!s.priceExcl}));
    // ===== CONTACT DETAIL =====
    const oc = this.state.openContact; let openContactObj = null;
    if(oc!=null){ const k=(this._contacts())[oc]; const cp=(key,val)=>()=>{ try{ navigator.clipboard && navigator.clipboard.writeText(val); }catch(e){} this.setState({copied:key}); setTimeout(()=>this.setState(s=> s.copied===key?{copied:null}:{}),1500); }; openContactObj={ brand:k.brand, person:k.person, role:k.role, email:k.email, phone:k.phone, last:k.last, deals:k.deals, initials:this.initials(k.person), avatarStyle:this.avatarStyle(k.tone,dark,52), copyEmail:cp('email',k.email), copyPhone:cp('phone',k.phone), emailLabel:this.state.copied==='email'?'COPIÉ ✓':'COPIER', phoneLabel:this.state.copied==='phone'?'COPIÉ ✓':'COPIER' }; }
    // ===== PLANNING UPCOMING =====
    const dowFr = ['DIM','LUN','MAR','MER','JEU','VEN','SAM'];
    const _mkAgendaRow = (e)=>{ const d=eventDeco(e); const tp=this.eventTypeMap[e.type]||this.eventTypeMap.call; return { day:(Number(_evDate(e).split('-')[2])||e.day), dow:(()=>{const p=_evDate(e).split('-').map(Number);return dowFr[new Date(p[0],p[1]-1,p[2]).getDay()];})(), time:e.time, title:e.title, who:e.who||'', dotStyle:d.dotStyle, typeLabel:tp.label, tagStyle:"font:600 8px 'Inter',sans-serif;letter-spacing:.5px;color:var(--muted);padding:4px 9px;border-radius:6px;background:var(--rowhover);", dayBoxStyle:'width:46px;flex-shrink:0;text-align:center;background:var(--rowhover);border-radius:10px;padding:6px 0;color:var(--text);', edit:(ev)=>{ if(ev&&ev.stopPropagation)ev.stopPropagation(); const date=_evDate(e); this.setState({ showEventForm:true, editingEvent:e, ne:{ day:Number(date.split('-')[2])||e.day, date:date, time:(e.time&&e.time!=='—'?e.time:''), title:e.title, type:e.type||'call' }, neWho:(e.who?String(e.who).split(',').map(s=>s.trim()).filter(Boolean):[]) }); }, del:(ev)=>{ if(ev&&ev.stopPropagation)ev.stopPropagation(); if(!window.confirm('Supprimer cet événement ?'))return; if(this._eventsTable){ if(e.id) this._dbDelete('events', e.id); else e._del=true; } this.setState(s=>({ events:(s.events||this.eventsRaw).filter(x=>x!==e) })); } }; };
    const upcoming = events.filter(e=>_evDate(e)>=_todayStr).sort((a,b)=>_evDate(a).localeCompare(_evDate(b))).slice(0,6).map(_mkAgendaRow);
    // ===== PLANNING: day detail (click a date to see its events) =====
    const _moNamesFull = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
    const _dowFull = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    const planSelDate = this.state.planSelDate;
    const planDayOpen = planSelDate!=null;
    let planDayLabel='', planDayEvents=[], _planSelDay=null;
    if(planDayOpen){ const p=String(planSelDate).split('-').map(Number); _planSelDay=p[2]; const jsd=new Date(p[0],p[1]-1,p[2]); planDayLabel=_dowFull[jsd.getDay()]+' '+p[2]+' '+_moNamesFull[p[1]-1]+' '+p[0]; planDayEvents=events.filter(e=>_evDate(e)===planSelDate).sort((a,b)=>String(a.time).localeCompare(String(b.time))).map(_mkAgendaRow); }
    const planDayHasEvents = planDayEvents.length>0;
    const closePlanDay = ()=>this.setState({planSelDate:null, planSelDay:null});
    const addEventForDay = ()=>this.setState(s=>({ showEventForm:true, ne:Object.assign({},s.ne,{ day:_planSelDay, date:planSelDate }) }));

    // ===== CONTRACT GENERATOR =====
    const ctt = this.state.ctType || 'marque';
    const ctci = this.state.ctCreator || 0; const ctcr = this.rosterRaw[ctci]||_EMPTY_CR; const ctName = ctcr.name;
    // commission RÉELLE du créateur sélectionné (fiche roster), repli sur le champ saisi puis 20%
    const _ctInfo = Object.assign({}, this.rosterInfoRaw[ctName]||{}, (this.state.rosterInfo&&this.state.rosterInfo[ctName])||{});
    const ctCreatorComm = (String(_ctInfo.commission||'').replace(/[^0-9.]/g,'')) || (String(this.state.ctCommission||'').replace(/[^0-9.]/g,'')) || '20';
    const cBrand=this.state.ctBrand, cVal=this.state.ctValue, cComm=ctCreatorComm, cDur=this.state.ctDuration, cDeliv=this.state.ctDeliverables;
    const ctExclLabel = this.state.ctExcl ? 'Oui · 30 jours' : 'Non';
    const ctBankI = this.state.ctBank||0; const allBanks = this.bankAccounts.concat(this.state.customBanks||[]); const ctBankSel = allBanks[ctBankI]||allBanks[0];
    const ctUseCo = !!this.state.ctUseCompany;
    const coName=this.state.ctCoName||'', coSiret=this.state.ctCoSiret||'', coVat=this.state.ctCoVat||'', coAddr=this.state.ctCoAddr||'';
    const coLine = ctUseCo ? (' Facturation via '+(coName||'[Société]')+(coSiret?' (SIRET '+coSiret+')':'')+(coVat?', TVA '+coVat:'')+(coAddr?', '+coAddr:'')+'.') : '';
    const ctTitle = ctt==='marque'?'Contrat de partenariat commercial':(ctt==='repr'?'Contrat de représentation':'Cession de droits — UGC');
    let ctParties, ctTerms;
    const payTerms = [{l:'Compte de réception', v:ctBankSel.bank}, {l:'IBAN', v:ctBankSel.iban}, {l:'Modalités', v:'Virement · 30 j fin de mois'}, {l:'TVA', v: ctUseCo? (coVat?('Assujettie · '+coVat):'20% (autoliquidation UE)') : 'Non assujetti (art. 293 B CGI)'}];
    if(ctt==='marque'){ ctParties='ENTRE '+(cBrand||'[Annonceur]')+' (l\u2019Annonceur) ET '+ctName+', représenté(e) par TTP Agency (l\u2019Agent).'+coLine; ctTerms=[{l:'Objet',v:'Campagne '+(cBrand||'—')},{l:'Livrables',v:cDeliv||'—'},{l:'Montant',v:cVal||'—'},{l:'Exclusivité',v:ctExclLabel},{l:'Durée',v:cDur||'—'},{l:'Commission TTP',v:ctCreatorComm+'% du montant'}].concat(payTerms); }
    else if(ctt==='repr'){ ctParties='ENTRE '+ctName+' (le Créateur) ET TTP Agency (l\u2019Agent), pour la gestion de sa carrière.'+coLine; ctTerms=[{l:'Objet',v:'Représentation exclusive'},{l:'Commission',v:(cComm||'20')+'%'},{l:'Exclusivité',v:ctExclLabel},{l:'Durée',v:cDur||'—'},{l:'Périmètre',v:'Négo · contrats · facturation'}].concat(payTerms); }
    else { ctParties='ENTRE '+(cBrand||'[Client]')+' (le Client) ET '+ctName+' (Créateur UGC), via TTP Agency.'+coLine; ctTerms=[{l:'Objet',v:'Contenus UGC pour '+(cBrand||'—')},{l:'Livrables',v:cDeliv||'—'},{l:'Montant',v:cVal||'—'},{l:'Cession de droits',v:'12 mois · paid media'},{l:'Exclusivité',v:ctExclLabel},{l:'Durée',v:cDur||'—'}].concat(payTerms); }
    const ctClauses = [
      {title:'Art. 1 — Objet', body:'Le présent contrat définit les conditions de la prestation et les engagements réciproques des parties.'},
      {title:'Art. 2 — Rémunération & paiement', body:'Les sommes sont versées par virement sur le compte '+ctBankSel.bank+' (IBAN '+ctBankSel.iban+'), à 30 jours. Tout retard entraîne des pénalités au taux BCE + 10 pts et une indemnité forfaitaire de 40\u202f€ (art. L441-10 C. com.).'},
      {title:'Art. 3 — Propriété intellectuelle', body:'La cession des droits d\u2019exploitation est limitée aux supports, territoires et durée stipulés. Toute réutilisation hors périmètre fait l\u2019objet d\u2019un avenant.'},
      {title:'Art. 4 — Données personnelles (RGPD)', body:'Les parties traitent les données conformément au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique et Libertés. Finalité limitée à l\u2019exécution du contrat.'},
      {title:'Art. 5 — Transparence publicitaire', body:'Tout contenu sponsorisé est identifié comme tel (« Publicité » / « Partenariat rémunéré »), conformément aux lignes directrices ARPP et au droit de la consommation UE.'},
      {title:'Art. 6 — Droit de rétractation', body:'Conformément à la Directive 2011/83/UE, un délai de rétractation de 14 jours s\u2019applique sauf renonciation expresse pour exécution immédiate.'},
      {title:'Art. 7 — Confidentialité & résiliation', body:'Obligation de confidentialité réciproque. Résiliation possible pour manquement grave après mise en demeure restée infructueuse sous 15 jours.'},
      {title:'Art. 8 — Droit applicable & litiges', body:'Contrat régi par le droit français. À défaut d\u2019accord amiable (médiation préalable), compétence exclusive des tribunaux de Lyon.'},
    ];
    const ctBankChips = allBanks.map((b,i)=>({ label:b.label, sub:b.iban.slice(0,14)+'…', style:'flex:1;min-width:120px;padding:10px 13px;border-radius:11px;font:600 9px \'Inter\',sans-serif;cursor:pointer;line-height:1.4;'+(i===ctBankI?'background:var(--text);color:var(--bg);':'border:1px solid var(--hair);color:var(--muted);'), pick:(()=>{const k=i;return ()=>this.setState({ctBank:k});})() }));
    const ctTypeChips=[['marque','Marque × Créateur'],['repr','Représentation'],['ugc','Contrat UGC']].map(p=>({ label:p[1], style:'padding:10px 15px;border-radius:11px;font:600 10px \'Inter\',sans-serif;cursor:pointer;white-space:nowrap;'+(p[0]===ctt?'background:var(--text);color:var(--bg);':'border:1px solid var(--hair);color:var(--muted);'), pick:(()=>{const k=p[0];return ()=>this.setState({ctType:k});})() }));
    const ctCreatorChips=this.rosterRaw.map((c,i)=>({ name:c.name.split(' ')[0], style:'padding:7px 12px;border-radius:18px;font:600 9px \'Inter\',sans-serif;cursor:pointer;'+(i===ctci?'background:var(--signal);color:var(--onsignal);':'background:var(--rowhover);color:var(--muted);'), pick:()=>this.setState({ctCreator:i}) }));

    // ===== CREATOR DETAIL (ROSTER) =====
    const rdi = this.state.rosterDetail; let rd = null;
    if(rdi!=null && this.rosterRaw[rdi]){ const c=this.rosterRaw[rdi]; const fn=c.name.split(' ')[0];
      const rinv=this.invoiceRaw.filter(v=>v.party.indexOf(fn)>-1).map(v=>{const st=this.invStatus(v.status);return {ref:v.ref,party:v.party,amount:v.amount,date:v.date,statusLabel:st.label,dotStyle:dotS(st.tone,false),chipStyle:this.chip()};});
      const rtd=todoItems.map((t,i)=>({t,i})).filter(x=>x.t.creator===c.name).map(x=>mkTodo(x.t,x.i));
      const rbf=briefItems.filter(b=>b.who===c.name).map(b=>{const st=this.briefStatus(b.status);return {brand:b.brand,deliverables:b.deliverables,due:b.due,statusLabel:st.label,dotStyle:dotS(b.tone,false),chipStyle:this.chip()};});
      const rid=[{a:'Format '+c.niche+' tendance',b:'Reel · à valider',tone:'indigo'},{a:'Collab croisée roster',b:'Story · idée',tone:'signal'}].map(o=>({a:o.a,b:o.b,dotStyle:dotS(o.tone,false)}));
      const _rdKey = c.name;   // coordonnées rattachées au CRÉATEUR (par nom)
      const mkRdInfo=(field)=>(e)=>{ const v=e.target.value; this.setState(s=>{ const ri=Object.assign({},s.rosterInfo); ri[_rdKey]=Object.assign({}, this.rosterInfoRaw[_rdKey]||{}, ri[_rdKey]||{}, {[field]:v}); return {rosterInfo:ri}; }); };
      const rinfoBase=Object.assign({ville:'',phone:'',email:'',emailPro:'',address:'',siren:'',birth:'',instagram:'',tiktok:'',exclu:false,commission:'20%'}, this.rosterInfoRaw[_rdKey]||{}, (this.state.rosterInfo&&this.state.rosterInfo[_rdKey])||{});
      const _social=(val,kind)=>{ let v=String(val||'').trim(); if(!v) return ''; if(/^https?:\/\//i.test(v)) return v; v=v.replace(/^@/,'').replace(/\s/g,''); return kind==='tiktok'?('https://www.tiktok.com/@'+v):('https://www.instagram.com/'+v); };
      const _igUrl=_social(rinfoBase.instagram||(/instagram/i.test(c.plat||'')?c.handle:''),'ig');
      const _ttUrl=_social(rinfoBase.tiktok||(/tiktok/i.test(c.plat||'')?c.handle:''),'tiktok');
      const _rinfoCopy=(label,val)=>()=>{ const v=String(val||''); if(!v.trim())return; try{ if(navigator.clipboard) navigator.clipboard.writeText(v).catch(()=>{}); }catch(_){} this.setState({rinfoCopied:label}); toast('Copié : '+v); setTimeout(()=>this.setState(s=> s.rinfoCopied===label?{rinfoCopied:null}:{}),1500); };
      const _mkRf=(label,key)=>({ label, value:rinfoBase[key]||'', onInput:mkRdInfo(key), copy:_rinfoCopy(label,rinfoBase[key]), canCopy:!!(rinfoBase[key]&&String(rinfoBase[key]).trim()), copyLabel:(this.state.rinfoCopied===label?'COPIÉ ✓':'COPIER'), copyIcon:(this.state.rinfoCopied===label?this._ic('_check'):this._ic('_copy')) });
      const rinfoFields=[ _mkRf('Ville / Pays','ville'), _mkRf('Téléphone','phone'), _mkRf('Email','email'), _mkRf('Email pro','emailPro'), _mkRf('Adresse postale','address'), _mkRf('SIREN / SIRET','siren'), _mkRf('Date de naissance','birth'), _mkRf('Instagram (@ ou lien)','instagram'), _mkRf('TikTok (@ ou lien)','tiktok'), _mkRf('Commission TTP (%)','commission') ];
      const mkPaste = async () => { try{ const txt = await navigator.clipboard.readText(); if(!txt) return; const cur = Object.assign({}, this.rosterInfoRaw[_rdKey]||{}, (this.state.rosterInfo&&this.state.rosterInfo[_rdKey])||{}); const set=(k,v)=>{ if(v && String(v).trim()) cur[k]=String(v).trim(); }; txt.split(/\r?\n/).map(s=>s.trim()).filter(Boolean).forEach(l=>{ const m=l.match(/^([^:]{2,30}):\s*(.+)$/); if(!m) return; const key=m[1].toLowerCase(); const val=m[2]; if(/ville|pays|localit/.test(key)) set('ville',val); else if(/t[ée]l|phone|mobile|portable|num/.test(key)) set('phone',val); else if(/mail/.test(key)) set('email',val); else if(/adresse|address|rue|postal/.test(key)) set('address',val); else if(/siren|siret|tva/.test(key)) set('siren',val); else if(/naiss|date|dob/.test(key)) set('birth',val); }); const email=txt.match(/[\w.+-]+@[\w-]+\.[\w.-]+/); if(email) set('email',email[0]); const siren=txt.match(/\b\d{3}[\s.]?\d{3}[\s.]?\d{3}\b/); if(siren) set('siren',siren[0]); const phone=txt.match(/(\+?\d[\d\s().-]{8,}\d)/); if(phone){ const d=phone[0].replace(/\D/g,''); const sd=siren?siren[0].replace(/\D/g,''):''; if(d!==sd) set('phone',phone[0].trim()); } const ri=Object.assign({}, this.state.rosterInfo); ri[_rdKey]=cur; this.setState({rosterInfo:ri}); }catch(e){ alert('Autorise l\'accès au presse-papier pour coller les infos.'); } };
      const toggleExclu = () => { this.setState(s=>{ const ri=Object.assign({},s.rosterInfo); const base=Object.assign({}, this.rosterInfoRaw[_rdKey]||{}, ri[_rdKey]||{}); base.exclu=!base.exclu; ri[_rdKey]=base; return {rosterInfo:ri}; }); };
      rd={ name:c.name, niche:c.niche, plat:c.plat, handle:c.handle, followers:c.followers, er:c.er, ca:c.ca, reach:c.reach, initials:this.creatorPhoto(c.name)?'':this.initials(c.name), bigAvatarStyle:this.avatarFor(c.name,c.tone,dark,64), avatarInner:this.creatorPhoto(c.name)?'':this.initials(c.name), onPhoto:mkPhoto('cre:'+c.name), statusLabel:statusLabelOf(c.status), dotStyle:dotS(c.tone,c.status==='live'), invoices:rinv, todos:rtd, briefs:rbf, ideas:rid, infoFields:rinfoFields, igUrl:_igUrl, tiktokUrl:_ttUrl, hasIg:!!_igUrl, hasTiktok:!!_ttUrl, paste:mkPaste, save:()=>{ try{ this._persistNow(); }catch(_){} try{ this._saveCreatorInfo(c.name); }catch(_){} toast('Informations enregistrées ✓'); }, exclu:!!rinfoBase.exclu, commission:rinfoBase.commission||'—', excluLabel:rinfoBase.exclu?'EXCLUSIF':'NON EXCLUSIF', excluStyle:'padding:8px 14px;border-radius:10px;font:600 9px \'Inter\',sans-serif;cursor:pointer;'+(rinfoBase.exclu?'background:var(--signal);color:var(--onsignal);':'border:1px solid var(--hair);color:var(--muted);'), toggleExclu }; }

    // ===== DOCUMENTS (shared store) =====
    const docTypeMeta = { brief:{label:'Brief',tone:'indigo',glyph:'✎'}, mediakit:{label:'Media kit',tone:'signal',glyph:'▦'}, facture:{label:'Facture',tone:'cyan',glyph:'⊞'}, autre:{label:'Document',tone:'indigo',glyph:'▤'} };
    const docBase = this.state.docs || this.docsRaw;
    const docAll = this.state.docCreator==='all';
    const docCi = (this.state.docCreator!=null && this.state.docCreator!=='all') ? this.state.docCreator : 0;
    const docTy = this.state.docType || 'brief';
    // documents indexés par NOM de créateur (comme rosterInfo) → pas de décalage
    // quand un créateur est ajouté/supprimé.
    const _docName = (this.rosterRaw[docCi]||_EMPTY_CR).name;
    const mkDoc = (d, key, idx, whoLabel)=>{ const tm=docTypeMeta[d.type]||docTypeMeta.autre; const url=d.url||('data:text/plain;charset=utf-8,'+encodeURIComponent('TTP — '+d.name+'\n'+tm.label+'\nDocument de démonstration TTP Suite.')); const filename=d.url?d.name:(d.name.replace(/\.[a-z0-9]+$/i,'')+'.txt'); const hex=this.toneHex(tm.tone,dark); return { name:d.name, glyph:tm.glyph, tagLabel:tm.label, who:(whoLabel||''), hasWho:!!whoLabel, meta:[d.size,d.date].filter(Boolean).join(' · '), url, filename, iconStyle:'width:40px;height:40px;border-radius:11px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font:600 16px \'Inter\',sans-serif;background:'+hex+'22;color:'+hex+';', tagStyle:'font:600 8px \'Inter\',sans-serif;letter-spacing:.6px;padding:4px 9px;border-radius:20px;white-space:nowrap;color:'+hex+';background:'+hex+'18;', open:(()=>{const nm=d.name,u=url,fn=filename,im=(/^data:image/.test(url)||/\.(png|jpe?g|gif|webp|svg)$/i.test(d.name));return ()=>this.setState({previewDoc:{name:nm,url:u,filename:fn,isImage:im}});})(), remove:(()=>{const cc=key,ii=idx,doc=d;return ()=>{ if(!window.confirm('Supprimer « '+doc.name+' » ?'))return; if(this._docsTable && doc.id){ this._deleteDoc(doc); } const b=this.state.docs||this.docsRaw;const cur=Object.assign({},b);cur[cc]=(cur[cc]||[]).filter((_,j)=>j!==ii);this.setState({docs:cur}); toast('Document supprimé');};})() }; };
    const _docCount=(nm)=>((docBase[nm]||[]).length);
    const _docRoster = this.rosterRaw.map((c,i)=>({c,i})).filter(x=>!(this.state.deletedRoster||{})[x.i]);
    const _docTotal = _docRoster.reduce((a,x)=>a+_docCount(x.c.name),0);
    const _docChip=(label,count,sel,initials,avatarStyle,onPick,isAll)=>({ name:label, count:count, initials:initials||'', avatarStyle:avatarStyle||'', isAll:!!isAll, chipStyle:'display:flex;align-items:center;gap:8px;padding:5px 14px 5px '+(isAll?'14px':'5px')+';border-radius:30px;cursor:pointer;font:600 11px \'Inter\',sans-serif;letter-spacing:.3px;'+(sel?'background:var(--text);color:var(--bg);':'background:var(--surface);color:var(--text);border:1px solid var(--hair);'), pick:onPick });
    const docCreatorChips = [ _docChip('Tous', _docTotal, docAll, '', '', ()=>this.setState({docCreator:'all'}), true) ]
      .concat(_docRoster.map(({c,i})=> _docChip(c.name.split(' ')[0], _docCount(c.name), (!docAll && i===docCi), (this.creatorPhoto(c.name)?'':this.initials(c.name)), this.avatarFor(c.name,c.tone,dark,24), (()=>{const k=i;return ()=>this.setState({docCreator:k});})(), false) ));
    const docTypeChips = Object.keys(docTypeMeta).map(k=>({ label:docTypeMeta[k].label, style:'padding:7px 13px;border-radius:18px;font:600 9px \'Inter\',sans-serif;letter-spacing:.4px;cursor:pointer;'+(k===docTy?'background:var(--signalsoft);color:var(--signaltext);':'background:var(--panel);color:var(--muted);'), pick:(()=>{const kk=k;return ()=>this.setState({docType:kk});})() }));
    const agencyDocs = docAll
      ? _docRoster.flatMap(({c})=> (docBase[c.name]||[]).map((d,idx)=>mkDoc(d, c.name, idx, c.name.split(' ')[0])))
      : (docBase[_docName]||[]).map((d,idx)=>mkDoc(d,_docName,idx));
    const docCreatorName = docAll ? 'tous les créateurs' : (this.rosterRaw[docCi]||_EMPTY_CR).name.split(' ')[0];
    const myCi = (()=>{ const c=this._meCreator(); const j=c?this.rosterRaw.indexOf(c):-1; return j>=0?j:(this.state.creatorId!=null?this.state.creatorId:0); })();
    const _myDocName = (this.rosterRaw[myCi]||_EMPTY_CR).name;
    const myDocs = (docBase[_myDocName]||[]).map((d,idx)=>mkDoc(d,_myDocName,idx));

    // ===== MEDIA KIT =====
    const _mkDel=this.state.deletedRoster||{};
    const _mkFirst=this.rosterRaw.findIndex((_,i)=>!_mkDel[i]);
    let mkCi = this.state.mkCreator!=null?this.state.mkCreator:(_mkFirst>=0?_mkFirst:0);
    if(_mkDel[mkCi]) mkCi=(_mkFirst>=0?_mkFirst:0);   // si le créateur sélectionné a été retiré
    const mkc = this.rosterRaw[mkCi]||_EMPTY_CR; const mkSeed = this.mediaKitRaw[mkCi]||{}; const mkFn=mkc.name.split(' ')[0];
    const _mkOv = (this.state.mediaKitData&&this.state.mediaKitData[mkCi])||{};   // overrides éditables
    const _mkGet = (k,def)=> (_mkOv[k]!==undefined&&_mkOv[k]!=='') ? _mkOv[k] : (mkSeed[k]||def);
    const _mkEdit = (k)=>(e)=>{ const v=e.target.value; this.setState(s=>{ const md=Object.assign({},s.mediaKitData); md[mkCi]=Object.assign({}, md[mkCi]||{}, {[k]:v}); return {mediaKitData:md}; }); };
    const mkGender = _mkGet('gender','Femmes 70% · Hommes 30%');
    const mkFemM=/(\d+)%/.exec(mkGender); const mkFem=mkFemM?Number(mkFemM[1]):65;
    const mk = { name:mkc.name, fn:mkFn, handle:mkc.handle, niche:mkc.niche, plat:mkc.plat, initials:this.creatorPhoto(mkc.name)?'':this.initials(mkc.name), avatarStyle:this.avatarFor(mkc.name,mkc.tone,dark,76), bio: _mkGet('bio', mkFn+', créateur '+mkc.niche.toLowerCase()+' représenté(e) par TTP Agency. Contenus premium, audience engagée et collaborations à forte conversion.'), onBio:_mkEdit('bio'), age: _mkGet('age','18–34 ans'), agePct: _mkGet('agePct','64%'), gender:mkGender, onGender:_mkEdit('gender'), femStyle:'width:'+mkFem+'%;', homStyle:'width:'+(100-mkFem)+'%;' };
    const mkStats=[{label:'ABONNÉS',value:mkc.followers},{label:'ENGAGEMENT',value:mkc.er},{label:'REACH / MOIS',value:mkc.reach},{label:'PLATEFORME',value:mkc.plat}];
    const mkGeo = (mkSeed.geo||['Paris','Lyon','Bruxelles']);
    const mkBrands = (mkSeed.brands||['Sephora','Dior','L’Oréal']);
    const mkFormats = (mkSeed.formats||[{label:'Reel Instagram',price:'1 800 €'},{label:'Story (×3)',price:'700 €'},{label:'Post feed',price:'1 200 €'},{label:'Vidéo UGC',price:'650 €'}]);
    const mkCreatorChips = this.rosterRaw.map((c,i)=>({c,i})).filter(x=>!_mkDel[x.i]).map(({c,i})=>({ name:c.name.split(' ')[0], initials:this.creatorPhoto(c.name)?'':this.initials(c.name), avatarStyle:this.avatarFor(c.name,c.tone,dark,24), chipStyle:'display:flex;align-items:center;gap:8px;padding:5px 14px 5px 5px;border-radius:30px;cursor:pointer;font:600 11px \'Inter\',sans-serif;'+(i===mkCi?'background:var(--text);color:var(--bg);':'background:var(--surface);color:var(--text);border:1px solid var(--hair);'), pick:(()=>{const k=i;return ()=>this.setState({mkCreator:k});})() }));

    // ===== PORTAL: MESSAGES + IDENTITY =====
    // Annonces du portail créateur = VRAIS messages du fil d'annonce agence (broadcast,
    // clé "2", visible par tous). Plus de fausses annonces codées en dur.
    const _broadcast = ((this.state.threadMsgs||this.msgsRaw)['2']||[]).filter(m=>m && m.from==='agency');
    const announcements = _broadcast.slice().reverse().map((m,idx)=>({ title:m.text, body:'', time:'', cardStyle:'background:var(--surface);border-radius:16px;padding:18px;'+(idx===0?'border:1px solid '+this.toneHex('indigo',dark)+';':'border:1px solid var(--hair);'), badgeStyle:'display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:20px;font:600 8px \'Inter\',sans-serif;letter-spacing:.6px;'+(idx===0?'background:'+this.toneHex('indigo',dark)+';color:#fff;':'background:var(--rowhover);color:var(--muted);'), badgeLabel:idx===0?'⚡ DERNIÈRE':'INFO' }));
    const announcementsEmpty = announcements.length===0;
    const _ot = this.state.openThread; const _base = this.state.threadMsgs || this.msgsRaw;
    // Shared message store keyed by thread. aMeta maps each thread -> (creator, campaign);
    // key 2 is the agency broadcast shown to every creator. The AGENCY sees every
    // thread (one per creator); a CREATOR sees only their own threads + the broadcast.
    // Plus de fils de démonstration (rattachés à d'anciens créateurs supprimés) : la
    // messagerie agence n'affiche que les VRAIES conversations (créées + en base).
    const aMetaSeed = {};
    const _customConvos = this.state.customConvos || [];           // [{key, creator, tone}]
    const _delConvos = this.state.deletedConvos || {};
    const _toneOf = (name)=>{ const c=this.rosterRaw.find(x=>x&&x.name===name); return c?c.tone:'indigo'; };
    // full meta map : seed campaigns + broadcast + conversations directes créées
    const aMetaAll = Object.assign({ 2:{creator:'__all__', campaign:'Annonce agence', tone:'signal'} }, aMetaSeed);
    _customConvos.forEach(c=>{ aMetaAll[c.key]={ creator:c.creator, campaign:(c.kind==='agencyDM'?'Échange avec l’agence':'Conversation directe'), tone:c.tone||_toneOf(c.creator) }; });
    const aMeta = aMetaAll;
    const _bubble=(mine)=> 'max-width:75%;padding:11px 15px;border-radius:16px;font:400 13px \'Inter\',sans-serif;line-height:1.5;'+(mine?'background:var(--signal);color:var(--onsignal);border-bottom-right-radius:5px;':'background:var(--surface);color:var(--text);border:1px solid var(--hair);border-bottom-left-radius:5px;');
    const _delConvo=(key)=>{ if(!window.confirm('Supprimer cette discussion ?'))return; if(this._messagesTable){ try{ this._sb.from('messages').delete().eq('thread_key', String(key)).then(()=>{}); }catch(_){} } this.setState(s=>{ const dc=Object.assign({},s.deletedConvos,{[key]:true}); const cc=(s.customConvos||[]).filter(c=>c.key!==key); const tm=Object.assign({},(s.threadMsgs||this.msgsRaw)); delete tm[key]; return { deletedConvos:dc, customConvos:cc, threadMsgs:tm, openAThread:(s.openAThread===key?null:s.openAThread), openThread:(s.openThread===key?null:s.openThread) }; }); toast('Discussion supprimée'); };
    // ---- CREATOR PORTAL : only this creator's threads (+ broadcast), non supprimées ----
    const _myThreadKeys = Object.keys(aMetaAll).filter(k=> !_delConvos[k] && (aMetaAll[k].creator===cr.name || aMetaAll[k].creator==='__all__'));
    const threads = _myThreadKeys.map(k=>{ const ms=_base[k]||[]; const lm=ms[ms.length-1]; let u=0; for(let j=ms.length-1;j>=0;j--){ if(ms[j].from==='agency') u++; else break; } const last= lm ? (lm.from==='me'?'Toi : ':'Agence : ')+lm.text : '—'; return { campaign:aMetaAll[k].campaign, last, time:'', unread:u>0?String(u):'', hasUnread:u>0, read:u===0, dotStyle:dotS(aMetaAll[k].tone,false), open:(()=>{const kk=k;return ()=>this.setState({openThread:kk});})() }; });
    const convMsgs = _ot!=null ? (_base[_ot]||[]).map(m=>({ text:m.text, rowStyle:'display:flex;margin-bottom:10px;'+(m.from==='me'?'justify-content:flex-end;':'justify-content:flex-start;'), bubbleStyle:_bubble(m.from==='me') })) : [];
    const convTitle = (_ot!=null && aMetaAll[_ot]) ? aMetaAll[_ot].campaign : '';
    // ---- AGENCY INBOX : tous les fils (campagnes + directs), non supprimés ----
    const _agencyKeys = _customConvos.map(c=>c.key).filter(k=> !_delConvos[k] && aMetaAll[k]);
    const agencyThreads = _agencyKeys.map(k=>{ const meta=aMetaAll[k]; const ms=_base[k]||[]; const lm=ms[ms.length-1]; const w=meta.creator.split(' ')[0]; const lcap=w.charAt(0)+w.slice(1).toLowerCase(); const last= lm ? (lm.from==='agency'?'Vous : ':lcap+' : ')+lm.text : 'Nouvelle conversation'; return { creator:meta.creator, campaign:meta.campaign, initials:this.creatorPhoto(meta.creator)?'':this.initials(meta.creator), avatarStyle:this.avatarFor(meta.creator,meta.tone,dark,38), last, hasUnread:(!!lm && lm.from==='me'), open:(()=>{const kk=k;return ()=>this.setState({openAThread:kk});})(), del:(()=>{const kk=k;return (e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); _delConvo(kk); };})() }; });
    const _at = this.state.openAThread;
    const aConvMsgs = _at!=null ? (_base[_at]||[]).map(m=>({ text:m.text, rowStyle:'display:flex;margin-bottom:10px;'+(m.from==='agency'?'justify-content:flex-end;':'justify-content:flex-start;'), bubbleStyle:_bubble(m.from==='agency') })) : [];
    const aConvWho = (_at!=null && aMetaAll[_at]) ? aMetaAll[_at].creator : '';
    const aConvTitle = (_at!=null && aMetaAll[_at]) ? aMetaAll[_at].campaign : '';
    const aConvInitials = (_at!=null && aMetaAll[_at]) ? this.initials(aMetaAll[_at].creator) : '';
    const aAvatarStyle = (_at!=null && aMetaAll[_at]) ? this.avatarStyle(aMetaAll[_at].tone,dark,38) : '';
    // ---- nouvelle conversation : choisir un créateur ----
    const aNewMsgOpen = !!this.state.aNewMsg;
    const newMsgCreators = this.rosterRaw.filter((_,i)=>!(this.state.deletedRoster||{})[i]).map(c=>({ name:c.name, niche:c.niche, initials:this.creatorPhoto(c.name)?'':this.initials(c.name), avatarStyle:this.avatarFor(c.name,c.tone,dark,38), pick:(()=>{const nm=c.name, key='dm:'+c.name, tn=c.tone;return ()=>{ this.setState(s=>{ const cc=(s.customConvos||[]).slice(); if(!cc.some(x=>x.key===key)) cc.push({key, creator:nm, tone:tn}); const dc=Object.assign({},s.deletedConvos); delete dc[key]; return { customConvos:cc, deletedConvos:dc, openAThread:key, aNewMsg:false }; }); };})() }));
    const bannerPhoto = (this.state.photos||{}).banner || '';
    const bannerStyle = 'height:118px;border-radius:18px;position:relative;overflow:hidden;'+(bannerPhoto?'background-image:url('+bannerPhoto+');background-size:cover;background-position:center;':'background:'+this.toneHex(cr.tone,dark)+';');
    // Profil créateur — UNIQUEMENT des données réelles (coordonnées saisies par
    // l'agence/le créateur). Plus de bio/valeurs/audience inventées.
    const _meInfo = Object.assign({}, this.rosterInfoRaw[cr.name]||{}, (this.state.rosterInfo&&this.state.rosterInfo[cr.name])||{});
    me.commission = _meInfo.commission || '—';
    me.exclu = !!_meInfo.exclu;
    me.excluLabel = _meInfo.exclu ? 'Exclusif' : 'Non exclusif';
    me.instagram = _meInfo.instagram || (/instagram/i.test(cr.plat||'')?cr.handle:'') || '—';
    me.tiktok = _meInfo.tiktok || (/tiktok/i.test(cr.plat||'')?cr.handle:'') || '—';
    me.hasProfilDocs = (myDocs && myDocs.length>0);
    me.noProfilDocs = !(myDocs && myDocs.length>0);
    me.profilDocs = myDocs || [];

    // ---- ALERTES : dérivées des données réelles (factures, briefs, créateurs,
    // prospects) + objectif. Chaque alerte a un id stable -> suppression persistée. ----
    const _alRaw = [];
    (this.state.invoiceData||this.invoiceRaw).forEach(v=>{ if(v.status==='retard') _alRaw.push({id:'inv:'+v.ref, title:'Facture '+v.party+' impayée', detail:'#'+v.ref+' · '+v.amount+' · éch. '+v.date, tone:'amber', tag:'IMPAYÉ'}); });
    briefItems.forEach(b=>{ if(b.status==='valider' && !((this.state.briefDone||{})[b.brand])) _alRaw.push({id:'brief:'+b.brand, title:'Brief '+b.brand+' à valider', detail:(b.who||'créateur à attribuer')+' · échéance '+b.due, tone:'indigo', tag:'BRIEF'}); });
    this.rosterRaw.filter((_,i)=>!(this.state.deletedRoster||{})[i]).forEach(c=>{ if(c.status==='pause') _alRaw.push({id:'crea:'+c.name, title:c.name.split(' ')[0]+' sans activité', detail:'Statut en pause · à relancer', tone:'cyan', tag:'CRÉATEUR'}); });
    (this.state.prospectData||this.prospectRaw).forEach(p=>{ if(p.stage==='Négociation') _alRaw.push({id:'deal:'+p.brand, title:'Deal '+p.brand+' en négociation', detail:(p.contact||'')+' · '+p.value, tone:'cyan', tag:'DEAL'}); });
    // Alerte objectif — dérivée des VRAIS objectifs du mois (plus de chiffres codés en
    // dur) : ne s'affiche QUE si un objectif est défini ET que le palier 80% est franchi.
    (()=>{ const _o=(this.state.objByMonth&&this.state.objByMonth[0])||this.objRaw||[]; const _n=(s)=>Number(String(s||'').replace(/[^0-9]/g,''))||0; const real=_o.reduce((a,o)=>a+_n(o.ca),0); const tgt=_o.reduce((a,o)=>a+_n(o.target),0); if(tgt>0){ const pct=Math.round(real/tgt*100); if(pct>=80){ const _f=(n)=>String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,' ')+' €'; _alRaw.push({id:'obj:ca', title:'Objectif CA à '+pct+'% — palier 80% franchi', detail:_f(real)+' / '+_f(tgt), tone:'signal', tag:'OBJECTIF'}); } } })();
    const alerts = _alRaw.filter(a=> !((this.state.dismissedAlerts||{})[a.id])).map(a=>({ title:a.title, detail:a.detail, tag:a.tag, dotStyle:dotS(a.tone,false), tagStyle:"font:600 8px 'Inter',sans-serif;letter-spacing:.6px;color:var(--muted);padding:5px 10px;border-radius:20px;background:var(--rowhover);white-space:nowrap;", treat:(()=>{const id=a.id;return ()=>{ this.setState(s=>({dismissedAlerts:Object.assign({},s.dismissedAlerts,{[id]:true})})); toast('Alerte traitée ✓'); };})() }));
    const alertsCount = alerts.length;

    // ---- NOTIFICATIONS (derived from live data, dismissable + persistent) ----
    // Scope: the AGENCY space receives everything; a logged-in CREATOR receives
    // ONLY notifications that concern them (their briefs, RDV, to-dos, messages).
    const _ntRaw = [];
    const _inCreator = this.state.space==='creator' && this.state.creatorId!=null;
    if(_inCreator){
      myBriefsArr.forEach(b=>{ if(!((this.state.briefDone||{})[b.brand])) _ntRaw.push({ id:'ntc:'+cr.name+':brief:'+b.brand, icon:'✎', tone:'indigo', title:'Brief à préparer — '+b.brand, time:'Échéance '+b.due }); });
      myEvents.slice(0,3).forEach(e=>{ _ntRaw.push({ id:'ntc:'+cr.name+':ev:'+e.title+':'+e.day, icon:'◷', tone:'cyan', title:'RDV : '+e.title, time:e.time+' · '+e.day+' juin' }); });
      myTodosArr.forEach(x=>{ const dn = this._todosTable ? !!x.t.done : !!((this.state.doneSet||{})[x.i]); if(!dn) _ntRaw.push({ id:'ntc:'+cr.name+':todo:'+x.i, icon:'☑', tone:'signal', title:'À faire : '+x.t.text, time:x.t.due||'' }); });
      Object.keys(aMeta).filter(k=>aMeta[k]&&aMeta[k].creator===cr.name).forEach(k=>{ const ms=_base[k]||[]; const lm=ms[ms.length-1]; if(lm && lm.from==='agency') _ntRaw.push({ id:'ntc:'+cr.name+':msg:'+k+':'+ms.length, icon:'✉', tone:'indigo', title:'Message de ton agence', time:aMeta[k].campaign }); });
    } else {
      // messages reçus des créateurs (dernier message non lu = from 'me')
      [0,1,3,4,5].concat(_customConvos.map(c=>c.key)).filter(k=>!_delConvos[k]&&aMetaAll[k]).forEach(k=>{ const ms=_base[k]||[]; const lm=ms[ms.length-1]; if(lm&&lm.from==='me'){ const w=aMetaAll[k].creator.split(' ')[0]; _ntRaw.push({ id:'nt:msg:'+k+':'+ms.length, icon:'✉', tone:'indigo', title:'Message de '+w, time:lm.text.length>46?lm.text.slice(0,46)+'…':lm.text }); } });
      (this.state.ideasData||this.ideasRaw).forEach((x,i)=>{ if(x && x.source==='creator') _ntRaw.push({ id:'nt:idea:'+(x.text||i), icon:'◆', tone:'signal', title:(x.creator?x.creator.split(' ')[0]+' a proposé une idée':'Nouvelle idée proposée'), time:x.text }); });
      briefItems.forEach(b=>{ if(b.status==='valider' && !((this.state.briefDone||{})[b.brand])) _ntRaw.push({ id:'nt:brief:'+b.brand, icon:'✎', tone:'indigo', title:'Brief à valider — '+b.brand, time:(b.who||'créateur à attribuer')+' · échéance '+b.due }); });
      (this.state.invoiceData||this.invoiceRaw).forEach(v=>{ if(v.status==='retard') _ntRaw.push({ id:'nt:inv:'+v.ref, icon:'€', tone:'indigo', title:'Facture en retard — '+v.party, time:'#'+v.ref+' · '+v.amount }); });
      (this.state.prospectData||this.prospectRaw).forEach(p=>{ if(p.stage==='Négociation') _ntRaw.push({ id:'nt:deal:'+p.brand, icon:'⌖', tone:'cyan', title:'Deal en négociation — '+p.brand, time:(p.contact||'')+' · '+p.value }); });
      this.rosterRaw.filter((_,i)=>!(this.state.deletedRoster||{})[i]).forEach(c=>{ if(c.status==='pause') _ntRaw.push({ id:'nt:crea:'+c.name, icon:'◵', tone:'cyan', title:c.name.split(' ')[0]+' est en pause', time:'À relancer · sans activité' }); });
    }
    const _ntDismissed = this.state.dismissedNotifs||{};
    const _ntVisible = _ntRaw.filter(n=> !_ntDismissed[n.id]);
    const notifications = _ntVisible.map(n=>({ icon:n.icon, title:n.title, time:n.time, iconStyle:'width:30px;height:30px;border-radius:9px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font:600 12px \'Inter\',sans-serif;background:'+this.toneHex(n.tone,dark)+'18;color:'+this.toneHex(n.tone,dark)+';', dismiss:(()=>{const id=n.id;return (e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); this.setState(s=>({dismissedNotifs:Object.assign({},s.dismissedNotifs,{[id]:true})})); };})() }));
    const clearNotifs = ()=>{ const all=Object.assign({}, this.state.dismissedNotifs); _ntVisible.forEach(n=>{ all[n.id]=true; }); this.setState({ dismissedNotifs:all, notifOpen:false }); toast('Notifications effacées'); };
    const notifEmpty = notifications.length===0;

    // ===== DASHBOARD FINANCE — derived from real invoices + objectives =====
    const _invAll = this.state.invoiceData||this.invoiceRaw;
    const _eur = (s)=>Number(String(s||'').replace(/[^0-9]/g,''))||0;
    const _sumInv = (st)=>_invAll.filter(v=>v.status===st).reduce((a,v)=>a+_eur(v.amount),0);
    const _cntInv = (st)=>_invAll.filter(v=>v.status===st).length;
    const finEncaisse=_sumInv('payee'), finAttente=_sumInv('attente'), finRetard=_sumInv('retard');
    // commission agence (%) = moyenne réelle des commissions du roster (repli 20%)
    const _commNums = this.rosterRaw.filter((_,i)=>!(this.state.deletedRoster||{})[i]).map(c=>{ const inf=Object.assign({},this.rosterInfoRaw[c.name]||{}, (this.state.rosterInfo&&this.state.rosterInfo[c.name])||{}); return Number(String(inf.commission||'').replace(/[^0-9.]/g,''))||0; }).filter(n=>n>0);
    const finCommission = _commNums.length ? Math.round(_commNums.reduce((a,b)=>a+b,0)/_commNums.length) : 20;
    const finReverse=Math.round(finEncaisse*(1-finCommission/100));
    const finTotalFacture=finEncaisse+finAttente+finRetard;
    const _fmtE=(n)=>String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,' ')+' €';
    const _perF={hebdo:0.25,mensuel:1,trimestre:3,annuel:12};
    const _per=this.state.caPeriod||'mensuel';
    // objectif % = moyenne des objectifs du mois courant
    const _objArr=(this.state.objByMonth&&this.state.objByMonth[0])||this.objRaw;
    const finObjPct = _objArr.length ? Math.round(_objArr.reduce((a,o)=>a+(Number(o.pct)||0),0)/_objArr.length) : 0;
    const _incomeFill = Math.max(8, Math.min(100, finObjPct));
    // provision fiscale & sociale — estimations dérivées du facturé / encaissé
    const finMarge = Math.round(finEncaisse*finCommission/100);
    const fTvaColl = Math.round(finTotalFacture*0.20);
    const fTvaDed = Math.round(finTotalFacture*0.03);
    const fTvaNet = fTvaColl - fTvaDed;
    const fUrssaf = Math.round(finEncaisse*0.10);
    const fIS = Math.round(finMarge*0.25);
    const fProvTotal = fTvaNet + fUrssaf + fIS;
    // ===== OBJECTIFS — cartes de synthèse (réelles, dérivées objectifs + pipeline) =====
    const _objCaReal = _objArr.reduce((a,o)=>a+_eur(o.ca),0);
    const _objCaTarget = _objArr.reduce((a,o)=>a+_eur(o.target),0);
    const objCaPct = _objCaTarget>0 ? Math.round(_objCaReal/_objCaTarget*100) : 0;
    const objCaSub = _objCaTarget>0 ? (_fmtE(_objCaReal)+' / '+_fmtE(_objCaTarget)) : 'aucun objectif défini';
    const objCaBarStyle = 'width:'+Math.max(0,Math.min(100,objCaPct))+'%;height:100%;background:var(--signal);border-radius:5px;';
    const _prospAllO = this.state.prospectData||this.prospectRaw||[];
    const _signedO = _prospAllO.filter(p=>/sign/i.test(p.stage||''));
    const objDealsSigned = String(_signedO.length);
    const objDealsSub = _prospAllO.length ? ('/ '+_prospAllO.length+' au pipeline') : 'pipeline vide';
    const objDealsBarStyle = 'width:'+(_prospAllO.length?Math.round(_signedO.length/_prospAllO.length*100):0)+'%;height:100%;background:var(--indigo);border-radius:5px;';
    const objMargeVal = String(finCommission)+'%';
    const objMargeSub = finMarge>0 ? (_fmtE(finMarge)+' encaissés') : 'commission agence';
    const objMargeBarStyle = 'width:'+Math.max(0,Math.min(100,finCommission))+'%;height:100%;background:var(--cyan);border-radius:5px;';
    // ===== REPORTING COMMISSION / CA — par créateur, dérivé des VRAIES factures =====
    const _eurR=(s)=>Number(String(s||'').replace(/[^0-9]/g,''))||0;
    const _invForReport = this.state.invoiceData||this.invoiceRaw;
    // CA réel d'un créateur = somme de ses factures (liées par creator, repli sur le nom dans party)
    const _caForCreator=(c)=>{ const fn=c.name.split(' ')[0]; return _invForReport.reduce((a,v)=>{ const byField=v.creator&&v.creator===c.name; const parts=String(v.party||'').split(' × '); const byParty=!v.creator && parts.length>1 && parts[1].trim()===fn; return a+((byField||byParty)?_eurR(v.amount):0); },0); };
    const commissionReport = this.rosterRaw.filter((_,i)=>!(this.state.deletedRoster||{})[i]).map(c=>{ const inf=Object.assign({},this.rosterInfoRaw[c.name]||{}, (this.state.rosterInfo&&this.state.rosterInfo[c.name])||{}); const comm=Number(String(inf.commission||'').replace(/[^0-9.]/g,''))||0; const ca=_caForCreator(c); const earned=Math.round(ca*comm/100); return { name:c.name, first:c.name.split(' ')[0], initials:this.creatorPhoto(c.name)?'':this.initials(c.name), avatarStyle:this.avatarFor(c.name,c.tone,dark,30), caLabel:ca?_fmtE(ca):'—', commLabel:comm?comm+'%':'—', earnedLabel:_fmtE(earned), _earned:earned, _ca:ca }; }).sort((a,b)=>b._earned-a._earned);
    const _commTot=commissionReport.reduce((a,r)=>a+r._earned,0); const _caTot=commissionReport.reduce((a,r)=>a+r._ca,0);
    const commissionTotal=_fmtE(_commTot); const commissionCaTotal=_fmtE(_caTot);
    const commissionTopName = commissionReport[0]?commissionReport[0].first:'—';
    const commissionReportEmpty = commissionReport.length===0;
    // ===== DASHBOARD ACTIVITY — biggest live deal + first overdue invoice + growth =====
    const _activeInv = _invAll.filter(v=>v.status==='attente'||v.status==='payee');
    const _bigDeal = _activeInv.slice().sort((a,b)=>_eur(b.amount)-_eur(a.amount))[0] || _invAll[0] || {amount:'—',party:'—'};
    const _retardList = _invAll.filter(v=>v.status==='retard');
    const _firstRetard = _retardList[0] || null;
    // croissance vs an dernier = moyenne des tendances mensuelles du roster, annualisée
    const _liveRoster = this.rosterRaw.filter((_,i)=>!(this.state.deletedRoster||{})[i]);
    const _avgTrend = _liveRoster.length ? _liveRoster.reduce((a,c)=>a+(Number(c.trend)||0),0)/_liveRoster.length : 0;
    const growthPctN = Math.round(_avgTrend*12);
    // nombre de marques en prospection (pour la carte "Prospection active")
    const _prospAll = this.state.prospectData||this.prospectRaw||[];
    const _prospCount = Array.isArray(_prospAll) ? _prospAll.filter(p=>p && p.stage!=='Signé').length : 0;

    // ---- action handlers (add / contact / export) ----
    const _fmtAmt=(s)=>{ const n=Number(String(s||'').replace(/[^0-9]/g,'')); return n ? (String(n).replace(/\B(?=(\d{3})+(?!\d))/g,' ')+' €') : (String(s||'').trim()||'—'); };
    const addInvoice = () => {
      const brand=(this.state.niFacBrand||'').trim(); if(!brand){ toast('Indique la marque'); return; }
      const ci=this.state.niFacCreator; const crFull=(ci!=null && this.rosterRaw[ci]) ? this.rosterRaw[ci].name : ''; const crName=crFull?crFull.split(' ')[0]:'';
      const party = crName ? (brand+' × '+crName) : brand;
      const amount = _fmtAmt(this.state.niFacAmount);
      const due = (this.state.niFacDue||'').trim() || '—';
      const status = this.state.niFacStatus || 'brouillon';
      const ed=this.state.editingInvoice;
      if(ed){ const patch={party, amount, date:due, status, creator:crFull||null}; this.setState(s=>({ invoiceData:(s.invoiceData||this.invoiceRaw).map(x=> (x===ed||(ed&&ed.id&&x&&x.id===ed.id))?Object.assign({},x,patch):x), showInvoiceForm:false, editingInvoice:null, niFacBrand:'', niFacAmount:'', niFacDue:'', niFacCreator:null, niFacStatus:'brouillon' })); if(this._invoicesTable && ed.id) this._dbUpdate('invoices', ed.id, patch); toast('Facture modifiée ✓'); return; }
      const base=(this.state.invoiceData||this.invoiceRaw); const ref=String(_todayY)+'-'+String(180+base.length).padStart(3,'0');
      const row={ref, party, amount, date:due, status, creator:crFull||null};
      const prepend=(r)=>{ const item=r?Object.assign({id:r.id},row):row; this.setState(s=>({ invoiceData:[item].concat(s.invoiceData||this.invoiceRaw), showInvoiceForm:false, niFacBrand:'', niFacAmount:'', niFacDue:'', niFacCreator:null, niFacStatus:'brouillon' })); toast('Facture créée ✓'); };
      if(this._invoicesTable){ this._dbInsert('invoices', row).then(prepend); } else { prepend(null); }
    };
    // ---- NEW CONTACT (proper form) ----
    const _ncoType = this.state.ncoType || 'Marque';
    const _typeTones = { 'Marque':'indigo', 'Agence':'signal', 'Média':'cyan', 'PME':'indigo', 'Autre':'cyan' };
    const contactTypeChips = ['Marque','Agence','Média','PME','Autre'].map(t=>({ label:t, style:'padding:9px 15px;border-radius:11px;font:600 10px \'Inter\',sans-serif;cursor:pointer;'+(_ncoType===t?'background:var(--text);color:var(--bg);':'border:1px solid var(--hair);color:var(--muted);'), pick:(()=>{const k=t;return ()=>this.setState({ncoType:k});})() }));
    const _ncoField = (key)=>(e)=>{ const v=e.target.value; this.setState({[key]:v}); };
    const addContact = () => {
      const company=(this.state.ncoCompany||'').trim();
      if(!company){ toast('Renseigne au moins l’entreprise'); return; }
      const person=[(this.state.ncoFirst||'').trim(),(this.state.ncoLast||'').trim()].filter(Boolean).join(' ');
      const type=this.state.ncoType||'Marque';
      const row={brand:company, person:(person||'—'), role:(this.state.ncoRole||'').trim(), tag:type, email:(this.state.ncoEmail||'').trim(), phone:(this.state.ncoPhone||'').trim(), tone:_typeTones[type]||'indigo'};
      const display=Object.assign({last:'jamais', deals:'—'}, row);
      const prepend=(r)=>{ const item=r?Object.assign({id:r.id},display):display; this.setState(s=>({ contactsData:[item].concat(this._contactsFrom(s)), showContactForm:false, ncoFirst:'', ncoLast:'', ncoCompany:'', ncoRole:'', ncoEmail:'', ncoPhone:'', ncoType:'Marque' })); };
      if(this._contactsTable){ this._dbInsert('contacts', row).then(prepend); } else { prepend(null); }
      toast('Contact ajouté');
    };
    const addProspect = () => { const brand=window.prompt('Marque :',''); if(brand==null||!brand.trim())return; const value=window.prompt('Montant estimé :','')||''; const row={brand:brand.trim(), contact:'', value:(value.trim()||'—'), stage:'Prospection', tone:'cyan'}; const prepend=(r)=>{ const item = r ? Object.assign({id:r.id}, row) : row; this.setState(s=>({ prospectData:[item].concat(s.prospectData||this.prospectRaw) })); }; if(this._prospectsTable){ this._dbInsert('prospects', row).then(prepend); } else { prepend(null); } toast('Marque ajoutée au pipeline'); };
    const addModuleRow = () => { const view=this.state.view; const m=this.modules[view]; if(!m)return; const a=window.prompt('Titre :',''); if(a==null||!a.trim())return; const b2=window.prompt('Sous-titre :','')||''; this.setState(s=>{ const mr=Object.assign({}, s.moduleRows); const base=((mr[view]||m.rows)).slice(); base.unshift({a:a.trim(), b:b2.trim(), c:'', tone:'cyan'}); mr[view]=base; return { moduleRows:mr }; }); toast('Élément ajouté'); };
    const _ocData = (this.state.openContact!=null) ? ((this._contacts())[this.state.openContact]) : null;
    const sendEmailContact = () => { if(_ocData&&_ocData.email){ window.location.href='mailto:'+_ocData.email; } else { toast('Aucune adresse email'); } };
    const callContact = () => { if(_ocData&&_ocData.phone){ window.location.href='tel:'+String(_ocData.phone).replace(/\s/g,''); } else { toast('Aucun numéro de téléphone'); } };
    return {
      themeVars, themeGlyph: dark ? this._ic('_sun',16) : this._ic('_moon',16),
      toastMsg:this.state.toast||'', hasToast:!!this.state.toast,
      topSearch:this.state.topSearch||'', onTopSearch:(e)=>this.setState({topSearch:e.target.value}),
      hasSearch: !!q,
      searchResults: (()=>{ if(!q) return []; const out=[]; const rowS="display:flex;flex-direction:column;gap:2px;padding:9px 12px;border-radius:10px;cursor:pointer;"; const subS="font:400 10px 'Inter',sans-serif;color:var(--faint)"; const labS="font:600 12px 'Inter',sans-serif;color:var(--text)";
        this.rosterRaw.forEach((c,i)=>{ if(_match(c.name,c.handle,c.niche)) out.push({rowStyle:rowS,labStyle:labS,subStyle:subS,label:c.name,sub:'Créateur · '+c.niche,go:(()=>{const ii=i;return ()=>this.setState({view:'roster',rosterDetail:ii,space:'agency',topSearch:'',mobileNav:false});})()}); });
        (this._contacts()).forEach((k)=>{ if(_match(k.brand,k.person,k.role)) out.push({rowStyle:rowS,labStyle:labS,subStyle:subS,label:k.brand,sub:'Contact · '+(k.person||''),go:()=>this.setState({view:'contacts',space:'agency',topSearch:'',mobileNav:false})}); });
        (this.state.invoiceData||this.invoiceRaw).forEach((v)=>{ if(_match(v.ref,v.party,v.amount)) out.push({rowStyle:rowS,labStyle:labS,subStyle:subS,label:'#'+v.ref+' — '+v.party,sub:'Facture · '+v.amount,go:()=>this.setState({view:'facturation',space:'agency',topSearch:'',mobileNav:false})}); });
        return out.slice(0,8); })(),
      searchEmpty: !!q && ((()=>{ let n=0; this.rosterRaw.forEach(c=>{if(_match(c.name,c.handle,c.niche))n++;}); (this._contacts()).forEach(k=>{if(_match(k.brand,k.person,k.role))n++;}); (this.state.invoiceData||this.invoiceRaw).forEach(v=>{if(_match(v.ref,v.party,v.amount))n++;}); return n; })()===0),
      activitySearch:this.state.activitySearch||'', onActivitySearch:(e)=>this.setState({activitySearch:e.target.value}),
      showContactForm:!!this.state.showContactForm, openContactForm:()=>this.setState({showContactForm:true}), closeContactForm:()=>this.setState({showContactForm:false}),
      contactTypeChips,
      ncoFirstV:this.state.ncoFirst||'', onNcoFirst:_ncoField('ncoFirst'),
      ncoLastV:this.state.ncoLast||'', onNcoLast:_ncoField('ncoLast'),
      ncoCompanyV:this.state.ncoCompany||'', onNcoCompany:_ncoField('ncoCompany'),
      ncoRoleV:this.state.ncoRole||'', onNcoRole:_ncoField('ncoRole'),
      ncoEmailV:this.state.ncoEmail||'', onNcoEmail:_ncoField('ncoEmail'),
      ncoPhoneV:this.state.ncoPhone||'', onNcoPhone:_ncoField('ncoPhone'),
      // ===== ACCÈS (gestion des comptes créateurs / employés) =====
      vAcces: this.state.view==='acces',
      accessList: (this.state.accessAccounts||[]).map((a,i)=>{ const _cl=a.cloud; const _ci=_cl==='ok'?{t:'✓ Cloud',c:'signal'}:_cl==='pending'?{t:'… création',c:'cyan'}:_cl==='conflict'?{t:'⚠ Mot de passe',c:'indigo'}:_cl==='error'?{t:'⚠ Local seul',c:'indigo'}:_cl==='local'?{t:'Local',c:'cyan'}:null; return ({ email:a.email, roleLabel:(a.role==='creator'?'Créateur':'Agence / Équipe'), creator:a.creator||'', cloudShow:!!_ci, cloudLabel:_ci?_ci.t:'', cloudStyle:_ci?("font:600 8px 'Inter',sans-serif;letter-spacing:.4px;padding:4px 9px;border-radius:20px;white-space:nowrap;color:"+this.toneHex(_ci.c,dark)+";background:"+this.toneHex(_ci.c,dark)+"18;"):'', dotStyle:dotS(a.role==='creator'?'cyan':'signal',false), roleStyle:"font:600 8px 'Inter',sans-serif;letter-spacing:.5px;padding:4px 10px;border-radius:20px;white-space:nowrap;color:"+this.toneHex(a.role==='creator'?'cyan':'signal',dark)+";background:"+this.toneHex(a.role==='creator'?'cyan':'signal',dark)+"18;",
        pwdShown: this.state.acReveal===a.email, pwdDisplay: (this.state.acReveal===a.email ? (a.pwd||'—') : '••••••••'), pwdToggleLabel: (this.state.acReveal===a.email?'Masquer':'Voir'),
        pwdToggle:(()=>{const em=a.email;return ()=>this.setState(s=>({ acReveal: s.acReveal===em?null:em }));})(),
        copyPwd:(()=>{const pw=a.pwd||'';return ()=>{ if(!pw)return; try{ if(navigator.clipboard) navigator.clipboard.writeText(pw).catch(()=>{}); }catch(_){} toast('Mot de passe copié'); };})(),
        del:(()=>{const ii=i,em=a.email;return ()=>{ if(!window.confirm('Supprimer l\'accès '+em+' ?'))return; this.setState(s=>({ accessAccounts:(s.accessAccounts||[]).filter((_,j)=>j!==ii) })); };})() }); }),
      accessEmpty: (this.state.accessAccounts||[]).length===0,
      acEmailV:this.state.acEmail||'', onAcEmail:(e)=>{const v=e.target.value;this.setState({acEmail:v});},
      acPwdV:this.state.acPwd||'', onAcPwd:(e)=>{const v=e.target.value;this.setState({acPwd:v});},
      acRoleCreator:(this.state.acRole||'creator')==='creator', acRoleAgency:(this.state.acRole||'creator')==='agency',
      acRoleChips:[['creator','Créateur'],['agency','Agence / Employé']].map(p=>({ label:p[1], style:'padding:9px 15px;border-radius:11px;font:600 10px \'Inter\',sans-serif;cursor:pointer;'+((this.state.acRole||'creator')===p[0]?'background:var(--text);color:var(--bg);':'border:1px solid var(--hair);color:var(--muted);'), pick:(()=>{const k=p[0];return ()=>this.setState({acRole:k});})() })),
      acCreatorChips: this.rosterRaw.filter((_,i)=>!(this.state.deletedRoster||{})[i]).map(c=>({ name:c.name.split(' ')[0], full:c.name, style:'padding:7px 12px;border-radius:18px;font:600 9px \'Inter\',sans-serif;cursor:pointer;'+(((this.state.acCreator||(this.rosterRaw[0]||{}).name))===c.name?'background:var(--text);color:var(--bg);':'background:var(--rowhover);color:var(--muted);'), pick:(()=>{const nm=c.name;return ()=>this.setState({acCreator:nm});})() })),
      addAccess: async () => {
        const email=(this.state.acEmail||'').trim().toLowerCase(); const pwd=(this.state.acPwd||'').trim();
        if(!email||!pwd){ toast('Email et mot de passe requis'); return; }
        if(pwd.length<6){ toast('Mot de passe trop court (6 caractères minimum)'); return; }
        const role=this.state.acRole||'creator';
        const creator= role==='creator' ? (this.state.acCreator||(this.rosterRaw[0]||{}).name||null) : null;
        if(role==='creator' && !creator){ toast('Choisis le créateur rattaché'); return; }
        if((this.state.accessAccounts||[]).some(a=>String(a.email||'').toLowerCase()===email)){ toast('Cet email a déjà un accès'); return; }
        // 1) enregistre l'accès localement (actif côté agence) + relie le portail du créateur
        this.setState(s=>{ const upd={ accessAccounts:[...(s.accessAccounts||[]), {email,pwd,role,creator,cloud:'pending'}], acEmail:'', acPwd:'' }; if(role==='creator' && creator){ const ri=Object.assign({},s.rosterInfo); ri[creator]=Object.assign({}, this.rosterInfoRaw[creator]||{}, ri[creator]||{}, {email}); upd.rosterInfo=ri; } return upd; });
        // 2) crée le VRAI compte Supabase via un client jetable (pour ne pas remplacer la
        //    session agence en cours), rôle + créateur en métadonnées : le trigger
        //    handle_new_user crée le profil rattaché → isolation par créateur. On ATTEND
        //    la réponse et on affiche un statut clair (le créateur sait s'il peut se connecter).
        const setCloud=(st)=>this.setState(s=>({ accessAccounts:(s.accessAccounts||[]).map(a=> String(a.email||'').toLowerCase()===email ? Object.assign({},a,{cloud:st}) : a) }));
        try{
          if(window.supabase && window.__SB_URL__ && window.__SB_KEY__){
            const tmp=window.supabase.createClient(window.__SB_URL__, window.__SB_KEY__, { auth:{ persistSession:false, autoRefreshToken:false, storageKey:'ttp_signup_tmp' } });
            const { error } = await tmp.auth.signUp({ email, password:pwd, options:{ data:{ role, creator_name:creator } } });
            if(!error){ setCloud('ok'); toast('Compte créé ✓ — '+(creator||'la personne')+' peut se connecter de partout'); }
            else if(/already|registered|exist/i.test(error.message||'')){
              // email déjà inscrit : on vérifie que le mot de passe saisi ouvre bien ce compte
              const { error: e2 } = await tmp.auth.signInWithPassword({ email, password:pwd });
              if(!e2){ setCloud('ok'); toast('Ce compte existait déjà ✓ — identifiants valides, connexion OK'); }
              else { setCloud('conflict'); toast('⚠ Cet email a déjà un compte avec un AUTRE mot de passe — supprime-le dans Supabase ou change d\'email'); }
            }
            else { setCloud('error'); console.warn('[supabase] signup:', error.message); toast('Accès local OK · cloud : '+error.message); }
            try{ await tmp.auth.signOut(); }catch(_){}
          } else { setCloud('local'); toast('Accès créé (mode local — base non connectée)'); }
        }catch(e){ setCloud('error'); console.warn('[supabase] signup failed', e); toast('Accès local OK · cloud indisponible'); }
      },
      calLabel, prevMonth, nextMonth,
      todayChip: (['DIM','LUN','MAR','MER','JEU','VEN','SAM'][new Date(_todayY,_todayMo,_todayDay).getDay()])+' '+_todayDay+' '+_moNames[_todayMo].toUpperCase(),
      todayLong: _dowFull[new Date(_todayY,_todayMo,_todayDay).getDay()]+' '+_todayDay+' '+_moNamesFull[_todayMo],
      monthYear: _moNames[_todayMo]+' '+_todayY, monthUp:(_moNames[_todayMo]+' '+_todayY).toUpperCase(), monthShort:_moNames[_todayMo].toUpperCase(),
      addInvoice, addContact, addProspect, addModuleRow, sendEmailContact, callContact,
      showInvoiceForm:!!this.state.showInvoiceForm, openInvoiceForm:()=>this.setState({showInvoiceForm:true, editingInvoice:null, niFacBrand:'', niFacAmount:'', niFacDue:'', niFacCreator:null, niFacStatus:'brouillon'}), closeInvoiceForm:()=>this.setState({showInvoiceForm:false, editingInvoice:null}),
      invFormTitle: this.state.editingInvoice ? 'Modifier la facture' : 'Nouvelle facture', invFormCta: this.state.editingInvoice ? 'ENREGISTRER' : 'CRÉER LA FACTURE',
      niFacBrandV:this.state.niFacBrand||'', onNiFacBrand:(e)=>{const v=e.target.value;this.setState({niFacBrand:v});},
      niFacAmountV:this.state.niFacAmount||'', onNiFacAmount:(e)=>{const v=e.target.value;this.setState({niFacAmount:v});},
      niFacDueV:this.state.niFacDue||'', onNiFacDue:(e)=>{const v=e.target.value;this.setState({niFacDue:v});},
      invFacCreatorChips: this.rosterRaw.map((c,i)=>({c,i})).filter(x=>!(this.state.deletedRoster||{})[x.i]).map(({c,i})=>({ name:c.name.split(' ')[0], style:'padding:7px 12px;border-radius:18px;font:600 9px \'Inter\',sans-serif;cursor:pointer;'+((this.state.niFacCreator)===i?'background:var(--text);color:var(--bg);':'background:var(--rowhover);color:var(--muted);'), pick:(()=>{const k=i;return ()=>this.setState({niFacCreator:k});})() })),
      invFacStatusChips: [['brouillon','Brouillon','cyan'],['attente','En attente','indigo'],['payee','Payée','signal'],['retard','En retard','indigo']].map(p=>({ label:p[1], style:'padding:8px 14px;border-radius:11px;font:600 10px \'Inter\',sans-serif;cursor:pointer;'+(((this.state.niFacStatus)||'brouillon')===p[0]?'background:var(--text);color:var(--bg);':'border:1px solid var(--hair);color:var(--muted);'), pick:(()=>{const k=p[0];return ()=>this.setState({niFacStatus:k});})() })),
      genDevis:()=>{ const lines=(priceLines||[]).map(l=>'<div class="row"><span>'+l.label+' ('+l.qtyLabel+')</span><b>'+l.line+'</b></div>').join('') || '<p class="muted">Aucun contenu sélectionné.</p>'; const body='<h1>Devis</h1><p class="muted">'+priceCreatorName+' · '+priceMeta+'</p><hr>'+lines+'<hr>'+(pExcl?'<div class="row"><span>Exclusivité</span><b>+30%</b></div>':'')+'<div class="row"><span>Tarif conseillé</span><b>'+fmtEur(pTotal)+'</b></div><div class="row"><span><b>Minimum à proposer</b></span><b>'+fmtEur(pMin)+'</b></div><p class="muted" style="margin-top:18px">Devis indicatif établi par TTP Agency. Validité 30 jours.</p>'; this._openPrint('Devis — '+priceCreatorName, body);
        // enregistre le calcul dans l'historique
        if(priceLines && priceLines.length){ let id; try{ id='ph'+Date.now(); }catch(_){ id='ph'+(this.state.priceHistory||[]).length; } let dt; try{ dt=new Date().toLocaleDateString('fr-FR'); }catch(_){ dt=''; } const hist={ id, name:priceCreatorName, meta:priceMeta, total:fmtEur(pTotal), min:fmtEur(pMin), excl:!!pExcl, items:(priceLines||[]).map(l=>l.label+' · '+l.qtyLabel), date:dt }; this.setState(s=>({ priceHistory:[hist].concat(s.priceHistory||[]).slice(0,30) })); }
      },
      priceHistory: (this.state.priceHistory||[]).map(h=>({ name:h.name, meta:h.meta, total:h.total, min:h.min, date:h.date, exclLabel:(h.excl?'Exclusivité +30%':''), items:(h.items||[]).join('  ·  '), del:(()=>{const id=h.id;return ()=>this.setState(s=>({ priceHistory:(s.priceHistory||[]).filter(x=>x.id!==id) }));})() })),
      priceHistEmpty: (this.state.priceHistory||[]).length===0,
      clearPriceHistory:()=>{ if(!window.confirm('Vider tout l\'historique des calculs ?'))return; this.setState({priceHistory:[]}); },
      genMediaPdf:()=>{ this._printPreview('Media kit — '+mk.name, 'mediakit'); },
      sendCanva:()=>toast('Envoyé vers Canva ✓'),
      genContractPdf:()=>{ this._printPreview(ctTitle, 'contract'); },
      sendSignature:()=>{ const _info=Object.assign({}, this.rosterInfoRaw[ctName]||{}, (this.state.rosterInfo&&this.state.rosterInfo[ctName])||{}); const to=String(_info.email||_info.emailPro||'').trim(); const body=ctTitle+'\n\n'+ctParties+'\n\n'+ctTerms.map(t=>'• '+t.l+' : '+t.v).join('\n')+'\n\nMerci de retourner ce document daté et signé.\n— TTP Agency'; const subj='Contrat à signer — '+ctTitle+(cBrand?(' · '+cBrand):''); if(to){ try{ window.location.href='mailto:'+encodeURIComponent(to)+'?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body); toast('Email de signature préparé ✓'); return; }catch(_){} } try{ if(navigator.clipboard) navigator.clipboard.writeText(body); }catch(_){} toast('Contrat copié — ajoute l’email du créateur dans le Roster'); },
      editProfil:()=>toast('Édition du profil bientôt disponible'), contactAgent:()=>{ try{ window.location.href='mailto:marc@ttpcreators.pro?subject='+encodeURIComponent('Contact — '+(cr?cr.name:'créateur')); }catch(_){ toast('marc@ttpcreators.pro'); } },
      dashMore:()=>toast('Activité à jour ✓'), actFiltersOpen: this.state.actFiltersOpen!==false, toggleActFilters:()=>this.setState(s=>({actFiltersOpen: s.actFiltersOpen===false})),
      showDealsChip:!this.state.hideDeals, showBriefsChip:!this.state.hideBriefs,
      removeDealsChip:()=>this.setState({hideDeals:true}), removeBriefsChip:()=>this.setState({hideBriefs:true}),
      bottomNav, navOpenCls, openMobileNav, closeMobileNav,
      notifOpen:!!this.state.notifOpen, toggleNotif:()=>this.setState(s=>({notifOpen:!s.notifOpen})), closeNotif:()=>this.setState({notifOpen:false}),
      hasNotif:notifications.length>0, notifCount:String(notifications.length), notifEmpty, clearNotifs,
      notifications,
      vAlertes:this.state.view==='alertes', alerts,
      vMessages:this.state.view==='messages', agencyThreads,
      aMsgListShown: this.state.openAThread==null, aThreadOpen: this.state.openAThread!=null, aConvMsgs, aConvWho, aConvTitle, aConvInitials, aAvatarStyle, adraft:this.state.adraft,
      aNewMsgOpen, newMsgCreators, openNewMsg:()=>this.setState({aNewMsg:true}), closeNewMsg:()=>this.setState({aNewMsg:false}),
      aDelConvo:()=>{ const at=this.state.openAThread; if(at!=null) _delConvo(at); },
      delConvo:()=>{ const ot=this.state.openThread; if(ot!=null) _delConvo(ot); },
      onADraft:(e)=>{const v=e.target.value;this.setState({adraft:v});}, backAThreads:()=>this.setState({openAThread:null}),
      sendMsgA:()=>{ const at=this.state.openAThread; if(at==null)return; const d=(this.state.adraft||'').trim(); if(!d)return; const base=this.state.threadMsgs||this.msgsRaw; const cur=Object.assign({},base); const arr=(cur[at]||[]).slice(); const msg={from:'agency',text:d}; arr.push(msg); cur[at]=arr; this.setState({threadMsgs:cur, adraft:''}); if(this._messagesTable){ const cm=aMetaAll[at]&&aMetaAll[at].creator; this._dbInsert('messages',{thread_key:String(at), sender:'agency', body:d, creator:(cm&&cm!=='__all__')?cm:null, sort_order:arr.length}).then(r=>{ if(r&&r.id){ msg.id=r.id; } }); } },
      pMessages:this.state.portalTab==='messages', announcements, threads, bannerStyle, onPhotoBanner: mkPhoto('banner'),
      msgListShown: this.state.openThread==null, threadOpen: this.state.openThread!=null, convMsgs, convTitle, draft:this.state.draft,
      onDraft:(e)=>{const v=e.target.value;this.setState({draft:v});}, backThreads:()=>this.setState({openThread:null}),
      writeToAgency:()=>{ const nm=cr?cr.name:''; const key='cdm:'+nm; this.setState(s=>{ const cc=(s.customConvos||[]).slice(); if(!cc.some(c=>c.key===key)) cc.push({key, creator:nm, tone:(cr?cr.tone:'signal'), kind:'agencyDM'}); const dc=Object.assign({},s.deletedConvos); delete dc[key]; return { customConvos:cc, deletedConvos:dc, openThread:key }; }); },
      sendMsg:()=>{ const ot=this.state.openThread; if(ot==null)return; const d=(this.state.draft||'').trim(); if(!d)return; const base=this.state.threadMsgs||this.msgsRaw; const cur=Object.assign({},base); const arr=(cur[ot]||[]).slice(); const msg={from:'me',text:d}; arr.push(msg); cur[ot]=arr; this.setState({threadMsgs:cur, draft:''}); if(this._messagesTable){ const cm=aMetaAll[ot]&&aMetaAll[ot].creator; this._dbInsert('messages',{thread_key:String(ot), sender:'me', body:d, creator:(cm&&cm!=='__all__')?cm:null, sort_order:arr.length}).then(r=>{ if(r&&r.id){ msg.id=r.id; } }); } },
      rosterListShown: this.state.view==='roster' && this.state.rosterDetail==null,
      rosterDetailShown: this.state.view==='roster' && this.state.rosterDetail!=null,
      rd, backToRoster:()=>this.setState({rosterDetail:null}),
      exportContacts:()=>{ const base=this._contacts(); const head=['Marque','Contact','Role','Email','Telephone','Dernier contact','Historique','Tag']; const esc=(v)=>{v=(v==null?'':String(v));return /[";\\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v;}; const rows=base.map(k=>[k.brand,k.person,k.role,k.email||'',k.phone||'',k.last||'',k.deals||'',k.tag||''].map(esc).join(';')); const csv=[head.join(';')].concat(rows).join('\\r\\n'); const blob=new Blob(['\\ufeff'+csv],{type:'text/csv;charset=utf-8;'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='contacts-ttp.csv'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),1500); },
      importContacts:(e)=>{ const f=e.target.files&&e.target.files[0]; if(!f)return; const r=new FileReader(); r.onload=()=>{ const lines=String(r.result).split(/\\r?\\n/).filter(l=>l.trim()); if(!lines.length){e.target.value='';return;} const sep=lines[0].indexOf(';')>=0?';':','; const parse=(ln)=>{const out=[];let cur='',q=false;for(let i=0;i<ln.length;i++){const c=ln[i];if(q){if(c==='"'){if(ln[i+1]==='"'){cur+='"';i++;}else q=false;}else cur+=c;}else{if(c==='"')q=true;else if(c===sep){out.push(cur);cur='';}else cur+=c;}}out.push(cur);return out;}; const start=/marque|brand|contact/i.test(lines[0])?1:0; const tones=['indigo','cyan','signal']; const base=(this._contacts()).slice(); const added=[]; lines.slice(start).forEach(l=>{const c=parse(l); if(!(c[0]||c[1]))return; const row={brand:(c[0]||'\u2014').trim(),person:(c[1]||'').trim(),role:(c[2]||'').trim(),email:(c[3]||'').trim(),phone:(c[4]||'').trim(),last:(c[5]||'jamais').trim(),deals:(c[6]||'\u2014').trim(),tag:(c[7]||'Import\u00e9').trim(),tone:tones[base.length%3]}; base.push(row); added.push(row);}); this.setState({contactsData:base}); if(this._contactsTable && added.length){ try{ this._sb.from('contacts').insert(added.map(a=>({brand:a.brand,person:a.person,role:a.role,tag:a.tag,email:a.email,phone:a.phone,tone:a.tone}))).select().then(()=>{ this._loadContacts(); }); }catch(_){} } }; r.readAsText(f,'utf-8'); e.target.value=''; },
      vDocuments:this.state.view==='documents', goDocuments:()=>this.setState({view:'documents'}),
      docCreatorChips, docTypeChips, agencyDocs, agencyDocsEmpty:agencyDocs.length===0, docCreatorName,
      onAddDoc:(e)=>{ const f=e.target.files&&e.target.files[0]; if(!f)return; const ci2=this.state.docCreator!=null?this.state.docCreator:0; const nm=(this.rosterRaw[ci2]||{}).name; if(!nm){ toast('Ajoute d\'abord un cr\u00e9ateur au roster'); e.target.value=''; return; } const ty=this.state.docType||'brief'; this._addDocFor(nm, f, ty); e.target.value=''; },
      pDocuments:this.state.portalTab==='documents', myDocs, myDocsEmpty:myDocs.length===0,
      vMediaKit:this.state.view==='mediakit', goMediaKit:()=>this.setState({view:'mediakit'}), mk, mkStats, mkGeo, mkBrands, mkFormats, mkCreatorChips,
      vIdees:this.state.view==='idees', ideas, ideaOpenObj, ideaDetailOpen, ideaListMode:!ideaDetailOpen, closeIdea, myIdeas, myIdeasEmpty:myIdeas.length===0, myIdeasHas:myIdeas.length>0,
      pTodo:this.state.portalTab==='todo', pIdees:this.state.portalTab==='idees',
      ntCreatorChips, ntPriorityChips, niCreatorChips, niStatusChips,
      showTodoForm:!!this.state.showTodoForm, openTodoForm:()=>this.setState({showTodoForm:true}), closeTodoForm:()=>this.setState({showTodoForm:false}),
      ntText:this.state.ntText||'', ntDue:this.state.ntDue||'', onNtText:(e)=>{const v=e.target.value;this.setState({ntText:v});}, onNtDue:(e)=>{const v=e.target.value;this.setState({ntDue:v});},
      addTodo:()=>{ const t=(this.state.ntText||'').trim(); if(!t)return; const item={text:t, desc:this.state.ntDesc||'', tag:(this.state.ntCreator?'CR\u00c9ATEUR':'AGENCE'), due:this.state.ntDue||'\u2014', creator:this.state.ntCreator||null, priority:this.state.ntPriority||'moyenne', source:'agency', done:false}; const cur=(this.state.todoItems||this.todoRaw).slice(); cur.push(item); this.setState({todoItems:cur, showTodoForm:false, ntText:'', ntDue:''}); if(this._todosTable){ this._linkInsert('todos',{text:item.text,descr:item.desc,tag:item.tag,due:item.due,creator:item.creator,priority:item.priority,source:item.source,sort_order:cur.length},item); } },
      addTodoMe:()=>{ const t=(this.state.ntText||'').trim(); if(!t)return; const crr=this._meCreator(); const nm=crr?crr.name:null; const item={text:t, desc:this.state.ntDesc||'', tag:'PERSO', due:this.state.ntDue||'\u2014', creator:nm, priority:this.state.ntPriority||'moyenne', source:'creator', done:false}; const cur=(this.state.todoItems||this.todoRaw).slice(); cur.push(item); this.setState({todoItems:cur, ntText:'', ntDue:'', ntDesc:'', ntPriority:'moyenne'}); toast('T\u00e2che ajout\u00e9e \u2713'); if(this._todosTable){ this._linkInsert('todos',{text:item.text,descr:item.desc,tag:item.tag,due:item.due,creator:item.creator,priority:item.priority,source:item.source,sort_order:cur.length},item); } },
      ntDesc:this.state.ntDesc||'', onNtDesc:(e)=>{const v=e.target.value;this.setState({ntDesc:v});},
      showIdeaForm:!!this.state.showIdeaForm, toggleIdeaForm:()=>this.setState(s=>({showIdeaForm:!s.showIdeaForm})),
      niText:this.state.niText||'', onNiText:(e)=>{const v=e.target.value;this.setState({niText:v});},
      addIdea:()=>{ const t=(this.state.niText||'').trim(); if(!t)return; const item={text:t, creator:this.state.niCreator||null, status:this.state.niStatus||'\u00c0 explorer', source:'agency'}; const cur=(this.state.ideasData||this.ideasRaw).slice(); cur.unshift(item); this.setState({ideasData:cur, showIdeaForm:false, niText:''}); if(this._ideasTable){ this._linkInsert('ideas',{text:item.text,creator:item.creator,status:item.status,source:item.source,sort_order:0},item); } },
      addIdeaMe:()=>{ const t=(this.state.niText||'').trim(); if(!t)return; const crr=this._meCreator(); const nm=crr?crr.name:null; const item={text:t, creator:nm, status:'\u00c0 faire', source:'creator'}; const cur=(this.state.ideasData||this.ideasRaw).slice(); cur.unshift(item); this.setState({ideasData:cur, niText:''}); toast('Id\u00e9e envoy\u00e9e \u00e0 l\'agence \u2713'); if(this._ideasTable){ this._linkInsert('ideas',{text:item.text,creator:item.creator,status:item.status,source:item.source,sort_order:0},item); } },
      showBriefForm:!!this.state.showBriefForm, openBriefForm:()=>this.setState({showBriefForm:true, editBrief:null, nbBrand:'', nbDeliv:'', nbDue:'', nbConsignes:'', nbBudget:'', nbObjectif:''}), closeBriefForm:()=>this.setState({showBriefForm:false, editBrief:null}),
      nbBrandV:this.state.nbBrand||'', nbDelivV:this.state.nbDeliv||'', nbDueV:this.state.nbDue||'', onNbBrand:(e)=>{const v=e.target.value;this.setState({nbBrand:v});}, onNbDeliv:(e)=>{const v=e.target.value;this.setState({nbDeliv:v});}, onNbDue:(e)=>{const v=e.target.value;this.setState({nbDue:v});},
      briefCreatorChips: this.rosterRaw.map((c,i)=>({ name:c.name.split(' ')[0], style:'padding:6px 12px;border-radius:18px;font:600 9px \'Inter\',sans-serif;cursor:pointer;'+((this.state.nbCreator||0)===i?'background:var(--text);color:var(--bg);':'background:var(--rowhover);color:var(--muted);'), pick:(()=>{const k=i;return ()=>this.setState({nbCreator:k});})() })),
      nbConsignesV:this.state.nbConsignes||'', onNbConsignes:(e)=>{const v=e.target.value;this.setState({nbConsignes:v});},
      nbBudgetV:this.state.nbBudget||'', onNbBudget:(e)=>{const v=e.target.value;this.setState({nbBudget:v});},
      nbObjectifV:this.state.nbObjectif||'', onNbObjectif:(e)=>{const v=e.target.value;this.setState({nbObjectif:v});},
      briefFormTitle: this.state.editBrief?'Modifier le brief':'Nouveau brief',
      briefFormCta: this.state.editBrief?'ENREGISTRER':'CR\u00c9ER LE BRIEF',
      addBrief:()=>{ const br=(this.state.nbBrand||'').trim(); if(!br)return; const ci=this.state.nbCreator||0; const _bc=this.rosterRaw[ci]; if(!_bc){ toast('Ajoute d\'abord un créateur au roster'); return; } const nm=_bc.name; const tone=_bc.tone; const consignes=(this.state.nbConsignes||'').trim(); const budget=(this.state.nbBudget||'').trim()||'\u2014'; const objectif=(this.state.nbObjectif||'').trim()||'\u2014'; const deliverables=this.state.nbDeliv||'\u2014'; const due=this.state.nbDue||'\u2014'; const editKey=this.state.editBrief;
        if(editKey){ const it=(this.state.briefItems||this.briefRaw).find(x=>x.brand===editKey); const patch={brand:br, creator:nm, who:nm, tone, deliverables, due, consignes, budget, objectif}; if(this._briefsTable && it && it.id) this._dbUpdate('briefs', it.id, patch); this.setState(s=>({ briefItems:(s.briefItems||this.briefRaw).map(x=> x.brand===editKey ? Object.assign({},x,patch) : x), showBriefForm:false, editBrief:null, briefOpen:br, nbBrand:'', nbDeliv:'', nbDue:'', nbConsignes:'', nbBudget:'', nbObjectif:'' })); toast('Brief modifi\u00e9 \u2713'); return; }
        const item={brand:br, creator:nm, deliverables, due, status:'attente', tone:tone, who:nm, consignes, budget, objectif}; const cur=(this.state.briefItems||this.briefRaw).slice(); cur.unshift(item); this.setState({briefItems:cur, showBriefForm:false, nbBrand:'', nbDeliv:'', nbDue:'', nbConsignes:'', nbBudget:'', nbObjectif:''}); if(this._briefsTable){ this._linkInsert('briefs',{brand:item.brand,creator:item.creator,who:item.who,deliverables:item.deliverables,due:item.due,status:item.status,tone:item.tone,consignes:item.consignes,budget:item.budget,objectif:item.objectif,sort_order:0},item); } },
      briefRows, briefOpenObj, briefDetailOpen, briefListMode:!briefDetailOpen, closeBriefDetail,
      showCreatorForm:!!this.state.showCreatorForm, openCreatorForm:()=>this.setState({showCreatorForm:true}), closeCreatorForm:()=>this.setState({showCreatorForm:false}),
      ncName:this.state.ncName||'', ncHandle:this.state.ncHandle||'', ncNiche:this.state.ncNiche||'', onNcName:(e)=>{const v=e.target.value;this.setState({ncName:v});}, onNcHandle:(e)=>{const v=e.target.value;this.setState({ncHandle:v});}, onNcNiche:(e)=>{const v=e.target.value;this.setState({ncNiche:v});},
      addCreator:()=>{ const nm=(this.state.ncName||'').trim(); if(!nm)return; const tones=['signal','indigo','cyan']; const nc={name:nm.toUpperCase(), handle:this.state.ncHandle||'@nouveau', niche:this.state.ncNiche||'Lifestyle', plat:'Instagram', followers:'0', reach:'0', er:'0%', ca:'0 \u20ac', status:'actif', tone:tones[this.rosterRaw.length%3], trend:0}; this.rosterRaw.push(nc); this.setState({rosterData:this.rosterRaw.slice(), rosterEdited:true, showCreatorForm:false, ncName:'', ncHandle:'', ncNiche:''}); toast('Cr\u00e9ateur ajout\u00e9 \u2713'); if(this._sb){ this._sb.from('creators').insert({sort_order:this.rosterRaw.length-1, name:nc.name, handle:nc.handle, niche:nc.niche, platform:nc.plat, followers:nc.followers, reach:nc.reach, er:nc.er, ca:nc.ca, status:nc.status, tone:nc.tone, trend:nc.trend}).select().then(({data,error})=>{ if(error){ console.warn('[supabase] insert:', error.message); toast('⚠ Ajouté en local mais NON sauvegardé en base — vérifie « Base connectée » puis recharge (il sera récupéré automatiquement)'); return; } if(data&&data[0]){ nc.id=data[0].id; this.setState({rosterData:this.rosterRaw.slice()}); } }); } else { toast('⚠ Base non connectée — créateur en local seulement'); } },
      onAddDocMe:(e)=>{ const f=e.target.files&&e.target.files[0]; if(!f)return; const crr=this._meCreator(); const nm=crr&&crr.name; if(!nm){ e.target.value=''; return; } this._addDocFor(nm, f, 'autre'); e.target.value=''; },
      previewOpen:!!this.state.previewDoc, previewName:this.state.previewDoc?this.state.previewDoc.name:'', previewUrl:this.state.previewDoc?this.state.previewDoc.url:'', previewIsImage:!!(this.state.previewDoc&&this.state.previewDoc.isImage), previewIsDoc:!(this.state.previewDoc&&this.state.previewDoc.isImage), closePreview:()=>this.setState({previewDoc:null}), stopProp:(e)=>{e.stopPropagation();}, previewMedia: this.state.previewDoc ? (this.state.previewDoc.isImage ? React.createElement('div',{style:{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}, React.createElement('img',{src:this.state.previewDoc.url,style:{maxWidth:'100%',maxHeight:'100%',objectFit:'contain',borderRadius:'8px'}})) : React.createElement('iframe',{src:this.state.previewDoc.url,style:{width:'100%',height:'100%',border:'none',background:'#fff'}})) : null,
      bankFormOpen:!!this.state.showBankForm, toggleBankForm:()=>this.setState(s=>({showBankForm:!s.showBankForm})),
      nbLabel:(this.state.nb&&this.state.nb.label)||'', nbIban:(this.state.nb&&this.state.nb.iban)||'', nbBic:(this.state.nb&&this.state.nb.bic)||'',
      onNbLabel:(e)=>{const v=e.target.value;this.setState(s=>({nb:Object.assign({},s.nb,{label:v})}));}, onNbIban:(e)=>{const v=e.target.value;this.setState(s=>({nb:Object.assign({},s.nb,{iban:v})}));}, onNbBic:(e)=>{const v=e.target.value;this.setState(s=>({nb:Object.assign({},s.nb,{bic:v})}));},
      addBank:()=>{ const nb=this.state.nb||{}; if(!nb.label&&!nb.iban)return; const cb=(this.state.customBanks||[]).slice(); cb.push({label:nb.label||'Nouvelle banque', bank:nb.label||'Banque', iban:nb.iban||'—', bic:nb.bic||''}); const ni=this.bankAccounts.length+cb.length-1; this.setState({customBanks:cb, ctBank:ni, showBankForm:false, nb:{label:'',iban:'',bic:''}}); },
      ctBankChips, ctClauses, ctUseCompany:ctUseCo,
      toggleCtCompany:()=>this.setState(s=>({ctUseCompany:!s.ctUseCompany})),
      ctCompanyToggleLabel: ctUseCo?'OUI':'NON',
      ctCompanyToggleStyle:'padding:7px 16px;border-radius:18px;font:600 9px \'Inter\',sans-serif;cursor:pointer;'+(ctUseCo?'background:var(--signal);color:var(--onsignal);':'border:1px solid var(--hair);color:var(--muted);'),
      ctCoNameVal:coName, ctCoSiretVal:coSiret, ctCoVatVal:coVat, ctCoAddrVal:coAddr,
      onCtCoName:(e)=>{const v=e.target.value;this.setState({ctCoName:v});}, onCtCoSiret:(e)=>{const v=e.target.value;this.setState({ctCoSiret:v});}, onCtCoVat:(e)=>{const v=e.target.value;this.setState({ctCoVat:v});}, onCtCoAddr:(e)=>{const v=e.target.value;this.setState({ctCoAddr:v});},
      vContrats:this.state.view==='contrats', ctTypeChips, ctCreatorChips, ctTitle, ctParties, ctTerms,
      ctTypeLabel: ctt==='marque'?'MARQUE × CRÉATEUR':(ctt==='repr'?'AGENCE × CRÉATEUR':'CONTRAT UGC'),
      ctIsBrand: ctt!=='repr', ctIsRepr: ctt==='repr', ctCreatorName:ctName,
      ctBrandVal:this.state.ctBrand, ctValueVal:this.state.ctValue, ctCommissionVal:this.state.ctCommission, ctDurationVal:this.state.ctDuration, ctDeliverablesVal:this.state.ctDeliverables, ctExclLabel,
      ctExclStyle:'display:flex;align-items:center;gap:8px;padding:11px 14px;border-radius:11px;cursor:pointer;font:600 11px \'Inter\',sans-serif;'+(this.state.ctExcl?'background:var(--signalsoft);color:var(--signaltext);':'border:1px solid var(--hair);color:var(--muted);'),
      onCtBrand:(e)=>{const v=e.target.value;this.setState({ctBrand:v});}, onCtValue:(e)=>{const v=e.target.value;this.setState({ctValue:v});}, onCtCommission:(e)=>{const v=e.target.value;this.setState({ctCommission:v});}, onCtDuration:(e)=>{const v=e.target.value;this.setState({ctDuration:v});}, onCtDeliverables:(e)=>{const v=e.target.value;this.setState({ctDeliverables:v});}, toggleCtExcl:()=>this.setState(s=>({ctExcl:!s.ctExcl})),
      engChips, engPlatforms, engInputs, engFormula:cfg.formula, engCalcDetail, engPlatformLabel:cfg.label, engEr:erCalc.toFixed(1).replace('.',',')+'%', engVerdict, engVerdictStyle:"padding:5px 11px;border-radius:20px;font:600 9px 'Inter',sans-serif;background:"+this.toneHex(evTone,dark)+";color:"+(evTone==='signal'?'#10141A':'#FFFFFF')+";",
      engSave, engSaveLabel, engSaveHint, engSaveDisabled:engCustom,
      engFollowers: this.state.engFollowers||'', onEngFollowers:(e)=>{ const v=e.target.value; this.setState({engFollowers:v}); },
      engAvgEr, engReachCumul, engBestEr, engBestErName,
      engDetailOpen, engDetail:engDetailObj, closeEngDetail,
      priceChips, priceFormatSteppers, priceLines, priceHasLines:priceLines.length>0,
      priceSubtotalV:fmtEur(pSubtotal), priceTotalV:fmtEur(pTotal), priceMinV:fmtEur(pMin),
      priceCustom:pCustom, priceFollowersV:this.state.priceFollowers||'', onPriceFollowers:(e)=>{const v=e.target.value;this.setState({priceFollowers:v});}, priceERV:this.state.priceER||'', onPriceER:(e)=>{const v=e.target.value;this.setState({priceER:v});}, priceCustomNameV:this.state.priceCustomName||'', onPriceCustomName:(e)=>{const v=e.target.value;this.setState({priceCustomName:v});},
      priceExcl:pExcl, priceExclToggle, priceExclBoxStyle:'width:16px;height:16px;border-radius:5px;border:1px solid rgba(255,255,255,.35);display:flex;align-items:center;justify-content:center;font:700 9px \'Inter\',sans-serif;color:var(--onsignal);flex-shrink:0;'+(pExcl?'background:var(--signal);border-color:var(--signal);':''), priceExclCheck:pExcl?'✓':'',
      priceCreatorName, priceMeta,
      showContact: oc!=null, openContactObj, closeContact:()=>this.setState({openContact:null}),
      objForm:this.state.objForm, openObjForm:()=>this.setState({objForm:true}), closeObjForm:()=>this.setState({objForm:false}),
      objName:this.state.no?this.state.no.name:'', objTarget:this.state.no?this.state.no.target:'', objPct:this.state.no?this.state.no.pct:'',
      onObjName:(e)=>{const v=e.target.value;this.setState(s=>({no:Object.assign({},s.no,{name:v})}));}, onObjTarget:(e)=>{const v=e.target.value;this.setState(s=>({no:Object.assign({},s.no,{target:v})}));}, onObjPct:(e)=>{const v=e.target.value;this.setState(s=>({no:Object.assign({},s.no,{pct:v})}));},
      addObjective:()=>{const n=this.state.no; if(!n||!n.name)return; const cur=_curObjList(); cur.push({name:String(n.name).toUpperCase(), ca:'—', target:n.target||'—', pct:Number(n.pct)||0, tone:'indigo'}); this.setState(s=>({ objByMonth:Object.assign({},s.objByMonth,{[objOffset]:cur}), objForm:false, no:{name:'',target:'',pct:''} }));},
      objMonthLabel, prevObjMonth, nextObjMonth,
      upcoming,
      toggleTheme: () => this.setState(s => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
      // Bouton rafraîchir : recharge la TOUTE dernière version en contournant le
      // cache (nouvelle URL = nouveau fetch) — évite de devoir forcer le refresh
      // ou de fermer/rouvrir l'app installée. Vide d'abord l'état en attente.
      appRefresh: () => { try{ this._persistNow(); }catch(_){} try{ const base=location.pathname.replace(/[?#].*$/,''); location.replace(base+'?r='+Date.now()); }catch(_){ try{ location.reload(); }catch(__){} } },
      // ---- AUTH GATE ----
      authed: this.state.authed === true,
      notAuthed: this.state.authed !== true,
      isAgencyRole: this.state.authRole === 'agency',
      isCreatorRole: this.state.authRole === 'creator',
      loginTab: this.state.loginTab || 'agency',
      loginTabAgency: (this.state.loginTab||'agency') === 'agency',
      loginTabCreator: (this.state.loginTab||'agency') === 'creator',
      loginTabAgencyStyle: "flex:1; text-align:center; padding:9px 0; border-radius:9px; font:600 11px 'Inter',sans-serif; cursor:pointer; "+((this.state.loginTab||'agency')==='agency'?'background:var(--surface); color:var(--text); box-shadow:0 1px 2px rgba(0,0,0,.06);':'color:var(--faint);'),
      loginTabCreatorStyle: "flex:1; text-align:center; padding:9px 0; border-radius:9px; font:600 11px 'Inter',sans-serif; cursor:pointer; "+((this.state.loginTab||'agency')==='creator'?'background:var(--surface); color:var(--text); box-shadow:0 1px 2px rgba(0,0,0,.06);':'color:var(--faint);'),
      setLoginAgency: ()=>this.setState({loginTab:'agency', loginError:''}),
      setLoginCreator: ()=>this.setState({loginTab:'creator', loginError:''}),
      loginEmail: this.state.loginEmail||'', loginPwd: this.state.loginPwd||'',
      loginEmailPh: (this.state.loginTab||'agency')==='agency' ? 'agence@ttp.com' : 'prenom@ttp.com',
      onLoginEmail: (e)=>{ const v=e.target.value; this.setState({loginEmail:v}); },
      onLoginPwd: (e)=>{ const v=e.target.value; this.setState({loginPwd:v}); },
      loginError: this.state.loginError||'', hasLoginError: !!this.state.loginError,
      loginPwdType: this.state.loginPwdShow ? 'text' : 'password',
      togglePwdShow: ()=>this.setState(s=>({loginPwdShow:!s.loginPwdShow})),
      rememberMe: !!this.state.rememberMe,
      rememberBoxStyle: 'width:16px;height:16px;border-radius:50%;border:1px solid rgba(255,255,255,.35);display:flex;align-items:center;justify-content:center;font:700 9px \'Inter\',sans-serif;color:#0A0A0B;flex-shrink:0;'+(this.state.rememberMe?'background:#fff;border-color:#fff;':''),
      rememberCheck: this.state.rememberMe ? '✓' : '',
      toggleRemember: ()=>this.setState(s=>({rememberMe:!s.rememberMe})),
      forgotPwd: ()=>{ try{ toast('Contacte ton agence pour réinitialiser ton mot de passe.'); }catch(_){} },
      loginSegAgencyStyle: "flex:1; display:flex; align-items:center; justify-content:center; gap:8px; padding:13px 0; border-radius:11px; font:600 12px 'Inter',sans-serif; letter-spacing:.2px; cursor:pointer; transition:all .15s; "+((this.state.loginTab||'agency')==='agency'?'background:#fff; color:#0A0A0B;':'color:rgba(255,255,255,.5);'),
      loginSegCreatorStyle: "flex:1; display:flex; align-items:center; justify-content:center; gap:8px; padding:13px 0; border-radius:11px; font:600 12px 'Inter',sans-serif; letter-spacing:.2px; cursor:pointer; transition:all .15s; "+((this.state.loginTab||'agency')==='creator'?'background:#fff; color:#0A0A0B;':'color:rgba(255,255,255,.5);'),
      loginCtaLabel: this.state.loginBusy ? 'Connexion…' : ((this.state.loginTab||'agency')==='agency' ? 'Se connecter à l’espace agence' : 'Se connecter à mon espace'),
      loginBusy: !!this.state.loginBusy,
      loginCtaStyle: "margin-top:28px; max-width:360px; display:flex; align-items:center; justify-content:center; gap:10px; padding:15px; border-radius:13px; background:#fff; color:#0A0A0B; font:600 13px 'Inter',sans-serif; letter-spacing:.2px; transition:opacity .12s; "+(this.state.loginBusy ? "opacity:.6; cursor:wait; pointer-events:none;" : "cursor:pointer;"),
      loginHint: (this.state.loginTab||'agency')==='agency' ? 'Démo agence — agence@ttp.com · ttp2026' : 'Démo créateur — prénom@ttp.com · mot de passe = prénom (ex : camille / camille)',
      doLogin: async () => {
        if(this.state.loginBusy) return;                       // évite les double-clics sur réseau lent
        this.setState({ loginBusy:true, loginError:'' });
        try {
        const tab=this.state.loginTab||'agency';
        const email=(this.state.loginEmail||'').trim().toLowerCase();
        const pwd=this.state.loginPwd||'';
        // 1) Real Supabase Auth (used as soon as the accounts exist in Supabase).
        if(this._sb && this._sb.auth && this._sb.auth.signInWithPassword){
          try {
            const { data, error } = await this._sb.auth.signInWithPassword({ email, password:pwd });
            if(!error && data && data.user){
              const uemail=(data.user.email||email||'').toLowerCase();
              const agencyEmails=['partnerships@ttpcreators.pro','marcbouraoui@gmail.com','agence@ttp.com'];
              let role=null, creatorId=null, creatorName=null;
              if(agencyEmails.indexOf(uemail)>=0){ role='agency'; }
              else {
                // match the login email against the roster's creator emails (gérés dans le Roster)
                this.rosterRaw.forEach((c,i)=>{ const seed=((this.rosterInfoRaw[c.name]||{}).email||''); const ov=((this.state.rosterInfo&&this.state.rosterInfo[c.name])||{}).email; const em=String(ov||seed||'').toLowerCase().trim(); if(em && em===uemail){ role='creator'; creatorId=i; creatorName=c.name; } });
                // optional fallback: a profiles table if it exists
                if(!role){ try{ const r=await this._sb.from('profiles').select('role,creator_name').eq('user_id',data.user.id).maybeSingle(); const prof=r&&r.data; if(prof){ role=prof.role; if(role==='creator'){ creatorName=prof.creator_name||null; const j=this.rosterRaw.findIndex(c=>c.name===prof.creator_name); creatorId=j>=0?j:0; } } }catch(_){} }
                // dernier recours : métadonnées du compte (présentes dès l'inscription),
                // robuste même si le profil n'a pas (encore) été créé par le trigger.
                if(!role){ try{ const md=(data.user.user_metadata)||{}; if(md.role){ role=md.role; if(role==='creator'){ creatorName=md.creator_name||creatorName||null; const j=this.rosterRaw.findIndex(c=>c.name===md.creator_name); creatorId=j>=0?j:0; } } }catch(_){} }
              }
              if(!role){ try{ await this._sb.auth.signOut(); }catch(_){} this.setState({ loginError:'Compte non rattaché. Ajoute cet email à un créateur du Roster (ou connecte-toi en agence).' }); return; }
              this._authReal=true;
              this.setState({ authed:true, authRole:role, space:(role==='creator'?'creator':'agency'), creatorId, creatorName, view:'apercu', portalTab:'accueil', loginEmail:'', loginPwd:'', loginError:'', mobileNav:false });
              try{ this._cloudReady=false; this._cloudRowId=null; this._loadAllData(); this._loadCloudState(); }catch(_){}
              toast('Base de données connectée ✓');
              return;
            }
            // if Supabase returned a hard error other than bad creds, fall through to built-in
          } catch(_){}
        }
        // 2) Comptes créés depuis l'app (espace agence → Accès). Fonctionnent
        //    immédiatement, sans dashboard Supabase. Le rôle est porté par le compte.
        const acc=(this.state.accessAccounts||[]).find(a=> String(a.email||'').toLowerCase().trim()===email && String(a.pwd||'')===pwd);
        if(acc){
          if(acc.role==='creator'){ const idx=this.rosterRaw.findIndex(c=>c.name===acc.creator); this.setState({ authed:true, authRole:'creator', space:'creator', creatorId:(idx>=0?idx:0), creatorName:acc.creator||null, portalTab:'accueil', loginEmail:'', loginPwd:'', loginError:'', mobileNav:false }); }
          else { this.setState({ authed:true, authRole:'agency', space:'agency', view:'apercu', creatorId:null, loginEmail:'', loginPwd:'', loginError:'', mobileNav:false }); }
          return;
        }
        // 3) Built-in demo credentials (transition before Supabase Auth is set up).
        if(tab==='agency'){
          const accounts=[ {email:'agence@ttp.com', pwd:'ttp2026'}, {email:'marcbouraoui@gmail.com', pwd:'Louigi2OO1'} ];
          if(accounts.some(a=> a.email===email && a.pwd===pwd)){ this.setState({ authed:true, authRole:'agency', space:'agency', view:'apercu', creatorId:null, loginEmail:'', loginPwd:'', loginError:'', mobileNav:false }); toast('Mode local — connexion base inactive'); }
          else { this.setState({ loginError:'Identifiants agence incorrects.' }); }
        } else {
          let found=-1; this.rosterRaw.forEach((c,i)=>{ const cr=this._creatorCreds(c.name); if(email===cr.email && pwd===cr.pwd) found=i; });
          if(found>=0){ this.setState({ authed:true, authRole:'creator', space:'creator', creatorId:found, creatorName:(this.rosterRaw[found]||{}).name||null, portalTab:'accueil', loginEmail:'', loginPwd:'', loginError:'', mobileNav:false }); }
          else { this.setState({ loginError:'Email ou mot de passe créateur incorrect.' }); }
        }
        } finally { this.setState({ loginBusy:false }); }
      },
      logout: () => { try{ if(this._sb&&this._sb.auth&&this._authReal){ this._sb.auth.signOut(); } }catch(_){} this._authReal=false; this.setState({ authed:false, authRole:null, space:'agency', creatorId:null, creatorName:null, view:'apercu', portalTab:'accueil', loginEmail:'', loginPwd:'', loginError:'', mobileNav:false, notifOpen:false }); },
      isAgency: this.state.authed===true && this.state.authRole==='agency' && this.state.space === 'agency',
      isCreatorSpace: this.state.authed===true && this.state.space === 'creator',
      needsLogin: this.state.space === 'creator' && this.state.creatorId == null,
      loggedIn: this.state.space === 'creator' && this.state.creatorId != null,
      // portal exit: agency previewing -> back to agency; creator -> log out
      portalExitLabel: this.state.authRole==='agency' ? 'Espace agence' : 'Se déconnecter',
      portalExitIcon: this.state.authRole==='agency' ? '←' : '⎋',
      portalExit: this.state.authRole==='agency' ? (()=>this.setState({ space:'agency', creatorId:null, creatorName:null })) : (()=>this.setState({ authed:false, authRole:null, space:'agency', creatorId:null, creatorName:null, view:'apercu', portalTab:'accueil', loginEmail:'', loginPwd:'', loginError:'', mobileNav:false, notifOpen:false })),
      enterPortal: () => this.setState({ space:'creator', creatorId:null, creatorName:null, mobileNav:false }),
      backToAgency: () => this.setState({ space:'agency', creatorId:null, creatorName:null }),
      navApercu: [ this.navItem('apercu','◴','Aperçu'), this.navItem('objectifs','◎','Objectifs') ],
      navCreators: [ this.navItem('roster','◵','Roster'), this.navItem('engagement','✦','Engagement'), this.navItem('pricing','€','Pricing'), this.navItem('briefs','✎','Briefs'), this.navItem('todo','☑','À faire'), this.navItem('documents','▤','Documents'), this.navItem('mediakit','△','Media kit') ],
      navAgence: [ this.navItem('contacts','☎','Contacts'), this.navItem('planning','◷','Planning'), this.navItem('contrats','▤','Contrats'), this.navItem('facturation','⊞','Facturation'), this.navItem('checklist','▣','Checklist'), this.navItem('acces','⚷','Accès') ],
      navOutils: [ this.navItem('prospection','⌖','Prospection'), this.navItem('alertes','⚠','Alertes'), this.navItem('idees','◆','Idées'), this.navItem('debrief','⟲','Debrief'), this.navItem('templates','▦','Templates') ],
      secApercuOpen:!(this.state.secClosed&&this.state.secClosed.apercu), secCreateursOpen:!(this.state.secClosed&&this.state.secClosed.creators), secAgenceOpen:!(this.state.secClosed&&this.state.secClosed.agence), secOutilsOpen:!(this.state.secClosed&&this.state.secClosed.outils),
      chevApercu:(this.state.secClosed&&this.state.secClosed.apercu)?'▸':'▾', chevCreateurs:(this.state.secClosed&&this.state.secClosed.creators)?'▸':'▾', chevAgence:(this.state.secClosed&&this.state.secClosed.agence)?'▸':'▾', chevOutils:(this.state.secClosed&&this.state.secClosed.outils)?'▸':'▾',
      toggleSecApercu:()=>this.setState(s=>({secClosed:Object.assign({},s.secClosed,{apercu:!(s.secClosed&&s.secClosed.apercu)})})), toggleSecCreateurs:()=>this.setState(s=>({secClosed:Object.assign({},s.secClosed,{creators:!(s.secClosed&&s.secClosed.creators)})})), toggleSecAgence:()=>this.setState(s=>({secClosed:Object.assign({},s.secClosed,{agence:!(s.secClosed&&s.secClosed.agence)})})), toggleSecOutils:()=>this.setState(s=>({secClosed:Object.assign({},s.secClosed,{outils:!(s.secClosed&&s.secClosed.outils)})})),
      portalNav: [ this.pNavItem('accueil','▦','Accueil'), this.pNavItem('messages','✉','Messages'), this.pNavItem('briefs','✎','Briefs'), this.pNavItem('todo','☑','To-do'), this.pNavItem('idees','◆','Idées'), this.pNavItem('planning','◷','Planning'), this.pNavItem('stats','✦','Stats'), this.pNavItem('documents','▤','Documents'), this.pNavItem('profil','◎','Profil') ],
      vApercu:this.state.view==='apercu', vRoster:this.state.view==='roster', vEngagement:this.state.view==='engagement',
      vPricing:this.state.view==='pricing', vBriefs:this.state.view==='briefs', vTodo:this.state.view==='todo',
      vFacturation:this.state.view==='facturation', vObjectifs:this.state.view==='objectifs', vContacts:this.state.view==='contacts',
      vPlanning:this.state.view==='planning', vProspection:this.state.view==='prospection',
      vModule: !!this.modules[this.state.view] && this.state.view!=='idees' && this.state.view!=='checklist' && this.state.view!=='debrief',
      vDebrief:this.state.view==='debrief', debriefList, debriefOpenObj, debriefDetailOpen, debriefListMode:!debriefDetailOpen, closeDebrief,
      showDebriefForm:!!this.state.showDebriefForm, openDebriefForm:()=>this.setState({showDebriefForm:true, debriefOpen:null}), closeDebriefForm:()=>this.setState({showDebriefForm:false}),
      ndBrandV:this.state.ndBrand||'', onNdBrand:(e)=>{const v=e.target.value;this.setState({ndBrand:v});},
      ndPeriodV:this.state.ndPeriod||'', onNdPeriod:(e)=>{const v=e.target.value;this.setState({ndPeriod:v});},
      ndDelivV:this.state.ndDeliv||'', onNdDeliv:(e)=>{const v=e.target.value;this.setState({ndDeliv:v});},
      ndBudgetV:this.state.ndBudget||'', onNdBudget:(e)=>{const v=e.target.value;this.setState({ndBudget:v});},
      ndRevenueV:this.state.ndRevenue||'', onNdRevenue:(e)=>{const v=e.target.value;this.setState({ndRevenue:v});},
      ndSummaryV:this.state.ndSummary||'', onNdSummary:(e)=>{const v=e.target.value;this.setState({ndSummary:v});},
      ndCreatorChips: this.rosterRaw.map((c,i)=>({c,i})).filter(x=>!(this.state.deletedRoster||{})[x.i]).map(({c,i})=>({ name:c.name.split(' ')[0], style:'padding:7px 12px;border-radius:18px;font:600 9px \'Inter\',sans-serif;cursor:pointer;'+(((this.state.ndCreator==null?0:this.state.ndCreator))===i?'background:var(--text);color:var(--bg);':'background:var(--rowhover);color:var(--muted);'), pick:(()=>{const k=i;return ()=>this.setState({ndCreator:k});})() })),
      addDebrief:()=>{ const brand=(this.state.ndBrand||'').trim(); if(!brand){ toast('Indique la marque / campagne'); return; } const ci=this.state.ndCreator==null?0:this.state.ndCreator; const c=this.rosterRaw[ci]||this.rosterRaw[0]; const _n=(s)=>{ const x=Number(String(s||'').replace(/[^0-9.,]/g,'').replace(',','.'))||0; return x; }; const bud=_n(this.state.ndBudget), rev=_n(this.state.ndRevenue); const roi=bud>0?((rev/bud).toFixed(1).replace('.',',')+'×'):'—'; const fmt=(n)=>String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,' ')+' €'; const deb={ brand, creator:c?c.name:'', period:(this.state.ndPeriod||'').trim()||'—', deliverables:(this.state.ndDeliv||'').trim()||'—', budget:bud?fmt(bud):'—', revenue:rev?fmt(rev):'—', roi, tone:c?c.tone:'cyan', summary:(this.state.ndSummary||'').trim()||'—', kpis:[], highlights:[] }; this.setState(s=>({ debriefData:[deb].concat(_dbCommit(s)), showDebriefForm:false, ndBrand:'', ndPeriod:'', ndDeliv:'', ndBudget:'', ndRevenue:'', ndSummary:'', ndCreator:null })); toast('Debrief créé ✓'); },
      vChecklist: this.state.view==='checklist', checklistPhases, checklistPct, checklistProgress, checklistBar, resetChecklist, collabList, checklistInDeal, checklistList:!checklistInDeal, openCollabLabel, backToCollabs, addCollab,
      pAccueil:this.state.portalTab==='accueil', pBriefs:this.state.portalTab==='briefs', pPlanning:this.state.portalTab==='planning', pStats:this.state.portalTab==='stats', pProfil:this.state.portalTab==='profil',
      goPStats:()=>this.setState({portalTab:'stats'}), goPBriefs:()=>this.setState({portalTab:'briefs'}), goPPlanning:()=>this.setState({portalTab:'planning'}), goPProfil:()=>this.setState({portalTab:'profil'}), goPDocuments:()=>this.setState({portalTab:'documents'}),
      portalBottomNav,
      goRoster, goFacturation, goObjectifs, goContacts, goPlanning, goBriefs, goTodo, goProspection, goEngagement, goRosterUgc,
      topCreators, pipeline, roster, rosterTabs, rosterCount, engagement, invoices, contacts, contactsViewTabs, contactTagTabs, contactsGrid, contactsList, contactsCount:String(this._contacts().length),
      dealHeroValue: _fmtE(_eur(_bigDeal.amount)), dealHeroParty: _bigDeal.party||'—',
      hasRelance: !!_firstRetard,
      relanceTitle: _firstRetard ? ('Relancer '+String(_firstRetard.party||'').split(' × ')[0]) : 'Aucune relance',
      relanceSub: _firstRetard ? ('Facture en retard · '+_firstRetard.date) : 'Tout est à jour',
      growthValue: (growthPctN>=0?'+':'')+growthPctN+'%', growthUp: growthPctN>=0,
      prospCount: String(_prospCount), prospLabel: _prospCount+' marque'+(_prospCount>1?'s':'')+' à relancer', objCreators, pricing, briefs, briefPreview, rdvPreview, todos, todoPreview: todos.slice(0,6), todoFilterTabs, todoCreatorTabs, todoDetailOpen, todoDetail, closeTodoDetail, prospectCols, mod, vTemplatesMsg, msgChannelTabs, msgTemplatesList,
      rosterEmpty: roster.length===0, todosEmpty: todos.length===0, invoicesEmpty: invoices.length===0, contactsEmpty: contacts.length===0, prospectsEmpty: prospectCols.reduce((a,c)=>a+(c.count||0),0)===0,
      icEdit:this._ic('_edit'), icDel:this._ic('_del'), icEye:this._ic('_eye'), icShare:this._ic('_share'), icExt:this._ic('_ext'), icDownload:this._ic('_download'), icCopy:this._ic('_copy'), icRefresh:this._ic('_refresh',16), icBell:this._ic('_bell',16), icPlus:this._ic('_plus'), icSearch:this._ic('_search',15), icSun:this._ic('_sun',16), icMoon:this._ic('_moon',16),
      me, myAgenda, myTodos, myBriefs, loginCreators, meInfoFields, meSave:()=>{ try{ this._persistNow(); }catch(_){} try{ this._saveCreatorInfo(_meKey); }catch(_){} toast('Informations enregistrées ✓'); }, briefFilterTabs, pTodoFilterTabs,
      myStatsHasDetail, myStatsNone:!myStatsHasDetail, myStatsRows, myStatsHistoryMonths, myStatsHasHistory, myInvoices, myInvoicesHas,
      myFollInputs, myFollTotalLabel, myFollDeltaLabel, myFollHasHistory, myFollHistory, saveFollowers, myStatsPlatform:(_myStats?_myStats.platformLabel:''), myStatsFormula:(_myStats?_myStats.formula:''), myStatsDetail:(_myStats?_myStats.detail:''), myStatsEr:(_myStats?_myStats.er:''), myStatsVerdict:(_myStats?_myStats.verdict:''), myStatsSavedAt:(_myStats?('Mis à jour le '+_myStats.savedAt):''),
      agencyAvatarStyle, agencyInner: agencyPhoto?'':'MG', onPhotoAgency: mkPhoto('agency'), onPhotoMe: mkPhoto('cre:'+(cr?cr.name:'')),
      cloudOn: !!this._authReal, cloudLabel: this._authReal?'Base connectée':'Mode local',
      cloudDotStyle: 'width:7px;height:7px;border-radius:50%;flex-shrink:0;background:'+(this._authReal?'var(--signal)':'var(--faint)')+';',
      cloudTextStyle: "font:600 9px 'Inter',sans-serif;letter-spacing:.3px;color:"+(this._authReal?'var(--signaltext)':'var(--faint)'),
      weekdays: ['LUN','MAR','MER','JEU','VEN','SAM','DIM'],
      calendarCells: cells, eventTypes,
      planDayOpen, planDayLabel, planDayEvents, planDayHasEvents, planDayEmpty:planDayOpen&&!planDayHasEvents, closePlanDay, addEventForDay,
      showEventForm: this.state.showEventForm,
      openEventForm: () => this.setState({ showEventForm:true, editingEvent:null, neWho:[], ne:{ day:_todayDay, date:_todayStr, time:'', title:'', type:'call' } }),
      closeEventForm: () => this.setState({ showEventForm:false, editingEvent:null }),
      eventFormTitle: this.state.editingEvent ? 'Modifier l’événement' : 'Nouvel événement',
      eventFormCta: this.state.editingEvent ? 'ENREGISTRER' : 'AJOUTER',
      neTitle: this.state.ne.title, neDay: String(this.state.ne.day), neTime: this.state.ne.time,
      neDate: this.state.ne.date || (String(_calY)+'-'+String(_calM+1).padStart(2,'0')+'-'+String(this.state.ne.day||_todayDay).padStart(2,'0')),
      onNEDate: (e)=>{ const v=e.target.value; const d=v?(Number(v.slice(8,10))||26):26; this.setState(s=>({ne:Object.assign({},s.ne,{date:v, day:d})})); },
      onNETitle: (e)=>{ const v=e.target.value; this.setState(s=>({ne:Object.assign({},s.ne,{title:v})})); },
      onNEDay: (e)=>{ const v=e.target.value; this.setState(s=>({ne:Object.assign({},s.ne,{day:v})})); },
      onNETime: (e)=>{ const v=e.target.value; this.setState(s=>({ne:Object.assign({},s.ne,{time:v})})); },
      neWhoChips: this.rosterRaw.filter((_,i)=>!(this.state.deletedRoster||{})[i]).map(c=>{ const sel=(this.state.neWho||[]).indexOf(c.name)>=0; return { name:c.name.split(' ')[0], full:c.name, style:'display:flex;align-items:center;gap:6px;padding:7px 13px;border-radius:20px;font:600 10px \'Inter\',sans-serif;cursor:pointer;'+(sel?'background:var(--text);color:var(--bg);':'background:var(--surface);border:1px solid var(--hair);color:var(--muted);'), check:sel?'✓ ':'', pick:(()=>{const nm=c.name;return ()=>this.setState(s=>{ const w=(s.neWho||[]).slice(); const j=w.indexOf(nm); if(j>=0) w.splice(j,1); else w.push(nm); return {neWho:w}; });})() }; }),
      neWhoLabel: (this.state.neWho&&this.state.neWho.length) ? (this.state.neWho.length+' créateur'+(this.state.neWho.length>1?'s':'')+' concerné'+(this.state.neWho.length>1?'s':'')) : 'Aucun créateur sélectionné (événement agence)',
      addEvent: () => { const ne=this.state.ne; if(!ne.title) return; const who=((this.state.neWho||[]).join(', '))||null; const ed=this.state.editingEvent; const _dt=ne.date||null; const _d=_dt?Number(String(_dt).split('-')[2]):(Number(ne.day)||_todayDay);
        if(ed){ const patch={ day:_d||ed.day, date:_dt||ed.date||null, time:ne.time||'—', title:ne.title, type:ne.type, who:who }; this.setState(s=>({ events:(s.events||this.eventsRaw).map(x=> (x===ed||(ed&&ed.id&&x&&x.id===ed.id))?Object.assign({},x,patch):x), showEventForm:false, editingEvent:null, neWho:[], ne:{day:ne.day,date:ne.date,time:'',title:'',type:'call'} })); if(this._eventsTable && ed.id) this._dbUpdate('events', ed.id, patch); toast('Événement modifié ✓'); return; }
        const item={day:_d||_todayDay, date:_dt, time:ne.time||'—', title:ne.title, type:ne.type, who:who}; const cur=this.state.events||this.eventsRaw; this.setState({ events:[...cur, item], showEventForm:false, ne:{day:ne.day,date:ne.date,time:'',title:'',type:'call'}, neWho:[] }); if(this._eventsTable){ const _row={day:item.day,date:item.date,time:item.time,title:item.title,type:item.type,who:item.who,sort_order:cur.length}; this._dbInsert('events',_row).then(r=>{ if(r&&r.id){ if(item._del){ this._dbDelete('events', r.id); } else { item.id=r.id; this.setState({}); } } else { const _r2=Object.assign({},_row); delete _r2.date; this._dbInsert('events',_r2).then(r2=>{ if(r2&&r2.id){ if(item._del){ this._dbDelete('events', r2.id); } else { item.id=r2.id; this.setState({}); } } }); } }); } },
      addEventMe: () => { const ne=this.state.ne; if(!ne.title) return; const crr=this._meCreator(); const cr2=crr?crr.name:null; const _dt=ne.date||null; const day=_dt?Number(String(_dt).split('-')[2]):(Number(ne.day)||_todayDay); const ed=this.state.editingEvent;
        if(ed){ const patch={ day:day||ed.day, date:_dt||ed.date||null, time:ne.time||'—', title:ne.title, type:ne.type }; this.setState(s=>({ events:(s.events||this.eventsRaw).map(x=> (x===ed||(ed&&ed.id&&x&&x.id===ed.id))?Object.assign({},x,patch):x), showEventForm:false, editingEvent:null, ne:{day:ne.day,date:ne.date,time:'',title:'',type:'call'} })); if(this._eventsTable && ed.id) this._dbUpdate('events', ed.id, patch); toast('Événement modifié ✓'); return; }
        const item={day:day||_todayDay, date:_dt, time:ne.time||'—', title:ne.title, type:ne.type, who:cr2}; const cur=this.state.events||this.eventsRaw; this.setState({ events:[...cur, item], showEventForm:false, ne:{day:ne.day,date:ne.date,time:'',title:'',type:'call'} }); if(this._eventsTable){ const _row={day:item.day,date:item.date,time:item.time,title:item.title,type:item.type,who:item.who,sort_order:cur.length}; this._dbInsert('events',_row).then(r=>{ if(r&&r.id){ if(item._del){ this._dbDelete('events', r.id); } else { item.id=r.id; this.setState({}); } } else { const _r2=Object.assign({},_row); delete _r2.date; this._dbInsert('events',_r2).then(r2=>{ if(r2&&r2.id){ if(item._del){ this._dbDelete('events', r2.id); } else { item.id=r2.id; this.setState({}); } } }); } }); } },
      incomeDots: this.dots(126, _incomeFill, sig, empty, 11),
      paidDots: this.dots(126, Math.max(8,Math.min(100,Math.round(finReverse/(finEncaisse||1)*100))), sig, empty, 11),
      periodLabel: ({hebdo:'HEBDO',mensuel:'MENSUEL',trimestre:'TRIMESTRE',annuel:'ANNUEL'})[this.state.caPeriod||'mensuel'],
      incomeValue: _fmtE(finEncaisse*_perF[_per]),
      paidValue: _fmtE(finReverse*_perF[_per]),
      objMonthlyPct: finObjPct+'%', margePct: String(finCommission),
      objCaPct:objCaPct+'%', objCaSub, objCaBarStyle, objDealsSigned, objDealsSub, objDealsBarStyle, objMargeVal, objMargeSub, objMargeBarStyle,
      commissionReport, commissionTotal, commissionCaTotal, commissionTopName, commissionReportEmpty,
      caHeadline: _fmtE(finEncaisse+finAttente), caCumul: _fmtE(finTotalFacture),
      finAttenteValue: _fmtE(finAttente), finRetardValue: _fmtE(finRetard), finEncaisseValue: _fmtE(finEncaisse),
      finAttenteCount: String(_cntInv('attente'))+' facture'+(_cntInv('attente')>1?'s':''),
      provTvaColl:_fmtE(fTvaColl), provTvaDed:'− '+_fmtE(fTvaDed), provTvaNet:_fmtE(fTvaNet), provUrssaf:_fmtE(fUrssaf), provIS:_fmtE(fIS), provTotal:_fmtE(fProvTotal),
      caMenuIncome: this.state.caMenu==='income', caMenuPaid: this.state.caMenu==='paid',
      toggleIncomeMenu:()=>this.setState(s=>({caMenu:s.caMenu==='income'?null:'income'})),
      togglePaidMenu:()=>this.setState(s=>({caMenu:s.caMenu==='paid'?null:'paid'})),
      periodOptions: [['hebdo','Hebdo'],['mensuel','Mensuel'],['trimestre','Trimestre'],['annuel','Annuel']].map(p=>({ label:p[1], active:(this.state.caPeriod||'mensuel')===p[0], rowStyle:"display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:9px;cursor:pointer;font:600 11px 'Inter',sans-serif;color:"+((this.state.caPeriod||'mensuel')===p[0]?'var(--text)':'var(--muted)'), check:(this.state.caPeriod||'mensuel')===p[0]?'✓':'', pick:(()=>{const k=p[0];return ()=>this.setState({caPeriod:k, caMenu:null});})() })),
      countdownDots: this.dots(18, 66, this.toneHex('amber',dark), empty),
      margeBars: this.bars([40,55,48,70,62,80,72,90,84,68,100], sig),
      growthBars: this.bars([30,45,38,60,52,70,64,82,76,58,90,84,72,100], dark ? '#70FC8E' : '#FFFFFF', 4).map((b,i,a)=> i===a.length-2 ? {style:b.style.replace(/background:[^;]+;/, 'background:'+sig+';')} : b),
      candleBars: this.bars([50,72,40,88,60,95,46,78,64], sig, 5),
    };
  }
}
