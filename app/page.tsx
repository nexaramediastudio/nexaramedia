import { Navbar } from "@/components/layout/Navbar";
import { AboutSection } from "@/sections/AboutSection";
import { HeroSection } from "@/sections/HeroSection";
import { ServicesSection } from "@/sections/ServicesSection";
import { VSSection } from "@/sections/VSSection";
import { ProcessSection } from "@/sections/ProcessSection";
import { WorkSection } from "@/sections/WorkSection";
import { CTASection } from "@/sections/CTASection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WorkSection />
        <VSSection />
        <ProcessSection />
        <CTASection />
      </main>
    </>
  );
}
