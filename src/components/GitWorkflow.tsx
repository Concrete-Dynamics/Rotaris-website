import { useTranslation } from 'react-i18next'

/** Worktree and branch names are identifiers; only their status reads as prose. */
const WORKTREES = [
  { name: 'auth-flow-refactor', state: 'run', active: true, meta: 'dirty' },
  { name: 'docs-sweep', state: 'wait', active: false, meta: 'docs' },
  { name: 'config-v2', state: 'done', active: false, meta: 'clean' },
]

/** One checkpoint per iteration that changed the tree; the newest first. */
const CHECKPOINTS = [
  { id: 'iter 7', key: 'async', files: 4, elapsed: '14m' },
  { id: 'iter 5', key: 'blockingIo', files: 3, elapsed: '22m' },
  { id: 'iter 3', key: 'fixtures', files: 2, elapsed: '41m' },
  { id: 'iter 2', key: 'interface', files: 1, elapsed: '52m' },
]

const TAGS = ['worktrees', 'checkpoints', 'restore', 'changedFiles', 'diffReview'] as const

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
            <span className="tag tag-outline dim">{t('git.tags.merge')}</span>
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
            {t('git.checkpoints')}
          </div>
          <div className="mono commit-list">
            {CHECKPOINTS.map((checkpoint) => (
              <div className="commit-row" key={checkpoint.id}>
                <span className="commit-sha">{checkpoint.id}</span>
                <span className="commit-subject">{t(`git.commits.${checkpoint.key}`)}</span>
                <span className="commit-author">
                  {t('git.filesChanged', { count: checkpoint.files })} · {checkpoint.elapsed}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
