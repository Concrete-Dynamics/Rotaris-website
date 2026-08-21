import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const POINTS = [
  {
    icon: 'ph ph-flow-arrow',
    lead: 'Dependency-aware parallelism.',
    body: 'Fan-out where tasks are independent, strict ordering where they are not.',
  },
  {
    icon: 'ph ph-clock-countdown',
    lead: 'Bounded autonomy.',
    body: 'Iteration limits, depth limits, fan-out limits, loop protection, and circuit breaking constrain every run.',
  },
  {
    icon: 'ph ph-file-text',
    lead: 'Structured reports.',
    body: 'Each agent returns findings, changes, and evidence — not a wall of text.',
  },
  {
    icon: 'ph ph-x-circle',
    lead: 'Cancellation propagates.',
    body: 'Stop a parent and every descendant stops with it — cleanly.',
  },
]

/** Ring positions for the seven specialists, matching the design's radial layout. */
const NODES = [
  { x: 240, y: 60, state: 'run', label: 'implementer', tx: 240, ty: 42, delay: '0s' },
  { x: 349, y: 113, state: 'wait', label: 'verifier', tx: 360, ty: 99 },
  { x: 377, y: 231, state: 'done', label: 'librarian', tx: 399, ty: 253 },
  { x: 301, y: 326, state: 'run', label: 'refactorer', tx: 311, ty: 350, delay: '0.5s' },
  { x: 179, y: 326, state: 'done', label: 'codebase-analyst', tx: 163, ty: 350 },
  { x: 104, y: 231, state: 'wait', label: 'tester', tx: 82, ty: 253 },
  { x: 131, y: 113, state: 'done', label: 'architect', tx: 120, ty: 99 },
]

const LEGEND = [
  { x: 30, state: 'wait', label: 'waiting' },
  { x: 105, state: 'run', label: 'running' },
  { x: 182, state: 'done', label: 'done' },
]

export default function Orchestration() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section id="orchestration" className="section">
      <div className="wrap split">
        <div>
          <h6>Orchestration</h6>
          <h2 style={{ marginBottom: 18, textWrap: 'pretty' }}>
            A stable center. Specialists in motion.
          </h2>
          <p
            style={{
              fontSize: 15,
              color: 'var(--rt-text-secondary)',
              marginBottom: 28,
              textWrap: 'pretty',
            }}
          >
            Your orchestrator plans and delegates work to specialist agents. Independent tasks run
            in parallel; dependent tasks wait; every child reports back in a structured format the
            orchestrator can act on.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {POINTS.map((point) => (
              <div key={point.lead} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                <i
                  className={point.icon}
                  aria-hidden="true"
                  style={{
                    color: 'var(--rt-accent-300)',
                    fontSize: 17,
                    flex: 'none',
                    transform: 'translateY(2px)',
                  }}
                />
                <div>
                  <strong style={{ fontSize: 13.5 }}>{point.lead}</strong>{' '}
                  <span style={{ fontSize: 13.5, color: 'var(--rt-text-secondary)' }}>
                    {point.body}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rt-dot-grid-bg"
          style={{
            border: '1px solid var(--rt-border)',
            borderRadius: 16,
            padding: 24,
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'var(--rt-surface)',
          }}
        >
          <svg
            width="100%"
            height="auto"
            viewBox="0 0 480 420"
            style={{ maxWidth: 480 }}
            role="img"
            aria-label="Radial diagram: the orchestrator at the center — shown as a small net spanning delegation intensity per agent — delegating to seven specialist agents arranged in an even ring, each colored by state — done, running, or waiting"
          >
            <circle
              cx="240"
              cy="200"
              r="140"
              fill="none"
              stroke="var(--rt-border)"
              strokeDasharray="3 6"
            />
            {NODES.map((node) => (
              <line
                key={`spoke-${node.label}`}
                x1="240"
                y1="200"
                x2={node.x}
                y2={node.y}
                stroke="var(--rt-border-strong)"
              />
            ))}
            <polygon
              points="240,70 324,133 367,229 267,257 193,297 157,219 138,119"
              fill="var(--rt-accent-tint-14)"
              stroke="var(--rt-accent-700)"
              strokeWidth="1.5"
            />
            <text
              x="240"
              y="197"
              textAnchor="middle"
              fill="var(--rt-accent-200)"
              style={{ fontFamily: 'var(--rt-font-display)', fontSize: 12, fontWeight: 600 }}
            >
              orchestrator
            </text>
            <text
              x="240"
              y="212"
              textAnchor="middle"
              fill="var(--rt-text-tertiary)"
              style={{ fontFamily: 'var(--rt-font-mono)', fontSize: 8.5 }}
            >
              plans · delegates
            </text>

            {NODES.map((node) => (
              <g key={node.label}>
                <circle cx={node.x} cy={node.y} r="7" fill={`var(--rt-${node.state})`}>
                  {node.delay !== undefined && !reducedMotion && (
                    <animate
                      attributeName="opacity"
                      values="1;0.35;1"
                      dur="1.6s"
                      begin={node.delay}
                      repeatCount="indefinite"
                    />
                  )}
                </circle>
                <text
                  x={node.tx}
                  y={node.ty}
                  textAnchor="middle"
                  fill="var(--rt-text-secondary)"
                  style={{ fontFamily: 'var(--rt-font-mono)', fontSize: 11 }}
                >
                  {node.label}
                </text>
              </g>
            ))}

            <g style={{ fontFamily: 'var(--rt-font-mono)', fontSize: 9.5 }}>
              {LEGEND.map((item) => (
                <g key={item.label}>
                  <circle cx={item.x} cy="392" r="4" fill={`var(--rt-${item.state})`} />
                  <text x={item.x + 10} y="396" fill="var(--rt-text-tertiary)">
                    {item.label}
                  </text>
                </g>
              ))}
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}
