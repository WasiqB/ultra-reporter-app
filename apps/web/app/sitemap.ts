import { MetadataRoute } from 'next';

const baseUrl = 'https://ultra-reporter.com';

const sitemap = (): MetadataRoute.Sitemap => {
  const routes = ['', '/pricing', '/features', '/faq'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
};

export default sitemap;
