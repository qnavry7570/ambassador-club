"use client";
import { T } from "@/components/tokens";
import { Eyebrow, Heading, Body, GoldDivider, Btn } from "@/components/ui";
import { PageShell } from "@/components/layout";
import Link from "next/link";
export default function Page() {
  return (
    <PageShell>
      <section style={{ padding: "140px 48px 100px", textAlign: "center" }}>
        <Eyebrow>KULTURA</Eyebrow>
        <Heading size="xl">Sztuka i kultura</Heading>
        <div style={{ marginTop: 24 }}><GoldDivider /></div>
        <div style={{ marginTop: 24 }}><Body center>Pełna wersja tej strony jest w przygotowaniu.</Body></div>
        <div style={{ marginTop: 40 }}><Link href="/"><Btn variant="ghost">Strona główna</Btn></Link></div>
      </section>
    </PageShell>
  );
}
