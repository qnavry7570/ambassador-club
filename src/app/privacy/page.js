'use client';
import PageShell from '@/components/PageShell';
import { T, Eyebrow, Heading, Body, Section, Container } from '@/components/ui';

export default function PrivacyPage() {
  const sections = [
    {
      title: "Administrator danych",
      content: "Administratorem danych osobowych jest Ambassador Club, Warsaw Financial Center, Emilii Plater 53, 00-113 Warszawa. Kontakt: b.kawecki@ambassadorclub.pl"
    },
    {
      title: "Cel przetwarzania danych",
      content: "Dane osobowe przetwarzane są w celu: rozpatrzenia aplikacji o członkostwo, odpowiedzi na zapytania kontaktowe, realizacji usług klubowych dla członków oraz wysyłki informacji o wydarzeniach (za zgodą)."
    },
    {
      title: "Podstawa prawna",
      content: "Podstawą prawną przetwarzania danych jest art. 6 ust. 1 lit. a RODO (zgoda), art. 6 ust. 1 lit. b RODO (wykonanie umowy) oraz art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes administratora)."
    },
    {
      title: "Prawa użytkownika",
      content: "Przysługuje Państwu prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia oraz wniesienia sprzeciwu. Przysługuje również prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych."
    },
    {
      title: "Okres przechowywania",
      content: "Dane przechowywane są przez okres niezbędny do realizacji celu przetwarzania, nie dłużej niż 3 lata od ostatniego kontaktu lub do momentu wycofania zgody."
    },
    {
      title: "Pliki cookies",
      content: "Strona nie używa zewnętrznych plików cookies analitycznych ani reklamowych. Używamy wyłącznie technicznych plików sesji niezbędnych do działania strony."
    },
    {
      title: "Kontakt",
      content: "W sprawach związanych z ochroną danych osobowych prosimy o kontakt: b.kawecki@ambassadorclub.pl lub telefonicznie: +48 501 979 859."
    },
  ];

  return (
    <PageShell>
      <Section padding="140px 48px 60px">
        <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
          <Eyebrow>DOKUMENTY PRAWNE</Eyebrow>
          <Heading size="xl">Polityka prywatności</Heading>
          <div style={{ marginTop: 16 }}>
            <Body center>Obowiązuje od 1 stycznia 2026</Body>
          </div>
        </div>
      </Section>

      <Section bg={T.bgAlt} padding="60px 48px 100px">
        <Container maxWidth={800}>
          {sections.map((s, i) => (
            <div key={i} style={{ marginBottom: 40, paddingBottom: 40, borderBottom: i < sections.length - 1 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 16 }}>
                <div style={{ fontFamily: T.serif, fontSize: 20, color: T.gold, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}.</div>
                <h3 style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 400, color: T.ivory, margin: 0 }}>{s.title}</h3>
              </div>
              <Body>{s.content}</Body>
            </div>
          ))}
        </Container>
      </Section>
    </PageShell>
  );
}
