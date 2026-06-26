
class Component extends DCLogic {
  state = { theme:'light', space:'agency', view:'apercu', creatorId:null, portalTab:'accueil', showEventForm:false, ne:{day:26,time:'',title:'',type:'call'}, events:null, doneSet:null, openContact:null, objForm:false, no:{name:'',target:'',pct:''}, engCreator:0, engPlatform:'instagram', engBase:'', engM0:'', engM1:'', engM2:'', priceCreator:0, priceFormat:'reel', ctType:'marque', ctCreator:0, ctBrand:'Sephora', ctValue:'32 000 €', ctCommission:'20', ctDuration:'12 mois', ctDeliverables:'3 posts · 1 reel', ctExcl:true, photos:{}, copied:null, rosterDetail:null, openThread:null, draft:'', threadMsgs:null };

  rosterRaw = [
    {name:'CAMILLE ORSINI', handle:'@camille.o', niche:'Mode', plat:'Instagram', followers:'540K', reach:'2,1 M', er:'4,8%', ca:'62 400 €', status:'live', tone:'signal', trend:6},
    {name:'THÉO RIVIÈRE', handle:'@theogg', niche:'Gaming', plat:'Twitch', followers:'1,2M', reach:'3,4 M', er:'6,1%', ca:'54 100 €', status:'actif', tone:'indigo', trend:3},
    {name:'LÉNA MARCHAND', handle:'@lena.mrc', niche:'Lifestyle', plat:'Instagram', followers:'480K', reach:'1,6 M', er:'5,2%', ca:'38 900 €', status:'actif', tone:'cyan', trend:-2},
    {name:'INÈS KABORÉ', handle:'@ines.k', niche:'Beauté', plat:'TikTok', followers:'320K', reach:'1,2 M', er:'7,3%', ca:'29 700 €', status:'actif', tone:'indigo', trend:5},
    {name:'MALO FONTAINE', handle:'@malo.fit', niche:'Fitness', plat:'YouTube', followers:'210K', reach:'780 K', er:'5,9%', ca:'21 300 €', status:'pause', tone:'cyan', trend:1},
    {name:'JADE NGUYEN', handle:'@jade.eats', niche:'Food · UGC', plat:'UGC', followers:'95K', reach:'410 K', er:'8,1%', ca:'12 800 €', status:'actif', tone:'signal', trend:7},
    {name:'SACHA DELAUNAY', handle:'@sacha.tech', niche:'Tech · UGC', plat:'UGC', followers:'64K', reach:'280 K', er:'9,4%', ca:'8 600 €', status:'actif', tone:'indigo', trend:4},
    {name:'NOÉ BERGER', handle:'@noe.travels', niche:'Voyage', plat:'Instagram', followers:'175K', reach:'640 K', er:'4,4%', ca:'15 200 €', status:'pause', tone:'cyan', trend:-1},
  ];
  pipeRaw = [
    {label:'Sephora × CAMILLE', amount:'32k', tone:'indigo'},
    {label:'Logitech × THÉO', amount:'27k', tone:'signal'},
    {label:'Nike × MALO', amount:'24k', tone:'cyan'},
  ];
  todoRaw = [
    {text:'Relancer RP Sephora (CAMILLE)', tag:'AGENCE', due:'Auj.', creator:null},
    {text:'Valider contrat Nike (MALO)', tag:'AGENCE', due:'Auj.', creator:null},
    {text:'Valider brief créatif Sephora', tag:'CAMILLE', due:'Auj.', creator:'CAMILLE ORSINI'},
    {text:'Envoyer factures L\u2019Oréal', tag:'AGENCE', due:'27/06', creator:null},
    {text:'Choisir tenues shoot Galeries', tag:'CAMILLE', due:'Auj.', creator:'CAMILLE ORSINI'},
    {text:'Stats reel Dior à transmettre', tag:'CAMILLE', due:'28/06', creator:'CAMILLE ORSINI'},
  ];
  ideasRaw = [
    {text:'GRWM été × Sephora — format reel', creator:'CAMILLE ORSINI', status:'Validée', source:'agency'},
    {text:'Série coulisses tournage en stories', creator:'CAMILLE ORSINI', status:'En cours', source:'agency'},
    {text:'Setup gaming 2026 — vidéo longue', creator:'THÉO RIVIÈRE', status:'À explorer', source:'agency'},
    {text:'Test produit en live + code promo', creator:'INÈS KABORÉ', status:'À explorer', source:'creator'},
    {text:'Collab croisée gaming × lifestyle', creator:null, status:'À explorer', source:'agency'}
  ];
  briefRaw = [
    {brand:'Sephora — Collection été', creator:'CAMILLE ORSINI', deliverables:'3 posts · 1 reel', due:'02/07', status:'valider', tone:'indigo', who:'CAMILLE ORSINI', consignes:'Mettre en avant la collection été : 3 posts feed (looks complets) + 1 reel tuto make-up. Ton lumineux et naturel, mention @sephorafrance. Validation des visuels 48h avant publication.', budget:'2 200 €', objectif:'Lancement collection · trafic boutique'},
    {brand:'Dior Beauty — Gifting', creator:'CAMILLE ORSINI', deliverables:'2 reels', due:'05/07', status:'cours', tone:'cyan', who:'CAMILLE ORSINI', consignes:'2 reels gifting : déballage produit Dior, première impression spontanée. Mention @diorbeauty + lien en bio. Lumière naturelle.', budget:'1 800 €', objectif:'Notoriété gamme parfum'},
    {brand:'Logitech — Setup', creator:'THÉO RIVIÈRE', deliverables:'1 vidéo · 3 stories', due:'08/07', status:'cours', tone:'signal', who:'THÉO RIVIÈRE', consignes:'1 vidéo YouTube setup gaming (~10 min) + 3 stories teasing. Intégration naturelle du clavier Logitech. Code promo THEO15.', budget:'2 600 €', objectif:'Ventes · conversion code promo'},
    {brand:'Nike — Run club', creator:'MALO FONTAINE', deliverables:'2 reels · 1 post', due:'12/07', status:'attente', tone:'indigo', who:'MALO FONTAINE', consignes:'2 reels running + 1 post engagement autour du Run Club Nike. Énergie, dépassement de soi. Tag @nike + #nikerunclub.', budget:'2 000 €', objectif:'Communauté · inscriptions Run Club'},
  ];
  invoiceRaw = [
    {ref:'2026-084', party:'Sephora × CAMILLE', amount:'32 000 €', date:'02/07', status:'attente'},
    {ref:'2026-083', party:'Logitech × THÉO', amount:'27 500 €', date:'18/06', status:'payee'},
    {ref:'2026-082', party:'Galeries Lafayette × LÉNA', amount:'14 500 €', date:'15/06', status:'payee'},
    {ref:'2026-081', party:"L'Oréal × INÈS", amount:'18 000 €', date:'30/05', status:'retard'},
    {ref:'2026-080', party:'Dior Beauty × CAMILLE', amount:'15 900 €', date:'28/06', status:'attente'},
    {ref:'2026-079', party:'Nike × MALO', amount:'24 000 €', date:'—', status:'brouillon'},
  ];
  contactRaw = [
    {brand:'Sephora', person:'Camille Roux', role:'Responsable influence', tone:'indigo', tag:'Actif', email:'c.roux@sephora.fr', phone:'+33 6 12 44 88 02', last:'18 juin 2026', deals:'3 deals · 62 000 €'},
    {brand:'Nike', person:'Julien Mercier', role:'Brand partnerships', tone:'signal', tag:'Deal en cours', email:'j.mercier@nike.com', phone:'+33 6 78 21 09 55', last:'24 juin 2026', deals:'1 deal · 24 000 €'},
    {brand:"L'Oréal", person:'Aïcha Benali', role:'RP digitale', tone:'cyan', tag:'À relancer', email:'a.benali@loreal.com', phone:'+33 6 33 70 12 41', last:'30 mai 2026', deals:'1 deal · 18 000 €'},
    {brand:'Logitech', person:'Tom Vasseur', role:'Marketing manager', tone:'indigo', tag:'Actif', email:'tom.v@logitech.com', phone:'+33 6 90 55 18 73', last:'12 juin 2026', deals:'2 deals · 55 000 €'},
    {brand:'Dior Beauty', person:'Soraya Lefort', role:'Influence lead', tone:'signal', tag:'Gifting', email:'s.lefort@dior.com', phone:'+33 6 24 61 90 30', last:'21 juin 2026', deals:'1 deal · 15 900 €'},
    {brand:'HelloFresh', person:'Marc Petit', role:'Growth', tone:'cyan', tag:'Prospection', email:'m.petit@hellofresh.fr', phone:'+33 6 41 08 27 66', last:'jamais', deals:'prospection'},
  ];
  objRaw = [
    {name:'CAMILLE ORSINI', pct:104, ca:'62 400 €', target:'60 000 €', tone:'signal'},
    {name:'THÉO RIVIÈRE', pct:90, ca:'54 100 €', target:'60 000 €', tone:'indigo'},
    {name:'LÉNA MARCHAND', pct:78, ca:'38 900 €', target:'50 000 €', tone:'cyan'},
    {name:'INÈS KABORÉ', pct:99, ca:'29 700 €', target:'30 000 €', tone:'indigo'},
  ];
  pricingRaw = [
    {format:'Post Instagram', base:'4 500 €', excl:'+ 30%'},
    {format:'Reel', base:'6 800 €', excl:'+ 35%'},
    {format:'Story (x3)', base:'2 400 €', excl:'+ 20%'},
    {format:'UGC vidéo', base:'1 800 €', excl:'+ 25%'},
    {format:'YouTube intégration', base:'9 500 €', excl:'+ 40%'},
    {format:'Pack mensuel', base:'18 000 €', excl:'sur devis'},
  ];
  prospectRaw = [
    {brand:'HelloFresh', contact:'Marc Petit', value:'~6 500 €', stage:'Prospection', tone:'cyan'},
    {brand:'Asphalte', contact:'RP — à trouver', value:'~9 000 €', stage:'Prospection', tone:'cyan'},
    {brand:"L'Oréal", contact:'Aïcha Benali', value:'18 000 €', stage:'Contact', tone:'indigo'},
    {brand:'Nike', contact:'Julien Mercier', value:'24 000 €', stage:'Négociation', tone:'indigo'},
    {brand:'Sephora', contact:'Camille Roux', value:'32 000 €', stage:'Négociation', tone:'signal'},
    {brand:'Logitech', contact:'Tom Vasseur', value:'27 500 €', stage:'Signé', tone:'signal'},
  ];
  eventsRaw = [
    {day:26, time:'10:00', title:'Shoot LÉNA × Galeries Lafayette', type:'shoot', who:'LÉNA MARCHAND'},
    {day:26, time:'14:30', title:'Call Nike — négo MALO', type:'call', who:'MALO FONTAINE'},
    {day:26, time:'17:00', title:'Live THÉO — Logitech', type:'collab', who:'THÉO RIVIÈRE'},
    {day:27, time:'11:00', title:'Deadline brief Sephora', type:'deadline', who:'CAMILLE ORSINI'},
    {day:30, time:'14:00', title:'Tournage reels Dior', type:'shoot', who:'CAMILLE ORSINI'},
    {day:18, time:'09:30', title:'Réunion équipe agence', type:'reunion', who:null},
    {day:23, time:'15:00', title:'Call découverte HelloFresh', type:'call', who:null},
    {day:12, time:'16:00', title:'Collab JADE × Sephora', type:'collab', who:'JADE NGUYEN'},
  ];
  msgsRaw = {
    0:[{from:'agency',text:'Salut Camille ! On a reçu les concepts Sephora.'},{from:'agency',text:'On valide les 3 idées de reels ?'}],
    1:[{from:'me',text:'Reçu, je m\'en occupe ce soir.'},{from:'agency',text:'Parfait, merci 🙌'}],
    2:[{from:'agency',text:'Réunion créateurs vendredi 15h en visio. Présence souhaitée !'}],
    3:[{from:'me',text:'Salut ! Le sponso Logitech est prêt, je poste quand ?'}],
    4:[{from:'me',text:'J\'ai envoyé les rushs UGC Sephora ✅'},{from:'agency',text:'Nickel, on regarde ça.'}],
    5:[{from:'me',text:'Question sur le brief L\'Oréal : combien de stories ?'}],
  };
  eventTypeMap = { call:{label:'Call', tone:'indigo'}, reunion:{label:'Réunion', tone:'cyan'}, collab:{label:'Collab', tone:'signal'}, shoot:{label:'Shoot', tone:'indigo'}, event:{label:'Event', tone:'signal'}, voyage:{label:'Voyage', tone:'cyan'}, deadline:{label:'Deadline', tone:'cyan'} };

