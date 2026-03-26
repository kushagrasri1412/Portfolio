"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import AwardsSection from "@/components/AwardsSection";
import ContactSection from "@/components/ContactSection";
import SocialSidebar from "@/components/SocialSidebar";
import LoadingScreen from "@/components/LoadingScreen";

const SolarSystemLanding = dynamic(() => import("@/components/SolarSystemLanding"), { ssr: false });
const AmbientSound = dynamic(() => import("@/components/AmbientSound"), { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const onLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <main className="relative">
      <LoadingScreen onComplete={onLoadComplete} />

      {loaded && (
        <>
          <Navbar />
          <SocialSidebar />
          <AmbientSound />
        </>
      )}

      {loaded && <SolarSystemLanding />}

      {loaded && (
        <>
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <AwardsSection />
          <ContactSection />
        </>
      )}
    </main>
  );
}
