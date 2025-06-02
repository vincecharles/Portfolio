"use client";
import { Canvas } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function AnimatedSphere({ position, color, speed = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.008 * speed;
      meshRef.current.rotation.y += 0.012 * speed;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.8 + position[1];
      meshRef.current.position.x = Math.cos(state.clock.elapsedTime * speed * 0.3) * 0.5 + position[0];
    }
  });

  return (
    <Sphere ref={meshRef} position={position} args={[1, 64, 64]}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.9}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
}

function ParticleField() {
  const points = useRef();
  
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const particlePositions = new Float32Array(500 * 3);
  for (let i = 0; i < 500; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 15;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 15;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 15;
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={500}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#4f8cff" transparent opacity={0.7} />
    </points>
  );
}

export default function Enhanced3DBackground({ children }) {
  return (
    <div style={{ position: 'relative', width: '100vw', minHeight: '100vh' }}>
      {/* 3D Canvas Background */}
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#4f8cff" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#8b5cf6" />
        <spotLight position={[0, 10, 0]} intensity={0.5} color="#6366f1" angle={Math.PI / 6} />
        
        {/* Animated spheres */}
        <AnimatedSphere position={[-4, 0, -2]} color="#4f8cff" speed={0.8} />
        <AnimatedSphere position={[4, 1, -3]} color="#6366f1" speed={1.2} />
        <AnimatedSphere position={[0, -2, -1]} color="#8b5cf6" speed={0.6} />
        <AnimatedSphere position={[-2, 3, -4]} color="#ec4899" speed={0.9} />
        <AnimatedSphere position={[3, -1, -2]} color="#06b6d4" speed={0.7} />
        
        {/* Particle field */}
        <ParticleField />
        
        {/* Orbit controls for subtle camera movement */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
      
      {/* Gradient Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(ellipse at center, transparent 0%, rgba(24, 28, 36, 0.3) 70%),
            linear-gradient(180deg, rgba(24, 28, 36, 0.1) 0%, rgba(24, 28, 36, 0.8) 100%)
          `,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
