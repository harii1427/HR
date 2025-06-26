import React, { useEffect, useState } from 'react';
import { Target, Eye, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface Milestone {
  year: string;
  event: string;
}

const About = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  useEffect(() => {
    const teamRef = ref(database, 'team');
    onValue(teamRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTeamMembers(data);
      }
    });

    const milestonesRef = ref(database, 'milestones');
    onValue(milestonesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMilestones(data);
      }
    });
  }, []);

  return (
    <div className="pt-20">
      <br></br>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
          }}
        ></div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            About UniqHR
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
          >
            Our Uniq Hr Consultancy Company Was Established In 2020 In Coimbatore And Our Company Is Run By Experienced People With 15Years Of Experience In The Industry.Our Aim Is To Guide An Individual Person To Get A Great Job In The Best Possible Way.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-600 p-3 rounded-lg mr-4">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To revolutionize the recruitment industry by creating meaningful connections between talented professionals and forward-thinking organizations. We believe that the right match can transform careers and businesses alike.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl">
                <div className="flex items-center mb-6">
                  <div className="bg-indigo-600 p-3 rounded-lg mr-4">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To become the global leader in human capital solutions, where every professional finds their ideal career path and every organization builds exceptional teams that drive innovation and success.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 text-lg">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'Excellence',
                description: 'We strive for excellence in every interaction, delivering exceptional results that exceed expectations.'
              },
              {
                icon: Users,
                title: 'Integrity',
                description: 'We operate with transparency, honesty, and ethical practices in all our professional relationships.'
              },
              {
                icon: Target,
                title: 'Innovation',
                description: 'We embrace technology and innovative approaches to stay ahead in the evolving recruitment landscape.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-lg inline-block mb-6">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 text-lg">Experienced professionals dedicated to your success</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     <section className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Responsive font size for the heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
          <p className="text-blue-200 text-lg">Key milestones in our growth story</p>
        </motion.div>

        <div className="relative">
          {/* The Timeline Line: Positioned left on mobile, center on large screens */}
          <div className="absolute top-0 h-full w-1 bg-blue-400 left-4 transform lg:left-1/2 lg:-translate-x-1/2"></div>
          
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }} // Universal animation for mobile & desktop
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              // Base flex layout for mobile, alternating justification for large screens
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? '' : 'lg:justify-end'
              }`}
            >
              {/* Content Block: Full width on mobile, half-width on large screens */}
              <div
                className={`w-full lg:w-5/12 p-6 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm
                  ${
                    index % 2 === 0
                      ? 'ml-10 lg:ml-0 lg:pr-8 lg:text-right' // Left item on desktop
                      : 'ml-10 lg:mr-0 lg:pl-8 lg:text-left'  // Right item on desktop
                  }`}
              >
                <div className="text-2xl font-bold text-blue-300 mb-2">{milestone.year}</div>
                <p className="text-gray-200">{milestone.event}</p>
              </div>
              
              {/* The Timeline Dot: Positioned left on mobile, center on large screens */}
              <div className="absolute left-4 transform -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full border-4 border-blue-900 lg:left-1/2"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

export default About;
