"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AWARDS } from "@/data/portfolio";
import CertificateModal from "./CertificateModal";
import { RevealHeading, RevealLabel, RevealList, revealItem } from "./TextReveal";

const CERT_PDF_MAP: Record<string, string> = {
  "Claude with Google Vertex AI": "/certificates/claude-vertex-ai.pdf",
  "AI Fluency: Framework & Foundations": "/certificates/ai-fluency.pdf",
};

export default function AwardsSection() {
  const [viewingCert, setViewingCert] = useState<{ url: string; title: string } | null>(null);

  return (
    <section id="awards" className="section-wrapper section-bg-2 relative overflow-hidden">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="panel-accent mb-14">
          <RevealLabel className="mono-label text-[0.8rem]">SECTOR // 05</RevealLabel>
          <RevealHeading
            className="display-heading text-4xl md:text-6xl mt-3"
            style={{ color: "var(--accent-cyan)" }}
            delay={0.15}
          >
            Accolades
          </RevealHeading>
        </div>

        <RevealList className="space-y-4" stagger={0.1}>
          {AWARDS.map((award) => {
            const hasCert = CERT_PDF_MAP[award.title];
            return (
              <motion.div
                key={award.title}
                variants={revealItem}
                className="hud-card p-6"
                style={hasCert ? { cursor: "pointer" } : {}}
                onClick={() => hasCert && setViewingCert({ url: CERT_PDF_MAP[award.title], title: award.title })}
              >
                <div className="data-item-header">
                  <h4 className="text-[17px]" style={{ color: "var(--text-main)", fontWeight: 500, letterSpacing: "0.5px" }}>
                    {award.title}
                  </h4>
                  <span className="data-meta">{award.type === "cert" ? "CERTIFIED" : "AWARD"}</span>
                </div>
                <p className="text-[14px] mt-2" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
                  {award.issuer} &middot; {award.year}
                </p>
                <p className="text-[13px] mt-1.5" style={{ color: "var(--text-muted)", opacity: 0.6, fontWeight: 300 }}>
                  {award.detail}
                </p>
                {hasCert && (
                  <div className="flex items-center gap-2 mt-4">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span className="mono-label text-[0.65rem]">VIEW_CERTIFICATE</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </RevealList>
      </div>

      <CertificateModal
        isOpen={!!viewingCert}
        onClose={() => setViewingCert(null)}
        pdfUrl={viewingCert?.url ?? ""}
        title={viewingCert?.title ?? ""}
      />
    </section>
  );
}
