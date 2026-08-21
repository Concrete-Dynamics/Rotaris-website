const ROUTING = [
  { persona: 'orchestrator', model: 'copilot/gpt-5', reasoning: 'high' },
  { persona: 'architect', model: 'claude-opus-4', reasoning: 'high' },
  { persona: 'coding-agent', model: 'copilot/gpt-5', reasoning: 'medium' },
  { persona: 'tester', model: 'claude-sonnet-4', reasoning: 'medium' },
  { persona: 'verifier', model: 'claude-opus-4', reasoning: 'high' },
]

export default function ModelsProviders() {
  return (
    <section id="models" className="section">
      <div className="wrap">
        <h6>Models &amp; providers</h6>
        <h2 style={{ marginBottom: 14 }}>The right model for every role</h2>
        <p className="section-lede">
          Route each persona to a different model by capability, cost, and availability. Set
          defaults at startup, override per run, and fall back automatically when a provider is
          unavailable.
        </p>

        <div className="grid-cards cols-xl" style={{ alignItems: 'start' }}>
          <div className="card panel-card">
            <div className="card-kicker">Per-persona routing</div>
            <div className="table-scroll">
              <table className="table" aria-label="Model assignment per persona">
                <thead>
                  <tr>
                    <th className="table-pad-first">Persona</th>
                    <th>Model</th>
                    <th className="table-pad-last">Reasoning</th>
                  </tr>
                </thead>
                <tbody>
                  {ROUTING.map((row) => (
                    <tr key={row.persona}>
                      <td className="table-pad-first">{row.persona}</td>
                      <td className="mono" style={{ fontSize: 11.5 }}>
                        {row.model}
                      </td>
                      <td className="table-pad-last">
                        <span
                          className={`tag ${row.reasoning === 'high' ? 'tag-accent' : 'tag-neutral'}`}
                        >
                          {row.reasoning}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding: '12px 20px', fontSize: 11, color: 'var(--rt-text-tertiary)' }}>
              Overrides apply per instance and take effect from the next iteration.
            </div>
          </div>

          <div className="card" style={{ gap: 0, padding: '14px 20px' }}>
            <div className="card-kicker" style={{ marginBottom: 12 }}>
              Providers
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="provider-row">
                <span className="status-dot" style={{ background: 'var(--rt-ok)' }} />
                <span className="provider-name">GitHub Copilot</span>
                <span className="mono provider-meta">412 / 1,500 premium requests</span>
              </div>
              <div className="provider-row">
                <span className="status-dot" style={{ background: 'var(--rt-ok)' }} />
                <span className="provider-name">Anthropic</span>
                <span className="mono provider-meta">connected · 6 models</span>
              </div>
              <div className="provider-row">
                <span className="status-dot" style={{ background: 'var(--rt-warn)' }} />
                <span className="provider-name">OpenAI Codex</span>
                <span className="mono provider-meta">63% of weekly limit</span>
              </div>
              <div className="provider-row">
                <span className="status-dot" style={{ background: 'var(--rt-fail)' }} />
                <span className="provider-name">DeepSeek</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--rt-danger-300)' }}>
                  auth expired
                </span>
                <span
                  className="btn btn-secondary btn-compact"
                  style={{ marginLeft: 'auto', fontSize: 10.5 }}
                >
                  Re-authenticate
                </span>
              </div>
            </div>

            <hr className="rt-fade-rule" style={{ margin: '14px 0 12px' }} />
            <p style={{ fontSize: 12, color: 'var(--rt-text-secondary)', margin: 0 }}>
              OAuth and API-key providers, local models, and any OpenAI-compatible endpoint.
              Subscription limits are visible before you hit them.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
