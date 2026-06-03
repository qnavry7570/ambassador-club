'use client';
import { useState, useEffect } from 'react';
import { T } from './ui';

const pillars = [
  { href: "/sport", l: "Sport" },
  { href: "/culture", l: "Sztuka i Kultura" },
  { href: "/philanthropy", l: "Filantropia" },
  { href: "/bestofpoland", l: "Best of Poland" },
];
const links = [
  { href: "/about", l: "O Klubie" },
  { href: "/events", l: "Wydarzenia" },
  { href: "/membership", l: "Członkostwo" },
  { href: "/journal", l: "Journal" },
  { href: "/contact", l: "Kontakt" },
];

function NavLink({ href, children }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 300, letterSpacing: "0.08em", color: T.ivory, textDecoration: "none", opacity: h ? 1 : 0.7, transition: "all 0.2s" }}>
      {children}
    </a>
  );
}

function Hamburger({ open, onClick }) {
  return (
    <button onClick={onClick} aria-label="Menu" style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {open
        ? <svg width="22" height="22" viewBox="0 0 22 22"><path d="M3 3L19 19M19 3L3 19" stroke={T.gold} strokeWidth="1.5" /></svg>
        : <svg width="22" height="16" viewBox="0 0 22 16"><line y1="0.75" x2="22" y2="0.75" stroke={T.gold} strokeWidth="1.5" /><line y1="8" x2="16" y2="8" stroke={T.gold} strokeWidth="1.5" /><line y1="15.25" x2="22" y2="15.25" stroke={T.gold} strokeWidth="1.5" /></svg>
      }
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [pillarsOpen, setPillarsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileFilarOpen, setMobileFilarOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    onResize();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navBg = scrolled || menuOpen ? "rgba(10,10,10,0.97)" : "transparent";
  const navBlur = scrolled || menuOpen ? "blur(20px)" : "none";

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, padding: isMobile ? "0 20px" : "0 48px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between", background: navBg, backdropFilter: navBlur, borderBottom: scrolled && !menuOpen ? "1px solid rgba(201,169,97,0.1)" : "none", transition: "background 0.4s, backdrop-filter 0.4s" }}>
        <a href="/" style={{ display: "flex", alignItems: "baseline", gap: 10, textDecoration: "none" }}>
          <span style={{ fontFamily: T.sans, fontSize: isMobile ? 10 : 13, fontWeight: 700, letterSpacing: "0.22em", color: T.gold }}>AMBASSADOR CLUB</span>
          {!isMobile && <span style={{ fontFamily: T.serif, fontSize: 12, fontStyle: "italic", color: T.dim, letterSpacing: "0.1em" }}>Best of Poland</span>}
        </a>

        {isMobile ? (
          <Hamburger open={menuOpen} onClick={() => setMenuOpen(o => !o)} />
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <NavLink href="/about">O Klubie</NavLink>
            <div style={{ position: "relative" }} onMouseEnter={() => setPillarsOpen(true)} onMouseLeave={() => setPillarsOpen(false)}>
              <span style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 300, letterSpacing: "0.08em", color: T.ivory, cursor: "pointer", opacity: 0.7 }}>Filary ▾</span>
              {pillarsOpen && (
                <div style={{ position: "absolute", top: "100%", left: -16, background: "rgba(15,15,15,0.98)", border: `1px solid ${T.border}`, padding: "8px 0", minWidth: 200, backdropFilter: "blur(20px)", marginTop: 8 }}>
                  {pillars.map(p => <a key={p.href} href={p.href} style={{ display: "block", padding: "10px 24px", fontFamily: T.sans, fontSize: 12, color: T.muted, textDecoration: "none", letterSpacing: "0.05em" }}>{p.l}</a>)}
                </div>
              )}
            </div>
            <NavLink href="/events">Wydarzenia</NavLink>
            <NavLink href="/membership">Członkostwo</NavLink>
            <NavLink href="/journal">Journal</NavLink>
            <NavLink href="/contact">Kontakt</NavLink>
            <a href="/login" style={{ background: "transparent", border: `1px solid ${T.gold}`, color: T.gold, padding: "8px 20px", fontSize: 11, fontFamily: T.sans, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>Members Area</a>
          </div>
        )}
      </nav>

      {isMobile && menuOpen && (
        <div style={{ position: "fixed", top: 72, left: 0, right: 0, bottom: 0, zIndex: 199, background: "rgba(8,8,8,0.99)", backdropFilter: "blur(24px)", overflowY: "auto", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "24px 0", flex: 1 }}>
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                style={{ display: "block", fontFamily: T.serif, fontSize: 26, fontWeight: 300, color: T.ivory, textDecoration: "none", padding: "14px 32px", borderBottom: `1px solid ${T.border}`, letterSpacing: "0.04em" }}>
                {l.l}
              </a>
            ))}
            <div style={{ borderBottom: `1px solid ${T.border}` }}>
              <button onClick={() => setMobileFilarOpen(o => !o)}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: "none", border: "none", cursor: "pointer", padding: "14px 32px", fontFamily: T.serif, fontSize: 26, fontWeight: 300, color: T.ivory, letterSpacing: "0.04em" }}>
                <span>Filary</span>
                <span style={{ fontSize: 16, color: T.gold, transform: mobileFilarOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>▸</span>
              </button>
              {mobileFilarOpen && (
                <div style={{ paddingBottom: 8 }}>
                  {pillars.map(p => (
                    <a key={p.href} href={p.href} onClick={() => setMenuOpen(false)}
                      style={{ display: "block", fontFamily: T.sans, fontSize: 14, color: T.muted, textDecoration: "none", padding: "10px 48px", letterSpacing: "0.05em" }}>
                      {p.l}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div style={{ padding: "32px" }}>
            <a href="/login" onClick={() => setMenuOpen(false)}
              style={{ display: "block", textAlign: "center", background: "transparent", border: `1px solid ${T.gold}`, color: T.gold, padding: "16px 32px", fontSize: 12, fontFamily: T.sans, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>
              Members Area
            </a>
          </div>
        </div>
      )}
    </>
  );
}
