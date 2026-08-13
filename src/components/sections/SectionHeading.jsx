import { motion } from 'framer-motion'
import { revealOnScroll } from '../../lib/animations'

export default function SectionHeading({ title, description }) {
  return (
    <motion.header className="simple-heading" {...revealOnScroll}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </motion.header>
  )
}
