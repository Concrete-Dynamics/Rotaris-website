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
  releasedOn: string
}

export const REPO_URL = 'https://github.com/theUpsider/geraet-ai'
export const RELEASES_URL = `${REPO_URL}/releases`
export const LATEST_RELEASE_URL = `${REPO_URL}/releases/latest`

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
  stable: { version: '0.5.0', releasedOn: 'July 8, 2026' },
  preview: { version: '0.6.0-beta.2', releasedOn: 'July 19, 2026' },
}

export const DEFAULT_PLATFORM: PlatformId = 'windows-x64'
