import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * The public origin. One value feeds the canonical/Open Graph URLs, robots.txt
 * and the sitemap, so there is a single thing to change when the real hostname
 * lands — keep it in step with TRAEFIK_RULE in .stack.env.
 */
const SITE_URL = (process.env.SITE_URL || 'https://rotaris.ai').replace(/\/+$/, '')

/**
 * Locales and their URL prefix. Keep in step with src/i18n/config.ts — the
 * default locale has no prefix, so English stays at the root.
 */
const LOCALES = [
  { code: 'en', prefix: '' },
  { code: 'de', prefix: '/de' },
]

/** Routes worth listing for crawlers, in descending priority. */
const ROUTES: { path: string; priority: string; changefreq: string }[] = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/imprint', priority: '0.3', changefreq: 'yearly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
  { path: '/eula', priority: '0.3', changefreq: 'yearly' },
  { path: '/withdrawal', priority: '0.3', changefreq: 'yearly' },
  { path: '/acceptable-use', priority: '0.3', changefreq: 'yearly' },
]

/** A canonical path addressed in one locale. */
function localized(path: string, prefix: string): string {
  if (!prefix) return path
  return path === '/' ? prefix : `${prefix}${path}`
}

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

  // Every locale gets its own <url>, and each one lists all of them as
  // alternates, so the two language versions are read as one page rather than
  // as duplicates. x-default points at the unprefixed English path.
  const urls = ROUTES.flatMap((route) =>
    LOCALES.map((locale) =>
      [
        '  <url>',
        `    <loc>${SITE_URL}${localized(route.path, locale.prefix)}</loc>`,
        ...LOCALES.map(
          (alternate) =>
            `    <xhtml:link rel="alternate" hreflang="${alternate.code}"` +
            ` href="${SITE_URL}${localized(route.path, alternate.prefix)}" />`,
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${route.path}" />`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${route.changefreq}</changefreq>`,
        `    <priority>${route.priority}</priority>`,
        '  </url>',
      ].join('\n'),
    ),
  ).join('\n')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
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
  // usePageMeta stamps the canonical and hreflang tags per route, and needs the
  // same origin the build stamps into index.html and the sitemap.
  define: {
    'import.meta.env.VITE_SITE_URL': JSON.stringify(SITE_URL),
  },
  build: {
    // The site is one page; a single chunk beats waterfalled requests here.
    assetsInlineLimit: 2048,
  },
  server: {
    host: true,
    port: 5173,
  },
})
