"use client";

import { ArrowUpRight, ShieldAlert, Radio, MapPin, CalendarCheck, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { PORTFOLIO_DATA, SystemWork } from "@/data/portfolioData";

export function SystemsSection() {
  const getSystemIcon = (id: string) => {
    switch (id) {
      case "realtime-engine":
        return <Radio className="w-5 h-5 text-cyan-400" />;
      case "location-tracking":
        return <MapPin className="w-5 h-5 text-emerald-400" />;
      case "fraud-detection":
        return <ShieldAlert className="w-5 h-5 text-amber-400" />;
      case "booking-platform":
        return <CalendarCheck className="w-5 h-5 text-sky-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="systems" className="py-20 border-t border-slate-800/80 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Systems &amp; <span className="font-normal italic text-slate-400">Architectures.</span>
          </h2>
          <p className="mt-3 font-mono text-xs text-slate-400 max-w-xl">
            Key subsystems and mission-critical engineering pipelines developed for production environments.
          </p>
        </div>
        <div className="font-mono text-xs text-slate-500 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
          <span>PRODUCTION-PROVEN ARCHITECTURES</span>
        </div>
      </div>

      {/* Systems Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PORTFOLIO_DATA.systemsWorkedOn.map((system: SystemWork) => {
          const isRetroPortal = system.id === "retro-pixel-portal";

          return (
            <div
              key={system.id}
              className={`rounded-2xl border border-slate-800 bg-[#090d12]/90 hover:border-cyan-500/40 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group ${
                isRetroPortal ? "md:col-span-2 border-cyan-500/20 bg-gradient-to-br from-[#0c131a] to-[#070a0e]" : ""
              }`}
            >
              {/* Card Ambient Glow */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none" />

              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80 font-mono text-xs">
                  <div className="flex items-center gap-2.5">
                    {getSystemIcon(system.id)}
                    <span className="text-slate-300 font-semibold uppercase">{system.category}</span>
                  </div>
                  {system.metricsOrScope && (
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-cyan-300 font-semibold tracking-wider uppercase">
                      {system.metricsOrScope}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {system.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-slate-400">{system.tagline}</p>
                <p className="mt-4 text-sm text-slate-400 leading-relaxed">{system.description}</p>

                {/* Architectural Highlights */}
                <div className="mt-5 space-y-2">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                    Core Architectural Decisions:
                  </p>
                  {system.architecturalHighlights.map((point: string, i: number) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-cyan-400 font-mono">›</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Tech tags + links */}
              <div className="mt-8 pt-5 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {system.techStack.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 font-mono text-[11px] text-slate-300"
                    >
                      #{tech}
                    </span>
                  ))}
                </div>

                {/* Actions if present */}
                {(system.githubUrl || system.liveUrl) && (
                  <div className="flex items-center gap-4 font-mono text-xs">
                    {system.githubUrl && (
                      <a
                        href={system.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors font-medium"
                      >
                        <GithubIcon className="w-3.5 h-3.5" /> REPOSITORY
                      </a>
                    )}
                    {system.liveUrl && (
                      <a
                        href={system.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
                      >
                        EXPERIENCE <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
