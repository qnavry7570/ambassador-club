'use client';
import { useState, useEffect } from 'react';
import PageShell from '@/components/PageShell';
import { T, Eyebrow, Heading, Body, Badge, Section, Container, GoldBtn, GhostBtn, FadeIn } from '@/components/ui';
import { useBreakpoint } from '@/lib/useBreakpoint';
import { supabase } from '@/lib/supabase';

function MembersModal({ article, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
      onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }} />
      <div style={{ position: "relative", background: T.bgCard, border: `1px solid ${T.goldBorder}`, maxWidth: 480, width: "100%", padding: "48px 40px", textAlign: "center" }}
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: T.dim, fontSize: 20, lineHeight: 1 }}>✕</button>
        <div style={{ width: 56, height: 56, border: `1px solid ${T.goldBorder}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 22, color: T.gold }}>🔒</div>
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: "0.3em", color: T.gold, textTransform: "uppercase", marginBottom: 12 }}>Treść zastrzeżona</div>
        <h3 style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 300, color: T.ivory, lineHeight: 1.3, margin: "0 0 16px" }}>{article.title}</h3>
        <div style={{ width: 40, height: 1, background: T.gold, margin: "0 auto 20px" }} />
        <p style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 300, color: T.muted, lineHeight: 1.7, margin: "0 0 32px" }}>
          Ten artykuł jest dostępny wyłącznie dla członków Ambassador Club. Zaloguj się lub złóż aplikację o członkostwo.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <GoldBtn href="/login">Zaloguj się</GoldBtn>
          <GhostBtn href="/membership">Aplikuj o członkostwo</GhostBtn>
        </div>
      </div>
    </div>
  );
}

function ArticleCard({ id, title, date, category, excerpt, image_url }) {
  const [h, setH] = useState(false);
  const img = image_url || "/images/networking.webp";
  return (
    <a href={`/journal/${id}`} style={{ textDecoration: "none", display: "block" }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <div style={{ background: T.bgCard, border: "1px solid " + (h ? T.goldBorder : T.border), transition: "all 0.35s", cursor: "pointer", transform: h ? "translateY(-3px)" : "none", overflow: "hidden" }}>
        <div style={{ height: 200, overflow: "hidden" }}>
          <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s", transform: h ? "scale(1.05)" : "scale(1)" }} loading="lazy" />
        </div>
        <div style={{ padding: "24px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <Badge>{category}</Badge>
            <span style={{ fontFamily: T.sans, fontSize: 10, color: T.dim }}>{date}</span>
          </div>
          <h3 style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 400, color: T.ivory, marginBottom: 8, lineHeight: 1.3 }}>{title}</h3>
          <Body sz={13} muted>{excerpt}</Body>
          <div style={{ marginTop: 16, fontFamily: T.sans, fontSize: 11, color: h ? T.gold : T.dim, letterSpacing: "0.1em", textTransform: "uppercase", transition: "color 0.3s" }}>Czytaj więcej →</div>
        </div>
      </div>
    </a>
  );
}

function formatDate(str) {
  if (!str) return '';
  const d = new Date(str);
  const months = ["sty","lut","mar","kwi","maj","cze","lip","sie","wrz","paź","lis","gru"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default function JournalPage() {
  const { isMobile, isTablet } = useBreakpoint();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);

  useEffect(() => {
    supabase.from('articles').select('*').eq('published', true).order('created_at', { ascending: false })
      .then(({ data }) => { setArticles(data || []); setLoading(false); });
  }, []);

  const categories = ["all", ...Array.from(new Set(articles.map(a => a.category)))];
  const filtered = articles
    .filter(a => filter === "all" || a.category === filter)
    .filter(a => !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt?.toLowerCase().includes(search.toLowerCase()));
  const gridCols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)";

  return (
    <PageShell>
      <Section padding="140px 48px 60px">
        <div style={{ textAlign: "center" }}>
          <Eyebrow>JOURNAL</Eyebrow>
          <Heading size="xl">Magazyn klubowy</Heading>
          <div style={{ marginTop: 16 }}>
            <Body center>Artykuły o sztuce, sportach gentlemanów i polskim dziedzictwie</Body>
          </div>
          {/* Wyszukiwarka */}
          <div style={{ marginTop: 32, maxWidth: 420, margin: "32px auto 0" }}>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: searchFocus ? T.gold : T.dim, fontSize: 14, transition: "color 0.2s" }}>⌕</span>
              <input
                type="text"
                placeholder="Szukaj artykułów..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
                style={{ width: "100%", padding: "12px 16px 12px 40px", background: "rgba(22,22,22,0.6)", border: `1px solid ${searchFocus ? T.gold : T.border}`, color: T.ivory, fontFamily: T.sans, fontSize: 14, fontWeight: 300, outline: "none", transition: "all 0.2s" }}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: T.dim, cursor: "pointer", fontSize: 16, lineHeight: 1 }}>✕</button>
              )}
            </div>
          </div>
          {articles.length > 0 && (
            <div style={{ marginTop: 16, display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              {categories.map(c => (
                <button key={c} onClick={() => setFilter(c)}
                  style={{ padding: isMobile ? "8px 14px" : "8px 20px", background: filter === c ? "rgba(201,169,97,0.1)" : "transparent", border: `1px solid ${filter === c ? T.gold : T.border}`, color: filter === c ? T.gold : T.muted, fontFamily: T.sans, fontSize: 12, letterSpacing: "0.08em", cursor: "pointer", transition: "all 0.2s" }}>
                  {c === "all" ? "Wszystkie" : c}
                </button>
              ))}
            </div>
          )}
        </div>
      </Section>

      <Section bg={T.bgAlt} padding="60px 48px 100px">
        <Container maxWidth={1100}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0", fontFamily: T.serif, fontSize: 18, color: T.gold, fontStyle: "italic" }}>Ładowanie...</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", fontFamily: T.sans, fontSize: 14, color: T.dim }}>Brak artykułów.</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: isMobile ? 16 : 24 }}>
              {filtered.map((a, i) => (
                <FadeIn key={a.id} delay={i * 60}>
                  <ArticleCard {...a} date={formatDate(a.created_at)} />
                </FadeIn>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </PageShell>
  );
}
