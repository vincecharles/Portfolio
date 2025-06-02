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
      background: 'transparent', // Let the 3D background show through
    }}>
      {/* Remove the old background effect since we have 3D background */}      <motion.img
        src="/images/Me.jpg"
        alt="Vince Charles de Guzman"
        className="profile-img"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        whileHover={{ scale: 1.05 }}
        style={{
          width: 200,
          height: 200,
          borderRadius: '50%',
          objectFit: 'cover',
          marginBottom: 32,
          border: '4px solid rgba(79, 140, 255, 0.8)',
          boxShadow: '0 8px 32px rgba(79,140,255,0.4), 0 0 60px rgba(79,140,255,0.2)',
          zIndex: 1,
          backdropFilter: 'blur(10px)',
        }}
      />      <motion.h1
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        style={{ 
          fontSize: '3.5rem', 
          fontWeight: 800, 
          color: '#ffffff', 
          zIndex: 1,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #ffffff 0%, #4f8cff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0 4px 20px rgba(79, 140, 255, 0.3)',
        }}
      >
        Vince Charles de Guzman
      </motion.h1>
      <motion.p
        className="hero-subtitle"
        style={{ minHeight: 36, fontSize: '1.5rem', color: '#e0e0e0', margin: '16px 0', zIndex: 1 }}
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
      >          <a href="https://github.com/vincecharles" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub size={22} /></a>
          <a href="https://www.linkedin.com/in/vince-charles-40882b28a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin size={22} /></a>
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
