'use client';
import { useState, useEffect } from 'react';
import { T } from '@/components/ui';
import { supabase } from '@/lib/supabase';

function AuthInput({ label, placeholder, type = "text", value, onChange }) {
  const [f, setF] = useState(false);
  return (
    <div style={{ marginBottom: 20 }}>
      {label && <label style={{ display: "block", fontFamily: T.sans, fontSize: 11, letterSpacing: "0.12em", color: T.muted, textTransform: "uppercase", marginBottom: 8 }}>{label}</label>}
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ width: "100%", padding: "15px 16px", background: "rgba(22,22,22,0.6)", border: `1px solid ${f ? T.gold : T.border}`, color: T.ivory, fontFamily: T.sans, fontSize: 15, fontWeight: 300, outline: "none", transition: "all 0.25s", boxSizing: "border-box" }} />
    </div>
  );
}

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase ustawia sesję z tokenu w URL automatycznie
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true);
    });
  }, []);

  const handleSubmit = async () => {
    if (!password) { setError('Wpisz nowe hasło.'); return; }
    if (password.length < 6) { setError('Hasło musi mieć co najmniej 6 znaków.'); return; }
    if (password !== confirm) { setError('Hasła nie są identyczne.'); return; }
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError('Nie udało się zmienić hasła. Spróbuj ponownie.');
      setLoading(false);
    } else {
      setDone(true);
      setTimeout(() => { window.location.href = '/members'; }, 2500);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <a href="/" style={{ textDecoration: "none", display: "block", textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 700, letterSpacing: "0.28em", color: T.gold }}>AMBASSADOR CLUB</div>
          <div style={{ fontFamily: T.serif, fontSize: 13, fontStyle: "italic", color: T.dim, marginTop: 4 }}>Best of Poland</div>
        </a>

        <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, padding: "40px 36px" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: "0.3em", color: T.gold, textTransform: "uppercase", marginBottom: 12 }}>ZMIANA HASŁA</div>
            <h1 style={{ fontFamily: T.serif, fontSize: 28, fontWeight: 300, color: T.ivory, margin: 0 }}>Nowe hasło</h1>
          </div>

          {done ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>✓</div>
              <p style={{ fontFamily: T.sans, fontSize: 14, color: T.ivory, marginBottom: 8 }}>Hasło zostało zmienione.</p>
              <p style={{ fontFamily: T.sans, fontSize: 13, color: T.muted }}>Przekierowuję do strefy członkowskiej…</p>
            </div>
          ) : !ready ? (
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: T.sans, fontSize: 14, color: T.muted }}>Weryfikacja linku…</p>
            </div>
          ) : (
            <>
              <AuthInput label="Nowe hasło" placeholder="Minimum 6 znaków" type="password" value={password} onChange={e => setPassword(e.target.value)} />
              <AuthInput label="Powtórz hasło" placeholder="••••••••" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} />
              {error && <div style={{ fontFamily: T.sans, fontSize: 13, color: "#e05555", marginBottom: 16 }}>{error}</div>}
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{ width: "100%", padding: "16px 24px", background: loading ? T.dim : T.gold, color: T.bg, border: "none", fontFamily: T.sans, fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: loading ? "default" : "pointer", transition: "background 0.3s" }}
              >
                {loading ? "Zapisuję…" : "Zmień hasło"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
