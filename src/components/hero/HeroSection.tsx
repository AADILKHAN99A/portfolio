"use client";

import { useState } from "react";
import { ArrowDownRight, RotateCcw, Terminal, Sparkles } from "lucide-react";
import { RetroMonitor } from "@/components/3d/RetroMonitor";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function HeroSection() {
  const [restart, setRestart] = useState(0);

  return (
    <section id="top" className="relative w-full pt-6 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Kicker bar */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800/80 font-mono text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
          <span className="font-semibold text-slate-300">SYSTEM ONLINE // PORTAL ACTIVE</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <span>JAIPUR, IN</span>
          <span>EST. 2026</span>
          <span className="text-cyan-400/80 font-bold">/ 001</span>
        </div>
      </div>

      {/* 3D Monitor Stage */}
      <div className="relative mt-8 w-full h-[480px] sm:h-[580px] lg:h-[660px] rounded-2xl border border-slate-800 bg-gradient-to-b from-[#0f171d] via-[#0a0f13] to-[#080b0e] overflow-hidden crt-grid-bg">
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

      {/* Hero Intro & Actions */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CROSS-PLATFORM ARCHITECT & FULL-STACK CREATOR</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
            Crafting software with <br />
            <em className="font-normal italic text-slate-400">precision & motion.</em>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            {PORTFOLIO_DATA.personal.bio}
          </p>
        </div>

        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
          <button
            onClick={() => setRestart((v) => v + 1)}
            className="h-12 px-5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 hover:border-cyan-400 text-cyan-300 font-mono text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all glow-box-cyan"
          >
            <RotateCcw className="w-4 h-4" /> REBOOT CRT MONITOR
          </button>
          <a
            href="#projects"
            className="h-12 px-5 rounded-xl border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-200 font-mono text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all"
          >
            EXPLORE PROJECTS <ArrowDownRight className="w-4 h-4 text-cyan-400" />
          </a>
        </div>
      </div>
    </section>
  );
}
