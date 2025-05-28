'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link href="/" className="navbar-brand">Vince</Link>
      </div>
      <button className="navbar-toggle" onClick={handleMenuToggle} aria-label="Toggle menu">
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      <div className={`navbar-links${menuOpen ? ' open' : ''}`}>
        <Link href="/#hero" onClick={handleLinkClick}>Home</Link>
        <Link href="/#about" onClick={handleLinkClick}>About</Link>
        <Link href="/#projects" onClick={handleLinkClick}>Projects</Link>
        <Link href="/#contact" onClick={handleLinkClick}>Contact</Link>
        <Link href="/resume" onClick={handleLinkClick}>Resume</Link>
      </div>
    </nav>
  );
}
