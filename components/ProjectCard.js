import Image from 'next/image';

export default function ProjectCard({ title, description, link, image, tags }) {
  return (
    <div className="project-card">
      {image && (
        <div className="project-image-wrapper">
          <Image src={image} alt={title} width={400} height={220} className="project-image" style={{ borderRadius: 10, objectFit: 'cover', width: '100%', height: 180 }} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      {tags && (
        <div className="project-tags">
          {tags.map((tag) => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>
      )}
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="project-link">
          View Project
        </a>
      )}
    </div>
  );
}
