"use client";
import { T } from "@/components/tokens";
import { Eyebrow, Heading, Body, Caption, GoldDivider, GoldLine, Slot } from "@/components/ui";
import { PageShell } from "@/components/layout";
const values = [
  { title: "Dyskrecja", desc: "Co dzieje się w klubie, zostaje w klubie.", icon: "◈" },
  { title: "Excellencja", desc: "Każde wydarzenie na najwyższym poziomie.", icon: "◆" },
  { title: "Wzajemność", desc: "Dajemy, zanim bierzemy.", icon: "◇" },
  { title: "Dziedzictwo", desc: "Pielęgnujemy polską tradycję i kulturę.", icon: "✧" },
];
const council = [
  { name: "Jan Zamoyski", role: "Przewodniczący Rady", bio: "Potomek rodu Zamoyskich, mecenas sztuki." },
  { name: "Anna Kowalska", role: "Wiceprzewodnicząca", bio: "CEO funduszu PE, kolekcjonerka." },
  { name: "Piotr Nowak", role: "Członek Rady", bio: "Lider technologiczny, pasjonat sportu." },
  { name: "Magdalena Wiśniewska", role: "Członkini Rady", bio: "Kuratorka i ambasadorka kultury." },
];
export default function AboutPage() {
  return (
    <PageShell>
      <section style={{ padding: "140px 48px 100px", textAlign: "center" }}>
        <Eyebrow>O AMBASSADOR CLUB</Eyebrow>
        <Heading size="xl">{"Więcej niż klub —\nfilozofia doskonałości"}</Heading>
        <div style={{ marginTop: 24 }}><GoldDivider /></div>
      </section>
      <section style={{ background: T.bgAlt, padding: "100px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, maxWidth: 1200, margin: "0 auto", alignItems: "center" }}>
          <Slot h={500} label="palace-interior" />
          <div>
            <Eyebrow center={false}>NASZA MISJA</Eyebrow>
            <Heading center={false} size="md">{"Łączymy ludzi, którzy\nkształtują Polskę"}</Heading>
            <div style={{ margin: "20px 0" }}><GoldLine /></div>
            <Body>Ambassador Club powstał z wiary, że najciekawsze rzeczy dzieją się wtedy, gdy spotykają się ludzie wyjątkowi.</Body>
            <div style={{ marginTop: 20 }}><Body italic sz={18}>Nasze wydarzenia odbywają się w najpiękniejszych rezydencjach Polski.</Body></div>
          </div>
        </div>
      </section>
      <section style={{ background: T.bg, padding: "100px 48px" }}>
        <Eyebrow>NASZE WARTOŚCI</Eyebrow><Heading size="md">Na czym stoimy</Heading>
        <div style={{ marginTop: 16, marginBottom: 56 }}><GoldDivider /></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, maxWidth: 1200, margin: "0 auto" }}>
          {values.map((v, i) => (<div key={i} style={{ background: T.bgCard, border: `1px solid ${T.border}`, padding: "36px 28px" }}><div style={{ fontFamily: T.serif, fontSize: 32, color: T.gold, marginBottom: 16 }}>{v.icon}</div><h3 style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 400, color: T.ivory, marginBottom: 12 }}>{v.title}</h3><Body sz={14}>{v.desc}</Body></div>))}
        </div>
      </section>
      <section style={{ background: T.bgAlt, padding: "100px 48px" }}>
        <Eyebrow>RADA HONOROWA</Eyebrow><Heading size="md">Ludzie, którzy tworzą klub</Heading>
        <div style={{ marginTop: 16, marginBottom: 56 }}><GoldDivider /></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 28, maxWidth: 1200, margin: "0 auto" }}>
          {council.map((c, i) => (<div key={i} style={{ background: T.bgCard, border: `1px solid ${T.border}` }}><Slot slot="dark" h={220} label="portrait" /><div style={{ padding: "24px 20px" }}><h4 style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 400, color: T.ivory, margin: "0 0 4px" }}>{c.name}</h4><Caption gold>{c.role}</Caption><div style={{ marginTop: 12 }}><Body sz={13} muted>{c.bio}</Body></div></div></div>))}
        </div>
      </section>
    </PageShell>
  );
}
