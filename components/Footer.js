import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaCode } from "react-icons/fa";

export default function Footer() {
	return (
		<footer className="footer">
			<div className="footer-bottom">
				<div className="footer-copyright">
					<p>&copy; {new Date().getFullYear()} Vince Charles de Guzman. All rights reserved.</p>
				</div>
				<div className="footer-made-with">
					<p>Made with <FaHeart className="heart-icon" /> and <FaCode className="code-icon" /></p>
				</div>
			</div>
			<div className="footer-socials">
				<a href="https://github.com/vincecharles" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
					<FaGithub size={22} />
				</a>
				<a href="https://www.linkedin.com/in/vince-charles-40882b28a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
					<FaLinkedin size={22} />
				</a>
				<a href="mailto:vincecharlesdeguzman@outlook.com" aria-label="Email">
					<FaEnvelope size={22} />
				</a>
			</div>
		</footer>
	);
}
