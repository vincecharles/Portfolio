import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';

export const metadata = {
  title: "Vince's Portfolio",
  description: "Portfolio of Vince Charles de Guzman"
};

export default function RootLayout({ children }) {  return (
    <html lang="en">
      <body>
        <AnimatedBackground>
          <Navbar />
          {children}
          <Footer />
        </AnimatedBackground>
      </body>
    </html>
  );
}
