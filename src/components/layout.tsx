"use client";
import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { T } from "./tokens";

function NavLink({ href, children, active }: { href: string; children: ReactNode; active?: boolean }) {
  const [h, setH] = useState(false);
  return (
    <Link href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ fontFamily: T.sans, fontSize: 12, fontWeight: active ? 400 : 300, color: active ? T.gold : h ? T.ivory : T.muted, transition: "all 0.2s", letterSpacing: "0.06em" }}>
      {children}
    </Link>
  );
}

function PillarDropdown() {
  const [open, setOpen] = useState(false);
  const items = [
    { href: "/sport", label: "Sport" },
    { href: "/culture", label: "Sztuka i Kultura" },
    { href: "/philanthropy", label: "Filantropia" },
    { href: "/bestofpoland", label: "Best of Poland" },
  ];
  return (
    <div style={{ position: "relative" }} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <span style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 300, color: T.muted, cursor: "pointer", letterSpacing: "0.06em" }}>Filary ▾</span>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: -16, background: "rgba(15,15,15,0.98)", border: `1px solid ${T.border}`, padding: "8px 0", minWidth: 200, backdropFilter: "blur(20px)", zIndex: 100 }}>
          {items.map(p => (
            <Link key={p.href} href={p.href}
              style={{ display: "block", padding: "10px 24px", fontFamily: T.sans, fontSize: 12, color: T.muted, transition: "all 0.2s", letterSpacing: "0.05em" }}
              onClick={() => setOpen(false)}>
              {p.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 48px", height: 72,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid rgba(201,169,97,0.1)` : "none",
      transition: "all 0.4s ease",
    }}>
      <Link href="/" style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 700, letterSpacing: "0.25em", color: T.gold }}>AMBASSADOR CLUB</span>
        <span style={{ fontFamily: T.serif, fontSize: 11, fontStyle: "italic", color: T.dim }}>Best of Poland</span>
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <NavLink href="/about">O Klubie</NavLink>
        <PillarDropdown />
        <NavLink href="/events">Wydarzenia</NavLink>
        <NavLink href="/membership">Członkostwo</NavLink>
        <NavLink href="/journal">Journal</NavLink>
        <NavLink href="/contact">Kontakt</NavLink>
        <Link href="/auth" style={{
          background: "transparent", border: `1px solid ${T.gold}`, color: T.gold,
          padding: "7px 18px", fontSize: 10, fontFamily: T.sans, letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}>
          Members Area
        </Link>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer style={{ background: "#060606", padding: "80px 48px 40px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 64, maxWidth: 1200, margin: "0 auto" }}>
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 700, letterSpacing: "0.25em", color: T.gold, marginBottom: 12 }}>AMBASSADOR CLUB</div>
          <div style={{ fontFamily: T.serif, fontSize: 15, fontStyle: "italic", color: T.dim, marginBottom: 20 }}>Where Poland&apos;s Finest Meet</div>
          <span style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.1em", color: T.dim }}>BEST OF POLAND</span>
        </div>
        <div>
          <span style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.12em", color: T.gold, textTransform: "uppercase" }}>Klub</span>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            {[{h:"/about",l:"O nas"},{h:"/events",l:"Wydarzenia"},{h:"/membership",l:"Członkostwo"},{h:"/journal",l:"Journal"}].map(p => (
              <Link key={p.h} href={p.h} style={{ fontFamily: T.sans, fontSize: 13, color: T.muted, fontWeight: 300 }}>{p.l}</Link>
            ))}
          </div>
        </div>
        <div>
          <span style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.12em", color: T.gold, textTransform: "uppercase" }}>Filary</span>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            {[{h:"/sport",l:"Sport"},{h:"/culture",l:"Kultura"},{h:"/philanthropy",l:"Filantropia"},{h:"/bestofpoland",l:"Best of Poland"}].map(p => (
              <Link key={p.h} href={p.h} style={{ fontFamily: T.sans, fontSize: 13, color: T.muted, fontWeight: 300 }}>{p.l}</Link>
            ))}
          </div>
        </div>
        <div>
          <span style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.12em", color: T.gold, textTransform: "uppercase" }}>Kontakt</span>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            <span style={{ fontFamily: T.sans, fontSize: 13, color: T.muted, fontWeight: 300 }}>ul. Foksal 3/5</span>
            <span style={{ fontFamily: T.sans, fontSize: 13, color: T.muted, fontWeight: 300 }}>00-366 Warszawa</span>
            <span style={{ fontFamily: T.sans, fontSize: 13, color: T.gold, fontWeight: 300 }}>concierge@ambassadorclub.pl</span>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 64, paddingTop: 24, borderTop: `1px solid rgba(201,169,97,0.06)`, textAlign: "center" }}>
        <span style={{ fontFamily: T.sans, fontSize: 11, color: T.ghost }}>© 2026 Ambassador Club · Best of Poland. Wszelkie prawa zastrzeżone.</span>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div style={{ background: T.bg, color: T.ivory, minHeight: "100vh" }}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
