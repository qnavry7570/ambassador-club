'use client';
import { useState, useEffect } from 'react';
import { T, Badge, GoldBtn, GhostBtn, FeatureBox, Body } from '@/components/ui';
import { supabase } from '@/lib/supabase';
import { useBreakpoint } from '@/lib/useBreakpoint';

/* ─── NAV ITEMS ─── */
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard",   icon: "◈" },
  { id: "events",    label: "Wydarzenia",  icon: "◆" },
  { id: "members",   label: "Członkowie",  icon: "◇" },
  { id: "gallery",   label: "Galeria",     icon: "▣" },
  { id: "concierge", label: "Concierge",   icon: "✧" },
  { id: "profile",   label: "Mój profil",  icon: "●" },
];

/* ─── SIDEBAR (desktop) ─── */
function Sidebar({ active, setActive, user, initials, onLogout }) {
  const displayName = user?.user_metadata?.full_name || user?.email || '';
  const shortName = displayName.includes('@') ? displayName.split('@')[0] : displayName.split(' ').slice(0,2).join(' ');
  return (
    <aside style={{ width: 240, background: "#080808", borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column", height: "100vh", position: "fixed", left: 0, top: 0, zIndex: 50 }}>
      <div style={{ padding: "28px 24px 20px", borderBottom: `1px solid ${T.border}` }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <div style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.25em", color: T.gold }}>AMBASSADOR CLUB</div>
        </a>
        <div style={{ fontFamily: T.serif, fontSize: 11, fontStyle: "italic", color: T.dim, marginTop: 4 }}>Members Area</div>
      </div>
      <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV_ITEMS.map(n => (
          <button key={n.id} onClick={() => setActive(n.id)}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: active === n.id ? "rgba(201,169,97,0.08)" : "transparent", border: "none", borderLeft: `2px solid ${active === n.id ? T.gold : "transparent"}`, color: active === n.id ? T.gold : T.muted, fontFamily: T.sans, fontSize: 13, fontWeight: active === n.id ? 400 : 300, letterSpacing: "0.04em", cursor: "pointer", transition: "all 0.2s", textAlign: "left", width: "100%" }}>
            <span style={{ fontSize: 14, width: 20, textAlign: "center" }}>{n.icon}</span>{n.label}
          </button>
        ))}
        {user?.email === 'b.kawecki@ambassadorclub.pl' && (
          <a href="/admin" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", marginTop: 8, borderTop: `1px solid ${T.border}`, color: T.gold, fontFamily: T.sans, fontSize: 13, fontWeight: 400, letterSpacing: "0.04em", textDecoration: "none", borderLeft: `2px solid ${T.gold}`, background: "rgba(201,169,97,0.05)" }}>
            <span style={{ fontSize: 14, width: 20, textAlign: "center" }}>⚙</span>Panel Admina
          </a>
        )}
      </nav>
      <div style={{ padding: "16px 20px", borderTop: `1px solid ${T.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(201,169,97,0.1)", border: `1px solid ${T.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 16, color: T.gold }}>{initials}</div>
          <div>
            <div style={{ fontFamily: T.sans, fontSize: 13, color: T.ivory }}>{shortName}</div>
            <div style={{ fontFamily: T.sans, fontSize: 10, color: T.dim }}>Strefa członkowska</div>
          </div>
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
          <a href="/" style={{ fontFamily: T.sans, fontSize: 11, color: T.dim, textDecoration: "none", letterSpacing: "0.08em" }}>← Strona główna</a>
          <button onClick={onLogout} style={{ background: "none", border: "none", fontFamily: T.sans, fontSize: 11, color: T.dim, cursor: "pointer", letterSpacing: "0.08em", padding: 0 }}>Wyloguj →</button>
        </div>
      </div>
    </aside>
  );
}

/* ─── MOBILE DRAWER ─── */
function MobileDrawer({ active, setActive, open, onClose, user }) {
  return (
    <>
      {/* backdrop */}
      {open && <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 149 }} />}
      {/* drawer */}
      <aside style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: 280, background: "#080808", borderRight: `1px solid ${T.border}`, zIndex: 150, display: "flex", flexDirection: "column", transform: open ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.3s ease" }}>
        <div style={{ padding: "24px 20px 16px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", color: T.gold }}>AMBASSADOR CLUB</div>
            <div style={{ fontFamily: T.serif, fontSize: 11, fontStyle: "italic", color: T.dim, marginTop: 3 }}>Members Area</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <svg width="18" height="18" viewBox="0 0 18 18"><path d="M2 2L16 16M16 2L2 16" stroke={T.gold} strokeWidth="1.5" /></svg>
          </button>
        </div>
        <nav style={{ flex: 1, padding: "12px 8px" }}>
          {NAV_ITEMS.map(n => (
            <button key={n.id} onClick={() => { setActive(n.id); onClose(); }}
              style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", width: "100%", background: active === n.id ? "rgba(201,169,97,0.08)" : "transparent", border: "none", borderLeft: `2px solid ${active === n.id ? T.gold : "transparent"}`, color: active === n.id ? T.gold : T.muted, fontFamily: T.sans, fontSize: 14, cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontSize: 16, width: 22, textAlign: "center" }}>{n.icon}</span>{n.label}
            </button>
          ))}
          {user?.email === 'b.kawecki@ambassadorclub.pl' && (
            <a href="/admin" style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", marginTop: 8, borderTop: `1px solid ${T.border}`, color: T.gold, fontFamily: T.sans, fontSize: 14, textDecoration: "none", borderLeft: `2px solid ${T.gold}`, background: "rgba(201,169,97,0.05)" }}>
              <span style={{ fontSize: 16, width: 22, textAlign: "center" }}>⚙</span>Panel Admina
            </a>
          )}
        </nav>
        <div style={{ padding: "16px 20px", borderTop: `1px solid ${T.border}` }}>
          <a href="/" style={{ fontFamily: T.sans, fontSize: 12, color: T.dim, textDecoration: "none" }}>← Wróć do strony</a>
        </div>
      </aside>
    </>
  );
}

