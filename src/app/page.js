'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { T, GoldBtn, GhostBtn, Divider, PillarCard, EventCard, FeatureBox, FadeIn } from '@/components/ui';
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
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.3em", color: T.gold, textTransform: "uppercase", marginBottom: 16 }}>NASZE FILARY</div>
            <h2 style={{ fontFamily: T.serif, fontSize: isMobile ? 28 : 42, fontWeight: 300, color: T.ivory }}>Cztery wymiary doskonałości</h2>
          </div>
          <div style={{ marginBottom: isMobile ? 40 : 64 }}><Divider /></div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 16 : 24, maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn delay={0}><PillarCard title="Sport" tag="SPORT" desc="Wyścigi konne, polo, golf, jachting — sport gentlemanów." img="/images/equestrian.webp" href="/sport" /></FadeIn>
          <FadeIn delay={80}><PillarCard title="Sztuka i Kultura" tag="KULTURA" desc="Mecenat, kolekcjonerstwo, wernisaże, opera." img="/images/vernissage.webp" href="/culture" /></FadeIn>
          <FadeIn delay={160}><PillarCard title="Filantropia" tag="FILANTROPIA" desc="Aukcje charytatywne i wspólne inicjatywy." img="/images/charity-gala.webp" href="/philanthropy" /></FadeIn>
          <FadeIn delay={240}><PillarCard title="Best of Poland" tag="BEST OF POLAND" desc="Polskie marki premium, rzemiosło, talenty." img="/images/amber-jewelry.webp" href="/bestofpoland" /></FadeIn>
        </div>
      </section>

      {/* About */}
      <section style={{ background: T.bgAlt, padding: sectionPad }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, maxWidth: 1200, margin: "0 auto", alignItems: "center" }}>
          <FadeIn dir="left">
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
          </FadeIn>
          {!isMobile && (
            <div style={{ borderLeft: "1px solid rgba(201,169,97,0.15)", overflow: "hidden", background: T.bgAlt, height: 500, lineHeight: 0, fontSize: 0 }}>
              <img src="/images/ballroom.webp" alt="Sala balowa Ambassador Club" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} loading="lazy" />
            </div>
          )}
          {isMobile && (
            <img src="/images/ballroom.webp" alt="Sala balowa Ambassador Club" style={{ width: "100%", height: 260, objectFit: "cover" }} loading="lazy" />
          )}
        </div>
      </section>

      {/* Golden Divider */}
      <div style={{ background: T.bg, padding: "32px 0", lineHeight: 0, fontSize: 0 }}>
        <div style={{ maxWidth: 680, margin: "0 auto", overflow: "hidden", lineHeight: 0, fontSize: 0 }}>
          <img
            src="/images/golden-divider.webp"
            alt=""
            style={{ width: "100%", height: "auto", display: "block", opacity: 0.92 }}
            loading="lazy"
          />
        </div>
      </div>

      {/* ── EVENTS — tło video szampan ── */}
      <section style={{ position: "relative", padding: sectionPad, overflow: "hidden" }}>
        {/* Video background */}
        <video
          autoPlay muted loop playsInline preload="auto"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        >
          <source src="/videos/szampan.mp4" type="video/mp4" />
        </video>
        {/* Ciemny overlay — tekst musi być czytelny */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(8,8,8,0.82)" }} />

        <div style={{ position: "relative", zIndex: 2 }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.3em", color: T.gold, textTransform: "uppercase", marginBottom: 16 }}>WYDARZENIA</div>
              <h2 style={{ fontFamily: T.serif, fontSize: isMobile ? 28 : 42, fontWeight: 300, color: T.ivory }}>Nadchodzące spotkania</h2>
              <p style={{ fontFamily: T.sans, fontSize: 16, fontWeight: 300, color: T.muted, marginTop: 12 }}>Szczegóły dostępne wyłącznie dla członków</p>
            </div>
            <div style={{ marginBottom: isMobile ? 40 : 64 }}><Divider /></div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)", gap: isMobile ? 16 : 32, maxWidth: 1000, margin: "0 auto" }}>
            <FadeIn delay={0}><EventCard title="Wieczór Kolekcjonerski" date="15 marca 2026" location="Pałac Zamoyskich, Warszawa" tag="Sztuka" img="/images/vernissage.webp" /></FadeIn>
            <FadeIn delay={100}><EventCard title="Wielka Gala Charytatywna" date="28 marca 2026" location="Sala Balowa, Łazienki" tag="Filantropia" img="/images/charity-gala.webp" /></FadeIn>
            <FadeIn delay={200}><EventCard title="Dzień Polo & Champagne" date="12 kwietnia 2026" location="Polo Club Wrocław" tag="Sport" img="/images/equestrian.webp" /></FadeIn>
          </div>
        </div>
      </section>

      {/* Membership */}
      <section style={{ background: T.bgAlt, padding: sectionPad }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, maxWidth: 1200, margin: "0 auto", alignItems: "center" }}>
          {!isMobile && (
            <div style={{ borderRight: "1px solid rgba(201,169,97,0.15)", overflow: "hidden", background: T.bgAlt, height: 560, lineHeight: 0, fontSize: 0 }}>
              <img src="/images/fine-dining.webp" alt="Fine dining" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} loading="lazy" />
            </div>
          )}
          <FadeIn dir="right">
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
          </FadeIn>
          {isMobile && (
            <img src="/images/fine-dining.webp" alt="Fine dining" style={{ width: "100%", height: 260, objectFit: "cover" }} loading="lazy" />
          )}
        </div>
      </section>

      {/* ── AMBASSADOR CIGAR CLUB ── */}
      <section style={{ position: "relative", padding: sectionPad, overflow: "hidden" }}>
        {/* Tło — lounge z humidorem */}
        <img src="/images/cigar-lounge.webp" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(4,2,1,0.96) 0%, rgba(6,4,2,0.88) 50%, rgba(4,2,1,0.94) 100%)" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 48 : 80, alignItems: "start" }}>

            {/* Lewa — logo + opis */}
            <FadeIn dir="left">
              <div style={{ textAlign: isMobile ? "center" : "left" }}>
                <img
                  src="/images/logo-cigar-club.webp"
                  alt="Ambassador Cigar Club"
                  style={{ height: isMobile ? 120 : 150, width: "auto", margin: isMobile ? "0 auto 28px" : "0 0 28px", display: "block", filter: "drop-shadow(0 0 20px rgba(201,169,97,0.25))" }}
                  loading="lazy"
                />
                <div style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 400, letterSpacing: "0.35em", color: T.gold, textTransform: "uppercase", marginBottom: 16 }}>
                  Inicjatywa Ambassador Club
                </div>
                <h2 style={{ fontFamily: T.serif, fontSize: isMobile ? 28 : 42, fontWeight: 300, color: T.ivory, lineHeight: 1.15, margin: "0 0 20px" }}>
                  Ambassador<br />Cigar Club
                </h2>
                <div style={{ width: 60, height: 1, background: T.gold, margin: isMobile ? "0 auto 24px" : "0 0 24px" }} />
                <p style={{ fontFamily: T.sans, fontSize: isMobile ? 14 : 15, fontWeight: 300, color: T.muted, lineHeight: 1.85, marginBottom: 24 }}>
                  Ekskluzywne bractwo miłośników hawańskich cygar, skupiające gentlemanów ceniących tradycję, smak i kunszt rolowania. Wieczory w gronie wybranych — w najpiękniejszych wnętrzach Warszawy.
                </p>
                {/* Zdjęcie — zapalanie cygara */}
                {!isMobile && (
                  <div style={{ lineHeight: 0, fontSize: 0, overflow: "hidden", border: `1px solid ${T.goldBorder}` }}>
                    <img src="/images/cigar-lighting.webp" alt="Zapalanie cygara" style={{ width: "100%", height: 220, objectFit: "cover", objectPosition: "center 40%", display: "block" }} loading="lazy" />
                  </div>
                )}
                <p style={{ fontFamily: T.serif, fontSize: 16, fontStyle: "italic", color: T.ivoryDim, lineHeight: 1.7, marginTop: 24 }}>
                  "Dobry cygar jest kwintesencją luksusu — łączy ludzi, którzy rozumieją, że czas jest najcenniejszym dobrem."
                </p>
              </div>
            </FadeIn>

            {/* Prawa — przywileje */}
            <FadeIn dir="right" delay={100}>
              <div style={{ background: "rgba(12,8,4,0.7)", border: `1px solid ${T.goldBorder}`, backdropFilter: "blur(8px)" }}>
                <div style={{ lineHeight: 0, fontSize: 0, overflow: "hidden" }}>
                  <img src="/images/cigar-lounge.webp" alt="Cigar lounge" style={{ width: "100%", height: 200, objectFit: "cover", objectPosition: "center 20%", display: "block", opacity: 0.7 }} loading="lazy" />
                  <div style={{ background: `linear-gradient(180deg, transparent, rgba(12,8,4,0.95))`, height: 60, marginTop: -60, position: "relative", zIndex: 1 }} />
                </div>
                <div style={{ padding: isMobile ? "24px 20px 28px" : "28px 36px 36px" }}>
                  <div style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.25em", color: T.gold, textTransform: "uppercase", marginBottom: 28 }}>
                    ◆ Przywileje członków
                  </div>
                  {[
                    { icon: "◈", t: "Degustacje hawańskich cygar", d: "Kurator dobiera roczniki i regiony dla każdego spotkania" },
                    { icon: "◆", t: "Prywatne wieczory w pałacach", d: "Kominki, biblioteki, salony — atmosfera niepowtarzalna" },
                    { icon: "◇", t: "Sommelier tytoniowy", d: "Osobiste doradztwo przy wyborze i przechowywaniu" },
                    { icon: "✧", t: "Podróże do Hawany i La Romana", d: "Wizyty w manufakturach dla koneserów" },
                    { icon: "◈", t: "Własna humidor lounge w klubie", d: "Dedykowana przestrzeń z kolekcją limitowanych edycji" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 16, marginBottom: i < 4 ? 24 : 0, alignItems: "flex-start" }}>
                      <div style={{ width: 32, height: 32, border: `1px solid ${T.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", color: T.gold, fontSize: 13, flexShrink: 0, marginTop: 1 }}>{item.icon}</div>
                      <div>
                        <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, color: T.ivory, letterSpacing: "0.03em", marginBottom: 3 }}>{item.t}</div>
                        <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 300, color: T.dim, lineHeight: 1.5 }}>{item.d}</div>
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${T.border}`, textAlign: "center" }}>
                    <div style={{ fontFamily: T.serif, fontSize: 13, fontStyle: "italic", color: T.dim }}>
                      Dostępne wyłącznie dla członków Ambassador Club
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
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
          <FadeIn>
            <div style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.3em", color: T.gold, textTransform: "uppercase", marginBottom: 16 }}>STREFA PRYWATNA</div>
            <h2 style={{ fontFamily: T.serif, fontSize: isMobile ? 28 : 42, fontWeight: 300, color: T.ivory }}>Twój świat za zamkniętymi drzwiami</h2>
            <p style={{ fontFamily: T.sans, fontSize: 16, fontWeight: 300, color: T.muted, marginTop: 16, maxWidth: 600, margin: "16px auto 0" }}>
              Dashboard, kalendarz, galeria, katalog członków, concierge — w jednym panelu.
            </p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 12 : 24, marginTop: isMobile ? 40 : 64 }}>
            <FadeIn delay={0}><FeatureBox icon="◈" title="Dashboard osobisty" desc="Powitanie, skróty, powiadomienia" /></FadeIn>
            <FadeIn delay={80}><FeatureBox icon="◆" title="Kalendarz & RSVP" desc="Pełne szczegóły, potwierdzenia" /></FadeIn>
            <FadeIn delay={160}><FeatureBox icon="◇" title="Galeria prywatna" desc="Zdjęcia i wideo z wydarzeń" /></FadeIn>
            <FadeIn delay={240}><FeatureBox icon="✧" title="Concierge VIP" desc="Rezerwacje i dostępy premium" /></FadeIn>
          </div>
          <FadeIn delay={100} style={{ marginTop: 48 }}><GhostBtn large href="/login">Zaloguj się</GhostBtn></FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ position: "relative", padding: isMobile ? "100px 24px" : "160px 48px", textAlign: "center", overflow: "hidden" }}>
        <img src="/images/hero-lazienki.webp" alt="Łazienki Królewskie" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center,rgba(10,10,10,0.6) 0%,rgba(10,10,10,0.88) 100%)" }} />
        <FadeIn style={{ position: "relative", zIndex: 2 }}>
          <Divider />
          <h2 style={{ fontFamily: T.serif, fontSize: isMobile ? 32 : 52, fontWeight: 300, color: T.ivory, marginTop: 48 }}>Dołącz do grona najwybitniejszych</h2>
          <div style={{ fontFamily: T.serif, fontSize: 18, fontStyle: "italic", color: T.muted, marginTop: 16 }}>Membership by invitation only</div>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
            <GoldBtn large href="/membership">Aplikuj o członkostwo</GoldBtn>
            <GhostBtn large href="/contact">Zapytaj prywatnie</GhostBtn>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </main>
  );
}
