"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useActiveSection, useScrollDirection } from "@/hooks/useActiveSection";
import dynamic from "next/dynamic";

const ResumeModal = dynamic(() => import("./ResumeModal"), { ssr: false });

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" },
] as const;

export default function Navbar() {
  const active = useActiveSection();
  const visible = useScrollDirection();
  const [pastLanding, setPastLanding] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setPastLanding(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (!pastLanding) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -48, opacity: 0 }}
        animate={{ y: visible ? 0 : -48, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(4, 10, 24, 0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-11">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="display-heading text-sm tracking-wider"
            style={{ color: "var(--accent-cyan)" }}
          >
            KS
          </button>

          <div className="hidden md:flex items-center gap-6">
            {SECTIONS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="transition-colors duration-200 relative"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  color: active === item.id ? "var(--accent-cyan)" : "var(--text-muted)",
                }}
              >
                {item.label}
                {active === item.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px"
                    style={{ background: "var(--accent-cyan)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Resume button */}
            <button
              onClick={() => setResumeOpen(true)}
              className="flex items-center gap-1.5 text-xs tracking-wide px-3 py-1 transition-all hover:opacity-80"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
                fontSize: "0.65rem",
                letterSpacing: "1.5px",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              DOSSIER
            </button>

            <button
              onClick={() => scrollTo("contact")}
              className="text-xs tracking-wide px-4 py-1 transition-all"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--accent-cyan)",
                border: "1px solid var(--border)",
                fontSize: "0.68rem",
              }}
            >
              CONTACT
            </button>
          </div>
        </div>
      </motion.nav>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
