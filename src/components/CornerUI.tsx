"use client";

import { motion } from "framer-motion";

export default function CornerUI() {
  return (
    <>
      {/* Bottom-left: PRESS indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="corner-ui"
        style={{ bottom: 24, left: 24 }}
      >
        <span>Press</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="12" y1="18" x2="12" y2="18.01" />
        </svg>
      </motion.div>

      {/* Bottom-right: SCROLL indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="corner-ui"
        style={{ bottom: 24, right: 24 }}
      >
        <span>Scroll</span>
        <motion.svg
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12l4 4 4-4" />
          <line x1="12" y1="8" x2="12" y2="16" />
        </motion.svg>
      </motion.div>
    </>
  );
}
