"use client";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

const GITHUB_USERNAME = "vincecharles";
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

export default function GitHubSection() {
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
		<section className="github-section section-light" id="github">
			<div className="container">
				<h2>GitHub Repositories</h2>
				<p className="section-description">
					Some of my open source contributions and coding projects.
				</p>
				<div className="projects-list">
					{loading && <p className="loading-text">Loading projects from GitHub...</p>}
					{error && <p className="error-text">{error}</p>}
					{!loading &&
						!error &&
						repos.length > 0 &&
						repos.map((repo) => (
							<ProjectCard
								key={repo.id}
								title={repo.name}
								description={repo.description || "No description"}
								link={repo.html_url}
								tags={repo.topics || []}
								image={"/images/No-Logo-Sample.png"}
							/>
						))}
					{!loading && !error && repos.length === 0 && (
						<p className="no-repos-text">No public repositories found.</p>
					)}
				</div>
			</div>
		</section>
	);
}
