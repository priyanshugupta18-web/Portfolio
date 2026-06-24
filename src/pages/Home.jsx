import { Navbar, Hero } from '../components'

function Home() {
  return (
    <div className="min-h-screen w-full bg-bg">
      <div className="sticky top-0 z-50 flex h-14 w-full items-center border-b border-line bg-box/95 backdrop-blur">
        <div className="w-full">
          <Navbar />
        </div>
      </div>
      <main className="mx-auto w-full max-w-5xl px-6">
        <Hero />
      </main>
    </div>
  )
}

export default Home
