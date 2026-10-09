"use client";

import { Briefcase, Building2, CheckCircle2 } from "lucide-react";
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

      {/* Experience Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {PORTFOLIO_DATA.experiences.map((exp, idx) => (
          <div
            key={exp.company}
            className={`rounded-2xl border border-slate-800 bg-[#0a0e13]/90 p-7 sm:p-9 flex flex-col justify-between ${
              idx === 0 ? "lg:col-span-7 border-cyan-500/30" : "lg:col-span-5"
            }`}
          >
            <div>
              {/* Header meta */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    {idx === 0 ? <Briefcase className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                    <p className="font-mono text-xs text-cyan-400/90 font-medium">{exp.role}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end font-mono text-xs">
                  <span className="text-slate-400">{exp.period}</span>
                  {exp.badge && (
                    <span className="mt-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-semibold uppercase">
                      {exp.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Highlights */}
              <div className="mt-6 space-y-3">
                {exp.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
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
