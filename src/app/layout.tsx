import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ambassador Club · Best of Poland",
  description: "Ekskluzywny klub networkingowy łączący liderów biznesu, sportu, sztuki i filantropii. Where Poland's Finest Meet.",
  openGraph: {
    title: "Ambassador Club · Best of Poland",
    description: "Where Poland's Finest Meet — ekskluzywny klub dla elit biznesu, kultury i sportu.",
    type: "website",
    locale: "pl_PL",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
