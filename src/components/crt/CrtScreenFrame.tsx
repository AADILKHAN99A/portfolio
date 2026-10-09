"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RetroMonitor } from "@/components/3d/RetroMonitor";

interface CrtScreenFrameProps {
  children: React.ReactNode;
}

export function CrtScreenFrame({ children }: CrtScreenFrameProps) {
  // States:
  // "booting": 3D monitor centered with stand & margins (0-2.4s)
  // "zooming": cinematic zoom into the 3D monitor screen (2.4-3.2s)
  // "entered": full website revealed, intro unmounted!
  const [phase, setPhase] = useState<"booting" | "zooming" | "entered">("booting");

  useEffect(() => {
    // 2.2s boot sequence, then trigger zoom
    const zoomTimer = setTimeout(() => {
      setPhase("zooming");
    }, 2200);

    // After 900ms zoom animation, enter full website
    const enterTimer = setTimeout(() => {
      setPhase("entered");
    }, 3100);

    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(enterTimer);
    };
  }, []);

  const skipEntrance = () => {
    setPhase("entered");
  };

  return (
    <div className="relative w-full min-h-screen bg-[#070a0e] overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* ============================================================== */}
      {/* 1. INTRO: 3D RETRO MONITOR (CENTERED WITH STAND & ZOOM)        */}
      {/* ============================================================== */}
      <AnimatePresence>
        {phase !== "entered" && (
          <motion.div
            key="retro-entrance"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070a] overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Ambient Background Grid & Desk Glow */}
            <div className="absolute inset-0 crt-grid-bg opacity-30 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

            {/* Skip Entrance Button */}
            <div className="absolute top-6 right-6 z-50">
              <button
                onClick={skipEntrance}
                className="px-3.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/90 hover:bg-slate-800 text-slate-300 font-mono text-xs tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <span>ENTER SITE</span>
                <span className="text-cyan-400">››</span>
              </button>
            </div>

            {/* Top Telemetry Tag */}
            <div className="absolute top-6 left-6 z-50 font-mono text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-semibold tracking-wider text-slate-300">
                INITIALIZING 3D WORKSTATION...
              </span>
            </div>

            {/* Centered 3D Retro Monitor with Stand & Hardware */}
            <motion.div
              className="relative w-full max-w-[840px] h-[520px] sm:h-[620px] flex items-center justify-center p-4"
              animate={
                phase === "zooming"
                  ? {
                      scale: [1, 3.8],
                      opacity: [1, 0.9, 0],
                    }
                  : {
                      scale: 1,
                      opacity: 1,
                    }
              }
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1], // Cinematic smooth zoom-in curve
              }}
            >
              <div className="w-full h-full relative flex items-center justify-center">
                <RetroMonitor restart={0} />
              </div>
            </motion.div>

            {/* Bottom Subtitle / Instruction */}
            <motion.div
              className="absolute bottom-8 font-mono text-xs text-slate-500 tracking-widest text-center"
              animate={{ opacity: phase === "zooming" ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              MOVE CURSOR TO ROTATE · BOOTING PORTAL OS
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* 2. MAIN WEBSITE (CLEAN, FULL-WIDTH, NO RESTRICTIVE FRAME)      */}
      {/* ============================================================== */}
      <motion.div
        className="w-full min-h-screen"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{
          opacity: phase === "entered" ? 1 : 0.05,
          scale: phase === "entered" ? 1 : 0.98,
        }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
