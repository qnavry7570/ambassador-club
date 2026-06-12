'use client';
import { useState, useEffect } from 'react';
import PageShell from '@/components/PageShell';
import { T, Eyebrow, Heading, Body, Section, Container, FadeIn, Divider } from '@/components/ui';
import { useBreakpoint } from '@/lib/useBreakpoint';
import { supabase } from '@/lib/supabase';

function PartnerCard({ name, logo_url, website, description, sector }) {
  const [h, setH] = useState(false);
  const inner = (
    <div
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: T.bgCard, border: "1px solid " + (h ? T.goldBorder : T.border), transition: "all 0.35s", transform: h ? "translateY(-3px)" : "none", padding: "32px 28px", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
    >
      <div style={{ height: 90, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, width: "100%" }}>
        {logo_url
          ? <img src={logo_url} alt={name} style={{ maxHeight: 90, maxWidth: "100%", objectFit: "contain", filter: h ? "none" : "saturate(0.9)", transition: "filter 0.3s" }} loading="lazy" />
          : <div style={{ fontFamily: T.serif, fontSize: 24, color: T.gold }}>{name}</div>}
      </div>
      {sector && <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: "0.18em", color: T.gold, textTransform: "uppercase", marginBottom: 8 }}>{sector}</div>}
      <h3 style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 400, color: T.ivory, margin: "0 0 10px" }}>{name}</h3>
      {description && <p style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 300, color: T.muted, lineHeight: 1.6, margin: 0 }}>{description}</p>}
      {website && (
        <div style={{ marginTop: 16, fontFamily: T.sans, fontSize: 11, color: h ? T.gold : T.dim, letterSpacing: "0.1em", textTransform: "uppercase", transition: "color 0.3s" }}>
          Odwiedź stronę →
        </div>
      )}
    </div>
  );
  return website
    ? <a href={website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block", height: "100%" }}>{inner}</a>
    : inner;
}

export default function PartnersPage() {
  const { isMobile, isTablet } = useBreakpoint();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('partners').select('*').eq('published', true).order('sort_order', { ascending: true })
      .then(({ data }) => { setPartners(data || []); setLoading(false); });
  }, []);

  const gridCols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)";

  return (
    <PageShell>
      <Section padding="140px 48px 60px">
        <div style={{ textAlign: "center" }}>
          <Eyebrow>PARTNERZY</Eyebrow>
          <Heading size="xl">Firmy wspierające klub</Heading>
          <div style={{ marginTop: 16 }}>
            <Body center>Grono marek i przedsiębiorstw, które wspierają misję Ambassador Club i program Best of Poland</Body>
          </div>
        </div>
      </Section>

      <Section bg={T.bgAlt} padding="60px 48px 120px">
        <Container maxWidth={1100}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0", fontFamily: T.serif, fontSize: 18, color: T.gold, fontStyle: "italic" }}>Ładowanie...</div>
          ) : partners.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", fontFamily: T.sans, fontSize: 14, color: T.dim }}>Wkrótce ogłosimy naszych partnerów.</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: isMobile ? 16 : 24 }}>
              {partners.map((p, i) => (
                <FadeIn key={p.id} delay={i * 60}>
                  <PartnerCard {...p} />
                </FadeIn>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </PageShell>
  );
}
