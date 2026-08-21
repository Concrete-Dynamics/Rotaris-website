import { useTranslation } from 'react-i18next'
import type { Channel } from '../data/release'

const OPTIONS: Channel[] = ['stable', 'preview']

interface Props {
  channel: Channel
  onChange: (channel: Channel) => void
}

/**
 * Stable / Preview selector (DL-09). Real buttons in a radio group, so the
 * control is keyboard-operable and its state is announced rather than implied
 * by colour alone (NFR-03).
 */
export default function ChannelSwitch({ channel, onChange }: Props) {
  const { t } = useTranslation('home')

  return (
    <div className="seg channel-switch" role="radiogroup" aria-label={t('channel.label')}>
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={channel === option}
          className={`seg-opt${channel === option ? ' is-active' : ''}`}
          onClick={() => onChange(option)}
        >
          {t(`channel.${option}`)}
        </button>
      ))}
    </div>
  )
}
