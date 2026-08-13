export const revealOnScroll = {
  initial: { opacity: 0, y: 16, filter: 'blur(3px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.08, margin: '0px 0px -60px' },
  transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] },
}

export const heroReveal = {
  hidden: { opacity: 0, y: 18, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
}
