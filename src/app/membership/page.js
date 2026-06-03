'use client';
import { useState } from 'react';
import PageShell from '@/components/PageShell';
import { T, Eyebrow, Heading, Body, Divider, GoldBtn, FeatureBox, Section, Container, GoldLine } from '@/components/ui';
import { useBreakpoint } from '@/lib/useBreakpoint';

function Input({ label, placeholder, type = "text" }) {
  const [f, setF] = useState(false);
  return (
    <div style={{ marginBottom: 20 }}>
      {label && <label style={{ display: "block", fontFamily: T.sans, fontSize: 11, letterSpacing: "0.12em", color: T.muted, textTransform: "uppercase", marginBottom: 8 }}>{label}</label>}
      <input type={type} placeholder={placeholder} onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ width: "100%", padding: "14px 16px", background: "rgba(22,22,22,0.6)", border: "1px solid " + (f ? T.gold : T.border), color: T.ivory, fontFamily: T.sans, fontSize: 14, fontWeight: 300, outline: "none", transition: "all 0.2s" }} />
    </div>
  );
}

function TextArea({ label, placeholder }) {
  const [f, setF] = useState(false);
  return (
    <div style={{ marginBottom: 20 }}>
      {label && <label style={{ display: "block", fontFamily: T.sans, fontSize: 11, letterSpacing: "0.12em", color: T.muted, textTransform: "uppercase", marginBottom: 8 }}>{label}</label>}
      <textarea placeholder={placeholder} rows={4} onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ width: "100%", padding: "14px 16px", resize: "vertical", background: "rgba(22,22,22,0.6)", border: "1px solid " + (f ? T.gold : T.border), color: T.ivory, fontFamily: T.sans, fontSize: 14, fontWeight: 300, outline: "none", transition: "all 0.2s" }} />
    </div>
  );
}

export default function MembershipPage() {
  const { isMobile } = useBreakpoint();
  const benefits = [
    { icon: "◈", t: "Wszystkie wydarzenia" },
    { icon: "◆", t: "Strefa członkowska" },
    { icon: "◇", t: "Concierge premium" },
    { icon: "✧", t: "Networking 150+ liderów" },
    { icon: "❖", t: "Best of Poland" },
    { icon: "✦", t: "Eleganckie zaproszenia" },
  ];
  return (
    <PageShell>
      <Section padding="140px 48px 80px">
        <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
          <Eyebrow>CZŁONKOSTWO</Eyebrow>
          <Heading size="xl">Zaproszenie do wyjątkowego grona</Heading>
          <div style={{ marginTop: 24 }}><Divider /></div>
          <div style={{ marginTop: 24 }}><Body center>Członkostwo dostępne wyłącznie na zaproszenie lub po rozpatrzeniu aplikacji przez Radę Klubu.</Body></div>
        </div>
      </Section>

      <Section bg={T.bgAlt}>
        <Container>
          <Eyebrow>KORZYŚCI</Eyebrow>
          <div style={{ marginTop: 16, marginBottom: 48 }}><Divider /></div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3,1fr)", gap: isMobile ? 12 : 24 }}>
            {benefits.map((b, i) => <FeatureBox key={i} icon={b.icon} title={b.t} />)}
          </div>
        </Container>
      </Section>

      <Section>
        <Container maxWidth={600}>
          <Eyebrow>FORMULARZ</Eyebrow>
          <Heading size="md">Złóż aplikację</Heading>
          <div style={{ marginTop: 16, marginBottom: 48 }}><Divider /></div>
          <Input label="Imię i nazwisko" placeholder="Jan Kowalski" />
          <Input label="Email" placeholder="jan@example.com" type="email" />
          <Input label="Telefon" placeholder="+48 600 000 000" type="tel" />
          <Input label="Firma / Stanowisko" placeholder="CEO, Firma XYZ" />
          <Input label="Rekomendacja członka (opcjonalnie)" placeholder="Imię i nazwisko" />
          <TextArea label="Dlaczego chcesz dołączyć?" placeholder="Twoje zainteresowania i motywacja..." />
          <GoldBtn large>Wyślij aplikację</GoldBtn>
          <div style={{ marginTop: 16 }}><Body sz={12} muted>Dane przetwarzane zgodnie z RODO. Odpowiadamy w ciągu 14 dni.</Body></div>
        </Container>
      </Section>
    </PageShell>
  );
}
