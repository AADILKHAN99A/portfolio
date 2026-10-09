"use client";

import { Cpu, Layers, Cloud } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function SkillsSection() {
  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 1:
        return <Layers className="w-4 h-4 text-emerald-400" />;
      default:
        return <Cloud className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 border-t border-slate-800/80 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>CORE EXPERTISE & STACK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Technical <em className="font-normal italic text-slate-400">Proficiency.</em>
          </h2>
        </div>
        <p className="font-mono text-xs text-slate-500 max-w-md">
          Battle-tested libraries, architectural patterns, and production toolchains I use every day.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PORTFOLIO_DATA.skills.map((cat, idx) => (
          <div
            key={cat.category}
            className="rounded-2xl border border-slate-800 bg-[#0b1015]/90 p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800 font-mono text-xs">
                <span className="flex items-center gap-2 text-slate-300 font-semibold uppercase">
                  {getCategoryIcon(idx)} {cat.category}
                </span>
                <span className="text-slate-600">0{idx + 1}</span>
              </div>

              <div className="space-y-5">
                {cat.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between font-mono text-xs mb-1.5">
                      <span className="text-slate-200 font-medium">{skill.name}</span>
                      <span className="text-slate-500">{skill.level}%</span>
                    </div>
                    {/* Retro Segmented Bar */}
                    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/60 font-mono text-[10px] text-slate-600 flex justify-between">
              <span>STATUS: PRODUCTION</span>
              <span>VERIFIED</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
