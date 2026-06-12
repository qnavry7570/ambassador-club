'use client';
import PageShell from '@/components/PageShell';
import { T, Eyebrow, Heading, Body, Divider, GoldBtn, Section, Container, GoldLine, FadeIn } from '@/components/ui';
import { useBreakpoint } from '@/lib/useBreakpoint';
import { FEATURES } from '@/lib/features';

export default function CulturePage() {
  const { isMobile } = useBreakpoint();

  const formy = [
    { icon: "◈", t: "Wernisaże prywatne", d: "Ekskluzywny dostęp do otwarć wystaw przed ich publicznym debiutem." },
    { icon: "◆", t: "Opera i teatr", d: "Loże VIP w Teatrze Wielkim i najważniejszych scenach Polski." },
    { icon: "◇", t: "Kolekcjonerstwo", d: "Aukcje, konsultacje i dostęp do dzieł niedostępnych na rynku." },
    { icon: "✧", t: "Koncerty kameralne", d: "Recitale w bibliotekach i salonach polskich rezydencji." },
  ];

  return (
    <PageShell>
      {/* Hero */}
      <Section padding="140px 48px 100px">
        <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
          <Eyebrow>FILAR: SZTUKA I KULTURA</Eyebrow>
          <Heading size="xl">Świat, który docenia piękno i głębię</Heading>
          <div style={{ marginTop: 24 }}><Divider /></div>
          <div style={{ marginTop: 24 }}>
            <Body center>Mecenat, kolekcjonerstwo, wernisaże prywatne, opera i teatr — otwieramy drzwi do świata sztuki najwyższej próby.</Body>
          </div>
        </div>
      </Section>

      {/* Wernisaż — główny obraz */}
      <Section bg={T.bgAlt} padding="0">
        <div style={{ width: "100%", height: isMobile ? 280 : 520, overflow: "hidden" }}>
          <img src="/images/vernissage.webp" alt="Wernisaż w pałacu" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%" }} loading="lazy" />
        </div>
      </Section>

      {/* Formy uczestnictwa */}
      <Section>
        <Container>
          <FadeIn><Eyebrow>FORMY UCZESTNICTWA</Eyebrow>
          <Heading size="md">Jak doświadczamy kultury</Heading>
          <div style={{ marginTop: 16, marginBottom: 56 }}><Divider /></div></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 12 : 24 }}>
            {formy.map((f, i) => (
              <FadeIn key={i} delay={i * 80}><div style={{ background: T.bgCard, border: `1px solid ${T.border}`, padding: isMobile ? "24px 16px" : "36px 24px" }}>
                <div style={{ fontFamily: T.serif, fontSize: isMobile ? 24 : 32, color: T.gold, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontFamily: T.serif, fontSize: isMobile ? 17 : 20, fontWeight: 400, color: T.ivory, marginBottom: 10 }}>{f.t}</h3>
                <Body sz={13}>{f.d}</Body>
              </div></FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* Galeria — kolekcjoner + opera */}
      <Section bg={T.bgAlt}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 24 : 32 }}>
            <div style={{ overflow: "hidden" }}>
              <img src="/images/art-collector.webp" alt="Kolekcjonerstwo" style={{ width: "100%", height: isMobile ? 240 : 380, objectFit: "cover" }} loading="lazy" />
              <div style={{ padding: "20px 0 0" }}>
                <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: "0.2em", color: T.gold, marginBottom: 8 }}>◆ KOLEKCJONERSTWO</div>
                <Body sz={14}>Cicha kontemplacja dzieła — fundament każdej kolekcji.</Body>
              </div>
            </div>
            <div style={{ overflow: "hidden" }}>
              <img src="/images/opera.webp" alt="Opera" style={{ width: "100%", height: isMobile ? 240 : 380, objectFit: "cover" }} loading="lazy" />
              <div style={{ padding: "20px 0 0" }}>
                <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: "0.2em", color: T.gold, marginBottom: 8 }}>◆ OPERA I TEATR</div>
                <Body sz={14}>Loże VIP w największych teatrach operowych Polski.</Body>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Koncert kameralny — split */}
      <Section>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems: "center" }}>
            <div>
              <img src="/images/concert-manor.webp" alt="Koncert kameralny" style={{ width: "100%", height: isMobile ? 260 : 420, objectFit: "cover" }} loading="lazy" />
            </div>
            <div>
              <Eyebrow center={false}>KONCERTY KAMERALNE</Eyebrow>
              <Heading center={false} size="md">Muzyka w intymnym otoczeniu</Heading>
              <div style={{ margin: "20px 0" }}><GoldLine /></div>
              <Body>Recitale fortepianowe w prywatnych bibliotekach, kameralne wieczory smyczkowe w salonach rezydencji — muzyka w miejscach, gdzie każde dźwięk rezonuje z historią.</Body>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section bg={T.bgAlt} padding="80px 48px">
        <div style={{ textAlign: "center" }}>
          <Body center italic sz={20}>Chcesz dołączyć do świata sztuki i kultury?</Body>
          {FEATURES.applications && <div style={{ marginTop: 32 }}><GoldBtn href="/membership" large>Aplikuj o członkostwo</GoldBtn></div>}
        </div>
      </Section>
    </PageShell>
  );
}
