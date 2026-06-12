// Centralne przełączniki funkcji. Ukrywanie zamiast usuwania —
// właściciel może przywrócić sekcję jednym true/false.
export const FEATURES = {
  applications: false, // formularze "Aplikuj o członkostwo" / CTA zgłoszeniowe (klub zamknięty, tylko z zaproszenia)
  gallery: false,      // galerie zdjęć (publiczne + Members Area)
  partners: true,      // zakładka Partnerzy
  donations: false,    // dotacje członków na wydarzenia (Stripe) — włączyć po konfiguracji
};
