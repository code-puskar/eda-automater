import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Slide 1: Hero with video */}
      <section className="h-screen relative flex items-center justify-center text-center px-6">
      

        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Automate Your Data.
          </h1>
          <h2 className="text-2xl md:text-3xl font-light mb-10">
            Empower Your Insights with EDA Automater.
          </h2>
          <button
            onClick={() => navigate('/upload')}
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-full text-lg transition"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Slide 2: Parallax popping features */}
      <section className="h-screen flex flex-col justify-center items-center px-6 bg-gradient-to-b from-black to-gray-900">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-8 text-center"
        >
          Dynamic Column-Level Control
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl md:text-2xl text-center max-w-3xl"
        >
          Select, clean, encode, and scale your data with precision. Reversible pipelines, intuitive logic, and blazing-fast performance.
        </motion.p>
      </section>

      {/* Slide 3: Final CTA */}
      <section className="h-screen flex flex-col justify-center items-center px-6 bg-black">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-center"
        >
          Ready to Explore Your Data?
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/upload')}
          className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-full text-lg transition"
        >
          Launch EDA Automater
        </motion.button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 px-8 text-sm text-gray-400">
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