"use client";

import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 border-t border-slate-800/80 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>SELECTED REPOSITORIES & WORK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Featured <em className="font-normal italic text-slate-400">Engineering.</em>
          </h2>
        </div>
        <p className="font-mono text-xs text-slate-500 max-w-md">
          A showcase of cross-platform applications, reactive UI frameworks, and interactive WebGL experiences.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PORTFOLIO_DATA.projects.map((project, idx) => (
          <div
            key={project.id}
            className="group relative rounded-2xl border border-slate-800 bg-[#0b1015]/90 hover:border-cyan-500/50 hover:bg-[#0d1319] p-7 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Ambient Card Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none" />

            <div>
              <div className="flex items-center justify-between font-mono text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1.5 text-cyan-400/90 font-semibold">
                  <FolderGit2 className="w-3.5 h-3.5" /> 0{idx + 1} // REPO
                </span>
                {project.featured && (
                  <span className="px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] uppercase font-bold tracking-wider">
                    FEATURED
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                {project.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-slate-400 font-medium">
                {project.tagline}
              </p>
              <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/60">
              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Card Links */}
              <div className="flex items-center gap-4 font-mono text-xs">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors font-medium"
                  >
                    <GithubIcon className="w-3.5 h-3.5" /> SOURCE CODE
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
                  >
                    LIVE DEMO <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
