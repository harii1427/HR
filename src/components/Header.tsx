import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from '../assets/Logo.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Job Seeker Portal', path: '/job-seeker' },
    { name: 'HR Connect', path: '/hr-connect' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
    >
      <motion.div
        animate={{
          width: scrolled ? 'auto' : '100%',
          borderRadius: scrolled ? '16px' : '0px',
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className={`mt-4 transition-colors duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto">
          <motion.div
            animate={{
              justifyContent: scrolled ? 'center' : 'space-between',
              paddingLeft: scrolled ? '2rem' : '1rem',
              paddingRight: scrolled ? '2rem' : '1rem',
              gap: scrolled ? '2rem' : '0rem',
            }}
            // transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="flex items-center h-[80px]"
          >
            <div>
              <Link to="/" className="flex items-center">
                <img
                  src={Logo}
                  alt="UniqHR Logo"
                  className="h-12"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <motion.div layout className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`transition-all duration-300 hover:text-blue-600 text-base whitespace-nowrap ${
                    location.pathname === item.path
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </motion.div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-md transition-colors ${
                scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-900 hover:bg-gray-100'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </motion.div>

          {/* Mobile Navigation */}
          <motion.div
            initial={false}
            animate={{ height: isOpen ? 'auto' : 0 }}
            className="lg:hidden overflow-hidden bg-white shadow-lg rounded-lg mt-2"
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'text-blue-600 bg-blue-50 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        </nav>
      </motion.div>
    </motion.header>
  );
};

export default Header;
