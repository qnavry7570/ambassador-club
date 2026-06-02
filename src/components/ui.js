'use client';
import { useState } from 'react';

export const T = {
  gold:"#C9A961",goldLight:"#D4B87A",goldDark:"#A8883F",
  goldMuted:"rgba(201,169,97,0.15)",goldBorder:"rgba(201,169,97,0.25)",
  ivory:"#F5F1E8",ivoryDim:"#E8E3D8",
  bg:"#0A0A0A",bgAlt:"#0F0F0F",bgCard:"#161616",
  burgundy:"#5C1A1B",burgundyLight:"#7A2829",
  muted:"#8A8578",dim:"#5A574E",ghost:"#3A3830",
  border:"rgba(245,241,232,0.06)",borderMed:"rgba(245,241,232,0.12)",
  serif:"'Cormorant Garamond',Georgia,serif",
  sans:"'Lato',sans-serif",
};

export function GoldBtn({children,large,onClick,href}){
  const[h,setH]=useState(false);
  const style={background:h?T.goldLight:T.gold,color:T.bg,border:"none",padding:large?"18px 48px":"14px 36px",fontSize:large?15:13,fontFamily:T.sans,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",cursor:"pointer",transition:"all 0.3s",transform:h?"translateY(-1px)":"none",display:"inline-block",textDecoration:"none"};
  if(href) return <a href={href} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={style}>{children}</a>;
  return <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={style}>{children}</button>;
}

export function GhostBtn({children,large,onClick,href}){
  const[h,setH]=useState(false);
  const style={background:"transparent",color:h?T.gold:T.ivory,border:`1px solid ${h?T.gold:"rgba(245,241,232,0.25)"}`,padding:large?"18px 48px":"14px 36px",fontSize:large?15:13,fontFamily:T.sans,fontWeight:400,letterSpacing:"0.12em",textTransform:"uppercase",cursor:"pointer",transition:"all 0.3s",display:"inline-block",textDecoration:"none"};
  if(href) return <a href={href} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={style}>{children}</a>;
  return <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={style}>{children}</button>;
}

export function Divider(){
  return <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,width:200,margin:"0 auto"}}>
    <div style={{flex:1,height:1,background:`linear-gradient(90deg,transparent,${T.gold})`}} />
    <svg width="16" height="16" viewBox="0 0 18 18"><path d="M9 0L11.5 6.5L18 9L11.5 11.5L9 18L6.5 11.5L0 9L6.5 6.5Z" fill={T.gold} opacity={0.6}/></svg>
    <div style={{flex:1,height:1,background:`linear-gradient(90deg,${T.gold},transparent)`}} />
  </div>;
}

export function Eyebrow({children,center=true}){
  return <div style={{fontFamily:T.sans,fontSize:11,fontWeight:400,letterSpacing:"0.3em",color:T.gold,textTransform:"uppercase",textAlign:center?"center":"left",marginBottom:16}}>{children}</div>;
}

export function Heading({children,size="lg",center=true}){
  const s={hero:72,xl:52,lg:42,md:32,sm:24};
  return <h2 style={{fontFamily:T.serif,fontSize:s[size],fontWeight:300,color:T.ivory,textAlign:center?"center":"left",lineHeight:1.15,margin:0,whiteSpace:"pre-line"}}>{children}</h2>;
}

export function Body({children,center=false,muted=false,italic=false,sz=16}){
  return <p style={{fontFamily:italic?T.serif:T.sans,fontSize:sz,fontWeight:300,fontStyle:italic?"italic":"normal",color:muted?T.dim:T.muted,lineHeight:1.8,textAlign:center?"center":"left",margin:0}}>{children}</p>;
}

