"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EXPERIENCES } from "@/data/portfolio";
import { RevealHeading, RevealLabel, RevealList, revealItem } from "./TextReveal";

const STATUS_MAP: Record<string, string> = {
  "Aug 2025 – Present": "DEPLOYED",
  "May 2025 – Aug 2025": "ARCHIVED",
  "Jun 2024 – Aug 2024": "ARCHIVED",
};

export default function ExperienceSection() {
  const [expanded, setExpanded] = useState<number | null>(0); // first card open by default

  return (
    <section id="experience" className="section-wrapper section-bg-3 relative overflow-hidden">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="panel-accent mb-14">
          <RevealLabel className="mono-label text-[0.8rem]">SECTOR // 03</RevealLabel>
          <RevealHeading
            className="display-heading text-4xl md:text-6xl mt-3"
            style={{ color: "var(--accent-cyan)" }}
            delay={0.15}
          >
            Deployments
          </RevealHeading>
        </div>

        <RevealList className="space-y-4" stagger={0.1}>
          {EXPERIENCES.map((exp, i) => {
            const isExpanded = expanded === i;
            return (
              <motion.div
                key={exp.company}
                variants={revealItem}
                className="hud-card overflow-hidden"
              >
                <button
                  onClick={() => setExpanded(isExpanded ? null : i)}
                  className="w-full text-left p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="data-item-header">
                      <h3 className="text-[18px]" style={{ color: "var(--text-main)", fontWeight: 500, letterSpacing: "0.5px" }}>
                        {exp.company}
                      </h3>
                      <span className="data-meta">{STATUS_MAP[exp.period] || "DEPLOYED"}</span>
                    </div>
                    <p className="text-[14px] mt-1.5" style={{ color: "var(--text-muted)", fontWeight: 300, letterSpacing: "0.3px" }}>
                      {exp.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)", opacity: 0.5, letterSpacing: "1px" }}>
                      {exp.period}
                    </span>
                    <svg
                      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round"
                      style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.3s ease", opacity: 0.5 }}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 space-y-5">
                        <div className="rule-glow" />
                        <ul className="space-y-3">
                          {exp.metrics.map((m) => (
                            <li key={m} className="text-[14px] leading-relaxed flex items-start gap-3" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
                              <span className="mt-1.5 text-[9px]" style={{ color: "var(--accent-orange)" }}>&#9670;</span>
                              {m}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2 pt-4">
                          {exp.tech.map((t) => (
                            <span key={t} className="skill-tag text-[0.75rem] py-1 px-3">{t}</span>
                          ))}
                        </div>
                        {exp.cert && (
                          <a
                            href={exp.cert}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 mt-2 py-1.5 px-3 transition-all hover:opacity-80"
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.65rem",
                              letterSpacing: "2px",
                              color: "var(--accent-cyan)",
                              border: "1px solid var(--border)",
                              background: "rgba(0,255,255,0.04)",
                              textTransform: "uppercase",
                            }}
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                              <polyline points="14 2 14 8 20 8"/>
                            </svg>
                            View Certificate
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </RevealList>
      </div>
    </section>
  );
}
