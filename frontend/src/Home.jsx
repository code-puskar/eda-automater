import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PrimaryButton from './components/PrimaryButton';
import { useEffect, useState } from 'react';

function Home() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const features = [
    {
      title: "Smart Data Cleaning",
      desc: "Auto-handle missing values and outliers intelligently.",
    },
    {
      title: "Instant Visualization",
      desc: "Generate correlation heatmaps and plots instantly.",
    },
    {
      title: "One-Click Report",
      desc: "Export a professional HTML or PDF EDA report.",
    },
    {
      title: "AI-Powered Insights",
      desc: "Get auto-summarized insights and recommendations.",
    },
  ];
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
         <a href="https://github.com" className="border px-3 py-1 rounded hover:bg-teal-500 hover:text-black transition animate-pulse">GitHub</a>

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
            <h2 className="text-2xl react-tsparticles md:text-3xl font-light mb-10">
              Next-Gen Data Preparation Toolkit
            </h2>
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




  
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 px-8">
      {/* 🌌 Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0b0000] to-[#1a0000]" />

      {/* 🌟 Subtle Moving Red Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(1000)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-[2px] h-[2px] bg-red-500 rounded-full opacity-60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 1 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 🌠 Feature Cards */}
      <div className="grid md:grid-cols-2 gap-20 text-center z-10">
        {features.map((card, i) => (
          <motion.div
            key={i}
            className="relative p-8 bg-black bg-opacity-70 rounded-2xl border border-red-500
                       shadow-[0_0_25px_rgba(255,0,0,0.25)] hover:shadow-[0_0_45px_rgba(255,0,0,0.35)]
                       transition-all duration-700 ease-out max-w-lg backdrop-blur-md"
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 3.5 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div
              className="absolute inset-0 rounded-2xl border-[5px] border-red-700 opacity-15 blur-lg"
              style={{ pointerEvents: "none" }}
            />
            <h3 className="text-5xl font-semibold mb-3 text-red-400 drop-shadow-[0_0_8px_rgba(255,0,0,0.4)]">
              {card.title}
            </h3>
            <p className="text-gray-300 text-sm">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  




        {/* Visualizations Section */}
        {/* Visualizations Section */}
<section className="min-h-screen flex flex-col justify-center items-center px-6 text-center bg-black bg-opacity-60 relative overflow-hidden">
  <motion.h2
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-5xl md:text-6xl font-bold mb-6 uppercase text-gradient"
  >
    Visualize Correlations Instantly
  </motion.h2>

  <motion.p
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.6 }}
    className="text-xl md:text-2xl max-w-3xl text-gray-300"
  >
    Heatmaps, scatter plots, and bar charts update in real time as you explore your dataset. 
    <br />No code required — just upload and explore.
  </motion.p>

  {/* Visualization Preview Cards */}
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6, duration: 0.6 }}
    className="grid md:grid-cols-3 gap-8 mt-16"
  >
    <div className="p-6 bg-black bg-opacity-50 rounded-2xl hover:scale-105 transition border border-teal-500/20">
      <img src="/assets/heatmap.png" alt="Heatmap Preview" className="rounded-lg mb-4" />
      <h3 className="text-2xl font-semibold text-teal-400">Correlation Heatmap</h3>
      <p className="text-gray-400 text-sm mt-2">Understand feature relationships visually in one click.</p>
    </div>
    <div className="p-6 bg-black bg-opacity-50 rounded-2xl hover:scale-105 transition border border-teal-500/20">
      <img src="/assets/scatter.png" alt="Scatter Plot Preview" className="rounded-lg mb-4" />
      <h3 className="text-2xl font-semibold text-teal-400">Scatter Plots</h3>
      <p className="text-gray-400 text-sm mt-2">Detect patterns, outliers, and linear trends with ease.</p>
    </div>
    <div className="p-6 bg-black bg-opacity-50 rounded-2xl hover:scale-105 transition border border-teal-500/20">
      <img src="/assets/bar.png" alt="Bar Chart Preview" className="rounded-lg mb-4" />
      <h3 className="text-2xl font-semibold text-teal-400">Distribution Charts</h3>
      <p className="text-gray-400 text-sm mt-2">Visualize categorical or numerical distributions instantly.</p>
    </div>
  </motion.div>

  {/* Floating Glow Effect */}
  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-transparent to-purple-600/10 blur-3xl pointer-events-none" />
