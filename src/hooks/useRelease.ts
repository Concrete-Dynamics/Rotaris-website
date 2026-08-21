import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CHANNELS,
  PLATFORMS,
  type Channel,
  type ChannelRelease,
  type PlatformId,
  type PlatformRelease,
} from '../data/release'
import { useDetectedPlatform } from './useDetectedPlatform'

export interface ReleaseState {
  platform: PlatformId
  release: PlatformRelease
  channel: Channel
  channelInfo: ChannelRelease
  isPreview: boolean
  setChannel: (channel: Channel) => void
}

/** Resolves the detected platform and the selected channel into one release. */
export function useRelease(): ReleaseState {
  const platform = useDetectedPlatform()
  const [channel, setChannel] = useState<Channel>('stable')

  return useMemo(
    () => ({
      platform,
      release: PLATFORMS[platform],
      channel,
      channelInfo: CHANNELS[channel],
      isPreview: channel === 'preview',
      setChannel,
    }),
    [platform, channel],
  )
}

/**
 * The human-readable half of a platform release.
 *
 * Sizes stay in src/data/release.ts so a release bump remains a one-file
 * change; only the prose is translated, and `size` falls back to the number
 * there for the platforms that have one.
 */
export function usePlatformCopy(release: ReleaseState) {
  const { t } = useTranslation('home')
  const key = `platforms.${release.platform}`

  return {
    label: t(`${key}.label`),
    sub: t(`${key}.sub`),
    minOs: t(`${key}.minOs`),
    size: t(`${key}.size`, { defaultValue: release.release.size }),
  }
}

/** The release date written the way the page's language writes dates. */
export function useReleaseDate(isoDate: string): string {
  const { i18n } = useTranslation()

  return useMemo(
    () =>
      new Intl.DateTimeFormat(i18n.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(`${isoDate}T00:00:00`)),
    [isoDate, i18n.language],
  )
}
