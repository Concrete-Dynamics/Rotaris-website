const PILLARS = [
  {
    icon: 'ph ph-tree-structure',
    title: 'Orchestration',
    body: 'Specialist agents — architect, coders, tester, verifier — coordinated as an engineering team.',
  },
  {
    icon: 'ph ph-hand-palm',
    title: 'Control',
    body: 'Inspect, pause, redirect, approve, or stop work at any point in the run.',
  },
  {
    icon: 'ph ph-seal-check',
    title: 'Verification',
    body: "Completion depends on requirements, tests, and explicit gates — not on an agent's say-so.",
  },
  {
    icon: 'ph ph-path',
    title: 'Traceability',
    body: 'Requirements, implementation, tests, agent actions, and artifacts remain connected.',
  },
]

export default function ProductDefinition() {
  return (
    <section id="product" className="section">
      <div className="wrap">
        <div className="definition-copy">
          <h6>Agentic coding control plane</h6>
          <h2 style={{ marginBottom: 18, textWrap: 'pretty' }}>
            The control plane for agentic software engineering
          </h2>
          <p>
            Rotaris turns a high-level mission into coordinated work across planning,
            implementation, testing, documentation, Git, and verification. See what every agent is
            doing, intervene when necessary, and review the evidence before accepting the result.
          </p>
          <p style={{ marginBottom: 0 }}>
            You get an inspectable software-engineering team — not one opaque coding agent.
          </p>
        </div>

        <div className="grid-cards cols-md" style={{ marginTop: 44 }}>
          {PILLARS.map((pillar) => (
            <div className="card card-accented" key={pillar.title}>
              <div className="icon-title">
                <i className={pillar.icon} aria-hidden="true" />
                <span className="card-title">{pillar.title}</span>
              </div>
              <p className="card-body">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
