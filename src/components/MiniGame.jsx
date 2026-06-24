import { Crosshair, RotateCcw, Shield, Zap } from 'lucide-react'

const boardCells = [
  'spawn',
  '',
  'boost',
  '',
  '',
  'bug',
  '',
  'shield',
  'boost',
  '',
  'bug',
  '',
  '',
  'shield',
  '',
  'goal',
]

const cellStyles = {
  spawn: 'border-accent bg-field text-accent',
  boost: 'border-line bg-bg text-accent',
  bug: 'border-line bg-bg text-muted',
  shield: 'border-line bg-bg text-accent',
  goal: 'border-accent bg-bg text-accent',
}

const cellLabels = {
  spawn: '<>',
  boost: '+',
  bug: 'x',
  shield: '#',
  goal: '=>',
}

function MiniGame() {
  return (
    <aside className="border border-line bg-box p-4 sm:p-5" id="game">
      <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Mini Game</p>
          <h2 className="mt-2 text-xl font-semibold text-main">Debug Runner</h2>
        </div>
        <Crosshair className="shrink-0 text-accent" size={22} />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="border border-line p-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">score</p>
          <p className="mt-2 text-2xl font-bold text-main">000</p>
        </div>
        <div className="border border-line p-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">lives</p>
          <p className="mt-2 text-2xl font-bold text-main">03</p>
        </div>
        <div className="border border-line p-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">level</p>
          <p className="mt-2 text-2xl font-bold text-main">01</p>
        </div>
      </div>

      <div className="mt-5 border border-line bg-bg p-3">
        <div className="grid aspect-square grid-cols-4 gap-2">
          {boardCells.map((cell, index) => (
            <button
              aria-label={`Game tile ${index + 1}`}
              className={`flex min-h-12 items-center justify-center border font-mono text-sm transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                cellStyles[cell] ?? 'border-line bg-box text-muted'
              }`}
              key={`${cell}-${index}`}
              type="button"
            >
              {cellLabels[cell]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button
          className="inline-flex h-11 items-center justify-center gap-2 border border-accent px-4 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:bg-field focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          type="button"
        >
          <Zap size={15} />
          Start
        </button>
        <button
          className="inline-flex h-11 items-center justify-center gap-2 border border-line px-4 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          type="button"
        >
          <RotateCcw size={15} />
          Reset
        </button>
      </div>

      <div className="mt-5 border border-line p-4">
        <div className="flex items-start gap-3">
          <Shield className="mt-1 shrink-0 text-accent" size={18} />
          <p className="text-sm leading-6 text-muted">
            Guide the runner from <span className="font-mono text-accent">&lt;&gt;</span> to{' '}
            <span className="font-mono text-accent">=&gt;</span>, collect boosts, and avoid bugs.
          </p>
        </div>
      </div>
    </aside>
  )
}

export default MiniGame
