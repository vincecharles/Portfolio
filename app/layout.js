import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VantaBackground from '../components/VantaBackground';

export const metadata = {
  title: "Vince's Portfolio",
  description: "Portfolio of Vince Charles de Guzman"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <VantaBackground />
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
