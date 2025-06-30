"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { HERO_SECTION } from "../../lib/constants";
import ParticlesContainer from "../../components/shared/ParticlesContainer";
import TypewriterText from "../../components/shared/TypewriterText"

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  // Assuming you have multiple roles/titles to cycle through
  const roles = ["Full Stack Developer", "UI/UX Designer", "Problem Solver", "Tech Enthusiast"];
  
  useEffect(() => {
    setMounted(true);
    
    // Typewriter effect for roles
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
      >
        {/* Enhanced Background with Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-black">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23e5e7eb&quot; fill-opacity=&quot;0.03&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23374151&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>
        
        <ParticlesContainer />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className={`relative z-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Avatar with Enhanced Styling */}
          <div className={`mb-8 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <Image
                src={HERO_SECTION.avatar}
                alt={HERO_SECTION.name}
                width={160}
                height={160}
                className="relative rounded-full shadow-2xl ring-4 ring-white dark:ring-gray-800 hover:scale-105 transition-transform duration-300"
                priority
              />
              {/* Status Indicator */}
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 animate-pulse"></div>
            </div>
          </div>

          {/* Main Heading with Stagger Animation */}
          <div className={`mb-6 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Hi, I'm {HERO_SECTION.name}
              </span>
            </h1>
            
            {/* Animated Role/Title with Typewriter Effect */}
            <div className="h-16 sm:h-20 flex items-center justify-center">
              <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-600 dark:text-gray-300">
              <span className="inline-block min-w-0">
                {mounted && (
                <TypewriterText
                  text={roles[currentWordIndex]}
                  key={currentWordIndex}
                />
                )}
              </span>
              <span className="animate-pulse">|</span>
              </p>
            </div>
          </div>

          {/* Tagline */}
          <div className={`mb-8 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {HERO_SECTION.introText}
            </p>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className={`flex flex-col sm:flex-row justify-center items-center gap-4 transition-all duration-1000 delay-900 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {HERO_SECTION.ctaButtons.map((button, index) => (
              <a
                key={index}
                href={button.link}
                target={button.type === "download" ? "_blank" : "_self"}
                rel={button.type === "download" ? "noopener noreferrer" : ""}
                className={`group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                  index === 0
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-500/25"
                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 shadow-lg hover:shadow-xl"
                }`}
              >
                <span className="relative z-10">{button.text}</span>
                {index === 0 && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                )}
              </a>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className={`mt-16 transition-all duration-1000 delay-1100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button
              onClick={() => scrollToSection('about')}
              className="flex flex-col items-center space-y-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group"
              aria-label="Scroll to about section"
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
                <div className="w-1 h-3 bg-current rounded-full mt-2 animate-bounce group-hover:animate-pulse"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
      </section>
    </>
  );
};

export default HeroSection;