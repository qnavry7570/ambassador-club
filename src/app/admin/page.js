'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { T } from '@/components/ui';
import dynamic from 'next/dynamic';
const ArticleEditor = dynamic(() => import('@/components/ArticleEditor'), { ssr: false });

const ADMIN_EMAILS = ['b.kawecki@ambassadorclub.pl', 'janusz.janke@svarion.com'];

/* ─── HELPERS ─── */
function Btn({ children, onClick, color = "gold", small, disabled }) {
  const [h, setH] = useState(false);
  const bg = color === "gold" ? T.gold : color === "red" ? "#7a1a1a" : "transparent";
  const hoverBg = color === "gold" ? T.goldLight : color === "red" ? "#9a2020" : "rgba(201,169,97,0.08)";
  return (
    <button onClick={onClick} disabled={disabled} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ padding: small ? "7px 14px" : "10px 20px", background: h ? hoverBg : bg, color: color === "gold" ? T.bg : T.ivory, border: color === "outline" ? `1px solid ${T.border}` : "none", fontFamily: T.sans, fontSize: small ? 11 : 13, fontWeight: 600, letterSpacing: "0.08em", cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.2s", opacity: disabled ? 0.5 : 1 }}>
      {children}
    </button>
  );
}

function Field({ label, value, onChange, type = "text", placeholder, textarea, required }) {
  const [f, setF] = useState(false);
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontFamily: T.sans, fontSize: 11, letterSpacing: "0.1em", color: T.muted, textTransform: "uppercase", marginBottom: 6 }}>{label}{required && " *"}</label>
      {textarea
        ? <textarea value={value} onChange={onChange} placeholder={placeholder} rows={3} onFocus={() => setF(true)} onBlur={() => setF(false)}
            style={{ width: "100%", padding: "10px 12px", background: "#111", border: `1px solid ${f ? T.gold : T.border}`, color: T.ivory, fontFamily: T.sans, fontSize: 13, outline: "none", resize: "vertical" }} />
        : <input type={type} value={value} onChange={onChange} placeholder={placeholder} onFocus={() => setF(true)} onBlur={() => setF(false)}
            style={{ width: "100%", padding: "10px 12px", background: "#111", border: `1px solid ${f ? T.gold : T.border}`, color: T.ivory, fontFamily: T.sans, fontSize: 13, outline: "none" }} />
      }
    </div>
  );
}

/* ─── EVENT FORM ─── */
const emptyEvent = { title: "", date: "", time: "", location: "", description: "", tag: "Sztuka", tag_color: "gold", dress_code: "", image_url: "", published: true };

