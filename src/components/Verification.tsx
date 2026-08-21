const SUMMARY = [
  { label: 'Tasks', value: <>7 / 7 completed</> },
  { label: 'Files changed', value: <>14</> },
  {
    label: 'Tests',
    value: (
      <>
        <span style={{ color: 'var(--rt-run)' }}>212 passed</span> · 0 failed
      </>
    ),
  },
  { label: 'Requirements', value: <>6 / 6 covered</> },
  { label: 'Git', value: <>4 commits · rotaris/auth-refactor</> },
  {
    label: 'Warnings',
    value: <span style={{ color: 'var(--rt-wait)' }}>1 unresolved</span>,
  },
]

export default function Verification() {
  return (
    <section id="verification" className="section">
      <div className="wrap">
        <h6>Requirements &amp; verification</h6>
        <h2 style={{ marginBottom: 14 }}>Know why every change exists</h2>
        <p className="section-lede" style={{ maxWidth: 640 }}>
          Requirements and acceptance criteria are persistent engineering artifacts. Every change
          traces back to one — and forward to the test and verification that prove it.
        </p>

        {/* Requirement → task → change → test → verification (Section 9). */}
        <div className="scroll-x" style={{ marginBottom: 44 }}>
          <div className="chain">
            <div className="card chain-first">
              <span className="card-kicker">Requirement</span>
              <span className="mono chain-id" style={{ color: 'var(--rt-accent-300)' }}>
                SWR-2104
              </span>
              <p className="card-body">Session handlers shall be non-blocking under load.</p>
            </div>
            <ChainArrow />
            <div className="card">
              <span className="card-kicker">Task</span>
              <span className="mono chain-id">T-014</span>
              <p className="card-body">Convert session handlers to async · coding-agent-1</p>
            </div>
            <ChainArrow />
            <div className="card">
              <span className="card-kicker">Code change</span>
              <span className="mono chain-id">a3f19c2</span>
              <p className="card-body mono">
                src/api/session.py <span style={{ color: 'var(--rt-run)' }}>+214</span>{' '}
                <span style={{ color: 'var(--rt-danger-300)' }}>−96</span>
              </p>
            </div>
            <ChainArrow />
            <div className="card">
              <span className="card-kicker">Test</span>
              <span className="mono chain-id">test_session.py</span>
              <p className="card-body mono">
                <span style={{ color: 'var(--rt-run)' }}>✓</span> 38 passed · 0 failed
              </p>
            </div>
            <ChainArrow />
            <div className="card chain-last">
              <span className="card-kicker">Verification</span>
              <span className="tag tag-done" style={{ alignSelf: 'flex-start' }}>
                <i className="ph ph-seal-check" aria-hidden="true" />
                verified
              </span>
              <p className="card-body">Criteria met · evidence attached</p>
            </div>
          </div>
        </div>

        <div className="split">
          <div>
            <h5 style={{ marginBottom: 12 }}>The verification gate</h5>
            <p style={{ fontSize: 14, color: 'var(--rt-text-secondary)', textWrap: 'pretty' }}>
              Nothing is “done” because an agent said so. A dedicated verifier re-reads the
              requirements, re-runs the tests, and inspects the diff before a task is declared
              finished — and the completion summary shows you exactly what it found.
            </p>
            <p
              style={{
                fontSize: 14,
                color: 'var(--rt-text-secondary)',
                marginBottom: 0,
                textWrap: 'pretty',
              }}
            >
              Requirement-to-code and requirement-to-test links are enforced in the repository
              itself, so traceability survives long after the run.
            </p>
          </div>

          {/* The completion summary — the signature Rotaris visual (UI-07). */}
          <div className="card elev-md summary-card">
            <div className="summary-head">
              <i className="ph-fill ph-seal-check" aria-hidden="true" />
              <span>Mission complete</span>
              <span className="tag tag-done" style={{ marginLeft: 'auto' }}>
                verified
              </span>
            </div>
            <div className="summary-grid">
              {SUMMARY.map((row) => (
                <div className="summary-row" key={row.label}>
                  <span className="dim">{row.label}</span>
                  <span className="mono">{row.value}</span>
                </div>
              ))}
            </div>
            <div className="summary-actions">
              <span className="btn btn-primary btn-compact">Accept result</span>
              <span className="btn btn-secondary btn-compact">Review diff</span>
              <span className="btn btn-ghost btn-compact" style={{ marginLeft: 'auto' }}>
                View evidence
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ChainArrow() {
  return (
    <div className="chain-arrow" aria-hidden="true">
      <i className="ph ph-arrow-right" />
    </div>
  )
}