</section>

{/* How It Works Section */}
<section className="min-h-screen flex flex-col justify-center items-center px-8 text-center bg-gradient-to-b from-black via-gray-900 to-black">
  <motion.h2
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-5xl md:text-6xl font-bold mb-12 uppercase text-gradient"
  >
    How It Works
  </motion.h2>

  <div className="grid md:grid-cols-3 gap-10 max-w-6xl">
    {[
      {
        step: "1️⃣ Upload Dataset",
        desc: "Simply drag and drop your CSV, Excel, or JSON file — no setup required.",
      },
      {
        step: "2️⃣ Auto Analysis",
        desc: "Our engine automatically detects data types, missing values, and outliers.",
      },
      {
        step: "3️⃣ Generate Report",
        desc: "Download a beautiful HTML or PDF summary with visuals and insights.",
      },
    ].map((item, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.2, duration: 0.6 }}
        className="p-6 bg-black bg-opacity-60 rounded-2xl border border-teal-500/30 hover:border-teal-400 hover:scale-105 transition"
      >
        <h3 className="text-2xl font-semibold text-teal-400 mb-2">{item.step}</h3>
        <p className="text-gray-300 text-sm">{item.desc}</p>
      </motion.div>
    ))}
  </div>
</section>

{/* Testimonials Section */}
<section className="min-h-screen flex flex-col justify-center items-center px-6 text-center bg-black">
  <motion.h2
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-5xl md:text-6xl font-bold mb-12 uppercase text-gradient"
  >
    What People Say
  </motion.h2>

  <div className="grid md:grid-cols-3 gap-8 max-w-6xl">
    {[
      {
        quote: "EDA Automater saved me hours of manual cleaning. Beautiful results in seconds!",
        name: "— Data Scientist",
      },
      {
        quote: "An amazing tool! The visualizations helped me understand my dataset instantly.",
        name: "— ML Engineer",
      },
      {
        quote: "Perfect for quick insights before modeling. Fast, sleek, and reliable.",
        name: "— Analyst",
      },
    ].map((t, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.2, duration: 0.6 }}
        className="p-6 bg-gray-900 rounded-2xl shadow-lg hover:scale-105 transition border border-gray-800"
      >
        <p className="text-gray-300 italic mb-4">“{t.quote}”</p>
        <h4 className="text-teal-400 font-semibold">{t.name}</h4>
      </motion.div>
    ))}
  </div>
</section>


        {/* Final CTA */}
       <section className="min-h-screen flex flex-col justify-center items-center px-8 text-center bg-gradient-to-b from-black via-gray-900 to-black">
  <motion.h2
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-5xl md:text-6xl font-bold mb-12 uppercase text-gradient"
  >
    Developer Friendly
  </motion.h2>

  <motion.p
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.6 }}
    className="text-xl text-gray-300 max-w-3xl mb-16"
  >
    Integrate EDA Automater directly with your Python or FastAPI workflow. 
    Our RESTful API lets you upload datasets, trigger EDA runs, and download structured reports — all programmatically.
  </motion.p>

  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6, duration: 0.6 }}
    className="bg-gray-900 border border-teal-400/20 rounded-xl p-8 text-left max-w-3xl shadow-lg"
  >
    <h3 className="text-teal-400 font-semibold mb-4">Example: Triggering EDA via API</h3>
    <pre className="bg-black bg-opacity-70 rounded-lg p-4 text-sm text-gray-200 overflow-x-auto">
{`POST /api/run-eda
Content-Type: multipart/form-data

file: data.csv

Response:
{
  "status": "success",
  "report_url": "/reports/eda_summary.html"
}`}
    </pre>
  </motion.div>

  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.9, duration: 0.6 }}
    className="mt-10"
  >
    <a
      href="#"
      className="border border-teal-400 text-teal-300 px-6 py-3 rounded-xl hover:bg-teal-500 hover:text-black transition font-semibold"
    >
      View Full API Docs
    </a>
  </motion.div>
</section>

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
    </div>
  );
}

export default Home;