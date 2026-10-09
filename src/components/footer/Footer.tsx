"use client";

import { ArrowUp } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#06080b] py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="text-slate-300 font-bold">AADIL KHAN ✳</span>
          <span>ANALOG SOUL / DIGITAL MIND</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={PORTFOLIO_DATA.personal.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            GITHUB
          </a>
          <a
            href={PORTFOLIO_DATA.personal.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            LINKEDIN
          </a>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            BACK TO TOP <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
