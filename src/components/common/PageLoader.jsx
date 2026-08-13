import { LoaderCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PageLoader() {
  return (
    <motion.div
      className="page-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeOut' } }}
    >
      <LoaderCircle className="loader-spinner" size={34} aria-hidden="true" />
      <p>Loading...</p>
    </motion.div>
  )
}
