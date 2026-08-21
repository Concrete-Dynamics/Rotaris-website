import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

interface ViewCard {
  key: string
  icon: string
  /** Keys under `views.stats`; `dot` colours the state marker. */
  stats: { key: string; dot?: string }[]
}

const VIEWS: ViewCard[] = [
  {
    key: 'overview',
    icon: 'ph ph-gauge',
    stats: [{ key: 'live', dot: 'var(--rt-run)' }, { key: 'tokens' }, { key: 'premium' }],
  },
  {
    key: 'workspace',
    icon: 'ph ph-chats-circle',
    stats: [{ key: 'transcript' }, { key: 'agentTree' }, { key: 'inspector' }],
  },
  {
    key: 'mission',
    icon: 'ph ph-tree-structure',
    stats: [{ key: 'tasks' }, { key: 'blocked', dot: 'var(--rt-wait)' }, { key: 'depth' }],
  },
  {
    key: 'git',
    icon: 'ph ph-git-branch',
    stats: [{ key: 'worktrees' }, { key: 'ahead' }, { key: 'diff' }],
  },
  {
    key: 'library',
    icon: 'ph ph-books',
    stats: [{ key: 'requirements' }, { key: 'skills' }, { key: 'artifacts' }],
  },
  {
    key: 'settings',
    icon: 'ph ph-gear',
    stats: [{ key: 'providers' }, { key: 'personas' }, { key: 'mcpServers' }],
  },
]

export default function SixViews() {
  const { t } = useTranslation('home')

  return (
    <section id="views" className="section">
      <div className="wrap">
        <h6>{t('views.kicker')}</h6>
        <h2 style={{ marginBottom: 14 }}>{t('views.title')}</h2>
        <p className="section-lede">{t('views.lede')}</p>

        <div className="grid-cards cols-views">
          {VIEWS.map((view) => (
            <div className="card" key={view.key}>
              <div className="icon-title">
                <i className={view.icon} aria-hidden="true" />
                <span className="card-title">{t(`views.cards.${view.key}.title`)}</span>
              </div>
              <p className="card-body">{t(`views.cards.${view.key}.body`)}</p>
              <div className="mono card-stats">
                {view.stats.map((stat) => (
                  <span key={stat.key}>
                    {stat.dot && (
                      <Fragment>
                        <span style={{ color: stat.dot }}>●</span>{' '}
                      </Fragment>
                    )}
                    {t(`views.stats.${stat.key}`)}
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
