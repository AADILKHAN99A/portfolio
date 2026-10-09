"use client";

import { ArrowDownRight, Smartphone, Server, ShieldCheck, Terminal } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function HeroSection() {
  const highlights = [
    { icon: Smartphone, label: "Production Flutter Mobile", desc: "60 FPS architecture & state management" },
    { icon: Server, label: "Real-Time Cloud Backend", desc: "Node.js & Firebase Cloud Functions" },
    { icon: ShieldCheck, label: "Android Systems & Gradle", desc: "SDK migration, Play Integrity & build triage" },
  ];

  return (
    <section id="top" className="relative w-full pt-12 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Top Status Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800/80 font-mono text-xs text-slate-400">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse inline-block" />
          <span className="text-slate-300 font-semibold tracking-wide">
            CURRENT: FLUTTER DEVELOPER @ URBAN CULTURE // SYSTEMS ACTIVE
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <span>JAIPUR, IN</span>
          <span className="text-cyan-400/90 font-bold">EST. 2026 // 001</span>
        </div>
      </div>

      {/* Main Hero Header */}
      <div className="mt-12 sm:mt-16 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 font-mono text-xs text-cyan-300 tracking-wider mb-6">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>CROSS-PLATFORM &amp; SYSTEMS ENGINEER</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
          Engineering mobile platforms &amp; <br />
          <span className="italic font-normal text-slate-400">scalable backend systems.</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
          {PORTFOLIO_DATA.personal.bio}
        </p>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#systems"
            className="h-12 px-6 rounded-xl border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-mono text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all glow-box-cyan whitespace-nowrap"
          >
            EXPLORE SYSTEMS <ArrowDownRight className="w-4 h-4 text-cyan-400" />
          </a>
          <a
            href="#experience"
            className="h-12 px-6 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 font-mono text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all whitespace-nowrap"
          >
            VIEW EXPERIENCE
          </a>
        </div>
      </div>

      {/* Core Architectural Pillars Strip */}
      <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5">
        {highlights.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-slate-800/80 bg-[#090d12]/80 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-white text-sm tracking-wide">{item.label}</h2>
                <p className="mt-1 text-xs text-slate-400 font-mono leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
