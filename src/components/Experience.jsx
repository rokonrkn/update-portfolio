import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiBook, FiBriefcase, FiAward } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

export default function Experience({ data }) {
  const { experience, education } = data;
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.edu-exp-header', {
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.edu-exp-header', start: 'top 85%' },
      });
      gsap.from('.timeline-item', {
        x: -30, opacity: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.edu-exp__grid', start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="experience" ref={sectionRef}>
      <div className="container">
        <div className="section-header edu-exp-header">
          <span className="section-label">Background</span>
          <h2 className="section-title">
            Education & <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle">
            My academic journey and professional path that shaped my expertise.
          </p>
        </div>

        <div className="edu-exp__grid">
          {/* Education Column */}
          <div>
            <div className="timeline-column__heading">
              <FiBook /> Education
            </div>
            <div className="timeline">
              {education.map((edu, index) => (
                <div className="timeline-item" key={index}>
                  <div className="timeline-item__date">
                    {edu.start_date ? `${edu.start_date} — ` : ''}{edu.end_date}
                  </div>
                  <div className="timeline-item__card">
                    <div className="timeline-item__title">{edu.degree}</div>
                    <div className="timeline-item__subtitle">{edu.institution}</div>
                    {edu.cgpa && (
                      <div className="timeline-item__cgpa">
                        <FiAward size={12} /> CGPA: {edu.cgpa}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Column */}
          <div>
            <div className="timeline-column__heading">
              <FiBriefcase /> Experience
            </div>
            <div className="timeline">
              {experience.map((exp, index) => (
                <div className="timeline-item" key={index}>
                  <div className="timeline-item__date">
                    {exp.start_date} — {exp.end_date}
                  </div>
                  <div className="timeline-item__card">
                    <div className="timeline-item__title">{exp.role}</div>
                    <div className="timeline-item__subtitle">{exp.company}</div>
                    <div className="timeline-item__responsibilities">
                      {exp.responsibilities.map((resp, i) => (
                        <div className="timeline-item__responsibility" key={i}>
                          {resp}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
