'use client';
import { useState } from 'react';
import { T, GoldBtn, GhostBtn } from '@/components/ui';
import { useBreakpoint } from '@/lib/useBreakpoint';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  const { isMobile } = useBreakpoint();
  const [hovered, setHovered] = useState(null);

  const links = [
    { label: 'Strona główna', href: '/' },
    { label: 'O klubie', href: '/about' },
    { label: 'Wydarzenia', href: '/events' },
    { label: 'Kontakt', href: '/contact' },
  ];

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 72, background: T.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: isMobile ? '80px 24px' : '120px 48px' }}>

          {/* Ambient glow */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,169,97,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: 680 }}>

            {/* 404 numeral */}
            <div style={{ fontFamily: T.serif, fontSize: isMobile ? 120 : 200, fontWeight: 300, color: 'transparent', WebkitTextStroke: `1px rgba(201,169,97,0.2)`, lineHeight: 1, marginBottom: isMobile ? -20 : -40, userSelect: 'none', letterSpacing: '-0.02em' }}>
              404
            </div>

            {/* Gold ornament */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, margin: '0 auto 32px' }}>
              <div style={{ height: 1, width: 60, background: `linear-gradient(90deg, transparent, ${T.gold})` }} />
              <svg width="16" height="16" viewBox="0 0 18 18"><path d="M9 0L11.5 6.5L18 9L11.5 11.5L9 18L6.5 11.5L0 9L6.5 6.5Z" fill={T.gold} opacity={0.6} /></svg>
              <div style={{ height: 1, width: 60, background: `linear-gradient(90deg, ${T.gold}, transparent)` }} />
            </div>

            <div style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 400, letterSpacing: '0.35em', color: T.gold, textTransform: 'uppercase', marginBottom: 20 }}>
              Strona nie istnieje
            </div>

            <h1 style={{ fontFamily: T.serif, fontSize: isMobile ? 28 : 42, fontWeight: 300, color: T.ivory, lineHeight: 1.2, margin: '0 0 20px' }}>
              Ta strona przeniosła się<br />w inne miejsce
            </h1>

            <p style={{ fontFamily: T.sans, fontSize: isMobile ? 14 : 16, fontWeight: 300, color: T.muted, lineHeight: 1.8, margin: '0 0 48px' }}>
              Być może adres uległ zmianie lub strona nigdy nie istniała.<br />
              Zapraszamy do eksploracji Ambassador Club.
            </p>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64 }}>
              <GoldBtn href="/">Wróć na stronę główną</GoldBtn>
              <GhostBtn href="/contact">Skontaktuj się</GhostBtn>
            </div>

            {/* Quick nav */}
            <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 40 }}>
              <div style={{ fontFamily: T.sans, fontSize: 10, fontWeight: 400, letterSpacing: '0.25em', color: T.dim, textTransform: 'uppercase', marginBottom: 24 }}>
                Szybka nawigacja
              </div>
              <div style={{ display: 'flex', gap: isMobile ? 24 : 40, justifyContent: 'center', flexWrap: 'wrap' }}>
                {links.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    onMouseEnter={() => setHovered(href)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      fontFamily: T.sans,
                      fontSize: 13,
                      fontWeight: 400,
                      letterSpacing: '0.08em',
                      color: hovered === href ? T.gold : T.muted,
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                      textTransform: 'uppercase',
                    }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
