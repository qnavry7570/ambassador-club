export default function sitemap() {
  const base = 'https://ambassador-club.vercel.app';
  const routes = [
    { url: base, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${base}/about`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${base}/events`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${base}/sport`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${base}/culture`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${base}/philanthropy`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${base}/bestofpoland`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${base}/journal`, priority: 0.7, changeFrequency: 'weekly' },
    { url: `${base}/contact`, priority: 0.6, changeFrequency: 'yearly' },
    { url: `${base}/privacy`, priority: 0.3, changeFrequency: 'yearly' },
  ];
  return routes.map(route => ({
    url: route.url,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
