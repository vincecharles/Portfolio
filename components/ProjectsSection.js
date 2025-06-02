"use client";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import Carousel from "./Carousel";

const GITHUB_USERNAME = "vincecharles";
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

export default function ProjectsSection() {
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch(GITHUB_API)
			.then((res) => res.json())
			.then((data) => {
				if (Array.isArray(data)) {
					// Sort by stargazers_count desc, take top 6
					const sorted = data
						.filter((repo) => !repo.fork && !repo.private)
						.sort((a, b) => b.stargazers_count - a.stargazers_count)
						.slice(0, 6);
					setRepos(sorted);
				} else {
					setError("Failed to fetch repositories.");
				}
				setLoading(false);
			})
			.catch(() => {
				setError("Failed to fetch repositories.");
				setLoading(false);
			});
	}, []);

	return (
		<section className="projects-section" id="projects">
			<h2>Projects</h2>
			<p style={{ textAlign: "center", color: "#555", marginBottom: 32 }}>
				Some of my favorite work and open source contributions.
			</p>
			<div className="projects-list" style={{ display: "flex", justifyContent: "center" }}>
				{loading && <p>Loading projects from GitHub...</p>}
				{error && <p style={{ color: "red" }}>{error}</p>}
				{!loading && !error && repos.length > 0 && (
					<Carousel itemWidth={400}>
						{repos.map((repo) => (
							<ProjectCard
								key={repo.id}
								title={repo.name}
								description={repo.description || "No description"}
								link={repo.html_url}
								tags={repo.topics || []}
								image={"/images/No-Logo-Sample.png"}
							/>
						))}
					</Carousel>
				)}
				{!loading && !error && repos.length === 0 && <p>No public repositories found.</p>}
			</div>
		</section>
	);
}
