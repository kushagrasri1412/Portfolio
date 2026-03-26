"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/*
  Custom cursor with outer ring + inner dot + trailing glow.
  Scales up on hovering interactive elements.
*/
export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const outerRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(0);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Hide default cursor
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { cursor: none !important; }
      a, button, [role="button"], input, textarea, select, label { cursor: none !important; }
    `;
    document.head.appendChild(style);

    setVisible(true);

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    // Detect hovering over interactive elements
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("textarea")
      ) {
        setHovering(true);
      }
    };
    const onOut = () => setHovering(false);

    // Smooth outer ring follow
    const lerp = () => {
      outerRef.current.x += (pos.x - outerRef.current.x) * 0.15;
      outerRef.current.y += (pos.y - outerRef.current.y) * 0.15;
      rafRef.current = requestAnimationFrame(lerp);
    };
    rafRef.current = requestAnimationFrame(lerp);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
      style.remove();
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, [pos.x, pos.y]);

  if (!visible) return null;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: pos.x - (hovering ? 6 : 4),
          y: pos.y - (hovering ? 6 : 4),
          width: hovering ? 12 : 8,
          height: hovering ? 12 : 8,
          scale: clicking ? 0.7 : 1,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 35, mass: 0.2 }}
        style={{
          borderRadius: "50%",
          background: "#D8C0FF",
          boxShadow: "0 0 8px rgba(179,136,255,0.5)",
          mixBlendMode: "difference",
        }}
      />
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: pos.x - (hovering ? 24 : 18),
          y: pos.y - (hovering ? 24 : 18),
          width: hovering ? 48 : 36,
          height: hovering ? 48 : 36,
          opacity: clicking ? 0.3 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 25, mass: 0.5 }}
        style={{
          borderRadius: "50%",
          border: "1px solid rgba(179,136,255,0.3)",
          background: hovering ? "rgba(179,136,255,0.05)" : "transparent",
        }}
      />
    </>
  );
}
