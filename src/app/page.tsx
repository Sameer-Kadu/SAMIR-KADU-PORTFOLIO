import HeroSection from "../components/sections/HeroSection";
import AboutMe from "../components/sections/AboutMe";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import ExperienceEducation from "../components/sections/ExperienceEducation";
import InterestsHobbies from "../components/sections/InterestsHobbies";
import ContactMe from "../components/sections/ContactMe";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutMe />
      <Skills />
      <Projects />
      <ExperienceEducation />
      <InterestsHobbies />
      <ContactMe />
    </main>
  );
}