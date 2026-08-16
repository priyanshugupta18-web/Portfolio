import { motion } from 'framer-motion'

const letters = ['P', 'G']

export default function PageLoader() {
  return (
    <motion.div
      className="page-loader page-loader--cinematic"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
    >
      <div className="loader-aurora loader-aurora-one" aria-hidden="true" />
      <div className="loader-aurora loader-aurora-two" aria-hidden="true" />

      <motion.div
        className="loader-orbit"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      >
        <i />
      </motion.div>

      <div className="loader-center">
        <div className="loader-wordmark" aria-label="Loading portfolio">
          {letters.map((letter, index) => (
            <motion.span
              key={letter}
              initial={{ y: '110%', opacity: 0, rotateX: -80 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{
                delay: 0.15 + index * 0.1,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        <div className="loader-track" aria-hidden="true">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.45, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          Crafting experience
        </motion.p>
      </div>
    </motion.div>
  )
}
