"use client";

import styles from "./SkillsCarousel.module.css";

export default function SkillsCarousel() {
  const skills = [
    { src: "/images/skills/html-5-svgrepo-com.svg", name: "HTML5" },
    { src: "/images/skills/css-3-svgrepo-com.svg", name: "CSS3" },
    { src: "/images/skills/javascript-logo-svgrepo-com.svg", name: "JavaScript" },
    { src: "/images/skills/react-svgrepo-com.svg", name: "React" },
    { src: "/images/skills/nextjs-svgrepo-com.svg", name: "Next.js" },
    { src: "/images/skills/php-svgrepo-com.svg", name: "PHP" },
    { src: "/images/skills/laravel-svgrepo-com.svg", name: "Laravel" },
    { src: "/images/skills/python-svgrepo-com.svg", name: "Python" }
  ];

  return (
    <div className={styles.skillsCarousel}>
      <div className={styles.skillsTrack}>
        {/* First set of skills */}
        {skills.map((skill, index) => (
          <div key={`first-${index}`} className={styles.skillCard}>
            <img src={skill.src} alt={skill.name} className={styles.skillLogo} />
            <span className={styles.skillName}>{skill.name}</span>
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {skills.map((skill, index) => (
          <div key={`second-${index}`} className={styles.skillCard}>
            <img src={skill.src} alt={skill.name} className={styles.skillLogo} />
            <span className={styles.skillName}>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
