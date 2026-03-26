"use client";

import { motion } from "framer-motion";
import { HERO } from "@/data/portfolio";
import Planet from "./Planet";
import MountainSilhouette from "./MountainSilhouette";
import CountUp from "./CountUp";

/* Staggered children animation */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="section-wrapper relative overflow-hidden min-h-screen space-bg"
    >
      {/* Nebula accent */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 700,
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(100,50,180,0.1) 0%, rgba(40,80,200,0.05) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Planet at bottom center */}
      <div className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 z-[1]">
        <Planet size={500} />
      </div>

      {/* Mountain silhouette */}
      <MountainSilhouette variant="default" />

      {/* Center content — staggered reveal */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        {/* A MESSAGE FROM EARTH */}
        <motion.p
          variants={item}
          className="text-[11px] font-bold tracking-[0.25em] uppercase mb-2"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          A Message From Earth
        </motion.p>

        {/* HELLO FELLOW GALAXY MEMBER */}
        <motion.h2
          variants={item}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.06em] uppercase mb-1"
          style={{
            color: "#D8C0FF",
            textShadow:
              "0 0 10px rgba(179,136,255,0.45), 0 0 30px rgba(179,136,255,0.25), 0 0 60px rgba(179,136,255,0.12)",
          }}
        >
          Hello Fellow Galaxy Member
        </motion.h2>

        {/* Sub-label */}
        <motion.p
          variants={item}
          className="text-[11px] font-bold tracking-[0.2em] uppercase mb-8"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          A Message From Earth
        </motion.p>

        {/* Decorative line */}
        <motion.div
          variants={item}
          className="neon-divider neon-divider-purple w-32 mx-auto mb-8"
        />

        {/* I AM KUSHAGRA */}
        <motion.h1
          variants={item}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl neon-name mb-4"
        >
          I Am {HERO.name.split(" ")[0]}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="text-sm sm:text-base md:text-lg max-w-lg mx-auto mb-10"
          style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}
        >
          {HERO.tagline}
        </motion.p>

        {/* Click to open */}
        <motion.div variants={item} className="mb-10">
          <motion.button
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex flex-col items-center gap-2 group cursor-pointer"
          >
            <span
              className="text-[10px] font-bold tracking-[0.2em] uppercase"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Click to Open
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "rgba(179,136,255,0.4)" }}>
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.button>
        </motion.div>

        {/* Stat cards with count-up */}
        <motion.div
          variants={item}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto"
        >
          {HERO.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{
                y: -4,
                boxShadow: `0 0 25px ${stat.accent}20`,
              }}
              className={`glass-card px-4 py-4 text-center transition-all ${
                i === 0 ? "animate-float" : i === 1 ? "animate-float-delay" : i === 2 ? "animate-float-delay-2" : "animate-float-delay-3"
              }`}
            >
              <CountUp
                value={stat.value}
                className="text-xl sm:text-2xl metric-value block"
                style={{ color: stat.accent, textShadow: `0 0 10px ${stat.accent}40` }}
              />
              <p className="text-[11px] mt-1 font-medium" style={{ color: "var(--text-secondary)" }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
