import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Enhanced3DBackground from '../components/Enhanced3DBackground';

export const metadata = {
  title: "Vince's Portfolio",
  description: "Portfolio of Vince Charles de Guzman"
};

export default function RootLayout({ children }) {  return (
    <html lang="en">
      <body>
        <Enhanced3DBackground>
          <Navbar />
          {children}
          <Footer />
        </Enhanced3DBackground>
      </body>
    </html>
  );
}
