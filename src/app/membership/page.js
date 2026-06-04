'use client';
import { useState } from 'react';
import PageShell from '@/components/PageShell';
import { T, Eyebrow, Heading, Body, Divider, GoldBtn, FeatureBox, Section, Container, GoldLine, FadeIn } from '@/components/ui';
import { useBreakpoint } from '@/lib/useBreakpoint';

function Input({ label, placeholder, type = "text", value, onChange }) {
  const [f, setF] = useState(false);
  return (
    <div style={{ marginBottom: 20 }}>
      {label && <label style={{ display: "block", fontFamily: T.sans, fontSize: 11, letterSpacing: "0.12em", color: T.muted, textTransform: "uppercase", marginBottom: 8 }}>{label}</label>}
      <input type={type} placeholder={placeholder} value={value} onChange={onChange}
        onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ width: "100%", padding: "14px 16px", background: "rgba(22,22,22,0.6)", border: "1px solid " + (f ? T.gold : T.border), color: T.ivory, fontFamily: T.sans, fontSize: 14, fontWeight: 300, outline: "none", transition: "all 0.2s" }} />
    </div>
  );
}

function TextArea({ label, placeholder, value, onChange }) {
  const [f, setF] = useState(false);
  return (
    <div style={{ marginBottom: 20 }}>
      {label && <label style={{ display: "block", fontFamily: T.sans, fontSize: 11, letterSpacing: "0.12em", color: T.muted, textTransform: "uppercase", marginBottom: 8 }}>{label}</label>}
      <textarea placeholder={placeholder} rows={4} value={value} onChange={onChange}
        onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ width: "100%", padding: "14px 16px", resize: "vertical", background: "rgba(22,22,22,0.6)", border: "1px solid " + (f ? T.gold : T.border), color: T.ivory, fontFamily: T.sans, fontSize: 14, fontWeight: 300, outline: "none", transition: "all 0.2s" }} />
    </div>
  );
}

function SuccessView() {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", border: `2px solid ${T.gold}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", fontSize: 32, color: T.gold }}>✓</div>
      <h3 style={{ fontFamily: T.serif, fontSize: 30, fontWeight: 300, color: T.ivory, margin: "0 0 16px" }}>Aplikacja wysłana</h3>
      <p style={{ fontFamily: T.sans, fontSize: 15, color: T.muted, fontWeight: 300, lineHeight: 1.8, maxWidth: 420, margin: "0 auto" }}>
        Dziękujemy za złożenie aplikacji. Rada Klubu rozpatrzy Państwa zgłoszenie i skontaktuje się w ciągu 14 dni roboczych.
      </p>
      <div style={{ width: 48, height: 1, background: T.gold, margin: "32px auto" }} />
      <a href="/" style={{ fontFamily: T.sans, fontSize: 12, color: T.gold, textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase" }}>← Powrót na stronę główną</a>
    </div>
  );
}

export default function MembershipPage() {
  const { isMobile } = useBreakpoint();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", recommendation: "", motivation: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSending(true);
    const subject = encodeURIComponent(`Aplikacja o członkostwo — ${form.name}`);
    const body = encodeURIComponent(
      `APLIKACJA O CZŁONKOSTWO\n\nImię i nazwisko: ${form.name}\nEmail: ${form.email}\nTelefon: ${form.phone}\nFirma / Stanowisko: ${form.company}\nRekomendacja: ${form.recommendation || "brak"}\n\nMotywacja:\n${form.motivation}`
    );
    window.location.href = `mailto:b.kawecki@ambassadorclub.pl?subject=${subject}&body=${body}`;
    setTimeout(() => { setSending(false); setSent(true); }, 800);
  };

  const benefits = [
    { icon: "◈", t: "Wszystkie wydarzenia", d: "Priorytowy dostęp do gal, kolacji i wydarzeń zamkniętych przez cały rok" },
    { icon: "◆", t: "Strefa członkowska", d: "Ekskluzywna platforma z archiwum relacji, ofertami i kontaktami do członków" },
    { icon: "◇", t: "Concierge premium", d: "Dedykowany opiekun wspierający rezerwacje, podróże i potrzeby biznesowe" },
    { icon: "✧", t: "Networking 150+ liderów", d: "Grono prezesów, założycieli i osobistości ze świata kultury i biznesu" },
    { icon: "❖", t: "Best of Poland", d: "Dostęp do programu promującego najlepsze polskie marki, miejsca i inicjatywy" },
    { icon: "✦", t: "Eleganckie zaproszenia", d: "Personalizowane zaproszenia na premiery, wernisaże i wydarzenia partnerów" },
  ];

  return (
    <PageShell>
      <Section padding="140px 48px 80px">
        <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
          <Eyebrow>CZŁONKOSTWO</Eyebrow>
          <Heading size="xl">Zaproszenie do wyjątkowego grona</Heading>
          <div style={{ marginTop: 24 }}><Divider /></div>
          <div style={{ marginTop: 24 }}>
            <Body center>Członkostwo dostępne wyłącznie na zaproszenie lub po rozpatrzeniu aplikacji przez Radę Klubu.</Body>
          </div>
        </div>
      </Section>

      <Section bg={T.bgAlt}>
        <Container>
          <FadeIn><Eyebrow>KORZYŚCI</Eyebrow>
          <div style={{ marginTop: 16, marginBottom: 48 }}><Divider /></div></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3,1fr)", gap: isMobile ? 12 : 24 }}>
            {benefits.map((b, i) => <FadeIn key={i} delay={i * 60}><FeatureBox icon={b.icon} title={b.t} desc={b.d} /></FadeIn>)}
          </div>
        </Container>
      </Section>

      <Section>
        <Container maxWidth={600}>
          <Eyebrow>FORMULARZ APLIKACYJNY</Eyebrow>
          <Heading size="md">Złóż aplikację</Heading>
          <div style={{ marginTop: 16, marginBottom: 40 }}><Divider /></div>

          {sent ? <SuccessView /> : (
            <form onSubmit={handleSubmit}>
              <Input label="Imię i nazwisko *" placeholder="Jan Kowalski" value={form.name} onChange={set("name")} />
              <Input label="Email *" placeholder="jan@example.com" type="email" value={form.email} onChange={set("email")} />
              <Input label="Telefon" placeholder="+48 600 000 000" type="tel" value={form.phone} onChange={set("phone")} />
              <Input label="Firma / Stanowisko" placeholder="CEO, Firma XYZ" value={form.company} onChange={set("company")} />
              <Input label="Rekomendacja członka (opcjonalnie)" placeholder="Imię i nazwisko" value={form.recommendation} onChange={set("recommendation")} />
              <TextArea label="Dlaczego chcesz dołączyć? *" placeholder="Twoje zainteresowania i motywacja..." value={form.motivation} onChange={set("motivation")} />

              <button type="submit" disabled={sending}
                style={{ background: sending ? T.goldDark : T.gold, color: T.bg, border: "none", padding: "18px 48px", fontFamily: T.sans, fontSize: 14, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: sending ? "not-allowed" : "pointer", transition: "all 0.3s", opacity: sending ? 0.7 : 1, width: "100%" }}>
                {sending ? "Wysyłam..." : "Wyślij aplikację"}
              </button>

              <div style={{ marginTop: 16 }}>
                <Body sz={12} muted>* Pola wymagane. Dane przetwarzane zgodnie z RODO. Odpowiadamy w ciągu 14 dni roboczych.</Body>
              </div>
            </form>
          )}
        </Container>
      </Section>
    </PageShell>
  );
}
