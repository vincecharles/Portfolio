export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-card">
        <img
          src="/profile.jpg"
          alt="Vince de Guzman"
          className="profile-img"
        />
        <div className="about-content">
          <h2>About Me</h2>
          <p className="about-intro">
            Hi! I'm Vince, a passionate developer focused on building performant
            and accessible web applications. I love working with modern JavaScript
            frameworks and creating beautiful user experiences.
          </p>
          <div className="about-timeline">
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div>
                <h4>2023 - Present</h4>
                <p>Full Stack Developer at Awesome Company</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div>
                <h4>2021 - 2023</h4>
                <p>Frontend Developer at Web Studio</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div>
                <h4>2017 - 2021</h4>
                <p>B.S. in Computer Science, University</p>
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
