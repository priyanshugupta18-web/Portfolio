import { motion } from 'framer-motion'

/* --------------------------------------------------------------------------
   Pre-compute random particle data outside components (pure, stable)
   -------------------------------------------------------------------------- */
const PARTICLE_DATA = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: Math.random() * 220 - 110,
  size: 2.5 + Math.random() * 3,
  dy: 55 + Math.random() * 60,
  drift: Math.random() * 40 - 20,
  duration: 1.4 + Math.random() * 0.6,
  repeatDelay: 0.8 + Math.random() * 1.2,
}))

/* --------------------------------------------------------------------------
   Particle — tiny sparkling dot that drifts upward
   -------------------------------------------------------------------------- */
function Particle({ data, baseDelay }) {
  const { x, size, dy, drift, duration, repeatDelay } = data
  return (
    <motion.span
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '50%',
        bottom: 0,
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#f2b51c',
        boxShadow: '0 0 6px 2px rgba(242,181,28,0.55)',
        translateX: x,
      }}
      initial={{ opacity: 0, y: 0, scale: 0.4 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [0, -dy],
        x: [x, x + drift],
        scale: [0.4, 1.1, 0.6, 0],
      }}
      transition={{
        delay: baseDelay,
        duration,
        ease: 'easeOut',
        repeat: Infinity,
        repeatDelay,
      }}
    />
  )
}

/* --------------------------------------------------------------------------
   Clean amber tile monogram — matches the navbar brand mark exactly
   -------------------------------------------------------------------------- */
function MonogramMark() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: 52,
        height: 52,
        flexShrink: 0,
        borderRadius: 14,
        background: '#f2b51c',
        display: 'grid',
        placeItems: 'center',
        boxShadow: '0 8px 28px rgba(242,181,28,0.45), 0 2px 8px rgba(0,0,0,0.3)',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        fontSize: 20,
        fontWeight: 800,
        color: '#111113',
        letterSpacing: '-0.04em',
        lineHeight: 1,
        userSelect: 'none',
      }}
    >
      PG
    </motion.div>
  )
}

/* --------------------------------------------------------------------------
   Character-by-character stagger for the name
   -------------------------------------------------------------------------- */
const CHARS = ['P', 'r', 'i', 'y', 'a', 'n', 's', 'h', 'u']

function AnimatedName() {
  return (
    <div
      aria-label="Priyanshu"
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 1,
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        fontWeight: 800,
        fontSize: 'clamp(34px, 7vw, 52px)',
        letterSpacing: '-0.04em',
        color: '#f4f3ef',
        lineHeight: 1,
      }}
    >
      {CHARS.map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            delay: 0.3 + i * 0.055,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: 'inline-block' }}
        >
          {ch}
        </motion.span>
      ))}
    </div>
  )
}

/* --------------------------------------------------------------------------
   Scan line that sweeps across the logo area once
   -------------------------------------------------------------------------- */
function ScanLine() {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(242,181,28,0.55), transparent)',
        pointerEvents: 'none',
      }}
      initial={{ top: '0%', opacity: 0 }}
      animate={{ top: ['0%', '100%', '100%'], opacity: [0, 0.8, 0] }}
      transition={{ delay: 0.6, duration: 0.9, ease: 'easeInOut' }}
    />
  )
}

/* --------------------------------------------------------------------------
   Viewfinder corner brackets
   -------------------------------------------------------------------------- */
const CORNERS = ['top-left', 'top-right', 'bottom-left', 'bottom-right']

function Brackets() {
  return (
    <>
      {CORNERS.map((pos) => {
        const isTop = pos.startsWith('top')
        const isLeft = pos.endsWith('left')
        return (
          <motion.div
            aria-hidden="true"
            key={pos}
            style={{
              position: 'absolute',
              [isTop ? 'top' : 'bottom']: 0,
              [isLeft ? 'left' : 'right']: 0,
              width: 18,
              height: 18,
              borderTop: isTop ? '1.5px solid rgba(242,181,28,0.55)' : 'none',
              borderBottom: !isTop ? '1.5px solid rgba(242,181,28,0.55)' : 'none',
              borderLeft: isLeft ? '1.5px solid rgba(242,181,28,0.55)' : 'none',
              borderRight: !isLeft ? '1.5px solid rgba(242,181,28,0.55)' : 'none',
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.4, ease: 'easeOut' }}
          />
        )
      })}
    </>
  )
}

/* --------------------------------------------------------------------------
   Main PageLoader
   -------------------------------------------------------------------------- */
export default function PageLoader() {
  return (
    <motion.div
      className="page-loader"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 0.97,
        filter: 'blur(6px)',
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      }}
      style={{ overflow: 'hidden' }}
    >
      {/* Ambient aurora blobs */}
      <div className="loader-aurora loader-aurora-one" aria-hidden="true" />
      <div className="loader-aurora loader-aurora-two" aria-hidden="true" />

      {/* Concentric pulse rings */}
      {[480, 320].map((size, i) => (
        <motion.div
          key={size}
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: `min(${size}px, ${size * 0.17}vw + ${size * 0.5}px)`,
            height: `min(${size}px, ${size * 0.17}vw + ${size * 0.5}px)`,
            border: `1px solid rgba(242,181,28,${0.10 + i * 0.08})`,
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
          animate={{ scale: [1, 1.2 + i * 0.05, 1], opacity: [0.5, 0.12, 0.5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        />
      ))}

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Viewfinder frame */}
        <div style={{ position: 'relative', padding: '18px 28px 16px', marginBottom: 28 }}>
          <Brackets />
          <ScanLine />

          {/* Monogram + animated name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <MonogramMark />
            <AnimatedName />
          </div>

          {/* Glowing underline */}
          <motion.div
            aria-hidden="true"
            style={{
              height: 2,
              marginTop: 10,
              background: 'linear-gradient(90deg, transparent, #f2b51c, #ffe08a, transparent)',
              borderRadius: 999,
              transformOrigin: 'left',
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Rising particle sparks */}
          <div style={{ position: 'relative', height: 0 }}>
            {PARTICLE_DATA.map((p) => (
              <Particle key={p.id} data={p} baseDelay={0.9 + p.id * 0.09} />
            ))}
          </div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.55, ease: 'easeOut' }}
          style={{
            margin: 0,
            color: '#6b6870',
            fontFamily: 'ui-monospace, Menlo, Consolas, monospace',
            fontSize: 10,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
          }}
        >
           Loading...
        </motion.p>

        {/* Progress bar */}
        <motion.div
          aria-hidden="true"
          style={{
            marginTop: 22,
            width: 'min(200px, 50vw)',
            height: 2,
            background: 'rgba(255,255,255,0.07)',
            borderRadius: 999,
            overflow: 'hidden',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #f2b51c, #ffe08a)',
              borderRadius: 999,
              transformOrigin: 'left',
              boxShadow: '0 0 8px rgba(242,181,28,0.6)',
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.65, duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
