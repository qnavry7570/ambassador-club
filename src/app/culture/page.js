'use client';
import PageShell from '@/components/PageShell';
import { T, Eyebrow, Heading, Body, Divider, GoldBtn, Section, Container, DisciplineCard } from '@/components/ui';
export default function PillarPage(){
  return <PageShell>
    <Section padding="140px 48px 100px"><div style={{textAlign:"center",maxWidth:800,margin:"0 auto"}}><Eyebrow>FILAR: SZTUKA I KULTURA</Eyebrow><Heading size="xl">Świat, który docenia piękno i głębię</Heading><div style={{marginTop:24}}><Divider /></div><div style={{marginTop:24}}><Body center>Mecenat, kolekcjonerstwo, wernisaże prywatne, opera i teatr — otwieramy drzwi do świata sztuki.</Body></div></div></Section>
    <Section bg={T.bgAlt}><Container><div style={{overflow:"hidden"}}><img src="/images/gallery-event.webp" alt="" style={{width:"100%",height:400,objectFit:"cover"}} loading="lazy" /></div></Container></Section>
    <Section padding="80px 48px"><div style={{textAlign:"center"}}><Body center italic sz={20}>Chcesz dołączyć do naszych wydarzeń?</Body><div style={{marginTop:32}}><GoldBtn href="/membership" large>Aplikuj o członkostwo</GoldBtn></div></div></Section>
  </PageShell>;
}
