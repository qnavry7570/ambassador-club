"use client";
import { useState, ReactNode } from "react";
import { T } from "./tokens";

// ═══════════════════════════════════════════
//  TYPOGRAPHY
// ═══════════════════════════════════════════
export function Eyebrow({ children, center = true }: { children: ReactNode; center?: boolean }) {
  return (
    <div style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 400, letterSpacing: "0.3em", color: T.gold, textTransform: "uppercase", textAlign: center ? "center" : "left", marginBottom: 16 }}>
      {children}
    </div>
  );
}

const headingSizes: Record<string, number> = { hero: 72, xl: 52, lg: 42, md: 32, sm: 24, xs: 20 };
export function Heading({ children, size = "lg", center = true, italic = false }: { children: ReactNode; size?: string; center?: boolean; italic?: boolean }) {
  return (
    <h2 style={{ fontFamily: T.serif, fontSize: headingSizes[size] || 42, fontWeight: 300, fontStyle: italic ? "italic" : "normal", color: T.ivory, textAlign: center ? "center" : "left", lineHeight: 1.12, margin: 0, whiteSpace: "pre-line" }}>
      {children}
    </h2>
  );
}

export function Body({ children, center = false, muted = false, italic = false, sz = 16 }: { children: ReactNode; center?: boolean; muted?: boolean; italic?: boolean; sz?: number }) {
  return (
    <p style={{ fontFamily: italic ? T.serif : T.sans, fontSize: sz, fontWeight: 300, fontStyle: italic ? "italic" : "normal", color: muted ? T.dim : T.muted, lineHeight: 1.8, textAlign: center ? "center" : "left", margin: 0 }}>
      {children}
    </p>
  );
}

export function Caption({ children, gold = false, center = false }: { children: ReactNode; gold?: boolean; center?: boolean }) {
  return (
    <span style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.12em", color: gold ? T.gold : T.dim, textTransform: "uppercase", display: "block", textAlign: center ? "center" : "left" }}>
      {children}
    </span>
  );
}

// ═══════════════════════════════════════════
//  DIVIDERS
// ═══════════════════════════════════════════
export function GoldDivider({ width = 200 }: { width?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, width, margin: "0 auto" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${T.gold})` }} />
      <svg width="16" height="16" viewBox="0 0 18 18"><path d="M9 0L11.5 6.5L18 9L11.5 11.5L9 18L6.5 11.5L0 9L6.5 6.5Z" fill={T.gold} opacity={0.6} /></svg>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${T.gold}, transparent)` }} />
    </div>
  );
}

export function GoldLine({ w = 60 }: { w?: number }) {
  return <div style={{ width: w, height: 1, background: T.gold }} />;
}

// ═══════════════════════════════════════════
//  BUTTONS
// ═══════════════════════════════════════════
export function Btn({ children, variant = "gold", sz = "md", onClick, icon, full = false, disabled = false }: { children: ReactNode; variant?: string; sz?: string; onClick?: () => void; icon?: string; full?: boolean; disabled?: boolean }) {
  const [h, setH] = useState(false);
  const sizes: Record<string, any> = { sm: { padding: "10px 24px", fontSize: 11 }, md: { padding: "14px 36px", fontSize: 13 }, lg: { padding: "18px 48px", fontSize: 15 } };
  const variants: Record<string, any> = {
    gold: { background: h ? T.goldLight : T.gold, color: T.bg, border: "none", fontWeight: 700 },
    ghost: { background: "transparent", color: h ? T.gold : T.ivory, border: `1px solid ${h ? T.gold : "rgba(245,241,232,0.25)"}`, fontWeight: 400 },
    minimal: { background: "transparent", border: "none", color: h ? T.gold : T.muted, fontWeight: 400 },
    goldOutline: { background: h ? "rgba(201,169,97,0.08)" : "transparent", color: T.gold, border: `1px solid ${T.gold}`, fontWeight: 400 },
  };
  return (
    <button onClick={onClick} disabled={disabled} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ ...variants[variant], ...sizes[sz], fontFamily: T.sans, letterSpacing: "0.12em", textTransform: "uppercase" as const, cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.3s", display: "inline-flex", alignItems: "center", gap: 10, opacity: disabled ? 0.4 : 1, width: full ? "100%" : "auto", justifyContent: "center", transform: h && !disabled ? "translateY(-1px)" : "none" }}>
      {children}{icon && <span>{icon}</span>}
    </button>
  );
}

