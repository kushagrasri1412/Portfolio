"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          style={{ background: "rgba(4,10,24,0.92)", backdropFilter: "blur(12px)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl flex flex-col"
            style={{
              maxHeight: "90vh",
              border: "1px solid var(--border-bright)",
              background: "var(--space-bg)",
              boxShadow: "0 0 60px rgba(0,255,255,0.08), 0 0 120px rgba(0,255,255,0.03)",
            }}
          >
            {/* Corner brackets */}
            {[
              { top: -1, left: -1, borderTop: "2px solid var(--accent-cyan)", borderLeft: "2px solid var(--accent-cyan)" },
              { top: -1, right: -1, borderTop: "2px solid var(--accent-cyan)", borderRight: "2px solid var(--accent-cyan)" },
              { bottom: -1, left: -1, borderBottom: "2px solid var(--accent-cyan)", borderLeft: "2px solid var(--accent-cyan)" },
              { bottom: -1, right: -1, borderBottom: "2px solid var(--accent-cyan)", borderRight: "2px solid var(--accent-cyan)" },
            ].map((style, i) => (
              <div key={i} className="absolute w-4 h-4 pointer-events-none" style={style} />
            ))}

            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 shrink-0"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: "var(--accent-cyan)", boxShadow: "0 0 6px var(--accent-cyan)" }}
                  />
                  <span
                    className="display-heading text-sm tracking-widest uppercase"
                    style={{ color: "var(--accent-cyan)" }}
                  >
                    Personnel Dossier
                  </span>
                </div>
                <span
                  className="hidden md:inline"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    color: "var(--text-muted)",
                    letterSpacing: "2px",
                    opacity: 0.5,
                  }}
                >
                  // K.SRIVASTAVA
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Meta badges */}
                <div className="hidden md:flex items-center gap-2">
                  <span
                    className="data-meta"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      letterSpacing: "1.5px",
                      padding: "2px 8px",
                      border: "1px solid rgba(16,185,129,0.4)",
                      color: "#10b981",
                    }}
                  >
                    OPEN
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      letterSpacing: "1.5px",
                      padding: "2px 8px",
                      border: "1px solid var(--border)",
                      color: "var(--text-muted)",
                    }}
                  >
                    2026_ACTIVE
                  </span>
                </div>

                {/* Download */}
                <a
                  href="/resume.pdf"
                  download="Kushagra_Srivastava_Resume.pdf"
                  className="flex items-center gap-1.5 px-3 py-1.5 transition-all hover:opacity-80"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "1.5px",
                    color: "var(--accent-cyan)",
                    border: "1px solid var(--border)",
                    textDecoration: "none",
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  DOWNLOAD
                </a>

                {/* Close */}
                <button
                  onClick={onClose}
                  className="flex items-center justify-center w-7 h-7 transition-all hover:opacity-70"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.9rem",
                    color: "var(--text-muted)",
                    border: "1px solid var(--border)",
                  }}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Telemetry strip */}
            <div
              className="flex items-center gap-6 px-6 py-2 shrink-0"
              style={{ borderBottom: "1px solid var(--border)", background: "rgba(0,255,255,0.02)" }}
            >
              {[
                { label: "NAME", value: "KUSHAGRA SRIVASTAVA" },
                { label: "ROLE", value: "ASPIRING SOFTWARE ENGINEER" },
                { label: "STATUS", value: "OPEN_TO_HIRE" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--text-muted)", opacity: 0.5, letterSpacing: "1px" }}>
                    {item.label}:
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--accent-cyan)", letterSpacing: "1px" }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* PDF viewer */}
            <div className="relative flex-1 overflow-hidden" style={{ minHeight: "60vh" }}>
              {/* Scan line overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,255,0.012) 3px, rgba(0,255,255,0.012) 4px)",
                }}
              />
              <iframe
                src="/resume.pdf#toolbar=0"
                className="w-full h-full"
                style={{
                  border: "none",
                  minHeight: "65vh",
                  filter: "brightness(0.97)",
                }}
                title="Kushagra Srivastava Resume"
              />
            </div>

            {/* Footer */}
            <div
              className="flex items-center justify-between px-6 py-2 shrink-0"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--text-muted)", opacity: 0.35, letterSpacing: "2px" }}>
                CLASSIFICATION: OPEN // DISTRIBUTION: UNRESTRICTED
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--text-muted)", opacity: 0.35, letterSpacing: "2px" }}>
                DOC_ID: KS_2026_RESUME
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
