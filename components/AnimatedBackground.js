"use client";
import { useEffect, useRef } from 'react';

// Particle network config
const CONFIG = {
  particleCount: 140,
  connectionDistance: 160,
  particleSpeed: 0.5,
  particleRadius: 2.5,
  primaryColor: { r: 79, g: 140, b: 255 },   // #4f8cff
  accentColor: { r: 139, g: 92, b: 246 },     // #8b5cf6
  pinkColor: { r: 236, g: 72, b: 153 },       // #ec4899
  cyanColor: { r: 6, g: 182, b: 212 },        // #06b6d4
  bgColor: '#0d1117',
  mouseRadius: 180,
  mouseRepelStrength: 4,
};

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function pickColor() {
  const palette = [
    CONFIG.primaryColor,
    CONFIG.accentColor,
    CONFIG.pinkColor,
    CONFIG.cyanColor,
  ];
  return palette[Math.floor(Math.random() * palette.length)];
}

export default function AnimatedBackground({ children }) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // ── Particles ───────────────────────────────────────────────
    const particles = Array.from({ length: CONFIG.particleCount }, () => {
      const color = pickColor();
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: randomBetween(-CONFIG.particleSpeed, CONFIG.particleSpeed),
        vy: randomBetween(-CONFIG.particleSpeed, CONFIG.particleSpeed),
        r: randomBetween(1, CONFIG.particleRadius),
        color,
        alpha: randomBetween(0.5, 1),
        pulseOffset: Math.random() * Math.PI * 2,
      };
    });

    // ── Resize handler ───────────────────────────────────────────
    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener('resize', onResize);

    // ── Mouse tracking ───────────────────────────────────────────
    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    // ── Animate ──────────────────────────────────────────────────
    let t = 0;
    const draw = () => {
      t += 0.012;

      // Dark background with very subtle fade trail
      ctx.fillStyle = 'rgba(13, 17, 23, 0.18)';
      ctx.fillRect(0, 0, W, H);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repel
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.mouseRadius && dist > 0) {
          const force = (CONFIG.mouseRadius - dist) / CONFIG.mouseRadius;
          p.vx += (dx / dist) * force * CONFIG.mouseRepelStrength * 0.08;
          p.vy += (dy / dist) * force * CONFIG.mouseRepelStrength * 0.08;
        }

        // Velocity damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Clamp speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > CONFIG.particleSpeed * 2) {
          p.vx = (p.vx / speed) * CONFIG.particleSpeed * 2;
          p.vy = (p.vy / speed) * CONFIG.particleSpeed * 2;
        }
        if (speed < 0.05) {
          p.vx += randomBetween(-0.05, 0.05);
          p.vy += randomBetween(-0.05, 0.05);
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -20) p.x = W + 20;
        if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        if (p.y > H + 20) p.y = -20;

        // Pulsing alpha
        const pulse = 0.7 + 0.3 * Math.sin(t * 1.5 + p.pulseOffset);

        // Draw particle
        const c = p.color;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3.5);
        grd.addColorStop(0, `rgba(${c.r},${c.g},${c.b},${pulse})`);
        grd.addColorStop(0.4, `rgba(${c.r},${c.g},${c.b},${pulse * 0.5})`);
        grd.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const cdx = p.x - q.x;
          const cdy = p.y - q.y;
          const cd = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cd < CONFIG.connectionDistance) {
            const lineAlpha = (1 - cd / CONFIG.connectionDistance) * 0.55;
            const r = Math.floor((c.r + q.color.r) / 2);
            const g = Math.floor((c.g + q.color.g) / 2);
            const b = Math.floor((c.b + q.color.b) / 2);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${r},${g},${b},${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Mouse glow orb
      if (mx > 0) {
        const mgrd = ctx.createRadialGradient(mx, my, 0, mx, my, CONFIG.mouseRadius * 0.6);
        mgrd.addColorStop(0, 'rgba(79,140,255,0.08)');
        mgrd.addColorStop(1, 'rgba(79,140,255,0)');
        ctx.beginPath();
        ctx.arc(mx, my, CONFIG.mouseRadius * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = mgrd;
        ctx.fill();
      }

      // Floating nebula blobs (slow, large, atmospheric)
      const blobs = [
        { cx: W * 0.12, cy: H * 0.18, r: 340, c: CONFIG.primaryColor },
        { cx: W * 0.88, cy: H * 0.25, r: 280, c: CONFIG.accentColor },
        { cx: W * 0.5,  cy: H * 0.85, r: 260, c: CONFIG.pinkColor },
        { cx: W * 0.75, cy: H * 0.6,  r: 220, c: CONFIG.cyanColor },
        { cx: W * 0.25, cy: H * 0.7,  r: 200, c: CONFIG.accentColor },
      ];
      blobs.forEach((b, idx) => {
        const ox = Math.sin(t * 0.22 + idx * 1.5) * 35;
        const oy = Math.cos(t * 0.18 + idx * 1.2) * 28;
        const bgrd = ctx.createRadialGradient(b.cx + ox, b.cy + oy, 0, b.cx + ox, b.cy + oy, b.r);
        bgrd.addColorStop(0, `rgba(${b.c.r},${b.c.g},${b.c.b},0.09)`);
        bgrd.addColorStop(0.5, `rgba(${b.c.r},${b.c.g},${b.c.b},0.04)`);
        bgrd.addColorStop(1, `rgba(${b.c.r},${b.c.g},${b.c.b},0)`);
        ctx.beginPath();
        ctx.arc(b.cx + ox, b.cy + oy, b.r, 0, Math.PI * 2);
        ctx.fillStyle = bgrd;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    // Full initial clear
    ctx.fillStyle = CONFIG.bgColor;
    ctx.fillRect(0, 0, W, H);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', minHeight: '100vh' }}>
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          background: CONFIG.bgColor,
        }}
        aria-hidden="true"
      />

      {/* Vignette overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(ellipse at center, transparent 40%, rgba(13,17,23,0.55) 100%),
            linear-gradient(180deg, rgba(13,17,23,0.05) 0%, rgba(13,17,23,0.3) 100%)
          `,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Content layer */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
