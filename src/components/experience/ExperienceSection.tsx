"use client";

import { Briefcase, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 border-t border-slate-800/80 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Section Header */}
      <div className="mb-14">
        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Professional <span className="font-normal italic text-slate-400">Experience.</span>
        </h2>
        <p className="mt-3 font-mono text-xs text-slate-400 max-w-xl">
          Building and maintaining production-grade applications across mobile runtimes and cloud infrastructure.
        </p>
      </div>

      {/* Flagship Production Experience Card */}
      <div className="w-full">
        {PORTFOLIO_DATA.experiences.map((exp) => (
          <div
            key={exp.company}
            className="rounded-2xl border border-cyan-500/30 bg-[#0a0e13]/90 p-7 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Accent Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Header meta */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{exp.company}</h3>
                    <p className="font-mono text-xs text-cyan-400 font-medium">{exp.role}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end font-mono text-xs">
                  <span className="text-slate-300 font-semibold">{exp.period}</span>
                  {exp.badge && (
                    <span className="mt-1 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                      {exp.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Highlights in a responsive grid */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {exp.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-slate-800/60">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Tags */}
            <div className="mt-8 pt-6 border-t border-slate-800/60">
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300"
                  >
                    #{skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
