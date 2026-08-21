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
  data/release.ts   the single source of release metadata (version, artifacts, sizes)
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

The Traefik network named in `.stack.env` (`traefik-proxy` by default) must
already exist on the host and be the network the Traefik container watches.

### 2. Add the repository secret

**Settings → Secrets and variables → Actions → New repository secret**

| Name                    | Value                                                         |
| ----------------------- | ------------------------------------------------------------- |
| `PORTAINER_WEBHOOK_URL` | the stack webhook URL from step 1 — e.g. `https://portainer.example.com/api/stacks/webhooks/<uuid>` |

The URL is a secret: anyone holding it can trigger a redeploy.

Optionally add a repository **variable** `PUBLIC_URL` (e.g.
`https://rotaris.example.com`) and the deploy workflow will poll the live site
after the redeploy and fail if it does not come back up.

Publishing to GHCR uses the built-in `GITHUB_TOKEN` — no extra registry
credentials are needed. The first push creates the package as private; make it
public, or add a pull secret in Portainer, so the Docker host can pull it.

### 3. Configure Traefik

`.stack.env` ships with **placeholder** Traefik values. Before the first
production deploy, set at least:

| Variable                  | Placeholder             | What it should become                         |
| ------------------------- | ----------------------- | --------------------------------------------- |
| `TRAEFIK_HOST`            | `rotaris.example.com`   | the real public hostname                       |
| `TRAEFIK_NETWORK`         | `traefik-proxy`         | the Docker network Traefik watches             |
| `TRAEFIK_ENTRYPOINT`      | `websecure`             | the HTTPS entrypoint name in Traefik's static config |
| `TRAEFIK_ENTRYPOINT_HTTP` | `web`                   | the HTTP entrypoint name                       |
| `TRAEFIK_CERTRESOLVER`    | `letsencrypt`           | the ACME resolver name                         |
| `TRAEFIK_HSTS_SECONDS`    | `0`                     | `63072000` once the real hostname is live      |

`TRAEFIK_HSTS_SECONDS` starts at `0` on purpose — enabling HSTS against a
placeholder hostname would pin a domain you do not control yet.

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
