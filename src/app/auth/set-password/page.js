'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { T } from '@/components/ui';

export default function SetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [focus, setFocus] = useState({});
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    // Supabase automatycznie odbiera token z URL hash
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
        setSessionReady(true);
      }
    });
  }, []);

  const handleSubmit = async () => {
    if (!password || password.length < 8) { setError('Hasło musi mieć minimum 8 znaków.'); return; }
    if (password !== confirm) { setError('Hasła nie są zgodne.'); return; }
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError('Błąd: ' + error.message);
      setLoading(false);
    } else {
      setDone(true);
      setTimeout(() => { window.location.href = '/members'; }, 2000);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 700, letterSpacing: "0.28em", color: T.gold }}>AMBASSADOR CLUB</div>
            <div style={{ fontFamily: T.serif, fontSize: 13, fontStyle: "italic", color: T.dim, marginTop: 4 }}>Best of Poland</div>
          </a>
        </div>

        <div style={{ background: "rgba(12,12,12,0.8)", border: `1px solid ${T.goldBorder}`, padding: "40px 36px" }}>
          {done ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", border: `2px solid ${T.gold}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 24, color: T.gold }}>✓</div>
              <h2 style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 300, color: T.ivory, margin: "0 0 12px" }}>Hasło ustawione</h2>
              <p style={{ fontFamily: T.sans, fontSize: 14, color: T.muted, fontWeight: 300 }}>Przekierowuję do strefy członkowskiej...</p>
            </div>
          ) : (
            <>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: "0.3em", color: T.gold, textTransform: "uppercase", marginBottom: 10 }}>Witaj w Ambassador Club</div>
                <h2 style={{ fontFamily: T.serif, fontSize: 26, fontWeight: 300, color: T.ivory, margin: "0 0 8px" }}>Ustaw hasło</h2>
                <p style={{ fontFamily: T.sans, fontSize: 13, color: T.muted, fontWeight: 300, margin: 0 }}>Wybierz hasło do swojego konta członkowskiego</p>
              </div>
              <div style={{ width: 40, height: 1, background: T.gold, margin: "0 auto 28px" }} />

              {/* Pole hasła */}
              {[
                { key: "password", label: "Nowe hasło", value: password, onChange: e => setPassword(e.target.value), placeholder: "minimum 8 znaków" },
                { key: "confirm", label: "Powtórz hasło", value: confirm, onChange: e => setConfirm(e.target.value), placeholder: "wpisz hasło ponownie" },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontFamily: T.sans, fontSize: 11, letterSpacing: "0.12em", color: T.muted, textTransform: "uppercase", marginBottom: 8 }}>{f.label}</label>
                  <input type="password" value={f.value} onChange={f.onChange} placeholder={f.placeholder}
                    onFocus={() => setFocus(p => ({ ...p, [f.key]: true }))}
                    onBlur={() => setFocus(p => ({ ...p, [f.key]: false }))}
                    style={{ width: "100%", padding: "14px 16px", background: "rgba(22,22,22,0.6)", border: `1px solid ${focus[f.key] ? T.gold : T.border}`, color: T.ivory, fontFamily: T.sans, fontSize: 14, fontWeight: 300, outline: "none", transition: "all 0.2s" }} />
                </div>
              ))}

              {error && <div style={{ fontFamily: T.sans, fontSize: 13, color: "#e05555", marginBottom: 16, textAlign: "center" }}>{error}</div>}

              <button onClick={handleSubmit} disabled={loading}
                style={{ width: "100%", padding: "16px 24px", background: loading ? T.goldDark : T.gold, color: T.bg, border: "none", fontFamily: T.sans, fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", transition: "all 0.3s", opacity: loading ? 0.7 : 1 }}>
                {loading ? "Ustawiam..." : "Ustaw hasło i zaloguj się"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
