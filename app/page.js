"use client";
import { useState } from 'react';
import WelcomeScreen from '../components/WelcomeScreen';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import CutRoomSection from '../components/CutRoomSection';
import GitHubSection from '../components/GitHubSection';
import ContactSection from '../components/ContactSection';

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  return (
    <>      {showWelcome && <WelcomeScreen onComplete={handleWelcomeComplete} />}
      {!showWelcome && (
        <>
          <div id="hero" className="section-dark">
            <Hero />
          </div>
          <div id="about" className="section-light">
            <AboutSection />
          </div>
          <div id="projects" className="section-dark">
            <ProjectsSection />
          </div>
          <div id="cutroom" className="section-light">
            <CutRoomSection />
          </div>
          <div id="github" className="section-dark">
            <GitHubSection />
          </div>
          <div id="contact" className="section-dark">
            <ContactSection />
          </div>
        </>
      )}
    </>
  );
}
