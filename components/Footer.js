import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div className="hero-socials" style={{ marginBottom: 8 }}>
          <a href="https://github.com/vincecharles" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub size={22} /></a>
          <a href="https://linkedin.com/in/vincehttps://www.linkedin.com/in/vince-charles-40882b28a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin size={22} /></a>
          <a href="mailto:vincecharlesdeguzman@gmail.com" aria-label="Email"><FaEnvelope size={22} /></a>
        </div>
        <p style={{ fontSize: 14, color: '#888' }}>&copy; {new Date().getFullYear()} Vince de Guzman</p>
      </div>
    </footer>
  );
}
