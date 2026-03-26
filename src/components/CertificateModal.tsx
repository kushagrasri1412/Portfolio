"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

export default function CertificateModal({ isOpen, onClose, pdfUrl, title }: CertificateModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-3xl"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--accent-cyan)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 40px rgba(0,255,255,0.1)",
            }}
          >
            <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
              <h3 className="display-heading text-sm tracking-wider" style={{ color: "var(--accent-cyan)" }}>
                {title}
              </h3>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center transition-colors"
                style={{ border: "1px solid var(--border)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                aria-label="Close"
              >
                X
              </button>
            </div>
            <div className="p-4" style={{ height: "70vh" }}>
              <iframe
                src={`${pdfUrl}#toolbar=0`}
                title={title}
                className="w-full h-full"
                style={{ border: "1px solid var(--border)" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
