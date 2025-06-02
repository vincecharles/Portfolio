import ProjectCard from "./ProjectCard";

const projects = [
	{
		id: 1,
		title: "Banorant",
		description: "An information application for gamers who like valorant.",
		link: "https://banorant.netlify.app/",
		tags: ["React", "CSS", "JavaScript"],
		image: "/images/projects/banorant-logo.svg"
	},
	{
		id: 2,
		title: "CineZone 2025",
		description: "A comprehensive movie discovery platform where users can browse, search, and get detailed information about movies and TV shows.",
		link: "https://cinezone2025.netlify.app/",
		tags: ["React", "API Integration", "CSS"],
		image: "/images/projects/cinezone-logo.svg"
	},
	{
		id: 3,
		title: "Listahan ng Mamako",
		description: "A list for groceries.",
		link: "https://listahanngmamako.netlify.app/",
		tags: ["HTML", "CSS", "JavaScript"],
		image: "/images/projects/listahan-logo.svg"
	},
	{
		id: 4,
		title: "FEATI Computer Society",
		description: "Official website for FEATI University's Computer Society organization, showcasing events, members, and activities.",
		link: "https://featicompsociety.netlify.app/",
		tags: ["React", "Next.js", "CSS"],
		image: "/images/projects/feati-logo.svg"
	}
];

export default function ProjectsSection() {
	return (
		<section className="projects-section" id="projects">
			<h2>Projects</h2>
			<p style={{ textAlign: "center", color: "#555", marginBottom: 32 }}>
				Some of my favorite work and web applications.
			</p>
			<div className="projects-list">
				{projects.map((project) => (
					<ProjectCard
						key={project.id}
						title={project.title}
						description={project.description}
						link={project.link}
						tags={project.tags}
						image={project.image}
					/>
				))}
			</div>		</section>
	);
}
