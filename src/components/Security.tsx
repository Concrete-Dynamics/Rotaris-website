import { Link } from 'react-router-dom'
import { HOME_ANCHORS } from '../data/routes'

const BOUNDARIES = [
  {
    icon: 'ph ph-folder-lock',
    title: 'Workspace-scoped file access',
    body: 'Agents read and write inside the selected workspace only, with path-traversal prevention.',
  },
  {
    icon: 'ph ph-terminal',
    title: 'Controlled shell execution',
    body: 'Shell commands run under workspace policy; consequential actions can require approval.',
  },
  {
    icon: 'ph ph-eye-slash',
    title: 'Secret redaction',
    body: 'Known secrets are redacted from transcripts, reports, and anything sent to a provider.',
  },
  {
    icon: 'ph ph-key',
    title: 'Restricted token storage',
    body: 'Provider credentials stay on your machine in ~/.local/share/rotaris/tokens/, in files readable only by your own user account (mode 0600).',
  },
  {
    icon: 'ph ph-arrows-counter-clockwise',
    title: 'Loop protection',
    body: 'Iteration limits and circuit breaking stop runaway agents before they burn tokens.',
  },
  {
    icon: 'ph ph-hand-palm',
    title: 'Cancellation, always',
    body: 'Any run, any agent, any time — cancellation propagates through the whole delegation tree.',
  },
]

export default function Security() {
  return (
    <section id="security" className="section">
      <div className="wrap">
        <h6>Security</h6>
        <h2 style={{ marginBottom: 14 }}>Agents work inside the fence</h2>
        <p className="section-lede">
          Every capability an agent has is scoped, logged, and revocable. Unsafe overrides exist —
          but they are explicit, and they are yours to grant.
        </p>

        <div className="grid-cards cols-security" style={{ marginBottom: 44 }}>
          {BOUNDARIES.map((item) => (
            <div className="card security-card" key={item.title}>
              <div className="icon-title">
                <i className={item.icon} aria-hidden="true" />
                <span className="card-title">{item.title}</span>
              </div>
              <p className="card-body">{item.body}</p>
            </div>
          ))}
        </div>

        {/* Local operation, stated precisely rather than as "fully local" (MSG-05). */}
        <div className="card card-accented where-card">
          <span className="card-kicker">What runs where</span>
          <div className="where-list">
            <div>
              <i className="ph ph-desktop" style={{ color: 'var(--rt-run)' }} aria-hidden="true" />
              <span>
                The Rotaris application and orchestration engine run entirely on your machine. Your
                repository is never uploaded.
              </span>
            </div>
            <div>
              <i
                className="ph ph-arrow-square-out"
                style={{ color: 'var(--rt-wait)' }}
                aria-hidden="true"
              />
              <span>
                Only the prompts and code context needed for a task are sent to the model providers
                you configure. With local models, nothing leaves the machine.
              </span>
            </div>
            <div>
              <i
                className="ph ph-chart-bar"
                style={{ color: 'var(--rt-accent-300)' }}
                aria-hidden="true"
              />
              <span>
                No telemetry and no usage statistics. Sessions, logs, the response cache and
                the Git worktrees live in{' '}
                <span className="mono" style={{ fontSize: 12 }}>
                  .rotaris/
                </span>{' '}
                inside your workspace, configuration in{' '}
                <span className="mono" style={{ fontSize: 12 }}>
                  ~/.config/rotaris/
                </span>
                . None of it reaches us.
              </span>
            </div>
            <div>
              <i
                className="ph ph-arrows-clockwise"
                style={{ color: 'var(--rt-text-tertiary)' }}
                aria-hidden="true"
              />
              <span>
                The one connection Rotaris opens by itself is the start-up update check
                against GitHub, which tells GitHub your IP address and client details.
                Source installations never check, and an update installs only when the
                download matches the published SHA-256 checksum.
              </span>
            </div>
          </div>
          <div style={{ marginTop: 6 }}>
            <Link to={HOME_ANCHORS.docs} style={{ fontSize: 12.5, fontWeight: 600 }}>
              Read the full security page — data flow, permissions, and vulnerability reporting{' '}
              <i className="ph ph-arrow-right" style={{ verticalAlign: -2 }} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
