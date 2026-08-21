import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * The public origin. One value feeds the canonical/Open Graph URLs, robots.txt
 * and the sitemap, so there is a single thing to change when the real hostname
 * lands — keep it in step with TRAEFIK_RULE in .stack.env.
 */
const SITE_URL = (process.env.SITE_URL || 'https://rotaris.example.com').replace(/\/+$/, '')

/** Routes worth listing for crawlers, in descending priority. */
const ROUTES: { path: string; priority: string; changefreq: string }[] = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/imprint', priority: '0.3', changefreq: 'yearly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
]

function robotsTxt(): string {
  // Everything is public marketing content with no account wall (TR-02), so
  // every crawler — search, archival and AI — is allowed the whole site.
  return [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n')
}

function sitemapXml(): string {
  const lastmod = new Date().toISOString().slice(0, 10)
  const urls = ROUTES.map(
    (route) =>
      [
        '  <url>',
        `    <loc>${SITE_URL}${route.path}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${route.changefreq}</changefreq>`,
        `    <priority>${route.priority}</priority>`,
        '  </url>',
      ].join('\n'),
  ).join('\n')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n')
}

/** Emits the crawler files and substitutes %SITE_URL% in index.html. */
function siteMetadata(): Plugin {
  const files: Record<string, () => string> = {
    '/robots.txt': robotsTxt,
    '/sitemap.xml': sitemapXml,
  }

  return {
    name: 'rotaris-site-metadata',

    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replaceAll('%SITE_URL%', SITE_URL),
    },

    // Serve them in `vite dev` too, so the two modes agree.
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const build = req.url && files[req.url.split('?')[0]]
        if (!build) return next()
        res.setHeader('Content-Type', req.url!.endsWith('.xml') ? 'application/xml' : 'text/plain')
        res.end(build())
      })
    },

    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt() })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml() })
    },
  }
}

export default defineConfig({
  plugins: [react(), siteMetadata()],
  build: {
    // The site is one page; a single chunk beats waterfalled requests here.
    assetsInlineLimit: 2048,
  },
  server: {
    host: true,
    port: 5173,
  },
})
