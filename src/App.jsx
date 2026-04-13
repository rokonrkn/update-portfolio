import { useState, useEffect } from 'react';
import './index.css';

import portfolioData from './data/portfolio.json';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      {/* Background decorations */}
      <div className="noise-overlay" />
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <div className="bg-blob bg-blob-3" />

      {/* Navigation */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Page Sections */}
      <main>
        <Hero data={portfolioData} />
        <About data={portfolioData} />
        <Services data={portfolioData} />
        <Experience data={portfolioData} />
        <Projects data={portfolioData} />
        <Contact data={portfolioData} />
      </main>

      {/* Footer */}
      <Footer data={portfolioData} />
    </>
  );
}
