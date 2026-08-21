import { useMemo, useState } from 'react'
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
