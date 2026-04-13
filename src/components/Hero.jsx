import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiMail, FiCode } from 'react-icons/fi';
import { FaBriefcase } from 'react-icons/fa';
import img from '../assets/Rokon.png';

export default function Hero({ data }) {
  const { personal_information } = data;
  const sectionRef = useRef(null);
  const tl = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ delay: 0.2 });
      tl.current
        .from('.hero__label', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' })
        .from('.hero__name', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out' }, '-=0.3')
        .from('.hero__title', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .from('.hero__tagline', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .from('.hero__actions', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .from('.hero__socials', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .from('.hero__stat', { opacity: 0, y: 20, stagger: 0.12, duration: 0.5, ease: 'power3.out' }, '-=0.3')
        .from('.hero__avatar-wrapper', { opacity: 0, scale: 0.85, duration: 1, ease: 'back.out(1.5)' }, '-=1.2')
        .from('.hero__floating-card', { opacity: 0, scale: 0.8, stagger: 0.2, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.6')
        .from('.hero__scroll-indicator', { opacity: 0, duration: 0.5 }, '-=0.2');
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero section" id="hero" ref={sectionRef}>
      <div className="container">
        <div className="hero__grid">
          {/* Left Content */}
          <div className="hero__content">
            <div className="hero__label">
              <span className="hero__label-dot" />
              Available for Opportunities
            </div>
            <h1 className="hero__name">
              {personal_information.name.split(' ').map((word, i) =>
                i === personal_information.name.split(' ').length - 1
                  ? <span key={i} className="gradient-text">{word}</span>
                  : <span key={i}>{word} </span>
              )}
            </h1>
            <p className="hero__title gradient-text">{personal_information.title}</p>
            <p className="hero__tagline">{personal_information.tagline}</p>

            <div className="hero__actions">
              <a href="#contact" className="btn-primary" onClick={(e) => { e.preventDefault(); document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }); }}>
                <span>Get In Touch</span><FiArrowRight />
              </a>
              <a href="#projects" className="btn-outline" onClick={(e) => { e.preventDefault(); document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' }); }}>
                View Projects
              </a>
            </div>

            <div className="hero__socials">
              <a href={personal_information.github} target="_blank" rel="noreferrer" className="hero__social-link" title="GitHub">
                <FiGithub />
              </a>
              <a href={personal_information.linkedin} target="_blank" rel="noreferrer" className="hero__social-link" title="LinkedIn">
                <FiLinkedin />
              </a>
              <a href={`mailto:${personal_information.email}`} className="hero__social-link" title="Email">
                <FiMail />
              </a>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hero__visual">
            <div className="hero__avatar-wrapper">
              <div className="hero__avatar-ring" />
              <div className="hero__avatar-ring-2" />
              <div className="hero__avatar-blob" />
              <div className="hero__avatar-img">
                <img src={img} alt="" />
              </div>

              {/* Floating Card 1 */}
              <div className="hero__floating-card hero__floating-card-1">
                <div className="hero__floating-icon">
                  <FaBriefcase />
                </div>
                <div className="hero__floating-text">
                  <strong>2+ Years</strong>
                  <span>Experience</span>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="hero__floating-card hero__floating-card-2">
                <div className="hero__floating-icon">
                  <FiCode />
                </div>
                <div className="hero__floating-text">
                  <strong>Full Stack</strong>
                  <span>Developer</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="hero__stats" style={{ marginTop: '60px', justifyContent: 'flex-start', gap: '48px' }}>
          {[
            { num: '2+', label: 'Years Experience' },
            { num: '3+', label: 'Companies' },
            { num: '15+', label: 'Projects Done' },
            { num: '10+', label: 'Technologies' },
          ].map((stat) => (
            <div className="hero__stat" key={stat.label}>
              <span className="hero__stat-num">{stat.num}</span>
              <span className="hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-indicator">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
