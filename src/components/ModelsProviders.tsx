import { useTranslation } from 'react-i18next'

/** Slot and model names are identifiers; only the reasoning level reads as prose. */
const ROUTING = [
  { slot: 'large_model', model: 'claude-code/opus', reasoning: 'high' },
  { slot: 'medium_model', model: 'copilot/gpt-5', reasoning: 'medium' },
  { slot: 'small_model', model: 'codex/gpt-5-mini', reasoning: 'medium' },
  { slot: 'fallback_model', model: 'local/qwen3-coder', reasoning: 'medium' },
]

/** Provider names are the catalogue's own; only the status reads as prose. */
const PROVIDERS = [
  { name: 'Rotaris Cloud', dot: 'var(--rt-ok)', meta: 'cloud' },
  { name: 'Claude Code', dot: 'var(--rt-ok)', meta: 'claudeCode' },
  { name: 'GitHub Copilot', dot: 'var(--rt-ok)', meta: 'copilot' },
  { name: 'OpenAI Codex', dot: 'var(--rt-warn)', meta: 'codex' },
  { name: 'OpenAI-compatible', dot: 'var(--rt-ok)', meta: 'local' },
]

export default function ModelsProviders() {
  const { t } = useTranslation('home')

  return (
    <section id="models" className="section">
      <div className="wrap">
        <h6>{t('models.kicker')}</h6>
        <h2 style={{ marginBottom: 14 }}>{t('models.title')}</h2>
        <p className="section-lede">{t('models.lede')}</p>

        <div className="grid-cards cols-xl" style={{ alignItems: 'start' }}>
          <div className="card panel-card">
            <div className="card-kicker">{t('models.routing')}</div>
            <div className="table-scroll">
              <table className="table" aria-label={t('models.tableLabel')}>
                <thead>
                  <tr>
                    <th className="table-pad-first">{t('models.table.slot')}</th>
                    <th>{t('models.table.model')}</th>
                    <th className="table-pad-last">{t('models.table.reasoning')}</th>
                  </tr>
                </thead>
                <tbody>
                  {ROUTING.map((row) => (
                    <tr key={row.slot}>
                      <td className="table-pad-first">{row.slot}</td>
                      <td className="mono" style={{ fontSize: 11.5 }}>
                        {row.model}
                      </td>
                      <td className="table-pad-last">
                        <span
                          className={`tag ${row.reasoning === 'high' ? 'tag-accent' : 'tag-neutral'}`}
                        >
                          {row.reasoning === 'high'
                            ? t('models.reasoningHigh')
                            : t('models.reasoningMedium')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding: '12px 20px', fontSize: 11, color: 'var(--rt-text-tertiary)' }}>
              {t('models.overrides')}
            </div>
          </div>

          <div className="card" style={{ gap: 0, padding: '14px 20px' }}>
            <div className="card-kicker" style={{ marginBottom: 12 }}>
              {t('models.providers')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {PROVIDERS.map((provider) => (
                <div className="provider-row" key={provider.name}>
                  <span className="status-dot" style={{ background: provider.dot }} />
                  <span className="provider-name">{provider.name}</span>
                  <span className="mono provider-meta">
                    {t(`models.providerMeta.${provider.meta}`)}
                  </span>
                </div>
              ))}
              <div className="provider-row">
                <span className="status-dot" style={{ background: 'var(--rt-fail)' }} />
                <span className="provider-name">DeepSeek</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--rt-danger-300)' }}>
                  {t('models.providerMeta.deepseek')}
                </span>
                <span
                  className="btn btn-secondary btn-compact"
                  style={{ marginLeft: 'auto', fontSize: 10.5 }}
                >
                  {t('models.reauthenticate')}
                </span>
              </div>
            </div>

            <hr className="rt-fade-rule" style={{ margin: '14px 0 12px' }} />
            <p style={{ fontSize: 12, color: 'var(--rt-text-secondary)', margin: 0 }}>
              {t('models.note')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
