import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaCode,
  FaServer,
  FaDatabase,
  FaMobileAlt,
  FaShieldAlt,
  FaCogs,
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const ICON_COMPONENTS = {
  FaCode,
  FaServer,
  FaDatabase,
  FaMobile: FaMobileAlt,
  FaShieldAlt,
  FaCogs,
};

export default function Services({ data }) {
  const sectionRef = useRef(null);

  // ✅ Support both static + API data
  const services =
    data?.services || [
      {
        icon: 'FaCode',
        title: 'Frontend Development',
        description:
          'Building beautiful, responsive user interfaces with React.js, TailwindCSS, and modern animation libraries.',
      },
      {
        icon: 'FaServer',
        title: 'Backend Development',
        description:
          'Designing robust APIs and server-side logic with Node.js, Express.js, MongoDB, and REST architecture.',
      },
      {
        icon: 'FaDatabase',
        title: 'Database Design',
        description:
          'Structuring efficient data models with MongoDB and MySQL to power scalable web applications.',
      },
      {
        icon: 'FaMobile',
        title: 'Responsive Design',
        description:
          'Ensuring pixel-perfect layouts across all screen sizes with mobile-first design principles.',
      },
      {
        icon: 'FaShieldAlt',
        title: 'Authentication & Security',
        description:
          'Implementing JWT-based authentication, Firebase Auth, and secure API design practices.',
      },
      {
        icon: 'FaCogs',
        title: 'ERP Customization',
        description:
          'Developing and customizing ERP solutions with ERPNext and Frappe Framework using Python & JavaScript.',
      },
    ];

  useEffect(() => {
    // ❗ wait until services exist in DOM
    if (!services.length) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.section-header',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.section-header',
            start: 'top 85%',
          },
        }
      );

      // Service cards animation
      gsap.fromTo(
        '.service-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services__grid',
            start: 'top 80%',
          },
        }
      );

      // 🔥 important fix
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [services]); // 🔥 re-run when data loads

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
            const IconComponent =
              ICON_COMPONENTS[service.icon] || FaCode;

            return (
              <div className="service-card" key={index}>
                <span className="service-card__number">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="service-card__icon">
                  <IconComponent />
                </div>

                <h3 className="service-card__title">
                  {service.title}
                </h3>

                <p className="service-card__desc">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}