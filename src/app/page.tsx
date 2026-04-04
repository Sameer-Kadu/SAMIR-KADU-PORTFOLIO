import HeroSection from "../components/sections/HeroSection";
import AboutMe from "../components/sections/AboutMe";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import ExperienceEducation from "../components/sections/ExperienceEducation";
import ContactMe from "../components/sections/ContactMe";
import InterestsHobbies from "../components/sections/InterestsHobbies";
import AnimatedSection from "../components/shared/AnimatedSection";

export default function Home() {
  return (
    <main>
      {/* 1. Hook — who you are + what you do */}
      <HeroSection />

      {/* 2. Trust — story, values, credentials */}
      <AnimatedSection id="about">
        <AboutMe />
      </AnimatedSection>

      {/* 3. Capability — tech stack */}
      <AnimatedSection id="skills">
        <Skills />
      </AnimatedSection>

      {/* 4. Proof — real work + outcomes */}
      <AnimatedSection id="projects">
        <Projects />
      </AnimatedSection>

      {/* 5. Credibility — career timeline */}
      <AnimatedSection id="experience">
        <ExperienceEducation />
      </AnimatedSection>

      {/* 6. Conversion — contact CTA */}
      <AnimatedSection id="contact">
        <ContactMe />
      </AnimatedSection>

      {/* 7. Personality — interests (non-critical, placed last) */}
      <AnimatedSection id="interests">
        <InterestsHobbies />
      </AnimatedSection>
    </main>
  );
}
