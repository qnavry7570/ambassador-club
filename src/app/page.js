'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { T, GoldBtn, GhostBtn, Divider, PillarCard, EventCard, FeatureBox } from '@/components/ui';
import { useBreakpoint } from '@/lib/useBreakpoint';

function Hero() {
  const { isMobile, isTablet } = useBreakpoint();
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <img src="/images/hero-palace.webp" alt="Pałac Ambassador Club" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(10,10,10,0.7) 0%,rgba(10,10,10,0.3) 40%,rgba(10,10,10,0.8) 100%)" }} />
      <div style={{ position: "relative", zIndex: 2, padding: isMobile ? "0 24px" : isTablet ? "0 48px" : "0 80px", maxWidth: 800 }}>
        <div style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 400, letterSpacing: "0.4em", color: T.gold, marginBottom: isMobile ? 20 : 32 }}>EST. 2024 · WARSAW</div>
        <h1 style={{ fontFamily: T.serif, fontSize: isMobile ? 42 : isTablet ? 56 : 72, fontWeight: 300, color: T.ivory, lineHeight: 1.05, margin: 0 }}>
          Where Poland{"'"}s<br />Finest Meet
        </h1>
        <div style={{ margin: isMobile ? "20px 0" : "32px 0", width: 60, height: 1, background: T.gold }} />
        <p style={{ fontFamily: T.sans, fontSize: isMobile ? 15 : 17, fontWeight: 300, color: T.ivoryDim, lineHeight: 1.7, maxWidth: 520 }}>
          Ekskluzywny klub networkingowy łączący liderów biznesu, sportu, sztuki i filantropii w jedną społeczność najwybitniejszych.
        </p>
        <div style={{ display: "flex", gap: 16, marginTop: isMobile ? 32 : 48, flexWrap: "wrap" }}>
          <GoldBtn large href="/membership">Aplikuj o członkostwo</GoldBtn>
          <GhostBtn large href="/about">Odkryj więcej</GhostBtn>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div style={{ width: 1, height: 48, background: `linear-gradient(180deg,transparent,${T.gold})` }} />
        <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 4L6 8L10 4" stroke={T.gold} strokeWidth="1" fill="none" /></svg>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { isMobile, isTablet } = useBreakpoint();
  const sectionPad = isMobile ? "80px 20px" : isTablet ? "100px 32px" : "120px 48px";

  return (
    <main>
      <Navbar />
      <Hero />

      {/* Pillars */}
      <section style={{ background: T.bg, padding: sectionPad }}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.3em", color: T.gold, textTransform: "uppercase", marginBottom: 16 }}>NASZE FILARY</div>
          <h2 style={{ fontFamily: T.serif, fontSize: isMobile ? 28 : 42, fontWeight: 300, color: T.ivory }}>Cztery wymiary doskonałości</h2>
        </div>
        <div style={{ marginBottom: isMobile ? 40 : 64 }}><Divider /></div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 16 : 24, maxWidth: 1200, margin: "0 auto" }}>
          <PillarCard title="Sport" tag="SPORT" desc="Wyścigi konne, polo, golf, jachting — sport gentlemanów." img="/images/equestrian.webp" href="/sport" />
          <PillarCard title="Sztuka i Kultura" tag="KULTURA" desc="Mecenat, kolekcjonerstwo, wernisaże, opera." img="/images/vernissage.webp" href="/culture" />
          <PillarCard title="Filantropia" tag="FILANTROPIA" desc="Aukcje charytatywne i wspólne inicjatywy." img="/images/charity-gala.webp" href="/philanthropy" />
          <PillarCard title="Best of Poland" tag="BEST OF POLAND" desc="Polskie marki premium, rzemiosło, talenty." img="/images/amber-jewelry.webp" href="/bestofpoland" />
        </div>
      </section>

      {/* About */}
      <section style={{ background: T.bgAlt, padding: sectionPad }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, maxWidth: 1200, margin: "0 auto", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.3em", color: T.gold, textTransform: "uppercase", marginBottom: 16 }}>O AMBASSADOR CLUB</div>
            <h2 style={{ fontFamily: T.serif, fontSize: isMobile ? 28 : 42, fontWeight: 300, color: T.ivory, lineHeight: 1.15 }}>Tradycja spotyka przyszłość</h2>
            <div style={{ margin: "24px 0", width: 60, height: 1, background: T.gold }} />
            <p style={{ fontFamily: T.sans, fontSize: 16, fontWeight: 300, color: T.muted, lineHeight: 1.8, marginBottom: 20 }}>
              Ambassador Club to inicjatywa zrodzona z przekonania, że prawdziwy sukces mierzy się nie tylko osiągnięciami, ale również tym, jak inspirujemy innych.
            </p>
            <p style={{ fontFamily: T.serif, fontSize: 18, fontStyle: "italic", color: T.ivoryDim, lineHeight: 1.7 }}>
              Nasze wydarzenia odbywają się w najpiękniejszych pałacach i rezydencjach Polski.
            </p>
            <div style={{ display: "flex", gap: isMobile ? 24 : 48, marginTop: isMobile ? 32 : 48, flexWrap: "wrap" }}>
              {[{ v: "150+", l: "Członków" }, { v: "48", l: "Wydarzeń rocznie" }, { v: "12", l: "Miast w Polsce" }].map((s, i) => (
                <div key={i}>
                  <div style={{ fontFamily: T.serif, fontSize: isMobile ? 28 : 36, fontWeight: 300, color: T.gold }}>{s.v}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.15em", color: T.muted, textTransform: "uppercase" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          {!isMobile && (
            <div style={{ borderLeft: "1px solid rgba(201,169,97,0.15)" }}>
              <img src="/images/ballroom.webp" alt="Sala balowa Ambassador Club" style={{ width: "100%", height: 500, objectFit: "cover" }} loading="lazy" />
            </div>
          )}
          {isMobile && (
            <img src="/images/ballroom.webp" alt="Sala balowa Ambassador Club" style={{ width: "100%", height: 260, objectFit: "cover" }} loading="lazy" />
          )}
        </div>
      </section>

      {/* Golden Divider */}
      <section style={{ background: T.bg, padding: "40px 0", textAlign: "center" }}>
        <img src="/images/golden-divider.webp" alt="" style={{ width: "100%", maxWidth: 600, margin: "0 auto", opacity: 0.7 }} loading="lazy" />
      </section>

      {/* ── EVENTS — tło video szampan ── */}
      <section style={{ position: "relative", padding: sectionPad, overflow: "hidden" }}>
        {/* Video background */}
        <video
          autoPlay muted loop playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          poster="/images/fine-dining.webp"
        >
          <source src="/videos/szampan.mp4" type="video/mp4" />
        </video>
        {/* Ciemny overlay — tekst musi być czytelny */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(8,8,8,0.82)" }} />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.3em", color: T.gold, textTransform: "uppercase", marginBottom: 16 }}>WYDARZENIA</div>
            <h2 style={{ fontFamily: T.serif, fontSize: isMobile ? 28 : 42, fontWeight: 300, color: T.ivory }}>Nadchodzące spotkania</h2>
            <p style={{ fontFamily: T.sans, fontSize: 16, fontWeight: 300, color: T.muted, marginTop: 12 }}>Szczegóły dostępne wyłącznie dla członków</p>
          </div>
          <div style={{ marginBottom: isMobile ? 40 : 64 }}><Divider /></div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)", gap: isMobile ? 16 : 32, maxWidth: 1000, margin: "0 auto" }}>
            <EventCard title="Wieczór Kolekcjonerski" date="15 marca 2026" location="Pałac Zamoyskich, Warszawa" tag="Sztuka" />
            <EventCard title="Wielka Gala Charytatywna" date="28 marca 2026" location="Sala Balowa, Łazienki" tag="Filantropia" />
            <EventCard title="Dzień Polo & Champagne" date="12 kwietnia 2026" location="Polo Club Wrocław" tag="Sport" />
          </div>
        </div>
      </section>

      {/* Membership */}
      <section style={{ background: T.bgAlt, padding: sectionPad }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, maxWidth: 1200, margin: "0 auto", alignItems: "center" }}>
          {!isMobile && (
            <div style={{ borderRight: "1px solid rgba(201,169,97,0.15)" }}>
              <img src="/images/fine-dining.webp" alt="Fine dining" style={{ width: "100%", height: 560, objectFit: "cover" }} loading="lazy" />
            </div>
          )}
          <div>
            <div style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.3em", color: T.gold, textTransform: "uppercase", marginBottom: 16 }}>CZŁONKOSTWO</div>
            <h2 style={{ fontFamily: T.serif, fontSize: isMobile ? 28 : 42, fontWeight: 300, color: T.ivory, lineHeight: 1.15 }}>Zaproszenie do wyjątkowego grona</h2>
            <div style={{ margin: "24px 0", width: 60, height: 1, background: T.gold }} />
            <p style={{ fontFamily: T.sans, fontSize: 16, fontWeight: 300, color: T.muted, lineHeight: 1.8, marginBottom: 36 }}>
              Członkostwo dostępne wyłącznie na zaproszenie lub po rozpatrzeniu aplikacji przez Radę Klubu.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {["Dostęp do wszystkich wydarzeń", "Prywatna strefa członkowska", "Concierge premium — VIP", "Networking z 150+ liderami", "Eleganckie zaproszenia i RSVP", "Galeria prywatna z wydarzeń"].map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 6, height: 6, background: T.gold, transform: "rotate(45deg)", flexShrink: 0 }} />
                  <span style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 300, color: T.ivoryDim }}>{b}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 48 }}><GoldBtn large href="/membership">Złóż aplikację</GoldBtn></div>
          </div>
          {isMobile && (
            <img src="/images/fine-dining.webp" alt="Fine dining" style={{ width: "100%", height: 260, objectFit: "cover" }} loading="lazy" />
          )}
        </div>
      </section>

      {/* ── STREFA PRYWATNA — tło video złote światło ── */}
      <section style={{ position: "relative", padding: sectionPad, overflow: "hidden" }}>
        <video
          autoPlay muted loop playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src="/videos/swiatlo-zlote.mp4" type="video/mp4" />
        </video>
        {/* Overlay — złote cząsteczki widoczne, ale nie przytłaczają */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.72)" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.3em", color: T.gold, textTransform: "uppercase", marginBottom: 16 }}>STREFA PRYWATNA</div>
          <h2 style={{ fontFamily: T.serif, fontSize: isMobile ? 28 : 42, fontWeight: 300, color: T.ivory }}>Twój świat za zamkniętymi drzwiami</h2>
          <p style={{ fontFamily: T.sans, fontSize: 16, fontWeight: 300, color: T.muted, marginTop: 16, maxWidth: 600, margin: "16px auto 0" }}>
            Dashboard, kalendarz, galeria, katalog członków, concierge — w jednym panelu.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 12 : 24, marginTop: isMobile ? 40 : 64 }}>
            <FeatureBox icon="◈" title="Dashboard osobisty" desc="Powitanie, skróty, powiadomienia" />
            <FeatureBox icon="◆" title="Kalendarz & RSVP" desc="Pełne szczegóły, potwierdzenia" />
            <FeatureBox icon="◇" title="Galeria prywatna" desc="Zdjęcia i wideo z wydarzeń" />
            <FeatureBox icon="✧" title="Concierge VIP" desc="Rezerwacje i dostępy premium" />
          </div>
          <div style={{ marginTop: 48 }}><GhostBtn large href="/login">Zaloguj się</GhostBtn></div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ position: "relative", padding: isMobile ? "100px 24px" : "160px 48px", textAlign: "center", overflow: "hidden" }}>
        <img src="/images/hero-lazienki.webp" alt="Łazienki Królewskie" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center,rgba(10,10,10,0.6) 0%,rgba(10,10,10,0.88) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <Divider />
          <h2 style={{ fontFamily: T.serif, fontSize: isMobile ? 32 : 52, fontWeight: 300, color: T.ivory, marginTop: 48 }}>Dołącz do grona najwybitniejszych</h2>
          <div style={{ fontFamily: T.serif, fontSize: 18, fontStyle: "italic", color: T.muted, marginTop: 16 }}>Membership by invitation only</div>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
            <GoldBtn large href="/membership">Aplikuj o członkostwo</GoldBtn>
            <GhostBtn large href="/contact">Zapytaj prywatnie</GhostBtn>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
