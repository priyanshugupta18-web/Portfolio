import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, LoaderCircle } from 'lucide-react'
import { staggerContainer, staggerItem } from '../../lib/animations'

const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}

export default function ContactForm() {
  const form = useRef(null)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey) {
      setStatus('error')
      setMessage('Email service is not configured yet. Please email me directly instead.')
      return
    }

    setStatus('sending')
    setMessage('')

    try {
      await emailjs.sendForm(emailConfig.serviceId, emailConfig.templateId, form.current, {
        publicKey: emailConfig.publicKey,
      })
      form.current.reset()
      setStatus('success')
      setMessage('Message sent. I will get back to you soon.')
    } catch (error) {
      const detail = error?.text?.trim()
      setStatus('error')
      setMessage(detail ? `EmailJS: ${detail}` : 'Something went wrong. Please try again or email me directly.')
    }
  }

  return (
    <motion.form
      className="contact-form"
      ref={form}
      onSubmit={handleSubmit}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div className="form-row" variants={staggerItem}>
        <label>
          <span>Your name</span>
          <input type="text" name="name" placeholder="Priyanshu" autoComplete="name" required />
        </label>
        <label>
          <span>Email address</span>
          <input type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
        </label>
      </motion.div>

      <motion.label variants={staggerItem}>
        <span>Subject</span>
        <input type="text" name="title" placeholder="A new project" required />
      </motion.label>
      <motion.label variants={staggerItem}>
        <span>Tell me about it</span>
        <textarea name="message" rows="5" placeholder="A few details about your idea, timeline, or goals..." required />
      </motion.label>
      <input type="hidden" name="time" value={new Date().toLocaleString()} readOnly />

      <motion.div className="form-footer" variants={staggerItem}>
        <motion.button
          type="submit"
          disabled={status === 'sending'}
          whileHover={{ scale: status === 'sending' ? 1 : 1.03, y: status === 'sending' ? 0 : -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {status === 'sending' ? (
            <>
              <LoaderCircle className="form-spinner" size={17} /> Sending
            </>
          ) : (
            <>
              Send message <ArrowUpRight size={17} />
            </>
          )}
        </motion.button>
        {message && (
          <motion.p
            className={`form-message ${status}`}
            role="status"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {status === 'success' && <CheckCircle2 size={15} />}
            {message}
          </motion.p>
        )}
      </motion.div>
    </motion.form>
  )
}
