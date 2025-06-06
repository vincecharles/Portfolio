"use client";

import SkillsCarousel from "./SkillsCarousel";
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';

export default function AboutSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, threshold: 0.3 });
	const [showPDF, setShowPDF] = useState(false);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2
			}
		}
	};

	const itemVariants = {
		hidden: { y: 30, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.6,
				ease: "easeOut"
			}
		}
	};

	return (		<motion.section 
			ref={ref}
			className="about-section" 
			id="about"
			variants={containerVariants}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
		>
			<motion.div className="certifications-card" variants={itemVariants}>
				<h3>Certifications</h3>
				<div className="certifications-content">
					<div className="certification-item">
						<Image
							src="/images/certification/github-foundations.png"
							alt="GitHub Foundations Certification"
							width={200}
							height={150}
							className="certification-badge"
							onClick={() => setShowPDF(true)}
							style={{ cursor: 'pointer' }}
						/>
						<p>GitHub Foundations</p>
					</div>
					<div className="certifications-link">
						<a
							href="https://examregistration.github.com/profile/certifications"
							target="_blank"
							rel="noopener noreferrer">
							View all certifications on GitHub &rarr;
						</a>
					</div>
				</div>
			</motion.div>

			{/* PDF Modal */}
			{showPDF && (
				<div className="pdf-modal-overlay" onClick={() => setShowPDF(false)}>
					<div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
						<button 
							className="pdf-close-button"
							onClick={() => setShowPDF(false)}
							aria-label="Close PDF viewer"
						>
							×
						</button>
						<iframe
							src="/images/certification/GitHubFoundations_Badge20250606-25-59dtmf.pdf"
							width="100%"
							height="100%"
							title="GitHub Foundations Certification PDF"
						/>
					</div>
				</div>
			)}
			
			<div className="about-content">
				<motion.div className="about-me-section" variants={itemVariants}>
					<h2>About Me</h2>
					<p className="about-intro">
						My name is Vince Charles de Guzman. I am a Full Stack Developer from
						Manila, Philippines. I'm passionate about creating innovative web solutions
						and constantly learning new technologies.
					</p>
				</motion.div>

				<motion.div className="education-section" variants={itemVariants}>
					<h3>Education</h3>
					<div className="about-timeline">
						<div className="timeline-item">
							<div className="timeline-date">
								<span>2022 - Present</span>
							</div>
							<div className="timeline-content">
								<h4>Bachelor of Science in Information Technology</h4>
								<p>FEATI University</p>
								<p className="timeline-description">
									Currently pursuing my degree with focus on software development,
									database management, and web technologies.
								</p>
							</div>
						</div>
						
						<div className="timeline-item">
							<div className="timeline-date">
								<span>2018 - 2020</span>
							</div>
							<div className="timeline-content">
								<h4>Senior High School - STEM</h4>
								<p>Emilio Aguinaldo College</p>
								<p className="timeline-description">
									Completed senior high school with a specialization in Science,
									Technology, Engineering, and Mathematics (STEM).
								</p>
							</div>
						</div>
						
						<div className="timeline-item">
							<div className="timeline-date">
								<span>2014-2018</span>
							</div>
							<div className="timeline-content">
								<h4>Junior High School</h4>
								<p>Araullo High School</p>
								<p className="timeline-description">
									Completed junior high school with a strong foundation in
									mathematics, science, and computer studies.
								</p>
							</div>
						</div>
					</div>
				</motion.div>

				<motion.div className="skills-section" variants={itemVariants}>
					<h3 className="about-skills-title">Technical Skills</h3>
					<p className="skills-description">
						Technologies and frameworks I work with
					</p>
					<SkillsCarousel />
				</motion.div>
			</div>
		</motion.section>
	);
}
