import { useTranslation } from 'react-i18next'

/** Agent names and tool names are identifiers, so only `detail` is translated. */
const ACTIVE = [
  {
    agent: 'orchestrator',
    state: 'run',
    pulsing: true,
    tool: 'wait_for_tasks',
    detail: 'orchestrator',
    elapsed: '26m 12s',
  },
  {
    agent: 'coding-agent-1',
    state: 'run',
    pulsing: true,
    tool: 'haet_edit',
    detail: 'coder',
    elapsed: '14m 40s',
  },
  {
    agent: 'tester',
    state: 'run',
    pulsing: true,
    tool: 'shell',
    detail: 'tester',
    elapsed: '6m 03s',
  },
  {
    agent: 'coding-agent-2',
    state: 'wait',
    pulsing: false,
    tool: '—',
    detail: 'blocked',
    elapsed: '—',
  },
]

const METERS = [
  { name: 'orchestrator', percent: 41, colour: 'var(--rt-run)', value: '52.4k / 128k' },
  { name: 'coding-agent-1', percent: 71, colour: 'var(--rt-wait)', value: '91.3k / 128k' },
  { name: 'tester', percent: 18, colour: 'var(--rt-run)', value: '11.6k / 64k' },
]

export default function ControlObservability() {
  const { t } = useTranslation('home')

  return (
    <section id="control" className="section">
      <div className="wrap">
        <h6>{t('control.kicker')}</h6>
        <h2 style={{ marginBottom: 14 }}>{t('control.title')}</h2>
        <p className="section-lede">{t('control.lede')}</p>

        <div className="grid-cards cols-xl" style={{ alignItems: 'start' }}>
          <div className="card panel-card">
            <div className="card-kicker">{t('control.activeNow')}</div>
            <div className="table-scroll">
              <table className="table" aria-label={t('control.tableLabel')}>
                <thead>
                  <tr>
                    <th className="table-pad-first">{t('control.table.agent')}</th>
                    <th>{t('control.table.tool')}</th>
                    <th>{t('control.table.detail')}</th>
                    <th className="table-pad-last" style={{ textAlign: 'right' }}>
                      {t('control.table.elapsed')}
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
                        {t(`control.details.${row.detail}`)}
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
              <div className="meters-note">{t('control.metersNote')}</div>
            </div>
          </div>

          <div className="stack-16">
            <div className="card">
              <span className="card-kicker">{t('control.human.kicker')}</span>
              <p className="card-body" style={{ marginBottom: 6 }}>
                {t('control.human.body')}
              </p>
              <div className="control-actions">
                <span className="btn btn-secondary btn-compact">
                  <i className="ph ph-pause" aria-hidden="true" />
                  {t('control.human.pause')}
                </span>
                <span className="btn btn-secondary btn-compact">
                  <i className="ph ph-chat-teardrop-text" aria-hidden="true" />
                  {t('control.human.steer')}
                </span>
                <span className="btn btn-warning btn-compact">
                  <i className="ph ph-cpu" aria-hidden="true" />
                  {t('control.human.changeModel')}
                </span>
                <span
                  className="btn btn-danger btn-compact"
                  style={{ border: '1px solid var(--rt-danger-800)' }}
                >
                  <i className="ph ph-x-circle" aria-hidden="true" />
                  {t('control.human.cancel')}
                </span>
              </div>
            </div>

            {/* A real failure and its recovery, rather than the happy path only (UI-06). */}
            <div className="card failure-card">
              <span className="card-kicker">{t('control.failure.kicker')}</span>
              <div className="failure-head">
                <span className="tag tag-fail" style={{ flex: 'none' }}>
                  <i className="ph ph-x" aria-hidden="true" />
                  {t('control.failure.tag')}
                </span>
                <div>
                  <span className="mono" style={{ fontSize: 12 }}>
                    test_session_timeout
                  </span>{' '}
                  <span className="dim">{t('control.failure.meta')}</span>
                </div>
              </div>
              <p className="card-body" style={{ fontSize: 12, margin: '4px 0 8px' }}>
                {t('control.failure.body')}
              </p>
              <div className="failure-recovery">
                <i className="ph ph-arrow-bend-down-right dim" aria-hidden="true" />
                fix-session-timeout → coding-agent-1
                <span className="tag tag-run" style={{ marginLeft: 4 }}>
                  <span className="status-dot is-pulsing" style={{ background: 'var(--rt-run)' }} />
                  {t('control.failure.rerunning')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
