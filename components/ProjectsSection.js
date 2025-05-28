import projects from '../data/projects';
import ProjectCard from './ProjectCard';

export default function ProjectsSection() {
  return (
    <section className="projects-section" id="projects">
      <h2>Projects</h2>
      <p style={{ textAlign: 'center', color: '#555', marginBottom: 32 }}>
        Some of my favorite work and open source contributions.
      </p>
      <div className="projects-list">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
