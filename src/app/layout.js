import './globals.css';

export const metadata = {
  title: 'Ambassador Club · Best of Poland',
  description: 'Ekskluzywny klub networkingowy łączący liderów biznesu, sportu, sztuki i filantropii. Where Poland\'s Finest Meet.',
  keywords: 'ambassador club, best of poland, networking, luxury, exclusive club, warsaw',
  openGraph: {
    title: 'Ambassador Club · Best of Poland',
    description: 'Where Poland\'s Finest Meet — ekskluzywny klub dla liderów biznesu, sportu, sztuki i filantropii.',
    url: 'https://ambassadorclub.pl',
    siteName: 'Ambassador Club',
    locale: 'pl_PL',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
