import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yourdomain.com'
  
  const routes = [
    '',
    '/about',
    '/services',
    '/projects',
    '/contact',
    '/about/team',
    '/about/mission',
    '/about/vision',
    '/services/web',
    '/services/mobile',
    '/services/design',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
