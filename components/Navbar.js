'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const navLinks = [
  { href: '/#hero', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact' },
  { href: '/resume', label: 'Resume' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY + 80 >= el.offsetTop) {
          setActive(sections[i].charAt(0).toUpperCase() + sections[i].slice(1));
          return;
        }
      }
      setActive('Home');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="navbar" style={{
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 2px 16px rgba(26,115,232,0.04)',
      borderBottom: '1px solid #e5e7eb',
    }}>
      <div className="navbar-logo">
        <Link href="/" className="navbar-brand">Vince</Link>
      </div>
      <button className="navbar-toggle" onClick={handleMenuToggle} aria-label="Toggle menu">
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      <div className={`navbar-links${menuOpen ? ' open' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={handleLinkClick}
            className={
              active === link.label || (active === 'Home' && link.label === 'Home')
                ? 'active'
                : ''
            }
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
