"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { RotateCcw, Sparkles, ZoomIn, ZoomOut } from "lucide-react";

interface CrtScreenFrameProps {
  children: React.ReactNode;
}

export function CrtScreenFrame({ children }: CrtScreenFrameProps) {
  // Lifecycle stages:
  // 1. "booting": small monitor with stand centered on desk, boot sequence on screen (0 - 2.2s)
  // 2. "preview": small monitor with stand, LIVE website visibly active inside screen! (2.2s - 4.2s)
  // 3. "zoomed": monitor smoothly scales & expands to take full screen frame with bezels, buttons, and stand
  const [stage, setStage] = useState<"booting" | "preview" | "zoomed">("booting");
  const [bootProgress, setBootProgress] = useState(0);
  const [scanlinesEnabled, setScanlinesEnabled] = useState(true);

  // Boot sequence logic
  useEffect(() => {
    if (stage !== "booting") return;

    const interval = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Step 1: Reveal live website inside small monitor screen with stand!
          setTimeout(() => setStage("preview"), 250);
          // Step 2: Give user a clear 2-second window to view website inside the small monitor,
          // then smoothly zoom and expand into full-screen workstation frame!
          setTimeout(() => setStage("zoomed"), 2200);
          return 100;
        }
        return Math.min(100, prev + Math.floor(Math.random() * 9 + 6));
      });
    }, 110);

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

      {/* Floating Status & Skip Bar (Visible during small/booting/preview stage) */}
      {isSmall && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-5 left-5 right-5 z-50 flex items-center justify-between font-mono text-xs text-slate-400"
        >
          <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 shadow-xl">
            <span
              className={`w-2 h-2 rounded-full ${
                stage === "booting" ? "bg-amber-400 animate-ping" : "bg-cyan-400 animate-pulse"
              }`}
            />
            <span className="text-slate-300 font-semibold tracking-wider text-[11px]">
              {stage === "booting"
                ? "INITIALIZING WORKSTATION KERNEL..."
                : "WEBSITE ACTIVE IN MONITOR // COMMENCING ZOOM"}
            </span>
          </div>

          <button
            onClick={() => setStage("zoomed")}
            className="px-3.5 py-1.5 rounded-lg border border-cyan-500/30 bg-slate-900/90 hover:bg-cyan-950/40 text-cyan-300 font-mono text-xs tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-lg hover:border-cyan-400"
          >
            <span>{stage === "booting" ? "SKIP BOOT" : "EXPAND NOW"}</span>
            <span className="text-cyan-400">››</span>
          </button>
        </motion.div>
      )}

      {/* ============================================================== */}
      {/* UNIFIED CRT MONITOR (SCALES AND ZOOMS FROM DESK TO FULL FRAME) */}
      {/* ============================================================== */}
      <motion.div
        className="relative flex flex-col items-center justify-center z-20"
        style={{
          width: "100vw",
          height: "100vh",
          transformOrigin: "center center",
        }}
        animate={{
          // Optical camera zoom: scales up the whole physical monitor, stand, and screen contents
          scale: isSmall ? 0.64 : 1.0,
          padding: isSmall ? "0px" : "clamp(4px, 1vw, 12px)",
        }}
        transition={{
          duration: 1.5,
          ease: [0.19, 1, 0.22, 1], // Cinematic smooth camera dive
        }}
      >
        {/* ============================================================== */}
        {/* MONITOR HOUSING (MOLDED CHASSIS)                               */}
        {/* ============================================================== */}
        <motion.div
          className="relative w-full flex-1 min-h-0 flex flex-col justify-between overflow-hidden transition-all"
          style={{
            backgroundColor: "#2e3137", // CRT monitor bezel tone
            borderRadius: isSmall ? "28px" : "clamp(14px, 1.6vw, 24px)",
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
                title={isSmall ? "Zoom into Monitor" : "Zoom out to Desk View"}
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
                transition={{ duration: 0.35 }}
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
                  <p className="opacity-60">&gt; Loading systems architecture &amp; production models...</p>
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
            opacity: 1, // Full fidelity in both desk view and full-screen frame
            scale: isSmall ? 1 : 0.95,
            marginTop: isSmall ? "0px" : "-4px",
          }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Angled Neck / Swivel Hinge */}
          <div
            className="w-24 sm:w-32 h-4 sm:h-5 bg-[#32353b] border-x border-[#222428] shadow-lg"
            style={{
              clipPath: "polygon(18% 0%, 82% 0%, 100% 100%, 0% 100%)",
            }}
          />

          {/* Weighted Desk Base Foot */}
          <div
            className="w-52 sm:w-72 h-3 sm:h-3.5 rounded-b-xl bg-[#24262b] border-t border-[#3c3f46] shadow-2xl flex items-center justify-center"
            style={{
              boxShadow: "0 18px 35px rgba(0,0,0,0.95), inset 0 1px 2px rgba(255,255,255,0.2)",
            }}
          >
            <div className="w-16 h-0.5 bg-[#141517] rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
