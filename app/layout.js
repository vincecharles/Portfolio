import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import VantaBackground from '../components/VantaBackground';

export const metadata = {
  title: "Vince's Portfolio",
  description: "Portfolio of Vince Charles de Guzman"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <VantaBackground>
          {children}
        </VantaBackground>
      </body>
    </html>
  );
}
