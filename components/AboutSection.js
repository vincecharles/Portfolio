export default function AboutSection() {
  return (
    <section className="about-section">
      <img
        src="/profile.jpg"
        alt="Vince de Guzman"
        className="profile-img"
      />
      <div className="about-content">
        <h2>About Me</h2>
        <p>
          Hi! I'm Vince, a passionate developer focused on building performant and accessible web applications. I love working with modern JavaScript frameworks and creating beautiful user experiences.
        </p>
        <h3>Skills</h3>
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
    </section>
  );
}
