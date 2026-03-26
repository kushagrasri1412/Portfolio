"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

export default function RocketAnimation() {
  const [visible, setVisible] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1400);
    return () => clearTimeout(t);
  }, []);

  // Re-trigger every 18 seconds
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => setCycle((c) => c + 1), 18000);
    return () => clearInterval(interval);
  }, [visible]);

  // Generate random trail particles per cycle
  const particles = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => ({
        key: i,
        delay: 0.3 + i * 0.25,
        x: -4 + Math.random() * 8,
        size: 1.5 + Math.random() * 2,
        opacity: 0.15 + Math.random() * 0.2,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cycle]
  );

  if (!visible) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden" key={cycle}>
      {/* Main rocket */}
      <motion.div
        initial={{ x: "-8%", y: "78%" }}
        animate={{ x: "108%", y: "12%" }}
        transition={{ duration: 5.5, ease: [0.22, 0.1, 0.36, 1] }}
        className="absolute"
      >
        <div className="relative" style={{ transform: "rotate(-32deg)" }}>
          {/* Exhaust glow */}
          <motion.div
            animate={{ opacity: [0.25, 0.65, 0.25], scaleY: [1, 1.4, 1] }}
            transition={{ duration: 0.35, repeat: Infinity }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2"
            style={{
              width: 10,
              height: 22,
              background: "linear-gradient(to bottom, #ff7040, #ffaa30, transparent)",
              borderRadius: "0 0 50% 50%",
              filter: "blur(2px)",
            }}
          />
          {/* Exhaust trail */}
          <motion.div
            animate={{ opacity: [0.1, 0.35, 0.1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2"
            style={{
              width: 3,
              height: 36,
              background: "linear-gradient(to bottom, rgba(255,170,0,0.25), transparent)",
              filter: "blur(2px)",
            }}
          />

          {/* Rocket SVG */}
          <svg width="18" height="32" viewBox="0 0 20 36" fill="none">
            <path d="M10 0 L14 10 L6 10 Z" fill="rgba(220,215,230,0.88)" />
            <rect x="6" y="10" width="8" height="16" rx="1" fill="rgba(200,195,215,0.82)" />
            <circle cx="10" cy="16" r="2.2" fill="rgba(80,180,255,0.55)" stroke="rgba(200,195,215,0.4)" strokeWidth="0.5" />
            <path d="M6 22 L2 28 L6 26 Z" fill="rgba(170,140,210,0.6)" />
            <path d="M14 22 L18 28 L14 26 Z" fill="rgba(170,140,210,0.6)" />
            <path d="M7 26 L7 29 L13 29 L13 26" fill="rgba(150,145,170,0.5)" />
          </svg>
        </div>
      </motion.div>

      {/* Trail particles */}
      {particles.map((p) => (
        <motion.div
          key={p.key}
          initial={{ x: "-8%", y: "78%", opacity: 0 }}
          animate={{ x: "108%", y: "12%", opacity: [0, p.opacity, 0] }}
          transition={{ duration: 5.5, ease: [0.22, 0.1, 0.36, 1], delay: p.delay }}
          className="absolute"
        >
          <div
            className="rounded-full"
            style={{
              width: p.size,
              height: p.size,
              background: `rgba(255,180,60,${p.opacity})`,
              filter: "blur(1px)",
              transform: `translateX(${p.x}px)`,
            }}
          />
        </motion.div>
      ))}

      {/* Distant small rocket */}
      <motion.div
        initial={{ x: "80%", y: "88%" }}
        animate={{ x: "104%", y: "28%" }}
        transition={{ duration: 4, ease: [0.22, 0.1, 0.36, 1], delay: 2.5 }}
        className="absolute"
        style={{ opacity: 0.3 }}
      >
        <div style={{ transform: "rotate(-28deg) scale(0.5)" }}>
          <motion.div
            animate={{ opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 0.3, repeat: Infinity }}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2"
            style={{
              width: 5,
              height: 12,
              background: "linear-gradient(to bottom, #ff6b35, transparent)",
              borderRadius: "0 0 50% 50%",
              filter: "blur(1.5px)",
            }}
          />
          <svg width="10" height="18" viewBox="0 0 20 36" fill="none">
            <path d="M10 0 L14 10 L6 10 Z" fill="rgba(220,215,230,0.6)" />
            <rect x="6" y="10" width="8" height="16" rx="1" fill="rgba(200,195,215,0.5)" />
            <circle cx="10" cy="16" r="2.2" fill="rgba(80,180,255,0.35)" />
            <path d="M6 22 L2 28 L6 26 Z" fill="rgba(170,140,210,0.4)" />
            <path d="M14 22 L18 28 L14 26 Z" fill="rgba(170,140,210,0.4)" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
