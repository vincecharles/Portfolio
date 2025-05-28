export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <img
        src="/profile.jpg"
        alt="Vince de Guzman"
        className="profile-img"
      />
      <div className="about-content">
        <h2>About Me</h2>
        <p style={{ fontWeight: 500, fontSize: '1.1rem', marginBottom: 8 }}>
          Hi! I'm Vince, a passionate developer focused on building performant and accessible web applications.
        </p>
        <p style={{ color: '#555', marginBottom: 16 }}>
          I love working with modern JavaScript frameworks and creating beautiful user experiences. I enjoy collaborating on open source and always strive to learn new things.
        </p>
        <h3 style={{ color: '#1a73e8', marginBottom: 8 }}>Skills</h3>
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
