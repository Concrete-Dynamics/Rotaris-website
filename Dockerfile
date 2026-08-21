# syntax=docker/dockerfile:1

# ── build ────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app

# Dependencies first so the layer survives source-only changes.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── serve ────────────────────────────────────────────────────────────────────
# Unprivileged nginx: runs as uid 101, listens on 8080, no root in the container.
FROM nginxinc/nginx-unprivileged:1.27-alpine AS runtime

COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx nginx-security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build --chown=nginx:nginx /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:8080/healthz || exit 1
