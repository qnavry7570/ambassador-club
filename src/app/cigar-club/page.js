'use client';
import PageShell from '@/components/PageShell';
import { T, Eyebrow, Heading, Body, Divider, GhostBtn, Section, Container, FadeIn } from '@/components/ui';
import { useBreakpoint } from '@/lib/useBreakpoint';
import { FEATURES } from '@/lib/features';

const privileges = [
  { icon: "◈", t: "Degustacje hawańskich cygar", d: "Kurator dobiera roczniki i regiony dla każdego spotkania" },
  { icon: "◆", t: "Prywatne wieczory w pałacach", d: "Kominki, biblioteki, salony — atmosfera niepowtarzalna" },
  { icon: "◇", t: "Sommelier tytoniowy", d: "Osobiste doradztwo przy wyborze i przechowywaniu" },
  { icon: "✧", t: "Podróże do Hawany i La Romana", d: "Wizyty w manufakturach dla koneserów" },
  { icon: "❖", t: "Humidor lounge w klubie", d: "Dedykowana przestrzeń z kolekcją limitowanych edycji" },
  { icon: "✦", t: "Zamknięte spotkania bractwa", d: "Kameralne wieczory tylko dla wybranych członków Cigar Club" },
];

const moments = [
  { src: "/images/cigar-lighting.webp", alt: "Zapalanie cygara", cap: "Rytuał zapalenia" },
  { src: "/images/cigar-lounge.webp",   alt: "Cigar lounge",     cap: "Humidor lounge" },
  { src: "/images/amber.webp",           alt: "Wieczór w pałacu", cap: "Prywatne wieczory" },
];

