import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ data }) {
  const { personal_information } = data;
  const sectionRef = useRef(null);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-header', {
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-header', start: 'top 85%' },
      });
      gsap.from('.contact__info', {
        x: -40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact__grid', start: 'top 80%' },
      });
      gsap.from('.contact-form', {
        x: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact__grid', start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate send (no backend connected)
    setTimeout(() => {
      setStatus('sent');
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1500);
  };

  const contactDetails = [
    { icon: <FiMail />, label: 'Email', value: personal_information.email, href: `mailto:${personal_information.email}` },
    { icon: <FiPhone />, label: 'Phone', value: personal_information.phone, href: `tel:${personal_information.phone}` },
    { icon: <FiMapPin />, label: 'Location', value: personal_information.address, href: null },
  ];

  return (
    <section className="section" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="section-header contact-header">
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">
            Let&apos;s <span className="gradient-text">Work Together</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="contact__grid">
          {/* Info */}
          <div className="contact__info">
            <h3>Ready to build something great?</h3>
            <p>
              I&apos;m always open to new projects, collaborations, and job opportunities.
              Feel free to reach out through the form or directly via the contact details below.
            </p>
            <div className="contact__details">
              {contactDetails.map((item, i) => (
                <div className="contact__detail-item" key={i}>
                  <div className="contact__detail-icon">{item.icon}</div>
                  <div className="contact__detail-text">
                    <strong>{item.label}</strong>
                    {item.href
                      ? <a href={item.href} style={{ color: 'inherit' }}><span>{item.value}</span></a>
                      : <span>{item.value}</span>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Rokon Rkn"
                  value={formState.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="rokon@example.com"
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Project Inquiry"
                value={formState.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                value={formState.message}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className={`form-submit ${status === 'sending' ? 'sending' : ''} ${status === 'sent' ? 'sent' : ''}`}
            >
              {status === 'idle' && <><FiSend /> Send Message</>}
              {status === 'sending' && <>Sending...</>}
              {status === 'sent' && <>✓ Message Sent!</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
