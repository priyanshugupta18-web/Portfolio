import { motion } from 'framer-motion'

const orbs = [
  { size: 280, x: '8%', y: '18%', color: 'rgba(242,181,28,0.14)', duration: 14 },
  { size: 180, x: '72%', y: '12%', color: 'rgba(177,66,214,0.1)', duration: 11 },
  { size: 120, x: '58%', y: '68%', color: 'rgba(242,181,28,0.08)', duration: 9 },
]

export default function FloatingOrbs() {
  return (
    <div className="floating-orbs" aria-hidden="true">
      {orbs.map((orb, index) => (
        <motion.span
          key={index}
          className="floating-orb"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: orb.color,
          }}
          animate={{
            y: [0, -22, 8, 0],
            x: [0, 14, -10, 0],
            scale: [1, 1.06, 0.96, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