export function Badge({children,v="gold"}){
  const s={gold:{background:"rgba(201,169,97,0.12)",color:T.gold},outline:{background:"transparent",color:T.muted,border:`1px solid ${T.borderMed}`}};
  return <span style={{...s[v],display:"inline-block",padding:"4px 14px",fontFamily:T.sans,fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase"}}>{children}</span>;
}

export function PillarCard({title,desc,img,tag,href}){
  const[h,setH]=useState(false);
  return <a href={href||"#"} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{background:T.bgCard,border:`1px solid ${h?T.goldBorder:T.border}`,cursor:"pointer",transition:"all 0.4s",transform:h?"translateY(-4px)":"none",overflow:"hidden",display:"block",textDecoration:"none"}}>
    <div style={{width:"100%",height:220,overflow:"hidden"}}>
      <img src={img} alt={title} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.6s",transform:h?"scale(1.05)":"scale(1)"}} loading="lazy" />
    </div>
    <div style={{padding:"24px 20px"}}>
      <div style={{fontFamily:T.sans,fontSize:10,fontWeight:700,letterSpacing:"0.2em",color:T.gold,marginBottom:8}}>◆ {tag}</div>
      <h3 style={{fontFamily:T.serif,fontSize:22,fontWeight:400,color:T.ivory,marginBottom:8,lineHeight:1.3}}>{title}</h3>
      <p style={{fontFamily:T.sans,fontSize:14,fontWeight:300,color:T.muted,lineHeight:1.7,margin:0}}>{desc}</p>
    </div>
  </a>;
}

export function EventCard({title,date,location,tag}){
  const[h,setH]=useState(false);
  return <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{background:T.bgCard,border:`1px solid ${T.border}`,padding:32,position:"relative",transition:"all 0.3s",transform:h?"translateY(-2px)":"none",borderTop:`2px solid ${h?T.gold:"transparent"}`}}>
    <div style={{fontFamily:T.sans,fontSize:10,fontWeight:700,letterSpacing:"0.15em",color:T.gold,textTransform:"uppercase",marginBottom:16}}>{tag}</div>
    <div style={{fontFamily:T.serif,fontSize:22,fontWeight:400,color:T.ivory,marginBottom:16,lineHeight:1.3}}>{title}</div>
    <div style={{fontFamily:T.sans,fontSize:13,color:T.muted,marginBottom:8}}>{date}</div>
    <div style={{fontFamily:T.sans,fontSize:12,color:T.dim,fontStyle:"italic"}}>{location}</div>
    <div style={{position:"absolute",top:20,right:20,fontSize:14,color:"rgba(201,169,97,0.4)"}}>🔒</div>
  </div>;
}

export function FeatureBox({icon,title,desc}){
  const[h,setH]=useState(false);
  return <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{background:h?"rgba(22,22,22,0.9)":"rgba(22,22,22,0.6)",border:`1px solid ${h?T.goldBorder:T.goldMuted}`,padding:"32px 24px",textAlign:"center",transition:"all 0.3s"}}>
    <div style={{width:48,height:48,margin:"0 auto 16px",border:`1px solid ${T.gold}`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.serif,fontSize:20,color:T.gold,background:h?"rgba(201,169,97,0.08)":"transparent",transition:"all 0.3s"}}>{icon}</div>
    <div style={{fontFamily:T.sans,fontSize:13,fontWeight:400,color:T.ivory,letterSpacing:"0.05em"}}>{title}</div>
    {desc&&<div style={{fontFamily:T.sans,fontSize:12,fontWeight:300,color:T.dim,marginTop:6}}>{desc}</div>}
  </div>;
}

export function Section({children,bg,padding="120px 48px",id}){
  return <section id={id} style={{background:bg||T.bg,padding,position:"relative",overflow:"hidden"}}>{children}</section>;
}

export function Container({children,maxWidth=1200}){
  return <div style={{maxWidth,margin:"0 auto"}}>{children}</div>;
}

export function GoldLine({w=60}){return <div style={{width:w,height:1,background:T.gold}} />;}

export function DisciplineCard({name,desc,img}){
  const[h,setH]=useState(false);
  return <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{background:T.bgCard,border:`1px solid ${h?T.goldBorder:T.border}`,transition:"all 0.35s",transform:h?"translateY(-3px)":"none",overflow:"hidden"}}>
    <div style={{width:"100%",height:180,overflow:"hidden"}}>
      <img src={img} alt={name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.5s",transform:h?"scale(1.05)":"scale(1)"}} loading="lazy" />
    </div>
    <div style={{padding:"24px 20px"}}>
      <h3 style={{fontFamily:T.serif,fontSize:20,fontWeight:400,color:T.ivory,marginBottom:8}}>{name}</h3>
      <Body sz={14}>{desc}</Body>
    </div>
  </div>;
}
