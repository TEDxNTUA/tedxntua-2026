export const dynamic = 'force-static';

export default function sitemap() {
  const baseUrl = 'https://2026.tedxntua.com';

  const routes = [
    '',
    '/event/program',
    '/event/speakers',
    '/event/performances',
    '/event/professionalWorkshops',
    '/event/experienceWorkshops',
    '/event/sideHappenings',
    '/sponsors',
    '/team',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...routes];
}
