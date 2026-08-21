import type { Channel } from '../data/release'

const OPTIONS: { id: Channel; label: string }[] = [
  { id: 'stable', label: 'Stable' },
  { id: 'preview', label: 'Preview' },
]

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
  return (
    <div className="seg channel-switch" role="radiogroup" aria-label="Release channel">
      {OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          role="radio"
          aria-checked={channel === option.id}
          className={`seg-opt${channel === option.id ? ' is-active' : ''}`}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
