import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Building, Award, TrendingUp } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import Hero from "../assets/hero.mp4";

const AnimatedCounter = ({ end, duration = 2000, label }: { end: number; duration?: number; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        setCount(Math.floor(end * percentage));
        
        if (percentage < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <div className="text-center" ref={ref}>
      <div className="text-4xl font-bold text-blue-600 mb-2">{count.toLocaleString()}+</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

const ScrollingText = () => {
  const newsItems = [
    "🎯 New partnerships with Fortune 500 companies",
    "📈 98% success rate in executive placements",
    "🌟 Award-winning HR consultancy services",
    "💼 Over 2,500 successful career transitions",
    "🚀 Leading the future of talent acquisition",
    "🤝 Connecting top talent with dream opportunities",
    "📊 Industry-leading salary benchmarking data",
    "🎓 Professional development and career coaching"
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600/10 to-indigo-600/10 backdrop-blur-sm rounded-full py-3 px-6 border border-blue-200/30">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, -2000]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {[...newsItems, ...newsItems].map((item, index) => (
          <span
            key={index}
            className="inline-block text-blue-700 text-sm font-medium mx-8 flex-shrink-0"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section with White Background */}
      <section className="relative bg-white overflow-hidden pt-20 sm:pt-24 pb-16 sm:pb-20">
        
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-blue-50/50 to-indigo-50/30 z-10"></div>
        
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-gray-900 lg:w-1/2 text-center lg:text-left"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                Connecting Talent with{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Opportunity
                </span>
              </h1>
              
              <p className="text-base sm:text-lg mb-6 sm:mb-8 text-gray-700 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Professional HR consultancy services that bridge the gap between exceptional talent and remarkable opportunities
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
                <Link
                  to="/job-seeker"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center group shadow-lg w-full sm:w-auto text-sm sm:text-base"
                >
                  Submit Your Profile
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/hr-connect"
                  className="bg-white/80 backdrop-blur-sm hover:bg-white text-blue-600 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 border-2 border-blue-200 hover:border-blue-300 shadow-lg flex items-center justify-center w-full sm:w-auto text-sm sm:text-base"
                >
                  HR Professionals
                </Link>
              </div>

              {/* Scrolling News Ticker */}
              <div className="max-w-xl mx-auto lg:mx-0">
                <ScrollingText />
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:w-1/2 mt-8 sm:mt-12 lg:mt-0"
            >
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <video
                    src={Hero}
                    autoPlay
                    loop
                    muted
                    className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 bg-white/95 backdrop-blur-sm p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-xl border border-white/20"
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="bg-green-500 p-1.5 sm:p-2 rounded-md sm:rounded-lg">
                      <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-2xl font-bold text-gray-900">98%</div>
                      <div className="text-xs sm:text-sm text-gray-600">Success Rate</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white/95 backdrop-blur-sm p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-xl border border-white/20"
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="bg-blue-500 p-1.5 sm:p-2 rounded-md sm:rounded-lg">
                      <Users className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-2xl font-bold text-gray-900">2.5K+</div>
                      <div className="text-xs sm:text-sm text-gray-600">Placements</div>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute -z-10 top-5 right-5 w-20 h-20 sm:w-32 sm:h-32 bg-blue-400/10 rounded-full blur-xl"></div>
                <div className="absolute -z-10 bottom-5 left-5 w-16 h-16 sm:w-24 sm:h-24 bg-indigo-400/10 rounded-full blur-xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Trusted by professionals and companies worldwide</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, end: 2500, label: 'Successful Placements' },
              { icon: Building, end: 150, label: 'Partner Companies' },
              { icon: Award, end: 98, label: 'Success Rate %' },
              { icon: TrendingUp, end: 5, label: 'Years Experience' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="bg-blue-600 text-white p-3 rounded-lg inline-block mb-3">
                  <stat.icon className="h-7 w-7" />
                </div>
                <AnimatedCounter end={stat.end} label={stat.label} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive HR solutions tailored to meet the unique needs of both job seekers and employers
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Executive Search',
                description: 'Find top-tier executive talent for leadership positions',
                image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600'
              },
              {
                title: 'Talent Acquisition',
                description: 'Comprehensive recruitment services across all industries',
                image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600'
              },
              {
                title: 'Career Coaching',
                description: 'Professional guidance to accelerate your career growth',
                image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600'
              },
              {
                title: 'Skills Assessment',
                description: 'Evaluate and enhance your professional capabilities',
                image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600'
              },
              {
                title: 'Industry Insights',
                description: 'Stay ahead with market trends and salary benchmarking data',
                image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=600'
              },
              {
                title: 'Consultation',
                description: 'Strategic HR consulting for organizational growth',
                image: 'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=600'
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${service.image}')` }}></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Take the Next Step?</h2>
            <p className="text-lg sm:text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Join thousands of professionals who have found their perfect career match with us
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/job-seeker"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Get Started Today
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
