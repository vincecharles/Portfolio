import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div className="hero-socials" style={{ marginBottom: 8 }}>
          <a href="https://github.com/vince" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub size={22} /></a>
          <a href="https://linkedin.com/in/vince" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin size={22} /></a>
          <a href="mailto:vince@email.com" aria-label="Email"><FaEnvelope size={22} /></a>
        </div>
        <p style={{ fontSize: 14, color: '#888' }}>&copy; {new Date().getFullYear()} Vince de Guzman</p>
      </div>
    </footer>
  );
}