/* ─── TOP BAR ─── */
function TopBar({ title, subtitle, onMenuClick, isMobile }) {
  return (
    <header style={{ height: 64, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "0 16px" : "0 32px", background: "rgba(10,10,10,0.8)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 40 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {isMobile && (
          <button onClick={onMenuClick} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ display: "block", width: 20, height: 1, background: T.gold }} />
            <span style={{ display: "block", width: 14, height: 1, background: T.gold }} />
            <span style={{ display: "block", width: 20, height: 1, background: T.gold }} />
          </button>
        )}
        <div>
          <h1 style={{ fontFamily: T.serif, fontSize: isMobile ? 20 : 24, fontWeight: 400, color: T.ivory, margin: 0 }}>{title}</h1>
          {subtitle && <span style={{ fontFamily: T.sans, fontSize: 11, color: T.dim }}>{subtitle}</span>}
        </div>
      </div>
      <span style={{ fontFamily: T.sans, fontSize: 12, color: T.muted }}>PL</span>
    </header>
  );
}

/* ─── RSVP BTN ─── */
function RsvpBtn({ eventId, userId, init = false }) {
  const [confirmed, setConfirmed] = useState(init);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    if (!userId || !eventId || loading) return;
    setLoading(true);
    if (confirmed) {
      await supabase.from('rsvp').delete().match({ event_id: eventId, user_id: userId });
      setConfirmed(false);
    } else {
      await supabase.from('rsvp').insert({ event_id: eventId, user_id: userId });
      setConfirmed(true);
    }
    setLoading(false);
  };

  return (
    <button onClick={toggle} disabled={loading}
      style={{ padding: "9px 16px", display: "flex", alignItems: "center", gap: 7, background: confirmed ? "rgba(201,169,97,0.1)" : "transparent", border: `1px solid ${confirmed ? T.gold : T.borderMed}`, color: confirmed ? T.gold : T.ivory, fontFamily: T.sans, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", cursor: loading ? "wait" : "pointer", transition: "all 0.3s", whiteSpace: "nowrap", opacity: loading ? 0.6 : 1 }}>
      <div style={{ width: 14, height: 14, border: `1px solid ${confirmed ? T.gold : T.dim}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: confirmed ? T.gold : "transparent", transition: "all 0.3s", flexShrink: 0 }}>
        {confirmed && <span style={{ color: T.bg, fontSize: 8, fontWeight: 700 }}>✓</span>}
      </div>
      {loading ? "..." : confirmed ? "Potwierdzono" : "RSVP"}
    </button>
  );
}

/* ─── EVENT ROW ─── */
function EventRow({ ev, isMobile, userId }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ padding: isMobile ? "12px 16px" : "16px 24px", borderBottom: `1px solid ${T.border}`, borderLeft: `3px solid ${h ? T.gold : "transparent"}`, transition: "all 0.2s" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: isMobile ? "wrap" : "nowrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
          {ev.img && !isMobile && (
            <div style={{ width: 52, height: 52, overflow: "hidden", flexShrink: 0, lineHeight: 0 }}>
              <img src={ev.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
            </div>
          )}
          <div style={{ textAlign: "center", minWidth: 40, flexShrink: 0 }}>
            <div style={{ fontFamily: T.serif, fontSize: isMobile ? 20 : 22, fontWeight: 300, color: T.gold, lineHeight: 1 }}>{ev.day}</div>
            <div style={{ fontFamily: T.sans, fontSize: 9, color: T.dim, textTransform: "uppercase" }}>{ev.month}</div>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: T.serif, fontSize: isMobile ? 15 : 17, color: T.ivory }}>{ev.title}</div>
            <div style={{ fontFamily: T.sans, fontSize: 11, color: T.dim, marginTop: 2 }}>{ev.loc}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <Badge v={ev.tagColor}>{ev.tag}</Badge>
          <RsvpBtn eventId={ev.id} userId={userId} init={ev.rsvp} />
        </div>
      </div>
    </div>
  );
}

/* ─── MEMBER CARD ─── */
function MemberCard({ m }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: T.bgCard, border: `1px solid ${h ? T.goldBorder : T.border}`, transition: "all 0.3s", cursor: "pointer", overflow: "hidden" }}>
      <div style={{ height: 80, background: "linear-gradient(135deg,#0d0d0d,#1a1510)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: T.goldMuted, border: `1px solid ${T.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 16, color: T.gold }}>{m.initials}</div>
      </div>
      <div style={{ padding: "12px 14px" }}>
        <div style={{ fontFamily: T.serif, fontSize: 15, color: T.ivory }}>{m.name}</div>
        <div style={{ fontFamily: T.sans, fontSize: 11, color: T.dim, marginTop: 2 }}>{m.role}</div>
        <div style={{ marginTop: 8 }}><Badge>{m.sector}</Badge></div>
      </div>
    </div>
  );
}

/* ─── ALBUM CARD ─── */
function AlbumCard({ a, isMobile }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ cursor: "pointer", transition: "all 0.3s", transform: h ? "translateY(-3px)" : "none" }}>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img src={a.img} alt={a.title} style={{ width: "100%", height: isMobile ? 160 : 200, objectFit: "cover", transition: "transform 0.5s", transform: h ? "scale(1.05)" : "scale(1)" }} />
        {h && <div style={{ position: "absolute", inset: 0, background: "rgba(201,169,97,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: T.sans, fontSize: 11, color: T.gold, letterSpacing: "0.1em", textTransform: "uppercase", padding: "7px 16px", border: `1px solid ${T.gold}` }}>Otwórz album</span></div>}
      </div>
      <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderTop: "none", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: T.serif, fontSize: 15, color: T.ivory }}>{a.title}</div>
          <div style={{ fontFamily: T.sans, fontSize: 10, color: T.dim, marginTop: 3 }}>{a.date}</div>
        </div>
        <Badge v="outline">{a.count} zdjęć</Badge>
      </div>
    </div>
  );
}

