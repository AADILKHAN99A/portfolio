"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { RotateCcw, Sparkles, ZoomIn, ZoomOut } from "lucide-react";

interface CrtScreenFrameProps {
  children: React.ReactNode;
}

export function CrtScreenFrame({ children }: CrtScreenFrameProps) {
  // Lifecycle states:
  // "booting": small monitor with stand, boot text on screen (0-2.2s)
  // "preview": small monitor with stand, LIVE website rendered inside screen! (2.2-2.8s)
  // "zoomed": monitor smoothly scales up to full viewport, keeping bezels, buttons & stand accents
  const [stage, setStage] = useState<"booting" | "preview" | "zoomed">("booting");
  const [bootProgress, setBootProgress] = useState(0);
  const [scanlinesEnabled, setScanlinesEnabled] = useState(true);

  // Boot sequence timer
  useEffect(() => {
    if (stage !== "booting") return;

    const interval = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Step 1: Switch to "preview" - show live website inside small monitor!
          setTimeout(() => setStage("preview"), 200);
          // Step 2: Smoothly zoom into the monitor to fill screen!
          setTimeout(() => setStage("zoomed"), 800);
          return 100;
        }
        return Math.min(100, prev + Math.floor(Math.random() * 10 + 8));
      });
    }, 120);

    return () => clearInterval(interval);
  }, [stage]);

  const reboot = () => {
    setBootProgress(0);
    setStage("booting");
  };

  const toggleZoom = () => {
    setStage((prev) => (prev === "zoomed" ? "preview" : "zoomed"));
  };

  const isSmall = stage === "booting" || stage === "preview";

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#05070a] flex items-center justify-center select-none">
      {/* Ambient Retro Room / Desk Background Grid */}
      <div className="absolute inset-0 crt-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Floating Status & Skip Bar (Visible during small/booting stage) */}
      {isSmall && (
        <div className="absolute top-6 left-6 right-6 z-50 flex items-center justify-between font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-slate-300 font-semibold tracking-wider">
              {stage === "booting" ? "INITIALIZING WORKSTATION..." : "WEBSITE LOADED // COMMENCING ZOOM"}
            </span>
          </div>

          <button
            onClick={() => setStage("zoomed")}
            className="px-3.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-mono text-xs tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>ENTER WORKSTATION</span>
            <span className="text-cyan-400">››</span>
          </button>
        </div>
      )}

      {/* ============================================================== */}
      {/* THE SINGLE UNIFIED CRT MONITOR (SCALES FROM DESK TO VIEWPORT)   */}
      {/* ============================================================== */}
      <motion.div
        layout
        className="relative flex flex-col items-center justify-center z-20"
        animate={{
          // Small floating monitor: ~740px width with comfortable margin
          // Zoomed monitor: fills almost 100% of viewport with visible bezel borders
          width: isSmall ? "min(90vw, 760px)" : "100vw",
          height: isSmall ? "min(70vh, 560px)" : "100vh",
          padding: isSmall ? "0px" : "clamp(6px, 1.2vw, 16px)",
        }}
        transition={{
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1], // Cinematic smooth camera push-in
        }}
      >
        {/* ============================================================== */}
        {/* MONITOR HOUSING (MOLDED CHASSIS)                               */}
        {/* ============================================================== */}
        <motion.div
          className="relative w-full h-full flex flex-col justify-between overflow-hidden transition-all"
          style={{
            backgroundColor: "#2e3137", // CRT monitor bezel tone
            borderRadius: isSmall ? "28px" : "clamp(16px, 2vw, 28px)",
            border: isSmall ? "6px solid #4a4d55" : "clamp(6px, 1vw, 10px) solid #3d4047",
            boxShadow: isSmall
              ? "0 35px 80px -10px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.1), inset 0 2px 4px rgba(255,255,255,0.2)"
              : "inset 0 4px 16px rgba(0,0,0,0.8), 0 0 60px rgba(0,0,0,0.95)",
          }}
        >
          {/* Top Chassis Strip */}
          <div className="h-8 sm:h-9 bg-[#24262b] border-b border-[#181a1d] px-4 sm:px-6 flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-slate-400 select-none z-30 flex-shrink-0">
            {/* Left: Brand & Model */}
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] animate-pulse" />
              <span className="font-bold tracking-wider text-slate-200">
                AADIL KHAN // CRT-4000
              </span>
              <span className="hidden sm:inline text-slate-600">|</span>
              <span className="hidden sm:inline text-slate-400">FLUTTER &amp; SYSTEMS WORKSTATION</span>
            </div>

            {/* Right: Interactive Hardware Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setScanlinesEnabled((v) => !v)}
                className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#1a1c20] hover:bg-[#282a30] border border-slate-700/60 text-slate-300 text-[10px] font-semibold transition-colors cursor-pointer"
                title="Toggle CRT Scanline Overlay"
              >
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>{scanlinesEnabled ? "SCANLINES: ON" : "SCANLINES: OFF"}</span>
              </button>

              <button
                onClick={toggleZoom}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#1a1c20] hover:bg-[#282a30] border border-slate-700/60 text-slate-300 text-[10px] font-semibold transition-colors cursor-pointer"
                title={isSmall ? "Zoom into Monitor" : "Zoom out to Desk"}
              >
                {isSmall ? <ZoomIn className="w-3 h-3 text-cyan-400" /> : <ZoomOut className="w-3 h-3 text-cyan-400" />}
                <span className="hidden sm:inline">{isSmall ? "ZOOM IN" : "DESK VIEW"}</span>
              </button>

              <button
                onClick={reboot}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-semibold transition-colors cursor-pointer"
                title="Re-run Boot Sequence"
              >
                <RotateCcw className="w-3 h-3" />
                <span>REBOOT</span>
              </button>
            </div>
          </div>

          {/* ============================================================== */}
          {/* CRT INNER SCREEN WINDOW (THE ACTUAL DISPLAY)                   */}
          {/* ============================================================== */}
          <div
            className="relative flex-1 w-full overflow-hidden bg-[#070a0e] flex flex-col"
            style={{
              margin: isSmall ? "6px" : "0px",
              borderRadius: isSmall ? "16px" : "0px",
              boxShadow: "inset 0 0 50px rgba(0,0,0,0.85)",
            }}
          >
            {/* The Live Portfolio Website (ALWAYS MOUNTED & RUNNING INSIDE THE SCREEN!) */}
            <div className="absolute inset-0 overflow-y-auto overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-300">
              {children}
            </div>

            {/* Booting Terminal Overlay (Covers the website ONLY during boot) */}
            {stage === "booting" && (
              <motion.div
                className="absolute inset-0 z-30 bg-[#091316] p-6 sm:p-8 flex flex-col justify-between font-mono"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Terminal Header */}
                <div className="flex items-center justify-between text-[11px] text-cyan-400/90 border-b border-cyan-500/20 pb-3">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    AADIL_KHAN // BOOT_KERNEL_2026
                  </span>
                  <span className="text-amber-400 font-bold">{bootProgress}%</span>
                </div>

                {/* Matrix Logs */}
                <div className="my-auto space-y-2 text-xs text-emerald-400/90">
                  <p className="text-cyan-300 font-bold text-sm">
                    &gt; INITIALIZING PRODUCTION WORKSPACE...
                  </p>
                  <p className="opacity-80">&gt; Mounting Flutter &amp; Android runtime core...</p>
                  <p className="opacity-70">&gt; Syncing Urban Culture real-time telemetry pipelines...</p>
                  <p className="opacity-60">&gt; Loading 3D hardware canvas &amp; systems architecture...</p>
                  <p className="text-cyan-400 animate-pulse">&gt; Compiling interactive viewport. Stand by...</p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between text-slate-400">
                    <span>SYSTEM BOOT SEQUENCE</span>
                    <span className="text-cyan-300 font-bold">{bootProgress}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#122428] rounded border border-cyan-500/30 overflow-hidden p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-amber-400 rounded transition-all duration-150"
                      style={{ width: `${bootProgress}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Phosphor Scanlines Overlay */}
            {scanlinesEnabled && (
              <div className="pointer-events-none absolute inset-0 z-40 bg-[repeating-linear-gradient(0deg,transparent_0px,transparent_2px,rgba(0,0,0,0.18)_3px)] opacity-60" />
            )}

            {/* CRT Glass Curvature Vignette */}
            <div
              className="pointer-events-none absolute inset-0 z-40"
              style={{
                boxShadow: "inset 0 0 60px rgba(0,0,0,0.65), inset 0 0 15px rgba(0,0,0,0.85)",
              }}
            />
          </div>

          {/* Lower Control Strip on Bezel */}
          <div className="h-6 sm:h-7 bg-[#212328] border-t border-[#18191d] px-4 sm:px-6 flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-slate-400 z-30 flex-shrink-0">
            {/* Brand badge */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500">SYS_ID:</span>
              <span className="text-slate-300 font-semibold">AADIL-KHAN-FLUTTER-OS</span>
            </div>

            {/* Power LED & Tactile Buttons */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] animate-pulse" />
                <span className="text-[9px] text-slate-400 font-semibold">PWR</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-3.5 h-1.5 rounded-[2px] bg-[#4a4c52] border border-[#33353a]"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* MONITOR STAND (NECK & WEIGHTED BASE)                           */}
        {/* ============================================================== */}
        <motion.div
          className="flex flex-col items-center flex-shrink-0 z-10"
          animate={{
            opacity: isSmall ? 1 : 0.4, // Subtly stays visible at the bottom of the screen!
            scale: isSmall ? 1 : 0.85,
            marginTop: isSmall ? "0px" : "-8px",
          }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Angled Neck / Swivel Hinge */}
          <div
            className="w-20 sm:w-28 h-5 sm:h-6 bg-[#32353b] border-x border-[#222428] shadow-lg"
            style={{
              clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)",
            }}
          />

          {/* Weighted Desk Base Foot */}
          <div
            className="w-44 sm:w-60 h-3 sm:h-4 rounded-b-xl bg-[#24262b] border-t border-[#3c3f46] shadow-2xl flex items-center justify-center"
            style={{
              boxShadow: "0 18px 30px rgba(0,0,0,0.9), inset 0 1px 2px rgba(255,255,255,0.15)",
            }}
          >
            <div className="w-12 h-0.5 bg-[#181a1d] rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
