import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitContactForm } from "../hooks/useQueries";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { mutateAsync, isPending } = useSubmitContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await mutateAsync({ name, email, message });
      toast.success("Message sent! I'll be in touch soon.");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="py-24 relative"
      style={{
        background: `linear-gradient(rgba(10,10,12,0.92), rgba(10,10,12,0.92)), url('/assets/generated/hero-wedding.dim_1920x1080.jpg') center/cover no-repeat`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label mb-4">Let's Connect</p>
            <h2 className="section-title text-white mb-6">Begin Your Story</h2>
            <p className="text-[oklch(0.68_0_0)] font-sans text-base leading-relaxed font-light mb-12">
              Every great photograph starts with a conversation. Tell me about
              your vision and let's create something unforgettable together.
            </p>
            <div className="space-y-6">
              {[
                { label: "Email", value: "hello@alexmorganphoto.com" },
                { label: "Phone", value: "+1 (212) 555-0147" },
                { label: "Studio", value: "New York City, NY" },
                { label: "Availability", value: "Booking through 2026" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] font-sans uppercase tracking-widest text-[oklch(0.68_0.10_75)] mb-1">
                    {item.label}
                  </p>
                  <p className="text-white font-sans text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              data-ocid="contact.dialog"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-[10px] font-sans uppercase tracking-widest text-[oklch(0.56_0_0)] mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-transparent border border-[oklch(0.31_0.005_210)] text-white font-sans text-sm px-4 py-3 placeholder-[oklch(0.38_0_0)] focus:outline-none focus:border-[oklch(0.68_0.10_75)] transition-colors duration-200"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-[10px] font-sans uppercase tracking-widest text-[oklch(0.56_0_0)] mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-transparent border border-[oklch(0.31_0.005_210)] text-white font-sans text-sm px-4 py-3 placeholder-[oklch(0.38_0_0)] focus:outline-none focus:border-[oklch(0.68_0.10_75)] transition-colors duration-200"
                    data-ocid="contact.input"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-[10px] font-sans uppercase tracking-widest text-[oklch(0.56_0_0)] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  placeholder="Tell me about your event or session..."
                  className="w-full bg-transparent border border-[oklch(0.31_0.005_210)] text-white font-sans text-sm px-4 py-3 placeholder-[oklch(0.38_0_0)] focus:outline-none focus:border-[oklch(0.68_0.10_75)] transition-colors duration-200 resize-none"
                  data-ocid="contact.textarea"
                />
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="btn-gold-filled w-full py-4 text-[11px] flex items-center justify-center gap-2 disabled:opacity-60"
                data-ocid="contact.submit_button"
              >
                {isPending && <Loader2 size={14} className="animate-spin" />}
                {isPending ? "Sending..." : "Send Message"}
              </button>
              {isPending && (
                <div data-ocid="contact.loading_state" className="hidden" />
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
