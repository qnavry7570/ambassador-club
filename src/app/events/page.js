'use client';
import { useState } from 'react';
import PageShell from '@/components/PageShell';
import { T, Eyebrow, Heading, Body, Divider, EventCard, GhostBtn, Section, Container } from '@/components/ui';
import { useBreakpoint } from '@/lib/useBreakpoint';

export default function EventsPage() {
  const [filter, setFilter] = useState("all");
  const { isMobile, isTablet } = useBreakpoint();
  const events = [
    { title: "Wieczór Kolekcjonerski", date: "15 marca 2026", loc: "Pałac Zamoyskich, Warszawa", tag: "Sztuka", cat: "culture" },
    { title: "Wielka Gala Charytatywna", date: "28 marca 2026", loc: "Łazienki Królewskie", tag: "Filantropia", cat: "philanthropy" },
    { title: "Dzień Polo & Champagne", date: "12 kwietnia 2026", loc: "Polo Club Wrocław", tag: "Sport", cat: "sport" },
    { title: "Degustacja Win", date: "25 kwietnia 2026", loc: "Piwnice Biskupie, Kraków", tag: "Best of Poland", cat: "bestofpoland" },
    { title: "Regaty na Mazurach", date: "10 maja 2026", loc: "Yacht Club Giżycko", tag: "Sport", cat: "sport" },
    { title: "Wernisaż: Nowa Polska", date: "22 maja 2026", loc: "Galeria Foksal, Warszawa", tag: "Sztuka", cat: "culture" },
    { title: "Turniej Golfowy AC Open", date: "18 czerwca 2026", loc: "Modry Las Golf Club", tag: "Sport", cat: "sport" },
    { title: "Noc Operowa", date: "2 lipca 2026", loc: "Teatr Wielki, Warszawa", tag: "Sztuka", cat: "culture" },
  ];
  const cats = ["all", "sport", "culture", "philanthropy", "bestofpoland"];
  const labels = { all: "Wszystkie", sport: "Sport", culture: "Kultura", philanthropy: "Filantropia", bestofpoland: "Best of Poland" };
  const filtered = filter === "all" ? events : events.filter(e => e.cat === filter);
  const gridCols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)";

  return (
    <PageShell>
      <Section padding="140px 48px 60px">
        <div style={{ textAlign: "center" }}>
          <Eyebrow>WYDARZENIA</Eyebrow>
          <Heading size="xl">Kalendarz klubowy</Heading>
          <div style={{ marginTop: 16 }}><Body center>Szczegóły dostępne wyłącznie dla członków</Body></div>
          <div style={{ marginTop: 32, display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)}
                style={{ padding: isMobile ? "8px 14px" : "8px 20px", background: filter === c ? "rgba(201,169,97,0.1)" : "transparent", border: "1px solid " + (filter === c ? T.gold : T.border), color: filter === c ? T.gold : T.muted, fontFamily: T.sans, fontSize: isMobile ? 11 : 12, letterSpacing: "0.08em", cursor: "pointer", transition: "all 0.2s" }}>
                {labels[c]}
              </button>
            ))}
          </div>
        </div>
      </Section>

      <Section bg={T.bgAlt} padding="60px 48px 100px">
        <Container maxWidth={1000}>
          <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: isMobile ? 16 : 24 }}>
            {filtered.map((ev, i) => <EventCard key={i} {...ev} />)}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Body center muted>Zaloguj się aby zobaczyć pełne szczegóły i RSVP.</Body>
            <div style={{ marginTop: 20 }}><GhostBtn href="/login">Zaloguj się</GhostBtn></div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
