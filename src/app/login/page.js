'use client';
import { useState } from 'react';
import { T, Eyebrow, Heading, Body, Divider } from '@/components/ui';
import { useBreakpoint } from '@/lib/useBreakpoint';

function AuthInput({ label, placeholder, type = "text", icon }) {
  const [f, setF] = useState(false);
  return (
    <div style={{ marginBottom: 20 }}>
      {label && <label style={{ display: "block", fontFamily: T.sans, fontSize: 11, letterSpacing: "0.12em", color: T.muted, textTransform: "uppercase", marginBottom: 8 }}>{label}</label>}
      <div style={{ position: "relative" }}>
        {icon && <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: f ? T.gold : T.dim, transition: "color 0.2s" }}>{icon}</div>}
        <input type={type} placeholder={placeholder} onFocus={() => setF(true)} onBlur={() => setF(false)}
          style={{ width: "100%", padding: icon ? "15px 16px 15px 44px" : "15px 16px", background: "rgba(22,22,22,0.6)", border: `1px solid ${f ? T.gold : T.border}`, color: T.ivory, fontFamily: T.sans, fontSize: 15, fontWeight: 300, outline: "none", transition: "all 0.25s" }} />
      </div>
    </div>
  );
}

function LoginBtn({ children, onClick, variant = "gold" }) {
  const [h, setH] = useState(false);
  const isGold = variant === "gold";
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ width: "100%", padding: "16px 24px", background: isGold ? (h ? T.goldLight : T.gold) : "transparent", color: isGold ? T.bg : (h ? T.gold : T.ivory), border: isGold ? "none" : `1px solid ${h ? T.gold : "rgba(245,241,232,0.2)"}`, fontFamily: T.sans, fontSize: 13, fontWeight: isGold ? 700 : 400, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s" }}>
      {children}
    </button>
  );
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { isMobile } = useBreakpoint();

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { window.location.href = "/members"; }, 1200);
  };

  /* ── MOBILE ── */
  if (isMobile) {
    return (
      <div style={{ minHeight: "100vh", background: T.bg, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "32px 24px 24px", textAlign: "center", borderBottom: `1px solid ${T.border}` }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 700, letterSpacing: "0.28em", color: T.gold }}>AMBASSADOR CLUB</div>
            <div style={{ fontFamily: T.serif, fontSize: 13, fontStyle: "italic", color: T.dim, marginTop: 4 }}>Best of Poland</div>
          </a>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "32px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: "0.3em", color: T.gold, textTransform: "uppercase", marginBottom: 12 }}>STREFA CZŁONKOWSKA</div>
            <h1 style={{ fontFamily: T.serif, fontSize: 30, fontWeight: 300, color: T.ivory, margin: 0 }}>Witaj ponownie</h1>
            <p style={{ fontFamily: T.sans, fontSize: 14, color: T.muted, fontWeight: 300, marginTop: 10 }}>Zaloguj się do swojego konta</p>
          </div>
          <AuthInput label="Email" placeholder="twoj@email.com" type="email" icon="✉" />
          <AuthInput label="Hasło" placeholder="••••••••" type="password" icon="🔒" />
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
            <span style={{ fontFamily: T.sans, fontSize: 12, color: T.muted, cursor: "pointer" }}>Nie pamiętasz hasła?</span>
          </div>
          <LoginBtn onClick={handleLogin}>{loading ? "Loguję..." : "Zaloguj się"}</LoginBtn>
          <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "20px 0" }}>
            <div style={{ flex: 1, height: 1, background: T.border }} />
            <span style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: "0.15em", color: T.dim, textTransform: "uppercase" }}>lub</span>
            <div style={{ flex: 1, height: 1, background: T.border }} />
          </div>
          <LoginBtn variant="ghost" onClick={handleLogin}>✨ Magic Link</LoginBtn>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <Body sz={12} muted>Nie masz jeszcze konta?</Body>
            <div style={{ marginTop: 8 }}>
              <a href="/membership" style={{ fontFamily: T.sans, fontSize: 13, color: T.gold, textDecoration: "none" }}>Aplikuj o członkostwo →</a>
            </div>
          </div>
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${T.border}`, textAlign: "center" }}>
            <span style={{ fontFamily: T.serif, fontSize: 13, fontStyle: "italic", color: T.dim }}>Dostęp wyłącznie dla członków Ambassador Club</span>
          </div>
        </div>
      </div>
    );
  }

  /* ── DESKTOP ── */
  return (
    <div style={{ minHeight: "100vh", display: "flex", background: T.bg }}>

      {/* Lewy panel — VIDEO kominek */}
      <div style={{ width: 480, flexShrink: 0, position: "relative", overflow: "hidden" }}>
        {/* Video tło */}
        <video
          autoPlay muted loop playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          poster="/images/palace-interior.webp"
        >
          <source src="/videos/kominek.mp4" type="video/mp4" />
        </video>
        {/* Overlay gradient */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,8,4,0.75) 0%, rgba(20,14,6,0.60) 50%, rgba(10,8,4,0.80) 100%)", borderRight: "1px solid rgba(201,169,97,0.08)" }} />

        {/* Treść nad video */}
        <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 56px" }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, letterSpacing: "0.3em", color: T.gold, marginBottom: 6 }}>AMBASSADOR CLUB</div>
            <div style={{ fontFamily: T.serif, fontSize: 14, fontStyle: "italic", color: T.dim }}>Best of Poland</div>
          </a>
          <h2 style={{ fontFamily: T.serif, fontSize: 36, fontWeight: 300, color: T.ivory, lineHeight: 1.2, marginTop: 56 }}>
            Where Poland{"'"}s<br />Finest Meet
          </h2>
          <div style={{ margin: "24px 0", width: 48, height: 1, background: T.gold }} />
          <p style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 300, color: "rgba(245,241,232,0.7)", lineHeight: 1.7 }}>
            Ekskluzywny klub łączący liderów biznesu, sportu, sztuki i filantropii.
          </p>
          <div style={{ marginTop: 64 }}><Divider /></div>
          {/* Cytat */}
          <div style={{ marginTop: 40 }}>
            <p style={{ fontFamily: T.serif, fontSize: 16, fontStyle: "italic", color: T.dim, lineHeight: 1.6, margin: 0 }}>
              "Prawdziwy luksus to nie rzeczy — to czas spędzony z ludźmi, którzy cię inspirują."
            </p>
          </div>
        </div>
      </div>

      {/* Prawy panel — formularz */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 48px" }}>
        <div style={{ width: 420 }}>
          <Eyebrow>STREFA CZŁONKOWSKA</Eyebrow>
          <Heading size="md">Witaj ponownie</Heading>
          <div style={{ marginTop: 8 }}><Body center>Zaloguj się do swojego konta członkowskiego</Body></div>
          <div style={{ marginTop: 40 }}>
            <AuthInput label="Email" placeholder="twoj@email.com" type="email" icon="✉" />
            <AuthInput label="Hasło" placeholder="••••••••" type="password" icon="🔒" />
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
              <span style={{ fontFamily: T.sans, fontSize: 12, color: T.muted, cursor: "pointer" }}>Nie pamiętasz hasła?</span>
            </div>
            <LoginBtn onClick={handleLogin}>{loading ? "Loguję..." : "Zaloguj się"}</LoginBtn>
            <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "24px 0" }}>
              <div style={{ flex: 1, height: 1, background: T.border }} />
              <span style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: "0.15em", color: T.dim, textTransform: "uppercase" }}>lub</span>
              <div style={{ flex: 1, height: 1, background: T.border }} />
            </div>
            <LoginBtn variant="ghost" onClick={handleLogin}>✨ Zaloguj przez Magic Link</LoginBtn>
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <Body sz={12} muted>Nie masz jeszcze konta?</Body>
              <div style={{ marginTop: 8 }}>
                <a href="/membership" style={{ fontFamily: T.sans, fontSize: 12, color: T.gold, textDecoration: "none", letterSpacing: "0.04em" }}>Aplikuj o członkostwo →</a>
              </div>
            </div>
            <div style={{ marginTop: 40, paddingTop: 28, borderTop: `1px solid ${T.border}`, textAlign: "center" }}>
              <span style={{ fontFamily: T.serif, fontSize: 13, fontStyle: "italic", color: T.dim }}>Dostęp wyłącznie dla członków Ambassador Club</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
