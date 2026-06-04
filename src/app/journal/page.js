'use client';
import { useState } from 'react';
import PageShell from '@/components/PageShell';
import { T, Eyebrow, Heading, Body, Badge, Section, Container } from '@/components/ui';
import { useBreakpoint } from '@/lib/useBreakpoint';

function ArticleCard({ title, date, cat, excerpt, img }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: T.bgCard, border: "1px solid " + (h ? T.goldBorder : T.border), transition: "all 0.35s", cursor: "pointer", transform: h ? "translateY(-3px)" : "none", overflow: "hidden" }}>
      <div style={{ height: 200, overflow: "hidden" }}>
        <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s", transform: h ? "scale(1.05)" : "scale(1)" }} loading="lazy" />
      </div>
      <div style={{ padding: "24px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <Badge>{cat}</Badge>
          <span style={{ fontFamily: T.sans, fontSize: 10, color: T.dim }}>{date}</span>
        </div>
        <h3 style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 400, color: T.ivory, marginBottom: 8, lineHeight: 1.3 }}>{title}</h3>
        <Body sz={13} muted>{excerpt}</Body>
      </div>
    </div>
  );
}

export default function JournalPage() {
  const { isMobile, isTablet } = useBreakpoint();
  const articles = [
    {
      title: "Wernisaż prywatny — sztuka zanim trafi do publiczności",
      date: "28 lut 2026", cat: "Kultura",
      excerpt: "Ekskluzywny dostęp do wystawy przed oficjalnym otwarciem — relacja z wieczoru.",
      img: "/images/vernissage.webp"
    },
    {
      title: "Pałac Zamoyskich — historia i dzisiejsze życie",
      date: "15 lut 2026", cat: "Dziedzictwo",
      excerpt: "Od renesansowej rezydencji do centrum wydarzeń Ambassador Club.",
      img: "/images/ballroom.webp"
    },
    {
      title: "Jeździectwo w Polsce — odrodzenie dyscypliny",
      date: "2 lut 2026", cat: "Sport",
      excerpt: "Polskie stadniny i turnieje skokowe wracają na mapę europejskiego jeździectwa.",
      img: "/images/equestrian.webp"
    },
    {
      title: "Bursztyn bałtycki — złoto Północy",
      date: "20 sty 2026", cat: "Best of Poland",
      excerpt: "Jak polski bursztyn i jego mistrzowie podbijają rynki luksusu na świecie.",
      img: "/images/amber-jewelry.webp"
    },
    {
      title: "Wielka Gala Charytatywna — relacja",
      date: "8 sty 2026", cat: "Filantropia",
      excerpt: "Ponad 1,2 mln zł zebrane w jeden wieczór. Jak to robimy i dlaczego warto.",
      img: "/images/charity-gala.webp"
    },
    {
      title: "Regaty na Mazurach — żeglarstwo dla wymagających",
      date: "28 gru 2025", cat: "Sport",
      excerpt: "Pierwsze w historii zimowe regaty Ambassador Club. Relacja i zdjęcia.",
      img: "/images/regaty.webp"
    },
  ];
  const gridCols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)";

  return (
    <PageShell>
      <Section padding="140px 48px 60px">
        <div style={{ textAlign: "center" }}>
          <Eyebrow>JOURNAL</Eyebrow>
          <Heading size="xl">Magazyn klubowy</Heading>
          <div style={{ marginTop: 16 }}>
            <Body center>Artykuły o sztuce, sportach gentlemanów i polskim dziedzictwie</Body>
          </div>
        </div>
      </Section>
      <Section bg={T.bgAlt} padding="60px 48px 100px">
        <Container maxWidth={1100}>
          <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: isMobile ? 16 : 24 }}>
            {articles.map((a, i) => <ArticleCard key={i} {...a} />)}
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
