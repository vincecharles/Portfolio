"use client";

import Carousel from "./Carousel";

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
					<h2>About Me</h2>
					<p className="about-intro">
				My name is Vince Charles de Guzman. I am a Full Stack Developer. From
				Manila, Philippines.
					</p>
					<div className="about-timeline">
						<div className="timeline-item">
							<div className="timeline-dot" />
							<div>
								<h4>2022-Present</h4>
								<p>B.S. in Information Technology,FEATI University</p>
							</div>
						</div>
					</div>
					<h3 className="about-skills-title">Skills</h3>
					<div className="skills-carousel-wrapper">
						<Carousel itemWidth={200}>
							<div className="skills-slide">
								<img
									src="/images/skills/html-5-svgrepo-com.svg"
									alt="HTML5"
									className="skill-logo"
								/>
								<img
									src="/images/skills/css-3-svgrepo-com.svg"
									alt="CSS3"
									className="skill-logo"
								/>
								<img
									src="/images/skills/javascript-logo-svgrepo-com.svg"
									alt="JavaScript"
									className="skill-logo"
								/>
								<img
									src="/images/skills/php-svgrepo-com.svg"
									alt="PHP"
									className="skill-logo"
								/>
							</div>
							<div className="skills-slide">
								<img
									src="/images/skills/nextjs-svgrepo-com.svg"
									alt="Next.js"
									className="skill-logo"
								/>
								<img
									src="/images/skills/laravel-svgrepo-com.svg"
									alt="Laravel"
									className="skill-logo"
								/>
								<img
									src="/images/skills/python-svgrepo-com.svg"
									alt="Python"
									className="skill-logo"
								/>
								<img
									src="/images/skills/react-svgrepo-com.svg"
									alt="React"
									className="skill-logo"
								/>
							</div>
						</Carousel>
					</div>
        </div>
		</section>
	);
}
