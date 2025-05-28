"use client";
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const roles = [
  'Full Stack Developer',
  'React Enthusiast',
  'UI/UX Explorer',
  'Open Source Contributor',
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIdx((idx) => (idx + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero center-content" id="hero">
      <img src="/profile.jpg" alt="Vince de Guzman" className="profile-img" style={{ width: 140, height: 140, borderRadius: '50%', objectFit: 'cover', marginBottom: 24, border: '4px solid #1a73e8', boxShadow: '0 4px 24px rgba(26,115,232,0.10)' }} />
      <h1>Vince de Guzman</h1>
      <p className="hero-subtitle" style={{ minHeight: 32 }}>
        {roles[roleIdx]}
      </p>
      <div className="hero-socials">
        <a href="https://github.com/vince" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub size={28} /></a>
        <a href="https://linkedin.com/in/vince" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin size={28} /></a>
        <a href="mailto:vince@email.com" aria-label="Email"><FaEnvelope size={28} /></a>
      </div>
      <a href="/resume" className="hero-cta">View Resume</a>
    </section>
  );
}
