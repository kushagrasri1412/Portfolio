"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

/*
  Ambient Mozart-inspired generative music using Web Audio API.
  Plays soft piano-like tones from Mozart's "Eine kleine Nachtmusik" scale patterns.
  No external audio files needed — pure synthesis.
*/
export default function AmbientSound() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number>(0);
  const gainRef = useRef<GainNode | null>(null);

  // Mozart-inspired melody notes (G major - Eine kleine Nachtmusik motif)
  const notes = [392, 440, 494, 523, 587, 659, 740, 784]; // G4 to G5
  const melody = [0, 2, 4, 7, 4, 2, 0, 5, 3, 1, 0, 4, 7, 5, 3, 2]; // index into notes

  const playNote = useCallback(
    (ctx: AudioContext, gain: GainNode, freq: number) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Soft attack and release (piano-like)
      noteGain.gain.setValueAtTime(0, ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

      // Add slight harmonic overtone
      const osc2 = ctx.createOscillator();
      const overtoneGain = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(freq * 2, ctx.currentTime);
      overtoneGain.gain.setValueAtTime(0, ctx.currentTime);
      overtoneGain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 0.05);
      overtoneGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

      osc.connect(noteGain);
      noteGain.connect(gain);
      osc2.connect(overtoneGain);
      overtoneGain.connect(gain);

      osc.start();
      osc2.start();
      osc.stop(ctx.currentTime + 3);
      osc2.stop(ctx.currentTime + 2);
    },
    []
  );

  const startMusic = useCallback(() => {
    const ctx = new AudioContext();
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.3, ctx.currentTime);
    masterGain.connect(ctx.destination);

    ctxRef.current = ctx;
    gainRef.current = masterGain;

    let noteIndex = 0;

    const tick = () => {
      const idx = melody[noteIndex % melody.length];
      playNote(ctx, masterGain, notes[idx]);

      // Occasionally play a chord (two notes)
      if (Math.random() > 0.6) {
        const chordIdx = (idx + 2) % notes.length;
        setTimeout(() => playNote(ctx, masterGain, notes[chordIdx]), 100);
      }

      noteIndex++;
    };

    tick(); // play first note immediately
    intervalRef.current = window.setInterval(tick, 1800 + Math.random() * 600);
  }, [melody, notes, playNote]);

  const stopMusic = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (gainRef.current) {
      gainRef.current.gain.linearRampToValueAtTime(0, (ctxRef.current?.currentTime || 0) + 0.5);
    }
    setTimeout(() => {
      ctxRef.current?.close();
      ctxRef.current = null;
    }, 600);
  }, []);

  const toggle = () => {
    if (playing) {
      stopMusic();
    } else {
      startMusic();
    }
    setPlaying(!playing);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      ctxRef.current?.close();
    };
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.8 }}
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
      style={{
        background: playing
          ? "rgba(179,136,255,0.15)"
          : "rgba(10, 8, 30, 0.6)",
        border: playing
          ? "1px solid rgba(179,136,255,0.35)"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: playing ? "0 0 20px rgba(179,136,255,0.15)" : "none",
        backdropFilter: "blur(10px)",
      }}
      title={playing ? "Mute ambient music" : "Play ambient Mozart"}
      aria-label={playing ? "Mute music" : "Play music"}
    >
      {playing ? (
        <motion.div className="flex items-end gap-[2px] h-4">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ height: ["4px", "14px", "6px", "12px", "4px"] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
              className="w-[2px] rounded-full"
              style={{ background: "#D8C0FF" }}
            />
          ))}
        </motion.div>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      )}
    </motion.button>
  );
}
