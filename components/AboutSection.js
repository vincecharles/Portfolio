"use client";

import Carousel from 'react-bootstrap/Carousel';

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
              rel="noopener noreferrer"
            >
              View all certifications on GitHub &rarr;
            </a>
          </li>
        </ul>
      </div>
      <div className="about-card">
        <img
          src="/Me.jpg"
          alt="Vince Charles de Guzman"
          className="profile-img"
        />
        <div className="about-content">
          <h2>About Me</h2>
          <p className="about-intro">
            Hi! I'm Vince, a developer focused on building performant
            and accessible web applications.
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
            <Carousel
              indicators={false}
              controls={false}
              interval={1500}
              pause={false}
              className="skills-carousel"
            >
              <Carousel.Item>
                <div className="skills-slide">
                  <img
                    src="/images/skills/HTML5.svg"
                    alt="HTML5"
                    className="skill-logo"
                  />
                  <img
                    src="/images/skills/CSS3.svg"
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
              </Carousel.Item>
              <Carousel.Item>
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
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
