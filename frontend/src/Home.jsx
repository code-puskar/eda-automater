import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PrimaryButton from './components/PrimaryButton';
import { useEffect, useState } from 'react';

function Home() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative text-white overflow-x-hidden">
      {/* Fixed Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src="/assets/33628-397860881_small.mp4"
      />

      {/* Dark Overlay */}
      <div className="fixed top-0 left-0 w-full h-full  bg-opacity-60 z-0" />

      {/* Sticky Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-20 px-6 py-4 flex justify-between items-center transition-all duration-500 ${
          scrolled ? 'bg-black bg-opacity-90 backdrop-blur border-b border-gray-800' : 'bg-transparent'
        }`}
      >
        <span className="text-2xl font-bold tracking-wide uppercase">EDA Automater</span>
        <div className="space-x-6 text-sm uppercase font-medium">
          <a href="/about" className="hover:text-teal-400 transition">About</a>
          <a href="/docs" className="hover:text-teal-400 transition">Docs</a>
          <a href="/contact" className="hover:text-teal-400 transition">Contact</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition">GitHub</a>
        </div>
      </nav>

      {/* Content Slides */}
      <div className="relative z-10 pt-24 space-y-32 pb-40">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <h1 className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tight uppercase">
              Prepare The Data Faster
            </h1>
            <h2 className="text-2xl md:text-3xl font-light mb-10">
              Empower Your Insights with EDA Automater.
            </h2>
            <PrimaryButton label="Get Started" to="/upload" />
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-6 uppercase"
          >
            Dynamic Column-Level Control
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl md:text-2xl max-w-3xl"
          >
            Select, clean, encode, and scale your data with precision. Reversible pipelines, intuitive logic, and blazing-fast performance.
          </motion.p>
        </section>

        {/* Visualizations Section */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-6 uppercase"
          >
            Visualize Correlations Instantly
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl md:text-2xl max-w-3xl"
          >
            Heatmaps, scatter plots, and bar charts update in real time as you explore your dataset. No code required.
          </motion.p>
        </section>

        {/* Final CTA */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold mb-6 uppercase"
          >
            Ready to Explore Your Data?
          </motion.h2>
          <PrimaryButton label="Launch EDA Automater" to="/upload" />
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black bg-opacity-80 py-6 px-8 text-sm text-gray-400">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-semibold text-white">EDA Automater</span> © 2025
          </div>
          <div className="flex space-x-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="/about">About</a>
            <a href="/docs">Docs</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;