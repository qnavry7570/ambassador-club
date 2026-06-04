export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/members', '/login'],
      },
    ],
    sitemap: 'https://ambassador-club.vercel.app/sitemap.xml',
  };
}