  docsRaw = { 0:[{name:'Brief Sephora — Collection été.pdf', type:'brief', date:'24/06/2026', size:'248 Ko'},{name:'Media kit Camille 2026.pdf', type:'mediakit', date:'01/06/2026', size:'3,2 Mo'},{name:'Facture #2026-084.pdf', type:'facture', date:'02/07/2026', size:'96 Ko'}], 1:[{name:'Media kit Théo 2026.pdf', type:'mediakit', date:'12/06/2026', size:'4,1 Mo'}], 3:[{name:'Brief Sephora UGC.pdf', type:'brief', date:'20/06/2026', size:'180 Ko'}] };
  bankAccounts = [ {label:'Compte courant — Qonto', bank:'Qonto', iban:'FR76 1695 8000 0112 3456 7890 219', bic:'QNTOFRP1XXX'}, {label:'Compte pro — BNP Paribas', bank:'BNP Paribas', iban:'FR76 3000 4002 8800 0123 4567 891', bic:'BNPAFRPPXXX'}, {label:'Compte séquestre', bank:'Crédit Mutuel', iban:'FR76 1027 8060 0100 0204 5670 155', bic:'CMCIFR2AXXX'} ];
  rosterInfoRaw = { 0:{ville:'Lyon, France', phone:'+33 6 12 48 90 33', email:'camille.orsini@gmail.com', address:'14 rue de la République, 69002 Lyon', siren:'901 234 567', birth:'12/03/1998', exclu:true, commission:'20%'}, 1:{ville:'Paris, France', phone:'+33 6 70 11 22 84', email:'theo.riviere@gmail.com', address:'8 rue Oberkampf, 75011 Paris', siren:'880 556 102', birth:'24/09/1996', exclu:true, commission:'15%'}, 2:{ville:'Bordeaux, France', phone:'+33 6 22 41 09 57', email:'lena.marchand@gmail.com', address:"3 cours de l'Intendance, 33000 Bordeaux", siren:'—', birth:'05/01/2000', exclu:false, commission:'18%'} };

  mediaKitRaw = {
    0:{ bio:'Camille — voix mode & beauté de référence à Lyon. Contenus éditoriaux léchés, audience féminine ultra-engagée et fort taux de conversion sur le luxe accessible.', age:'25–34 ans', agePct:'61%', gender:'Femmes 78% · Hommes 22%', geo:['Paris','Lyon','Genève'], brands:['Sephora','Dior Beauty','Sézane','Galeries Lafayette'], formats:[{label:'Reel Instagram',price:'2 200 €'},{label:'Story (×3)',price:'850 €'},{label:'Post feed',price:'1 500 €'},{label:'Pack campagne',price:'5 500 €'}] },
    1:{ bio:'Théo — créateur gaming & tech, communauté Twitch fidèle et hyper réactive. Idéal pour lancements produit, setups et placements longue durée.', age:'18–24 ans', agePct:'54%', gender:'Hommes 71% · Femmes 29%', geo:['Paris','Lille','Montréal'], brands:['Logitech','Nvidia','Red Bull'], formats:[{label:'Live sponsorisé',price:'3 000 €'},{label:'Vidéo YouTube',price:'2 600 €'},{label:'Short',price:'900 €'},{label:'Pack stream',price:'7 000 €'}] },
    3:{ bio:'Inès — beauté & skincare sur TikTok, formats courts viraux et démonstrations produit à très fort taux d’engagement.', age:'18–24 ans', agePct:'63%', gender:'Femmes 84% · Hommes 16%', geo:['Paris','Marseille','Abidjan'], brands:['L’Oréal','Garnier','The Ordinary'], formats:[{label:'Vidéo TikTok',price:'1 400 €'},{label:'UGC',price:'700 €'},{label:'Story',price:'500 €'},{label:'Pack 3 vidéos',price:'3 600 €'}] },
    5:{ bio:'Jade — food & UGC, contenus authentiques pensés pour la performance paid. Excellente conteuse produit.', age:'25–34 ans', agePct:'58%', gender:'Femmes 66% · Hommes 34%', geo:['Lyon','Paris','Bruxelles'], brands:['HelloFresh','Picard','Maille'], formats:[{label:'Vidéo UGC',price:'650 €'},{label:'Pack 3 UGC',price:'1 700 €'},{label:'Reel',price:'1 100 €'},{label:'Droits paid 6 mois',price:'+40%'}] }
  };

