function Footer() {
  return (
    <footer className="border-t border-line bg-box">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-6 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>Designed and built by Priyanshu Gupta.</p>
        <div className="flex gap-4">
          <a className="transition-colors hover:text-accent" href="mailto:priyanshuguptawebdev@gmail.com">
            Email
          </a>
          <a className="transition-colors hover:text-accent" href="https://github.com/techy-p/">
            GitHub
          </a>
          <a className="transition-colors hover:text-accent" href="https://linkedin.com/priyanshugupta18/">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
