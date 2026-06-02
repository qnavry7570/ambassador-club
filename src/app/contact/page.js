'use client';
import { useState } from 'react';
import PageShell from '@/components/PageShell';
import { T, Eyebrow, Heading, Body, Divider, GoldBtn, Section, Container, GoldLine } from '@/components/ui';
function Input({label,placeholder,type="text"}){const[f,setF]=useState(false);return<div style={{marginBottom:20}}>{label&&<label style={{display:"block",fontFamily:T.sans,fontSize:11,letterSpacing:"0.12em",color:T.muted,textTransform:"uppercase",marginBottom:8}}>{label}</label>}<input type={type} placeholder={placeholder} onFocus={()=>setF(true)} onBlur={()=>setF(false)} style={{width:"100%",padding:"14px 16px",background:"rgba(22,22,22,0.6)",border:"1px solid "+(f?T.gold:T.border),color:T.ivory,fontFamily:T.sans,fontSize:14,fontWeight:300,outline:"none",transition:"all 0.2s"}} /></div>;}
function TextArea({label,placeholder}){const[f,setF]=useState(false);return<div style={{marginBottom:20}}>{label&&<label style={{display:"block",fontFamily:T.sans,fontSize:11,letterSpacing:"0.12em",color:T.muted,textTransform:"uppercase",marginBottom:8}}>{label}</label>}<textarea placeholder={placeholder} rows={5} onFocus={()=>setF(true)} onBlur={()=>setF(false)} style={{width:"100%",padding:"14px 16px",resize:"vertical",background:"rgba(22,22,22,0.6)",border:"1px solid "+(f?T.gold:T.border),color:T.ivory,fontFamily:T.sans,fontSize:14,fontWeight:300,outline:"none",transition:"all 0.2s"}} /></div>;}
export default function ContactPage(){
  return <PageShell>
    <Section padding="140px 48px 60px"><div style={{textAlign:"center"}}><Eyebrow>KONTAKT</Eyebrow><Heading size="xl">Skontaktuj się z nami</Heading><div style={{marginTop:24}}><Divider /></div></div></Section>
    <Section bg={T.bgAlt} padding="80px 48px 120px"><Container maxWidth={1100}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:80}}>
        <div><Eyebrow center={false}>NAPISZ DO NAS</Eyebrow><div style={{marginTop:8}}><Input label="Imię i nazwisko" placeholder="Jan Kowalski" /><Input label="Email" placeholder="jan@example.com" type="email" /><TextArea label="Wiadomość" placeholder="Twoja wiadomość..." /><GoldBtn>Wyślij wiadomość</GoldBtn></div></div>
        <div><Eyebrow center={false}>INFORMACJE</Eyebrow><div style={{marginTop:8}}>
          <div style={{marginBottom:36}}><div style={{fontFamily:T.sans,fontSize:11,letterSpacing:"0.12em",color:T.gold,textTransform:"uppercase",marginBottom:12}}>Biuro klubu</div><Body>ul. Foksal 3/5</Body><Body>00-366 Warszawa</Body></div>
          <div style={{marginBottom:36}}><div style={{fontFamily:T.sans,fontSize:11,letterSpacing:"0.12em",color:T.gold,textTransform:"uppercase",marginBottom:12}}>Concierge</div><Body>concierge@ambassadorclub.pl</Body><Body>+48 22 000 00 00</Body><div style={{marginTop:8}}><Body sz={13} muted>Dostępny pon-pt 10:00-18:00</Body></div></div>
          <div style={{marginBottom:36}}><div style={{fontFamily:T.sans,fontSize:11,letterSpacing:"0.12em",color:T.gold,textTransform:"uppercase",marginBottom:12}}>Prasa</div><Body>press@ambassadorclub.pl</Body></div>
        </div></div>
      </div>
    </Container></Section>
  </PageShell>;
}
