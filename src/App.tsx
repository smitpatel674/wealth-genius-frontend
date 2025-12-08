import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingContactButtons from './components/FloatingContactButtons';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import BlogArticle from './pages/BlogArticle';
import Contact from './pages/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Global GSAP settings
    gsap.defaults({ duration: 0.8, ease: "power2.out" });
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <FloatingContactButtons />
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;