"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [done, setDone] = useState(false);

  const messages = [
    "SYSTEM_CHECK... OK",
    "INITIALIZING SOLAR SYSTEM...",
    "LOADING STAR MAP...",
    "CALIBRATING ORBIT PATHS...",
    "ESTABLISHING UPLINK...",
    "WELCOME, EXPLORER",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 350);
          setTimeout(() => onComplete(), 1000);
          return 100;
        }
        return p + Math.random() * 3.5 + 1.2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setPhase((p) => Math.min(p + 1, messages.length - 1));
    }, 500);
    return () => clearInterval(phaseInterval);
  }, [messages.length]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col justify-between p-8 md:p-10"
          style={{ background: "#040a18", fontFamily: "var(--font-mono)" }}
        >
          <div className="flex justify-between items-start">
            <motion.span
              animate={{ opacity: [0.35, 0.9, 0.35] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[10px] tracking-wider"
              style={{ color: "var(--accent-cyan)" }}
            >
              {messages[phase]}
            </motion.span>
            <span className="text-[10px] tracking-wider" style={{ color: "var(--text-muted)", opacity: 0.5 }}>
              TEMPE, AZ
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-sm">
              <div className="h-[2px] overflow-hidden mb-3" style={{ background: "rgba(0,255,255,0.1)" }}>
                <motion.div
                  className="h-full"
                  style={{
                    width: `${Math.min(progress, 100)}%`,
                    background: "var(--accent-cyan)",
                    boxShadow: "0 0 8px var(--accent-cyan)",
                  }}
                />
              </div>
              <div className="flex justify-between text-[9px] tracking-wider" style={{ color: "var(--text-muted)", opacity: 0.4 }}>
                <span>K.SRIVASTAVA // COMMAND_CENTER</span>
                <span>v1.0</span>
              </div>
            </div>
          </div>

          <div className="self-end overflow-hidden">
            <span
              className="text-[16vw] md:text-[12vw] leading-none font-bold tracking-tighter block"
              style={{
                fontFamily: "var(--font-display)",
                color: "transparent",
                WebkitTextStroke: "1px rgba(0,255,255,0.15)",
              }}
            >
              {Math.min(Math.floor(progress), 100)}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
