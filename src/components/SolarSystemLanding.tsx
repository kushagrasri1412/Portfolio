"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

/* ── Planet data ── */
const SYSTEM_DATA = [
  { id: "about", name: "MISSION CONTROL", color: 0x0ea5e9, distance: 60, size: 4, speed: 0.004 },
  { id: "experience", name: "DEPLOYMENTS", color: 0x94a3b8, distance: 90, size: 6, speed: 0.003 },
  { id: "projects", name: "ACTIVE PROJECTS", color: 0x00ffff, distance: 130, size: 8, speed: 0.002 },
  { id: "skills", name: "TECH ARSENAL", color: 0x8b5cf6, distance: 170, size: 5, speed: 0.0015, hasRings: true },
  { id: "awards", name: "ACCOLADES", color: 0xffffff, distance: 210, size: 3, speed: 0.001 },
];

const COMET_YOUTUBE_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

export default function SolarSystemLanding() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    planets: THREE.Mesh[];
    sun: THREE.Mesh;
    sunWire: THREE.Mesh;
    particleSystem: THREE.Points;
    cometHead: THREE.Mesh;
    cometGlow: THREE.Mesh;
    cometGroup: THREE.Group;
    cometTrail: THREE.Points;
    cometActive: boolean;
    cometPaused: boolean;
    cometPausedT: number;
    cometStartTime: number;
    cometStartPos: THREE.Vector3;
    cometEndPos: THREE.Vector3;
    raycaster: THREE.Raycaster;
    mouse: THREE.Vector2;
    hoveredPlanet: THREE.Mesh | null;
    hoveredSun: boolean;
    hoveredComet: boolean;
    raf: number;
  } | null>(null);
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [reticlePos, setReticlePos] = useState({ x: 0, y: 0, visible: false });
  const [cometPopup, setCometPopup] = useState(false);
  const [sunHover, setSunHover] = useState(false);

  const navigateToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleSurpriseMe = useCallback(() => {
    setCometPopup(false);
    window.open(COMET_YOUTUBE_URL, "_blank", "noopener,noreferrer");
    // Resume comet
    if (sceneRef.current) {
      sceneRef.current.cometPaused = false;
      sceneRef.current.cometActive = false;
      sceneRef.current.cometGroup.visible = false;
      sceneRef.current.cometTrail.visible = false;
    }
  }, []);

  const handleCometExit = useCallback(() => {
    setCometPopup(false);
    // Let comet fly away fast
    if (sceneRef.current) {
      sceneRef.current.cometPaused = false;
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const container = canvasRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040a18, 0.002);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 150, 300);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambient);
    const pointLight = new THREE.PointLight(0xffddaa, 2, 500);
    scene.add(pointLight);

    // Sun (= Mission Control)
    const sunGeo = new THREE.SphereGeometry(25, 64, 64);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    sun.userData = { id: "about", name: "MISSION CONTROL", isSun: true };
    scene.add(sun);

    const sunWireGeo = new THREE.SphereGeometry(26, 32, 32);
    const sunWireMat = new THREE.MeshBasicMaterial({ color: 0xffaa00, wireframe: true, transparent: true, opacity: 0.3 });
    const sunWire = new THREE.Mesh(sunWireGeo, sunWireMat);
    scene.add(sunWire);

    // Dust particles around orbits
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const radius = 30 + Math.random() * 200;
      const theta = Math.random() * Math.PI * 2;
      posArray[i] = Math.cos(theta) * radius;
      posArray[i + 1] = (Math.random() - 0.5) * 10;
      posArray[i + 2] = Math.sin(theta) * radius;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({ size: 1, color: 0x00ffff, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // Stars
    const starCount = 1000;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starPos[i] = (Math.random() - 0.5) * 1000;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5, transparent: true, opacity: 0.6 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Planets
    const planets: THREE.Mesh[] = [];
    const planetGroup = new THREE.Group();
    scene.add(planetGroup);

    SYSTEM_DATA.forEach((data) => {
      // Orbit ring
      const orbitPoints: THREE.Vector3[] = [];
      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        orbitPoints.push(new THREE.Vector3(Math.cos(angle) * data.distance, 0, Math.sin(angle) * data.distance));
      }
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      const orbitMat = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.12 });
      const orbit = new THREE.Line(orbitGeo, orbitMat);
      orbit.rotation.x = Math.PI / 2;
      scene.add(orbit);

      // Planet mesh
      const pGeo = new THREE.SphereGeometry(data.size, 32, 32);
      const pMat = new THREE.MeshStandardMaterial({
        color: data.color,
        roughness: 0.4,
        metalness: 0.6,
        emissive: data.color,
        emissiveIntensity: 0.2,
      });
      const mesh = new THREE.Mesh(pGeo, pMat);

      // Wireframe overlay
      const wireGeo = new THREE.SphereGeometry(data.size * 1.05, 16, 16);
      const wireMat = new THREE.MeshBasicMaterial({ color: data.color, wireframe: true, transparent: true, opacity: 0.3 });
      const wireMesh = new THREE.Mesh(wireGeo, wireMat);
      mesh.add(wireMesh);

      // Rings for skills planet
      if (data.hasRings) {
        const ringGeo = new THREE.RingGeometry(data.size * 1.5, data.size * 2.2, 32);
        const ringMat = new THREE.MeshBasicMaterial({ color: data.color, side: THREE.DoubleSide, transparent: true, opacity: 0.3 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        mesh.add(ring);
      }

      // Orbit pivot
      const pivot = new THREE.Object3D();
      pivot.rotation.y = Math.random() * Math.PI * 2;
      mesh.position.set(data.distance, 0, 0);
      pivot.add(mesh);
      planetGroup.add(pivot);

      mesh.userData = { ...data, pivot };
      planets.push(mesh);
    });

    /* ── Comet / Meteor ── */
    const cometGroup = new THREE.Group();
    scene.add(cometGroup);

    // Comet head
    const cometHeadGeo = new THREE.SphereGeometry(2.5, 16, 16);
    const cometHeadMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const cometHead = new THREE.Mesh(cometHeadGeo, cometHeadMat);
    cometGroup.add(cometHead);

    const cometGlowGeo = new THREE.SphereGeometry(5, 16, 16);
    const cometGlowMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.25 });
    const cometGlow = new THREE.Mesh(cometGlowGeo, cometGlowMat);
    cometGroup.add(cometGlow);

    // Larger invisible hitbox for easier clicking
    const cometHitGeo = new THREE.SphereGeometry(12, 8, 8);
    const cometHitMat = new THREE.MeshBasicMaterial({ visible: false });
    const cometHitbox = new THREE.Mesh(cometHitGeo, cometHitMat);
    cometHitbox.userData = { isComet: true };
    cometGroup.add(cometHitbox);

    // Comet trail
    const trailCount = 80;
    const trailPositions = new Float32Array(trailCount * 3);
    for (let i = 0; i < trailCount; i++) {
      trailPositions[i * 3] = 0;
      trailPositions[i * 3 + 1] = 0;
      trailPositions[i * 3 + 2] = 0;
    }
    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute("position", new THREE.BufferAttribute(trailPositions, 3));
    const trailMat = new THREE.PointsMaterial({
      size: 1.8,
      color: 0x66ddff,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const cometTrail = new THREE.Points(trailGeo, trailMat);
    scene.add(cometTrail);

    cometGroup.visible = false;
    cometTrail.visible = false;
    cometHead.userData = { isComet: true };

    // Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Helper to generate random comet path
    function randomCometPath() {
      const angle = Math.random() * Math.PI * 2;
      const dist = 280;
      const height = (Math.random() - 0.3) * 80;
      const start = new THREE.Vector3(Math.cos(angle) * dist, height, Math.sin(angle) * dist);
      const end = new THREE.Vector3(Math.cos(angle + Math.PI + (Math.random() - 0.5) * 1.2) * dist, height + (Math.random() - 0.5) * 60, Math.sin(angle + Math.PI + (Math.random() - 0.5) * 1.2) * dist);
      return { start, end };
    }

    const firstPath = randomCometPath();

    sceneRef.current = {
      renderer, scene, camera, planets, sun, sunWire, particleSystem,
      cometHead, cometGlow, cometGroup, cometTrail,
      cometActive: false,
      cometPaused: false,
      cometPausedT: 0,
      cometStartTime: 0,
      cometStartPos: firstPath.start,
      cometEndPos: firstPath.end,
      raycaster, mouse, hoveredPlanet: null, hoveredSun: false, hoveredComet: false, raf: 0,
    };

    // Intro camera animation
    const startY = 500, startZ = 800;
    const targetY = 150, targetZ = 300;
    const introDuration = 2500;
    const introStart = performance.now();

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    // Comet timing
    const COMET_CYCLE = 6000;
    const COMET_FLY_DURATION = 8000; // 8s — very slow, easy to click
    let lastCometLaunch = performance.now() - 4000;
    const trailHistory: THREE.Vector3[] = [];
    let pauseStartTime = 0;
    let totalPauseTime = 0;

    // Animation loop
    function animate() {
      const ref = sceneRef.current;
      if (!ref) return;
      const now = performance.now();

      // Intro animation
      const elapsed = now - introStart;
      if (elapsed < introDuration) {
        const t = easeOutCubic(Math.min(elapsed / introDuration, 1));
        ref.camera.position.y = startY + (targetY - startY) * t;
        ref.camera.position.z = startZ + (targetZ - startZ) * t;
        ref.camera.lookAt(0, 0, 0);
      }

      // Rotate sun
      ref.sun.rotation.y += 0.005;
      ref.sunWire.rotation.y -= 0.002;
      ref.sunWire.rotation.x += 0.001;

      // Sun hover glow
      if (ref.hoveredSun) {
        sunWireMat.opacity = 0.5 + Math.sin(now * 0.005) * 0.15;
        sunMat.color.setHex(0xffcc44);
      } else {
        sunWireMat.opacity = 0.3;
        sunMat.color.setHex(0xf59e0b);
      }

      // Rotate particles
      ref.particleSystem.rotation.y += 0.001;

      // Orbit planets
      ref.planets.forEach((p) => {
        p.userData.pivot.rotation.y += p.userData.speed;
        p.rotation.y += 0.01;
      });

      /* ── Comet animation ── */
      const timeSinceLaunch = now - lastCometLaunch;
      if (timeSinceLaunch >= COMET_CYCLE && !ref.cometActive) {
        ref.cometActive = true;
        ref.cometPaused = false;
        ref.cometStartTime = now;
        totalPauseTime = 0;
        const path = randomCometPath();
        ref.cometStartPos = path.start;
        ref.cometEndPos = path.end;
        ref.cometGroup.visible = true;
        ref.cometTrail.visible = true;
        trailHistory.length = 0;
        lastCometLaunch = now;
      }

      if (ref.cometActive) {
        // Handle pause
        if (ref.cometPaused) {
          if (pauseStartTime === 0) pauseStartTime = now;
          // Still render at paused position
          const t = ref.cometPausedT;
          const pos = new THREE.Vector3().lerpVectors(ref.cometStartPos, ref.cometEndPos, t);
          pos.y += Math.sin(t * Math.PI) * 30;
          ref.cometGroup.position.copy(pos);
          // Pulse glow while paused
          (cometGlowMat as THREE.MeshBasicMaterial).opacity = 0.3 + Math.sin(now * 0.008) * 0.15;
        } else {
          if (pauseStartTime > 0) {
            totalPauseTime += now - pauseStartTime;
            pauseStartTime = 0;
          }

          const cometElapsed = now - ref.cometStartTime - totalPauseTime;
          // Slow down when hovered (2x slower)
          const speedMult = ref.hoveredComet ? 0.3 : 1;
          const t = Math.min((cometElapsed * speedMult) / COMET_FLY_DURATION, 1);

          const pos = new THREE.Vector3().lerpVectors(ref.cometStartPos, ref.cometEndPos, t);
          pos.y += Math.sin(t * Math.PI) * 30;
          ref.cometGroup.position.copy(pos);

          (cometGlowMat as THREE.MeshBasicMaterial).opacity = 0.2 + Math.sin(now * 0.01) * 0.1;

          // Trail
          trailHistory.unshift(pos.clone());
          if (trailHistory.length > trailCount) trailHistory.length = trailCount;

          const trailPosAttr = ref.cometTrail.geometry.getAttribute("position") as THREE.BufferAttribute;
          for (let i = 0; i < trailCount; i++) {
            if (i < trailHistory.length) {
              const hp = trailHistory[i];
              trailPosAttr.setXYZ(i, hp.x + (Math.random() - 0.5) * 1.5, hp.y + (Math.random() - 0.5) * 1.5, hp.z + (Math.random() - 0.5) * 1.5);
            } else {
              trailPosAttr.setXYZ(i, pos.x, pos.y, pos.z);
            }
          }
          trailPosAttr.needsUpdate = true;

          if (t > 0.7) {
            (ref.cometTrail.material as THREE.PointsMaterial).opacity = 0.5 * (1 - (t - 0.7) / 0.3);
          } else {
            (ref.cometTrail.material as THREE.PointsMaterial).opacity = 0.5;
          }

          if (t >= 1) {
            ref.cometActive = false;
            ref.cometGroup.visible = false;
            ref.cometTrail.visible = false;
            totalPauseTime = 0;
          }
        }
      }

      // Reticle tracking
      if (ref.hoveredPlanet) {
        const vec = new THREE.Vector3();
        ref.hoveredPlanet.getWorldPosition(vec);
        vec.project(ref.camera);
        const cx = (vec.x * 0.5 + 0.5) * container.clientWidth;
        const cy = (vec.y * -0.5 + 0.5) * container.clientHeight;
        setReticlePos({ x: cx, y: cy, visible: true });
      } else if (ref.hoveredSun) {
        const vec = new THREE.Vector3(0, 0, 0);
        vec.project(ref.camera);
        const cx = (vec.x * 0.5 + 0.5) * container.clientWidth;
        const cy = (vec.y * -0.5 + 0.5) * container.clientHeight;
        setReticlePos({ x: cx, y: cy, visible: true });
      }

      ref.renderer.render(ref.scene, ref.camera);
      ref.raf = requestAnimationFrame(animate);
    }

    const raf = requestAnimationFrame(animate);
    sceneRef.current.raf = raf;

    // Mouse move handler
    const onMouseMove = (e: MouseEvent) => {
      const ref = sceneRef.current;
      if (!ref) return;
      const rect = container.getBoundingClientRect();
      ref.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ref.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      ref.raycaster.setFromCamera(ref.mouse, ref.camera);

      // Check comet hover
      if (ref.cometActive) {
        const cometIntersects = ref.raycaster.intersectObjects([ref.cometHead, cometGlow, cometHitbox], false);
        if (cometIntersects.length > 0) {
          ref.hoveredComet = true;
          container.style.cursor = "pointer";
          // Reset planet/sun hover
          if (ref.hoveredPlanet) {
            (ref.hoveredPlanet.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.2;
            ref.hoveredPlanet.scale.set(1, 1, 1);
            ref.hoveredPlanet = null;
            setHoveredName(null);
            setReticlePos((p) => ({ ...p, visible: false }));
          }
          if (ref.hoveredSun) {
            ref.hoveredSun = false;
            setSunHover(false);
          }
          return;
        }
      }
      if (ref.hoveredComet) {
        ref.hoveredComet = false;
      }

      // Check sun hover
      const sunIntersects = ref.raycaster.intersectObject(ref.sun, false);
      if (sunIntersects.length > 0) {
        if (!ref.hoveredSun) {
          ref.hoveredSun = true;
          setSunHover(true);
          setHoveredName("MISSION CONTROL");
        }
        container.style.cursor = "pointer";
        // Reset planet hover
        if (ref.hoveredPlanet) {
          (ref.hoveredPlanet.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.2;
          ref.hoveredPlanet.scale.set(1, 1, 1);
          ref.hoveredPlanet = null;
        }
        return;
      } else if (ref.hoveredSun) {
        ref.hoveredSun = false;
        setSunHover(false);
        setHoveredName(null);
        setReticlePos((p) => ({ ...p, visible: false }));
      }

      // Check planet hover
      const intersects = ref.raycaster.intersectObjects(ref.planets, false);

      if (intersects.length > 0) {
        const obj = intersects[0].object as THREE.Mesh;
        if (obj !== ref.hoveredPlanet) {
          if (ref.hoveredPlanet) {
            (ref.hoveredPlanet.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.2;
            ref.hoveredPlanet.scale.set(1, 1, 1);
          }
          ref.hoveredPlanet = obj;
          (obj.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.8;
          obj.scale.set(1.2, 1.2, 1.2);
          setHoveredName(obj.userData.name);
          container.style.cursor = "crosshair";
        }
      } else {
        if (ref.hoveredPlanet) {
          (ref.hoveredPlanet.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.2;
          ref.hoveredPlanet.scale.set(1, 1, 1);
          ref.hoveredPlanet = null;
          setHoveredName(null);
          setReticlePos((p) => ({ ...p, visible: false }));
        }
        container.style.cursor = "default";
      }
    };

    // Click handler
    const onClick = (e: MouseEvent) => {
      const ref = sceneRef.current;
      if (!ref) return;

      const rect = container.getBoundingClientRect();
      ref.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ref.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      ref.raycaster.setFromCamera(ref.mouse, ref.camera);

      // Check comet click first
      if (ref.cometActive) {
        const cometHits = ref.raycaster.intersectObjects([ref.cometHead, cometGlow, cometHitbox], false);
        if (cometHits.length > 0) {
          // Pause the comet and show popup
          const cometElapsed = performance.now() - ref.cometStartTime - totalPauseTime;
          const speedMult = ref.hoveredComet ? 0.3 : 1;
          ref.cometPausedT = Math.min((cometElapsed * speedMult) / COMET_FLY_DURATION, 1);
          ref.cometPaused = true;
          setCometPopup(true);
          return;
        }
      }

      // Check sun click
      const sunHits = ref.raycaster.intersectObject(ref.sun, false);
      if (sunHits.length > 0) {
        navigateToSection("about");
        return;
      }

      // Check planet click
      const planetHits = ref.raycaster.intersectObjects(ref.planets, false);
      if (planetHits.length > 0) {
        const planet = planetHits[0].object as THREE.Mesh;
        navigateToSection(planet.userData.id);
      }
    };

    // Resize handler
    const onResize = () => {
      const ref = sceneRef.current;
      if (!ref) return;
      ref.camera.aspect = container.clientWidth / container.clientHeight;
      ref.camera.updateProjectionMatrix();
      ref.renderer.setSize(container.clientWidth, container.clientHeight);
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(sceneRef.current?.raf ?? 0);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      sceneRef.current = null;
    };
  }, [navigateToSection]);

  return (
    <section id="solar-system" className="relative w-full h-screen overflow-hidden" style={{ background: "#040a18" }}>
      {/* Three.js canvas */}
      <div ref={canvasRef} className="absolute inset-0 z-[1]" />

      {/* Crosshair dot */}
      <div
        className="fixed z-[100] pointer-events-none"
        style={{
          top: "50%", left: "50%",
          width: 2, height: 2,
          background: "var(--accent-cyan)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Reticle */}
      {reticlePos.visible && (
        <div
          className="absolute pointer-events-none z-[5]"
          style={{
            left: reticlePos.x, top: reticlePos.y,
            width: 60, height: 60,
            transform: "translate(-50%, -50%)",
            opacity: 0.8,
            transition: "opacity 0.2s",
          }}
        >
          <div className="absolute top-0 left-0 w-[15px] h-[15px] border-t-2 border-l-2" style={{ borderColor: sunHover ? "var(--accent-orange)" : "var(--accent-cyan)" }} />
          <div className="absolute top-0 right-0 w-[15px] h-[15px] border-t-2 border-r-2" style={{ borderColor: sunHover ? "var(--accent-orange)" : "var(--accent-cyan)" }} />
          <div className="absolute bottom-0 left-0 w-[15px] h-[15px] border-b-2 border-l-2" style={{ borderColor: sunHover ? "var(--accent-orange)" : "var(--accent-cyan)" }} />
          <div className="absolute bottom-0 right-0 w-[15px] h-[15px] border-b-2 border-r-2" style={{ borderColor: sunHover ? "var(--accent-orange)" : "var(--accent-cyan)" }} />
        </div>
      )}

      {/* Comet popup — Surprise Me / Exit */}
      <AnimatePresence>
        {cometPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex items-center justify-center"
            style={{ background: "rgba(4,10,24,0.6)" }}
          >
            <div
              className="hud-card p-6 text-center"
              style={{ borderColor: "var(--accent-orange)", boxShadow: "0 0 40px rgba(245,158,11,0.15)", maxWidth: 320 }}
            >
              <div className="mono-label text-[0.65rem] mb-1" style={{ color: "var(--accent-orange)" }}>
                COMET INTERCEPTED
              </div>
              <p className="text-[13px] mb-5" style={{ fontFamily: "var(--font-ui)", color: "var(--text-muted)", fontWeight: 300 }}>
                You caught the comet! Where to next?
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleSurpriseMe}
                  className="px-5 py-2 text-[11px] tracking-widest transition-all hover:scale-105"
                  style={{
                    fontFamily: "var(--font-mono)",
                    background: "rgba(245,158,11,0.15)",
                    border: "1px solid rgba(245,158,11,0.5)",
                    color: "var(--accent-orange)",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                  }}
                >
                  Surprise Me
                </button>
                <button
                  onClick={handleCometExit}
                  className="px-5 py-2 text-[11px] tracking-widest transition-all hover:scale-105"
                  style={{
                    fontFamily: "var(--font-mono)",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                  }}
                >
                  Exit
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 md:p-8">
        {/* Top HUD — Name centered */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          <h1
            className="display-heading-light text-3xl sm:text-4xl md:text-5xl"
            style={{ color: "var(--text-main)", textShadow: "0 0 30px rgba(0,255,255,0.2)" }}
          >
            Kushagra Srivastava
          </h1>
          <div className="flex items-center gap-2 mt-2" style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "2px", color: "var(--text-muted)" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-orange)", boxShadow: "0 0 10px var(--accent-orange)" }} />
            ASPIRING SOFTWARE ENGINEER
          </div>
        </motion.div>

        {/* Hover label */}
        {hoveredName && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-10 z-20"
          >
            <div className="hud-card px-4 py-2" style={sunHover ? { borderColor: "var(--accent-orange)", boxShadow: "0 0 15px rgba(245,158,11,0.15)" } : {}}>
              <span className="mono-label text-xs tracking-widest" style={sunHover ? { color: "var(--accent-orange)" } : {}}>{hoveredName}</span>
            </div>
          </motion.div>
        )}

        {/* Bottom HUD */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex justify-center"
        >
          <div
            className="hud-card px-5 py-3 flex items-center gap-3"
            style={{ animation: "pulse-border 2s infinite" }}
          >
            <span className="mono-label text-[0.65rem] tracking-widest">[ SELECT A PLANET TO NAVIGATE ]</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
