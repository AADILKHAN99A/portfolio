"use client";

import { Smartphone, Wrench, Server } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function SkillsSection() {
  const getGroupIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 1:
        return <Wrench className="w-5 h-5 text-emerald-400" />;
      default:
        return <Server className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 border-t border-slate-800/80 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Section Header */}
      <div className="mb-14">
        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Technical <span className="font-normal italic text-slate-400">Expertise.</span>
        </h2>
        <p className="mt-3 font-mono text-xs text-slate-400 max-w-xl">
          Deep engineering capabilities spanning client-side mobile rendering, native Android build pipelines, and cloud backend microservices.
        </p>
      </div>

      {/* 3-Column Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PORTFOLIO_DATA.technicalExpertise.map((group, idx) => (
          <div
            key={group.title}
            className="rounded-2xl border border-slate-800 bg-[#090d12]/90 p-7 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                    {getGroupIcon(idx)}
                  </div>
                  <h3 className="font-bold text-white text-base">{group.title}</h3>
                </div>
                <span className="font-mono text-xs text-slate-600">0{idx + 1}</span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-6 font-mono">
                {group.description}
              </p>

              {/* Skills List with technical bullet tags */}
              <ul className="space-y-2.5">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2.5 text-xs text-slate-300 font-mono bg-slate-900/60 p-2 rounded-lg border border-slate-800/80"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span className="font-medium">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/60 font-mono text-[10px] text-slate-500 flex justify-between">
              <span>ENVIRONMENT</span>
              <span>LINUX / UBUNTU / PROD</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
