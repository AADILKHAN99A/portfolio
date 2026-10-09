"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCcw, Sparkles } from "lucide-react";

interface CrtScreenFrameProps {
  children: React.ReactNode;
}

export function CrtScreenFrame({ children }: CrtScreenFrameProps) {
  // States: "booting" -> "zooming" -> "active"
  const [phase, setPhase] = useState<"booting" | "zooming" | "active">("booting");
  const [bootProgress, setBootProgress] = useState(0);
  const [scanlinesEnabled, setScanlinesEnabled] = useState(true);

  // Boot sequence timer (2.6s total)
  useEffect(() => {
    if (phase !== "booting") return;

    const interval = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Trigger zoom animation
          setTimeout(() => setPhase("zooming"), 200);
          setTimeout(() => setPhase("active"), 1100);
          return 100;
        }
        // Rapid increment with slight variance for authentic retro feel
        return Math.min(100, prev + Math.floor(Math.random() * 8 + 6));
      });
    }, 110);

    return () => clearInterval(interval);
  }, [phase]);

  const reboot = () => {
    setBootProgress(0);
    setPhase("booting");
  };

  const skipBoot = () => {
    setBootProgress(100);
    setPhase("active");
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#05070a] select-none">
      {/* ============================================================== */}
      {/* 1. INITIAL BOOT & ZOOM PHASE (FLOATING CENTERED MONITOR)      */}
      {/* ============================================================== */}
      <AnimatePresence>
        {phase !== "active" && (
          <motion.div
            key="boot-stage"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#05070a]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Ambient Background Grid & Lighting */}
            <div className="absolute inset-0 crt-grid-bg opacity-30 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

            {/* Skip Button in top right corner during boot */}
            <div className="absolute top-6 right-6 z-50">
              <button
                onClick={skipBoot}
                className="px-3.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-mono text-xs tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>SKIP BOOT</span>
                <span className="text-cyan-400">››</span>
              </button>
            </div>

            {/* The Centered CRT Monitor with cinematic scale zoom */}
            <motion.div
              className="relative w-full max-w-[760px] aspect-[4/3] rounded-[32px] p-5 sm:p-7 shadow-2xl flex flex-col justify-between"
              style={{
                backgroundColor: "#cfcac0",
                boxShadow:
                  "0 30px 80px -15px rgba(0,0,0,0.9), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -4px 8px rgba(0,0,0,0.4)",
                border: "4px solid #b2ada2",
              }}
              animate={
                phase === "zooming"
                  ? {
                      scale: [1, 2.8],
                      opacity: [1, 0.95, 0],
                      filter: ["blur(0px)", "blur(2px)"],
                    }
                  : { scale: 1, opacity: 1 }
              }
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1], // Smooth cinematic camera dive
              }}
            >
              {/* Inner Charcoal Screen Bezel */}
              <div
                className="relative flex-1 rounded-[22px] p-3 sm:p-4 flex flex-col overflow-hidden"
                style={{
                  backgroundColor: "#292a2e",
                  boxShadow: "inset 0 4px 14px rgba(0,0,0,0.8), 0 2px 4px rgba(255,255,255,0.1)",
                  border: "3px solid #141517",
                }}
              >
                {/* CRT Glass Surface */}
                <div className="relative flex-1 rounded-[16px] bg-[#0a1417] p-6 sm:p-8 flex flex-col justify-between overflow-hidden border border-black shadow-[inset_0_0_40px_rgba(0,0,0,0.9)]">
                  {/* Flickering Scanlines on glass */}
                  <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent_0px,transparent_2px,rgba(0,0,0,0.3)_3px)] z-20" />

                  {/* Glass Glare Reflection */}
                  <div className="absolute -top-24 -left-24 w-72 h-72 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl pointer-events-none z-20" />

                  {/* Terminal Header */}
                  <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-cyan-400/80 tracking-widest border-b border-cyan-500/20 pb-3">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      AADIL_KHAN // PORTAL_OS v2.6
                    </span>
                    <span className="text-amber-400 font-bold">{bootProgress}%</span>
                  </div>

                  {/* Center Matrix Terminal Output */}
                  <div className="relative z-10 my-auto space-y-2 font-mono text-xs text-emerald-400/90 tracking-wide">
                    <p className="text-cyan-300 font-bold text-sm sm:text-base">
                      &gt; INITIALIZING PRODUCTION WORKSPACE...
                    </p>
                    <p className="opacity-80">&gt; Mounting Flutter &amp; Android runtime core...</p>
                    <p className="opacity-70">&gt; Syncing Urban Culture real-time telemetry pipelines...</p>
                    <p className="opacity-60">&gt; Loading 3D hardware canvas &amp; system architectures...</p>
                    <p className="text-cyan-400 animate-pulse">&gt; Compiling interactive viewport. Stand by...</p>
                  </div>

                  {/* Bottom Segmented Progress Bar */}
                  <div className="relative z-10 space-y-2 font-mono text-[11px]">
                    <div className="flex justify-between text-slate-400">
                      <span>SYSTEM BOOT SEQUENCE</span>
                      <span className="text-cyan-300 font-bold">{bootProgress}% LOADED</span>
                    </div>
                    <div className="h-3 w-full bg-[#122428] rounded border border-cyan-500/30 overflow-hidden p-0.5">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-amber-400 rounded transition-all duration-150"
                        style={{ width: `${bootProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Lower Tactile Chassis Control Strip */}
              <div className="mt-3 sm:mt-4 flex items-center justify-between px-2 font-mono text-xs">
                {/* Brand Imprint */}
                <span className="text-slate-600 font-bold tracking-widest text-[10px]">
                  AADIL KHAN ✳ RETRO-2026
                </span>

                {/* Status Indicator & Tactile Buttons */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] animate-pulse" />
                    <span className="text-[10px] text-slate-600 font-semibold">POWER ON</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-4 h-2 rounded-sm bg-[#5a5c62] border border-[#3e4045] shadow-inner"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* 2. PERSISTENT CRT OPERATING FRAME (THE SURROUNDING MONITOR)    */}
      {/* ============================================================== */}
      <motion.div
        className="w-full h-full flex flex-col p-2.5 sm:p-5 lg:p-7 relative transition-all"
        style={{
          backgroundColor: "#1c1e22", // Vintage outer casing color
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "active" ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Outer Molded Chassis Edge & Shadow */}
        <div
          className="relative w-full h-full rounded-[24px] sm:rounded-[34px] flex flex-col overflow-hidden"
          style={{
            backgroundColor: "#2e3137", // CRT monitor bezel frame
            border: "8px solid #3c3f46",
            boxShadow:
              "inset 0 4px 16px rgba(0,0,0,0.85), inset 0 -4px 12px rgba(0,0,0,0.9), 0 0 50px rgba(0,0,0,0.9)",
          }}
        >
          {/* Top Chassis Bezel Header Bar */}
          <div className="h-9 sm:h-10 bg-[#25272c] border-b border-[#1b1c20] px-4 sm:px-6 flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-slate-400 select-none z-30">
            {/* Left: Brand & Telemetry */}
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] animate-pulse" />
              <span className="font-bold tracking-wider text-slate-300">
                AADIL KHAN // RETRO CRT WORKSTATION
              </span>
              <span className="hidden md:inline text-slate-600">|</span>
              <span className="hidden md:inline text-slate-500">60Hz PHOSPHOR DISPLAY</span>
            </div>

            {/* Right: Quick Telemetry Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setScanlinesEnabled((v) => !v)}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1e2024] hover:bg-[#2e3138] border border-slate-700/60 text-slate-300 text-[10px] font-semibold transition-colors cursor-pointer"
                title="Toggle Scanline Simulation"
              >
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>{scanlinesEnabled ? "SCANLINES: ON" : "SCANLINES: OFF"}</span>
              </button>

              <button
                onClick={reboot}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-semibold transition-colors cursor-pointer"
                title="Re-run Boot Sequence"
              >
                <RotateCcw className="w-3 h-3" />
                <span>REBOOT</span>
              </button>
            </div>
          </div>

          {/* CRT Screen Display Window (Where the Website Runs) */}
          <div className="relative flex-1 w-full overflow-hidden bg-[#070a0e]">
            {/* Scrollable Website Container inside the CRT Screen */}
            <div className="absolute inset-0 overflow-y-auto overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-300">
              {children}
            </div>

            {/* CRT Glass Vignette & Scanlines (Persistent Screen Filter) */}
            {scanlinesEnabled && (
              <div className="pointer-events-none absolute inset-0 z-40 bg-[repeating-linear-gradient(0deg,transparent_0px,transparent_2px,rgba(0,0,0,0.18)_3px)] opacity-60" />
            )}

            {/* Radial Glass Curvature Vignette */}
            <div
              className="pointer-events-none absolute inset-0 z-40"
              style={{
                boxShadow: "inset 0 0 70px rgba(0,0,0,0.65), inset 0 0 15px rgba(0,0,0,0.85)",
              }}
            />
          </div>

          {/* Bottom Control Strip on Bezel */}
          <div className="h-5 sm:h-6 bg-[#212327] border-t border-[#18191d] px-4 flex items-center justify-between font-mono text-[9px] text-slate-500 z-30">
            <span>MODEL: CRT-4000 // FLUTTER &amp; SYSTEMS OS</span>
            <span>STATUS: ACTIVE // ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
