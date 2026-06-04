'use client';
import PageShell from '@/components/PageShell';
import { T, Eyebrow, Heading, Body, Divider, GoldBtn, Section, Container, GoldLine, FadeIn } from '@/components/ui';
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
      {/* VIDEO HERO */}
      <section style={{ position: "relative", height: isMobile ? "70vh" : "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <video
          autoPlay muted loop playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          poster="/images/equestrian.webp"
        >
          <source src="/videos/kon.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.5) 60%, rgba(10,10,10,0.95) 100%)" }} />
        {/* Treść */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: isMobile ? "0 24px" : "0 48px", maxWidth: 800 }}>
          <div style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.4em", color: T.gold, marginBottom: 20 }}>FILAR: SPORT</div>
          <h1 style={{ fontFamily: T.serif, fontSize: isMobile ? 38 : 64, fontWeight: 300, color: T.ivory, lineHeight: 1.1, margin: 0 }}>
            Sport gentlemanów<br />na najwyższym poziomie
          </h1>
          <div style={{ margin: "24px auto", width: 60, height: 1, background: T.gold }} />
          <p style={{ fontFamily: T.sans, fontSize: isMobile ? 14 : 17, fontWeight: 300, color: T.ivoryDim, lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
            Od wyścigów konnych po regaty — łączymy pasjonatów sportów, które wymagają nie tylko sprawności, ale i klasy.
          </p>
        </div>
        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: 1, height: 40, background: `linear-gradient(180deg,transparent,${T.gold})` }} />
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 4L6 8L10 4" stroke={T.gold} strokeWidth="1" fill="none" /></svg>
        </div>
      </section>

      {/* Dyscypliny */}
      <Section>
        <Container>
          <FadeIn><Eyebrow>DYSCYPLINY</Eyebrow>
          <Heading size="md">Cztery filary sportu klubowego</Heading>
          <div style={{ marginTop: 16, marginBottom: 56 }}><Divider /></div></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 16 : 24 }}>
            {dyscypliny.map((d, i) => (
              <FadeIn key={i} delay={i * 80}><div style={{ background: T.bgCard, border: `1px solid ${T.border}`, overflow: "hidden" }}>
                <div style={{ height: 200, overflow: "hidden" }}>
                  <img src={d.img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                </div>
                <div style={{ padding: isMobile ? "16px 14px" : "24px 20px" }}>
                  <div style={{ fontFamily: T.sans, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: T.gold, marginBottom: 8 }}>◆ SPORT</div>
                  <h3 style={{ fontFamily: T.serif, fontSize: isMobile ? 18 : 22, fontWeight: 400, color: T.ivory, marginBottom: 10 }}>{d.name}</h3>
                  <Body sz={13}>{d.desc}</Body>
                </div>
              </div></FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* Golf split */}
      <Section bg={T.bgAlt}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems: "center" }}>
            <FadeIn dir="left"><div>
              <Eyebrow center={false}>GOLF</Eyebrow>
              <Heading center={false} size="md">Pola golfowe wśród dworków</Heading>
              <div style={{ margin: "20px 0" }}><GoldLine /></div>
              <Body>Nasze turnieje odbywają się na polach golfowych otoczonych historyczną architekturą — gdzie sport staje się doświadczeniem estetycznym. Każda runda to połączenie rywalizacji, rozmowy i polskiego krajobrazu.</Body>
              <div style={{ marginTop: 32 }}><GoldBtn href="/membership">Dołącz do turnieju</GoldBtn></div>
            </div></FadeIn>
            <FadeIn dir="right"><div>
              <img src="/images/golf-manor.webp" alt="Golf przy dworku" style={{ width: "100%", height: isMobile ? 260 : 420, objectFit: "cover" }} loading="lazy" />
            </div></FadeIn>
          </div>
        </Container>
      </Section>

      {/* Żużel split */}
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
