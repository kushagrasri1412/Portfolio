"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/data/portfolio";
import { RevealHeading, RevealLabel, RevealList, revealItem } from "./TextReveal";

const VERSION_MAP: Record<string, string> = {
  TOURGAIDE: "v2.0_LIVE",
  PYROCACHE: "BETA",
};

export default function ProjectsSection() {
  const [expanded, setExpanded] = useState<number | null>(0); // first card open by default

  return (
    <section id="projects" className="section-wrapper section-bg-1 relative overflow-hidden">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="panel-accent mb-14">
          <RevealLabel className="mono-label text-[0.8rem]">SECTOR // 04</RevealLabel>
          <RevealHeading
            className="display-heading text-4xl md:text-6xl mt-3"
            style={{ color: "var(--accent-cyan)" }}
            delay={0.15}
          >
            Active Projects
          </RevealHeading>
        </div>

        <RevealList className="space-y-4" stagger={0.1}>
          {PROJECTS.map((project, i) => {
            const isExpanded = expanded === i;
            return (
              <motion.div
                key={project.name}
                variants={revealItem}
                className="hud-card overflow-hidden"
              >
                <button
                  onClick={() => setExpanded(isExpanded ? null : i)}
                  className="w-full text-left p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="data-item-header">
                      <h3 className="display-heading text-xl tracking-wider" style={{ color: "var(--text-main)" }}>
                        {project.name}
                      </h3>
                      <span className="data-meta">{VERSION_MAP[project.name] || "LIVE"}</span>
                    </div>
                    <p className="text-[14px] mt-1.5" style={{ color: "var(--text-muted)", fontWeight: 300, letterSpacing: "0.3px" }}>
                      {project.tagline}
                    </p>
                  </div>
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round"
                    className="shrink-0"
                    style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.3s ease", opacity: 0.5 }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
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
                        <p className="body-text text-[15px]">
                          {project.description}
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {project.metrics.map((m) => (
                            <div key={m} className="flex items-start gap-2.5">
                              <span className="mt-1.5 text-[9px]" style={{ color: "var(--accent-orange)" }}>&#9670;</span>
                              <span className="text-[13px] leading-snug" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{m}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: "1px dashed var(--border)" }}>
                          {project.tech.map((t) => (
                            <span key={t} className="skill-tag text-[0.75rem] py-1 px-3">{t}</span>
                          ))}
                        </div>
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-4 transition-all hover:opacity-80"
                            style={{ color: "var(--accent-cyan)", fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "1.5px" }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"/>
                            </svg>
                            VIEW_SOURCE
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
