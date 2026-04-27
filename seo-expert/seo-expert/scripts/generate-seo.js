const fs = require('fs');
const path = require('path');

const ROBOTS_PATH = path.join(process.cwd(), 'app/robots.js');
const SITEMAP_PATH = path.join(process.cwd(), 'app/sitemap.js');
const DOMAIN = 'https://2026.tedxntua.com';

const robotsContent = `export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: '${DOMAIN}/sitemap.xml',
  }
}`;

const sitemapContent = `export default function sitemap() {
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
    url: \`${DOMAIN}\${route}\`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}`;

if (!fs.existsSync(ROBOTS_PATH)) {
  fs.writeFileSync(ROBOTS_PATH, robotsContent);
  console.log('✅ Created app/robots.js');
} else {
  console.log('ℹ️ app/robots.js already exists.');
}

if (!fs.existsSync(SITEMAP_PATH)) {
  fs.writeFileSync(SITEMAP_PATH, sitemapContent);
  console.log('✅ Created app/sitemap.js');
} else {
  console.log('ℹ️ app/sitemap.js already exists.');
}
