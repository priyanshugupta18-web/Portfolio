import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function ContactForm() {
  const form = useRef(null);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      setMessage(
        "Email service is not configured yet. Please email me directly instead.",
      );
      return;
    }

    setStatus("sending");
    setMessage("");
    try {
      await emailjs.sendForm(serviceId, templateId, form.current, {
        publicKey,
      });
      form.current.reset();
      setStatus("success");
      setMessage("Message sent. I will get back to you soon.");
    } catch (error) {
      setStatus("error");
      const detail = error?.text?.trim();
      setMessage(
        detail
          ? `EmailJS: ${detail}`
          : "Something went wrong. Please try again or email me directly.",
      );
    }
  }

  return (
    <form className="contact-form" ref={form} onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          <span>Your name</span>
          <input
            type="text"
            name="name"
            placeholder="Priyanshu"
            autoComplete="name"
            required
          />
        </label>
        <label>
          <span>Email address</span>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </label>
      </div>
      <label>
        <span>Subject</span>
        <input type="text" name="title" placeholder="A new project" required />
      </label>
      <label>
        <span>Tell me about it</span>
        <textarea
          name="message"
          rows="5"
          placeholder="A few details about your idea, timeline, or goals..."
          required
        />
      </label>
      <input
        type="hidden"
        name="time"
        value={new Date().toLocaleString()}
        readOnly
      />
      <div className="form-footer">
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              <LoaderCircle className="form-spinner" size={17} /> Sending
            </>
          ) : (
            <>
              Send message <ArrowUpRight size={17} />
            </>
          )}
        </button>
        {message && (
          <p className={`form-message ${status}`} role="status">
            {status === "success" && <CheckCircle2 size={15} />}
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
