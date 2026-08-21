const QUESTIONS = [
  {
    q: 'What is Rotaris?',
    a: 'A desktop application for running and supervising a team of specialized coding agents — an orchestration harness with a control plane, not a chat window with a single agent behind it.',
  },
  {
    q: 'Does Rotaris require Python?',
    a: 'No. The desktop application ships as a standalone build with the runtime bundled. Python is only needed for the optional CLI installation under Advanced installation.',
  },
  {
    q: 'Does my code leave my computer?',
    a: 'The application and engine run locally, and your repository is never uploaded. Prompts and the code context needed for a task are sent to the model providers you configure — with local models, nothing leaves the machine. The only connection Rotaris makes on its own is the start-up update check against GitHub.',
  },
  {
    q: 'Which model providers can I use?',
    a: 'OAuth providers such as GitHub Copilot, API-key providers such as Anthropic and OpenAI, local models, and any OpenAI-compatible endpoint. Each persona can use a different model.',
  },
  {
    q: 'Can several agents work concurrently?',
    a: 'Yes. Independent tasks run in parallel; dependent tasks wait for their prerequisites. Fan-out, depth, and iteration limits keep concurrency bounded.',
  },
  {
    q: 'How does Rotaris decide a task is finished?',
    a: "A verifier checks the completed work against the mission's requirements and tests before the task is declared done. You review the completion summary and accept the result.",
  },
  {
    q: 'Can I pause or cancel a run?',
    a: 'At any time. Cancellation propagates through the delegation tree, so stopping a parent cleanly stops all of its descendants.',
  },
  {
    q: 'Is there a command-line version?',
    a: 'Yes — a terminal interface is available for headless and scripted use, installed via pip. The desktop application is the primary product.',
  },
  {
    q: 'What happened to geraet-ai?',
    a: 'It was renamed. Rotaris is the same orchestration engine and desktop application under its public name; the repository and the Python packages moved with it. Older links to geraet-ai still resolve.',
  },
  {
    q: 'How do I report a security issue?',
    a: "Through the repository's security policy on GitHub — see the security page for the disclosure process and response expectations.",
  },
]

export default function Faq() {
  return (
    <section id="faq" className="section faq">
      <div className="wrap">
        <h6>FAQ</h6>
        <h2 style={{ marginBottom: 32 }}>Questions, answered plainly</h2>
        <div className="faq-list">
          {QUESTIONS.map((item) => (
            <details className="faq-item" key={item.q}>
              <summary>
                {item.q}
                <i className="ph ph-plus" aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
