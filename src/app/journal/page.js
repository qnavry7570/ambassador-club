'use client';
import { useState } from 'react';
import PageShell from '@/components/PageShell';
import { T, Eyebrow, Heading, Body, Badge, GhostBtn, Section, Container } from '@/components/ui';
function ArticleCard({title,date,cat,excerpt,img}){const[h,setH]=useState(false);return<div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{background:T.bgCard,border:"1px solid "+(h?T.goldBorder:T.border),transition:"all 0.35s",cursor:"pointer",transform:h?"translateY(-3px)":"none",overflow:"hidden"}}><div style={{height:200,overflow:"hidden"}}><img src={img} alt={title} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.5s",transform:h?"scale(1.05)":"scale(1)"}} loading="lazy" /></div><div style={{padding:"24px 20px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><Badge>{cat}</Badge><span style={{fontFamily:T.sans,fontSize:10,color:T.dim}}>{date}</span></div><h3 style={{fontFamily:T.serif,fontSize:20,fontWeight:400,color:T.ivory,marginBottom:8,lineHeight:1.3}}>{title}</h3><Body sz={13} muted>{excerpt}</Body></div></div>;}
export default function JournalPage(){
  const articles=[
    {title:"Sztuka kolekcjonowania — jak zacząć",date:"28 lut 2026",cat:"Kultura",excerpt:"Kolekcjonerstwo to nie tylko inwestycja — to styl życia.",img:"/images/amber.webp"},
    {title:"Pałac Zamoyskich — historia",date:"15 lut 2026",cat:"Dziedzictwo",excerpt:"Od renesansowej rezydencji do centrum wydarzeń.",img:"/images/palace-interior.webp"},
    {title:"Polo w Polsce — odrodzenie",date:"2 lut 2026",cat:"Sport",excerpt:"Trzy polskie kluby polo budują scenę.",img:"/images/golf.webp"},
    {title:"Bursztyn bałtycki — złoto Północy",date:"20 sty 2026",cat:"Best of Poland",excerpt:"Jak polski bursztyn podbija rynki luksusu.",img:"/images/watch.webp"},
    {title:"Filantropia cicha",date:"8 sty 2026",cat:"Filantropia",excerpt:"Członkowie o tym, dlaczego lubią dawać po cichu.",img:"/images/fine-dining.webp"},
    {title:"Regaty na Mazurach",date:"28 gru 2025",cat:"Sport",excerpt:"Pierwsze w historii regaty zimowe na Mazurach.",img:"/images/yacht.webp"},
  ];
  return <PageShell>
    <Section padding="140px 48px 60px"><div style={{textAlign:"center"}}><Eyebrow>JOURNAL</Eyebrow><Heading size="xl">Magazyn klubowy</Heading><div style={{marginTop:16}}><Body center>Artykuły o sztuce, sportach gentlemanów i polskim dziedzictwie</Body></div></div></Section>
    <Section bg={T.bgAlt} padding="60px 48px 100px"><Container maxWidth={1100}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24}}>{articles.map((a,i)=><ArticleCard key={i} {...a} />)}</div>
    </Container></Section>
  </PageShell>;
}
