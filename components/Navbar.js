"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
	{ href: "#hero", label: "Home" },
	{ href: "#about", label: "About" },
	{ href: "#projects", label: "Projects" },
	{ href: "#github", label: "GitHub" },
	{ href: "#contact", label: "Contact" },
	{ href: "/resume", label: "Resume" },
];

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [active, setActive] = useState("Home");
	const [scrolled, setScrolled] = useState(false);
	const pathname = usePathname();
	const router = useRouter();
	useEffect(() => {
		const handleScroll = () => {
			// Handle navbar background on scroll
			setScrolled(window.scrollY > 50);
			
			// Only handle active section detection on the homepage
			if (pathname === '/') {
				const sections = ["hero", "about", "projects", "github", "contact"];
				for (let i = sections.length - 1; i >= 0; i--) {
					const el = document.getElementById(sections[i]);
					if (el && window.scrollY + 100 >= el.offsetTop) {
						setActive(sections[i].charAt(0).toUpperCase() + sections[i].slice(1));
						return;
					}
				}
				setActive("Home");
			} else if (pathname === '/resume') {
				setActive("Resume");
			}
		};
		
		// Set active state based on current pathname
		if (pathname === '/resume') {
			setActive("Resume");
		} else if (pathname === '/') {
			setActive("Home");
		}
		
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [pathname]);

	const handleMenuToggle = () => setMenuOpen((open) => !open);
		const handleLinkClick = (href, label) => {
		setMenuOpen(false);
		
		if (href.startsWith('#')) {
			// If we're not on the homepage, navigate to homepage first
			if (pathname !== '/') {
				router.push('/' + href);
			} else {
				// We're on homepage, scroll to section
				const element = document.getElementById(href.substring(1));
				if (element) {
					element.scrollIntoView({ behavior: 'smooth' });
				}
			}
		} else {
			// Direct navigation to other pages
			router.push(href);
		}
		
		setActive(label);
	};

	return (
		<nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
			<div className="navbar-container">				<div className="navbar-logo">
					<Link href="/" className="navbar-brand" onClick={() => handleLinkClick('/', 'Home')}>
						<span className="brand-text">Vince</span>
						<span className="brand-dot">.</span>
					</Link>
				</div>
						<div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
					{navLinks.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							className={`navbar-link ${active === link.label ? 'active' : ''}`}
							onClick={(e) => {
								e.preventDefault();
								handleLinkClick(link.href, link.label);
							}}
						>
							{link.label}
						</Link>
					))}
				</div>
				
				<button
					className="navbar-toggle"
					onClick={handleMenuToggle}
					aria-label="Toggle navigation menu"
				>
					{menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
				</button>
			</div>
		</nav>
	);
}
