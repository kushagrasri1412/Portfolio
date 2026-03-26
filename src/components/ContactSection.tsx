"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CONTACT } from "@/data/portfolio";
import { RevealHeading, RevealLabel, RevealBlock, RevealList, revealItem } from "./TextReveal";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 as const },
  transition: { delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
});

export default function ContactSection() {
  const [formData, setFormData] = useState({ email: "", subject: "", content: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:srivkush1412@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.email}\n\n${formData.content}`)}`;
  };

  return (
    <section id="contact" className="section-wrapper section-bg-3 relative overflow-hidden">
      <div className="max-w-3xl mx-auto w-full relative z-10">
        <div className="panel-accent mb-14 text-center">
          <RevealLabel className="mono-label text-[0.8rem]">SECTOR // 06</RevealLabel>
          <RevealHeading
            className="display-heading text-4xl md:text-6xl mt-3"
            style={{ color: "var(--accent-cyan)" }}
            delay={0.15}
          >
            Establish Uplink
          </RevealHeading>
        </div>

        <RevealBlock delay={0.15}>
          <p className="text-center body-text text-[15px] mb-12">
            Interested in discussing an opportunity or collaboration? Open a communication channel.
          </p>
        </RevealBlock>

        {/* Destination indicator */}
        <motion.div {...fadeUp(0.2)} className="hud-card max-w-lg mx-auto mb-8 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full" style={{ background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
            <span className="tel-label text-[0.7rem]" style={{ letterSpacing: "2px" }}>UPLINK TARGET</span>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--accent-cyan)", letterSpacing: "1px" }}>
            srivkush1412@gmail.com
          </span>
        </motion.div>

        {/* Form */}
        <motion.form
          {...fadeUp(0.25)}
          onSubmit={handleSubmit}
          className="space-y-5 max-w-lg mx-auto mb-12"
        >
          <div>
            <label className="tel-label text-[0.7rem] mb-2 block" style={{ letterSpacing: "2px" }}>YOUR EMAIL</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              required
              className="contact-input w-full px-4 py-3 text-[14px] outline-none transition-all"
              style={{
                background: "rgba(10,15,30,0.8)",
                border: "1px solid var(--border)",
                color: "var(--text-main)",
                fontFamily: "var(--font-ui)",
                fontWeight: 300,
              }}
            />
          </div>
          <div>
            <label className="tel-label text-[0.7rem] mb-2 block" style={{ letterSpacing: "2px" }}>SUBJECT</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Opportunity details"
              required
              className="contact-input w-full px-4 py-3 text-[14px] outline-none transition-all"
              style={{
                background: "rgba(10,15,30,0.8)",
                border: "1px solid var(--border)",
                color: "var(--text-main)",
                fontFamily: "var(--font-ui)",
                fontWeight: 300,
              }}
            />
          </div>
          <div>
            <label className="tel-label text-[0.7rem] mb-2 block" style={{ letterSpacing: "2px" }}>MESSAGE</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={6}
              placeholder="Tell me about the opportunity..."
              required
              className="contact-input w-full px-4 py-3 text-[14px] outline-none transition-all resize-none"
              style={{
                background: "rgba(10,15,30,0.8)",
                border: "1px solid var(--border)",
                color: "var(--text-main)",
                fontFamily: "var(--font-ui)",
                fontWeight: 300,
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 text-[12px] tracking-widest transition-all hover:scale-[1.01]"
            style={{
              fontFamily: "var(--font-mono)",
              background: "rgba(0,255,255,0.06)",
              border: "1px solid var(--border-bright)",
              color: "var(--accent-cyan)",
              textTransform: "uppercase",
              letterSpacing: "3px",
            }}
          >
            Transmit Message
          </button>
        </motion.form>

        {/* Social */}
        <RevealList className="flex gap-4 justify-center mb-8" delay={0.3} stagger={0.08}>
          {[
            { label: "GitHub", href: CONTACT.github, icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"/></svg>
            )},
            { label: "LinkedIn", href: CONTACT.linkedin, icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            )},
            { label: "Email", href: "mailto:srivkush1412@gmail.com", icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            )},
          ].map((s) => (
            <motion.a
              key={s.label}
              variants={revealItem}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center transition-all duration-200"
              style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}
            >
              {s.icon}
            </motion.a>
          ))}
        </RevealList>

        <motion.p {...fadeUp(0.4)} className="text-center" style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-muted)", opacity: 0.4, letterSpacing: "2px" }}>
          srivkush1412@gmail.com
        </motion.p>

        <motion.p {...fadeUp(0.45)} className="text-center mt-14" style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-muted)", opacity: 0.25, letterSpacing: "3px" }}>
          DESIGNED & BUILT // K.SRIVASTAVA
        </motion.p>
      </div>
    </section>
  );
}
