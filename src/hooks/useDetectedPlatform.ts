import { useEffect, useState } from 'react'
import { DEFAULT_PLATFORM, type PlatformId } from '../data/release'

interface UserAgentData {
  platform?: string
}

/**
 * Detection picks the recommended download only — it never starts one, and every
 * supported platform stays visible regardless of the result (DL-03).
 *
 * Detection runs in an effect rather than during render so the first paint is
 * identical for every visitor and the button never shifts layout (NFR-01).
 */
export function useDetectedPlatform(): PlatformId {
  const [platform, setPlatform] = useState<PlatformId>(DEFAULT_PLATFORM)

  useEffect(() => {
    const hinted = (navigator as Navigator & { userAgentData?: UserAgentData })
      .userAgentData?.platform
    const ua = hinted || navigator.userAgent || ''

    if (/mac/i.test(ua)) setPlatform('macos')
    else if (/linux|x11/i.test(ua) && !/android/i.test(ua)) setPlatform('linux-x64')
    else setPlatform('windows-x64')
  }, [])

  return platform
}
