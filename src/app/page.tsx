"use client";
import { useState } from "react";
import Link from "next/link";
import { T } from "@/components/tokens";
import { Eyebrow, Heading, Body, Caption, GoldDivider, GoldLine, Btn, Slot, HoverCard } from "@/components/ui";
import { PageShell } from "@/components/layout";

function HeroSection() {
  return (
    <section style={{ position: "relative", minHeight: "90vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#1a1510,#2a1f15,#1a1510)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 40%,rgba(201,169,97,0.06) 0%,transparent 60%)" }} />
      <div style={{ position: "relative", zIndex: 2, padding: "0 80px", maxWidth: 780 }}>
        <Caption gold>EST. 2024 · WARSAW</Caption>
        <h1 style={{ fontFamily: T.serif, fontSize: 68, fontWeight: 300, color: T.ivory, lineHeight: 1.05, margin: "20px 0 0", whiteSpace: "pre-line" }}>
          {"Where Poland's\nFinest Meet"}
        </h1>
        <GoldLine w={60} />
        <p style={{ fontFamily: T.sans, fontSize: 17, fontWeight: 300, color: T.ivoryDim, lineHeight: 1.7, maxWidth: 500, marginTop: 24 }}>
          Ekskluzywny klub łączący liderów biznesu, sportu, sztuki i filantropii w jedną społeczność najwybitniejszych.
        </p>
        <div style={{ display: "flex", gap: 16, marginTop: 48 }}>
          <Link href="/membership"><Btn variant="gold" sz="lg">Aplikuj o członkostwo</Btn></Link>
          <Link href="/about"><Btn variant="ghost" sz="lg">Odkryj więcej</Btn></Link>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div style={{ width: 1, height: 48, background: `linear-gradient(180deg, transparent, ${T.gold})` }} />
      </div>
    </section>
  );
}

function PillarsSection() {
  const items = [
    { t: "Sport", d: "Wyścigi konne, polo, golf, jachting", s: "sport", href: "/sport" },
    { t: "Sztuka i Kultura", d: "Mecenat, kolekcjonerstwo, wernisaże", s: "culture", href: "/culture" },
    { t: "Filantropia", d: "Aukcje charytatywne, wspólne inicjatywy", s: "philanthropy", href: "/philanthropy" },
    { t: "Best of Poland", d: "Polskie marki premium, rzemiosło, sukcesy", s: "poland", href: "/bestofpoland" },
  ];
  return (
    <section style={{ background: T.bg, padding: "100px 48px" }}>
      <Eyebrow>NASZE FILARY</Eyebrow>
      <Heading size="lg">Cztery wymiary doskonałości</Heading>
      <div style={{ marginTop: 16, marginBottom: 56 }}><GoldDivider /></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, maxWidth: 1200, margin: "0 auto" }}>
        {items.map((x, i) => (
          <Link key={i} href={x.href} style={{ textDecoration: "none" }}>
            <HoverCard>
              <Slot slot={x.s} h={200} label={x.t} />
              <div style={{ padding: "24px 20px" }}>
                <Caption gold>{x.t}</Caption>
                <Body sz={14}>{x.d}</Body>
              </div>
            </HoverCard>
          </Link>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section style={{ background: T.bgAlt, padding: "100px 48px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, maxWidth: 1200, margin: "0 auto", alignItems: "center" }}>
        <div>
          <Eyebrow center={false}>O AMBASSADOR CLUB</Eyebrow>
          <Heading center={false} size="md">Tradycja spotyka przyszłość</Heading>
          <div style={{ margin: "20px 0" }}><GoldLine /></div>
          <Body>Ambassador Club to inicjatywa zrodzona z przekonania, że prawdziwy sukces mierzy się nie tylko osiągnięciami, ale również tym, jak inspirujemy innych.</Body>
          <div style={{ display: "flex", gap: 48, marginTop: 40 }}>
            {[{ v: "150+", l: "Członków" }, { v: "48", l: "Wydarzeń" }, { v: "12", l: "Miast" }].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: T.serif, fontSize: 36, fontWeight: 300, color: T.gold }}>{s.v}</div>
                <Caption>{s.l}</Caption>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40 }}><Link href="/about"><Btn variant="ghost">Więcej o klubie →</Btn></Link></div>
        </div>
        <Slot slot="culture" h={460} label="galeria-event" />
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section style={{ background: T.bg, padding: "120px 48px", textAlign: "center", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center,rgba(92,26,27,0.1) 0%,transparent 60%)" }} />
      <div style={{ position: "relative" }}>
        <GoldDivider />
        <div style={{ marginTop: 48 }}><Heading size="xl">Dołącz do grona najwybitniejszych</Heading></div>
        <Body center italic sz={18}>Membership by invitation only</Body>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 40 }}>
          <Link href="/membership"><Btn variant="gold" sz="lg">Aplikuj o członkostwo</Btn></Link>
          <Link href="/contact"><Btn variant="ghost" sz="lg">Zapytaj prywatnie</Btn></Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <PageShell>
      <HeroSection />
      <PillarsSection />
      <AboutSection />
      <CtaSection />
    </PageShell>
  );
}
