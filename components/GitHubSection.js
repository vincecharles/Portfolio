"use client";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

const GITHUB_USERNAME = "vincecharles";
const GITHUB_API_BASE = "https://api.github.com";

export default function GitHubSection() {
	const [repos, setRepos] = useState([]);
	const [userStats, setUserStats] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [sortBy, setSortBy] = useState("stars");
	// Fetch user statistics
	const fetchUserStats = async () => {
		try {
			const userResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
			const userData = await userResponse.json();
			
			if (userResponse.ok) {
				setUserStats({
					public_repos: userData.public_repos,
					followers: userData.followers,
					following: userData.following,
					total_stars: 0, // Will be calculated from repos
					avatar_url: userData.avatar_url,
					bio: userData.bio,
					location: userData.location,
					blog: userData.blog,
					created_at: userData.created_at
				});
			}
		} catch (err) {
			console.error("Failed to fetch user stats:", err);
		}
	};

	// Fetch repositories with enhanced data
	const fetchRepos = async () => {
		try {
			const reposResponse = await fetch(
				`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
			);
			const reposData = await reposResponse.json();

			if (reposResponse.ok && Array.isArray(reposData)) {
				// Filter and enhance repository data
				const enhancedRepos = await Promise.all(
					reposData
						.filter(repo => !repo.fork && !repo.private)
						.slice(0, 12) // Get more repos for better sorting options
						.map(async (repo) => {
							// Fetch languages for each repo
							let languages = [];
							try {
								const langResponse = await fetch(repo.languages_url);
								const langData = await langResponse.json();
								if (langResponse.ok) {
									languages = Object.keys(langData);
								}
							} catch (err) {
								console.error(`Failed to fetch languages for ${repo.name}:`, err);
							}

							return {
								...repo,
								languages,
								last_updated: new Date(repo.updated_at).toLocaleDateString(),
								created_date: new Date(repo.created_at).toLocaleDateString(),
								size_mb: (repo.size / 1024).toFixed(2),
								open_issues_count: repo.open_issues_count || 0,
								default_branch: repo.default_branch || 'main'
							};
						})
				);

				// Calculate total stars
				const totalStars = enhancedRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
				setUserStats(prev => prev ? { ...prev, total_stars: totalStars } : null);

				setRepos(enhancedRepos);
			} else {
				setError("Failed to fetch repositories.");
			}
		} catch (err) {
			console.error("Error fetching repos:", err);
			setError("Failed to fetch repositories.");
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			await Promise.all([fetchUserStats(), fetchRepos()]);
			setLoading(false);
		};

		fetchData();
	}, []);

	// Sort repositories based on selected criteria
	const sortedRepos = repos.sort((a, b) => {
		switch (sortBy) {
			case "stars":
				return b.stargazers_count - a.stargazers_count;
			case "updated":
				return new Date(b.updated_at) - new Date(a.updated_at);
			case "created":
				return new Date(b.created_at) - new Date(a.created_at);
			case "forks":
				return b.forks_count - a.forks_count;
			case "size":
				return b.size - a.size;
			default:
				return b.stargazers_count - a.stargazers_count;
		}
	}).slice(0, 6); // Show top 6 after sorting

	return (
		<section className="github-section section-light" id="github">
			<div className="container">
				<h2>GitHub Repositories</h2>
				<p className="section-description">
					Some of my open source contributions and coding projects.
				</p>
				
				{/* GitHub Stats */}
				{userStats && !loading && (
					<div className="github-stats">
						<div className="stat-item">
							<span className="stat-number">{userStats.public_repos}</span>
							<span className="stat-label">Public Repos</span>
						</div>
						<div className="stat-item">
							<span className="stat-number">{userStats.total_stars}</span>
							<span className="stat-label">Total Stars</span>
						</div>
						<div className="stat-item">
							<span className="stat-number">{userStats.followers}</span>
							<span className="stat-label">Followers</span>
						</div>
						<div className="stat-item">
							<span className="stat-number">{userStats.following}</span>
							<span className="stat-label">Following</span>
						</div>
					</div>
				)}

				{/* Sort Options */}
				{!loading && !error && repos.length > 0 && (
					<div className="github-controls">
						<div className="sort-controls">
							<label htmlFor="sort-select">Sort by:</label>
							<select 
								id="sort-select"
								value={sortBy} 
								onChange={(e) => setSortBy(e.target.value)}
								className="sort-select"
							>
								<option value="stars">⭐ Stars</option>
								<option value="updated">🕒 Recently Updated</option>
								<option value="created">📅 Recently Created</option>
								<option value="forks">🍴 Forks</option>
								<option value="size">📁 Size</option>
							</select>
						</div>
					</div>
				)}

				<div className="projects-list">
					{loading && <p className="loading-text">Loading projects from GitHub...</p>}
					{error && <p className="error-text">{error}</p>}
					{!loading &&
						!error &&
						sortedRepos.length > 0 &&
						sortedRepos.map((repo) => (
							<ProjectCard
								key={repo.id}
								title={repo.name}
								description={repo.description || "No description"}
								link={repo.html_url}
								tags={repo.topics && repo.topics.length > 0 ? repo.topics : repo.languages}
								image={"/images/No-Logo-Sample.png"}
								githubData={{
									stars: repo.stargazers_count,
									forks: repo.forks_count,
									language: repo.language,
									languages: repo.languages,
									lastUpdated: repo.last_updated,
									size: repo.size_mb,
									openIssues: repo.open_issues_count,
									defaultBranch: repo.default_branch,
									isArchived: repo.archived,
									hasPages: repo.has_pages,
									license: repo.license?.name
								}}
							/>
						))}
					{!loading && !error && repos.length === 0 && (
						<p className="no-repos-text">No public repositories found.</p>
					)}
				</div>

				{/* GitHub Profile Link */}
				<div className="github-profile-link">
					<a 
						href={`https://github.com/${GITHUB_USERNAME}`}
						target="_blank"
						rel="noopener noreferrer"
						className="github-profile-button"
					>
						View Full GitHub Profile →
					</a>
				</div>
			</div>
		</section>
	);
}
