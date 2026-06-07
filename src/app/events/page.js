'use client';
import { useState, useEffect } from 'react';
import PageShell from '@/components/PageShell';
import { T, Eyebrow, Heading, Body, Divider, EventCard, GhostBtn, Section, Container, FadeIn } from '@/components/ui';
import { useBreakpoint } from '@/lib/useBreakpoint';
import { supabase } from '@/lib/supabase';

function tagToCategory(tag) {
  const map = { "Sport": "sport", "Sztuka": "culture", "Filantropia": "philanthropy", "Best of Poland": "bestofpoland", "Cigar Club": "cigar", "Biznes": "biznes" };
  return map[tag] || "all";
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const months = ["stycznia","lutego","marca","kwietnia","maja","czerwca","lipca","sierpnia","września","października","listopada","grudnia"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default function EventsPage() {
  const [filter, setFilter] = useState("all");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isMobile, isTablet } = useBreakpoint();

  useEffect(() => {
    supabase.from('events').select('*').eq('published', true).order('date', { ascending: true })
      .then(({ data }) => { setEvents(data || []); setLoading(false); });
  }, []);

  const cats = ["all", "sport", "culture", "philanthropy", "bestofpoland"];
  const labels = { all: "Wszystkie", sport: "Sport", culture: "Kultura", philanthropy: "Filantropia", bestofpoland: "Best of Poland" };
  const filtered = filter === "all" ? events : events.filter(e => tagToCategory(e.tag) === filter);
  const gridCols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)";

  return (
    <PageShell>
      <Section padding="140px 48px 60px">
        <div style={{ textAlign: "center" }}>
          <Eyebrow>WYDARZENIA</Eyebrow>
          <Heading size="xl">Kalendarz klubowy</Heading>
          <div style={{ marginTop: 16 }}><Body center>Szczegóły dostępne wyłącznie dla członków</Body></div>
          <div style={{ marginTop: 32, display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)}
                style={{ padding: isMobile ? "8px 14px" : "8px 20px", background: filter === c ? "rgba(201,169,97,0.1)" : "transparent", border: "1px solid " + (filter === c ? T.gold : T.border), color: filter === c ? T.gold : T.muted, fontFamily: T.sans, fontSize: isMobile ? 11 : 12, letterSpacing: "0.08em", cursor: "pointer", transition: "all 0.2s" }}>
                {labels[c]}
              </button>
            ))}
          </div>
        </div>
      </Section>

      <Section bg={T.bgAlt} padding="60px 48px 100px">
        <Container maxWidth={1000}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0", fontFamily: T.serif, fontSize: 18, color: T.gold, fontStyle: "italic" }}>Ładowanie wydarzeń...</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", fontFamily: T.sans, fontSize: 14, color: T.dim }}>Brak wydarzeń w tej kategorii.</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: isMobile ? 16 : 24 }}>
              {filtered.map((ev, i) => (
                <FadeIn key={ev.id} delay={i * 60}>
                  <EventCard
                    title={ev.title}
                    date={formatDate(ev.date) + (ev.time ? ` · ${ev.time}` : '')}
                    location={ev.location}
                    tag={ev.tag}
                    img={ev.image_url || "/images/networking.webp"}
                  />
                </FadeIn>
              ))}
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Body center muted>Zaloguj się aby zobaczyć pełne szczegóły i RSVP.</Body>
            <div style={{ marginTop: 20 }}><GhostBtn href="/login">Zaloguj się</GhostBtn></div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
