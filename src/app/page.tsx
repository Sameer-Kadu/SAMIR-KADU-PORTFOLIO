import HeroSection from "../components/sections/HeroSection";
import AboutMe from "../components/sections/AboutMe";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import ExperienceEducation from "../components/sections/ExperienceEducation";
import InterestsHobbies from "../components/sections/InterestsHobbies";
import ContactMe from "../components/sections/ContactMe";
import AnimatedSection from "../components/shared/AnimatedSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AnimatedSection id="about">
        <AboutMe />
      </AnimatedSection>
      <AnimatedSection id="skills">
        <Skills />
      </AnimatedSection>
      <AnimatedSection id="projects">
        <Projects />
      </AnimatedSection>
      <AnimatedSection id="experience">
        <ExperienceEducation />
      </AnimatedSection>
      <AnimatedSection id="interests">
        <InterestsHobbies />
      </AnimatedSection>
      <AnimatedSection id="contact">
        <ContactMe />
      </AnimatedSection>
    </main>
  );
}