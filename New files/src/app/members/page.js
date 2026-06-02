'use client';
import { useState } from 'react';
import { T, Badge, GoldBtn, GhostBtn, FeatureBox, Body } from '@/components/ui';

function NavItem({item,isActive,onClick}){
  const[h,setH]=useState(false);
  return <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:isActive?"rgba(201,169,97,0.08)":h?"rgba(245,241,232,0.02)":"transparent",border:"none",borderLeft:`2px solid ${isActive?T.gold:"transparent"}`,color:isActive?T.gold:h?T.ivory:T.muted,fontFamily:T.sans,fontSize:13,fontWeight:isActive?400:300,letterSpacing:"0.04em",cursor:"pointer",transition:"all 0.2s",textAlign:"left",width:"100%"}}>
    <span style={{fontSize:14,width:20,textAlign:"center"}}>{item.icon}</span>{item.label}
  </button>;
}

function Sidebar({active,setActive}){
  const items=[
    {id:"dashboard",label:"Dashboard",icon:"◈"},
    {id:"events",label:"Wydarzenia",icon:"◆"},
    {id:"members",label:"Członkowie",icon:"◇"},
    {id:"gallery",label:"Galeria",icon:"▣"},
    {id:"concierge",label:"Concierge",icon:"✧"},
    {id:"profile",label:"Mój profil",icon:"●"},
  ];
  return <aside style={{width:240,background:"#080808",borderRight:`1px solid ${T.border}`,display:"flex",flexDirection:"column",height:"100vh",position:"fixed",left:0,top:0,zIndex:50}}>
    <div style={{padding:"28px 24px 20px",borderBottom:`1px solid ${T.border}`}}>
      <a href="/" style={{textDecoration:"none"}}><div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,letterSpacing:"0.25em",color:T.gold}}>AMBASSADOR CLUB</div></a>
      <div style={{fontFamily:T.serif,fontSize:11,fontStyle:"italic",color:T.dim,marginTop:4}}>Members Area</div>
    </div>
    <nav style={{flex:1,padding:"16px 12px",display:"flex",flexDirection:"column",gap:2}}>
      {items.map(n=><NavItem key={n.id} item={n} isActive={active===n.id} onClick={()=>setActive(n.id)} />)}
    </nav>
    <div style={{padding:"16px 20px",borderTop:`1px solid ${T.border}`}}>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:36,height:36,borderRadius:"50%",background:"rgba(201,169,97,0.1)",border:`1px solid ${T.goldBorder}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.serif,fontSize:16,color:T.gold}}>AW</div>
        <div><div style={{fontFamily:T.sans,fontSize:13,color:T.ivory}}>Aleksander W.</div><div style={{fontFamily:T.sans,fontSize:10,color:T.dim}}>Członek od 2024</div></div>
      </div>
      <a href="/" style={{display:"block",marginTop:16,fontFamily:T.sans,fontSize:11,color:T.dim,textDecoration:"none",letterSpacing:"0.08em"}}>← Wróć do strony</a>
    </div>
  </aside>;
}

function TopBar({title,subtitle}){
  return <header style={{height:64,borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 32px",background:"rgba(10,10,10,0.8)",backdropFilter:"blur(12px)",position:"sticky",top:0,zIndex:40}}>
    <div><h1 style={{fontFamily:T.serif,fontSize:24,fontWeight:400,color:T.ivory,margin:0}}>{title}</h1>{subtitle&&<span style={{fontFamily:T.sans,fontSize:11,color:T.dim}}>{subtitle}</span>}</div>
    <span style={{fontFamily:T.sans,fontSize:12,color:T.muted}}>PL</span>
  </header>;
}

function RsvpBtn({init=false}){
  const[confirmed,setConfirmed]=useState(init);
  return <button onClick={()=>setConfirmed(!confirmed)}
    style={{padding:"10px 22px",display:"flex",alignItems:"center",gap:8,background:confirmed?"rgba(201,169,97,0.1)":"transparent",border:`1px solid ${confirmed?T.gold:T.borderMed}`,color:confirmed?T.gold:T.ivory,fontFamily:T.sans,fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",cursor:"pointer",transition:"all 0.3s"}}>
    <div style={{width:16,height:16,border:`1px solid ${confirmed?T.gold:T.dim}`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:confirmed?T.gold:"transparent",transition:"all 0.3s"}}>{confirmed&&<span style={{color:T.bg,fontSize:9,fontWeight:700}}>✓</span>}</div>
    {confirmed?"Potwierdzono":"RSVP"}
  </button>;
}

function EventRow({ev}){
  const[h,setH]=useState(false);
  return <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{padding:"20px 24px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",borderLeft:`3px solid ${h?T.gold:"transparent"}`,transition:"all 0.2s"}}>
    <div style={{display:"flex",alignItems:"center",gap:20}}>
      <div style={{textAlign:"center",minWidth:48}}><div style={{fontFamily:T.serif,fontSize:24,fontWeight:300,color:T.gold,lineHeight:1}}>{ev.day}</div><div style={{fontFamily:T.sans,fontSize:10,color:T.dim,textTransform:"uppercase"}}>{ev.month}</div></div>
      <div><div style={{fontFamily:T.serif,fontSize:18,color:T.ivory}}>{ev.title}</div><div style={{fontFamily:T.sans,fontSize:12,color:T.dim,marginTop:2}}>{ev.loc}</div></div>
    </div>
    <div style={{display:"flex",alignItems:"center",gap:12}}>
      <Badge v={ev.tagColor}>{ev.tag}</Badge>
      <RsvpBtn init={ev.rsvp} />
    </div>
  </div>;
}

function MemberCard({m}){
  const[h,setH]=useState(false);
  return <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{background:T.bgCard,border:`1px solid ${h?T.goldBorder:T.border}`,transition:"all 0.3s",cursor:"pointer",overflow:"hidden"}}>
    <div style={{height:100,background:"linear-gradient(135deg,#0d0d0d,#1a1510)",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{width:48,height:48,borderRadius:"50%",background:T.goldMuted,border:`1px solid ${T.goldBorder}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.serif,fontSize:18,color:T.gold}}>{m.initials}</div>
    </div>
    <div style={{padding:"14px 16px"}}><div style={{fontFamily:T.serif,fontSize:16,color:T.ivory}}>{m.name}</div><div style={{fontFamily:T.sans,fontSize:11,color:T.dim,marginTop:2}}>{m.role}</div><div style={{marginTop:8}}><Badge>{m.sector}</Badge></div></div>
  </div>;
}

