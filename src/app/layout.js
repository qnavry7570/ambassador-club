import './globals.css';
import { Analytics } from '@vercel/analytics/next';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  title: 'Ambassador Club · Best of Poland',
  description: 'Ekskluzywny klub networkingowy łączący liderów biznesu, sportu, sztuki i filantropii. Where Poland\'s Finest Meet.',
  keywords: 'ambassador club, best of poland, networking, luxury, exclusive club, warsaw, klub biznesowy',
  authors: [{ name: 'Ambassador Club' }],
  metadataBase: new URL('https://ambassador-club.vercel.app'),
  openGraph: {
    title: 'Ambassador Club · Best of Poland',
    description: 'Where Poland\'s Finest Meet — ekskluzywny klub dla liderów biznesu, sportu, sztuki i filantropii.',
    url: 'https://ambassador-club.vercel.app',
    siteName: 'Ambassador Club',
    locale: 'pl_PL',
    type: 'website',
    images: [
      {
        url: '/images/hero-lazienki.webp',
        width: 1920,
        height: 1080,
        alt: 'Ambassador Club — Where Poland\'s Finest Meet',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ambassador Club · Best of Poland',
    description: 'Where Poland\'s Finest Meet',
    images: ['/images/hero-lazienki.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>{children}<Analytics /></body>
    </html>
  );
}
