import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';

const QUICK_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer({ data }) {
  const { personal_information } = data;

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div>
            <div className="footer__brand-name">&lt;Rokon /&gt;</div>
            <p className="footer__brand-desc">
              Full Stack Developer based in Dhaka, Bangladesh. Passionate about building
              beautiful, performant web applications and creative digital experiences.
            </p>
            <div className="footer__socials">
              <a href={personal_information.github} target="_blank" rel="noreferrer" className="footer__social" title="GitHub">
                <FiGithub />
              </a>
              <a href={personal_information.linkedin} target="_blank" rel="noreferrer" className="footer__social" title="LinkedIn">
                <FiLinkedin />
              </a>
              <a href={`mailto:${personal_information.email}`} className="footer__social" title="Email">
                <FiMail />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="footer__col-title">Quick Links</div>
            <div className="footer__links">
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="footer__link"
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <div className="footer__col-title">Contact</div>
            <div className="footer__links">
              <a href={`mailto:${personal_information.email}`} className="footer__link">
                {personal_information.email}
              </a>
              <a href={`tel:${personal_information.phone}`} className="footer__link">
                {personal_information.phone}
              </a>
              <span className="footer__link" style={{ cursor: 'default' }}>
                {personal_information.address}
              </span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} <span>MD. Rokonujjaman</span>. All rights reserved.
          </p>
          <p className="footer__made">
            Made with <FiHeart /> and passion in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}
