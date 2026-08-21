/**
 * The Rotaris workspace during an active run (DL-02 / H-05).
 *
 * Rendered as markup rather than an image so it stays crisp, themable and
 * readable by assistive technology; the outer element carries the description
 * a screenshot would have carried in its alt text.
 */

const RAIL = [
  { icon: 'ph ph-gauge', label: 'Overview' },
  { icon: 'ph-fill ph-chats-circle', label: 'Workspace', active: true },
  { icon: 'ph ph-tree-structure', label: 'Mission' },
  { icon: 'ph ph-git-branch', label: 'Git' },
  { icon: 'ph ph-books', label: 'Library' },
]

const AGENTS = [
  { branch: '├─', name: 'orchestrator', state: 'run' },
  { branch: '│ ├─', name: 'codebase-analyst', state: 'done' },
  { branch: '│ ├─', name: 'architect', state: 'done' },
  { branch: '│ ├─', name: 'coding-agent-1', state: 'run', pulsing: true },
  { branch: '│ ├─', name: 'coding-agent-2', state: 'wait' },
  { branch: '│ └─', name: 'tester', state: 'run', pulsing: true },
  { branch: '└─', name: 'verifier', state: 'wait' },
]

const TRANSCRIPT = [
  {
    time: '14:02:11',
    who: 'you',
    colour: 'var(--rt-accent-300)',
    highlight: true,
    text: 'Refactor the API layer to use async handlers. Keep the public interface stable and keep the unit suite green.',
  },
  {
    time: '14:02:14',
    who: 'intent',
    colour: 'var(--rt-info-500)',
    text: 'Classified as refactor — orchestrator instructions tailored for behaviour-preserving change.',
  },
  {
    time: '14:02:31',
    who: 'orchestrator',
    colour: 'var(--rt-accent-400)',
    text: 'Decomposed into 6 subtasks. Analysis first (codebase-analyst ∥ librarian), then architecture, then implementation fan-out with tester gating each merge.',
  },
  {
    time: '14:11:02',
    who: 'coding-agent-1',
    colour: 'var(--rt-run)',
    text: 'Converting src/api/session.py — 6 of 9 handlers now async; wrapping blocking IO in asyncio.to_thread.',
  },
]

