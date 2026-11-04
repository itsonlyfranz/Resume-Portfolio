import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

const ROUTES = ['', '/projects', '/experience', '/stack', '/certifications']

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
