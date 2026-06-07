'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PageShell from '@/components/PageShell';
import { T, GoldBtn, GhostBtn, Badge, Eyebrow } from '@/components/ui';
import { useBreakpoint } from '@/lib/useBreakpoint';
import { supabase } from '@/lib/supabase';

function formatDate(str) {
  if (!str) return '';
  const d = new Date(str);
  const months = ["stycznia","lutego","marca","kwietnia","maja","czerwca","lipca","sierpnia","września","października","listopada","grudnia"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function RichContent({ html }) {
  return (
    <>
      <style>{`
        .article-body { color: rgba(245,241,232,0.85); font-family: 'Lato', sans-serif; font-size: 16px; font-weight: 300; line-height: 1.85; }
        .article-body h1, .article-body h2, .article-body h3 { font-family: 'Cormorant Garamond', serif; font-weight: 400; color: #F5F1E8; margin: 2em 0 0.6em; line-height: 1.2; }
        .article-body h1 { font-size: 32px; }
        .article-body h2 { font-size: 26px; }
        .article-body h3 { font-size: 20px; }
        .article-body p { margin: 0 0 1.4em; }
        .article-body strong { font-weight: 700; color: #F5F1E8; }
        .article-body em { font-style: italic; }
        .article-body a { color: #C9A961; text-decoration: underline; }
        .article-body ul, .article-body ol { padding-left: 1.5em; margin: 0 0 1.4em; }
        .article-body li { margin-bottom: 0.4em; }
        .article-body blockquote { border-left: 2px solid #C9A961; margin: 2em 0; padding: 0.5em 0 0.5em 1.5em; font-family: 'Cormorant Garamond', serif; font-size: 20px; font-style: italic; color: rgba(245,241,232,0.7); }
        .article-body hr { border: none; border-top: 1px solid rgba(201,169,97,0.2); margin: 2.5em 0; }
      `}</style>
      <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}

function MemberGate({ article }) {
  return (
    <div style={{ margin: "48px 0", padding: "48px 40px", border: `1px solid ${T.goldBorder}`, background: "rgba(201,169,97,0.04)", textAlign: "center" }}>
      <div style={{ width: 56, height: 56, border: `1px solid ${T.goldBorder}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 22, color: T.gold }}>🔒</div>
      <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: "0.3em", color: T.gold, textTransform: "uppercase", marginBottom: 12 }}>Treść zastrzeżona</div>
      <h3 style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 300, color: T.ivory, margin: "0 0 12px" }}>Ten artykuł jest dostępny wyłącznie dla członków</h3>
      <div style={{ width: 40, height: 1, background: T.gold, margin: "0 auto 20px" }} />
      <p style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 300, color: T.muted, lineHeight: 1.7, maxWidth: 400, margin: "0 auto 32px" }}>
        Zaloguj się lub złóż aplikację o członkostwo, aby czytać pełne artykuły Ambassador Club Journal.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <GoldBtn href={`/login?redirect=/journal/${article.id}`}>Zaloguj się</GoldBtn>
        <GhostBtn href="/membership">Aplikuj o członkostwo</GhostBtn>
      </div>
    </div>
  );
}

export default function ArticlePage() {
  const { id } = useParams();
  const { isMobile } = useBreakpoint();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // Pobierz artykuł
    supabase.from('articles').select('*').eq('id', id).eq('published', true).single()
      .then(({ data: art, error }) => {
        if (error || !art) setNotFound(true);
        else setArticle(art);
        setLoading(false);
      });

    // Sprawdź sesję — onAuthStateChange jest pewniejszy niż getSession na starcie
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    // Też wywołaj getSession na wypadek gdyby sesja już istniała
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, [id]);

  if (loading) return (
    <PageShell>
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: T.serif, fontSize: 20, color: T.gold, fontStyle: "italic" }}>Ładowanie...</div>
      </div>
    </PageShell>
  );

  if (notFound) return (
    <PageShell>
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20 }}>
        <div style={{ fontFamily: T.serif, fontSize: 28, color: T.ivory }}>Artykuł nie istnieje</div>
        <a href="/journal" style={{ fontFamily: T.sans, fontSize: 13, color: T.gold, textDecoration: "none" }}>← Wróć do Journal</a>
      </div>
    </PageShell>
  );

  const contentWidth = isMobile ? "100%" : 720;
  const pad = isMobile ? "24px" : "48px";

  return (
    <PageShell>
      {/* Hero z obrazem */}
      <div style={{ position: "relative", height: isMobile ? 280 : 480, overflow: "hidden" }}>
        <img
          src={article.image_url || "/images/networking.webp"}
          alt={article.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.85) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: isMobile ? "24px" : "48px 80px" }}>
          <a href="/journal" style={{ fontFamily: T.sans, fontSize: 11, color: T.gold, textDecoration: "none", letterSpacing: "0.1em", display: "inline-block", marginBottom: 16 }}>← JOURNAL</a>
          <div style={{ marginBottom: 12 }}><Badge>{article.category}</Badge></div>
          <h1 style={{ fontFamily: T.serif, fontSize: isMobile ? 28 : 48, fontWeight: 300, color: T.ivory, lineHeight: 1.15, margin: "0 0 16px", maxWidth: 800 }}>{article.title}</h1>
          <div style={{ fontFamily: T.sans, fontSize: 12, color: "rgba(245,241,232,0.5)", letterSpacing: "0.08em" }}>{formatDate(article.created_at)}</div>
        </div>
      </div>

      {/* Treść */}
      <div style={{ background: T.bg, padding: `60px ${pad} 100px` }}>
        <div style={{ maxWidth: contentWidth, margin: "0 auto" }}>

          {/* Lead / zajawka */}
          {article.excerpt && (
            <p style={{ fontFamily: T.serif, fontSize: isMobile ? 18 : 22, fontWeight: 300, color: "rgba(245,241,232,0.75)", lineHeight: 1.6, margin: "0 0 40px", fontStyle: "italic" }}>
              {article.excerpt}
            </p>
          )}

          <div style={{ width: 48, height: 1, background: T.gold, marginBottom: 40 }} />

          {/* Treść: tylko dla członków */}
          {isLoggedIn ? (
            article.content ? <RichContent html={article.content} /> : (
              <p style={{ fontFamily: T.sans, fontSize: 15, color: T.dim }}>Brak treści artykułu.</p>
            )
          ) : (
            <MemberGate article={article} />
          )}

          {/* Powrót */}
          <div style={{ marginTop: 60, paddingTop: 40, borderTop: `1px solid ${T.border}` }}>
            <a href="/journal" style={{ fontFamily: T.sans, fontSize: 13, color: T.gold, textDecoration: "none", letterSpacing: "0.08em" }}>← Wróć do Journal</a>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
