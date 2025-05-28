'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/projects">Projects</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/resume">Resume</Link>
    </nav>
  );
}
