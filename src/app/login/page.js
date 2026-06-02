'use client';
import { useState } from 'react';
import { T, Eyebrow, Heading, Body, Divider, GoldBtn, GhostBtn } from '@/components/ui';
function AuthInput({label,placeholder,type="text",icon}){const[f,setF]=useState(false);return<div style={{marginBottom:20}}>{label&&<label style={{display:"block",fontFamily:T.sans,fontSize:11,letterSpacing:"0.12em",color:T.muted,textTransform:"uppercase",marginBottom:8}}>{label}</label>}<div style={{position:"relative"}}>{icon&&<div style={{position:"absolute",left:16,top:"50%",transform:"translateY(-50%)",fontSize:16,color:f?T.gold:T.dim}}>{icon}</div>}<input type={type} placeholder={placeholder} onFocus={()=>setF(true)} onBlur={()=>setF(false)} style={{width:"100%",padding:icon?"15px 16px 15px 44px":"15px 16px",background:"rgba(22,22,22,0.6)",border:"1px solid "+(f?T.gold:T.border),color:T.ivory,fontFamily:T.sans,fontSize:15,fontWeight:300,outline:"none",transition:"all 0.25s"}} /></div></div>;}
export default function LoginPage(){
  return <div style={{minHeight:"100vh",display:"flex",background:T.bg}}>
    <div style={{width:480,flexShrink:0,display:"flex",flexDirection:"column",justifyContent:"center",padding:"60px 56px",background:"linear-gradient(135deg,#0d0b08,#1a1510,#0d0b08)",borderRight:"1px solid rgba(201,169,97,0.08)",position:"relative"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 50%,rgba(201,169,97,0.04),transparent 70%)"}} />
      <div style={{position:"relative"}}>
        <a href="/" style={{textDecoration:"none"}}><div style={{fontFamily:T.sans,fontSize:13,fontWeight:700,letterSpacing:"0.3em",color:T.gold,marginBottom:6}}>AMBASSADOR CLUB</div><div style={{fontFamily:T.serif,fontSize:14,fontStyle:"italic",color:T.dim}}>Best of Poland</div></a>
        <div style={{marginTop:56}}><h2 style={{fontFamily:T.serif,fontSize:36,fontWeight:300,color:T.ivory,lineHeight:1.2}}>Where Poland's Finest Meet</h2></div>
        <div style={{margin:"24px 0",width:48,height:1,background:T.gold}} />
        <Body>Ekskluzywny klub łączący liderów biznesu, sportu, sztuki i filantropii.</Body>
        <div style={{marginTop:64}}><Divider /></div>
      </div>
    </div>
    <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"60px 48px"}}>
      <div style={{width:420}}>
        <Eyebrow>STREFA CZŁONKOWSKA</Eyebrow>
        <Heading size="md">Witaj ponownie</Heading>
        <div style={{marginTop:8}}><Body center>Zaloguj się do swojego konta</Body></div>
        <div style={{marginTop:40}}>
          <AuthInput label="Email" placeholder="twoj@email.com" type="email" icon="✉" />
          <AuthInput label="Hasło" placeholder="••••••••" type="password" icon="🔒" />
          <div style={{marginTop:24}}><GoldBtn large>Zaloguj się</GoldBtn></div>
          <div style={{textAlign:"center",marginTop:32}}><Body sz={12} muted>Nie masz konta?</Body><div style={{marginTop:8}}><a href="/membership" style={{fontFamily:T.sans,fontSize:12,color:T.gold,textDecoration:"none"}}>Aplikuj o członkostwo →</a></div></div>
        </div>
      </div>
    </div>
  </div>;
}
