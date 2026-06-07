import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/sections/HeroSection";
import { ServicesSection } from "@/sections/ServicesSection";
import { VSSection } from "@/sections/VSSection";
import { ProcessSection } from "@/sections/ProcessSection";
import { WorkSection } from "@/sections/WorkSection";
import { TestimonialsSection } from "@/sections/TestimonialsSection";
import { CTASection } from "@/sections/CTASection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <VSSection />
        <ProcessSection />
        <WorkSection />
        <TestimonialsSection />
        <CTASection />
      </main>
    </>
  );
}
