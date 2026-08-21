/**
 * Single source of release metadata for the whole page (DL-06).
 *
 * Everything the download controls, the meta line and the trust KPIs render
 * comes from here, so a new release is a one-file change. When the release
 * pipeline exposes a machine-readable feed, replace these constants with a
 * fetch against it and keep the shapes below as the fallback (REL-05).
 */

export type PlatformId = 'windows-x64' | 'macos' | 'linux-x64'
export type Channel = 'stable' | 'preview'

export interface PlatformRelease {
  /** Button label — changes with the detected platform (H-03). */
  label: string
  /** Architecture and package format, always spelled out (DL-05). */
  sub: string
  icon: string
  size: string
  /** Minimum supported OS version. */
  minOs: string
  /** True while the platform has no tested, signed artifact (DL-08). */
  soon?: boolean
}

export interface ChannelRelease {
  version: string
  /** ISO date. Rendered in the page's language, so it is not written out here. */
  releasedOn: string
}

export const REPO_URL = 'https://github.com/theUpsider/Rotaris'
export const RELEASES_URL = `${REPO_URL}/releases`
export const LATEST_RELEASE_URL = `${REPO_URL}/releases/latest`
export const SECURITY_POLICY_URL = `${REPO_URL}/security/policy`

/**
 * Blob links resolve through `HEAD` rather than a branch name, so renaming the
 * default branch does not silently turn them into 404s.
 */
export const LICENSE_URL = `${REPO_URL}/blob/HEAD/LICENSE`
export const ARCHITECTURE_URL = `${REPO_URL}/blob/HEAD/docs/architecture.md`

/**
 * Headings in the repository README, which is the documentation until a docs
 * site exists. The fragments are GitHub's slugs for those headings — they break
 * if a heading is reworded, so check them when the README changes.
 */
export const README_ANCHORS = {
  quickStart: `${REPO_URL}#quick-start`,
  firstRun: `${REPO_URL}#1-register-a-provider`,
  providers: `${REPO_URL}#providers-auth-and-models`,
  permissions: `${REPO_URL}#permissions-and-security`,
} as const

export const PLATFORMS: Record<PlatformId, PlatformRelease> = {
  'windows-x64': {
    label: 'Download for Windows',
    sub: 'x64 · installer (.exe)',
    icon: 'ph ph-windows-logo',
    size: '86 MB',
    minOs: 'Windows 10 1809 or later',
  },
  macos: {
    label: 'macOS build coming soon',
    sub: 'Apple Silicon and Intel',
    icon: 'ph ph-apple-logo',
    size: 'not yet released',
    minOs: 'in development',
    soon: true,
  },
  'linux-x64': {
    label: 'Download for Linux',
    sub: 'x64 · AppImage · deb · rpm',
    icon: 'ph ph-linux-logo',
    size: '99 MB',
    minOs: 'glibc 2.31+',
  },
}

export const CHANNELS: Record<Channel, ChannelRelease> = {
  stable: { version: '0.5.0', releasedOn: '2026-07-08' },
  preview: { version: '0.6.0-beta.2', releasedOn: '2026-07-19' },
}

export const DEFAULT_PLATFORM: PlatformId = 'windows-x64'
