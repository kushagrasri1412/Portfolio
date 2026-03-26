"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/data/portfolio";
import { RevealHeading, RevealLabel, RevealList, revealItem } from "./TextReveal";

export default function SkillsSection() {
  return (
    <section id="skills" className="section-wrapper section-bg-2 relative overflow-hidden">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="panel-accent mb-14">
          <RevealLabel className="mono-label text-[0.8rem]">SECTOR // 02</RevealLabel>
          <RevealHeading
            className="display-heading text-4xl md:text-6xl mt-3"
            style={{ color: "var(--accent-cyan)" }}
            delay={0.15}
          >
            Tech Arsenal
          </RevealHeading>
        </div>

        <div className="space-y-12">
          {SKILLS.map((category, ci) => (
            <div key={category.name}>
              <RevealLabel
                className="mono-label text-[0.7rem] mb-5 block"
                style={{ color: "var(--text-muted)" }}
                delay={ci * 0.05}
              >
                {`// ${category.name.toUpperCase()}`}
              </RevealLabel>
              <RevealList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3" delay={ci * 0.05} stagger={0.03}>
                {category.items.map((skill) => (
                  <motion.div key={skill} variants={revealItem} className="skill-tag text-[0.9rem] py-2 px-3">
                    {skill}
                  </motion.div>
                ))}
              </RevealList>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