export default function CigarClubPage() {
  const { isMobile } = useBreakpoint();

  return (
    <PageShell>

      {/* ── HERO ── */}
      <section style={{ position: "relative", height: isMobile ? "60vh" : "75vh", minHeight: isMobile ? 360 : 520, overflow: "hidden" }}>
        <img
          src="/images/cigar-lounge.webp"
          alt="Ambassador Cigar Club"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(4,2,1,0.95) 0%, rgba(6,4,2,0.82) 50%, rgba(4,2,1,0.92) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: isMobile ? "80px 24px 40px" : "120px 48px 60px" }}>
          <img
            src="/images/logo-cigar-club.webp"
            alt="Ambassador Cigar Club"
            style={{ height: isMobile ? 100 : 130, width: "auto", marginBottom: 28, filter: "drop-shadow(0 0 24px rgba(201,169,97,0.3))" }}
          />
          <div style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.35em", color: T.gold, textTransform: "uppercase", marginBottom: 16 }}>
            Inicjatywa Ambassador Club
          </div>
          <h1 style={{ fontFamily: T.serif, fontSize: isMobile ? 32 : 54, fontWeight: 300, color: T.ivory, lineHeight: 1.1, margin: "0 0 20px" }}>
            Ambassador<br />Cigar Club
          </h1>
          <div style={{ width: 60, height: 1, background: T.gold, margin: "0 auto 24px" }} />
          <p style={{ fontFamily: T.sans, fontSize: isMobile ? 14 : 16, fontWeight: 300, color: T.muted, lineHeight: 1.8, maxWidth: 560 }}>
            Ekskluzywne bractwo miłośników hawańskich cygar, skupiające gentlemanów ceniących tradycję, smak i kunszt rolowania.
          </p>
        </div>
      </section>

      {/* ── O INICJATYWIE ── */}
      <Section padding={isMobile ? "80px 24px" : "120px 48px"}>
        <Container maxWidth={900}>
          <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems: "center" }}>
              <div>
                <Eyebrow>O INICJATYWIE</Eyebrow>
                <Heading size="md">Tradycja, smak i kunszt</Heading>
                <div style={{ marginTop: 16, marginBottom: 28 }}><Divider /></div>
                <Body>
                  Ambassador Cigar Club to przestrzeń dla tych, którzy rozumieją, że dobry cygar to nie tylko dym — to rytuał, rozmowa i chwila zatrzymana w czasie. Spotykamy się w najpiękniejszych wnętrzach Warszawy: przy kominkach, w bibliotekach, w salach balowych.
                </Body>
                <div style={{ marginTop: 16 }}>
                  <Body>
                    Każde spotkanie to starannie dobrana selekcja hawańskich cygar, sommelier tytoniowy i grono gentlemanów, których łączy coś więcej niż pasja do tytoniu.
                  </Body>
                </div>
                <div style={{ marginTop: 32 }}>
                  <p style={{ fontFamily: T.serif, fontSize: 17, fontStyle: "italic", color: T.ivoryDim, lineHeight: 1.7, margin: 0 }}>
                    "Dobry cygar jest kwintesencją luksusu — łączy ludzi, którzy rozumieją, że czas jest najcenniejszym dobrem."
                  </p>
                </div>
              </div>
              {!isMobile && (
                <div style={{ lineHeight: 0, overflow: "hidden", border: `1px solid ${T.goldBorder}` }}>
                  <img
                    src="/images/cigar-lighting.webp"
                    alt="Zapalanie cygara"
                    style={{ width: "100%", height: 420, objectFit: "cover", objectPosition: "center 40%", display: "block" }}
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* ── PRZYWILEJE ── */}
      <Section bg={T.bgAlt} padding={isMobile ? "80px 24px" : "100px 48px"}>
        <Container>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <Eyebrow>PRZYWILEJE</Eyebrow>
              <Heading size="lg">Dostęp do wyjątkowego świata</Heading>
              <div style={{ marginTop: 20 }}><Divider /></div>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 16 : 24 }}>
            {privileges.map((p, i) => (
              <FadeIn key={i} delay={i * 70}>
                <div style={{ background: "rgba(22,22,22,0.6)", border: `1px solid ${T.goldMuted}`, padding: "32px 28px", display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <div style={{ width: 40, height: 40, border: `1px solid ${T.gold}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: T.gold, fontSize: 14, flexShrink: 0, marginTop: 2 }}>
                    {p.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, color: T.ivory, letterSpacing: "0.03em", marginBottom: 6 }}>{p.t}</div>
                    <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 300, color: T.dim, lineHeight: 1.6 }}>{p.d}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── GALERIA MOMENTÓW ── */}
      <Section padding={isMobile ? "80px 24px" : "100px 48px"}>
        <Container>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <Eyebrow>ATMOSFERA</Eyebrow>
              <Heading size="lg">Chwile, które pozostają</Heading>
              <div style={{ marginTop: 20 }}><Divider /></div>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 16 : 20 }}>
            {moments.map((m, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div style={{ lineHeight: 0, overflow: "hidden", border: `1px solid ${T.border}` }}>
                  <img
                    src={m.src}
                    alt={m.alt}
                    style={{ width: "100%", height: isMobile ? 220 : 300, objectFit: "cover", display: "block", transition: "transform 0.6s" }}
                    loading="lazy"
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  />
                  <div style={{ background: "rgba(12,12,12,0.9)", padding: "12px 16px", lineHeight: 1 }}>
                    <span style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.12em", color: T.muted, textTransform: "uppercase" }}>{m.cap}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <Section bg={T.bgAlt} padding={isMobile ? "80px 24px" : "100px 48px"}>
        <Container maxWidth={640}>
          <FadeIn>
            <div style={{ textAlign: "center" }}>
              <Eyebrow>DOŁĄCZ</Eyebrow>
              <Heading size="lg">Tylko dla wybranych</Heading>
              <div style={{ marginTop: 20, marginBottom: 28 }}><Divider /></div>
              <Body center>
                Członkostwo w Ambassador Cigar Club dostępne wyłącznie dla członków Ambassador Club. Grono jest kameralne — dołączenie wymaga rekomendacji i akceptacji bractwa.
              </Body>
              <div style={{ marginTop: 36, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                {FEATURES.applications && (
                  <a href="/membership" style={{ background: T.gold, color: T.bg, border: "none", padding: "16px 40px", fontFamily: T.sans, fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", display: "inline-block" }}>
                    Złóż aplikację
                  </a>
                )}
                <a href="/contact" style={{ background: "transparent", color: T.gold, border: `1px solid ${T.gold}`, padding: "16px 40px", fontFamily: T.sans, fontSize: 13, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", display: "inline-block" }}>
                  Kontakt
                </a>
              </div>
              <div style={{ marginTop: 36, fontFamily: T.serif, fontSize: 14, fontStyle: "italic", color: T.dim }}>
                Dostępne wyłącznie dla członków Ambassador Club
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

    </PageShell>
  );
}
