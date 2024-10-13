import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api', '/essay/write', '/roadmap', '/quickstart', '/admin'],
    },
    sitemap: 'https://www.wordshare.tech/sitemap.xml',
  }
}