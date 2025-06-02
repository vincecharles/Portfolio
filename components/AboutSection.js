"use client";

import SkillsCarousel from "./SkillsCarousel";

export default function AboutSection() {
	return (
		<section className="about-section" id="about">
			<div className="certifications-card">
				<h3>Certifications</h3>
				<ul className="certifications-list">
					<li>
						<a
							href="https://examregistration.github.com/profile/certifications"
							target="_blank"
							rel="noopener noreferrer">
							View all certifications on GitHub &rarr;
						</a>
					</li>
				</ul>
			</div>
			
			<div className="about-content">
				<div className="about-me-section">
					<h2>About Me</h2>
					<p className="about-intro">
						My name is Vince Charles de Guzman. I am a Full Stack Developer from
						Manila, Philippines. I'm passionate about creating innovative web solutions
						and constantly learning new technologies.
					</p>
				</div>

				<div className="education-section">
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
				</div>

				<div className="skills-section">
					<h3 className="about-skills-title">Technical Skills</h3>
					<p className="skills-description">
						Technologies and frameworks I work with
					</p>
					<SkillsCarousel />
				</div>
			</div>
		</section>
	);
}
