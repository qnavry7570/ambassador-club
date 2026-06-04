'use client';
import { T } from './ui';
import { useBreakpoint } from '@/lib/useBreakpoint';

export default function Footer() {
  const { isMobile, isTablet } = useBreakpoint();
  const cols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "2fr 1fr 1fr 1fr";
  const gap = isMobile ? 40 : 64;

  return (
    <footer style={{ background: "#060606", padding: isMobile ? "60px 20px 32px" : "80px 48px 40px" }}>
      <div style={{ display: "grid", gridTemplateColumns: cols, gap, maxWidth: 1200, margin: "0 auto" }}>
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 700, letterSpacing: "0.25em", color: T.gold, marginBottom: 12 }}>AMBASSADOR CLUB</div>
          <div style={{ fontFamily: T.serif, fontSize: 15, fontStyle: "italic", color: T.dim, marginBottom: 28 }}>Where Poland's Finest Meet</div>
          {/* Loga inicjatyw */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <img
              src="/images/logo-best-of-poland.webp"
              alt="The Best of Poland"
              style={{ height: 48, width: "auto", opacity: 0.85, filter: "brightness(0.9)" }}
              loading="lazy"
            />
            <div style={{ width: 1, height: 40, background: "rgba(201,169,97,0.2)" }} />
            <img
              src="/images/logo-cigar-club.webp"
              alt="Ambassador Cigar Club"
              style={{ height: 48, width: "auto", opacity: 0.85 }}
              loading="lazy"
            />
          </div>
        </div>
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: T.ivory, textTransform: "uppercase", marginBottom: 24 }}>Klub</div>
          {[{ l: "O nas", h: "/about" }, { l: "Filary", h: "/sport" }, { l: "Journal", h: "/journal" }, { l: "Kontakt", h: "/contact" }].map((x, i) => (
            <a key={i} href={x.h} style={{ display: "block", fontFamily: T.sans, fontSize: 13, color: T.muted, textDecoration: "none", marginBottom: 12, fontWeight: 300 }}>{x.l}</a>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: T.ivory, textTransform: "uppercase", marginBottom: 24 }}>Członkostwo</div>
          {[{ l: "Korzyści", h: "/membership" }, { l: "Proces aplikacyjny", h: "/membership" }, { l: "Wydarzenia", h: "/events" }, { l: "Members Area", h: "/login" }].map((x, i) => (
            <a key={i} href={x.h} style={{ display: "block", fontFamily: T.sans, fontSize: 13, color: T.muted, textDecoration: "none", marginBottom: 12, fontWeight: 300 }}>{x.l}</a>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: T.ivory, textTransform: "uppercase", marginBottom: 24 }}>Kontakt</div>
          <div style={{ fontFamily: T.sans, fontSize: 13, color: T.muted, fontWeight: 300, lineHeight: 2.0 }}>
            Warsaw Financial Center<br />
            Emilii Plater 53<br />
            00-113 Warszawa<br />
            <a href="mailto:b.kawecki@ambassadorclub.pl" style={{ color: T.gold, textDecoration: "none" }}>b.kawecki@ambassadorclub.pl</a><br />
            <a href="tel:+48501979859" style={{ color: T.muted, textDecoration: "none" }}>+48 501 979 859</a>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 64, paddingTop: 24, borderTop: "1px solid rgba(201,169,97,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: T.sans, fontSize: 11, color: T.ghost }}>© 2026 Ambassador Club · Best of Poland. Wszelkie prawa zastrzeżone.</span>
        <a href="/privacy" style={{ fontFamily: T.sans, fontSize: 11, color: T.dim, textDecoration: "none" }}>Polityka prywatności</a>
      </div>
    </footer>
  );
}
