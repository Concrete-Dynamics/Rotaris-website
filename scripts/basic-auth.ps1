<#
.SYNOPSIS
    Generate a Traefik basic-auth entry for BASIC_AUTH_USERS.

.DESCRIPTION
    Prints the value twice: verbatim for Portainer's environment-variable UI,
    and with every `$` doubled for the rare case you put it in .stack.env
    instead. Getting that escaping wrong truncates the hash and locks everyone
    out, so the script does it for you.

.EXAMPLE
    ./scripts/basic-auth.ps1 admin 'your-password'
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true, Position = 0)][string]$Username,
    [Parameter(Mandatory = $true, Position = 1)][string]$Password
)

$ErrorActionPreference = 'Stop'

# bcrypt, via whichever of these the machine has.
if (Get-Command htpasswd -ErrorAction SilentlyContinue) {
    $entry = & htpasswd -nbB $Username $Password
}
elseif (Get-Command docker -ErrorAction SilentlyContinue) {
    $entry = & docker run --rm httpd:alpine htpasswd -nbB $Username $Password
}
else {
    throw 'Need either htpasswd or docker on PATH.'
}

$entry = ($entry | Out-String).Trim()
$escaped = $entry -replace '\$', '$$$$'

$label = 'traefik.http.middlewares.rotaris-website-auth-true.basicauth.users'

@"

Portainer -> stack -> Environment variables   (recommended - keeps it out of git)

  Name   BASIC_AUTH_USERS
  Value  $entry

.stack.env, if you must - note the doubled `$

  BASIC_AUTH_USERS=$escaped

Then set BASIC_AUTH=true and redeploy. Check what actually reached Traefik with:

  docker inspect rotaris-website --format '{{ index .Config.Labels "$label" }}'

It must match the Value line above exactly. A short or empty result means the
hash was truncated, and Traefik will reject every password.

"@
