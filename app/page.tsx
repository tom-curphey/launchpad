import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:px-8 lg:px-12">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-600/10" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <header className="mb-16">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-2xl">
                🚀
              </div>
              <span className="text-xl font-semibold tracking-tight">Launchpad</span>
            </div>
          </header>

          <div className="space-y-8">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              From Launchpad to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
                Live
              </span>
            </h1>

            <p className="max-w-2xl text-xl text-amber-400 font-medium mb-4">
              Align your focus & delivery
            </p>

            <p className="max-w-2xl text-lg text-zinc-400 leading-relaxed">
              Launchpad is an AI-assisted product development platform that takes you from rough idea through definition, planning, development, testing, and deployment. No more chaos, no more{' '}
              <em className="not-italic text-zinc-300">"what are we building again?"</em>
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-zinc-950 font-semibold rounded-full hover:from-amber-400 hover:to-orange-500 transition-all">
                Get Early Access
              </button>
              <button className="px-8 py-4 border border-zinc-700 text-zinc-300 font-semibold rounded-full hover:border-amber-500/50 hover:text-zinc-100 transition-all">
                See How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-6 py-24 sm:px-8 lg:px-12 bg-zinc-900/50">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-12 sm:text-4xl">
            Sound familiar?
          </h2>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                emoji: '📄',
                title: 'Ideas that die in Google Docs',
                description: 'Great concepts that never make it out of the document and into reality.'
              },
              {
                emoji: '📋',
                title: 'Jira tickets the size of novels',
                description: 'Massive requirements docs nobody reads, tickets nobody understands.'
              },
              {
                emoji: '🤷',
                title: 'Three weeks in, nobody knows what we\'re actually building',
                description: 'Scope drift, silent misalignment, and the inevitable "wait, THAT\'S what we\'re making?"'
              }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 hover:border-amber-500/30 transition-all">
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Launchpad Framework */}
      <section className="px-6 py-24 sm:px-8 lg:px-12 bg-zinc-900/50">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-6 sm:text-4xl">
            How Launchpad Works
          </h2>
          <p className="text-xl text-zinc-400 mb-16 max-w-2xl">
            The PAD Method — from idea to live, no chaos required.
          </p>

          {/* Detailed Steps */}
          <div className="space-y-16">
            {[
              {
                step: '01',
                letter: 'P',
                word: 'Pitch',
                title: 'Pitch — Define it.',
                description: 'Turn an idea into a clear product definition. Launchpad discusses your concept with you, explores user flows, identifies gaps, and validates product intent before building.',
                subpoints: [
                  'What are we building?',
                  'Who interacts with it?',
                  'What should happen?',
                  'What decisions need to be made?',
                  'Have we thought through the product sufficiently?'
                ],
                detail: 'Define what you\'re building.'
              },
              {
                step: '02',
                letter: 'A',
                word: 'Assemble',
                title: 'Assemble — Build it.',
                description: 'Turn the Pitch into an executable roadmap and working product. Launchpad breaks down the definition into achievable units, manages development across humans and AI, and surfaces what needs human attention.',
                subpoints: [
                  'Create the roadmap',
                  'Break into executable units',
                  'Controlled development loop',
                  'Technical testing & review',
                  'Project dashboard & oversight'
                ],
                detail: 'Turn it into a working product.'
              },
              {
                step: '03',
                letter: 'D',
                word: 'Deploy',
                title: 'Deploy — Launch it.',
                description: 'Move the assembled product through UAT, pipeline testing, routing and publishing until it is safely live. The human experiences the product before deployment.',
                subpoints: [
                  'User Acceptance Testing',
                  'Pipeline testing & production readiness',
                  'Routing & environment configuration',
                  'Publishing & health verification',
                  'Live product'
                ],
                detail: 'Verify it and take it live.'
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="text-5xl font-bold text-zinc-700">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">{item.title}</h3>
                  <p className="text-zinc-400 leading-relaxed mb-4">{item.description}</p>
                  <ul className="space-y-2 mb-4">
                    {item.subpoints.map((subpoint, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-zinc-500">
                        <span className="text-amber-400 mt-0.5">→</span>
                        <span>{subpoint}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-zinc-600 italic border-l-2 border-amber-500 pl-3">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Flow */}
          <div className="mt-20 pt-8 border-t border-zinc-800">
            <div className="text-center">
              <p className="text-zinc-500 text-sm mb-2">Powered by the PAD Method</p>
              <p className="text-xl">
                <span className="text-amber-400 font-semibold">Pitch</span> → <span className="text-orange-400 font-semibold">Assemble</span> → <span className="text-yellow-400 font-semibold">Deploy</span>
              </p>
              <p className="text-zinc-600 text-sm mt-4 italic">Define it. Build it. Launch it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 sm:px-8 lg:px-12 border-t border-zinc-800">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <p className="text-zinc-300 font-semibold mb-2">Built for teams who actually ship</p>
              <p className="text-sm text-zinc-500">© 2026 Launchpad. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">Twitter</a>
              <a href="#" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">GitHub</a>
              <a href="#" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