function EventForm({ initial = emptyEvent, onSave, onCancel, saving, adminEmail }) {
  const [form, setForm] = useState(initial);
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState('');
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const tags = ["Sztuka", "Sport", "Filantropia", "Best of Poland", "Biznes", "Cigar Club"];
  const colors = ["gold", "red", "blue", "outline"];

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadErr('');
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload-image', {
      method: 'POST',
      headers: { 'x-admin-email': adminEmail },
      body: fd,
    });
    const json = await res.json();
    if (json.url) {
      setForm(f => ({ ...f, image_url: json.url }));
    } else {
      setUploadErr(json.error || 'Błąd uploadu');
    }
    setUploading(false);
  };

  return (
    <div style={{ background: "#0d0d0d", border: `1px solid ${T.goldBorder}`, padding: 24, marginBottom: 24 }}>
      <h3 style={{ fontFamily: T.serif, fontSize: 20, color: T.ivory, margin: "0 0 20px", fontWeight: 400 }}>
        {initial.id ? "Edytuj wydarzenie" : "Nowe wydarzenie"}
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
        <Field label="Tytuł" value={form.title} onChange={set("title")} placeholder="Nazwa wydarzenia" required />
        <Field label="Data" value={form.date} onChange={set("date")} type="date" required />
        <Field label="Godzina" value={form.time} onChange={set("time")} placeholder="19:00" />
        <Field label="Miejsce" value={form.location} onChange={set("location")} placeholder="Pałac Zamoyskich, Warszawa" />
        <Field label="Dress code" value={form.dress_code} onChange={set("dress_code")} placeholder="Black tie" />
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontFamily: T.sans, fontSize: 11, letterSpacing: "0.1em", color: T.muted, textTransform: "uppercase", marginBottom: 6 }}>Zdjęcie</label>
          <label style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "#111", border: `1px solid ${T.border}`, cursor: "pointer" }}>
            <span style={{ fontFamily: T.sans, fontSize: 12, color: T.gold }}>{uploading ? "Wgrywam..." : "📁 Wybierz plik"}</span>
            <span style={{ fontFamily: T.sans, fontSize: 11, color: T.dim }}>JPG, PNG, WebP</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: "none" }} disabled={uploading} />
          </label>
          {uploadErr && <div style={{ fontFamily: T.sans, fontSize: 11, color: "#e05555", marginTop: 4 }}>{uploadErr}</div>}
          {form.image_url && (
            <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <img src={form.image_url} alt="" style={{ width: 60, height: 40, objectFit: "cover", border: `1px solid ${T.border}` }} />
              <span style={{ fontFamily: T.sans, fontSize: 11, color: T.dim, wordBreak: "break-all" }}>
                {form.image_url.length > 40 ? form.image_url.slice(-40) : form.image_url}
              </span>
              <button onClick={() => setForm(f => ({ ...f, image_url: "" }))} style={{ background: "none", border: "none", color: "#e05555", cursor: "pointer", fontSize: 14, padding: 0 }}>✕</button>
            </div>
          )}
        </div>
      </div>
      <Field label="Opis" value={form.description} onChange={set("description")} placeholder="Krótki opis..." textarea />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontFamily: T.sans, fontSize: 11, letterSpacing: "0.1em", color: T.muted, textTransform: "uppercase", marginBottom: 6 }}>Kategoria</label>
          <select value={form.tag} onChange={set("tag")} style={{ width: "100%", padding: "10px 12px", background: "#111", border: `1px solid ${T.border}`, color: T.ivory, fontFamily: T.sans, fontSize: 13, outline: "none" }}>
            {tags.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontFamily: T.sans, fontSize: 11, letterSpacing: "0.1em", color: T.muted, textTransform: "uppercase", marginBottom: 6 }}>Kolor tagu</label>
          <select value={form.tag_color} onChange={set("tag_color")} style={{ width: "100%", padding: "10px 12px", background: "#111", border: `1px solid ${T.border}`, color: T.ivory, fontFamily: T.sans, fontSize: 13, outline: "none" }}>
            {colors.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <input type="checkbox" id="pub" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} />
        <label htmlFor="pub" style={{ fontFamily: T.sans, fontSize: 13, color: T.muted, cursor: "pointer" }}>Opublikowane (widoczne dla członków)</label>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <Btn onClick={() => onSave(form)} disabled={saving || uploading}>{saving ? "Zapisuję..." : "Zapisz"}</Btn>
        <Btn onClick={onCancel} color="outline">Anuluj</Btn>
      </div>
    </div>
  );
}

