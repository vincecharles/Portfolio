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
          <div className="skills-grid">
            <span>JavaScript</span>
            <span>TypeScript</span>
            <span>React</span>
            <span>Next.js</span>
            <span>Node.js</span>
            <span>Express</span>
            <span>CSS3</span>
            <span>Tailwind CSS</span>
            <span>Git</span>
          </div>
        </div>
      </div>
    </section>
  );
}
