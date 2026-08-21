const ACTIVE = [
  {
    agent: 'orchestrator',
    state: 'run',
    pulsing: true,
    tool: 'wait_for_tasks',
    detail: 'waiting on coding-agent-1, tester',
    elapsed: '26m 12s',
  },
  {
    agent: 'coding-agent-1',
    state: 'run',
    pulsing: true,
    tool: 'haet_edit',
    detail: 'src/api/session.py · 4 anchors verified',
    elapsed: '14m 40s',
  },
  {
    agent: 'tester',
    state: 'run',
    pulsing: true,
    tool: 'shell',
    detail: 'pytest tests/unit -x -q · 38s',
    elapsed: '6m 03s',
  },
  {
    agent: 'coding-agent-2',
    state: 'wait',
    pulsing: false,
    tool: '—',
    detail: 'blocked · depends_on: coding-agent-1',
    elapsed: '—',
  },
]

const METERS = [
  { name: 'orchestrator', percent: 41, colour: 'var(--rt-run)', value: '52.4k / 128k' },
  { name: 'coding-agent-1', percent: 71, colour: 'var(--rt-wait)', value: '91.3k / 128k' },
  { name: 'tester', percent: 18, colour: 'var(--rt-run)', value: '11.6k / 64k' },
]

export default function ControlObservability() {
  return (
    <section id="control" className="section">
      <div className="wrap">
        <h6>Control &amp; observability</h6>
        <h2 style={{ marginBottom: 14 }}>Supervised autonomy, not blind trust</h2>
        <p className="section-lede">
          Every agent&apos;s state, tools, elapsed time, context window, and model assignment stay
          visible while the run is live — and every consequential action has a human handle.
        </p>

        <div className="grid-cards cols-xl" style={{ alignItems: 'start' }}>
          <div className="card panel-card">
            <div className="card-kicker">Active now</div>
            <div className="table-scroll">
              <table className="table" aria-label="Agents active right now">
                <thead>
                  <tr>
                    <th className="table-pad-first">Agent</th>
                    <th>Tool</th>
                    <th>Detail</th>
                    <th className="table-pad-last" style={{ textAlign: 'right' }}>
                      Elapsed
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ACTIVE.map((row) => (
                    <tr key={row.agent}>
                      <td className="table-pad-first">
                        <span className="agent-cell">
                          <span
                            className={`status-dot${row.pulsing ? ' is-pulsing' : ''}`}
                            style={{ background: `var(--rt-${row.state})` }}
                          />
                          {row.agent}
                        </span>
                      </td>
                      <td className="mono" style={{ fontSize: 11 }}>
                        {row.tool}
                      </td>
                      <td className="dim" style={{ fontSize: 11.5 }}>
                        {row.detail}
                      </td>
                      <td
                        className="mono table-pad-last"
                        style={{ fontSize: 11, textAlign: 'right' }}
                      >
                        {row.elapsed}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="context-meters">
              {METERS.map((meter) => (
                <div className="meter-row" key={meter.name}>
                  <span className="mono meter-name">{meter.name}</span>
                  <div className="meter-track">
                    <div
                      className="meter-fill"
                      style={{ width: `${meter.percent}%`, background: meter.colour }}
                    />
                  </div>
                  <span className="mono meter-value">{meter.value}</span>
                </div>
              ))}
              <div className="meters-note">context windows · compress automatically at 80%</div>
            </div>
          </div>

          <div className="stack-16">
            <div className="card">
              <span className="card-kicker">Human control</span>
              <p className="card-body" style={{ marginBottom: 6 }}>
                Pause a run, steer an agent mid-task, change its model or reasoning strength, or
                cancel — cancellation cascades to every descendant.
              </p>
              <div className="control-actions">
                <span className="btn btn-secondary btn-compact">
                  <i className="ph ph-pause" aria-hidden="true" />
                  Pause run
                </span>
                <span className="btn btn-secondary btn-compact">
                  <i className="ph ph-chat-teardrop-text" aria-hidden="true" />
                  Steer agent
                </span>
                <span className="btn btn-warning btn-compact">
                  <i className="ph ph-cpu" aria-hidden="true" />
                  Change model
                </span>
                <span
                  className="btn btn-danger btn-compact"
                  style={{ border: '1px solid var(--rt-danger-800)' }}
                >
                  <i className="ph ph-x-circle" aria-hidden="true" />
                  Cancel run
                </span>
              </div>
            </div>

            {/* A real failure and its recovery, rather than the happy path only (UI-06). */}
            <div className="card failure-card">
              <span className="card-kicker">When something fails</span>
              <div className="failure-head">
                <span className="tag tag-fail" style={{ flex: 'none' }}>
                  <i className="ph ph-x" aria-hidden="true" />
                  failed
                </span>
                <div>
                  <span className="mono" style={{ fontSize: 12 }}>
                    test_session_timeout
                  </span>{' '}
                  <span className="dim">— tester · pytest exit 1</span>
                </div>
              </div>
              <p className="card-body" style={{ fontSize: 12, margin: '4px 0 8px' }}>
                Failures surface as states, not buried logs. The orchestrator re-delegates the fix
                with the failing evidence attached — and you can inspect or intervene at every step.
              </p>
              <div className="failure-recovery">
                <i className="ph ph-arrow-bend-down-right dim" aria-hidden="true" />
                fix-session-timeout → coding-agent-1
                <span className="tag tag-run" style={{ marginLeft: 4 }}>
                  <span className="status-dot is-pulsing" style={{ background: 'var(--rt-run)' }} />
                  re-running
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
