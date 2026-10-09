"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Check, Copy, ArrowUpRight, Terminal, GraduationCap } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-800/80 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Info Column */}
        <div className="lg:col-span-6">
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Let&apos;s build scalable <br />
            <span className="font-normal italic text-slate-400">systems together.</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base leading-relaxed max-w-lg">
            Always open to discussing high-concurrency systems, mobile architecture, startup collaborations, and technical challenges.
          </p>

          <div className="mt-8 space-y-4 font-mono text-xs">
            <div className="flex items-center gap-3 text-slate-300">
              <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>{PORTFOLIO_DATA.personal.location}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{PORTFOLIO_DATA.personal.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{PORTFOLIO_DATA.personal.email}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <GraduationCap className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <span>{PORTFOLIO_DATA.personal.education}</span>
            </div>
          </div>
        </div>

        {/* Right Terminal Card */}
        <div className="lg:col-span-6">
          <div className="rounded-2xl border border-slate-800 bg-[#070b0e] p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            {/* Terminal Topbar */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/80 font-mono text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-slate-400 font-semibold flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> aadil@system ~ connect.sh
                </span>
              </div>
              <span className="text-[10px] text-cyan-400/80">ONLINE_TTY</span>
            </div>

            {/* Terminal Body */}
            <div className="space-y-4 font-mono text-xs">
              <div className="text-slate-400">
                <span className="text-cyan-400">$</span> whoami
              </div>
              <div className="text-emerald-400 pl-4 border-l-2 border-emerald-500/40 leading-relaxed">
                &gt; Aadil Khan — Flutter Developer @ Urban Culture &amp; CTO @ Clystro
              </div>

              <div className="text-slate-400 pt-2">
                <span className="text-cyan-400">$</span> cat channel_info.json
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-slate-300 text-[11px] leading-relaxed">
                <pre className="overflow-x-auto">
{`{
  "name": "Aadil Khan",
  "email": "aadilkhan99a@gmail.com",
  "platforms": ["Flutter / Dart", "Node.js", "Firebase", "Android Systems"],
  "status": "Ready to Collaborate"
}`}
                </pre>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                  className="flex-1 h-11 rounded-xl bg-cyan-400 text-slate-950 font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-colors whitespace-nowrap"
                >
                  SEND DIRECT EMAIL <ArrowUpRight className="w-4 h-4" />
                </a>
                <button
                  onClick={copyEmail}
                  className="h-11 px-4 rounded-xl border border-slate-700 bg-slate-900/80 text-slate-300 font-mono text-xs font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors whitespace-nowrap"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> COPIED!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> COPY EMAIL
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
