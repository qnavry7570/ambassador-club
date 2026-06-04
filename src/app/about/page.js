'use client';
import PageShell from '@/components/PageShell';
import { T, Eyebrow, Heading, Body, Divider, GoldLine, GoldBtn, Section, Container, FadeIn } from '@/components/ui';
import { useBreakpoint } from '@/lib/useBreakpoint';

export default function AboutPage() {
  const { isMobile } = useBreakpoint();
  const values = [
    { icon: "◈", t: "Dyskrecja", d: "Co dzieje się w klubie, zostaje w klubie." },
    { icon: "◆", t: "Excellencja", d: "Każde wydarzenie na najwyższym poziomie." },
    { icon: "◇", t: "Wzajemność", d: "Networking oparty na wartości, nie transakcji." },
    { icon: "✧", t: "Dziedzictwo", d: "Polską tradycję łączymy z nowoczesnością." },
  ];
  return (
    <PageShell>

      {/* HERO z obrazkiem */}
      <section style={{ position: "relative", height: isMobile ? "60vh" : "75vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="/images/networking.webp" alt="Ambassador Club" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.6) 60%, rgba(10,10,10,0.97) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: isMobile ? "0 24px" : "0 48px", maxWidth: 800 }}>
          <FadeIn>
            <div style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.4em", color: T.gold, marginBottom: 20 }}>O AMBASSADOR CLUB</div>
            <h1 style={{ fontFamily: T.serif, fontSize: isMobile ? 36 : 60, fontWeight: 300, color: T.ivory, lineHeight: 1.1, margin: 0 }}>
              Więcej niż klub —<br />filozofia doskonałości
            </h1>
            <div style={{ margin: "24px auto", width: 60, height: 1, background: T.gold }} />
            <p style={{ fontFamily: T.sans, fontSize: isMobile ? 14 : 16, fontWeight: 300, color: T.ivoryDim, lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
              Łączymy liderów biznesu, sportu, sztuki i filantropii w jedną społeczność najwybitniejszych.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Misja — split */}
      <Section bg={T.bgAlt}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems: "center" }}>
            {!isMobile && (
              <div style={{ overflow: "hidden", height: 500, lineHeight: 0, fontSize: 0 }}>
                <img src="/images/networking.webp" alt="Networking Ambassador Club" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            )}
            <FadeIn dir={isMobile ? "up" : "right"}>
              <div>
                <Eyebrow center={false}>NASZA MISJA</Eyebrow>
                <Heading center={false} size="md">Łączymy ludzi, którzy kształtują Polskę</Heading>
                <div style={{ margin: "20px 0" }}><GoldLine /></div>
                <Body>Ambassador Club powstał z wiary, że najciekawsze rzeczy dzieją się wtedy, gdy w jednym miejscu spotykają się ludzie wyjątkowi — liderzy biznesu, mecenasi sztuki, sportowcy i filantropi.</Body>
                <div style={{ marginTop: 20 }}>
                  <Body italic sz={18}>Nasze wydarzenia odbywają się w najpiękniejszych rezydencjach Polski.</Body>
                </div>
              </div>
            </FadeIn>
            {isMobile && (
              <img src="/images/networking.webp" alt="Networking Ambassador Club" style={{ width: "100%", height: 260, objectFit: "cover" }} />
            )}
          </div>
        </Container>
      </Section>

      {/* Sala balowa — pełna szerokość */}
      <Section padding="0">
        <div style={{ width: "100%", height: isMobile ? 240 : 400, overflow: "hidden", lineHeight: 0, fontSize: 0 }}>
          <img src="/images/ballroom.webp" alt="Sala balowa" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", display: "block" }} loading="lazy" />
        </div>
      </Section>

      {/* Wartości */}
      <Section>
        <Container>
          <FadeIn>
            <Eyebrow>NASZE WARTOŚCI</Eyebrow>
            <Heading size="md">Na czym stoimy</Heading>
            <div style={{ marginTop: 16, marginBottom: 56 }}><Divider /></div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 12 : 24 }}>
            {values.map((v, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div style={{ background: T.bgCard, border: "1px solid " + T.border, padding: isMobile ? "24px 16px" : "36px 28px" }}>
                  <div style={{ fontFamily: T.serif, fontSize: isMobile ? 24 : 32, color: T.gold, marginBottom: 16 }}>{v.icon}</div>
                  <h3 style={{ fontFamily: T.serif, fontSize: isMobile ? 18 : 22, fontWeight: 400, color: T.ivory, marginBottom: 12 }}>{v.t}</h3>
                  <Body sz={14}>{v.d}</Body>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      <Section bg={T.bgAlt} padding="80px 48px">
        <FadeIn>
          <div style={{ textAlign: "center" }}>
            <Body center italic sz={20}>Chcesz poznać nas bliżej?</Body>
            <div style={{ marginTop: 32 }}><GoldBtn href="/membership" large>Aplikuj o członkostwo</GoldBtn></div>
          </div>
        </FadeIn>
      </Section>
    </PageShell>
  );
}
