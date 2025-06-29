import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import Logo from '../assets/Logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold">UNIQHR</span>
            </div>
            <p className="text-gray-300">
              Connecting talent with opportunity through professional HR consulting services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/job-seeker" className="text-gray-300 hover:text-white transition-colors">Job Seeker Portal</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
<ul className="space-y-2 text-gray-300">
  {["Executive Search", "Talent Acquisition", "HR Consulting", "Career Guidance"].map((item) => (
    <li key={item}>
      <a href="/job-seeker" className="hover:underline">
        {item}
      </a>
    </li>
  ))}
</ul>

          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 90250 94907</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@uniqhr.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Coimbatore</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2025 UNIQHR. All rights reserved.</p>
          <div className="flex justify-center items-center mt-4">
            <p className="text-gray-300 mr-2">Powered by</p>
            <a href="https://qwat.in/" target="_blank" rel="noopener noreferrer">
              <img src="https://qwat.in/static/media/QWAT.67fc4ebe979fba1f87d9.png" alt="Qwat Logo" className="h-8" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