// ═══════════════════════════════════════════
//  BADGE
// ═══════════════════════════════════════════
export function Badge({ children, v = "gold" }: { children: ReactNode; v?: string }) {
  const styles: Record<string, any> = {
    gold: { background: "rgba(201,169,97,0.12)", color: T.gold },
    green: { background: "rgba(76,140,80,0.12)", color: T.successLight },
    red: { background: "rgba(180,60,60,0.12)", color: T.errorLight },
    outline: { background: "transparent", color: T.muted, border: `1px solid ${T.borderMed}` },
  };
  return <span style={{ ...styles[v], display: "inline-block", padding: "3px 12px", fontFamily: T.sans, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const }}>{children}</span>;
}

// ═══════════════════════════════════════════
//  IMAGE SLOT
// ═══════════════════════════════════════════
export function Slot({ h = 200, label = "", slot = "default" }: { h?: number; label?: string; slot?: string }) {
  const gradients: Record<string, string> = {
    default: "linear-gradient(135deg,#1a1510,#2a1f15,#1a1510)",
    sport: "linear-gradient(135deg,#0f1b2d,#1a2840,#0f1b2d)",
    culture: "linear-gradient(135deg,#1a1510,#2d2218,#1a1510)",
    philanthropy: "linear-gradient(135deg,#2d1515,#3d1f1f,#2d1515)",
    poland: "linear-gradient(135deg,#101520,#1a2030,#101520)",
    dark: "linear-gradient(135deg,#0a0a0a,#161616,#0a0a0a)",
  };
  return (
    <div style={{ background: gradients[slot] || gradients.default, height: h, position: "relative", overflow: "hidden", width: "100%" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 40%,rgba(201,169,97,0.06) 0%,transparent 60%)" }} />
      {label && <div style={{ position: "absolute", bottom: 6, right: 10, fontSize: 8, fontFamily: T.sans, letterSpacing: "0.1em", color: "rgba(201,169,97,0.2)", textTransform: "uppercase" as const }}>{label}</div>}
    </div>
  );
}

// ═══════════════════════════════════════════
//  HOVERABLE CARD (generic)
// ═══════════════════════════════════════════
export function HoverCard({ children, onClick, style = {} }: { children: ReactNode; onClick?: () => void; style?: any }) {
  const [h, setH] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: T.bgCard, border: `1px solid ${h ? T.goldBorder : T.border}`, transition: "all 0.35s", cursor: onClick ? "pointer" : "default", transform: h ? "translateY(-3px)" : "none", ...style }}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════
//  FORM INPUTS
// ═══════════════════════════════════════════
export function Input({ label, placeholder, type = "text" }: { label?: string; placeholder?: string; type?: string }) {
  const [f, setF] = useState(false);
  return (
    <div style={{ marginBottom: 24 }}>
      {label && <label style={{ display: "block", fontFamily: T.sans, fontSize: 11, letterSpacing: "0.12em", color: T.muted, textTransform: "uppercase" as const, marginBottom: 8 }}>{label}</label>}
      <input type={type} placeholder={placeholder} onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ width: "100%", padding: "14px 16px", background: "rgba(22,22,22,0.6)", border: `1px solid ${f ? T.gold : T.border}`, color: T.ivory, fontFamily: T.sans, fontSize: 14, fontWeight: 300, outline: "none", transition: "all 0.2s" }} />
    </div>
  );
}

export function TextArea({ label, placeholder, rows = 4 }: { label?: string; placeholder?: string; rows?: number }) {
  const [f, setF] = useState(false);
  return (
    <div style={{ marginBottom: 24 }}>
      {label && <label style={{ display: "block", fontFamily: T.sans, fontSize: 11, letterSpacing: "0.12em", color: T.muted, textTransform: "uppercase" as const, marginBottom: 8 }}>{label}</label>}
      <textarea placeholder={placeholder} rows={rows} onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ width: "100%", padding: "14px 16px", resize: "vertical", background: "rgba(22,22,22,0.6)", border: `1px solid ${f ? T.gold : T.border}`, color: T.ivory, fontFamily: T.sans, fontSize: 14, fontWeight: 300, outline: "none", transition: "all 0.2s" }} />
    </div>
  );
}

export function Select({ label, options = [], placeholder = "Wybierz..." }: { label?: string; options?: string[]; placeholder?: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      {label && <label style={{ display: "block", fontFamily: T.sans, fontSize: 11, letterSpacing: "0.12em", color: T.muted, textTransform: "uppercase" as const, marginBottom: 8 }}>{label}</label>}
      <select style={{ width: "100%", padding: "14px 16px", appearance: "none" as const, background: "rgba(22,22,22,0.6)", border: `1px solid ${T.border}`, color: T.muted, fontFamily: T.sans, fontSize: 14, fontWeight: 300, outline: "none", cursor: "pointer" }}>
        <option>{placeholder}</option>
        {options.map((o, i) => <option key={i}>{o}</option>)}
      </select>
    </div>
  );
}
