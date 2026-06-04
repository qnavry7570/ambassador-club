'use client';
import PageShell from '@/components/PageShell';
import { T, Eyebrow, Heading, Body, Divider, GoldBtn, Section, Container, GoldLine } from '@/components/ui';
import { useBreakpoint } from '@/lib/useBreakpoint';

export default function BestOfPolandPage() {
  const { isMobile } = useBreakpoint();

  const kategorie = [
    { icon: "◈", t: "Rzemiosło i design", d: "Polscy twórcy biżuterii, szkła artystycznego i tkanin wysokiej klasy." },
    { icon: "◆", t: "Gastronomia", d: "Restauracje fine dining, destylarnie, winnicy i serowarnie premium." },
    { icon: "◇", t: "Architektura", d: "Rezydencje, pensjonaty i obiekty, które opowiadają historię Polski." },
    { icon: "✧", t: "Talenty", d: "Muzycy, szefowie kuchni, projektanci — prezentujemy ich światu." },
  ];

  return (
    <PageShell>
      {/* Hero */}
      <Section padding="140px 48px 100px">
        <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
          <img
            src="/images/logo-best-of-poland.webp"
            alt="The Best of Poland"
            style={{ height: isMobile ? 64 : 88, width: "auto", margin: "0 auto 32px", opacity: 0.92 }}
            loading="eager"
          />
          <Heading size="xl">To, co w Polsce najlepsze</Heading>
          <div style={{ marginTop: 24 }}><Divider /></div>
          <div style={{ marginTop: 24 }}>
            <Body center>Odkrywamy i promujemy polskie marki premium, rzemiosło, kuchnię i talenty. Polska ma swoje złoto — pomagamy mu błyszczeć.</Body>
          </div>
        </div>
      </Section>

      {/* Bursztyn — split sekcja */}
      <Section bg={T.bgAlt}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems: "center" }}>
            <div>
              <img src="/images/amber-jewelry.webp" alt="Biżuteria bursztynowa" style={{ width: "100%", height: isMobile ? 280 : 440, objectFit: "cover" }} loading="lazy" />
            </div>
            <div>
              <Eyebrow center={false}>BURSZTYN BAŁTYCKI</Eyebrow>
              <Heading center={false} size="md">Złoto polskich wybrzeży</Heading>
              <div style={{ margin: "20px 0" }}><GoldLine /></div>
              <Body>Bursztyn bałtycki to jedno z najbardziej rozpoznawalnych polskich dóbr na świecie. Wspieramy mistrzów złotnictwa, którzy łączą tysiącletnią żywicę z nowoczesnym designem.</Body>
              <div style={{ marginTop: 16 }}>
                <Body italic sz={17}>Polska dostarcza ponad 80% światowego wydobycia bursztynu.</Body>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Kategorie */}
      <Section>
        <Container>
          <Eyebrow>KATEGORIE</Eyebrow>
          <Heading size="md">Co promujemy</Heading>
          <div style={{ marginTop: 16, marginBottom: 56 }}><Divider /></div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 12 : 24 }}>
            {kategorie.map((k, i) => (
              <div key={i} style={{ background: T.bgCard, border: `1px solid ${T.border}`, padding: isMobile ? "24px 16px" : "36px 24px" }}>
                <div style={{ fontFamily: T.serif, fontSize: isMobile ? 24 : 32, color: T.gold, marginBottom: 16 }}>{k.icon}</div>
                <h3 style={{ fontFamily: T.serif, fontSize: isMobile ? 17 : 20, fontWeight: 400, color: T.ivory, marginBottom: 10 }}>{k.t}</h3>
                <Body sz={13}>{k.d}</Body>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Gdańsk — pełna szerokość */}
      <Section bg={T.bgAlt} padding="0">
        <div style={{ position: "relative", height: isMobile ? 320 : 480, overflow: "hidden" }}>
          <img src="/images/gdansk.webp" alt="Gdańsk" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} loading="lazy" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,10,10,0.7) 0%, transparent 60%)" }} />
          <div style={{ position: "absolute", top: "50%", left: isMobile ? 24 : 64, transform: "translateY(-50%)", maxWidth: 420 }}>
            <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: "0.3em", color: T.gold, marginBottom: 12 }}>GDAŃSK · POLSKA</div>
            <h3 style={{ fontFamily: T.serif, fontSize: isMobile ? 24 : 36, fontWeight: 300, color: T.ivory, lineHeight: 1.2, marginBottom: 16 }}>
              Serce Bałtyku
            </h3>
            <Body sz={14}>Gdańsk — miasto bursztynu, historii i nowej polskiej elegancji.</Body>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section padding="80px 48px">
        <div style={{ textAlign: "center" }}>
          <Body center italic sz={20}>Chcesz dołączyć do świata Best of Poland?</Body>
          <div style={{ marginTop: 32 }}><GoldBtn href="/membership" large>Aplikuj o członkostwo</GoldBtn></div>
        </div>
      </Section>
    </PageShell>
  );
}
