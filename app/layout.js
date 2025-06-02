import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import WAVES from 'vanta/dist/vanta.waves.min';

export const metadata = {
  title: "Vince's Portfolio",
  description: "Portfolio of Vince Charles de Guzman"
};

export default function RootLayout({ children }) {
  const vantaRef = useRef(null);
  useEffect(() => {
    let vantaEffect;
    if (vantaRef.current) {
      vantaEffect = WAVES({
        el: vantaRef.current,
        THREE: THREE,
        color: 0x1a73e8,
        shininess: 30,
        waveHeight: 20,
        waveSpeed: 0.7,
        zoom: 0.95,
        backgroundColor: 0x10131a
      });
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);
  return (
    <html lang="en">
      <body>
        <div ref={vantaRef} style={{position: 'fixed', zIndex: 0, width: '100vw', height: '100vh', top: 0, left: 0}} />
        <div style={{position: 'relative', zIndex: 1}}>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
