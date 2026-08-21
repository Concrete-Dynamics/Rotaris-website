#!/usr/bin/env sh
# Generate a Traefik basic-auth entry for BASIC_AUTH_USERS.
#
#   ./scripts/basic-auth.sh admin 'your-password'
#
# Prints the value twice: verbatim for Portainer's environment-variable UI, and
# with every `$` doubled for the rare case you put it in .stack.env instead.
# Getting that escaping wrong truncates the hash and locks everyone out, so the
# script does it for you.

set -eu

usage() {
  echo "usage: $0 <username> <password>" >&2
  exit 2
}

[ $# -eq 2 ] || usage
user=$1
pass=$2

# bcrypt, via whichever of these the machine has.
if command -v htpasswd > /dev/null 2>&1; then
  entry=$(htpasswd -nbB "$user" "$pass")
elif command -v docker > /dev/null 2>&1; then
  entry=$(docker run --rm httpd:alpine htpasswd -nbB "$user" "$pass")
else
  echo "error: need either htpasswd or docker on PATH" >&2
  exit 1
fi

entry=$(printf '%s' "$entry" | tr -d '\r\n')
escaped=$(printf '%s' "$entry" | sed 's/\$/$$/g')

cat <<OUT

Portainer → stack → Environment variables   (recommended — keeps it out of git)

  Name   BASIC_AUTH_USERS
  Value  $entry

.stack.env, if you must — note the doubled \$

  BASIC_AUTH_USERS=$escaped

Then set BASIC_AUTH=true and redeploy. Check what actually reached Traefik with:

  docker inspect rotaris-website --format '{{ index .Config.Labels "traefik.http.middlewares.rotaris-website-auth-true.basicauth.users" }}'

It must match the Value line above exactly. A short or empty result means the
hash was truncated, and Traefik will reject every password.

OUT
