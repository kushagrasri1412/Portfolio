"use client";

import { useEffect, useRef, useState } from "react";

/* Animated number counter — counts from 0 to target value when visible */
export default function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 1500,
  className = "",
  style = {},
}: {
  value: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateValue();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animateValue = () => {
    // Extract numeric part
    const numMatch = value.match(/[\d.]+/);
    if (!numMatch) return;

    const target = parseFloat(numMatch[0]);
    const isFloat = numMatch[0].includes(".");
    const beforeNum = value.slice(0, value.indexOf(numMatch[0]));
    const afterNum = value.slice(value.indexOf(numMatch[0]) + numMatch[0].length);

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      setDisplay(
        `${beforeNum}${isFloat ? current.toFixed(1) : Math.floor(current)}${afterNum}`
      );

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplay(value); // Ensure exact final value
      }
    };

    requestAnimationFrame(tick);
  };

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{display}{suffix}
    </span>
  );
}
