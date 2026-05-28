import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/sections/HeroSection";
import { AboutSection } from "@/sections/AboutSection";
import { ProcessSection } from "@/sections/ProcessSection";
import { ServicesSection } from "@/sections/ServicesSection";
import { WorkSection } from "@/sections/WorkSection";
import { TestimonialsSection } from "@/sections/TestimonialsSection";
import { FAQSection } from "@/sections/FAQSection";
import { ContactSection } from "@/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProcessSection />
        <ServicesSection />
        <WorkSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
