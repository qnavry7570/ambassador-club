'use client';
import { useState } from 'react';
import PageShell from '@/components/PageShell';
import { T, Eyebrow, Heading, Body, Divider, GoldBtn, Section, Container } from '@/components/ui';
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
      <textarea placeholder={placeholder} rows={5} value={value} onChange={onChange}
        onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ width: "100%", padding: "14px 16px", resize: "vertical", background: "rgba(22,22,22,0.6)", border: "1px solid " + (f ? T.gold : T.border), color: T.ivory, fontFamily: T.sans, fontSize: 14, fontWeight: 300, outline: "none", transition: "all 0.2s" }} />
    </div>
  );
}

function SuccessMessage() {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", border: `2px solid ${T.gold}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 28 }}>✓</div>
      <h3 style={{ fontFamily: T.serif, fontSize: 28, fontWeight: 300, color: T.ivory, margin: "0 0 16px" }}>Wiadomość wysłana</h3>
      <p style={{ fontFamily: T.sans, fontSize: 15, color: T.muted, fontWeight: 300, lineHeight: 1.7 }}>
        Dziękujemy za kontakt. Odpowiemy na adres e-mail<br />w ciągu 24 godzin roboczych.
      </p>
      <div style={{ marginTop: 32, width: 48, height: 1, background: T.gold, margin: "32px auto 0" }} />
    </div>
  );
}

export default function ContactPage() {
  const { isMobile } = useBreakpoint();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    // mailto fallback — otwiera klienta pocztowego z wypełnioną wiadomością
    const subject = encodeURIComponent(`Kontakt od ${form.name} — Ambassador Club`);
    const body = encodeURIComponent(`Imię i nazwisko: ${form.name}\nEmail: ${form.email}\n\nWiadomość:\n${form.message}`);
    window.location.href = `mailto:b.kawecki@ambassadorclub.pl?subject=${subject}&body=${body}`;
    setTimeout(() => { setSending(false); setSent(true); }, 800);
  };

  return (
    <PageShell>
      <Section padding="140px 48px 60px">
        <div style={{ textAlign: "center" }}>
          <Eyebrow>KONTAKT</Eyebrow>
          <Heading size="xl">Skontaktuj się z nami</Heading>
          <div style={{ marginTop: 24 }}><Divider /></div>
        </div>
      </Section>

      <Section bg={T.bgAlt} padding="80px 48px 120px">
        <Container maxWidth={1100}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 48 : 80 }}>

            {/* Formularz */}
            <div>
              <Eyebrow center={false}>NAPISZ DO NAS</Eyebrow>
              {sent ? <SuccessMessage /> : (
                <form onSubmit={handleSubmit} style={{ marginTop: 8 }}>
                  <Input label="Imię i nazwisko" placeholder="Jan Kowalski"
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  <Input label="Email" placeholder="jan@example.com" type="email"
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  <TextArea label="Wiadomość" placeholder="Twoja wiadomość..."
                    value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                  <button type="submit" disabled={sending}
                    style={{ background: sending ? T.goldDark : T.gold, color: T.bg, border: "none", padding: "16px 40px", fontFamily: T.sans, fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: sending ? "not-allowed" : "pointer", transition: "all 0.3s", opacity: sending ? 0.7 : 1 }}>
                    {sending ? "Wysyłam..." : "Wyślij wiadomość"}
                  </button>
                </form>
              )}
            </div>

            {/* Informacje */}
            <div>
              <Eyebrow center={false}>INFORMACJE</Eyebrow>
              <div style={{ marginTop: 8 }}>
                <div style={{ marginBottom: 36 }}>
                  <div style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.12em", color: T.gold, textTransform: "uppercase", marginBottom: 12 }}>Biuro klubu</div>
                  <Body>Warsaw Financial Center</Body>
                  <Body>Emilii Plater 53</Body>
                  <Body>00-113 Warszawa</Body>
                </div>
                <div style={{ marginBottom: 36 }}>
                  <div style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.12em", color: T.gold, textTransform: "uppercase", marginBottom: 12 }}>Kontakt bezpośredni</div>
                  <a href="mailto:b.kawecki@ambassadorclub.pl" style={{ display: "block", fontFamily: T.sans, fontSize: 14, fontWeight: 300, color: T.gold, textDecoration: "none", marginBottom: 6 }}>
                    b.kawecki@ambassadorclub.pl
                  </a>
                  <a href="tel:+48501979859" style={{ display: "block", fontFamily: T.sans, fontSize: 14, fontWeight: 300, color: T.muted, textDecoration: "none", marginBottom: 8 }}>
                    +48 501 979 859
                  </a>
                  <div style={{ marginTop: 8 }}><Body sz={13} muted>Dostępny pon–pt 10:00–18:00</Body></div>
                </div>
                <div style={{ marginBottom: 36 }}>
                  <div style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.12em", color: T.gold, textTransform: "uppercase", marginBottom: 12 }}>Prasa i media</div>
                  <a href="mailto:b.kawecki@ambassadorclub.pl" style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 300, color: T.muted, textDecoration: "none" }}>
                    b.kawecki@ambassadorclub.pl
                  </a>
                </div>

                {/* Mapa placeholder */}
                <div style={{ border: `1px solid ${T.border}`, padding: "20px", background: "rgba(22,22,22,0.4)" }}>
                  <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: "0.15em", color: T.gold, textTransform: "uppercase", marginBottom: 8 }}>Warsaw Financial Center</div>
                  <div style={{ fontFamily: T.serif, fontSize: 15, fontStyle: "italic", color: T.dim }}>Emilii Plater 53, 00-113 Warszawa</div>
                  <a href="https://maps.google.com/?q=Emilii+Plater+53+Warszawa" target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-block", marginTop: 12, fontFamily: T.sans, fontSize: 11, color: T.gold, textDecoration: "none", letterSpacing: "0.08em", borderBottom: `1px solid ${T.goldMuted}` }}>
                    Otwórz w Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