/* ─── SERVICE CARD ─── */
function ServiceCard({ s }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: T.bgCard, border: `1px solid ${h ? T.goldBorder : T.border}`, padding: "24px 20px", transition: "all 0.3s", transform: h ? "translateY(-2px)" : "none" }}>
      <div style={{ fontSize: 26, marginBottom: 14 }}>{s.icon}</div>
      <h3 style={{ fontFamily: T.serif, fontSize: 17, fontWeight: 400, color: T.ivory, marginBottom: 8 }}>{s.title}</h3>
      <p style={{ fontFamily: T.sans, fontSize: 13, color: T.muted, fontWeight: 300, lineHeight: 1.7, marginBottom: 14 }}>{s.desc}</p>
      <Badge>{s.status}</Badge>
    </div>
  );
}

/* ─── TOGGLE ─── */
function Toggle({ label, defaultOn }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${T.border}`, cursor: "pointer" }} onClick={() => setOn(!on)}>
      <span style={{ fontFamily: T.sans, fontSize: 14, color: T.ivory, fontWeight: 300 }}>{label}</span>
      <div style={{ width: 44, height: 24, borderRadius: 12, background: on ? "rgba(201,169,97,0.3)" : T.border, transition: "all 0.3s", position: "relative", padding: 2, flexShrink: 0 }}>
        <div style={{ width: 20, height: 20, borderRadius: 10, background: on ? T.gold : T.dim, transition: "all 0.3s", transform: on ? "translateX(20px)" : "translateX(0)" }} />
      </div>
    </div>
  );
}

/* ─── DASHBOARD ─── */
function DashboardView({ isMobile, onMenuClick, firstName, user }) {
  const [events, setEvents] = useState([]);
  const [myRsvp, setMyRsvp] = useState([]);
  const [rsvpCount, setRsvpCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      supabase.from('events').select('*').eq('published', true).order('date', { ascending: true }).limit(3),
      supabase.from('rsvp').select('event_id').eq('user_id', user.id),
    ]).then(([{ data: evData }, { data: rsvpData }]) => {
      setEvents(evData || []);
      const ids = (rsvpData || []).map(r => r.event_id);
      setMyRsvp(ids);
      setRsvpCount(ids.length);
    });
  }, [user]);

  const mapped = events.map(ev => ({
    id: ev.id, title: ev.title, day: formatDay(ev.date), month: formatMonth(ev.date),
    loc: ev.location, tag: ev.tag, tagColor: ev.tag_color || 'gold',
    rsvp: myRsvp.includes(ev.id), img: ev.image_url || null,
  }));

  const stats = [
    { v: events.length.toString(), l: "Nadchodzące" },
    { v: rsvpCount.toString(), l: "Moje RSVP" },
    { v: "—", l: "Uczestniczono" },
    { v: "—", l: "Zaproszenia" },
  ];

  return (
    <>
      <TopBar title="Dashboard" isMobile={isMobile} onMenuClick={onMenuClick} />
      <div style={{ height: isMobile ? 120 : 160, overflow: "hidden", lineHeight: 0, fontSize: 0 }}>
        <img src="/images/warsaw-aerial.webp" alt="Warszawa" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 55%", display: "block" }} />
      </div>
      <div style={{ padding: isMobile ? "16px" : "28px 32px 32px" }}>
        <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: "0.3em", color: T.gold, textTransform: "uppercase", marginBottom: 6 }}>Strefa Członkowska</div>
          <h2 style={{ fontFamily: T.serif, fontSize: isMobile ? 20 : 26, fontWeight: 300, color: T.ivory, margin: "0 0 6px" }}>Dzień dobry, {firstName}</h2>
          <p style={{ fontFamily: T.sans, fontSize: 13, color: T.muted, fontWeight: 300, margin: 0 }}>
            Masz <span style={{ color: T.gold, fontWeight: 700 }}>{events.length} nadchodzących wydarzeń</span> i <span style={{ color: T.gold, fontWeight: 700 }}>{rsvpCount} potwierdzeń RSVP</span>.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 10 : 16, marginBottom: 24 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: T.bgCard, border: `1px solid ${T.border}`, padding: isMobile ? "16px 12px" : "24px 20px", textAlign: "center" }}>
              <div style={{ fontFamily: T.serif, fontSize: isMobile ? 26 : 32, fontWeight: 300, color: T.gold }}>{s.v}</div>
              <div style={{ fontFamily: T.sans, fontSize: 10, color: T.dim, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr", gap: 20 }}>
          <div style={{ background: T.bgCard, border: `1px solid ${T.border}` }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${T.border}` }}>
              <span style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.12em", color: T.gold, textTransform: "uppercase" }}>Nadchodzące wydarzenia</span>
            </div>
            {mapped.length === 0
              ? <div style={{ padding: 24, fontFamily: T.sans, fontSize: 13, color: T.dim, textAlign: "center" }}>Brak nadchodzących wydarzeń.</div>
              : mapped.map((ev) => <EventRow key={ev.id} ev={ev} isMobile={isMobile} userId={user?.id} />)
            }
          </div>
          <div style={{ background: T.bgCard, border: `1px solid ${T.border}` }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${T.border}` }}>
              <span style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.12em", color: T.gold, textTransform: "uppercase" }}>Aktywność</span>
            </div>
            {[
              { text: "Potwierdziłeś udział w Wieczorze", time: "2h temu", icon: "✓" },
              { text: "Nowe zdjęcia z Gali dostępne", time: "1 dzień", icon: "▣" },
              { text: "Katarzyna M. wysłała wiadomość", time: "2 dni", icon: "✉" },
              { text: "Nowe wydarzenie: Dzień Polo", time: "4 dni", icon: "◆" },
            ].map((a, i) => (
              <div key={i} style={{ padding: "14px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: T.goldMuted, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 11, color: T.gold, flexShrink: 0 }}>{a.icon}</div>
                <div>
                  <div style={{ fontFamily: T.sans, fontSize: 12, color: T.muted, fontWeight: 300 }}>{a.text}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 10, color: T.dim, marginTop: 3 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function formatDay(dateStr) { return dateStr ? new Date(dateStr).getDate().toString() : ''; }
function formatMonth(dateStr) {
  if (!dateStr) return '';
  const m = ["sty","lut","mar","kwi","maj","cze","lip","sie","wrz","paź","lis","gru"];
  return m[new Date(dateStr).getMonth()];
}

/* ─── EVENTS VIEW ─── */
function EventsView({ isMobile, onMenuClick, user }) {
  const [events, setEvents] = useState([]);
  const [myRsvp, setMyRsvp] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      supabase.from('events').select('*').eq('published', true).order('date', { ascending: true }),
      supabase.from('rsvp').select('event_id').eq('user_id', user.id),
    ]).then(([{ data: evData }, { data: rsvpData }]) => {
      setEvents(evData || []);
      setMyRsvp((rsvpData || []).map(r => r.event_id));
      setLoading(false);
    });
  }, [user]);

  const mapped = events.map(ev => ({
    id: ev.id,
    title: ev.title,
    day: formatDay(ev.date),
    month: formatMonth(ev.date),
    loc: [ev.location, ev.time, ev.dress_code].filter(Boolean).join(' · '),
    tag: ev.tag,
    tagColor: ev.tag_color || 'gold',
    rsvp: myRsvp.includes(ev.id),
    img: ev.image_url || null,
  }));

  return (
    <>
      <TopBar title="Wydarzenia" subtitle="Pełny kalendarz klubowy" isMobile={isMobile} onMenuClick={onMenuClick} />
      <div style={{ padding: isMobile ? "16px" : "32px" }}>
        {loading ? (
          <div style={{ fontFamily: T.serif, fontSize: 18, color: T.gold, fontStyle: "italic", padding: 32, textAlign: "center" }}>Ładowanie...</div>
        ) : (
          <div style={{ background: T.bgCard, border: `1px solid ${T.border}` }}>
            {mapped.length === 0 && <div style={{ padding: 32, fontFamily: T.sans, fontSize: 14, color: T.dim, textAlign: "center" }}>Brak nadchodzących wydarzeń.</div>}
            {mapped.map((ev) => <EventRow key={ev.id} ev={ev} isMobile={isMobile} userId={user?.id} />)}
          </div>
        )}
      </div>
    </>
  );
}

/* ─── MEMBERS VIEW ─── */
function MembersView({ isMobile, onMenuClick }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('members').select('*').order('full_name')
      .then(({ data }) => { setMembers(data || []); setLoading(false); });
  }, []);

  return (
    <>
      <TopBar title="Katalog członków" subtitle={loading ? '' : `${members.length} członków`} isMobile={isMobile} onMenuClick={onMenuClick} />
      <div style={{ padding: isMobile ? "16px" : "32px" }}>
        {loading ? (
          <div style={{ fontFamily: T.serif, fontSize: 18, color: T.gold, fontStyle: "italic", padding: 32, textAlign: "center" }}>Ładowanie...</div>
        ) : members.length === 0 ? (
          <div style={{ padding: 32, fontFamily: T.sans, fontSize: 14, color: T.dim, textAlign: "center" }}>Brak członków w katalogu.</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 10 : 16 }}>
            {members.map((m) => {
              const initials = (m.full_name || m.email || '?').split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();
              return <MemberCard key={m.id} m={{ name: m.full_name || m.email, initials, role: [m.role, m.company].filter(Boolean).join(', '), sector: m.sector }} />;
            })}
          </div>
        )}
      </div>
    </>
  );
}

/* ─── GALLERY VIEW ─── */
function GalleryView({ isMobile, onMenuClick }) {
  const albums = [
    { title: "Gala Noworoczna 2026", date: "10 sty 2026", count: 48, img: "/images/ballroom.webp" },
    { title: "Wieczór Kolekcjonerski", date: "15 gru 2025", count: 32, img: "/images/vernissage.webp" },
    { title: "Turniej Golfowy", date: "18 wrz 2025", count: 64, img: "/images/golf-manor.webp" },
    { title: "Regaty na Mazurach", date: "10 lip 2025", count: 56, img: "/images/regaty.webp" },
    { title: "Noc Operowa", date: "2 cze 2025", count: 28, img: "/images/opera.webp" },
    { title: "Kolacja z Mistrzem Kuchni", date: "14 kwi 2025", count: 24, img: "/images/fine-dining.webp" },
  ];
  return (
    <>
      <TopBar title="Galeria prywatna" subtitle="Zdjęcia dostępne wyłącznie dla uczestników" isMobile={isMobile} onMenuClick={onMenuClick} />
      <div style={{ padding: isMobile ? "16px" : "32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3,1fr)", gap: isMobile ? 12 : 20 }}>
          {albums.map((a, i) => <AlbumCard key={i} a={a} isMobile={isMobile} />)}
        </div>
      </div>
    </>
  );
}

/* ─── CONCIERGE VIEW ─── */
function ConciergeView({ isMobile, onMenuClick }) {
  const services = [
    { icon: "🏇", title: "Loże VIP — Wyścigi", desc: "Rezerwacja lóż na zawodach.", status: "Dostępne" },
    { icon: "🎨", title: "Aukcje sztuki", desc: "Dostęp do prywatnych aukcji.", status: "Na zapytanie" },
    { icon: "🏰", title: "Prywatne zwiedzania", desc: "Zamki, pałace, kolekcje prywatne.", status: "Dostępne" },
    { icon: "🍷", title: "Prywatne kolacje", desc: "Kolacje degustacyjne w rezydencjach.", status: "Na zapytanie" },
    { icon: "⛵", title: "Jachty & regaty", desc: "Wynajem jachtów, szkolenia.", status: "Sezonowo" },
    { icon: "🏌️", title: "Golf — członkostwo", desc: "Najlepsze kluby golfowe w Polsce.", status: "Dostępne" },
  ];
  return (
    <>
      <TopBar title="Concierge Premium" subtitle="Twój prywatny asystent klubowy" isMobile={isMobile} onMenuClick={onMenuClick} />
      <div style={{ padding: isMobile ? "16px" : "32px" }}>
        <div style={{ background: T.bgCard, border: `1px solid ${T.goldBorder}`, padding: isMobile ? "20px" : "24px 32px", marginBottom: 24 }}>
          <h3 style={{ fontFamily: T.serif, fontSize: isMobile ? 18 : 22, fontWeight: 300, color: T.ivory, marginBottom: 6 }}>
            Twój concierge: <span style={{ color: T.gold }}>Aleksandra Nowicka</span>
          </h3>
          <p style={{ fontFamily: T.sans, fontSize: 13, color: T.muted, fontWeight: 300, margin: 0 }}>pon–pt 10:00–18:00 · concierge@ambassadorclub.pl</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3,1fr)", gap: isMobile ? 10 : 16 }}>
          {services.map((s, i) => <ServiceCard key={i} s={s} />)}
        </div>
      </div>
    </>
  );
}

/* ─── PROFILE VIEW ─── */
function ProfileView({ isMobile, onMenuClick, user }) {
  const [tab, setTab] = useState("info");
  const [member, setMember] = useState(null);
  const [rsvpHistory, setRsvpHistory] = useState([]);
  const [loadingRsvp, setLoadingRsvp] = useState(true);

  useEffect(() => {
    if (!user) return;
    // pobierz dane z tabeli members
    supabase.from('members').select('*').eq('email', user.email).single()
      .then(({ data }) => setMember(data));
    // pobierz historię RSVP
    supabase.from('rsvp').select('event_id, created_at').eq('user_id', user.id)
      .then(async ({ data: rsvpData }) => {
        if (!rsvpData?.length) { setLoadingRsvp(false); return; }
        const ids = rsvpData.map(r => r.event_id);
        const { data: evData } = await supabase.from('events').select('id, title, date, location').in('id', ids);
        const merged = rsvpData.map(r => ({
          ...r,
          event: evData?.find(e => e.id === r.event_id),
        }));
        setRsvpHistory(merged);
        setLoadingRsvp(false);
      });
  }, [user]);

  const fullName = user?.user_metadata?.full_name || member?.full_name || user?.email || '—';
  const initials = fullName.includes('@') ? fullName.slice(0,2).toUpperCase() : fullName.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();

  const infoRows = [
    ["Imię i nazwisko", fullName],
    ["Email", user?.email || '—'],
    ["Firma", member?.company || '—'],
    ["Stanowisko", member?.role || '—'],
    ["Sektor", member?.sector || '—'],
    ["Członek od", member?.member_since || '—'],
  ];

  return (
    <>
      <TopBar title="Mój profil" subtitle="Twoje dane i historia" isMobile={isMobile} onMenuClick={onMenuClick} />
      <div style={{ padding: isMobile ? "16px" : "32px" }}>
        {/* Header */}
        <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, padding: isMobile ? "20px" : "28px 36px", display: "flex", gap: 20, alignItems: "center", marginBottom: 20 }}>
          <div style={{ width: isMobile ? 56 : 80, height: isMobile ? 56 : 80, borderRadius: "50%", background: T.goldMuted, border: `2px solid ${T.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: isMobile ? 20 : 28, color: T.gold, flexShrink: 0 }}>{initials}</div>
          <div>
            <h2 style={{ fontFamily: T.serif, fontSize: isMobile ? 20 : 28, fontWeight: 300, color: T.ivory, margin: "0 0 4px" }}>{fullName}</h2>
            <p style={{ fontFamily: T.sans, fontSize: 12, color: T.muted, margin: 0 }}>
              {[member?.role, member?.company, member?.member_since ? `Członek od ${member.member_since}` : null].filter(Boolean).join(' · ')}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${T.border}`, marginBottom: 20 }}>
          {[{ id: "info", l: "Dane osobowe" }, { id: "rsvp", l: "Historia RSVP" }, { id: "prefs", l: "Preferencje" }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ padding: "12px 20px", background: "transparent", border: "none", borderBottom: `2px solid ${tab === t.id ? T.gold : "transparent"}`, color: tab === t.id ? T.gold : T.muted, fontFamily: T.sans, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", marginBottom: -1 }}>
              {t.l}
            </button>
          ))}
        </div>

        {tab === "info" && (
          <div style={{ maxWidth: 600 }}>
            {infoRows.map(([l, v], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "14px 0", borderBottom: `1px solid ${T.border}`, gap: 16 }}>
                <span style={{ fontFamily: T.sans, fontSize: 11, color: T.dim, letterSpacing: "0.08em", textTransform: "uppercase", flexShrink: 0 }}>{l}</span>
                <span style={{ fontFamily: T.sans, fontSize: 13, color: T.ivory, fontWeight: 300, textAlign: "right" }}>{v}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "rsvp" && (
          <div style={{ maxWidth: 700 }}>
            <div style={{ fontFamily: T.sans, fontSize: 11, color: T.dim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
              Łącznie: {rsvpHistory.length} potwierdzeń
            </div>
            {loadingRsvp ? (
              <div style={{ fontFamily: T.serif, fontSize: 16, color: T.gold, fontStyle: "italic" }}>Ładowanie...</div>
            ) : rsvpHistory.length === 0 ? (
              <div style={{ fontFamily: T.sans, fontSize: 14, color: T.dim, padding: "24px 0" }}>Nie potwierdziłeś jeszcze udziału w żadnym wydarzeniu.</div>
            ) : (
              <div style={{ border: `1px solid ${T.border}` }}>
                {rsvpHistory.map((r, i) => (
                  <div key={i} style={{ padding: "16px 20px", borderBottom: i < rsvpHistory.length - 1 ? `1px solid ${T.border}` : "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                    <div>
                      <div style={{ fontFamily: T.serif, fontSize: 15, color: T.ivory }}>{r.event?.title || '—'}</div>
                      <div style={{ fontFamily: T.sans, fontSize: 12, color: T.dim, marginTop: 3 }}>
                        {r.event?.date} · {r.event?.location}
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontFamily: T.sans, fontSize: 10, color: T.gold, border: `1px solid ${T.goldBorder}`, padding: "3px 10px" }}>✓ RSVP</div>
                      <div style={{ fontFamily: T.sans, fontSize: 10, color: T.dim, marginTop: 4 }}>{new Date(r.created_at).toLocaleDateString('pl-PL')}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "prefs" && (
          <div style={{ maxWidth: 500 }}>
            <h3 style={{ fontFamily: T.serif, fontSize: 18, color: T.ivory, fontWeight: 400, marginBottom: 16 }}>Typy wydarzeń</h3>
            <Toggle label="Sport" defaultOn={true} />
            <Toggle label="Sztuka i Kultura" defaultOn={true} />
            <Toggle label="Filantropia" defaultOn={true} />
            <Toggle label="Biznes" defaultOn={true} />
            <Toggle label="Best of Poland" defaultOn={false} />
            <h3 style={{ fontFamily: T.serif, fontSize: 18, color: T.ivory, fontWeight: 400, margin: "28px 0 16px" }}>Powiadomienia</h3>
            <Toggle label="Email o nowych wydarzeniach" defaultOn={true} />
            <Toggle label="SMS przypomnienie 24h przed" defaultOn={true} />
            <Toggle label="Newsletter klubowy" defaultOn={false} />
          </div>
        )}
      </div>
    </>
  );
}

/* ─── BOTTOM NAV (mobile) ─── */
function BottomNav({ active, setActive }) {
  const visible = NAV_ITEMS.slice(0, 5); // max 5 na dole
  return (
    <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, background: "rgba(8,8,8,0.98)", borderTop: `1px solid ${T.border}`, display: "flex", backdropFilter: "blur(20px)" }}>
      {visible.map(n => (
        <button key={n.id} onClick={() => setActive(n.id)}
          style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "10px 4px 12px", background: "none", border: "none", cursor: "pointer", color: active === n.id ? T.gold : T.dim, borderTop: `2px solid ${active === n.id ? T.gold : "transparent"}`, transition: "all 0.2s" }}>
          <span style={{ fontSize: 15 }}>{n.icon}</span>
          <span style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: "0.05em", textTransform: "uppercase" }}>{n.label}</span>
        </button>
      ))}
    </nav>
  );
}

/* ─── MAIN ─── */
export default function MembersArea() {
  const [page, setPage] = useState("dashboard");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isMobile } = useBreakpoint();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        window.location.href = '/login?redirect=/members';
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  if (loading) return (
    <div style={{ background: T.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily: T.serif, fontSize: 20, color: T.gold, fontStyle: "italic" }}>Ładowanie...</div>
    </div>
  );

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Członku';
  const initials = user?.user_metadata?.full_name ? user.user_metadata.full_name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() : user?.email?.slice(0,2).toUpperCase();

  const views = { dashboard: DashboardView, events: EventsView, members: MembersView, gallery: GalleryView, concierge: ConciergeView, profile: (p) => <ProfileView {...p} user={user} /> };
  const View = views[page] || DashboardView;

  return (
    <div style={{ background: T.bg, color: T.ivory, minHeight: "100vh", display: "flex" }}>
      {!isMobile && <Sidebar active={page} setActive={setPage} user={user} initials={initials} onLogout={handleLogout} />}

      {isMobile && (
        <MobileDrawer active={page} setActive={setPage} open={drawerOpen} onClose={() => setDrawerOpen(false)} user={user} />
      )}

      <main style={{ flex: 1, marginLeft: isMobile ? 0 : 240, minHeight: "100vh", paddingBottom: isMobile ? 72 : 0, position: "relative" }}>
        <div style={{ position: "fixed", inset: 0, marginLeft: isMobile ? 0 : 240, zIndex: 0, pointerEvents: "none" }}>
          <img src="/images/members-pattern.webp" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.035, display: "block" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <View isMobile={isMobile} onMenuClick={() => setDrawerOpen(true)} firstName={firstName} user={user} />
        </div>
      </main>

      {isMobile && <BottomNav active={page} setActive={setPage} />}
    </div>
  );
}
