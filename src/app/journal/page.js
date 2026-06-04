'use client';
import { useState } from 'react';
import PageShell from '@/components/PageShell';
import { T, Eyebrow, Heading, Body, Badge, Section, Container, GoldBtn, GhostBtn } from '@/components/ui';
import { useBreakpoint } from '@/lib/useBreakpoint';

function MembersModal({ article, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
      onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }} />
      <div style={{ position: "relative", background: T.bgCard, border: `1px solid ${T.goldBorder}`, maxWidth: 480, width: "100%", padding: "48px 40px", textAlign: "center" }}
        onClick={e => e.stopPropagation()}>
        {/* zamknij */}
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: T.dim, fontSize: 20, lineHeight: 1 }}>✕</button>

        <div style={{ width: 56, height: 56, border: `1px solid ${T.goldBorder}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 22, color: T.gold }}>🔒</div>

        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: "0.3em", color: T.gold, textTransform: "uppercase", marginBottom: 12 }}>Treść zastrzeżona</div>
        <h3 style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 300, color: T.ivory, lineHeight: 1.3, margin: "0 0 16px" }}>{article.title}</h3>
        <div style={{ width: 40, height: 1, background: T.gold, margin: "0 auto 20px" }} />
        <p style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 300, color: T.muted, lineHeight: 1.7, margin: "0 0 32px" }}>
          Ten artykuł jest dostępny wyłącznie dla członków Ambassador Club. Zaloguj się lub złóż aplikację o członkostwo.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <GoldBtn href="/login">Zaloguj się</GoldBtn>
          <GhostBtn href="/membership">Aplikuj o członkostwo</GhostBtn>
        </div>
      </div>
    </div>
  );
}

function ArticleCard({ title, date, cat, excerpt, img, onClick }) {
  const [h, setH] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: T.bgCard, border: "1px solid " + (h ? T.goldBorder : T.border), transition: "all 0.35s", cursor: "pointer", transform: h ? "translateY(-3px)" : "none", overflow: "hidden" }}>
      <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
        <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s", transform: h ? "scale(1.05)" : "scale(1)" }} loading="lazy" />
        <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(10,10,10,0.7)", padding: "4px 8px", fontSize: 12 }}>🔒</div>
      </div>
      <div style={{ padding: "24px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <Badge>{cat}</Badge>
          <span style={{ fontFamily: T.sans, fontSize: 10, color: T.dim }}>{date}</span>
        </div>
        <h3 style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 400, color: T.ivory, marginBottom: 8, lineHeight: 1.3 }}>{title}</h3>
        <Body sz={13} muted>{excerpt}</Body>
        <div style={{ marginTop: 16, fontFamily: T.sans, fontSize: 11, color: h ? T.gold : T.dim, letterSpacing: "0.1em", textTransform: "uppercase", transition: "color 0.3s" }}>Czytaj więcej →</div>
      </div>
    </div>
  );
}

export default function JournalPage() {
  const { isMobile, isTablet } = useBreakpoint();
  const [activeArticle, setActiveArticle] = useState(null);

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
      {activeArticle && <MembersModal article={activeArticle} onClose={() => setActiveArticle(null)} />}

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
            {articles.map((a, i) => <ArticleCard key={i} {...a} onClick={() => setActiveArticle(a)} />)}
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
