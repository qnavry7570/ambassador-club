'use client';
import { useState, useEffect } from 'react';
import { T } from './ui';

function NavLink({href,children,active}){
  const[h,setH]=useState(false);
  return <a href={href} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{fontFamily:T.sans,fontSize:12,fontWeight:active?400:300,letterSpacing:"0.08em",color:active?T.gold:T.ivory,textDecoration:"none",opacity:active?1:h?1:0.7,transition:"all 0.2s"}}>{children}</a>;
}

export default function Navbar(){
  const[scrolled,setScrolled]=useState(false);
  const[pillarsOpen,setPillarsOpen]=useState(false);
  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>60);
    window.addEventListener("scroll",h);
    return()=>window.removeEventListener("scroll",h);
  },[]);
  return <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"0 48px",height:72,display:"flex",alignItems:"center",justifyContent:"space-between",background:scrolled?"rgba(10,10,10,0.95)":"transparent",backdropFilter:scrolled?"blur(20px)":"none",borderBottom:scrolled?"1px solid rgba(201,169,97,0.1)":"none",transition:"all 0.4s"}}>
    <a href="/" style={{display:"flex",alignItems:"baseline",gap:12,textDecoration:"none"}}>
      <span style={{fontFamily:T.sans,fontSize:13,fontWeight:700,letterSpacing:"0.25em",color:T.gold}}>AMBASSADOR CLUB</span>
      <span style={{fontFamily:T.serif,fontSize:12,fontStyle:"italic",color:T.dim,letterSpacing:"0.1em"}}>Best of Poland</span>
    </a>
    <div style={{display:"flex",alignItems:"center",gap:28}}>
      <NavLink href="/about">O Klubie</NavLink>
      <div style={{position:"relative"}} onMouseEnter={()=>setPillarsOpen(true)} onMouseLeave={()=>setPillarsOpen(false)}>
        <span style={{fontFamily:T.sans,fontSize:12,fontWeight:300,letterSpacing:"0.08em",color:T.ivory,cursor:"pointer",opacity:0.7}}>Filary ▾</span>
        {pillarsOpen&&<div style={{position:"absolute",top:"100%",left:-16,background:"rgba(15,15,15,0.98)",border:`1px solid ${T.border}`,padding:"8px 0",minWidth:200,backdropFilter:"blur(20px)",marginTop:8}}>
          {[{href:"/sport",l:"Sport"},{href:"/culture",l:"Sztuka i Kultura"},{href:"/philanthropy",l:"Filantropia"},{href:"/bestofpoland",l:"Best of Poland"}].map(p=>
            <a key={p.href} href={p.href} style={{display:"block",padding:"10px 24px",fontFamily:T.sans,fontSize:12,color:T.muted,textDecoration:"none",letterSpacing:"0.05em"}}>{p.l}</a>
          )}
        </div>}
      </div>
      <NavLink href="/events">Wydarzenia</NavLink>
      <NavLink href="/membership">Członkostwo</NavLink>
      <NavLink href="/journal">Journal</NavLink>
      <NavLink href="/contact">Kontakt</NavLink>
      <a href="/login" style={{background:"transparent",border:`1px solid ${T.gold}`,color:T.gold,padding:"8px 20px",fontSize:11,fontFamily:T.sans,letterSpacing:"0.15em",textTransform:"uppercase",textDecoration:"none"}}>Members Area</a>
    </div>
  </nav>;
}
