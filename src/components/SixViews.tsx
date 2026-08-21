import { Fragment } from 'react'

interface ViewCard {
  icon: string
  title: string
  body: string
  stats: { label: string; dot?: string }[]
}

const VIEWS: ViewCard[] = [
  {
    icon: 'ph ph-gauge',
    title: 'Overview',
    body: 'Sessions, provider limits, token usage, and everything currently running — at a glance.',
    stats: [{ label: '3 live', dot: 'var(--rt-run)' }, { label: '612k tok' }, { label: '412/1,500 premium' }],
  },
  {
    icon: 'ph ph-chats-circle',
    title: 'Workspace',
    body: 'The live transcript, the delegation tree, and the inspector — where you talk to the orchestrator.',
    stats: [{ label: 'transcript' }, { label: 'agent tree' }, { label: 'inspector' }],
  },
  {
    icon: 'ph ph-tree-structure',
    title: 'Mission',
    body: 'The full task hierarchy: dependencies, per-agent models, tool counts, elapsed time, and state.',
    stats: [{ label: '9 tasks' }, { label: '2 blocked', dot: 'var(--rt-wait)' }, { label: 'depth ≤ 2' }],
  },
  {
    icon: 'ph ph-git-branch',
    title: 'Git',
    body: 'Worktrees, branch context, changed files, diffs, and local commits made by agents — reviewable before anything leaves the machine.',
    stats: [{ label: '3 worktrees' }, { label: '↑4' }, { label: '+214 −96' }],
  },
  {
    icon: 'ph ph-books',
    title: 'Library',
    body: 'Requirements, agent reports, skills, and artifacts — the persistent knowledge a mission produces and consumes.',
    stats: [{ label: '6 requirements' }, { label: '4 skills' }, { label: '11 artifacts' }],
  },
  {
    icon: 'ph ph-gear',
    title: 'Settings',
    body: 'Providers, per-persona model routing, reasoning strength, MCP servers, and workspace security — dropdowns, not slash commands.',
    stats: [{ label: '4 providers' }, { label: '5 personas' }, { label: '3 MCP servers' }],
  },
]

export default function SixViews() {
  return (
    <section id="views" className="section">
      <div className="wrap">
        <h6>The interface</h6>
        <h2 style={{ marginBottom: 14 }}>Six views. One workspace.</h2>
        <p className="section-lede">
          Everything the harness knows — sessions, agents, requirements, worktrees, artifacts,
          configuration — has one visible home.
        </p>

        <div className="grid-cards cols-views">
          {VIEWS.map((view) => (
            <div className="card" key={view.title}>
              <div className="icon-title">
                <i className={view.icon} aria-hidden="true" />
                <span className="card-title">{view.title}</span>
              </div>
              <p className="card-body">{view.body}</p>
              <div className="mono card-stats">
                {view.stats.map((stat) => (
                  <span key={stat.label}>
                    {stat.dot && (
                      <Fragment>
                        <span style={{ color: stat.dot }}>●</span>{' '}
                      </Fragment>
                    )}
                    {stat.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
