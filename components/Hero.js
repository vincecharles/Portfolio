import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Hero() {
  return (
    <section className="hero center-content">
      <h1>Vince de Guzman</h1>
      <p className="hero-subtitle">Full Stack Developer | Building modern web experiences</p>
      <div className="hero-socials">
        <a href="https://github.com/vince" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub size={28} /></a>
        <a href="https://linkedin.com/in/vince" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin size={28} /></a>
        <a href="mailto:vince@email.com" aria-label="Email"><FaEnvelope size={28} /></a>
      </div>
      <a href="/resume" className="hero-cta">View Resume</a>
    </section>
  );
}
