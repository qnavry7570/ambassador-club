# Ambassador Club · Best of Poland

> Where Poland's Finest Meet — ekskluzywny klub networkingowy

## 🚀 Szybki start

```bash
# 1. Zainstaluj zależności
npm install

# 2. Uruchom lokalnie
npm run dev

# 3. Otwórz http://localhost:3000
```

## 📦 Deploy na Vercel (rekomendowane)

1. Wrzuć repo na GitHub: `git push origin main`
2. Wejdź na [vercel.com](https://vercel.com) → "New Project"
3. Połącz z repo GitHub → Deploy
4. Gotowe — strona działa pod `your-project.vercel.app`

Lub z CLI:
```bash
npx vercel
```

## 📁 Struktura projektu

```
ambassador-club/
├── public/images/          ← grafiki klubowe (WebP)
├── src/
│   ├── app/
│   │   ├── globals.css     ← style globalne + fonty
│   │   ├── layout.js       ← root layout + meta SEO
│   │   └── page.js         ← strona główna (landing)
│   ├── components/         ← (do rozbudowy)
│   └── lib/
│       └── tokens.js       ← design tokens (kolory, fonty)
├── next.config.js          ← konfiguracja Next.js
├── package.json
└── README.md
```

## 🎨 Design tokens

| Token       | Wartość   | Użycie                    |
|-------------|-----------|---------------------------|
| Gold        | #C9A961   | Akcenty, CTA, eyebrows    |
| Ivory       | #F5F1E8   | Tekst główny              |
| BG Deep     | #0A0A0A   | Tło główne                |
| Burgundy    | #5C1A1B   | Akcent dodatkowy           |

**Fonty:** Cormorant Garamond (nagłówki) + Lato (body)

## 📋 Status budowy

- [x] Strona główna z grafikami
- [ ] Podstrony publiczne (O Klubie, Filary, Wydarzenia, Członkostwo, Journal, Kontakt)
- [ ] System auth (login, magic link, 2FA, zaproszenia)
- [ ] Strefa członkowska (dashboard, RSVP, galeria, concierge)
- [ ] Wersja mobilna (responsive)
- [ ] Wersja EN

## 📝 Licencja

Projekt prywatny — Ambassador Club © 2026
