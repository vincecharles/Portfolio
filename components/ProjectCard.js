"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProjectCard({ title, description, link, image, tags }) {
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
			<p>{description}</p>
			{tags && (
				<div className="project-tags">
					{tags.map((tag) => (
						<span key={tag} className="project-tag">
							{tag}
						</span>
					))}
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
