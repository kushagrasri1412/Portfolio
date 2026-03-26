"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ABOUT, HERO } from "@/data/portfolio";
import { RevealHeading, RevealLabel, RevealBlock, RevealList, revealItem } from "./TextReveal";

const ResumeModal = dynamic(() => import("./ResumeModal"), { ssr: false });

export default function AboutSection() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <section id="about" className="section-wrapper section-bg-1 relative overflow-hidden">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="panel-accent mb-14">
          <RevealLabel className="mono-label text-[0.8rem]">SECTOR // 01</RevealLabel>
          <RevealHeading
            className="display-heading text-4xl md:text-6xl mt-3"
            style={{ color: "var(--accent-cyan)" }}
            delay={0.15}
          >
            Mission Control
          </RevealHeading>
        </div>

        {/* Profile photo + FAANG summary */}
        <div className="flex flex-col md:flex-row gap-10 mb-14 items-center md:items-start">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0"
          >
            <div
              className="relative w-44 h-44 md:w-52 md:h-52 overflow-hidden"
              style={{
                border: "2px solid var(--border-bright)",
                boxShadow: "0 0 30px rgba(0,255,255,0.1)",
              }}
            >
              <Image
                src="/profile.png"
                alt="Kushagra Srivastava"
                fill
                className="object-cover"
                priority
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,255,0.03) 3px, rgba(0,255,255,0.03) 4px)",
                }}
              />
            </div>
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="mono-label text-[0.55rem]" style={{ color: "var(--text-muted)", opacity: 0.5 }}>
                ID_VERIFIED
              </span>
            </div>
            {/* View Dossier button under photo */}
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              onClick={() => setResumeOpen(true)}
              className="mt-3 w-full flex items-center justify-center gap-2 py-2 transition-all hover:opacity-80 group"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "2px",
                color: "var(--accent-cyan)",
                border: "1px solid var(--border)",
                background: "rgba(0,255,255,0.03)",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              VIEW DOSSIER
            </motion.button>
          </motion.div>

          {/* FAANG-style recruiter summary */}
          <div className="flex-1">
            <RevealBlock delay={0.1} className="mb-5">
              <p className="body-text leading-relaxed" style={{ fontSize: "1.15rem" }}>
                Backend-focused aspiring software engineer at Arizona State University pursuing a 4+1 BS/MS in Computer Science. Proven track record building <span style={{ color: "var(--accent-cyan)" }}>production-grade cloud-native systems</span> with measurable impact.
              </p>
            </RevealBlock>
            <RevealBlock delay={0.2}>
              <div className="hud-card p-5" style={{ borderLeft: "2px solid var(--accent-cyan)" }}>
                <span className="mono-label text-[0.65rem] block mb-3" style={{ color: "var(--text-muted)" }}>// IMPACT HIGHLIGHTS</span>
                <ul className="space-y-2.5">
                  {[
                    "99% backend reliability across 500+ daily production requests",
                    "Zero auth failures with sub-450ms p95 latency at scale",
                    "17% error rate reduction through instrumentation & telemetry",
                    "10K+ API calls/month secured via least-privilege IAM policies",
                  ].map((item, i) => (
                    <li key={i} className="text-[14px] flex items-start gap-2.5" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
                      <span className="mt-1 text-[9px]" style={{ color: "var(--accent-orange)" }}>&#9670;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>

        {/* Telemetry stats */}
        <RevealList className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14" delay={0.1} stagger={0.08}>
          {HERO.stats.map((stat) => (
            <motion.div key={stat.label} variants={revealItem} className="hud-card p-6 text-center">
              <span className="display-heading text-2xl md:text-3xl block" style={{ color: "var(--accent-cyan)" }}>
                {stat.value}
              </span>
              <span className="tel-label mt-2 block text-[0.7rem]">{stat.label}</span>
            </motion.div>
          ))}
        </RevealList>

        <div className="rule-glow mb-14" />

        {/* Education + Quick facts */}
        <RevealList className="grid md:grid-cols-2 gap-5" delay={0.1} stagger={0.1}>
          <motion.div variants={revealItem} className="hud-card p-6">
            <span className="mono-label text-[0.7rem]" style={{ color: "var(--text-muted)" }}>// EDUCATION</span>
            <p className="text-[16px] font-medium mt-4 mb-1" style={{ color: "var(--text-main)", letterSpacing: "0.5px" }}>{ABOUT.education.school}</p>
            <p className="text-[14px]" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{ABOUT.education.degree}</p>
            <p className="text-[13px] mb-5" style={{ color: "var(--text-muted)", opacity: 0.5, fontWeight: 300 }}>{ABOUT.education.period}</p>
            <div className="flex flex-wrap gap-2">
              {ABOUT.education.coursework.map((c) => (
                <span key={c} className="skill-tag text-[0.8rem] py-1.5 px-3" style={{ borderColor: "rgba(0,255,255,0.08)" }}>
                  {c}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={revealItem} className="hud-card p-6">
            <span className="mono-label text-[0.7rem]" style={{ color: "var(--text-muted)" }}>// QUICK FACTS</span>
            <div className="mt-4">
              {[
                { label: "Location", value: "Tempe, AZ" },
                { label: "Focus", value: "Backend + AI Systems" },
                { label: "Status", value: "Open to opportunities" },
                { label: "Graduation", value: "May 2027" },
              ].map((item, i) => (
                <div key={item.label} className="flex justify-between items-center py-3.5" style={{ borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
                  <span className="text-[14px]" style={{ color: "var(--text-muted)", fontWeight: 300, letterSpacing: "0.5px" }}>{item.label}</span>
                  <span className="text-[14px]" style={{ color: "var(--text-main)", fontWeight: 400, letterSpacing: "0.5px" }}>{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </RevealList>
      </div>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}
