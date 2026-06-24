import { ArrowUpRight, Mail } from 'lucide-react'
import MiniGame from './MiniGame'
import { Link } from 'react-router-dom'

const highlights = [
  ['01', 'Frontend Logics', 'Write code with clean component structure and production-grade logics.'],
  ['02', 'Industry experience', 'Building for clients and and Organisations for more than a year'],
  ['03', 'Passionate Learner', 'learning Back-end and System-Design, aspiring Full-stack Developer'],
]

function Hero() {
  return (
    <section
      className="grid min-h-[calc(100vh-3.5rem)] items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:py-20"
    >
      <div>
        <p className="font-mono text-sm tracking-widest text-accent sm:text-base">// hi, my name is</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-main sm:text-6xl lg:text-7xl">
          Priyanshu Gupta.
        </h1>
        <p className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-muted sm:text-5xl lg:text-6xl">
          I build things for the web.
        </p>
        <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
          A frontend developer turning ideas into fast, accessible, and visually sharp web
          experiences. Currently working across multiple real-world projects and learning industry grade practices.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex h-12 items-center justify-center gap-2 border border-accent px-5 font-mono text-sm text-accent transition-colors hover:bg-field focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            to="/projects"
          >
            View Projects
            <ArrowUpRight size={16} />
          </Link>
          <Link
            className="inline-flex h-12 items-center justify-center gap-2 border border-line px-5 font-mono text-sm text-main transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            to="/contact"
          >
            Contact Me
            <Mail size={16} />
          </Link>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {highlights.map(([number, title, detail]) => (
            <div className="border border-line bg-box p-4" key={number}>
              <p className="font-mono text-xs text-accent">{number}</p>
              <h2 className="mt-3 text-sm font-semibold text-main">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{detail}</p>
            </div>
          ))}
        </div>
      </div>

      <MiniGame />
    </section>
  )
}

export default Hero
