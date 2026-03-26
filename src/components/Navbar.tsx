"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useActiveSection, useScrollDirection } from "@/hooks/useActiveSection";

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
    </motion.nav>
  );
}
