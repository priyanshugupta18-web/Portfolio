import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../../lib/animations'

export default function SectionHeading({ title, description }) {
  return (
    <motion.header
      className="simple-heading"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <motion.h2 variants={staggerItem}>
        {title.split(' ').map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            className="heading-word"
            whileHover={{ color: '#f2b51c' }}
          >
            {word}{' '}
          </motion.span>
        ))}
      </motion.h2>
      {description && <motion.p variants={staggerItem}>{description}</motion.p>}
    </motion.header>
  )
}
