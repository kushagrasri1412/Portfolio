"use client";

import { useEffect, useRef, useCallback, useState } from "react";

/* ── Twinkling star field on canvas ── */
function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<{ x: number; y: number; r: number; alpha: number; phase: number; speed: number }[]>([]);
  const rafRef = useRef(0);

  const init = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = window.innerWidth;
    c.height = document.documentElement.scrollHeight;
    const count = Math.min(300, Math.floor((c.width * c.height) / 8000));
    starsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: Math.random() * 1.3 + 0.2,
      alpha: Math.random() * 0.4 + 0.1,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.004 + 0.001,
    }));
  }, []);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    init();
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      t++;
      for (const s of starsRef.current) {
        const flicker = Math.sin(t * s.speed + s.phase) * 0.35 + 0.65;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha * flicker})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => init();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", onResize); };
  }, [init]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" />;
}

/* ── Shooting stars ── */
function ShootingStars() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    let id = 0;
    const spawn = () => {
      setStars((prev) => {
        const filtered = prev.filter((s) => Date.now() - s.id < 3000);
        return [
          ...filtered,
          {
            id: Date.now(),
            x: Math.random() * 80 + 10,
            y: Math.random() * 40 + 5,
            delay: 0,
          },
        ];
      });
      const next = Math.random() * 4000 + 2000;
      id = window.setTimeout(spawn, next);
    };
    id = window.setTimeout(spawn, 1000);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]" aria-hidden="true">
      {stars.map((s) => (
        <div
          key={s.id}
          className="shooting-star"
          style={{ top: `${s.y}%`, left: `${s.x}%` }}
        />
      ))}
    </div>
  );
}

/* ── Nebula blobs (colored gradient clouds) ── */
function NebulaEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <div
        className="nebula-blob"
        style={{
          width: 600,
          height: 600,
          top: "5%",
          right: "-10%",
          background: "radial-gradient(circle, rgba(88,40,180,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="nebula-blob"
        style={{
          width: 500,
          height: 500,
          top: "35%",
          left: "-8%",
          background: "radial-gradient(circle, rgba(40,80,180,0.06) 0%, transparent 70%)",
          animationDelay: "7s",
        }}
      />
      <div
        className="nebula-blob"
        style={{
          width: 700,
          height: 700,
          bottom: "10%",
          right: "5%",
          background: "radial-gradient(circle, rgba(120,40,160,0.05) 0%, transparent 70%)",
          animationDelay: "13s",
        }}
      />
    </div>
  );
}

/* ── Main export ── */
export default function SpaceBackground() {
  return (
    <>
      <StarCanvas />
      <ShootingStars />
      <NebulaEffects />
    </>
  );
}
