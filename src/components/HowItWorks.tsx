import { Fragment } from 'react'

const PIPELINE = [
  { label: 'Define', colour: 'var(--rt-text)' },
  { label: 'Plan', colour: 'var(--rt-text)' },
  { label: 'Delegate', colour: 'var(--rt-text)' },
  { label: 'Execute', colour: 'var(--rt-run)' },
  { label: 'Inspect', colour: 'var(--rt-wait)' },
  { label: 'Verify', colour: 'var(--rt-accent-300)' },
]

const STEPS = [
  {
    index: '01',
    title: 'Define the mission',
    body: 'Describe the change and its acceptance criteria. The requirements engineer turns them into persistent, numbered requirements.',
    control: 'scope, acceptance criteria',
  },
  {
    index: '02',
    title: 'Review the plan',
    body: 'The orchestrator decomposes the mission. Inspect tasks, dependencies, assigned agents, and models before anything runs.',
    control: 'approve, edit, or reject the plan',
  },
  {
    index: '03',
    title: 'Delegate to specialists',
    body: 'Work is routed to purpose-specific agents — analyst, architect, coding agents, tester, librarian — each with its own model and tools.',
    control: 'model routing per role',
  },
  {
    index: '04',
    title: 'Run the team',
    body: 'Independent tasks execute concurrently; dependent work waits for its prerequisites. Iteration, depth, and fan-out limits bound every run.',
    control: 'pause, steer, cancel',
  },
  {
    index: '05',
    title: 'Stay in control',
    body: "Inspect any agent's transcript, tools, and context. Change configuration mid-run or respond to a failure with the recovery in view.",
    control: 'everything, live',
  },
  {
    index: '06',
    title: 'Verify the result',
    body: 'A verifier checks completed work against the requirements before the task is declared finished. Review the evidence, then accept.',
    control: 'the final accept',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section">
      <div className="wrap">
        <h6>How it works</h6>
        <h2 style={{ marginBottom: 14 }}>From mission to verified change</h2>

        <div className="mono pipeline">
          {PIPELINE.map((stage, i) => (
            <Fragment key={stage.label}>
              <span style={{ color: stage.colour }}>{stage.label}</span>
              {i < PIPELINE.length - 1 && <span className="sep">→</span>}
            </Fragment>
          ))}
        </div>

        <div className="grid-cards cols-lg">
          {STEPS.map((step) => (
            <div className="card step-card" key={step.index}>
              <span className="mono step-index">{step.index}</span>
              <span className="card-title">{step.title}</span>
              <p className="card-body">{step.body}</p>
              <div className="card-meta">
                <i className="ph ph-user" aria-hidden="true" />
                You control: {step.control}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
