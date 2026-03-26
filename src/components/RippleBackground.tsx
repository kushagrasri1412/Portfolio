"use client";

import { useEffect, useRef } from "react";

/* Interactive ripple effect on canvas — clicks and mouse movement create water ripples */
export default function RippleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      speed: number;
      hue: number;
    }

    const ripples: Ripple[] = [];

    const addRipple = (x: number, y: number, fromClick = false) => {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: fromClick ? 200 + Math.random() * 100 : 80 + Math.random() * 40,
        alpha: fromClick ? 0.15 : 0.06,
        speed: fromClick ? 2.5 : 1.5,
        hue: 260 + Math.random() * 40, // purple-blue range
      });
    };

    // Auto-spawn ambient ripples
    let autoId = 0;
    const autoRipple = () => {
      addRipple(Math.random() * w, Math.random() * h);
      autoId = window.setTimeout(autoRipple, 2000 + Math.random() * 3000);
    };
    autoId = window.setTimeout(autoRipple, 1000);

    // Mouse interaction
    let moveThrottle = 0;
    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - moveThrottle > 150) {
        moveThrottle = now;
        addRipple(e.clientX, e.clientY);
      }
    };
    const onClick = (e: MouseEvent) => addRipple(e.clientX, e.clientY, true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick, { passive: true });

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        const progress = r.radius / r.maxRadius;
        const currentAlpha = r.alpha * (1 - progress);

        if (currentAlpha <= 0.001 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${r.hue}, 60%, 70%, ${currentAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Second ring (fainter, delayed)
        if (r.radius > 15) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 0.7, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${r.hue}, 60%, 70%, ${currentAlpha * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(autoId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      aria-hidden="true"
    />
  );
}
