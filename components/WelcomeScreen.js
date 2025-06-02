"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WelcomeScreen({ onComplete = () => {} }) {
  const [showLogo, setShowLogo] = useState(true);
  const [showText, setShowText] = useState(false);
  useEffect(() => {
    // Show logo for 1.5 seconds
    const logoTimer = setTimeout(() => {
      setShowText(true);
    }, 1000);
    
    // Hide everything and show main app after 3 seconds
    const completeTimer = setTimeout(() => {
      setShowLogo(false);
      if (onComplete) {
        setTimeout(onComplete, 600); // Wait for fade out animation
      }
    }, 2800);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showLogo && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            overflow: 'hidden'
          }}
        >
          {/* Simple background glow */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at 50% 50%, rgba(79, 140, 255, 0.15) 0%, transparent 70%)',
          }} />
          
          {/* Animated background grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 2 }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundImage: `
                linear-gradient(rgba(26, 115, 232, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(26, 115, 232, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0, rotateY: -180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ 
              duration: 1.2, 
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            style={{
              position: 'relative',
              marginBottom: '2rem'
            }}
          >
            <motion.img
              src="/images/logo.svg"
              alt="Portfolio Logo"
              style={{ width: '150px', height: '150px' }}
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            {/* Glow effect */}
            <motion.div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(26, 115, 232, 0.3) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: -1
              }}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </motion.div>

          {/* Welcome Text */}
          <AnimatePresence>
            {showText && (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center' }}
              >
                <motion.h1
                  style={{
                    color: '#fff',
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    marginBottom: '1rem',
                    background: 'linear-gradient(45deg, #1a73e8, #4f8cff, #1a73e8)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundSize: '200% 200%'
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  Vince Charles's 
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  style={{
                    color: '#a0a0a0',
                    fontSize: '1.2rem',
                    fontWeight: '400'
                  }}
                >
                 portfolio
                </motion.p>

                {/* Loading dots */}
                <motion.div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginTop: '2rem'
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#1a73e8',
                        borderRadius: '50%'
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
