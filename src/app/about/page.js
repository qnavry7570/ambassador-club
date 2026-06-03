'use client';
import PageShell from '@/components/PageShell';
import { T, Eyebrow, Heading, Body, Divider, GoldLine, GoldBtn, Section, Container } from '@/components/ui';
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
      <Section padding="140px 48px 100px">
        <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
          <Eyebrow>O AMBASSADOR CLUB</Eyebrow>
          <Heading size="xl">Więcej niż klub — filozofia doskonałości</Heading>
          <div style={{ marginTop: 24 }}><Divider /></div>
        </div>
      </Section>

      <Section bg={T.bgAlt}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems: "center" }}>
            {!isMobile && <div><img src="/images/palace-interior.webp" alt="Gala" style={{ width: "100%", height: 500, objectFit: "cover" }} /></div>}
            <div>
              <Eyebrow center={false}>NASZA MISJA</Eyebrow>
              <Heading center={false} size="md">Łączymy ludzi, którzy kształtują Polskę</Heading>
              <div style={{ margin: "20px 0" }}><GoldLine /></div>
              <Body>Ambassador Club powstał z wiary, że najciekawsze rzeczy dzieją się wtedy, gdy w jednym miejscu spotykają się ludzie wyjątkowi — liderzy biznesu, mecenasi sztuki, sportowcy i filantropi.</Body>
              <div style={{ marginTop: 20 }}><Body italic sz={18}>Nasze wydarzenia odbywają się w najpiękniejszych rezydencjach Polski.</Body></div>
            </div>
            {isMobile && <img src="/images/palace-interior.webp" alt="Gala" style={{ width: "100%", height: 260, objectFit: "cover" }} />}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Eyebrow>NASZE WARTOŚCI</Eyebrow>
          <Heading size="md">Na czym stoimy</Heading>
          <div style={{ marginTop: 16, marginBottom: 56 }}><Divider /></div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 12 : 24 }}>
            {values.map((v, i) => (
              <div key={i} style={{ background: T.bgCard, border: "1px solid " + T.border, padding: isMobile ? "24px 16px" : "36px 28px" }}>
                <div style={{ fontFamily: T.serif, fontSize: isMobile ? 24 : 32, color: T.gold, marginBottom: 16 }}>{v.icon}</div>
                <h3 style={{ fontFamily: T.serif, fontSize: isMobile ? 18 : 22, fontWeight: 400, color: T.ivory, marginBottom: 12 }}>{v.t}</h3>
                <Body sz={14}>{v.d}</Body>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section bg={T.bgAlt} padding="80px 48px">
        <div style={{ textAlign: "center" }}>
          <Body center italic sz={20}>Chcesz poznać nas bliżej?</Body>
          <div style={{ marginTop: 32 }}><GoldBtn href="/membership" large>Aplikuj o członkostwo</GoldBtn></div>
        </div>
      </Section>
    </PageShell>
  );
}