function AlbumCard({a}){
  const[h,setH]=useState(false);
  return <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{cursor:"pointer",transition:"all 0.3s",transform:h?"translateY(-3px)":"none"}}>
    <div style={{position:"relative",overflow:"hidden"}}><img src={a.img} alt={a.title} style={{width:"100%",height:200,objectFit:"cover",transition:"transform 0.5s",transform:h?"scale(1.05)":"scale(1)"}} />
      {h&&<div style={{position:"absolute",inset:0,background:"rgba(201,169,97,0.1)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontFamily:T.sans,fontSize:12,color:T.gold,letterSpacing:"0.1em",textTransform:"uppercase",padding:"8px 20px",border:`1px solid ${T.gold}`}}>Otwórz album</span></div>}
    </div>
    <div style={{background:T.bgCard,border:`1px solid ${T.border}`,borderTop:"none",padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontFamily:T.serif,fontSize:16,color:T.ivory}}>{a.title}</div><div style={{fontFamily:T.sans,fontSize:10,color:T.dim,marginTop:4}}>{a.date}</div></div><Badge v="outline">{a.count} zdjęć</Badge></div>
  </div>;
}

function ServiceCard({s}){
  const[h,setH]=useState(false);
  return <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{background:T.bgCard,border:`1px solid ${h?T.goldBorder:T.border}`,padding:"28px 24px",transition:"all 0.3s",transform:h?"translateY(-2px)":"none"}}>
    <div style={{fontSize:28,marginBottom:16}}>{s.icon}</div>
    <h3 style={{fontFamily:T.serif,fontSize:18,fontWeight:400,color:T.ivory,marginBottom:8}}>{s.title}</h3>
    <p style={{fontFamily:T.sans,fontSize:13,color:T.muted,fontWeight:300,lineHeight:1.7,marginBottom:16}}>{s.desc}</p>
    <Badge v={s.status==="Dostępne"?"green":s.status==="Sezonowo"?"blue":"outline"}>{s.status}</Badge>
  </div>;
}

function Toggle({label,defaultOn}){
  const[on,setOn]=useState(defaultOn);
  return <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 0",borderBottom:`1px solid ${T.border}`,cursor:"pointer"}} onClick={()=>setOn(!on)}>
    <span style={{fontFamily:T.sans,fontSize:14,color:T.ivory,fontWeight:300}}>{label}</span>
    <div style={{width:44,height:24,borderRadius:12,background:on?"rgba(201,169,97,0.3)":T.border,transition:"all 0.3s",position:"relative",padding:2}}>
      <div style={{width:20,height:20,borderRadius:10,background:on?T.gold:T.dim,transition:"all 0.3s",transform:on?"translateX(20px)":"translateX(0)"}} />
    </div>
  </div>;
}

/* ─── DASHBOARD ─── */
function DashboardView(){
  const events=[
    {title:"Wieczór Kolekcjonerski",day:"15",month:"mar",loc:"Pałac Zamoyskich",tag:"Sztuka",tagColor:"gold",rsvp:true},
    {title:"Wielka Gala Charytatywna",day:"28",month:"mar",loc:"Łazienki Królewskie",tag:"Filantropia",tagColor:"red",rsvp:false},
    {title:"Dzień Polo & Champagne",day:"12",month:"kwi",loc:"Polo Club Wrocław",tag:"Sport",tagColor:"blue",rsvp:false},
  ];
  return <>
    <TopBar title="Dashboard" subtitle="Witaj, Aleksandrze" />
    <div style={{padding:32}}>
      <div style={{background:"linear-gradient(135deg,rgba(201,169,97,0.06),rgba(92,26,27,0.06))",border:`1px solid ${T.goldBorder}`,padding:"32px 36px",marginBottom:32,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><h2 style={{fontFamily:T.serif,fontSize:28,fontWeight:300,color:T.ivory,margin:0}}>Dzień dobry, Aleksandrze</h2><p style={{fontFamily:T.sans,fontSize:14,color:T.muted,fontWeight:300,marginTop:8}}>Masz <span style={{color:T.gold,fontWeight:700}}>3 nadchodzące wydarzenia</span> i <span style={{color:T.gold,fontWeight:700}}>1 nowe powiadomienie</span>.</p></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:32}}>
        {[{v:"3",l:"Nadchodzące eventy"},{v:"18",l:"Uczestniczono w"},{v:"42",l:"Kontakty w klubie"},{v:"2",l:"Zaproszenia"}].map((s,i)=><div key={i} style={{background:T.bgCard,border:`1px solid ${T.border}`,padding:"24px 20px",textAlign:"center"}}><div style={{fontFamily:T.serif,fontSize:32,fontWeight:300,color:T.gold}}>{s.v}</div><div style={{fontFamily:T.sans,fontSize:11,color:T.dim,letterSpacing:"0.08em",textTransform:"uppercase",marginTop:4}}>{s.l}</div></div>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:24}}>
        <div style={{background:T.bgCard,border:`1px solid ${T.border}`}}>
          <div style={{padding:"20px 24px",borderBottom:`1px solid ${T.border}`}}><span style={{fontFamily:T.sans,fontSize:11,letterSpacing:"0.12em",color:T.gold,textTransform:"uppercase"}}>Nadchodzące wydarzenia</span></div>
          {events.map((ev,i)=><EventRow key={i} ev={ev} />)}
        </div>
        <div style={{background:T.bgCard,border:`1px solid ${T.border}`}}>
          <div style={{padding:"20px 24px",borderBottom:`1px solid ${T.border}`}}><span style={{fontFamily:T.sans,fontSize:11,letterSpacing:"0.12em",color:T.gold,textTransform:"uppercase"}}>Aktywność</span></div>
          {[{text:"Potwierdziłeś udział w Wieczorze",time:"2h temu",icon:"✓"},{text:"Nowe zdjęcia z Gali dostępne",time:"1 dzień",icon:"▣"},{text:"Katarzyna M. wysłała wiadomość",time:"2 dni",icon:"✉"},{text:"Nowe wydarzenie: Dzień Polo",time:"4 dni",icon:"◆"}].map((a,i)=><div key={i} style={{padding:"16px 24px",borderBottom:`1px solid ${T.border}`,display:"flex",gap:12,alignItems:"flex-start"}}><div style={{width:28,height:28,borderRadius:"50%",background:T.goldMuted,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.serif,fontSize:12,color:T.gold,flexShrink:0}}>{a.icon}</div><div><div style={{fontFamily:T.sans,fontSize:13,color:T.muted,fontWeight:300}}>{a.text}</div><div style={{fontFamily:T.sans,fontSize:10,color:T.dim,marginTop:4}}>{a.time}</div></div></div>)}
        </div>
      </div>
    </div>
  </>;
}

/* ─── EVENTS ─── */
function EventsView(){
  const events=[
    {title:"Wieczór Kolekcjonerski",day:"15",month:"mar",loc:"Pałac Zamoyskich · 19:00 · Black tie",tag:"Sztuka",tagColor:"gold",rsvp:true},
    {title:"Wielka Gala Charytatywna",day:"28",month:"mar",loc:"Łazienki · 18:30 · White tie",tag:"Filantropia",tagColor:"red",rsvp:false},
    {title:"Dzień Polo & Champagne",day:"12",month:"kwi",loc:"Polo Club Wrocław · 11:00 · Smart casual",tag:"Sport",tagColor:"blue",rsvp:false},
    {title:"Degustacja Win",day:"25",month:"kwi",loc:"Piwnice Biskupie · 20:00 · Business casual",tag:"Best of Poland",tagColor:"outline",rsvp:false},
  ];
  return <>
    <TopBar title="Wydarzenia" subtitle="Pełny kalendarz klubowy" />
    <div style={{padding:32}}>
      <div style={{background:T.bgCard,border:`1px solid ${T.border}`}}>
        {events.map((ev,i)=><EventRow key={i} ev={ev} />)}
      </div>
    </div>
  </>;
}

/* ─── MEMBERS ─── */
function MembersView(){
  const members=[
    {name:"Katarzyna Malinowska",initials:"KM",role:"CEO, Aurora Capital",sector:"Finanse"},
    {name:"Tomasz Borkowski",initials:"TB",role:"Borkowski Yachts",sector:"Jachting"},
    {name:"Maria Zamoyska",initials:"MZ",role:"Fundacja Zamoyskich",sector:"Filantropia"},
    {name:"Piotr Nowak",initials:"PN",role:"CTO, TechVentures",sector:"Technologia"},
    {name:"Anna Lewandowska",initials:"AL",role:"Atelier AL",sector:"Moda"},
    {name:"Jan Wiśniewski",initials:"JW",role:"Wiśniewski & Partners",sector:"Prawo"},
    {name:"Magdalena Kowalczyk",initials:"MK",role:"Galeria Narodowa",sector:"Sztuka"},
    {name:"Robert Szymański",initials:"RS",role:"RS Holdings",sector:"Nieruchomości"},
  ];
  return <>
    <TopBar title="Katalog członków" subtitle={`${members.length} członków`} />
    <div style={{padding:32}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
        {members.map((m,i)=><MemberCard key={i} m={m} />)}
      </div>
    </div>
  </>;
}

/* ─── GALLERY ─── */
function GalleryView(){
  const albums=[
    {title:"Gala Noworoczna 2026",date:"10 sty 2026",count:48,img:"/images/palace-interior.webp"},
    {title:"Wieczór Kolekcjonerski",date:"15 gru 2025",count:32,img:"/images/gallery-event.webp"},
    {title:"Turniej Golfowy",date:"18 wrz 2025",count:64,img:"/images/golf.webp"},
    {title:"Regaty na Mazurach",date:"10 lip 2025",count:56,img:"/images/yacht.webp"},
    {title:"Noc Operowa",date:"2 cze 2025",count:28,img:"/images/amber.webp"},
    {title:"Kolacja z Mistrzem Kuchni",date:"14 kwi 2025",count:24,img:"/images/fine-dining.webp"},
  ];
  return <>
    <TopBar title="Galeria prywatna" subtitle="Zdjęcia dostępne wyłącznie dla uczestników" />
    <div style={{padding:32}}><div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>{albums.map((a,i)=><AlbumCard key={i} a={a} />)}</div></div>
  </>;
}

/* ─── CONCIERGE ─── */
function ConciergeView(){
  const services=[
    {icon:"🏇",title:"Loże VIP — Żużel & Wyścigi",desc:"Rezerwacja lóż na zawodach.",status:"Dostępne"},
    {icon:"🎨",title:"Aukcje sztuki",desc:"Dostęp do prywatnych aukcji.",status:"Na zapytanie"},
    {icon:"🏰",title:"Prywatne zwiedzania",desc:"Zamki, pałace, kolekcje prywatne.",status:"Dostępne"},
    {icon:"🍷",title:"Prywatne kolacje",desc:"Kolacje degustacyjne w rezydencjach.",status:"Na zapytanie"},
    {icon:"⛵",title:"Jachty & regaty",desc:"Wynajem jachtów, szkolenia.",status:"Sezonowo"},
    {icon:"🏌️",title:"Golf — członkostwo",desc:"Najlepsze kluby golfowe w Polsce.",status:"Dostępne"},
  ];
  return <>
    <TopBar title="Concierge Premium" subtitle="Twój prywatny asystent klubowy" />
    <div style={{padding:32}}>
      <div style={{background:T.bgCard,border:`1px solid ${T.goldBorder}`,padding:"28px 32px",marginBottom:32,display:"grid",gridTemplateColumns:"1fr auto",alignItems:"center",gap:32}}>
        <div><h3 style={{fontFamily:T.serif,fontSize:22,fontWeight:300,color:T.ivory,marginBottom:8}}>Twój concierge: <span style={{color:T.gold}}>Aleksandra Nowicka</span></h3><p style={{fontFamily:T.sans,fontSize:14,color:T.muted,fontWeight:300}}>pon–pt 10:00–18:00 · concierge@ambassadorclub.pl</p></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>{services.map((s,i)=><ServiceCard key={i} s={s} />)}</div>
    </div>
  </>;
}

/* ─── PROFILE ─── */
function ProfileView(){
  const[tab,setTab]=useState("info");
  return <>
    <TopBar title="Mój profil" subtitle="Zarządzaj swoimi danymi" />
    <div style={{padding:32}}>
      <div style={{background:T.bgCard,border:`1px solid ${T.border}`,padding:"32px 36px",display:"flex",gap:28,alignItems:"center",marginBottom:24}}>
        <div style={{width:80,height:80,borderRadius:"50%",background:T.goldMuted,border:`2px solid ${T.gold}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.serif,fontSize:28,color:T.gold}}>AW</div>
        <div style={{flex:1}}><h2 style={{fontFamily:T.serif,fontSize:28,fontWeight:300,color:T.ivory,margin:0}}>Aleksander Wiśniewski</h2><p style={{fontFamily:T.sans,fontSize:13,color:T.muted,marginTop:4}}>CEO, TechVentures · Warszawa · Członek od 2024</p></div>
      </div>
      <div style={{display:"flex",gap:0,borderBottom:`1px solid ${T.border}`,marginBottom:24}}>
        {[{id:"info",l:"Dane osobowe"},{id:"prefs",l:"Preferencje"}].map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"14px 28px",background:"transparent",border:"none",borderBottom:`2px solid ${tab===t.id?T.gold:"transparent"}`,color:tab===t.id?T.gold:T.muted,fontFamily:T.sans,fontSize:12,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer",marginBottom:-1}}>{t.l}</button>)}
      </div>
      {tab==="info"&&<div style={{maxWidth:600}}>
        {[["Imię i nazwisko","Aleksander Wiśniewski"],["Email","aleksander@techventures.pl"],["Telefon","+48 600 123 456"],["Firma","TechVentures sp. z o.o."],["Stanowisko","CEO & Founder"],["Miasto","Warszawa"],["Zainteresowania","Technologia, Tenis, Architektura"]].map(([l,v],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"16px 0",borderBottom:`1px solid ${T.border}`}}><span style={{fontFamily:T.sans,fontSize:12,color:T.dim,letterSpacing:"0.08em",textTransform:"uppercase"}}>{l}</span><span style={{fontFamily:T.sans,fontSize:14,color:T.ivory,fontWeight:300}}>{v}</span></div>)}
      </div>}
      {tab==="prefs"&&<div style={{maxWidth:600}}>
        <h3 style={{fontFamily:T.serif,fontSize:20,color:T.ivory,fontWeight:400,marginBottom:20}}>Typy wydarzeń</h3>
        <Toggle label="Sport" defaultOn={true} /><Toggle label="Sztuka i Kultura" defaultOn={true} /><Toggle label="Filantropia" defaultOn={true} /><Toggle label="Biznes" defaultOn={true} /><Toggle label="Best of Poland" defaultOn={false} />
        <h3 style={{fontFamily:T.serif,fontSize:20,color:T.ivory,fontWeight:400,margin:"32px 0 20px"}}>Powiadomienia</h3>
        <Toggle label="Email o nowych wydarzeniach" defaultOn={true} /><Toggle label="SMS przypomnienie 24h przed" defaultOn={true} /><Toggle label="Newsletter klubowy" defaultOn={false} />
      </div>}
    </div>
  </>;
}

/* ─── MAIN ─── */
export default function MembersArea(){
  const[page,setPage]=useState("dashboard");
  const views={dashboard:DashboardView,events:EventsView,members:MembersView,gallery:GalleryView,concierge:ConciergeView,profile:ProfileView};
  const View=views[page]||DashboardView;
  return <>
    <div style={{background:T.bg,color:T.ivory,minHeight:"100vh",display:"flex"}}>
      <Sidebar active={page} setActive={setPage} />
      <main style={{flex:1,marginLeft:240,minHeight:"100vh"}}><View /></main>
    </div>
  </>;
}
