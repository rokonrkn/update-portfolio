import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import img from '../assets/Rokon.png';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = {
  Frontend: '⚡',
  Backend: '🔧',
  Tools: '🛠',
  'Problem Solving': '🧠',
};

export default function About({ data }) {
  const { personal_information, technical_skills } = data;
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about__visual', {
        x: -60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.about__visual', start: 'top 80%' },
      });
      gsap.from('.about__content > *', {
        y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.about__content', start: 'top 80%' },
      });
      gsap.from('.skill-category', {
        y: 20, opacity: 0, stagger: 0.1, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-grid', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const skillSections = [
    { label: 'Frontend', items: technical_skills.frontend },
    { label: 'Backend', items: technical_skills.backend },
    { label: 'Tools', items: technical_skills.tools },
    { label: 'Problem Solving', items: technical_skills.problem_solving },
  ];

  return (
    <section className="section" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about__grid">
          {/* Visual */}
          <div className="about__visual">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div className="about__image-glow" />
              <div className="about__image-container">
                <div className="about__image-initials">
                    <img src={img} alt="" />
                </div>
              </div>
              <div className="about__exp-badge">
                <strong>2+</strong>
                <span>Years of<br />Experience</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="about__content">
            <span className="section-label">About Me</span>
            <h2 className="section-title">
              Passionate Developer &<br />
              <span className="gradient-text">Creative Problem Solver</span>
            </h2>
            <p>
              I&apos;m <strong>{personal_information.name}</strong>, a Full Stack Developer with hands-on experience
              across frontend, backend, and ERP systems. My journey started with a Diploma in Computer Science
              and has grown into professional experience at fast-paced tech companies.
            </p>
            <p>
              I specialize in building scalable web applications using React.js, Node.js, and MongoDB.
              Currently, I&apos;m also working with ERPNext and Frappe Framework, developing custom ERP solutions for enterprise clients.
            </p>

            <div className="about__contact-info">
              {[
                { icon: <FiMapPin />, text: personal_information.address },
                { icon: <FiPhone />, text: personal_information.phone },
                { icon: <FiMail />, text: personal_information.email },
              ].map((item, i) => (
                <div className="about__contact-item" key={i}>
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <div className="skills-grid">
              {skillSections.map((section) => (
                <div className="skill-category" key={section.label}>
                  <div className="skill-category__title">{section.label}</div>
                  <div className="skill-tags">
                    {section.items.map((skill) => (
                      <span className="skill-tag" key={skill}>{skill}</span>
                    ))}
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