export default function WorkspaceMock() {
  return (
    <div className="proof">
      <div
        className="mock"
        role="img"
        aria-label="The Rotaris workspace during an active run: agent tree, live transcript, and the inspector for a running coding agent"
      >
        <div className="mock-titlebar">
          <div className="mock-lights">
            <span />
            <span />
            <span />
          </div>
          <span className="mock-app-name">Rotaris</span>
          <span className="mono mock-path">~/code/rotaris</span>
          <div style={{ flex: 1 }} />
          <span className="tag tag-run">
            <span className="status-dot is-pulsing" style={{ background: 'var(--rt-run)' }} />
            mission running · 26m
          </span>
          <span className="tag tag-neutral mono" style={{ fontSize: 10 }}>
            612,480 tok
          </span>
        </div>

        <div className="mock-body">
          <div className="mock-rail">
            {RAIL.map((item) => (
              <div
                key={item.label}
                className={`mock-rail-item${item.active ? ' is-active' : ''}`}
              >
                <i className={item.icon} aria-hidden="true" />
                {item.label}
              </div>
            ))}
            <div style={{ flex: 1 }} />
            <div className="mock-rail-item">
              <i className="ph ph-gear" aria-hidden="true" />
              Settings
            </div>
          </div>

          <div className="mock-side">
            <div className="card-kicker" style={{ marginBottom: 8 }}>
              Worktrees
            </div>
            <div className="mock-worktree">
              <div className="mock-worktree-name">
                <span className="status-dot" style={{ background: 'var(--rt-run)' }} />
                auth-flow-refactor
              </div>
              <div className="mono mock-worktree-branch">rotaris/auth-refactor ↑4</div>
            </div>

            <hr className="rt-fade-rule" style={{ margin: '12px 0' }} />

            <div className="card-kicker" style={{ marginBottom: 8 }}>
              Agents ·{' '}
              <span
                className="mono"
                style={{ color: 'var(--rt-run)', textTransform: 'none', letterSpacing: 0 }}
              >
                3 live
              </span>
            </div>
            <div className="mono mock-tree">
              {AGENTS.map((agent) => (
                <div className="mock-tree-row" key={agent.name}>
                  <span>{agent.branch}</span>
                  <span
                    className={`status-dot${agent.pulsing ? ' is-pulsing' : ''}`}
                    style={{ background: `var(--rt-${agent.state})` }}
                  />
                  <span className="agent">{agent.name}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 14 }}>
              <div className="card-kicker" style={{ marginBottom: 6 }}>
                Todos ·{' '}
                <span
                  className="mono"
                  style={{
                    textTransform: 'none',
                    letterSpacing: 0,
                    color: 'var(--rt-text-secondary)',
                  }}
                >
                  4/7
                </span>
              </div>
              <div className="mock-todos">
                <div>
                  <i className="ph ph-check" style={{ color: 'var(--rt-run)' }} aria-hidden="true" />
                  <s className="dim">Design async interface</s>
                </div>
                <div>
                  <i
                    className="ph ph-circle-notch"
                    style={{ color: 'var(--rt-wait)' }}
                    aria-hidden="true"
                  />
                  Convert session handlers
                </div>
                <div>
                  <i
                    className="ph ph-circle"
                    style={{ color: 'var(--rt-text-tertiary)' }}
                    aria-hidden="true"
                  />
                  Update tests + docs
                </div>
              </div>
            </div>
          </div>

          <div className="mock-main">
            <div className="mock-transcript">
              {TRANSCRIPT.map((line) => (
                <div
                  key={line.time}
                  className={`mock-msg${line.highlight ? ' is-you' : ''}`}
                >
                  <span className="mono mock-msg-time">{line.time}</span>
                  <span className="mock-msg-who" style={{ color: line.colour }}>
                    {line.who}
                  </span>
                  <span className="mock-msg-text">{line.text}</span>
                </div>
              ))}
              <div className="mock-msg">
                <span className="mono mock-msg-time">14:26:05</span>
                <span className="mock-msg-who" style={{ color: 'var(--rt-run)' }}>
                  tester
                </span>
                <span
                  className="mock-msg-text"
                  style={{ display: 'flex', alignItems: 'center', gap: 7 }}
                >
                  <span className="status-dot is-pulsing" style={{ background: 'var(--rt-run)' }} />
                  Running unit suite against converted handlers…
                </span>
              </div>
            </div>

            <div className="mock-composer">
              <div className="mock-composer-box">
                <div className="mock-composer-placeholder">
                  Message orchestrator — type / for commands…
                </div>
                <div className="mock-composer-row">
                  <span className="tag tag-outline">
                    <i className="ph ph-user-gear" aria-hidden="true" />
                    orchestrator
                  </span>
                  <span className="tag tag-outline mono">
                    <i className="ph ph-cpu" aria-hidden="true" />
                    copilot/gpt-5
                  </span>
                  <div style={{ flex: 1 }} />
                  <span className="btn btn-primary btn-compact" style={{ fontSize: 10.5 }}>
                    Send
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mock-inspector">
            <div className="card-kicker" style={{ marginBottom: 10 }}>
              Inspector
            </div>
            <div className="mock-inspector-agent">
              <span className="status-dot is-pulsing" style={{ background: 'var(--rt-run)' }} />
              <span>coding-agent-1</span>
            </div>
            <div className="mock-inspector-meta">running · 14m 40s · depth 1 · 38 tool calls</div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
              <svg
                width="76"
                height="76"
                viewBox="0 0 76 76"
                role="img"
                aria-label="Context window 71 percent full"
              >
                <circle
                  cx="38"
                  cy="38"
                  r="31"
                  fill="none"
                  stroke="var(--rt-surface-2)"
                  strokeWidth="6"
                />
                <circle
                  cx="38"
                  cy="38"
                  r="31"
                  fill="none"
                  stroke="var(--rt-run)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="138.3 194.8"
                  transform="rotate(-90 38 38)"
                />
                <text
                  x="38"
                  y="36"
                  textAnchor="middle"
                  fill="var(--rt-text)"
                  style={{ fontFamily: 'var(--rt-font-mono)', fontSize: 14, fontWeight: 600 }}
                >
                  71%
                </text>
                <text
                  x="38"
                  y="49"
                  textAnchor="middle"
                  fill="var(--rt-text-tertiary)"
                  style={{ fontFamily: 'var(--rt-font-mono)', fontSize: 7.5 }}
                >
                  91.3k / 128k
                </text>
              </svg>
            </div>
            <div className="mock-context-caption">context window · compresses at 80%</div>

            <div className="mock-inspector-label">Reasoning strength</div>
            <div className="seg">
              <span className="seg-opt">low</span>
              <span className="seg-opt">med</span>
              <span className="seg-opt is-active">high</span>
            </div>

            <hr className="rt-fade-rule" style={{ margin: '10px 0' }} />

            <div className="card-kicker" style={{ marginBottom: 8 }}>
              Tools
            </div>
            <div className="mono mock-tools">
              <span className="mock-tool is-granted">haet_edit ✓</span>
              <span className="mock-tool is-granted">shell ✓</span>
              <span className="mock-tool">write_file</span>
              <span className="mock-tool">grep</span>
            </div>

            <div className="mock-inspector-actions">
              <span className="btn btn-secondary btn-compact">
                <i className="ph ph-chat-teardrop-text" aria-hidden="true" />
                Steer
              </span>
              <span
                className="btn btn-danger btn-compact"
                style={{ border: '1px solid var(--rt-danger-800)' }}
              >
                <i className="ph ph-x-circle" aria-hidden="true" />
                Cancel
              </span>
            </div>
            <div className="mock-cascade-note">cancel cascades to 2 descendants</div>
          </div>
        </div>
      </div>
    </div>
  )
}