  toneHex(tone, dark){
    return ({ signal:'#70FC8E', indigo: dark?'#5B82F8':'#3765F6', cyan: dark?'#9AA6B4':'#8590A1', amber: dark?'#5B82F8':'#3765F6' })[tone] || (dark?'#6E6E6E':'#8A8A85');
  }
  initials(name){ return name.split(' ').map(w => w[0]).slice(0,2).join(''); }
  dots(n, pct, fill, empty){ const o=[]; for(let i=0;i<n;i++){ o.push({style:'width:8px;height:8px;border-radius:50%;background:'+(((i*37+11)%100)<pct?fill:empty)+';'}); } return o; }
  bars(h, color, w){ return h.map(v => ({ style:'flex:1;min-width:'+(w||3)+'px;height:'+v+'%;border-radius:3px;background:'+color+';' })); }
  avatarStyle(tone, dark, s){ const bg=this.toneHex(tone,dark); const fg=tone==='signal'?'#10141A':'#FFFFFF'; s=s||34; return 'width:'+s+'px;height:'+s+'px;border-radius:'+(s>40?14:9)+'px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font:700 '+(s>44?20:(s>40?15:11))+'px \'Inter\',sans-serif;background:'+bg+';color:'+fg+';'; }
  componentDidMount(){
    try {
      if (window.supabase && window.__SB_URL__ && window.__SB_KEY__) {
        this._sb = window.supabase.createClient(window.__SB_URL__, window.__SB_KEY__);
        this._loadCreators();
      }
    } catch(e){ console.warn('[supabase] init failed', e); }
  }
  _mapCreator(r){ return { id:r.id, name:r.name, handle:r.handle, niche:r.niche, plat:r.platform, followers:r.followers, reach:r.reach, er:r.er, ca:r.ca, status:r.status, tone:r.tone, trend:r.trend }; }
  async _loadCreators(){
    try {
      const { data, error } = await this._sb.from('creators').select('*').order('sort_order');
      if (error) { console.warn('[supabase] load creators:', error.message); return; }
      if (data && data.length) {
        this.rosterRaw = data.map(r=>this._mapCreator(r));
        this.rosterInfoRaw = {};
        data.forEach((r,i)=>{ this.rosterInfoRaw[i] = { ville:r.ville, phone:r.phone, email:r.email, address:r.address, siren:r.siren, birth:r.birth, exclu:!!r.exclu, commission:r.commission }; });
        this.setState({ deletedRoster:{}, creatorsLoaded:true });
      }
    } catch(e){ console.warn('[supabase] load creators failed', e); }
  }
  icon(name){
    const M={ apercu:['M3 12l9-8 9 8','M5 10v10h14V10'], objectifs:['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18','M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10','M12 12h.01'], roster:['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2','M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8','M22 21v-2a4 4 0 0 0-3-3.9','M16 3.1a4 4 0 0 1 0 7.8'], engagement:['M3 12h4l3 8 4-16 3 8h4'], pricing:['M17 7a6 6 0 1 0 0 10','M4 10h9','M4 14h9'], briefs:['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z','M14 2v6h6','M8 13h8','M8 17h5'], todo:['M9 11l3 3 8-8','M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'], documents:['M3 7a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'], mediakit:['M3 5h18v14H3z','M3 16l5-5 4 4 3-3 6 6','M8.5 9a1.5 1.5 0 1 0-.001-.001'], messages:['M4 5h16v14H4z','M4 7l8 6 8-6'], contacts:['M5 4h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2'], planning:['M4 6h16v15H4z','M4 10h16','M8 3v4','M16 3v4'], contrats:['M8 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6z','M14 3v6h6','M9 14h6','M9 17h4'], facturation:['M4 5h16v15l-3-2-3 2-3-2-3 2z','M8 9h8','M8 13h5'], checklist:['M9 6h11','M9 12h11','M9 18h11','M4 5.5l1 1 2-2','M4 11.5l1 1 2-2','M4 17.5l1 1 2-2'], prospection:['M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14','M21 21l-4-4'], alertes:['M12 3l9 17H3z','M12 9v5','M12 17h.01'], idees:['M9 18h6','M10 22h4','M12 2a7 7 0 0 0-4 12.6c.6.5 1 1.2 1 2.4h6c0-1.2.4-1.9 1-2.4A7 7 0 0 0 12 2'], debrief:['M3 12a9 9 0 1 0 2.6-6.3','M3 4v5h5'], templates:['M3 3h8v8H3z','M13 3h8v8h-8z','M13 13h8v8h-8z','M3 13h8v8H3z'], accueil:['M3 12l9-8 9 8','M5 10v10h14V10'], stats:['M4 20V4','M4 20h16','M8 20v-7','M13 20V8','M18 20v-4'], profil:['M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8','M5 21a7 7 0 0 1 14 0'] };
    const d=M[name]||['M5 12h14'];
    return React.createElement('svg',{width:17,height:17,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.8,strokeLinecap:'round',strokeLinejoin:'round',style:{display:'block'}}, d.map((p,i)=>React.createElement('path',{key:i,d:p})));
  }
  navItem(key, icon, label){ const active=this.state.view===key; const col=active?'var(--bg)':'var(--muted)'; const _bc={roster:this.rosterRaw.filter((_,i)=>!(this.state.deletedRoster||{})[i]).length, briefs:(this.state.briefItems||this.briefRaw).length, todo:(this.state.todoItems||this.todoRaw).length, messages:2, idees:(this.state.ideasData||this.ideasRaw).filter(x=>x&&x.source==='creator').length}; const _b=_bc[key]||0; return { icon:this.icon(key), label, active, hasBadge:_b>0, badge:String(_b), badgeStyle:'min-width:18px;height:17px;padding:0 5px;border-radius:9px;display:flex;align-items:center;justify-content:center;font:700 9px \'Inter\',sans-serif;'+(active?'background:var(--bg);color:var(--text);':'background:var(--rowhover);color:var(--muted);'), itemStyle:'display:flex;align-items:center;gap:12px;padding:10px 16px;border-radius:13px;cursor:pointer;margin-bottom:3px;'+(active?'background:var(--text);':''), iconStyle:"font:600 14px 'Inter',sans-serif;color:"+col, labelStyle:"flex:1;font:500 13px 'Inter',sans-serif;color:"+col, go:()=>this.setState({view:key, rosterDetail:null, mobileNav:false}) }; }
  pNavItem(key, icon, label){ const active=this.state.portalTab===key; const col=active?'var(--bg)':'var(--muted)'; return { icon:this.icon(key), label, itemStyle:'display:flex;align-items:center;gap:12px;padding:11px 16px;border-radius:13px;cursor:pointer;margin-bottom:3px;'+(active?'background:var(--text);':''), iconStyle:"font:600 14px 'Inter',sans-serif;color:"+col, labelStyle:"flex:1;font:500 13px 'Inter',sans-serif;color:"+col, go:()=>this.setState({portalTab:key}) }; }
  invStatus(s){ return ({ payee:{label:'PAYÉE',tone:'signal'}, attente:{label:'EN ATTENTE',tone:'indigo'}, retard:{label:'EN RETARD',tone:'indigo'}, brouillon:{label:'BROUILLON',tone:'cyan'} })[s] || {label:'BROUILLON',tone:'cyan'}; }
  briefStatus(s){ return ({ valider:{label:'À VALIDER',tone:'indigo'}, cours:{label:'EN COURS',tone:'cyan'}, attente:{label:'EN ATTENTE',tone:'signal'} })[s] || {label:'EN COURS',tone:'cyan'}; }
  chip(label, dark){ return "display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:20px;border:1px solid var(--hair);font:600 8px 'Inter',sans-serif;letter-spacing:.6px;color:var(--muted);white-space:nowrap;"; }

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
    const mobileNav = !!this.state.mobileNav;
    const navOpenCls = mobileNav ? ' nav-open' : '';
    const openMobileNav = () => this.setState({mobileNav:true});
    const closeMobileNav = () => this.setState({mobileNav:false});
    const _bbStyle = (key) => "flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:7px 2px;cursor:pointer;color:"+(this.state.view===key?'var(--text)':'var(--faint)')+";font:600 9px 'Inter',sans-serif";
    const _bbMk = (key,label,extra) => ({ icon:this.icon(key), iconTxt:'', label, style:_bbStyle(key), tap:()=>this.setState(Object.assign({view:key, mobileNav:false}, extra||{})) });
    const bottomNav = [ _bbMk('apercu','Accueil'), _bbMk('roster','Roster',{rosterDetail:null}), _bbMk('messages','Messages'), _bbMk('planning','Planning'), { icon:'', iconTxt:'☰', label:'Menu', style:"flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:7px 2px;cursor:pointer;color:var(--faint);font:600 9px 'Inter',sans-serif", tap:openMobileNav } ];
    const themeVars = dark
      ? '--bg:#000000;--panel:#0B0B0C;--surface:#161616;--text:#F2F3F6;--muted:#A8B0BA;--faint:#74808C;--hair:#242424;--rowhover:#1A1A1A;--signal:#70FC8E;--signaltext:#70FC8E;--signalsoft:#15301E;--indigo:#5B82F8;--amber:#5B82F8;--cyan:#9AA6B4;--onsignal:#10141A;'
      : '--bg:#FFFFFF;--panel:#F4F5F7;--surface:#FFFFFF;--text:#181D25;--muted:#606E80;--faint:#9AA6B4;--hair:#EAECEF;--rowhover:#F4F5F7;--signal:#70FC8E;--signaltext:#16A34A;--signalsoft:#E6FBEC;--indigo:#3765F6;--amber:#3765F6;--cyan:#8590A1;--onsignal:#181D25;';

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
    const mkTodo = (t, i) => {
      const isDone = !!done[i];
      return {
        text: t.text, tag: t.tag||'', due: t.due||'', desc: t.desc||'', hasDesc: !!t.desc, creatorLabel: t.creator||'Agence', fromCreator: t.source==='creator', hasPriority: !!t.priority, priorityLabel: t.priority?t.priority.toUpperCase():'', priorityStyle: "font:600 8px 'Inter',sans-serif;letter-spacing:.5px;padding:3px 8px;border-radius:6px;color:"+this.toneHex(t.priority==='haute'?'indigo':(t.priority==='basse'?'signal':'cyan'),dark)+";background:"+this.toneHex(t.priority==='haute'?'indigo':(t.priority==='basse'?'signal':'cyan'),dark)+"18;",
        check: isDone ? '✓' : '',
        boxStyle: 'width:16px;height:16px;border-radius:5px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font:700 9px \'Inter\',sans-serif;'+(isDone?'background:var(--signal);color:var(--onsignal);':'border:1.5px solid var(--faint);color:transparent;'),
        textStyle: "flex:1;font:400 13px 'Inter',sans-serif;"+(isDone?'color:var(--faint);text-decoration:line-through;':'color:var(--text);'),
        tagStyle: "font:600 8px 'Inter',sans-serif;letter-spacing:.5px;color:var(--muted);padding:3px 8px;border-radius:6px;background:var(--rowhover);",
        toggle: () => this.setState(s => ({ doneSet: Object.assign({}, s.doneSet, { [i]: !(s.doneSet && s.doneSet[i]) }) })),
        del: (e) => { if(e&&e.stopPropagation)e.stopPropagation(); if(!window.confirm('Supprimer cette tâche ?'))return; this.setState(s=>{ const items=(s.todoItems||this.todoRaw).slice(); items.splice(i,1); const od=s.doneSet||{}; const nd={}; Object.keys(od).forEach(kk=>{ const k=+kk; if(k<i) nd[k]=od[k]; else if(k>i) nd[k-1]=od[k]; }); return { todoItems:items, doneSet:nd }; }); },
        edit: (e) => { if(e&&e.stopPropagation)e.stopPropagation(); const nv=window.prompt('Modifier la tâche :', t.text); if(nv==null)return; const v=nv.trim(); if(!v)return; this.setState(s=>{ const arr=(s.todoItems||this.todoRaw).slice(); arr[i]=Object.assign({},arr[i],{text:v}); return { todoItems:arr }; }); },
      };
    };
    const todoItems = this.state.todoItems || this.todoRaw;
    const todoFilter = this.state.todoFilter || 'todo';
    const _allTodos = todoItems.map((t,i)=>{ const o=mkTodo(t,i); o._done=!!done[i]; return o; });
    const todos = _allTodos.filter(x=> todoFilter==='all' ? true : (todoFilter==='done' ? x._done : !x._done));
    const todoFilterTabs = [['todo','À faire'],['done','Terminées'],['all','Toutes']].map(p=>({ label:p[1], style:"padding:7px 13px;border-radius:9px;font:600 10px 'Inter',sans-serif;cursor:pointer;white-space:nowrap;"+(todoFilter===p[0]?'background:var(--text);color:var(--bg);':'color:var(--muted);'), pick:(()=>{const k=p[0];return ()=>this.setState({todoFilter:k});})() }));
    const ntPr = this.state.ntPriority||'moyenne';
    const ntCreatorChips = [{name:'Agence',val:null}].concat(this.rosterRaw.map(c=>({name:c.name.split(' ')[0],val:c.name}))).map(o=>({ name:o.name, style:'padding:6px 12px;border-radius:18px;font:600 9px \'Inter\',sans-serif;cursor:pointer;'+(((this.state.ntCreator===undefined?null:this.state.ntCreator))===o.val?'background:var(--text);color:var(--bg);':'background:var(--rowhover);color:var(--muted);'), pick:(()=>{const v=o.val;return ()=>this.setState({ntCreator:v});})() }));
    const ntPriorityChips = [['haute','Haute','indigo'],['moyenne','Moyenne','cyan'],['basse','Basse','signal']].map(p=>({ label:p[1], style:'padding:7px 12px;border-radius:18px;font:600 9px \'Inter\',sans-serif;cursor:pointer;'+(ntPr===p[0]?'background:'+this.toneHex(p[2],dark)+';color:#fff;':'border:1px solid var(--hair);color:var(--muted);'), pick:(()=>{const k=p[0];return ()=>this.setState({ntPriority:k});})() }));
    const ideasItems = this.state.ideasData || this.ideasRaw;
    const ideaTone = (s)=>/valid/i.test(s)?'signal':(/cours/i.test(s)?'cyan':'indigo');
    const ideas = ideasItems.map(o=>({ text:o.text, creatorLabel:o.creator||'Toutes', status:o.status, fromCreator:o.source==='creator', dotStyle:dotS(ideaTone(o.status),false), statusStyle:"font:600 8px 'Inter',sans-serif;letter-spacing:.5px;padding:4px 9px;border-radius:20px;white-space:nowrap;color:"+this.toneHex(ideaTone(o.status),dark)+";background:"+this.toneHex(ideaTone(o.status),dark)+"18;", del:(e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); if(!window.confirm('Supprimer cette idée ?'))return; this.setState(s=>({ ideasData:(s.ideasData||this.ideasRaw).filter(x=>x!==o) })); }, edit:(e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); const nv=window.prompt("Modifier l'idée :", o.text); if(nv==null)return; const v=nv.trim(); if(!v)return; this.setState(s=>({ ideasData:(s.ideasData||this.ideasRaw).map(x=> x===o ? Object.assign({},x,{text:v}) : x) })); } }));
    const niCreatorChips = [{name:'Toutes',val:null}].concat(this.rosterRaw.map(c=>({name:c.name.split(' ')[0],val:c.name}))).map(o=>({ name:o.name, style:'padding:6px 12px;border-radius:18px;font:600 9px \'Inter\',sans-serif;cursor:pointer;'+(((this.state.niCreator===undefined?null:this.state.niCreator))===o.val?'background:var(--text);color:var(--bg);':'background:var(--rowhover);color:var(--muted);'), pick:(()=>{const v=o.val;return ()=>this.setState({niCreator:v});})() }));
    const niStatusChips = ['\u00c0 explorer','En cours','Valid\u00e9e'].map(s=>({ label:s, style:'padding:7px 12px;border-radius:18px;font:600 9px \'Inter\',sans-serif;cursor:pointer;'+((this.state.niStatus||'\u00c0 explorer')===s?'background:var(--signal);color:var(--onsignal);':'border:1px solid var(--hair);color:var(--muted);'), pick:(()=>{const k=s;return ()=>this.setState({niStatus:k});})() }));
    const myCreatorName = (this.state.creatorId!=null)?this.rosterRaw[this.state.creatorId].name:null;
    const myIdeas = ideasItems.map((o,idx)=>({o,idx})).filter(x=>x.o.creator===myCreatorName).map(x=>({ text:x.o.text, status:x.o.status, fromCreator:x.o.source==='creator', dotStyle:dotS(ideaTone(x.o.status),false), statusStyle:"font:600 8px 'Inter',sans-serif;letter-spacing:.5px;padding:4px 9px;border-radius:20px;white-space:nowrap;color:"+this.toneHex(ideaTone(x.o.status),dark)+";background:"+this.toneHex(ideaTone(x.o.status),dark)+"18;" }));

    // ---- events / calendar ----
    const events = this.state.events || this.eventsRaw;
    const eventDeco = (e) => { const t=this.eventTypeMap[e.type]||this.eventTypeMap.call; return { dotStyle:'width:6px;height:6px;border-radius:50%;flex-shrink:0;background:'+this.toneHex(t.tone,dark)+';', chipStyle:"display:flex;align-items:center;gap:5px;min-width:0;max-width:100%;overflow:hidden;font:600 9px 'Inter',sans-serif;color:var(--text);background:var(--rowhover);border-radius:6px;padding:3px 6px;", label:(e.time?e.time+' ':'')+e.title, time:e.time, title:e.title, tone:t.tone }; };
    const firstDow = new Date(2026,5,1).getDay(); // 0 Sun
    const lead = (firstDow + 6) % 7; // Monday-first
    const cells = [];
    const totalCells = Math.ceil((lead + 30) / 7) * 7;
    for (let i = 0; i < totalCells; i++){
      const day = i - lead + 1;
      const has = day >= 1 && day <= 30;
      const dayEvents = has ? events.filter(e => Number(e.day) === day).map(eventDeco) : [];
      const isToday = day === 26;
      cells.push({
        day: has ? day : '', hasDay: has, isToday,
        chips: dayEvents.slice(0,2),
        hasMore: dayEvents.length > 2,
        moreLabel: '+' + (dayEvents.length - 2),
        cellStyle: 'min-height:88px;min-width:0;overflow:hidden;border-radius:12px;padding:8px;cursor:'+(has?'pointer':'default')+';'+(has?('background:'+(isToday?'var(--signalsoft)':'var(--panel)')+';'):'background:transparent;')+(isToday?'border:1px solid var(--signal);':''),
        numStyle: 'font:600 12px \'Inter\',sans-serif;color:'+(isToday?'var(--signaltext)':'var(--text)')+';',
        select: has ? (() => this.setState(s => ({ showEventForm:true, ne: Object.assign({}, s.ne, { day: day }) }))) : (()=>{}),
      });
    }
    const eventTypes = Object.keys(this.eventTypeMap).map(k => { const t=this.eventTypeMap[k]; const sel=this.state.ne.type===k; return { label:t.label, dotStyle:'width:7px;height:7px;border-radius:50%;background:'+this.toneHex(t.tone,dark)+';', chipStyle:'display:flex;align-items:center;gap:6px;padding:8px 12px;border-radius:20px;font:600 10px \'Inter\',sans-serif;cursor:pointer;'+(sel?'background:var(--text);color:var(--bg);':'border:1px solid var(--hair);color:var(--muted);'), pick:()=>this.setState(s=>({ne:Object.assign({},s.ne,{type:k})})) }; });

    // ---- roster / engagement ----
    const rf = this.state.rosterFilter||'all';
    const rosterAll = this.rosterRaw.map((c,i) => ({ name:c.name, handle:c.handle, niche:c.niche, isUgc:/ugc/i.test(c.niche), followers:c.followers, er:c.er, ca:c.ca, initials:this.initials(c.name), avatarStyle:this.avatarStyle(c.tone,dark,34), statusLabel:statusLabelOf(c.status), dotStyle:dotS(c.tone, c.status==='live'), open:(()=>{const ii=i;return ()=>this.setState({rosterDetail:ii});})(), del:(()=>{const ii=i, nm=c.name, cid=c.id;return (e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); if(window.confirm('Retirer '+nm+' du roster ?')){ this.setState(s=>({ deletedRoster:Object.assign({}, s.deletedRoster||{}, {[ii]:true}), rosterDetail:(s.rosterDetail===ii?null:s.rosterDetail) })); if(this._sb && cid){ this._sb.from('creators').delete().eq('id', cid).then(({error})=>{ if(error) console.warn('[supabase] delete:', error.message); }); } } };})() })).filter((_,i)=>!(this.state.deletedRoster||{})[i]);
    const roster = rosterAll.filter(c=> rf==='all'?true:(rf==='ugc'?c.isUgc:!c.isUgc));
    const rosterTab=(k,label)=>({ label, style:'padding:7px 13px;border-radius:9px;font:600 10px \'Inter\',sans-serif;cursor:pointer;'+(rf===k?'background:var(--text);color:var(--bg);':'color:var(--muted);'), pick:(()=>{const kk=k;return ()=>this.setState({rosterFilter:kk, rosterDetail:null});})() });
    const rosterTabs=[rosterTab('all','TOUS'),rosterTab('influence','INFLUENCE'),rosterTab('ugc','UGC')];
    const rosterCount = roster.length+' '+(rf==='ugc'?'UGC':(rf==='influence'?'influence':'représentés'));
    const engagement = this.rosterRaw.map(c => { const base=Math.round(parseFloat(c.er)); const spark=this.bars([40,55,48,62,58,72,66,80,76,90].map(v=>v*(0.7+base/12)).map(v=>Math.min(100,v)), this.toneHex(c.tone,dark), 3); return { name:c.name, er:c.er, reach:c.reach, initials:this.initials(c.name), avatarStyle:this.avatarStyle(c.tone,dark,30), spark, trend:(c.trend>0?'+':'')+c.trend+' pt', trendColor: c.trend>=0?greenText:redish }; });

    const topCreators = this.rosterRaw.slice(0,4).map((c,i)=>({ name:c.name, ca:c.ca, rank:String(i+1).padStart(2,'0'), dotStyle:dotS(c.tone, c.status==='live'), open:goRoster }));
    const pipeline = this.pipeRaw.map(p=>({ label:p.label, amount:p.amount, dotStyle:dotS(p.tone,false) }));
    const _invDoc = (v,stl)=>{ const html='<!doctype html><html><head><meta charset="utf-8"><title>Facture '+v.ref+'</title></head><body style="font-family:Inter,Arial,sans-serif;max-width:620px;margin:48px auto;color:#181D25;padding:0 24px"><div style="display:flex;justify-content:space-between;align-items:flex-start"><div><div style="font-size:22px;font-weight:700">TTP Agency</div><div style="color:#9AA6B4;font-size:12px;margin-top:4px">Trust the Process</div></div><div style="text-align:right"><div style="font-size:15px;font-weight:600">FACTURE</div><div style="color:#9AA6B4;font-size:13px;margin-top:4px">#'+v.ref+'</div></div></div><hr style="border:none;border-top:1px solid #EAECEF;margin:28px 0"><table style="width:100%;border-collapse:collapse;font-size:13px"><tr><td style="color:#9AA6B4;padding:8px 0">Client</td><td style="text-align:right;font-weight:600">'+v.party+'</td></tr><tr><td style="color:#9AA6B4;padding:8px 0">Échéance</td><td style="text-align:right">'+v.date+'</td></tr><tr><td style="color:#9AA6B4;padding:8px 0">Statut</td><td style="text-align:right">'+stl+'</td></tr></table><hr style="border:none;border-top:1px solid #EAECEF;margin:20px 0"><div style="display:flex;justify-content:space-between;align-items:center"><div style="font-size:14px;font-weight:600">Total</div><div style="font-size:24px;font-weight:700">'+v.amount+'</div></div><p style="margin-top:48px;color:#9AA6B4;font-size:11px">Document généré par TTP Suite — démonstration.</p></body></html>'; return 'data:text/html;charset=utf-8,'+encodeURIComponent(html); };
    const invoices = (this.state.invoiceData||this.invoiceRaw).map(v=>{ const st=this.invStatus(v.status); const url=_invDoc(v,st.label); const filename='facture-'+v.ref+'.html'; return { ref:v.ref, party:v.party, amount:v.amount, date:v.date, statusLabel:st.label, dotStyle:dotS(st.tone,false), chipStyle:this.chip(), url, filename, open:(()=>{const u=url,fn=filename,rf=v.ref;return ()=>this.setState({previewDoc:{name:'Facture '+rf,url:u,filename:fn,isImage:false}});})(), share:(e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); const txt='Facture '+v.ref+' — '+v.party+' — '+v.amount+' (échéance '+v.date+')'; if(navigator.share){navigator.share({title:'Facture '+v.ref, text:txt}).catch(()=>{});}else if(navigator.clipboard){navigator.clipboard.writeText(txt); this.setState({copied:'inv'+v.ref}); setTimeout(()=>this.setState(s=>s.copied==='inv'+v.ref?{copied:null}:{}),1500);}else{alert(txt);} }, shareLabel:(this.state.copied==='inv'+v.ref?'COPIÉ ✓':'PARTAGER'), del:(e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); if(!window.confirm('Supprimer la facture '+v.ref+' ?'))return; this.setState(s=>({ invoiceData:(s.invoiceData||this.invoiceRaw).filter(x=>x!==v) })); } }; });
    const cbase = this.state.contactsData || this.contactRaw;
    const contactsView = this.state.contactsView || 'grid';
    const contactsGrid = contactsView === 'grid', contactsList = contactsView === 'list';
    const contactsViewTabs = [['grid','Cartes'],['list','Liste']].map(p=>({ label:p[1], style:"padding:7px 13px;border-radius:9px;font:600 10px 'Inter',sans-serif;cursor:pointer;white-space:nowrap;"+(contactsView===p[0]?'background:var(--text);color:var(--bg);':'color:var(--muted);'), pick:(()=>{const k=p[0];return ()=>this.setState({contactsView:k});})() }));
    const contacts = cbase.map((k,i)=>({ brand:k.brand, person:k.person, role:k.role, tag:k.tag, email:k.email||'—', phone:k.phone||'—', initials:this.initials(k.person), avatarStyle:this.avatarStyle(k.tone,dark,44), avatarStyleSm:this.avatarStyle(k.tone,dark,38), tagStyle:"padding:5px 10px;border-radius:20px;background:var(--rowhover);font:600 8px 'Inter',sans-serif;letter-spacing:.5px;color:var(--muted);white-space:nowrap;", open:()=>this.setState({openContact:i}), del:(()=>{const ii=i,nm=k.brand;return (e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); if(!window.confirm('Supprimer le contact '+nm+' ?'))return; this.setState(s=>{ const base=(s.contactsData||this.contactRaw).slice(); base.splice(ii,1); return { contactsData:base, openContact:(s.openContact===ii?null:s.openContact) }; }); };})() }));
    const objCreators = this.objRaw.map(o=>({ name:o.name, ca:o.ca, target:o.target, pctLabel:o.pct+'%', barStyle:'width:'+Math.min(o.pct,100)+'%;height:100%;border-radius:5px;background:'+this.toneHex(o.tone,dark)+';' })).concat((this.state.customObjs||[]).map(o=>({ name:o.name, ca:'—', target:o.target, pctLabel:o.pct+'%', barStyle:'width:'+Math.min(o.pct,100)+'%;height:100%;border-radius:5px;background:'+this.toneHex('indigo',dark)+';' })));
    const pricing = this.pricingRaw;
    const briefItems = this.state.briefItems || this.briefRaw;
    const mkBrief = (b)=>{ const bval=!!(this.state.briefVal||{})[b.brand]; const st=this.briefStatus(b.status); const note=(this.state.briefNotes||{})[b.brand]||''; return { brand:b.brand, creator:b.creator, creatorFirst:(b.creator||'').split(' ')[0], deliverables:b.deliverables, due:b.due, consignes:b.consignes||'Consignes à préciser avec la marque.', budget:b.budget||'—', objectif:b.objectif||'—', statusLabel:bval?'VALIDÉ':st.label, dotStyle:dotS(bval?'signal':b.tone,false), chipStyle:this.chip(), validated:bval, validateLabel:bval?'VALIDÉ ✓':'VALIDER', validateStyle:'flex:1; padding:10px 0; text-align:center; border-radius:11px; font:600 10px \'Inter\',sans-serif; cursor:pointer;'+(bval?'background:var(--signalsoft);color:var(--signaltext);':'background:var(--signal);color:var(--onsignal);'), validate:(()=>{const k=b.brand;return ()=>this.setState(s=>({briefVal:Object.assign({},s.briefVal,{[k]:true})}));})(), noteValue:note, hasNote:!!note, onNote:(()=>{const k=b.brand;return (e)=>{const v=e.target.value;this.setState(s=>({briefNotes:Object.assign({},s.briefNotes,{[k]:v})}));};})(), del:(e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); if(!window.confirm('Supprimer le brief '+b.brand+' ?'))return; this.setState(s=>({ briefItems:(s.briefItems||this.briefRaw).filter(x=>x!==b) })); }, edit:(e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); const nv=window.prompt('Modifier les consignes du brief '+b.brand+' :', b.consignes||''); if(nv==null)return; this.setState(s=>({ briefItems:(s.briefItems||this.briefRaw).map(x=> x===b ? Object.assign({},x,{consignes:nv}) : x) })); } }; };
    const briefs = briefItems.map(mkBrief);
    const briefPreview = briefs.slice(0,3);
    const rdvPreview = events.slice().sort((a,b)=>a.day-b.day).slice(0,4).map(e=>{ const d=eventDeco(e); return { when:(e.day===26?"Auj. ":(e.day+'/06 '))+e.time, title:e.title, dotStyle:d.dotStyle }; });

    // prospection columns
    const stages = ['Prospection','Contact','Négociation','Signé'];
    const prospectCols = stages.map(stg => { const cards=(this.state.prospectData||this.prospectRaw).filter(p=>p.stage===stg).map(p=>({ brand:p.brand, contact:p.contact, value:p.value, dotStyle:dotS(p.tone,false), del:(e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); if(!window.confirm('Supprimer '+p.brand+' du pipeline ?'))return; this.setState(s=>({ prospectData:(s.prospectData||this.prospectRaw).filter(x=>x!==p) })); }, edit:(e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); const nb=window.prompt('Marque :', p.brand); if(nb==null)return; const nv=window.prompt('Montant estimé :', p.value); if(nv==null)return; this.setState(s=>({ prospectData:(s.prospectData||this.prospectRaw).map(x=> x===p ? Object.assign({},x,{brand:(nb.trim()||x.brand), value:(nv.trim()||x.value)}) : x) })); } })); return { title:stg, count:cards.length, cards }; });

    // generic module
    const mod = (this.modules[this.state.view]) ? (() => { const view=this.state.view; const m=this.modules[view]; const baseRows=(this.state.moduleRows&&this.state.moduleRows[view])||m.rows; return Object.assign({}, m, { rows: baseRows.map(r=>({ a:r.a, b:r.b, c:r.c, dotStyle:dotS(r.tone,false), chipStyle:"font:600 8px 'Inter',sans-serif;letter-spacing:.6px;color:var(--muted);padding:5px 10px;border-radius:20px;background:var(--rowhover);white-space:nowrap;", del:(e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); if(!window.confirm('Supprimer cet élément ?'))return; this.setState(s=>{ const mr=Object.assign({}, s.moduleRows); mr[view]=baseRows.filter(x=>x!==r); return { moduleRows:mr }; }); }, edit:(e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); const na=window.prompt('Titre :', r.a); if(na==null)return; const nb=window.prompt('Sous-titre :', r.b); if(nb==null)return; this.setState(s=>{ const mr=Object.assign({}, s.moduleRows); mr[view]=baseRows.map(x=> x===r ? Object.assign({},x,{a:(na.trim()||x.a), b:(nb.trim()||x.b)}) : x); return { moduleRows:mr }; }); } })) }); })() : { title:'', section:'', sub:'', action:'', rows:[] };
    const vTemplatesMsg = this.state.view==='templates';
    const msgChannel = this.state.msgChannel || 'tous';
    const _chanMeta = { gmail:{label:'Gmail', tone:'indigo'}, linkedin:{label:'LinkedIn', tone:'cyan'}, instagram:{label:'Instagram', tone:'signal'}, tiktok:{label:'TikTok', tone:'indigo'} };
    const msgChannelTabs = [['tous','Tous'],['gmail','Gmail'],['linkedin','LinkedIn'],['instagram','Instagram'],['tiktok','TikTok']].map(p=>({ label:p[1], style:"padding:7px 13px;border-radius:9px;font:600 10px 'Inter',sans-serif;cursor:pointer;white-space:nowrap;"+(msgChannel===p[0]?'background:var(--text);color:var(--bg);':'color:var(--muted);'), pick:(()=>{const k=p[0];return ()=>this.setState({msgChannel:k});})() }));
    const msgTemplatesList = this.msgTemplatesRaw.filter(m=> msgChannel==='tous'?true:m.channel===msgChannel).map(m=>{ const cm=_chanMeta[m.channel]||{label:m.channel,tone:'cyan'}; const hex=this.toneHex(cm.tone,dark); const copied=this.state.copied==='tpl'+m.title; return { title:m.title, channelLabel:cm.label, body:m.body, preview:(m.body.length>140?m.body.slice(0,140)+'…':m.body), chanStyle:"font:600 8px 'Inter',sans-serif;letter-spacing:.5px;padding:4px 10px;border-radius:20px;white-space:nowrap;color:"+hex+";background:"+hex+"18;", copyLabel:copied?'COPIÉ ✓':'COPIER', copy:(()=>{const b=m.body,t=m.title;return (e)=>{ if(e&&e.stopPropagation)e.stopPropagation(); try{ if(navigator.clipboard){navigator.clipboard.writeText(b).catch(()=>{});} }catch(_){} this.setState({copied:'tpl'+t}); setTimeout(()=>this.setState(s=>s.copied==='tpl'+t?{copied:null}:{}),1500); };})() }; });

    // ---- creator portal (me) ----
    const ci = this.state.creatorId;
    const cr = (ci != null) ? this.rosterRaw[ci] : this.rosterRaw[0];
    const myEvents = events.filter(e => e.who === cr.name);
    const myAgenda = (myEvents.length ? myEvents : events.slice(0,3)).map(e => { const d=eventDeco(e); return { day:e.day, time:e.time, title:e.title, dotStyle:d.dotStyle, dayBoxStyle:'width:46px;flex-shrink:0;text-align:center;background:var(--rowhover);border-radius:10px;padding:6px 0;color:var(--text);' }; });
    const myTodosArr = todoItems.map((t,i)=>({t,i})).filter(x => x.t.creator === cr.name);
    const myTodos = myTodosArr.map(x => mkTodo(x.t, x.i));
    const myBriefsArr = briefItems.filter(b => b.who === cr.name);
    const myBriefs = (myBriefsArr.length ? myBriefsArr : briefItems.slice(0,2)).map(mkBrief);
    const nextEv = myAgenda[0] || {};
    const me = {
      name: cr.name, first: (s=>s.charAt(0)+s.slice(1).toLowerCase())(cr.name.split(' ')[0]), initials: this.initials(cr.name), handle: cr.handle, niche: cr.niche, plat: cr.plat,
      followers: cr.followers, er: cr.er, reach: cr.reach, ca: cr.ca,
      briefsCount: String(myBriefsArr.length || 2), todoCount: String(myTodosArr.length || 3),
      nextRdv: nextEv.title || 'Shoot Galeries Lafayette', nextRdvMeta: (nextEv.time||'10:00')+' · Lyon',
      avatarStyle: this.avatarStyle(cr.tone, dark, 40), bigAvatarStyle: this.avatarStyle(cr.tone, dark, 72),
    };
    const mePhoto = (this.state.photos||{})['c'+(ci!=null?ci:0)] || '';
    if(mePhoto){ const ov='background-image:url('+mePhoto+');background-size:cover;background-position:center;color:transparent;'; me.avatarStyle=this.avatarStyle(cr.tone,dark,40)+ov; me.bigAvatarStyle=this.avatarStyle(cr.tone,dark,72)+ov; }
    me.avatarInner = mePhoto ? '' : me.initials;
    const agencyPhoto = (this.state.photos||{}).agency || '';
    const agencyAvatarStyle = "width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;font:700 12px 'Inter',sans-serif;position:relative;" + (agencyPhoto ? 'background-image:url('+agencyPhoto+');background-size:cover;background-position:center;color:transparent;' : 'background:var(--signal);color:var(--onsignal);');
    const mkPhoto = (key)=>(e)=>{ const f=e.target.files&&e.target.files[0]; if(!f)return; const r=new FileReader(); r.onload=()=>this.setState(s=>({photos:Object.assign({},s.photos,{[key]:r.result})})); r.readAsDataURL(f); };
    const loginCreators = this.rosterRaw.map((c,i)=>({ name:c.name, niche:c.niche, initials:this.initials(c.name), avatarStyle:this.avatarStyle(c.tone,dark,48), login:()=>this.setState({creatorId:i, portalTab:'accueil'}) }));

    // ===== ENGAGEMENT CALCULATOR =====
    const fnum = [540000,1200000,480000,320000,210000,95000,64000,175000];
    const eci = this.state.engCreator || 0; const ecr = this.rosterRaw[eci]; const ecErf = parseFloat(ecr.er.replace(',','.'));
    const platCfg = {
      instagram:{label:'Instagram', denom:'Abonnés', metrics:['Likes moyens','Commentaires'], ratios:[0.9,0.1], formula:'(likes + commentaires) ÷ abonnés × 100', viewBase:false, good:3, exc:6},
      tiktok:{label:'TikTok', denom:'Vues moyennes', metrics:['Likes','Commentaires','Partages'], ratios:[0.78,0.08,0.14], formula:'(likes + commentaires + partages) ÷ vues × 100', viewBase:true, good:5, exc:9},
      youtube:{label:'YouTube', denom:'Vues moyennes', metrics:['Likes','Commentaires'], ratios:[0.88,0.12], formula:'(likes + commentaires) ÷ vues × 100', viewBase:true, good:4, exc:8},
      snapchat:{label:'Snapchat', denom:'Vues de story', metrics:['Captures écran','Réponses'], ratios:[0.6,0.4], formula:'(captures + réponses) ÷ vues × 100', viewBase:true, good:5, exc:10},
    };
    const pl = this.state.engPlatform || 'instagram'; const cfg = platCfg[pl];
    const baseDefault = cfg.viewBase ? Math.round(fnum[eci]*0.35) : fnum[eci];
    const totalInter = baseDefault*ecErf/100;
    const metricDefaults = cfg.ratios.map(r=>Math.round(totalInter*r));
    const baseVal = (this.state.engBase!==''&&this.state.engBase!=null) ? Number(this.state.engBase) : baseDefault;
    const mState = [this.state.engM0, this.state.engM1, this.state.engM2];
    const mVals = cfg.metrics.map((lab,i)=> (mState[i]!==''&&mState[i]!=null) ? Number(mState[i]) : metricDefaults[i]);
    const interSum = mVals.reduce((a,b)=>a+b,0);
    const erCalc = baseVal>0 ? interSum/baseVal*100 : 0;
    let engVerdict='Faible', evTone='cyan';
    if(erCalc>=cfg.exc){engVerdict='Excellent';evTone='signal';} else if(erCalc>=cfg.good){engVerdict='Bon';evTone='signal';} else if(erCalc>=cfg.good*0.6){engVerdict='Correct';evTone='indigo';}
    const engInputs = [{label:cfg.denom, value:String(baseVal), onInput:(e)=>{const v=e.target.value;this.setState({engBase:v});}}].concat(cfg.metrics.map((lab,i)=>({label:lab, value:String(mVals[i]), onInput:(()=>{const k='engM'+i; return (e)=>{const v=e.target.value;this.setState({[k]:v});};})()})));
    const engPlatforms = Object.keys(platCfg).map(k=>({ label:platCfg[k].label, style:'padding:9px 14px;border-radius:11px;font:600 10px \'Inter\',sans-serif;cursor:pointer;'+(k===pl?'background:var(--text);color:var(--bg);':'border:1px solid var(--hair);color:var(--muted);'), pick:(()=>{const kk=k;return ()=>this.setState({engPlatform:kk, engBase:'', engM0:'', engM1:'', engM2:''});})() }));
    const engChips = this.rosterRaw.map((c,i)=>({ name:c.name.split(' ')[0], dotStyle:dotS(c.tone,false), style:'display:flex;align-items:center;gap:7px;padding:7px 13px;border-radius:20px;font:600 10px \'Inter\',sans-serif;cursor:pointer;'+(i===eci?'background:var(--text);color:var(--bg);':'border:1px solid var(--hair);color:var(--muted);'), pick:(()=>{const ii=i;return ()=>this.setState({engCreator:ii, engBase:'', engM0:'', engM1:'', engM2:''});})() }));
    // ===== PRICING CALCULATOR =====
    const fmtEur = (n)=>String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,' ')+' €';
    const pci = this.state.priceCreator || 0; const pcr = this.rosterRaw[pci]; const pErf = parseFloat(pcr.er.replace(',','.'));
    const rateMap = {post:9,reel:13,story:5,ugc:4,youtube:18,pack:38}; const fmtLabel = {post:'Post',reel:'Reel',story:'Story x3',ugc:'UGC',youtube:'YouTube',pack:'Pack mois'};
    const pf = this.state.priceFormat || 'reel'; const pmult = 0.85 + pErf/12; const priceN = Math.round(fnum[pci]/1000*rateMap[pf]*pmult/100)*100;
    const priceChips = this.rosterRaw.map((c,i)=>({ name:c.name.split(' ')[0], style:'padding:6px 11px;border-radius:18px;font:600 9px \'Inter\',sans-serif;cursor:pointer;'+(i===pci?'background:var(--signal);color:var(--onsignal);':'background:rgba(255,255,255,.1);color:var(--bg);'), pick:()=>this.setState({priceCreator:i}) }));
    const priceFormats = Object.keys(rateMap).map(k=>({ label:fmtLabel[k], style:'padding:6px 11px;border-radius:18px;font:600 9px \'Inter\',sans-serif;cursor:pointer;'+(k===pf?'background:var(--signal);color:var(--onsignal);':'background:rgba(255,255,255,.1);color:var(--bg);'), pick:()=>this.setState({priceFormat:k}) }));
    // ===== CONTACT DETAIL =====
    const oc = this.state.openContact; let openContactObj = null;
    if(oc!=null){ const k=(this.state.contactsData||this.contactRaw)[oc]; const cp=(key,val)=>()=>{ try{ navigator.clipboard && navigator.clipboard.writeText(val); }catch(e){} this.setState({copied:key}); setTimeout(()=>this.setState(s=> s.copied===key?{copied:null}:{}),1500); }; openContactObj={ brand:k.brand, person:k.person, role:k.role, email:k.email, phone:k.phone, last:k.last, deals:k.deals, initials:this.initials(k.person), avatarStyle:this.avatarStyle(k.tone,dark,52), copyEmail:cp('email',k.email), copyPhone:cp('phone',k.phone), emailLabel:this.state.copied==='email'?'COPIÉ ✓':'COPIER', phoneLabel:this.state.copied==='phone'?'COPIÉ ✓':'COPIER' }; }
    // ===== PLANNING UPCOMING =====
    const dowFr = ['DIM','LUN','MAR','MER','JEU','VEN','SAM'];
    const upcoming = events.filter(e=>Number(e.day)>=26).sort((a,b)=>a.day-b.day).slice(0,6).map(e=>{ const d=eventDeco(e); const tp=this.eventTypeMap[e.type]||this.eventTypeMap.call; return { day:e.day, dow:dowFr[new Date(2026,5,Number(e.day)).getDay()], time:e.time, title:e.title, dotStyle:d.dotStyle, typeLabel:tp.label, tagStyle:"font:600 8px 'Inter',sans-serif;letter-spacing:.5px;color:var(--muted);padding:4px 9px;border-radius:6px;background:var(--rowhover);", dayBoxStyle:'width:46px;flex-shrink:0;text-align:center;background:var(--rowhover);border-radius:10px;padding:6px 0;color:var(--text);', del:(ev)=>{ if(ev&&ev.stopPropagation)ev.stopPropagation(); if(!window.confirm('Supprimer cet événement ?'))return; this.setState(s=>({ events:(s.events||this.eventsRaw).filter(x=>x!==e) })); } }; });

    // ===== CONTRACT GENERATOR =====
    const ctt = this.state.ctType || 'marque';
    const ctci = this.state.ctCreator || 0; const ctcr = this.rosterRaw[ctci]; const ctName = ctcr.name;
    const cBrand=this.state.ctBrand, cVal=this.state.ctValue, cComm=this.state.ctCommission, cDur=this.state.ctDuration, cDeliv=this.state.ctDeliverables;
    const ctExclLabel = this.state.ctExcl ? 'Oui · 30 jours' : 'Non';
    const ctBankI = this.state.ctBank||0; const allBanks = this.bankAccounts.concat(this.state.customBanks||[]); const ctBankSel = allBanks[ctBankI]||allBanks[0];
    const ctUseCo = !!this.state.ctUseCompany;
    const coName=this.state.ctCoName||'', coSiret=this.state.ctCoSiret||'', coVat=this.state.ctCoVat||'', coAddr=this.state.ctCoAddr||'';
    const coLine = ctUseCo ? (' Facturation via '+(coName||'[Société]')+(coSiret?' (SIRET '+coSiret+')':'')+(coVat?', TVA '+coVat:'')+(coAddr?', '+coAddr:'')+'.') : '';
    const ctTitle = ctt==='marque'?'Contrat de partenariat commercial':(ctt==='repr'?'Contrat de représentation':'Cession de droits — UGC');
    let ctParties, ctTerms;
    const payTerms = [{l:'Compte de réception', v:ctBankSel.bank}, {l:'IBAN', v:ctBankSel.iban}, {l:'Modalités', v:'Virement · 30 j fin de mois'}, {l:'TVA', v: ctUseCo? (coVat?('Assujettie · '+coVat):'20% (autoliquidation UE)') : 'Non assujetti (art. 293 B CGI)'}];
    if(ctt==='marque'){ ctParties='ENTRE '+(cBrand||'[Annonceur]')+' (l\u2019Annonceur) ET '+ctName+', représenté(e) par TTP Agency (l\u2019Agent).'+coLine; ctTerms=[{l:'Objet',v:'Campagne '+(cBrand||'—')},{l:'Livrables',v:cDeliv||'—'},{l:'Montant',v:cVal||'—'},{l:'Exclusivité',v:ctExclLabel},{l:'Durée',v:cDur||'—'},{l:'Commission TTP',v:'20% du montant'}].concat(payTerms); }
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
    if(rdi!=null){ const c=this.rosterRaw[rdi]; const fn=c.name.split(' ')[0];
      const rinv=this.invoiceRaw.filter(v=>v.party.indexOf(fn)>-1).map(v=>{const st=this.invStatus(v.status);return {ref:v.ref,party:v.party,amount:v.amount,date:v.date,statusLabel:st.label,dotStyle:dotS(st.tone,false),chipStyle:this.chip()};});
      const rtd=todoItems.map((t,i)=>({t,i})).filter(x=>x.t.creator===c.name).map(x=>mkTodo(x.t,x.i));
      const rbf=briefItems.filter(b=>b.who===c.name).map(b=>{const st=this.briefStatus(b.status);return {brand:b.brand,deliverables:b.deliverables,due:b.due,statusLabel:st.label,dotStyle:dotS(b.tone,false),chipStyle:this.chip()};});
      const rid=[{a:'Format '+c.niche+' tendance',b:'Reel · à valider',tone:'indigo'},{a:'Collab croisée roster',b:'Story · idée',tone:'signal'}].map(o=>({a:o.a,b:o.b,dotStyle:dotS(o.tone,false)}));
      const mkRdInfo=(field)=>(e)=>{ const v=e.target.value; this.setState(s=>{ const ri=Object.assign({},s.rosterInfo); ri[rdi]=Object.assign({}, this.rosterInfoRaw[rdi]||{}, ri[rdi]||{}, {[field]:v}); return {rosterInfo:ri}; }); };
      const rinfoBase=Object.assign({ville:'',phone:'',email:'',address:'',siren:'',birth:'',exclu:false,commission:'20%'}, this.rosterInfoRaw[rdi]||{}, (this.state.rosterInfo&&this.state.rosterInfo[rdi])||{});
      const rinfoFields=[ {label:'Ville / Pays',value:rinfoBase.ville,onInput:mkRdInfo('ville')}, {label:'Téléphone',value:rinfoBase.phone,onInput:mkRdInfo('phone')}, {label:'Email',value:rinfoBase.email,onInput:mkRdInfo('email')}, {label:'Adresse postale',value:rinfoBase.address,onInput:mkRdInfo('address')}, {label:'SIREN / SIRET',value:rinfoBase.siren,onInput:mkRdInfo('siren')}, {label:'Date de naissance',value:rinfoBase.birth,onInput:mkRdInfo('birth')}, {label:'Commission TTP (%)',value:rinfoBase.commission,onInput:mkRdInfo('commission')} ];
      const mkPaste = async () => { try{ const txt = await navigator.clipboard.readText(); if(!txt) return; const cur = Object.assign({}, this.rosterInfoRaw[rdi]||{}, (this.state.rosterInfo&&this.state.rosterInfo[rdi])||{}); const set=(k,v)=>{ if(v && String(v).trim()) cur[k]=String(v).trim(); }; txt.split(/\r?\n/).map(s=>s.trim()).filter(Boolean).forEach(l=>{ const m=l.match(/^([^:]{2,30}):\s*(.+)$/); if(!m) return; const key=m[1].toLowerCase(); const val=m[2]; if(/ville|pays|localit/.test(key)) set('ville',val); else if(/t[ée]l|phone|mobile|portable|num/.test(key)) set('phone',val); else if(/mail/.test(key)) set('email',val); else if(/adresse|address|rue|postal/.test(key)) set('address',val); else if(/siren|siret|tva/.test(key)) set('siren',val); else if(/naiss|date|dob/.test(key)) set('birth',val); }); const email=txt.match(/[\w.+-]+@[\w-]+\.[\w.-]+/); if(email) set('email',email[0]); const siren=txt.match(/\b\d{3}[\s.]?\d{3}[\s.]?\d{3}\b/); if(siren) set('siren',siren[0]); const phone=txt.match(/(\+?\d[\d\s().-]{8,}\d)/); if(phone){ const d=phone[0].replace(/\D/g,''); const sd=siren?siren[0].replace(/\D/g,''):''; if(d!==sd) set('phone',phone[0].trim()); } const ri=Object.assign({}, this.state.rosterInfo); ri[rdi]=cur; this.setState({rosterInfo:ri}); }catch(e){ alert('Autorise l\'accès au presse-papier pour coller les infos.'); } };
      const toggleExclu = () => { this.setState(s=>{ const ri=Object.assign({},s.rosterInfo); const base=Object.assign({}, this.rosterInfoRaw[rdi]||{}, ri[rdi]||{}); base.exclu=!base.exclu; ri[rdi]=base; return {rosterInfo:ri}; }); };
      rd={ name:c.name, niche:c.niche, plat:c.plat, handle:c.handle, followers:c.followers, er:c.er, ca:c.ca, reach:c.reach, initials:this.initials(c.name), bigAvatarStyle:this.avatarStyle(c.tone,dark,64), statusLabel:statusLabelOf(c.status), dotStyle:dotS(c.tone,c.status==='live'), invoices:rinv, todos:rtd, briefs:rbf, ideas:rid, infoFields:rinfoFields, paste:mkPaste, exclu:!!rinfoBase.exclu, commission:rinfoBase.commission||'—', excluLabel:rinfoBase.exclu?'EXCLUSIF':'NON EXCLUSIF', excluStyle:'padding:8px 14px;border-radius:10px;font:600 9px \'Inter\',sans-serif;cursor:pointer;'+(rinfoBase.exclu?'background:var(--signal);color:var(--onsignal);':'border:1px solid var(--hair);color:var(--muted);'), toggleExclu }; }

    // ===== DOCUMENTS (shared store) =====
    const docTypeMeta = { brief:{label:'Brief',tone:'indigo',glyph:'✎'}, mediakit:{label:'Media kit',tone:'signal',glyph:'▦'}, facture:{label:'Facture',tone:'cyan',glyph:'⊞'}, autre:{label:'Document',tone:'indigo',glyph:'▤'} };
    const docBase = this.state.docs || this.docsRaw;
    const docCi = this.state.docCreator!=null ? this.state.docCreator : 0;
    const docTy = this.state.docType || 'brief';
    const mkDoc = (d, ci2, idx)=>{ const tm=docTypeMeta[d.type]||docTypeMeta.autre; const url=d.url||('data:text/plain;charset=utf-8,'+encodeURIComponent('TTP — '+d.name+'\n'+tm.label+'\nDocument de démonstration TTP Suite.')); const filename=d.url?d.name:(d.name.replace(/\.[a-z0-9]+$/i,'')+'.txt'); const hex=this.toneHex(tm.tone,dark); return { name:d.name, glyph:tm.glyph, tagLabel:tm.label, meta:[d.size,d.date].filter(Boolean).join(' · '), url, filename, iconStyle:'width:40px;height:40px;border-radius:11px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font:600 16px \'Inter\',sans-serif;background:'+hex+'22;color:'+hex+';', tagStyle:'font:600 8px \'Inter\',sans-serif;letter-spacing:.6px;padding:4px 9px;border-radius:20px;white-space:nowrap;color:'+hex+';background:'+hex+'18;', open:(()=>{const nm=d.name,u=url,fn=filename,im=(/^data:image/.test(url)||/\.(png|jpe?g|gif|webp|svg)$/i.test(d.name));return ()=>this.setState({previewDoc:{name:nm,url:u,filename:fn,isImage:im}});})(), remove:(()=>{const cc=ci2,ii=idx;return ()=>{const b=this.state.docs||this.docsRaw;const cur=Object.assign({},b);cur[cc]=(cur[cc]||[]).filter((_,j)=>j!==ii);this.setState({docs:cur});};})() }; };
    const docCreatorChips = this.rosterRaw.map((c,i)=>({ name:c.name.split(' ')[0], initials:this.initials(c.name), avatarStyle:this.avatarStyle(c.tone,dark,24), chipStyle:'display:flex;align-items:center;gap:8px;padding:5px 14px 5px 5px;border-radius:30px;cursor:pointer;font:600 11px \'Inter\',sans-serif;letter-spacing:.3px;'+(i===docCi?'background:var(--text);color:var(--bg);':'background:var(--surface);color:var(--text);border:1px solid var(--hair);'), pick:(()=>{const k=i;return ()=>this.setState({docCreator:k});})() }));
    const docTypeChips = Object.keys(docTypeMeta).map(k=>({ label:docTypeMeta[k].label, style:'padding:7px 13px;border-radius:18px;font:600 9px \'Inter\',sans-serif;letter-spacing:.4px;cursor:pointer;'+(k===docTy?'background:var(--signalsoft);color:var(--signaltext);':'background:var(--panel);color:var(--muted);'), pick:(()=>{const kk=k;return ()=>this.setState({docType:kk});})() }));
    const agencyDocs = (docBase[docCi]||[]).map((d,idx)=>mkDoc(d,docCi,idx));
    const docCreatorName = this.rosterRaw[docCi].name.split(' ')[0];
    const myCi = this.state.creatorId!=null?this.state.creatorId:0;
    const myDocs = (docBase[myCi]||[]).map((d,idx)=>mkDoc(d,myCi,idx));

    // ===== MEDIA KIT =====
    const mkCi = this.state.mkCreator!=null?this.state.mkCreator:0;
    const mkc = this.rosterRaw[mkCi]; const mkSeed = this.mediaKitRaw[mkCi]||{}; const mkFn=mkc.name.split(' ')[0];
    const mkGender = mkSeed.gender || 'Femmes 70% · Hommes 30%';
    const mkFemM=/(\d+)%/.exec(mkGender); const mkFem=mkFemM?Number(mkFemM[1]):65;
    const mk = { name:mkc.name, fn:mkFn, handle:mkc.handle, niche:mkc.niche, plat:mkc.plat, initials:this.initials(mkc.name), avatarStyle:this.avatarStyle(mkc.tone,dark,76), bio: mkSeed.bio || (mkFn+', créateur '+mkc.niche.toLowerCase()+' représenté(e) par TTP Agency. Contenus premium, audience engagée et collaborations à forte conversion.'), age: mkSeed.age||'18–34 ans', agePct: mkSeed.agePct||'64%', gender:mkGender, femStyle:'width:'+mkFem+'%;', homStyle:'width:'+(100-mkFem)+'%;' };
    const mkStats=[{label:'ABONNÉS',value:mkc.followers},{label:'ENGAGEMENT',value:mkc.er},{label:'REACH / MOIS',value:mkc.reach},{label:'PLATEFORME',value:mkc.plat}];
    const mkGeo = (mkSeed.geo||['Paris','Lyon','Bruxelles']);
    const mkBrands = (mkSeed.brands||['Sephora','Dior','L’Oréal']);
    const mkFormats = (mkSeed.formats||[{label:'Reel Instagram',price:'1 800 €'},{label:'Story (×3)',price:'700 €'},{label:'Post feed',price:'1 200 €'},{label:'Vidéo UGC',price:'650 €'}]);
    const mkCreatorChips = this.rosterRaw.map((c,i)=>({ name:c.name.split(' ')[0], initials:this.initials(c.name), avatarStyle:this.avatarStyle(c.tone,dark,24), chipStyle:'display:flex;align-items:center;gap:8px;padding:5px 14px 5px 5px;border-radius:30px;cursor:pointer;font:600 11px \'Inter\',sans-serif;'+(i===mkCi?'background:var(--text);color:var(--bg);':'background:var(--surface);color:var(--text);border:1px solid var(--hair);'), pick:(()=>{const k=i;return ()=>this.setState({mkCreator:k});})() }));

    // ===== PORTAL: MESSAGES + IDENTITY =====
    const announcements = [
      {title:'Deadline Sephora avancée', body:'Livrables au 01/07 — merci de prioriser le brief.', urgent:true, time:'09:12'},
      {title:'Nouvelle grille tarifaire Q3', body:'Tarifs reels +8% applicables dès juillet.', urgent:false, time:'Hier'},
    ].map(a=>({ title:a.title, body:a.body, time:a.time, cardStyle:'background:var(--surface);border-radius:16px;padding:18px;'+(a.urgent?'border:1px solid '+this.toneHex('indigo',dark)+';':'border:1px solid var(--hair);'), badgeStyle:'display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:20px;font:600 8px \'Inter\',sans-serif;letter-spacing:.6px;'+(a.urgent?'background:'+this.toneHex('indigo',dark)+';color:#fff;':'background:var(--rowhover);color:var(--muted);'), badgeLabel:a.urgent?'⚡ URGENT · PUSH':'INFO' }));
    const threads = [
      {campaign:'Sephora — Collection été', last:'Marc : on valide les concepts ?', time:'10:24', unread:2, read:false, tone:'indigo'},
      {campaign:'Dior Beauty — Gifting', last:'Toi : reçu, je m\'en occupe', time:'Hier', unread:0, read:true, tone:'cyan'},
      {campaign:'Annonce agence', last:'Réunion créateurs vendredi 15h', time:'Lun', unread:0, read:true, tone:'signal'},
    ].map((t,i)=>({ campaign:t.campaign, last:t.last, time:t.time, unread:t.unread>0?String(t.unread):'', hasUnread:t.unread>0, read:t.read, dotStyle:dotS(t.tone,false), open:(()=>{const ii=i;return ()=>this.setState({openThread:ii});})() }));
    const _ot = this.state.openThread; const _base = this.state.threadMsgs || this.msgsRaw;
    const convMsgs = _ot!=null ? (_base[_ot]||[]).map(m=>({ text:m.text, rowStyle:'display:flex;margin-bottom:10px;'+(m.from==='me'?'justify-content:flex-end;':'justify-content:flex-start;'), bubbleStyle:'max-width:75%;padding:11px 15px;border-radius:16px;font:400 13px \'Inter\',sans-serif;line-height:1.5;'+(m.from==='me'?'background:var(--signal);color:var(--onsignal);border-bottom-right-radius:5px;':'background:var(--surface);color:var(--text);border:1px solid var(--hair);border-bottom-left-radius:5px;') })) : [];
    const convTitle = _ot!=null ? ['Sephora — Collection été','Dior Beauty — Gifting','Annonce agence'][_ot] : '';
    // ===== AGENCY INBOX (shared store) =====
    const aMeta = { 0:{creator:'CAMILLE ORSINI', campaign:'Sephora — Collection été', tone:'indigo'}, 1:{creator:'CAMILLE ORSINI', campaign:'Dior Beauty — Gifting', tone:'cyan'}, 3:{creator:'THÉO RIVIÈRE', campaign:'Logitech — Sponso', tone:'indigo'}, 4:{creator:'JADE NGUYEN', campaign:'Sephora UGC', tone:'signal'}, 5:{creator:'INÈS KABORÉ', campaign:"L'Oréal — Soin", tone:'cyan'} };
    const agencyThreads = [0,1,3,4,5].map(k=>{ const ms=_base[k]||[]; const lm=ms[ms.length-1]; const w=aMeta[k].creator.split(' ')[0]; const lcap=w.charAt(0)+w.slice(1).toLowerCase(); const last= lm ? (lm.from==='agency'?'Vous : ':lcap+' : ')+lm.text : '—'; return { creator:aMeta[k].creator, campaign:aMeta[k].campaign, initials:this.initials(aMeta[k].creator), avatarStyle:this.avatarStyle(aMeta[k].tone,dark,38), last, hasUnread:(!!lm && lm.from==='me'), open:(()=>{const kk=k;return ()=>this.setState({openAThread:kk});})() }; });
    const _at = this.state.openAThread;
    const aConvMsgs = _at!=null ? (_base[_at]||[]).map(m=>({ text:m.text, rowStyle:'display:flex;margin-bottom:10px;'+(m.from==='agency'?'justify-content:flex-end;':'justify-content:flex-start;'), bubbleStyle:'max-width:75%;padding:11px 15px;border-radius:16px;font:400 13px \'Inter\',sans-serif;line-height:1.5;'+(m.from==='agency'?'background:var(--signal);color:var(--onsignal);border-bottom-right-radius:5px;':'background:var(--surface);color:var(--text);border:1px solid var(--hair);border-bottom-left-radius:5px;') })) : [];
    const aConvWho = _at!=null ? aMeta[_at].creator : '';
    const aConvTitle = _at!=null ? aMeta[_at].campaign : '';
    const aConvInitials = _at!=null ? this.initials(aMeta[_at].creator) : '';
    const aAvatarStyle = _at!=null ? this.avatarStyle(aMeta[_at].tone,dark,38) : '';
    const bannerPhoto = (this.state.photos||{}).banner || '';
    const bannerStyle = 'height:118px;border-radius:18px;position:relative;overflow:hidden;'+(bannerPhoto?'background-image:url('+bannerPhoto+');background-size:cover;background-position:center;':'background:'+this.toneHex(cr.tone,dark)+';');
    me.bio = 'Créateur '+cr.niche.toLowerCase()+' basé en France. Contenus premium, ton authentique et publication régulière.';
    me.valeurs = 'Authenticité · Qualité · Régularité';
    me.audience = 'France · 18–34 ans · 65% femmes';
    me.langue = 'Français';

    const alerts = [
      {title:'Contrat THÉO expire dans 24 j', detail:'Représentation · échéance 20/07', tone:'amber', tag:'CONTRAT'},
      {title:"Facture L'Oréal impayée +30 j", detail:'#2026-081 · 18 000 € · éch. 30/05', tone:'amber', tag:'IMPAYÉ'},
      {title:'NOÉ sans activité depuis 24 j', detail:'Dernier post le 02/06', tone:'cyan', tag:'CRÉATEUR'},
      {title:'Deal Nike sans MAJ depuis 8 j', detail:'Négociation · 24 000 €', tone:'cyan', tag:'DEAL'},
      {title:'Objectif CA à 88% — palier 80% franchi', detail:'248 600 / 280 000 €', tone:'signal', tag:'OBJECTIF'},
      {title:'Brief HelloFresh non assigné +48 h', detail:'Reçu le 24/06 · à attribuer', tone:'amber', tag:'BRIEF'},
    ].map(a=>({ title:a.title, detail:a.detail, tag:a.tag, dotStyle:dotS(a.tone,false), tagStyle:"font:600 8px 'Inter',sans-serif;letter-spacing:.6px;color:var(--muted);padding:5px 10px;border-radius:20px;background:var(--rowhover);white-space:nowrap;" }));

    return {
      themeVars, themeGlyph: dark ? '☀' : '☾',
      bottomNav, navOpenCls, openMobileNav, closeMobileNav,
      notifOpen:!!this.state.notifOpen, toggleNotif:()=>this.setState(s=>({notifOpen:!s.notifOpen})), closeNotif:()=>this.setState({notifOpen:false}),
      hasNotif:true, notifCount:'4',
      notifications:[ {icon:'◆', title:'Inès a proposé une idée de contenu', time:'il y a 12 min', tone:'signal'}, {icon:'✉', title:'Nouveau message — campagne Sephora', time:'il y a 1 h', tone:'indigo'}, {icon:'◷', title:'Échéance brief Sephora · 02/07', time:'demain', tone:'cyan'}, {icon:'€', title:'Facture L\u2019Oréal en retard de paiement', time:'il y a 2 j', tone:'indigo'} ].map(n=>({ icon:n.icon, title:n.title, time:n.time, iconStyle:'width:30px;height:30px;border-radius:9px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font:600 12px \'Inter\',sans-serif;background:'+this.toneHex(n.tone,dark)+'18;color:'+this.toneHex(n.tone,dark)+';' })),
      vAlertes:this.state.view==='alertes', alerts,
      vMessages:this.state.view==='messages', agencyThreads,
      aMsgListShown: this.state.openAThread==null, aThreadOpen: this.state.openAThread!=null, aConvMsgs, aConvWho, aConvTitle, aConvInitials, aAvatarStyle, adraft:this.state.adraft,
      onADraft:(e)=>{const v=e.target.value;this.setState({adraft:v});}, backAThreads:()=>this.setState({openAThread:null}),
      sendMsgA:()=>{ const at=this.state.openAThread; if(at==null)return; const d=(this.state.adraft||'').trim(); if(!d)return; const base=this.state.threadMsgs||this.msgsRaw; const cur=Object.assign({},base); cur[at]=[...(cur[at]||[]),{from:'agency',text:d}]; this.setState({threadMsgs:cur, adraft:''}); setTimeout(()=>{ const b=this.state.threadMsgs||this.msgsRaw; const c2=Object.assign({},b); const rep=['Merci, c\'est noté ! 🙏','Super, je m\'en occupe.','Parfait 👍','Reçu, je vous tiens au courant.'][Math.floor(Math.random()*4)]; c2[at]=[...(c2[at]||[]),{from:'me',text:rep}]; this.setState({threadMsgs:c2}); },1300); },
      pMessages:this.state.portalTab==='messages', announcements, threads, bannerStyle, onPhotoBanner: mkPhoto('banner'),
      msgListShown: this.state.openThread==null, threadOpen: this.state.openThread!=null, convMsgs, convTitle, draft:this.state.draft,
      onDraft:(e)=>{const v=e.target.value;this.setState({draft:v});}, backThreads:()=>this.setState({openThread:null}),
      sendMsg:()=>{ const ot=this.state.openThread; if(ot==null)return; const d=(this.state.draft||'').trim(); if(!d)return; const base=this.state.threadMsgs||this.msgsRaw; const cur=Object.assign({},base); cur[ot]=[...(cur[ot]||[]),{from:'me',text:d}]; this.setState({threadMsgs:cur, draft:''}); setTimeout(()=>{ const b=this.state.threadMsgs||this.msgsRaw; const c2=Object.assign({},b); c2[ot]=[...(c2[ot]||[]),{from:'agency',text:'Bien reçu 👌 on revient vers toi très vite.'}]; this.setState({threadMsgs:c2}); },1200); },
      rosterListShown: this.state.view==='roster' && this.state.rosterDetail==null,
      rosterDetailShown: this.state.view==='roster' && this.state.rosterDetail!=null,
      rd, backToRoster:()=>this.setState({rosterDetail:null}),
      exportContacts:()=>{ const base=this.state.contactsData||this.contactRaw; const head=['Marque','Contact','Role','Email','Telephone','Dernier contact','Historique','Tag']; const esc=(v)=>{v=(v==null?'':String(v));return /[";\\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v;}; const rows=base.map(k=>[k.brand,k.person,k.role,k.email||'',k.phone||'',k.last||'',k.deals||'',k.tag||''].map(esc).join(';')); const csv=[head.join(';')].concat(rows).join('\\r\\n'); const blob=new Blob(['\\ufeff'+csv],{type:'text/csv;charset=utf-8;'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='contacts-ttp.csv'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),1500); },
      importContacts:(e)=>{ const f=e.target.files&&e.target.files[0]; if(!f)return; const r=new FileReader(); r.onload=()=>{ const lines=String(r.result).split(/\\r?\\n/).filter(l=>l.trim()); if(!lines.length){e.target.value='';return;} const sep=lines[0].indexOf(';')>=0?';':','; const parse=(ln)=>{const out=[];let cur='',q=false;for(let i=0;i<ln.length;i++){const c=ln[i];if(q){if(c==='"'){if(ln[i+1]==='"'){cur+='"';i++;}else q=false;}else cur+=c;}else{if(c==='"')q=true;else if(c===sep){out.push(cur);cur='';}else cur+=c;}}out.push(cur);return out;}; const start=/marque|brand|contact/i.test(lines[0])?1:0; const tones=['indigo','cyan','signal']; const base=(this.state.contactsData||this.contactRaw).slice(); lines.slice(start).forEach(l=>{const c=parse(l); if(!(c[0]||c[1]))return; base.push({brand:(c[0]||'\u2014').trim(),person:(c[1]||'').trim(),role:(c[2]||'').trim(),email:(c[3]||'').trim(),phone:(c[4]||'').trim(),last:(c[5]||'jamais').trim(),deals:(c[6]||'\u2014').trim(),tag:(c[7]||'Import\u00e9').trim(),tone:tones[base.length%3]});}); this.setState({contactsData:base}); }; r.readAsText(f,'utf-8'); e.target.value=''; },
      vDocuments:this.state.view==='documents', goDocuments:()=>this.setState({view:'documents'}),
      docCreatorChips, docTypeChips, agencyDocs, agencyDocsEmpty:agencyDocs.length===0, docCreatorName,
      onAddDoc:(e)=>{ const f=e.target.files&&e.target.files[0]; if(!f)return; const ci2=this.state.docCreator!=null?this.state.docCreator:0; const ty=this.state.docType||'brief'; const fm=(b)=>b<1024?b+' o':(b<1048576?(b/1024).toFixed(0)+' Ko':(b/1048576).toFixed(1).replace('.',',')+' Mo'); const url=URL.createObjectURL(f); const b0=this.state.docs||this.docsRaw; const cur=Object.assign({},b0); const list=(cur[ci2]||[]).slice(); list.unshift({name:f.name,type:ty,date:'ajout\u00e9 auj.',size:fm(f.size),url,external:true}); cur[ci2]=list; this.setState({docs:cur}); e.target.value=''; },
      pDocuments:this.state.portalTab==='documents', myDocs, myDocsEmpty:myDocs.length===0,
      vMediaKit:this.state.view==='mediakit', goMediaKit:()=>this.setState({view:'mediakit'}), mk, mkStats, mkGeo, mkBrands, mkFormats, mkCreatorChips,
      vIdees:this.state.view==='idees', ideas, myIdeas, myIdeasEmpty:myIdeas.length===0,
      pTodo:this.state.portalTab==='todo', pIdees:this.state.portalTab==='idees',
      ntCreatorChips, ntPriorityChips, niCreatorChips, niStatusChips,
      showTodoForm:!!this.state.showTodoForm, openTodoForm:()=>this.setState({showTodoForm:true}), closeTodoForm:()=>this.setState({showTodoForm:false}),
      ntText:this.state.ntText||'', ntDue:this.state.ntDue||'', onNtText:(e)=>{const v=e.target.value;this.setState({ntText:v});}, onNtDue:(e)=>{const v=e.target.value;this.setState({ntDue:v});},
      addTodo:()=>{ const t=(this.state.ntText||'').trim(); if(!t)return; const cur=(this.state.todoItems||this.todoRaw).slice(); cur.push({text:t, desc:this.state.ntDesc||'', tag:(this.state.ntCreator?'CR\u00c9ATEUR':'AGENCE'), due:this.state.ntDue||'\u2014', creator:this.state.ntCreator||null, priority:this.state.ntPriority||'moyenne', source:'agency'}); this.setState({todoItems:cur, showTodoForm:false, ntText:'', ntDue:''}); },
      addTodoMe:()=>{ const t=(this.state.ntText||'').trim(); if(!t)return; const ci=this.state.creatorId; const nm=ci!=null?this.rosterRaw[ci].name:null; const cur=(this.state.todoItems||this.todoRaw).slice(); cur.push({text:t, desc:this.state.ntDesc||'', tag:'PERSO', due:this.state.ntDue||'\u2014', creator:nm, priority:this.state.ntPriority||'moyenne', source:'creator'}); this.setState({todoItems:cur, ntText:'', ntDue:''}); },
      ntDesc:this.state.ntDesc||'', onNtDesc:(e)=>{const v=e.target.value;this.setState({ntDesc:v});},
      showIdeaForm:!!this.state.showIdeaForm, toggleIdeaForm:()=>this.setState(s=>({showIdeaForm:!s.showIdeaForm})),
      niText:this.state.niText||'', onNiText:(e)=>{const v=e.target.value;this.setState({niText:v});},
      addIdea:()=>{ const t=(this.state.niText||'').trim(); if(!t)return; const cur=(this.state.ideasData||this.ideasRaw).slice(); cur.unshift({text:t, creator:this.state.niCreator||null, status:this.state.niStatus||'\u00c0 explorer', source:'agency'}); this.setState({ideasData:cur, showIdeaForm:false, niText:''}); },
      addIdeaMe:()=>{ const t=(this.state.niText||'').trim(); if(!t)return; const ci=this.state.creatorId; const nm=ci!=null?this.rosterRaw[ci].name:null; const cur=(this.state.ideasData||this.ideasRaw).slice(); cur.unshift({text:t, creator:nm, status:'Propos\u00e9e', source:'creator'}); this.setState({ideasData:cur, niText:''}); },
      showBriefForm:!!this.state.showBriefForm, openBriefForm:()=>this.setState({showBriefForm:true}), closeBriefForm:()=>this.setState({showBriefForm:false}),
      nbBrandV:this.state.nbBrand||'', nbDelivV:this.state.nbDeliv||'', nbDueV:this.state.nbDue||'', onNbBrand:(e)=>{const v=e.target.value;this.setState({nbBrand:v});}, onNbDeliv:(e)=>{const v=e.target.value;this.setState({nbDeliv:v});}, onNbDue:(e)=>{const v=e.target.value;this.setState({nbDue:v});},
      briefCreatorChips: this.rosterRaw.map((c,i)=>({ name:c.name.split(' ')[0], style:'padding:6px 12px;border-radius:18px;font:600 9px \'Inter\',sans-serif;cursor:pointer;'+((this.state.nbCreator||0)===i?'background:var(--text);color:var(--bg);':'background:var(--rowhover);color:var(--muted);'), pick:(()=>{const k=i;return ()=>this.setState({nbCreator:k});})() })),
      addBrief:()=>{ const br=(this.state.nbBrand||'').trim(); if(!br)return; const ci=this.state.nbCreator||0; const nm=this.rosterRaw[ci].name; const tone=this.rosterRaw[ci].tone; const cur=(this.state.briefItems||this.briefRaw).slice(); cur.unshift({brand:br, creator:nm, deliverables:this.state.nbDeliv||'\u2014', due:this.state.nbDue||'\u2014', status:'attente', tone:tone, who:nm}); this.setState({briefItems:cur, showBriefForm:false, nbBrand:'', nbDeliv:'', nbDue:''}); },
      showCreatorForm:!!this.state.showCreatorForm, openCreatorForm:()=>this.setState({showCreatorForm:true}), closeCreatorForm:()=>this.setState({showCreatorForm:false}),
      ncName:this.state.ncName||'', ncHandle:this.state.ncHandle||'', ncNiche:this.state.ncNiche||'', onNcName:(e)=>{const v=e.target.value;this.setState({ncName:v});}, onNcHandle:(e)=>{const v=e.target.value;this.setState({ncHandle:v});}, onNcNiche:(e)=>{const v=e.target.value;this.setState({ncNiche:v});},
      addCreator:()=>{ const nm=(this.state.ncName||'').trim(); if(!nm)return; const tones=['signal','indigo','cyan']; const nc={name:nm.toUpperCase(), handle:this.state.ncHandle||'@nouveau', niche:this.state.ncNiche||'Lifestyle', plat:'Instagram', followers:'0', reach:'0', er:'0%', ca:'0 \u20ac', status:'actif', tone:tones[this.rosterRaw.length%3], trend:0}; this.rosterRaw.push(nc); this.setState({showCreatorForm:false, ncName:'', ncHandle:'', ncNiche:''}); if(this._sb){ this._sb.from('creators').insert({sort_order:this.rosterRaw.length-1, name:nc.name, handle:nc.handle, niche:nc.niche, platform:nc.plat, followers:nc.followers, reach:nc.reach, er:nc.er, ca:nc.ca, status:nc.status, tone:nc.tone, trend:nc.trend}).select().then(({data,error})=>{ if(error){ console.warn('[supabase] insert:', error.message); return; } if(data&&data[0]){ nc.id=data[0].id; } }); } },
      onAddDocMe:(e)=>{ const f=e.target.files&&e.target.files[0]; if(!f)return; const ci2=this.state.creatorId!=null?this.state.creatorId:0; const fm=(b)=>b<1024?b+' o':(b<1048576?(b/1024).toFixed(0)+' Ko':(b/1048576).toFixed(1).replace('.',',')+' Mo'); const url=URL.createObjectURL(f); const b0=this.state.docs||this.docsRaw; const cur=Object.assign({},b0); const list=(cur[ci2]||[]).slice(); list.unshift({name:f.name,type:'autre',date:'ajouté auj.',size:fm(f.size),url,external:true}); cur[ci2]=list; this.setState({docs:cur}); e.target.value=''; },
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
      engChips, engPlatforms, engInputs, engFormula:cfg.formula, engPlatformLabel:cfg.label, engEr:erCalc.toFixed(1).replace('.',',')+'%', engVerdict, engVerdictStyle:"padding:5px 11px;border-radius:20px;font:600 9px 'Inter',sans-serif;background:"+this.toneHex(evTone,dark)+";color:"+(evTone==='signal'?'#10141A':'#FFFFFF')+";",
      priceChips, priceFormats, priceValue:fmtEur(priceN), priceCreatorName:pcr.name, priceMeta:fmtLabel[pf]+' · ER '+pcr.er+' · '+pcr.followers+' abonnés',
      showContact: oc!=null, openContactObj, closeContact:()=>this.setState({openContact:null}),
      objForm:this.state.objForm, openObjForm:()=>this.setState({objForm:true}), closeObjForm:()=>this.setState({objForm:false}),
      objName:this.state.no?this.state.no.name:'', objTarget:this.state.no?this.state.no.target:'', objPct:this.state.no?this.state.no.pct:'',
      onObjName:(e)=>{const v=e.target.value;this.setState(s=>({no:Object.assign({},s.no,{name:v})}));}, onObjTarget:(e)=>{const v=e.target.value;this.setState(s=>({no:Object.assign({},s.no,{target:v})}));}, onObjPct:(e)=>{const v=e.target.value;this.setState(s=>({no:Object.assign({},s.no,{pct:v})}));},
      addObjective:()=>{const n=this.state.no; if(!n||!n.name)return; const cur=this.state.customObjs||[]; this.setState({customObjs:[...cur,{name:String(n.name).toUpperCase(),target:n.target||'—',pct:Number(n.pct)||60}], objForm:false, no:{name:'',target:'',pct:''}});},
      upcoming,
      toggleTheme: () => this.setState(s => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
      isAgency: this.state.space === 'agency',
      isCreatorSpace: this.state.space === 'creator',
      needsLogin: this.state.space === 'creator' && this.state.creatorId == null,
      loggedIn: this.state.space === 'creator' && this.state.creatorId != null,
      enterPortal: () => this.setState({ space:'creator', mobileNav:false }),
      backToAgency: () => this.setState({ space:'agency' }),
      navApercu: [ this.navItem('apercu','◴','Dashboard'), this.navItem('objectifs','◎','Objectifs') ],
      navCreators: [ this.navItem('roster','◵','Roster'), this.navItem('engagement','✦','Engagement'), this.navItem('pricing','€','Pricing'), this.navItem('briefs','✎','Briefs'), this.navItem('todo','☑','To-do'), this.navItem('documents','▤','Documents'), this.navItem('mediakit','△','Media kit') ],
      navAgence: [ this.navItem('messages','✉','Messages'), this.navItem('contacts','☎','Contacts'), this.navItem('planning','◷','Planning'), this.navItem('contrats','▤','Contrats'), this.navItem('facturation','⊞','Facturation'), this.navItem('checklist','▣','Checklist') ],
      navOutils: [ this.navItem('prospection','⌖','Prospection'), this.navItem('alertes','⚠','Alertes'), this.navItem('idees','◆','Idées'), this.navItem('debrief','⟲','Debrief'), this.navItem('templates','▦','Templates') ],
      secApercuOpen:!(this.state.secClosed&&this.state.secClosed.apercu), secCreateursOpen:!(this.state.secClosed&&this.state.secClosed.creators), secAgenceOpen:!(this.state.secClosed&&this.state.secClosed.agence), secOutilsOpen:!(this.state.secClosed&&this.state.secClosed.outils),
      chevApercu:(this.state.secClosed&&this.state.secClosed.apercu)?'▸':'▾', chevCreateurs:(this.state.secClosed&&this.state.secClosed.creators)?'▸':'▾', chevAgence:(this.state.secClosed&&this.state.secClosed.agence)?'▸':'▾', chevOutils:(this.state.secClosed&&this.state.secClosed.outils)?'▸':'▾',
      toggleSecApercu:()=>this.setState(s=>({secClosed:Object.assign({},s.secClosed,{apercu:!(s.secClosed&&s.secClosed.apercu)})})), toggleSecCreateurs:()=>this.setState(s=>({secClosed:Object.assign({},s.secClosed,{creators:!(s.secClosed&&s.secClosed.creators)})})), toggleSecAgence:()=>this.setState(s=>({secClosed:Object.assign({},s.secClosed,{agence:!(s.secClosed&&s.secClosed.agence)})})), toggleSecOutils:()=>this.setState(s=>({secClosed:Object.assign({},s.secClosed,{outils:!(s.secClosed&&s.secClosed.outils)})})),
      portalNav: [ this.pNavItem('accueil','▦','Accueil'), this.pNavItem('messages','✉','Messages'), this.pNavItem('briefs','✎','Briefs'), this.pNavItem('todo','☑','To-do'), this.pNavItem('idees','◆','Idées'), this.pNavItem('planning','◷','Planning'), this.pNavItem('stats','✦','Stats'), this.pNavItem('documents','▤','Documents'), this.pNavItem('profil','◎','Profil') ],
      vApercu:this.state.view==='apercu', vRoster:this.state.view==='roster', vEngagement:this.state.view==='engagement',
      vPricing:this.state.view==='pricing', vBriefs:this.state.view==='briefs', vTodo:this.state.view==='todo',
      vFacturation:this.state.view==='facturation', vObjectifs:this.state.view==='objectifs', vContacts:this.state.view==='contacts',
      vPlanning:this.state.view==='planning', vProspection:this.state.view==='prospection',
      vModule: !!this.modules[this.state.view] && this.state.view!=='idees',
      pAccueil:this.state.portalTab==='accueil', pBriefs:this.state.portalTab==='briefs', pPlanning:this.state.portalTab==='planning', pStats:this.state.portalTab==='stats', pProfil:this.state.portalTab==='profil',
      goPStats:()=>this.setState({portalTab:'stats'}), goPBriefs:()=>this.setState({portalTab:'briefs'}), goPPlanning:()=>this.setState({portalTab:'planning'}), goPProfil:()=>this.setState({portalTab:'profil'}),
      goRoster, goFacturation, goObjectifs, goContacts, goPlanning, goBriefs, goTodo, goProspection, goEngagement, goRosterUgc,
      topCreators, pipeline, roster, rosterTabs, rosterCount, engagement, invoices, contacts, contactsViewTabs, contactsGrid, contactsList, objCreators, pricing, briefs, briefPreview, rdvPreview, todos, todoPreview: todos.slice(0,6), todoFilterTabs, prospectCols, mod, vTemplatesMsg, msgChannelTabs, msgTemplatesList,
      me, myAgenda, myTodos, myBriefs, loginCreators,
      agencyAvatarStyle, agencyInner: agencyPhoto?'':'MD', onPhotoAgency: mkPhoto('agency'), onPhotoMe: mkPhoto('c'+(ci!=null?ci:0)),
      weekdays: ['LUN','MAR','MER','JEU','VEN','SAM','DIM'],
      calendarCells: cells, eventTypes,
      showEventForm: this.state.showEventForm,
      openEventForm: () => this.setState({ showEventForm:true }),
      closeEventForm: () => this.setState({ showEventForm:false }),
      neTitle: this.state.ne.title, neDay: String(this.state.ne.day), neTime: this.state.ne.time,
      onNETitle: (e)=>{ const v=e.target.value; this.setState(s=>({ne:Object.assign({},s.ne,{title:v})})); },
      onNEDay: (e)=>{ const v=e.target.value; this.setState(s=>({ne:Object.assign({},s.ne,{day:v})})); },
      onNETime: (e)=>{ const v=e.target.value; this.setState(s=>({ne:Object.assign({},s.ne,{time:v})})); },
      addEvent: () => { const ne=this.state.ne; if(!ne.title) return; const cur=this.state.events||this.eventsRaw; this.setState({ events:[...cur, {day:Number(ne.day)||26, time:ne.time||'—', title:ne.title, type:ne.type, who:null}], showEventForm:false, ne:{day:ne.day,time:'',title:'',type:'call'} }); },
      addEventMe: () => { const ne=this.state.ne; if(!ne.title) return; const cr2=this.state.creatorId!=null?this.rosterRaw[this.state.creatorId].name:null; const cur=this.state.events||this.eventsRaw; this.setState({ events:[...cur, {day:Number(ne.day)||26, time:ne.time||'—', title:ne.title, type:ne.type, who:cr2}], showEventForm:false, ne:{day:ne.day,time:'',title:'',type:'call'} }); },
      incomeDots: this.dots(91, 42, sig, empty),
      paidDots: this.dots(91, 78, sig, empty),
      countdownDots: this.dots(18, 66, this.toneHex('amber',dark), empty),
      margeBars: this.bars([40,55,48,70,62,80,72,90,84,68,100], sig),
      growthBars: this.bars([30,45,38,60,52,70,64,82,76,58,90,84,72,100], dark ? '#70FC8E' : '#FFFFFF', 4).map((b,i,a)=> i===a.length-2 ? {style:b.style.replace(/background:[^;]+;/, 'background:'+sig+';')} : b),
      candleBars: this.bars([50,72,40,88,60,95,46,78,64], sig, 5),
    };
  }
}
