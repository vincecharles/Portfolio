"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import WAVES from "vanta/dist/vanta.waves.min";

export default function VantaBackground({ children }) {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      vantaEffect.current = WAVES({
        el: vantaRef.current,
        THREE: THREE,
        color: 0x4f8cff,
        shininess: 50,
        waveHeight: 20,
        waveSpeed: 0.7,
        zoom: 0.85,
        backgroundColor: 0x181c24,
      });
    }
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);
  return (
    <div ref={vantaRef} style={{ minHeight: "100vh", width: "100vw", position: "relative" }}>
      {children}
    </div>
  );
}
