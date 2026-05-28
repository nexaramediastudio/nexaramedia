"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

const WA_NUMBER = "94711137748";

const SERVICE_OPTIONS = [
  "Web Development",
  "Branding & Identity",
  "AI Automation",
  "Business Systems",
  "Creative Media",
  "Digital Experience",
  "Multiple Services",
  "Not sure yet",
];

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden bg-bg-primary">
      <div className="grain-overlay" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <SectionLabel number="07" title="START A PROJECT" className="mb-12" />

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2
              className="font-display font-light leading-[1.1] text-text-primary"
              style={{ fontSize: "var(--text-display)" }}
            >
              <span className="block">Let&apos;s build</span>
              <span className="block">something</span>
              <span className="block">remarkable.</span>
            </h2>
            <p className="mt-6 font-sans text-base font-light text-text-secondary">
              Tell us about your project. We&apos;ll get back within 24 hours.
            </p>

            <div className="mt-12 space-y-8">
              <div>
                <p className="mb-2 font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-text-muted">
                  EMAIL
                </p>
                <a
                  href="mailto:nexaramediastudio@gmail.com"
                  className="font-sans text-[15px] font-light text-text-primary transition-colors hover:text-gold"
                  data-cursor="link"
                >
                  nexaramediastudio@gmail.com
                </a>
              </div>
              <div>
                <p className="mb-2 font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-text-muted">
                  WHATSAPP
                </p>
                <a
                  href="https://wa.me/94711137748"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[15px] font-light text-text-primary transition-colors hover:text-gold"
                  data-cursor="link"
                >
                  +94 71 113 7748
                </a>
              </div>
              <div className="flex gap-4 font-sans text-xs text-text-muted">
                <a
                  href="https://www.instagram.com/nexaramediastudio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-text-primary"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/share/18gLjUTbY6/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-text-primary"
                >
                  Facebook
                </a>
              </div>
              <div className="flex items-center gap-2 pt-4">
                <span className="pulse-dot" />
                <span className="font-sans text-xs text-text-secondary">
                  Currently available for new projects
                </span>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const name    = fd.get("name")    as string;
              const email   = fd.get("email")   as string;
              const company = fd.get("company") as string;
              const service = fd.get("service") as string;
              const message = fd.get("message") as string;
              const text = encodeURIComponent(
                `Hi Nexara Media! 👋\n\n` +
                `*Name:* ${name}\n` +
                `*Email:* ${email}\n` +
                `*Company:* ${company}\n` +
                `*Service:* ${service}\n` +
                `*Message:* ${message}`
              );
              window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, "_blank");
            }}
          >
            {[
              { label: "Your Name", type: "text", name: "name" },
              { label: "Your Email", type: "email", name: "email" },
              { label: "Company Name", type: "text", name: "company" },
            ].map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-text-muted"
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  className="w-full border-b border-[var(--border)] bg-transparent py-3 font-sans text-[15px] font-light text-text-primary outline-none transition-colors focus:border-gold placeholder:text-text-muted"
                  placeholder=""
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="service"
                className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-text-muted"
              >
                What do you need?
              </label>
              <select
                id="service"
                name="service"
                className="w-full appearance-none border-b border-[var(--border)] bg-transparent py-3 font-sans text-[15px] font-light text-text-primary outline-none transition-colors focus:border-gold"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a service
                </option>
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-bg-card">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-text-muted"
              >
                Tell us more
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full resize-none border-b border-[var(--border)] bg-transparent py-3 font-sans text-[15px] font-light text-text-primary outline-none transition-colors focus:border-gold"
              />
            </div>

            <button
              type="submit"
              data-cursor="link"
              className="w-full bg-gold py-4 font-sans text-[13px] font-medium tracking-[0.12em] text-bg-primary transition-all duration-300 hover:-translate-y-px hover:bg-gold-soft"
              style={{ borderRadius: 4 }}
            >
              Send Message →
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
