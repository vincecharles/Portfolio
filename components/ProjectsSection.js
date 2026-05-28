"use client";
import ProjectCard from "./ProjectCard";
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const projects = [
	{
		id: 1,
		title: "FEATI Computer Society",
		description: "Official website for FEATI University's Computer Society organization, showcasing events, members, and activities.",
		link: "https://featicompsociety.netlify.app/",
		tags: ["React", "Next.js", "CSS"],
		image: "/images/projects/feati-logo.svg"
	},
	{
		id: 2,
		title: "AklatBayon V2",
		description: "A library management system for FEATI University, enabling students and staff to browse, borrow, and manage books efficiently.",
		link: "https://aklatbayonfeati.netlify.app/",
		tags: ["React", "Next.js", "CSS"],
		image: "/images/projects/aklatbayon-logo.svg"
	},
	{
		id: 3,
		title: "FoodCraft Studio",
		description: "A recipe management and meal planning application that helps users discover, organize, and plan their meals with ease.",
		link: "https://foodcraftstudio.netlify.app/",
		tags: ["HTML", "CSS", "JavaScript"],
		image: "/images/projects/foodcraft-logo.svg"
	},
	{
		id: 4,
		title: "CineZone 2025",
		description: "A comprehensive movie discovery platform where users can browse, search, and get detailed information about movies and TV shows.",
		link: "https://cinezone2025.netlify.app/",
		tags: ["React", "API Integration", "CSS"],
		image: "/images/projects/cinezone-logo.svg"
	},
	{
		id: 5,
		title: "Banorant",
		description: "An information application for gamers who like valorant.",
		link: "https://banorant.netlify.app/",
		tags: ["React", "CSS", "JavaScript"],
		image: "/images/projects/banorant-logo.svg"
	},
	{
		id: 6,
		title: "Listahan ng Mamako",
		description: "A list for groceries.",
		link: "https://listahanngmamako.netlify.app/",
		tags: ["HTML", "CSS", "JavaScript"],
		image: "/images/projects/listahan-logo.svg"
	}
];

export default function ProjectsSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, threshold: 0.2 });

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15
			}
		}
	};

	const itemVariants = {
		hidden: { y: 40, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.6,
				ease: "easeOut"
			}
		}
	};

	return (
		<motion.section 
			ref={ref}
			className="projects-section" 
			id="projects"
			variants={containerVariants}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
		>
			<motion.h2 variants={itemVariants}>Projects</motion.h2>
			<motion.p 
				variants={itemVariants}
				style={{ textAlign: "center", color: "#cccccc", marginBottom: 32, fontSize: "1.1rem" }}
			>
				Some of my favorite work and web applications.
			</motion.p>
			<motion.div className="projects-list" variants={containerVariants}>
				{projects.map((project, index) => (
					<motion.div key={project.id} variants={itemVariants}>
						<ProjectCard
							title={project.title}
							description={project.description}
							link={project.link}
							tags={project.tags}
							image={project.image}
						/>
					</motion.div>
				))}
			</motion.div>
		</motion.section>
	);
}
