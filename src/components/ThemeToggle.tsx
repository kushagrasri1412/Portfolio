"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type Theme = "night" | "day";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("night");

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === "night" ? "day" : "night";
      document.documentElement.setAttribute("data-theme", next);
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, toggle };
}

export default function ThemeToggle({
  theme,
  toggle,
}: {
  theme: Theme;
  toggle: () => void;
}) {
  const isNight = theme === "night";

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5 }}
      onClick={toggle}
      className="fixed top-[14px] right-[170px] md:right-[200px] z-50 w-14 h-7 rounded-full p-[3px] transition-colors duration-500"
      style={{
        background: isNight
          ? "linear-gradient(135deg, rgba(15,10,40,0.8), rgba(30,20,60,0.8))"
          : "linear-gradient(135deg, rgba(135,180,255,0.8), rgba(200,220,255,0.8))",
        border: isNight
          ? "1px solid rgba(179,136,255,0.2)"
          : "1px solid rgba(100,150,230,0.3)",
        backdropFilter: "blur(10px)",
      }}
      title={isNight ? "Switch to day mode" : "Switch to night mode"}
      aria-label={`Switch to ${isNight ? "day" : "night"} mode`}
    >
      <motion.div
        layout
        className="w-[22px] h-[22px] rounded-full flex items-center justify-center"
        style={{
          background: isNight ? "#D8C0FF" : "#FFD93D",
          boxShadow: isNight
            ? "0 0 10px rgba(179,136,255,0.4)"
            : "0 0 10px rgba(255,217,61,0.5)",
          marginLeft: isNight ? 0 : "auto",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <AnimatePresence mode="wait">
          {isNight ? (
            <motion.svg
              key="moon"
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 30, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="12" height="12" viewBox="0 0 24 24" fill="rgba(30,20,60,0.8)"
            >
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </motion.svg>
          ) : (
            <motion.svg
              key="sun"
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 30, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(120,80,0,0.8)" strokeWidth="2" strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}
