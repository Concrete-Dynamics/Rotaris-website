const WORKTREES = [
  {
    name: 'auth-flow-refactor',
    state: 'run',
    active: true,
    meta: 'geraet/auth-refactor ↑4 · 3 dirty',
  },
  { name: 'docs-sweep', state: 'wait', active: false, meta: 'geraet/docs-pass ↑1 ↓2' },
  { name: 'config-v2', state: 'done', active: false, meta: 'geraet/config-v2 · clean' },
]

const COMMITS = [
  { sha: 'a3f19c2', subject: 'Convert session handlers to async', author: 'you · 14m' },
  {
    sha: '9e0b7f1',
    subject: 'Wrap blocking IO in asyncio.to_thread',
    author: 'coding-agent-1 · 22m',
  },
  { sha: '5c2d8aa', subject: 'Add async fixtures to test harness', author: 'coding-agent-1 · 1h' },
  { sha: '0f7b3e4', subject: 'Draft async interface for session API', author: 'architect · 2h' },
]

export default function GitWorkflow() {
  return (
    <section id="git" className="section">
      <div className="wrap split">
        <div>
          <h6>Git workflow</h6>
          <h2 style={{ marginBottom: 18 }}>Isolated worktrees, reviewable commits</h2>
          <p style={{ fontSize: 15, color: 'var(--rt-text-secondary)', textWrap: 'pretty' }}>
            Each session works in its own Git worktree, so parallel missions never trample each
            other. Agents commit locally with attributed authorship — you review diffs and decide
            what leaves the machine.
          </p>
          {/* Shipped capability vs. planned, kept visibly distinct (MSG-03). */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
            <span className="tag tag-neutral">changed files</span>
            <span className="tag tag-neutral">branch context</span>
            <span className="tag tag-neutral">local commits</span>
            <span className="tag tag-neutral">diff review</span>
            <span className="tag tag-neutral">worktrees</span>
            <span className="tag tag-outline dim">pull requests · planned</span>
          </div>
        </div>

        <div className="card panel-card">
          <div className="card-kicker">Worktrees</div>
          <div className="worktree-list">
            {WORKTREES.map((tree) => (
              <div
                className={`worktree-row${tree.active ? ' is-active' : ''}`}
                key={tree.name}
              >
                <span
                  className={`status-dot${tree.active ? ' is-pulsing' : ''}`}
                  style={{ background: `var(--rt-${tree.state})` }}
                />
                {tree.name}
                <span className="mono worktree-meta">{tree.meta}</span>
              </div>
            ))}
          </div>

          <div className="card-kicker" style={{ padding: '14px 20px 8px' }}>
            Recent commits
          </div>
          <div className="mono commit-list">
            {COMMITS.map((commit) => (
              <div className="commit-row" key={commit.sha}>
                <span className="commit-sha">{commit.sha}</span>
                <span className="commit-subject">{commit.subject}</span>
                <span className="commit-author">{commit.author}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
