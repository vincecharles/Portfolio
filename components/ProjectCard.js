"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProjectCard({ title, description, link, image, tags, githubData }) {
	const [imageError, setImageError] = useState(false);

	const handleImageError = () => {
		console.log(`Failed to load image: ${image}`);
		setImageError(true);
	};

	return (
		<div className="project-card">
			{image && !imageError && (
				<div className="project-image-wrapper">
					<img
						src={image}
						alt={`${title} logo`}
						className="project-image"
						style={{
							borderRadius: 10,
							objectFit: "contain",
							width: "100%",
							height: 180,
							backgroundColor: "#f8f9fa",
							padding: "20px",
						}}
						onError={handleImageError}
					/>
				</div>
			)}
			<h3>{title}</h3>
			<p>{description}</p>		{tags && (
			<div className="project-tags">
				{tags.map((tag) => (
					<span key={tag} className="project-tag">
						{tag}
					</span>
				))}
			</div>
		)}
		
		{/* GitHub-specific data */}
		{githubData && (
			<div className="github-stats-card">
				<div className="github-stat-row">
					{githubData.stars !== undefined && (
						<div className="github-stat">
							<span className="stat-icon">⭐</span>
							<span className="stat-value">{githubData.stars}</span>
						</div>
					)}
					{githubData.forks !== undefined && (
						<div className="github-stat">
							<span className="stat-icon">🍴</span>
							<span className="stat-value">{githubData.forks}</span>
						</div>
					)}
					{githubData.language && (
						<div className="github-stat">
							<span className="stat-icon">💻</span>
							<span className="stat-value">{githubData.language}</span>
						</div>
					)}
					{githubData.size && (
						<div className="github-stat">
							<span className="stat-icon">📁</span>
							<span className="stat-value">{githubData.size} MB</span>
						</div>
					)}
				</div>
				
				{githubData.lastUpdated && (
					<div className="github-meta">
						<small>Updated: {githubData.lastUpdated}</small>
					</div>
				)}
				
				{githubData.license && (
					<div className="github-license">
						<small>License: {githubData.license}</small>
					</div>
				)}
				
				{githubData.isArchived && (
					<div className="github-archived">
						<small>📦 Archived</small>
					</div>
				)}
			</div>
		)}
		
		{link && (
				<a
					href={link}
					target="_blank"
					rel="noopener noreferrer"
					className="project-link">
					View Project
				</a>
			)}
		</div>
	);
}
