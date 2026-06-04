'use client';
import PageShell from '@/components/PageShell';
import { T, Eyebrow, Heading, Body, Divider, GoldBtn, Section, Container, GoldLine } from '@/components/ui';
import { useBreakpoint } from '@/lib/useBreakpoint';

export default function SportPage() {
  const { isMobile } = useBreakpoint();
  const dyscypliny = [
    { name: "Jeździectwo", desc: "Skoki przez przeszkody, ujeżdżanie i wyścigi konne na najpiękniejszych torach Polski.", img: "/images/equestrian.webp" },
    { name: "Golf", desc: "Turnieje i rundy na prestiżowych polach golfowych — od Modrego Lasu po klub w Rajszewie.", img: "/images/golf-manor.webp" },
    { name: "Żeglarstwo", desc: "Regaty na Mazurach i Bałtyku. Żeglarstwo jako metafora wolności i precyzji.", img: "/images/regaty.webp" },
    { name: "Żużel", desc: "Polska Liga Żużlowa na żywo z lóż VIP — adrenalina i tradycja w najczystszej postaci.", img: "/images/zuzel.webp" },
  ];

  return (
    <PageShell>
      {/* Hero */}
      <Section padding="140px 48px 100px">
        <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
          <Eyebrow>FILAR: SPORT</Eyebrow>
          <Heading size="xl">Sport gentlemanów na najwyższym poziomie</Heading>
          <div style={{ marginTop: 24 }}><Divider /></div>
          <div style={{ marginTop: 24 }}>
            <Body center>Od wyścigów konnych po regaty — łączymy pasjonatów sportów, które wymagają nie tylko sprawności, ale i klasy.</Body>
          </div>
        </div>
      </Section>

      {/* Główny obraz — jeździectwo */}
      <Section bg={T.bgAlt} padding="0">
        <div style={{ width: "100%", height: isMobile ? 280 : 500, overflow: "hidden" }}>
          <img src="/images/equestrian.webp" alt="Jeździectwo" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} loading="lazy" />
        </div>
      </Section>

      {/* Dyscypliny */}
      <Section>
        <Container>
          <Eyebrow>DYSCYPLINY</Eyebrow>
          <Heading size="md">Cztery filary sportu klubowego</Heading>
          <div style={{ marginTop: 16, marginBottom: 56 }}><Divider /></div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 16 : 24 }}>
            {dyscypliny.map((d, i) => (
              <div key={i} style={{ background: T.bgCard, border: `1px solid ${T.border}`, overflow: "hidden" }}>
                <div style={{ height: 220, overflow: "hidden" }}>
                  <img src={d.img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                </div>
                <div style={{ padding: "24px 20px" }}>
                  <div style={{ fontFamily: T.sans, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: T.gold, marginBottom: 8 }}>◆ SPORT</div>
                  <h3 style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 400, color: T.ivory, marginBottom: 10 }}>{d.name}</h3>
                  <Body sz={14}>{d.desc}</Body>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Golf & Manor — full width split */}
      <Section bg={T.bgAlt}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems: "center" }}>
            <div>
              <Eyebrow center={false}>GOLF</Eyebrow>
              <Heading center={false} size="md">Pola golfowe wśród dworków</Heading>
              <div style={{ margin: "20px 0" }}><GoldLine /></div>
              <Body>Nasze turnieje odbywają się na polach golfowych otoczonych historyczną architekturą — gdzie sport staje się doświadczeniem estetycznym. Każda runda to połączenie rywalizacji, rozmowy i polskiego krajobrazu.</Body>
              <div style={{ marginTop: 32 }}><GoldBtn href="/membership">Dołącz do turnieju</GoldBtn></div>
            </div>
            <div>
              <img src="/images/golf-manor.webp" alt="Golf przy dworku" style={{ width: "100%", height: isMobile ? 260 : 420, objectFit: "cover" }} loading="lazy" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Żużel — split */}
      <Section>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems: "center" }}>
            <div>
              <img src="/images/zuzel-action.webp" alt="Żużel — akcja na torze" style={{ width: "100%", height: isMobile ? 260 : 420, objectFit: "cover", objectPosition: "center 40%" }} loading="lazy" />
            </div>
            <div>
              <Eyebrow center={false}>ŻUŻEL</Eyebrow>
              <Heading center={false} size="md">Polska tradycja w najczystszej postaci</Heading>
              <div style={{ margin: "20px 0" }}><GoldLine /></div>
              <Body>Żużel to jeden z najbardziej polskich sportów świata — głośny, szybki i pełen pasji. Ambassador Club oferuje dostęp do lóż VIP na meczach Polskiej Ligi Żużlowej, gdzie adrenalina łączy się z elegancją.</Body>
              <div style={{ marginTop: 16 }}>
                <Body italic sz={17}>Polska dominuje światowy żużel od dekad — jesteśmy tego częścią.</Body>
              </div>
              <div style={{ marginTop: 32 }}><GoldBtn href="/membership">Zarezerwuj lożę VIP</GoldBtn></div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section padding="80px 48px">
        <div style={{ textAlign: "center" }}>
          <Body center italic sz={20}>Chcesz dołączyć do naszych wydarzeń sportowych?</Body>
          <div style={{ marginTop: 32 }}><GoldBtn href="/membership" large>Aplikuj o członkostwo</GoldBtn></div>
        </div>
      </Section>
    </PageShell>
  );
}
