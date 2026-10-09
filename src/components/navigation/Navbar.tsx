"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#080b0e]/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="#top" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-mono text-cyan-400 font-bold text-sm group-hover:border-cyan-400 transition-colors">
            AK
          </span>
          <span className="font-mono text-xs tracking-wider text-slate-300 font-semibold uppercase">
            Aadil Khan <span className="text-cyan-400">✳</span>
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-wider text-slate-400">
          <Link href="#about" className="hover:text-cyan-400 transition-colors">
            // ABOUT
          </Link>
          <Link href="#projects" className="hover:text-cyan-400 transition-colors">
            // PROJECTS
          </Link>
          <Link href="#skills" className="hover:text-cyan-400 transition-colors">
            // SKILLS
          </Link>
          <Link href="#contact" className="hover:text-cyan-400 transition-colors">
            // CONTACT
          </Link>
        </nav>

        {/* Social Actions */}
        <div className="flex items-center gap-3">
          <a
            href={PORTFOLIO_DATA.personal.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={PORTFOLIO_DATA.personal.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-400/10 border border-cyan-400/30 font-mono text-xs font-semibold text-cyan-300 hover:bg-cyan-400/20 hover:border-cyan-400 transition-all"
          >
            GET IN TOUCH <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
