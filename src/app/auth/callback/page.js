'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { T } from '@/components/ui';

export default function AuthCallback() {
  const [msg, setMsg] = useState('Weryfikacja linku...');

  useEffect(() => {
    // Wykryj typ linku z URL hash
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const params = new URLSearchParams(hash.replace(/^#/, ''));
    const type = params.get('type'); // 'invite', 'magiclink', 'recovery', 'signup'
    const error = params.get('error') || params.get('error_description');

    if (error) {
      setMsg('Błąd: ' + error + '. Przekierowuję do logowania...');
      setTimeout(() => { window.location.href = '/login'; }, 2500);
      return;
    }

    // Supabase wczyta token z hash i wystrzeli event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        window.location.href = '/auth/reset-password';
      } else if (event === 'SIGNED_IN' && session) {
        // Invite lub signup — użytkownik dopiero co dostał link, niech ustawi hasło
        if (type === 'invite' || type === 'signup' || type === 'recovery') {
          window.location.href = '/auth/set-password';
        } else {
          // Magic link — od razu do members
          window.location.href = '/members';
        }
      }
    });

    // Fallback: jeśli już zalogowany (sesja istnieje)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && !type) {
        window.location.href = '/members';
      }
    });

    // Timeout na wypadek braku eventu
    const timeout = setTimeout(() => {
      setMsg('Nie udało się zweryfikować linku. Przekierowuję do logowania...');
      setTimeout(() => { window.location.href = '/login'; }, 2000);
    }, 8000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 700, letterSpacing: "0.28em", color: T.gold, marginBottom: 12 }}>AMBASSADOR CLUB</div>
        <div style={{ fontFamily: T.serif, fontSize: 18, fontStyle: "italic", color: T.dim }}>{msg}</div>
      </div>
    </div>
  );
}
