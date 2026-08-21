import { useTranslation } from 'react-i18next'

/** Worktree and branch names are identifiers; only their status reads as prose. */
const WORKTREES = [
  { name: 'auth-flow-refactor', state: 'run', active: true, meta: 'dirty' },
  { name: 'docs-sweep', state: 'wait', active: false, meta: 'docs' },
  { name: 'config-v2', state: 'done', active: false, meta: 'clean' },
]

const COMMITS = [
  { sha: 'a3f19c2', key: 'async', author: 'you', elapsed: '14m' },
  { sha: '9e0b7f1', key: 'blockingIo', author: 'coding-agent-1', elapsed: '22m' },
  { sha: '5c2d8aa', key: 'fixtures', author: 'coding-agent-1', elapsed: '1h' },
  { sha: '0f7b3e4', key: 'interface', author: 'architect', elapsed: '2h' },
]

const TAGS = [
  'changedFiles',
  'branchContext',
  'localCommits',
  'diffReview',
  'worktrees',
] as const

export default function GitWorkflow() {
  const { t } = useTranslation('home')

  return (
    <section id="git" className="section">
      <div className="wrap split">
        <div>
          <h6>{t('git.kicker')}</h6>
          <h2 style={{ marginBottom: 18 }}>{t('git.title')}</h2>
          <p style={{ fontSize: 15, color: 'var(--rt-text-secondary)', textWrap: 'pretty' }}>
            {t('git.lede')}
          </p>
          {/* Shipped capability vs. planned, kept visibly distinct (MSG-03). */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
            {TAGS.map((tag) => (
              <span className="tag tag-neutral" key={tag}>
                {t(`git.tags.${tag}`)}
              </span>
            ))}
            <span className="tag tag-outline dim">{t('git.tags.pullRequests')}</span>
          </div>
        </div>

        <div className="card panel-card">
          <div className="card-kicker">{t('git.worktrees')}</div>
          <div className="worktree-list">
            {WORKTREES.map((tree) => (
              <div className={`worktree-row${tree.active ? ' is-active' : ''}`} key={tree.name}>
                <span
                  className={`status-dot${tree.active ? ' is-pulsing' : ''}`}
                  style={{ background: `var(--rt-${tree.state})` }}
                />
                {tree.name}
                <span className="mono worktree-meta">{t(`git.worktreeMeta.${tree.meta}`)}</span>
              </div>
            ))}
          </div>

          <div className="card-kicker" style={{ padding: '14px 20px 8px' }}>
            {t('git.recentCommits')}
          </div>
          <div className="mono commit-list">
            {COMMITS.map((commit) => (
              <div className="commit-row" key={commit.sha}>
                <span className="commit-sha">{commit.sha}</span>
                <span className="commit-subject">{t(`git.commits.${commit.key}`)}</span>
                <span className="commit-author">
                  {commit.author === 'you' ? t('git.authorYou') : commit.author} · {commit.elapsed}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
