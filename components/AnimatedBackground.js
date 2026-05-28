"use client";

export default function AnimatedBackground({ children }) {
  return (
    <div style={{ position: 'relative', width: '100vw', minHeight: '100vh' }}>
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -2,
        }}
        aria-hidden="true"
      >
        <source src="/videos/Background.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay — covers any watermark and creates contrast */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(10, 12, 20, 0.62)',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />

      {/* Vignette overlay for depth */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(ellipse at center, transparent 35%, rgba(10,12,20,0.65) 100%),
            linear-gradient(180deg, rgba(10,12,20,0.08) 0%, rgba(10,12,20,0.35) 100%)
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
