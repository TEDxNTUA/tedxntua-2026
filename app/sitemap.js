export default function sitemap() {
  const baseUrl = 'https://2026.tedxntua.com';

  const routes = [
    '',
    '/sponsors',
    '/team',
    '/event/speakers',
    '/event/performances',
    '/event/professionalWorkshops',
    '/event/experienceWorkshops',
    '/event/sideHappenings',
    '/event/program'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}
