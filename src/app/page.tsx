import { CrtScreenFrame } from "@/components/crt/CrtScreenFrame";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { SystemsSection } from "@/components/systems/SystemsSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <CrtScreenFrame>
      <div className="min-h-screen bg-[#070a0e] text-[#e6edf3] selection:bg-cyan-500/20 selection:text-cyan-300 antialiased">
        <Navbar />
        <main>
          <HeroSection />
          <ExperienceSection />
          <SystemsSection />
          <SkillsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </CrtScreenFrame>
  );
}
