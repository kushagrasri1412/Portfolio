"use client";

import { useEffect, useRef } from "react";

/* Subtle cursor glow that follows the mouse — adds depth to the space theme */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0, y = 0, cx = 0, cy = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };

    const lerp = () => {
      cx += (x - cx) * 0.08;
      cy += (y - cy) * 0.08;
      el.style.transform = `translate(${cx - 150}px, ${cy - 150}px)`;
      raf = requestAnimationFrame(lerp);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 pointer-events-none z-[1] hidden md:block"
      style={{
        width: 300,
        height: 300,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(179,136,255,0.04) 0%, transparent 70%)",
        filter: "blur(40px)",
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  );
}
