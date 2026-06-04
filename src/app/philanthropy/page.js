'use client';
import PageShell from '@/components/PageShell';
import { T, Eyebrow, Heading, Body, Divider, GoldBtn, Section, Container, GoldLine } from '@/components/ui';
import { useBreakpoint } from '@/lib/useBreakpoint';

export default function PhilanthropyPage() {
  const { isMobile } = useBreakpoint();

  const inicjatywy = [
    { icon: "◈", t: "Aukcje charytatywne", d: "Roczna Wielka Aukcja — dzieła sztuki i doświadczenia przekazane na szczytne cele." },
    { icon: "◆", t: "Fundacje partnerskie", d: "Współpraca z wiodącymi fundacjami kultury, edukacji i ochrony środowiska." },
    { icon: "◇", t: "Stypendia", d: "Program stypendialny dla uzdolnionej młodzieży z całej Polski." },
  ];

  return (
    <PageShell>
      {/* Hero */}
      <Section padding="140px 48px 100px">
        <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
          <Eyebrow>FILAR: FILANTROPIA</Eyebrow>
          <Heading size="xl">Zmieniamy otoczenie na lepsze — razem</Heading>
          <div style={{ marginTop: 24 }}><Divider /></div>
          <div style={{ marginTop: 24 }}>
            <Body center>Wierzymy, że prawdziwy sukces mierzy się tym, ile dobra dajemy światu. Filantropia w Ambassador Club to działanie, nie deklaracja.</Body>
          </div>
        </div>
      </Section>

      {/* Główny obraz — Gala */}
      <Section bg={T.bgAlt} padding="0">
        <div style={{ width: "100%", height: isMobile ? 280 : 520, overflow: "hidden" }}>
          <img src="/images/charity-gala.webp" alt="Warsaw Charity Gala" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }} loading="lazy" />
        </div>
      </Section>

      {/* Inicjatywy */}
      <Section>
        <Container>
          <Eyebrow>NASZE INICJATYWY</Eyebrow>
          <Heading size="md">Trzy obszary działania</Heading>
          <div style={{ marginTop: 16, marginBottom: 56 }}><Divider /></div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: isMobile ? 16 : 24 }}>
            {inicjatywy.map((item, i) => (
              <div key={i} style={{ background: T.bgCard, border: `1px solid ${T.border}`, padding: "36px 28px" }}>
                <div style={{ fontFamily: T.serif, fontSize: 32, color: T.gold, marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 400, color: T.ivory, marginBottom: 12 }}>{item.t}</h3>
                <Body sz={14}>{item.d}</Body>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Aukcja podgląd — split */}
      <Section bg={T.bgAlt}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems: "center" }}>
            <div>
              <img src="/images/auction-preview.webp" alt="Podgląd przed aukcją" style={{ width: "100%", height: isMobile ? 260 : 420, objectFit: "cover" }} loading="lazy" />
            </div>
            <div>
              <Eyebrow center={false}>WIELKA AUKCJA</Eyebrow>
              <Heading center={false} size="md">Sztuka w służbie dobra</Heading>
              <div style={{ margin: "20px 0" }}><GoldLine /></div>
              <Body>Każdego roku organizujemy aukcję charytatywną, na której dzieła przekazane przez artystów i kolekcjonerów trafiają w ręce nowych właścicieli. Całość dochodu zasila wybrane inicjatywy społeczne.</Body>
              <div style={{ marginTop: 16 }}>
                <Body italic sz={17}>W 2025 roku zebraliśmy ponad 1,2 mln zł na rzecz czterech fundacji.</Body>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section padding="80px 48px">
        <div style={{ textAlign: "center" }}>
          <Body center italic sz={20}>Chcesz działać razem z nami?</Body>
          <div style={{ marginTop: 32 }}><GoldBtn href="/membership" large>Aplikuj o członkostwo</GoldBtn></div>
        </div>
      </Section>
    </PageShell>
  );
}
