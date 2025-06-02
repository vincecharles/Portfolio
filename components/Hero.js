"use client";
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const roles = [
  'Full Stack Developer',
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
    <section className="hero center-content" id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(120deg, #e3f0ff 0%, #f9f9f9 100%)',
    }}>
      {/* Background effect */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '-20%',
        width: '140%',
        height: '140%',
        background: 'radial-gradient(circle at 60% 40%, #1a73e8 0%, transparent 60%)',
        opacity: 0.08,
        zIndex: 0,
      }} />
      <motion.img
        src="/public/images/Me.jpg"
        alt="Vince Charles de Guzman"
        className="profile-img"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        style={{
          width: 180,
          height: 180,
          borderRadius: '50%',
          objectFit: 'cover',
          marginBottom: 32,
          border: '5px solid #1a73e8',
          boxShadow: '0 8px 32px rgba(26,115,232,0.15)',
          zIndex: 1,
        }}
      />
      <motion.h1
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        style={{ fontSize: '3rem', fontWeight: 800, color: '#1a73e8', zIndex: 1 }}
      >
        Vince Charles de Guzman
      </motion.h1>
      <motion.p
        className="hero-subtitle"
        style={{ minHeight: 36, fontSize: '1.5rem', color: '#333', margin: '16px 0', zIndex: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        {roles[roleIdx]}
      </motion.p>
      <motion.div
        className="hero-socials"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        style={{ zIndex: 1 }}
      >
          <a href="https://github.com/vincecharles" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub size={22} /></a>
          <a href="https://linkedin.com/in/vincehttps://www.linkedin.com/in/vince-charles-40882b28a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin size={22} /></a>
          <a href="mailto:vincecharlesdeguzman@outlook.com" aria-label="Email"><FaEnvelope size={22} /></a>
      </motion.div>
      <motion.a
        href="/resume"
        className="hero-cta"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        style={{ zIndex: 1 }}
      >
        View Resume
      </motion.a>
    </section>
  );
}
