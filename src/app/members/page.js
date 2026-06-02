'use client';
import { T, Eyebrow, Heading, Body, Divider, GoldBtn, GhostBtn, FeatureBox, Section, Container } from '@/components/ui';
import Navbar from '@/components/Navbar';
export default function MembersPage(){
  return <>
    <Navbar />
    <div style={{paddingTop:72,minHeight:"100vh",background:T.bg}}>
      <Section padding="140px 48px 60px"><div style={{textAlign:"center",maxWidth:600,margin:"0 auto"}}>
        <Eyebrow>STREFA CZŁONKOWSKA</Eyebrow>
        <Heading size="xl">Panel członkowski</Heading>
        <div style={{marginTop:24}}><Divider /></div>
        <div style={{marginTop:24}}><Body center>Strefa członkowska jest w budowie. Wkrótce znajdziesz tu dashboard, kalendarz wydarzeń z RSVP, galerię, katalog członków i concierge.</Body></div>
      </div></Section>
      <Section bg={T.bgAlt}><Container>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24}}>
          <FeatureBox icon="◈" title="Dashboard" desc="Powitanie, skróty, powiadomienia" />
          <FeatureBox icon="◆" title="Kalendarz & RSVP" desc="Szczegóły, potwierdzenia, +1" />
          <FeatureBox icon="◇" title="Galeria prywatna" desc="Zdjęcia i wideo z wydarzeń" />
          <FeatureBox icon="✧" title="Concierge VIP" desc="Rezerwacje i dostępy premium" />
        </div>
        <div style={{textAlign:"center",marginTop:48}}><GhostBtn href="/login">Zaloguj się aby uzyskać dostęp</GhostBtn></div>
      </Container></Section>
    </div>
  </>;
}
