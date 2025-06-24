import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import JobSeekerPortal from './pages/JobSeekerPortal';
import HRConnect from './pages/HRConnect';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import WhatsAppWidget from './components/WhatsAppWidget';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/job-seeker" element={<JobSeekerPortal />} />
            <Route path="/hr-connect" element={<HRConnect />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppWidget />
      </div>
    </Router>
  );
}

export default App;