/* ─── EVENTS TAB ─── */
function EventsTab({ adminEmail }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const load = async () => {
    const { data } = await supabase.from('events').select('*').order('date', { ascending: true });
    setEvents(data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async (form) => {
    setSaving(true);
    if (editing) {
      const { error } = await supabase.from('events').update(form).eq('id', editing.id);
      if (!error) { setMsg('Zaktualizowano.'); setEditing(null); }
    } else {
      const { error } = await supabase.from('events').insert(form);
      if (!error) { setMsg('Dodano wydarzenie.'); setShowForm(false); }
    }
    setSaving(false);
    load();
    setTimeout(() => setMsg(''), 3000);
  };

  const del = async (id) => {
    if (!confirm('Usunąć to wydarzenie?')) return;
    await supabase.from('events').delete().eq('id', id);
    load();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: T.serif, fontSize: 24, color: T.ivory, margin: 0, fontWeight: 400 }}>Wydarzenia ({events.length})</h2>
        <Btn onClick={() => { setShowForm(true); setEditing(null); }}>+ Dodaj wydarzenie</Btn>
      </div>
      {msg && <div style={{ background: "rgba(201,169,97,0.1)", border: `1px solid ${T.goldBorder}`, padding: "10px 16px", fontFamily: T.sans, fontSize: 13, color: T.gold, marginBottom: 16 }}>{msg}</div>}
      {(showForm && !editing) && <EventForm onSave={save} onCancel={() => setShowForm(false)} saving={saving} adminEmail={adminEmail} />}
      {editing && <EventForm initial={editing} onSave={save} onCancel={() => setEditing(null)} saving={saving} adminEmail={adminEmail} />}
      {loading ? <div style={{ color: T.dim, fontFamily: T.sans }}>Ładowanie...</div> : (
        <div style={{ border: `1px solid ${T.border}` }}>
          {events.length === 0 && <div style={{ padding: 24, fontFamily: T.sans, fontSize: 14, color: T.dim, textAlign: "center" }}>Brak wydarzeń. Dodaj pierwsze.</div>}
          {events.map((ev, i) => (
            <div key={ev.id} style={{ padding: "16px 20px", borderBottom: i < events.length - 1 ? `1px solid ${T.border}` : "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontFamily: T.serif, fontSize: 16, color: T.ivory }}>{ev.title}</span>
                  {!ev.published && <span style={{ fontFamily: T.sans, fontSize: 10, color: T.dim, border: `1px solid ${T.border}`, padding: "2px 6px" }}>UKRYTE</span>}
                </div>
                <div style={{ fontFamily: T.sans, fontSize: 12, color: T.dim }}>{ev.date} · {ev.time} · {ev.location}</div>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <Btn small color="outline" onClick={() => { setEditing(ev); setShowForm(false); }}>Edytuj</Btn>
                <Btn small color="red" onClick={() => del(ev.id)}>Usuń</Btn>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── MEMBERS TAB ─── */
const emptyMember = { full_name: "", email: "", company: "", role: "", sector: "", member_since: new Date().getFullYear().toString(), is_admin: false };

function MemberForm({ initial = emptyMember, onSave, onCancel, saving }) {
  const [form, setForm] = useState(initial);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const sectors = ["Finanse", "Technologia", "Prawo", "Nieruchomości", "Moda", "Sztuka", "Jachting", "Filantropia", "Biznes", "Inne"];
  return (
    <div style={{ background: "#0d0d0d", border: `1px solid ${T.goldBorder}`, padding: 24, marginBottom: 24 }}>
      <h3 style={{ fontFamily: T.serif, fontSize: 20, color: T.ivory, margin: "0 0 20px", fontWeight: 400 }}>
        {initial.id ? "Edytuj członka" : "Nowy członek"}
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
        <Field label="Imię i nazwisko" value={form.full_name} onChange={set("full_name")} placeholder="Jan Kowalski" required />
        <Field label="Email" value={form.email} onChange={set("email")} type="email" placeholder="jan@example.com" required />
        <Field label="Firma" value={form.company} onChange={set("company")} placeholder="Firma XYZ" />
        <Field label="Stanowisko" value={form.role} onChange={set("role")} placeholder="CEO" />
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontFamily: T.sans, fontSize: 11, letterSpacing: "0.1em", color: T.muted, textTransform: "uppercase", marginBottom: 6 }}>Sektor</label>
          <select value={form.sector} onChange={set("sector")} style={{ width: "100%", padding: "10px 12px", background: "#111", border: `1px solid ${T.border}`, color: T.ivory, fontFamily: T.sans, fontSize: 13, outline: "none" }}>
            <option value="">— wybierz —</option>
            {sectors.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <Field label="Członek od (rok)" value={form.member_since} onChange={set("member_since")} placeholder="2025" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <input type="checkbox" id="is_admin" checked={form.is_admin} onChange={e => setForm(f => ({ ...f, is_admin: e.target.checked }))} />
        <label htmlFor="is_admin" style={{ fontFamily: T.sans, fontSize: 13, color: T.muted, cursor: "pointer" }}>Uprawnienia admina</label>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <Btn onClick={() => onSave(form)} disabled={saving}>{saving ? "Zapisuję..." : "Zapisz"}</Btn>
        <Btn onClick={onCancel} color="outline">Anuluj</Btn>
      </div>
    </div>
  );
}

function MembersTab({ adminEmail }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(null); // member id
  const [loginPass, setLoginPass] = useState('');
  const [creatingLogin, setCreatingLogin] = useState(false);

  const load = async () => {
    const { data } = await supabase.from('members').select('*').order('created_at', { ascending: false });
    setMembers(data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async (form) => {
    setSaving(true);
    if (editing) {
      await supabase.from('members').update(form).eq('id', editing.id);
      setMsg('Zaktualizowano.'); setEditing(null);
    } else {
      await supabase.from('members').insert(form);
      setMsg('Dodano członka.'); setShowForm(false);
    }
    setSaving(false); load();
    setTimeout(() => setMsg(''), 3000);
  };

  const del = async (id) => {
    if (!confirm('Usunąć tego członka?')) return;
    await supabase.from('members').delete().eq('id', id);
    load();
  };

  const sendInvite = async (m) => {
    setCreatingLogin(true);
    const res = await fetch('/api/admin/create-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: m.email, full_name: m.full_name, requestEmail: adminEmail }),
    });
    const data = await res.json();
    setCreatingLogin(false);
    setShowLoginForm(null);
    if (data.error) setMsg(`Błąd: ${data.error}`);
    else setMsg(`Zaproszenie wysłane na ${m.email}. Członek ustawi hasło samodzielnie.`);
    setTimeout(() => setMsg(''), 5000);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: T.serif, fontSize: 24, color: T.ivory, margin: 0, fontWeight: 400 }}>Członkowie ({members.length})</h2>
        <Btn onClick={() => { setShowForm(true); setEditing(null); }}>+ Dodaj członka</Btn>
      </div>
      {msg && <div style={{ background: "rgba(201,169,97,0.1)", border: `1px solid ${T.goldBorder}`, padding: "10px 16px", fontFamily: T.sans, fontSize: 13, color: T.gold, marginBottom: 16 }}>{msg}</div>}
      {(showForm && !editing) && <MemberForm onSave={save} onCancel={() => setShowForm(false)} saving={saving} />}
      {editing && <MemberForm initial={editing} onSave={save} onCancel={() => setEditing(null)} saving={saving} />}
      {loading ? <div style={{ color: T.dim, fontFamily: T.sans }}>Ładowanie...</div> : (
        <div style={{ border: `1px solid ${T.border}` }}>
          {members.length === 0 && <div style={{ padding: 24, fontFamily: T.sans, fontSize: 14, color: T.dim, textAlign: "center" }}>Brak członków. Dodaj pierwszego.</div>}
          {members.map((m, i) => (
            <div key={m.id}>
              <div style={{ padding: "14px 20px", borderBottom: showLoginForm === m.id ? "none" : i < members.length - 1 ? `1px solid ${T.border}` : "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontFamily: T.serif, fontSize: 15, color: T.ivory }}>{m.full_name || '—'}</span>
                    {m.is_admin && <span style={{ fontFamily: T.sans, fontSize: 10, color: T.gold, border: `1px solid ${T.goldBorder}`, padding: "2px 6px" }}>ADMIN</span>}
                  </div>
                  <div style={{ fontFamily: T.sans, fontSize: 12, color: T.dim }}>{m.email} · {m.role || '—'} · {m.sector || '—'}</div>
                </div>
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <Btn small color="outline" onClick={() => { setShowLoginForm(showLoginForm === m.id ? null : m.id); setLoginPass(''); }}>🔑 Konto</Btn>
                  <Btn small color="outline" onClick={() => { setEditing(m); setShowForm(false); }}>Edytuj</Btn>
                  <Btn small color="red" onClick={() => del(m.id)}>Usuń</Btn>
                </div>
              </div>
              {showLoginForm === m.id && (
                <div style={{ padding: "16px 20px", background: "rgba(201,169,97,0.04)", borderBottom: i < members.length - 1 ? `1px solid ${T.border}` : "none", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: T.sans, fontSize: 13, color: T.ivory, marginBottom: 4 }}>Wyślij zaproszenie do: <strong>{m.email}</strong></div>
                    <div style={{ fontFamily: T.sans, fontSize: 12, color: T.dim }}>Członek otrzyma email z linkiem i sam ustawi hasło.</div>
                  </div>
                  <Btn small onClick={() => sendInvite(m)} disabled={creatingLogin}>{creatingLogin ? "Wysyłam..." : "✉ Wyślij zaproszenie"}</Btn>
                  <Btn small color="outline" onClick={() => setShowLoginForm(null)}>Anuluj</Btn>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── ARTICLES TAB ─── */
const emptyArticle = { title: "", excerpt: "", content: "", category: "Sport", image_url: "", published: true };
const articleCategories = ["Sport", "Kultura", "Filantropia", "Best of Poland", "Biznes", "Dziedzictwo", "Cigar Club"];

function ArticleForm({ initial = emptyArticle, onSave, onCancel, saving, adminEmail }) {
  const [form, setForm] = useState(initial);
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState('');
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadErr('');
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload-image', {
      method: 'POST',
      headers: { 'x-admin-email': adminEmail },
      body: fd,
    });
    const json = await res.json();
    if (json.url) {
      setForm(f => ({ ...f, image_url: json.url }));
    } else {
      setUploadErr(json.error || 'Błąd uploadu');
    }
    setUploading(false);
  };

  return (
    <div style={{ background: "#0d0d0d", border: `1px solid ${T.goldBorder}`, padding: 24, marginBottom: 24 }}>
      <h3 style={{ fontFamily: T.serif, fontSize: 20, color: T.ivory, margin: "0 0 20px", fontWeight: 400 }}>
        {initial.id ? "Edytuj artykuł" : "Nowy artykuł"}
      </h3>
      <Field label="Tytuł" value={form.title} onChange={set("title")} placeholder="Tytuł artykułu" required />
      <Field label="Zajawka (skrót widoczny na liście)" value={form.excerpt} onChange={set("excerpt")} placeholder="Krótki opis..." textarea />
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontFamily: T.sans, fontSize: 11, letterSpacing: "0.1em", color: T.muted, textTransform: "uppercase", marginBottom: 6 }}>Treść artykułu</label>
        <ArticleEditor value={form.content} onChange={val => setForm(f => ({ ...f, content: val }))} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontFamily: T.sans, fontSize: 11, letterSpacing: "0.1em", color: T.muted, textTransform: "uppercase", marginBottom: 6 }}>Kategoria</label>
          <select value={form.category} onChange={set("category")} style={{ width: "100%", padding: "10px 12px", background: "#111", border: `1px solid ${T.border}`, color: T.ivory, fontFamily: T.sans, fontSize: 13, outline: "none" }}>
            {articleCategories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontFamily: T.sans, fontSize: 11, letterSpacing: "0.1em", color: T.muted, textTransform: "uppercase", marginBottom: 6 }}>Zdjęcie</label>
          <label style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "#111", border: `1px solid ${T.border}`, cursor: "pointer" }}>
            <span style={{ fontFamily: T.sans, fontSize: 12, color: T.gold }}>
              {uploading ? "Wgrywam..." : "📁 Wybierz plik"}
            </span>
            <span style={{ fontFamily: T.sans, fontSize: 11, color: T.dim }}>JPG, PNG, WebP</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: "none" }} disabled={uploading} />
          </label>
          {uploadErr && <div style={{ fontFamily: T.sans, fontSize: 11, color: "#e05555", marginTop: 4 }}>{uploadErr}</div>}
          {form.image_url && (
            <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <img src={form.image_url} alt="" style={{ width: 60, height: 40, objectFit: "cover", border: `1px solid ${T.border}` }} />
              <span style={{ fontFamily: T.sans, fontSize: 11, color: T.dim, wordBreak: "break-all" }}>
                {form.image_url.length > 40 ? form.image_url.slice(-40) : form.image_url}
              </span>
              <button onClick={() => setForm(f => ({ ...f, image_url: "" }))} style={{ background: "none", border: "none", color: "#e05555", cursor: "pointer", fontSize: 14, padding: 0 }}>✕</button>
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <input type="checkbox" id="art_pub" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} />
        <label htmlFor="art_pub" style={{ fontFamily: T.sans, fontSize: 13, color: T.muted, cursor: "pointer" }}>Opublikowany (widoczny w Journal)</label>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <Btn onClick={() => onSave(form)} disabled={saving || uploading}>{saving ? "Zapisuję..." : "Zapisz"}</Btn>
        <Btn onClick={onCancel} color="outline">Anuluj</Btn>
      </div>
    </div>
  );
}

function ArticlesTab({ adminEmail }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const load = async () => {
    const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
    setArticles(data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async (form) => {
    setSaving(true);
    if (editing) {
      await supabase.from('articles').update(form).eq('id', editing.id);
      setMsg('Zaktualizowano.'); setEditing(null);
    } else {
      await supabase.from('articles').insert(form);
      setMsg('Dodano artykuł.'); setShowForm(false);
    }
    setSaving(false); load();
    setTimeout(() => setMsg(''), 3000);
  };

  const del = async (id) => {
    if (!confirm('Usunąć ten artykuł?')) return;
    await supabase.from('articles').delete().eq('id', id);
    load();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: T.serif, fontSize: 24, color: T.ivory, margin: 0, fontWeight: 400 }}>Artykuły ({articles.length})</h2>
        <Btn onClick={() => { setShowForm(true); setEditing(null); }}>+ Nowy artykuł</Btn>
      </div>
      {msg && <div style={{ background: "rgba(201,169,97,0.1)", border: `1px solid ${T.goldBorder}`, padding: "10px 16px", fontFamily: T.sans, fontSize: 13, color: T.gold, marginBottom: 16 }}>{msg}</div>}
      {(showForm && !editing) && <ArticleForm onSave={save} onCancel={() => setShowForm(false)} saving={saving} adminEmail={adminEmail} />}
      {editing && <ArticleForm initial={editing} onSave={save} onCancel={() => setEditing(null)} saving={saving} adminEmail={adminEmail} />}
      {loading ? <div style={{ color: T.dim, fontFamily: T.sans }}>Ładowanie...</div> : (
        <div style={{ border: `1px solid ${T.border}` }}>
          {articles.length === 0 && <div style={{ padding: 24, fontFamily: T.sans, fontSize: 14, color: T.dim, textAlign: "center" }}>Brak artykułów. Dodaj pierwszy.</div>}
          {articles.map((a, i) => (
            <div key={a.id} style={{ padding: "16px 20px", borderBottom: i < articles.length - 1 ? `1px solid ${T.border}` : "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontFamily: T.serif, fontSize: 16, color: T.ivory }}>{a.title}</span>
                  {!a.published && <span style={{ fontFamily: T.sans, fontSize: 10, color: T.dim, border: `1px solid ${T.border}`, padding: "2px 6px" }}>UKRYTY</span>}
                </div>
                <div style={{ fontFamily: T.sans, fontSize: 12, color: T.dim }}>{a.category} · {new Date(a.created_at).toLocaleDateString('pl-PL')}</div>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <Btn small color="outline" onClick={() => { setEditing(a); setShowForm(false); }}>Edytuj</Btn>
                <Btn small color="red" onClick={() => del(a.id)}>Usuń</Btn>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── STATS TAB ─── */
function StatsTab() {
  const [stats, setStats] = useState({ events: 0, members: 0, rsvp: 0 });

  useEffect(() => {
    Promise.all([
      supabase.from('events').select('*', { count: 'exact', head: true }),
      supabase.from('members').select('*', { count: 'exact', head: true }),
      supabase.from('rsvp').select('*', { count: 'exact', head: true }),
    ]).then(([e, m, r]) => setStats({ events: e.count || 0, members: m.count || 0, rsvp: r.count || 0 }));
  }, []);

  const cards = [
    { label: "Wydarzeń", value: stats.events, icon: "◆" },
    { label: "Członków", value: stats.members, icon: "◇" },
    { label: "Zapisanych RSVP", value: stats.rsvp, icon: "✓" },
  ];

  return (
    <div>
      <h2 style={{ fontFamily: T.serif, fontSize: 24, color: T.ivory, margin: "0 0 24px", fontWeight: 400 }}>Statystyki</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {cards.map((c, i) => (
          <div key={i} style={{ background: "#0d0d0d", border: `1px solid ${T.border}`, padding: "28px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 24, color: T.gold, marginBottom: 12 }}>{c.icon}</div>
            <div style={{ fontFamily: T.serif, fontSize: 40, fontWeight: 300, color: T.gold }}>{c.value}</div>
            <div style={{ fontFamily: T.sans, fontSize: 11, color: T.dim, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8 }}>{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── RSVP TAB ─── */
function RsvpTab() {
  const [events, setEvents] = useState([]);
  const [rsvpData, setRsvpData] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    supabase.from('events').select('*').eq('published', true).order('date', { ascending: true })
      .then(async ({ data: evs }) => {
        setEvents(evs || []);
        const result = {};
        await Promise.all((evs || []).map(async ev => {
          const { data } = await supabase
            .from('rsvp_with_names')
            .select('user_id, email, full_name, created_at')
            .eq('event_id', ev.id);
          result[ev.id] = data || [];
        }));
        setRsvpData(result);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 style={{ fontFamily: T.serif, fontSize: 24, color: T.ivory, margin: "0 0 24px", fontWeight: 400 }}>RSVP — lista zapisanych</h2>
      {loading ? <div style={{ color: T.dim, fontFamily: T.sans }}>Ładowanie...</div> : (
        <div style={{ border: `1px solid ${T.border}` }}>
          {events.length === 0 && <div style={{ padding: 24, fontFamily: T.sans, fontSize: 14, color: T.dim, textAlign: "center" }}>Brak wydarzeń.</div>}
          {events.map((ev, i) => {
            const list = rsvpData[ev.id] || [];
            const isOpen = open === ev.id;
            return (
              <div key={ev.id} style={{ borderBottom: i < events.length - 1 ? `1px solid ${T.border}` : "none" }}>
                <div onClick={() => setOpen(isOpen ? null : ev.id)}
                  style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", background: isOpen ? "rgba(201,169,97,0.04)" : "transparent" }}>
                  <div>
                    <div style={{ fontFamily: T.serif, fontSize: 16, color: T.ivory }}>{ev.title}</div>
                    <div style={{ fontFamily: T.sans, fontSize: 12, color: T.dim, marginTop: 2 }}>{ev.date} · {ev.location}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ background: list.length > 0 ? "rgba(201,169,97,0.1)" : "transparent", border: `1px solid ${list.length > 0 ? T.gold : T.border}`, padding: "4px 14px", fontFamily: T.sans, fontSize: 13, color: list.length > 0 ? T.gold : T.dim }}>
                      {list.length} zapisanych
                    </div>
                    <span style={{ color: T.gold, fontSize: 12 }}>{isOpen ? "▲" : "▼"}</span>
                  </div>
                </div>
                {isOpen && (
                  <div style={{ padding: "0 20px 16px", borderTop: `1px solid ${T.border}` }}>
                    {list.length === 0 ? (
                      <div style={{ padding: "12px 0", fontFamily: T.sans, fontSize: 13, color: T.dim }}>Nikt jeszcze się nie zapisał.</div>
                    ) : (
                      list.map((r, j) => (
                        <div key={j} style={{ padding: "10px 0", borderBottom: j < list.length - 1 ? `1px solid ${T.border}` : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <span style={{ fontFamily: T.serif, fontSize: 14, color: T.ivory }}>{r.full_name || '—'}</span>
                            <span style={{ fontFamily: T.sans, fontSize: 12, color: T.dim, marginLeft: 10 }}>{r.email}</span>
                          </div>
                          <span style={{ fontFamily: T.sans, fontSize: 11, color: T.dim }}>{new Date(r.created_at).toLocaleDateString('pl-PL')}</span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── MAIN ─── */
export default function AdminPage() {
  const [tab, setTab] = useState("events");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    const handle = (session) => {
      if (!session) { window.location.href = '/login?redirect=/admin'; return; }
      if (!ADMIN_EMAILS.includes(session.user.email)) { setDenied(true); setLoading(false); return; }
      setUser(session.user);
      setLoading(false);
    };
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => handle(session));
    supabase.auth.getSession().then(({ data: { session } }) => handle(session));
    return () => subscription.unsubscribe();
  }, []);

  if (loading) return (
    <div style={{ background: T.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily: T.serif, fontSize: 20, color: T.gold, fontStyle: "italic" }}>Ładowanie...</div>
    </div>
  );

  if (denied) return (
    <div style={{ background: T.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: T.serif, fontSize: 24, color: T.ivory, marginBottom: 12 }}>Brak dostępu</div>
        <div style={{ fontFamily: T.sans, fontSize: 14, color: T.dim, marginBottom: 24 }}>Panel admina dostępny tylko dla właściciela klubu.</div>
        <a href="/" style={{ color: T.gold, fontFamily: T.sans, fontSize: 13 }}>← Wróć na stronę główną</a>
      </div>
    </div>
  );

  const tabs = [
    { id: "events",   label: "Wydarzenia" },
    { id: "articles", label: "Artykuły" },
    { id: "members",  label: "Członkowie" },
    { id: "rsvp",     label: "RSVP" },
    { id: "stats",    label: "Statystyki" },
  ];

  return (
    <div style={{ background: T.bg, minHeight: "100vh", color: T.ivory }}>
      {/* Top bar */}
      <header style={{ height: 60, background: "#080808", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.25em", color: T.gold }}>AMBASSADOR CLUB</span>
          <span style={{ color: T.border }}>|</span>
          <span style={{ fontFamily: T.sans, fontSize: 12, color: T.dim, letterSpacing: "0.1em" }}>PANEL ADMINA</span>
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <span style={{ fontFamily: T.sans, fontSize: 12, color: T.dim }}>{user?.email}</span>
          <a href="/members" style={{ fontFamily: T.sans, fontSize: 12, color: T.muted, textDecoration: "none" }}>Members Area</a>
          <a href="/" style={{ fontFamily: T.sans, fontSize: 12, color: T.muted, textDecoration: "none" }}>← Strona</a>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${T.border}`, marginBottom: 32 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ padding: "12px 24px", background: "transparent", border: "none", borderBottom: `2px solid ${tab === t.id ? T.gold : "transparent"}`, color: tab === t.id ? T.gold : T.muted, fontFamily: T.sans, fontSize: 13, letterSpacing: "0.08em", cursor: "pointer", marginBottom: -1, transition: "all 0.2s" }}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === "events"   && <EventsTab adminEmail={user?.email} />}
        {tab === "articles" && <ArticlesTab adminEmail={user?.email} />}
        {tab === "members"  && <MembersTab adminEmail={user?.email} />}
        {tab === "rsvp"     && <RsvpTab />}
        {tab === "stats"    && <StatsTab />}
      </div>
    </div>
  );
}
