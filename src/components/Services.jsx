import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCode, FaServer, FaDatabase, FaMobileAlt, FaShieldAlt, FaCogs } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const ICON_COMPONENTS = {
  FaCode, FaServer, FaDatabase, FaMobile: FaMobileAlt, FaShieldAlt, FaCogs,
};

export default function Services({ data }) {
  const { services } = data;
  console.log(services)
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.section-header', {
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.section-header', start: 'top 85%' },
      });
      gsap.from('.service-card', {
        y: 50, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.services__grid', start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="services" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">What I Do</span>
          <h2 className="section-title">
            Services I <span className="gradient-text">Provide</span>
          </h2>
          <p className="section-subtitle">
            From pixel-perfect UIs to robust back-ends — I build complete digital products.
          </p>
        </div>

        <div className="services__grid">
          {services.map((service, index) => {
            const IconComponent = ICON_COMPONENTS[service.icon] || FaCode;
            console.log(service.title)
            return (
              <div className="service-card" key={index}>
                <span className="service-card__number">{String(index + 1).padStart(2, '0')}</span>
                <div className="service-card__icon">
                  <IconComponent />
                </div>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__desc">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
