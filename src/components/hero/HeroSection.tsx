"use client";

import { useState } from "react";
import { ArrowDownRight, RotateCcw, Terminal } from "lucide-react";
import { RetroMonitor } from "@/components/3d/RetroMonitor";

export function HeroSection() {
  const [restart, setRestart] = useState(0);

  return (
    <section id="top" className="relative w-full pt-6 pb-16 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Telemetry Status Strip */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 font-mono text-xs text-slate-400">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse inline-block" />
          <span className="text-slate-300 font-semibold tracking-wide">
            CURRENT: FLUTTER DEVELOPER @ URBAN CULTURE // SYSTEMS ACTIVE
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-slate-500">
          <span>JAIPUR, IN</span>
          <span>SYSTEM ACTIVE</span>
          <span className="text-cyan-400/90 font-bold">/ 001</span>
        </div>
      </div>

      {/* 3D CRT Monitor Stage */}
      <div className="relative mt-6 w-full h-[440px] sm:h-[540px] lg:h-[620px] rounded-2xl border border-slate-800 bg-gradient-to-b from-[#0f171d] via-[#090e12] to-[#070a0e] overflow-hidden crt-grid-bg">
        {/* Stage Topline */}
        <div className="absolute top-4 left-6 right-6 z-20 flex justify-between font-mono text-xs text-slate-500 tracking-wider">
          <span className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" /> FIG. 01 — 3D HARDWARE SIMULATION
          </span>
          <span>CRT PHOSPHOR 60Hz</span>
        </div>

        {/* 3D Canvas */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <RetroMonitor restart={restart} />
        </div>

        {/* Side Note */}
        <div className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 z-20 font-mono text-[10px] tracking-widest text-slate-600 [writing-mode:vertical-rl] select-none">
          MOVE CURSOR · ROTATE 3D MONITOR
        </div>

        {/* Stage Bottomline */}
        <div className="absolute bottom-4 left-6 right-6 z-20 flex justify-between font-mono text-xs text-slate-500 tracking-wider">
          <span>ANALOG SOUL / DIGITAL MIND</span>
          <span>© AADIL KHAN</span>
        </div>
      </div>

      {/* Hero Content Stack (Strictly Max 4 Text Elements) */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
        <div className="lg:col-span-8">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.08]">
            Engineering mobile platforms &amp; <br />
            <span className="italic font-normal text-slate-400">scalable backend systems.</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
            Specializing in production Flutter architectures, real-time data sync, and resilient system-level mobile engineering.
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
          <a
            href="#systems"
            className="h-12 px-5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-mono text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all glow-box-cyan whitespace-nowrap"
          >
            EXPLORE SYSTEMS <ArrowDownRight className="w-4 h-4 text-cyan-400" />
          </a>
          <button
            onClick={() => setRestart((v) => v + 1)}
            className="h-12 px-5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 font-mono text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" /> REBOOT CRT MONITOR
          </button>
        </div>
      </div>
    </section>
  );
}
