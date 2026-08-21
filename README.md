# Rotaris website

Marketing and download site for **Rotaris** — the desktop control plane for
running and supervising a team of specialized coding agents.

Built with React + Vite + TypeScript, styled with the Rotaris *Nocturne* design
system, served by nginx, and deployed to Portainer behind Traefik.

---

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script              | Does                                              |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Vite dev server with hot reload                   |
| `npm run build`     | Typecheck, then emit the production bundle to `dist/` |
| `npm run preview`   | Serve `dist/` locally                             |
| `npm run typecheck` | Typecheck only                                    |

## Project layout

```
src/
  components/       one file per homepage section, in page order
  pages/            Home, Imprint, Privacy, Terms, NotFound
  data/release.ts   the single source of release metadata (version, artifacts, sizes)
  data/routes.ts    route paths and the homepage anchors
  hooks/            platform detection, channel state, reduced-motion
  styles/
    tokens/         colors · typography · spacing · effects  (design-system tokens)
    base.css        element defaults
    components.css  design-system primitives (.btn, .card, .tag, .table, .seg…)
    motif.css       the grid and axis-mark brand motifs
    site.css        page composition + responsive rules
```

`src/styles/tokens/`, `base.css`, `components.css` and `motif.css` are carried
over verbatim from the Rotaris design system. Treat them as vendored: change
the design system first, then re-sync. Page-level styling belongs in
`site.css`.

### Updating the release

Version numbers, artifact sizes, minimum OS versions and the "coming soon"
state of each platform all live in [`src/data/release.ts`](src/data/release.ts).
That is the only file a release bump should touch.

### Pages and legal placeholders

| Route      | Page                                       | German aliases                              |
| ---------- | ------------------------------------------ | ------------------------------------------- |
| `/`        | the homepage                               | —                                           |
| `/imprint` | Impressum — § 5 DDG, § 18 Abs. 2 MStV      | `/impressum`                                |
| `/privacy` | Datenschutzerklärung — Art. 13, 14 GDPR    | `/datenschutz`, `/datenschutzerklaerung`    |
| `/terms`   | AGB — §§ 305 ff. BGB                       | `/agb`                                      |

The three legal pages **ship as scaffolding, not as legal text**. Each carries a
visible "Draft — not yet legally binding" banner and lists the headings the
document has to cover with a note on what belongs in each, so filling them in is
mechanical. Replace the placeholders — and delete the banner in
`src/components/LegalPage.tsx` — with text reviewed by qualified counsel before
the site goes public. Nothing here is legal advice.

The privacy page also carries a factual summary of what this build actually
does (no cookies, no analytics, no third-party requests, self-hosted fonts),
which is useful raw material for the finished text. Re-check it whenever the
site changes.

### Crawlers

`robots.txt` and `sitemap.xml` are generated at build time by a small plugin in
`vite.config.ts`, from the same `SITE_URL` that stamps the canonical and Open
Graph tags. `robots.txt` allows every user agent the whole site — the content is
public marketing material with no account wall, so search, archival and AI
crawlers are all welcome.

Unknown paths return a real **HTTP 404** carrying the designed 404 page, rather
than a soft 404. That means nginx has to know the client-side routes: the list
lives in both `nginx.conf` and `src/data/routes.ts`, and the CI smoke test
checks they agree.

---

## Container image

```bash
docker build -t rotaris-website:local .
docker run --rm -p 8080:8080 rotaris-website:local
# → http://localhost:8080   (health probe at /healthz)
```

The runtime stage is `nginxinc/nginx-unprivileged`: it listens on **8080** and
runs as uid 101, so the container needs no root and runs with a read-only root
filesystem in production.

---

## Deployment

```
push to main → GitHub Actions builds the image → pushes to GHCR
             → POSTs the Portainer stack webhook → Portainer re-pulls and redeploys
```

### 1. Create the stack in Portainer

**Stacks → Add stack → Repository**

| Field                | Value                                                     |
| -------------------- | --------------------------------------------------------- |
| Repository URL       | `https://github.com/Concrete-Dynamics/Rotaris-website`     |
| Reference            | `refs/heads/main`                                          |
| Compose path         | `docker-compose.yml`                                       |
| Environment variables| *Load variables from .env file* → `.stack.env`             |
| Automatic updates    | **Webhook** — enable it and copy the generated URL         |

The Traefik network named in `.stack.env` (`traefik_net`) must already exist on
the host — it is the same external network the other stacks join.

### 2. Add the repository secret

**Settings → Secrets and variables → Actions → New repository secret**

| Name                    | Value                                                         |
| ----------------------- | ------------------------------------------------------------- |
| `PORTAINER_WEBHOOK_URL` | the stack webhook URL from step 1 — e.g. `https://portainer.example.com/api/stacks/webhooks/<uuid>` |

The URL is a secret: anyone holding it can trigger a redeploy.

Publishing to GHCR uses the built-in `GITHUB_TOKEN` — no extra registry
credentials are needed. The first push creates the package as private; make it
public, or add a pull secret in Portainer, so the Docker host can pull it.

### 3. Configure Traefik

The network, entrypoint and certresolver names match the Traefik instance
already serving another stack, so they should work as-is:

| Variable               | Value                              | Note                                          |
| ---------------------- | ---------------------------------- | --------------------------------------------- |
| `TRAEFIK_NETWORK`      | `traefik_net`                      | external network Traefik watches               |
| `TRAEFIK_ENTRYPOINT`   | `https`                            | Traefik already redirects plain HTTP, so this stack defines no HTTP router |
| `TRAEFIK_CERTRESOLVER` | `simpleresolver`                   | ACME resolver                                  |
| `TRAEFIK_ROUTER`       | `rotaris-website`                  | router/service/middleware name prefix          |
| `TRAEFIK_RULE`         | **`Host(\`rotaris.example.com\`)`** | ← the one placeholder left                     |

Set `TRAEFIK_RULE` to the real hostname before deploying. Add a `www` variant
the same way another stack does:

```
TRAEFIK_RULE=Host(`rotaris.dev`) || Host(`www.rotaris.dev`)
```

Every one of these also has a default in `docker-compose.yml`, so the stack
still comes up if Portainer is not pointed at `.stack.env` — the env file
overrides, it is not a prerequisite.

### 4. Set the public URL

Add a repository **variable** `SITE_URL` (e.g. `https://rotaris.dev`). It is
passed into the Docker build and stamps the canonical URL, the Open Graph tags,
`robots.txt` and the sitemap. It also switches on the post-deploy verification
job, which polls the live site and fails the run if it does not come back up.

Keep `SITE_URL` and `TRAEFIK_RULE` in step — they describe the same hostname.

### Rollback

Every build is also tagged `sha-<short-sha>`. To roll back, set `IMAGE_TAG` to
that tag in the Portainer stack's environment and redeploy; revert it to `main`
to resume automatic deploys.

---

## Workflows

| Workflow                          | Trigger                          | Does                                                    |
| --------------------------------- | -------------------------------- | ------------------------------------------------------- |
| `.github/workflows/ci.yml`        | pull requests, non-main branches | typecheck, build, and build the image without pushing   |
| `.github/workflows/deploy.yml`    | push to `main`, manual dispatch  | build + push to GHCR, then trigger the Portainer webhook |

---

## License

MIT — see [LICENSE](LICENSE).
