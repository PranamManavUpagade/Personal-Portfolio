import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress, CustomCursor } from "@/components/layout/ScrollProgress";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { Hero } from "@/components/sections/Hero";
import { Impact } from "@/components/sections/Impact";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Skills } from "@/components/sections/Skills";
import { Credentials } from "@/components/sections/Credentials";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <CommandPalette />
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <Impact />
        <About />
        <Experience />
        <CaseStudies />
        <Skills />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
