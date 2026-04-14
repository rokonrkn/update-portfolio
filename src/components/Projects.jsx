import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

export default function Projects({ data }) {
  const sectionRef = useRef(null);

  // ✅ safe fallback (important)
  const projects = data?.projects || [];

  useEffect(() => {
    // ❗ wait until projects exist
    if (!projects.length) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.projects-header',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-header',
            start: 'top 85%',
          },
        }
      );

      // Cards animation
      gsap.fromTo(
        '.project-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects__grid',
            start: 'top 80%',
          },
        }
      );

      // 🔥 important fix
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]); // 🔥 re-run when data loads

  const projectColors = [
    { from: '#4f46e5', to: '#7c3aed' },
    { from: '#0891b2', to: '#0e7490' },
    { from: '#7c3aed', to: '#db2777' },
  ];

  return (
    <section className="section" id="projects" ref={sectionRef}>
      <div className="container">
        <div className="section-header projects-header">
          <span className="section-label">My Work</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A selection of projects that showcase my skills and problem-solving approach.
          </p>
        </div>

        <div className="projects__grid">
          {projects.map((project, index) => {
            const color = projectColors[index % projectColors.length];

            return (
              <div className="project-card" key={index}>
                <div className="project-card__header">
                  <div
                    className="project-card__bg"
                    style={{
                      background: `linear-gradient(135deg, ${color.from}33, ${color.to}33)`
                    }}
                  />

                  <div className="project-card__pattern" />

                  <div
                    className="project-card__icon-big"
                    style={{ color: color.from }}
                  >
                    <FiCode />
                  </div>

                  <span className="project-card__badge">
                    {project.category}
                  </span>

                  <div className="project-card__links">
                    {project.github && project.github !== '#' && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="project-card__link"
                      >
                        <FiGithub />
                      </a>
                    )}

                    {project.live && project.live !== '#' && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="project-card__link"
                      >
                        <FiExternalLink />
                      </a>
                    )}
                  </div>
                </div>

                <div className="project-card__body">
                  <h3 className="project-card__title">
                    {project.name}
                  </h3>

                  <p className="project-card__type">
                    {project.type}
                  </p>

                  <div className="project-card__highlights">
                    {project.highlights?.slice(0, 2).map((h, i) => (
                      <div
                        className="project-card__highlight"
                        key={i}
                      >
                        {h}
                      </div>
                    ))}
                  </div>

                  <div className="project-card__tech">
                    {project.technologies?.map((tech, i) => (
                      <span
                        className="project-card__tech-tag"
                        key={i}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}