import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import { Footer, PageLoader, ScrollProgress } from '../components'

const loaderDuration = 420

export default function RootLayout() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), loaderDuration)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <AnimatePresence mode="wait">
        {loading ? (
          <PageLoader key="loader" />
        ) : (
          <motion.div
            key="site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <ScrollProgress />
            <Outlet />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
