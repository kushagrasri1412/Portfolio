"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";

/* ── Palantir-style slide-up mask reveal for headings (word-by-word) ── */
export function RevealHeading({
  children,
  className,
  style,
  delay = 0,
  as: Tag = "h2",
}: {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4";
}) {
  const words = children.split(" ");
  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={className}
      style={style}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", rotateX: -80, opacity: 0 },
              visible: {
                y: 0,
                rotateX: 0,
                opacity: 1,
                transition: {
                  delay: delay + i * 0.08,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/* ── Slide-up + blur reveal for paragraphs / blocks ── */
export function RevealBlock({
  children,
  className,
  style,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "60%", opacity: 0, filter: "blur(8px)" }}
        whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={className}
        style={style}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── Mono label with typewriter-style stagger ── */
export function RevealLabel({
  children,
  className,
  style,
  delay = 0,
}: {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const chars = children.split("");
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className={className}
      style={style}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delay: delay + i * 0.03,
                duration: 0.01,
              },
            },
          }}
        >
          {char}
        </motion.span>
      ))}
      {/* blinking cursor */}
      <motion.span
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: [0, 1, 0],
            transition: {
              delay: delay + chars.length * 0.03,
              duration: 1,
              repeat: 2,
              ease: "linear",
            },
          },
        }}
        style={{ color: "var(--accent-cyan)" }}
      >
        _
      </motion.span>
    </motion.span>
  );
}

/* ── Staggered list item reveal ── */
export function RevealList({
  children,
  className,
  delay = 0,
  stagger = 0.06,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const revealItem = {
  hidden: { opacity: 0, y: 25, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ── Animated counter (Palantir-style numeric reveal) ── */
export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  className,
  style,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionVal, value, {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
      });
      const unsub = rounded.on("change", (v) => setDisplay(v));
      return () => { controls.stop(); unsub(); };
    }
  }, [isInView, value, motionVal, rounded]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{display}{suffix}
    </span>
  );
}

/* ── Line-draw reveal (horizontal accent) ── */
export function LineReveal({
  className,
  style,
  delay = 0,
}: {
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ scaleX: 0, transformOrigin: "left" }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={{
        height: 1,
        background: "linear-gradient(90deg, var(--accent-cyan), transparent)",
        opacity: 0.4,
        ...style,
      }}
    />
  );
}
